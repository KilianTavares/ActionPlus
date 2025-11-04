"use client";

import { useState } from "react";
import { API_ENDPOINTS } from "@/config/api";
import { useAuth } from "@/contexts/AuthContext";

export default function MediaUploadForm() {
  const { token, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    duration: "",
    mediaType: "movie",
  });
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
    }
  };

  const uploadToS3 = async (
    file: File,
    uploadId: string,
    uploadUrls: string[]
  ) => {
    const chunkSize = 10 * 1024 * 1024; // 10MB chunks
    const totalChunks = Math.ceil(file.size / chunkSize);
    const etags: string[] = [];

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const response = await fetch(uploadUrls[i], {
        method: "PUT",
        body: chunk,
      });

      if (!response.ok) throw new Error(`Failed to upload chunk ${i + 1}`);

      etags.push(response.headers.get("ETag") || "");
      setUploadProgress(Math.round(((i + 1) / totalChunks) * 100));
    }

    return etags;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !mediaFile) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setUploadProgress(0);

    try {
      // Step 1: Get upload URL from Lambda
      const metadataPayload = {
        title: formData.title,
        description: formData.description,
        genre: formData.genre,
        releaseYear: formData.releaseYear,
        director: formData.director,
        cast: formData.cast,
        duration: formData.duration,
        mediaType: formData.mediaType,
        fileName: mediaFile.name,
        fileType: mediaFile.type,
        fileSize: mediaFile.size,
      };

      const response = await fetch(API_ENDPOINTS.upload, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadataPayload),
      });

      if (!response.ok) throw new Error("Failed to get upload URL");

      const { uploadUrl, mediaId } = await response.json();

      // Step 2: Upload file directly to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: mediaFile,
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload file to S3");

      setSubmitStatus("success");
      setFormData({
        title: "",
        description: "",
        genre: "",
        releaseYear: "",
        director: "",
        cast: "",
        duration: "",
        mediaType: "movie",
      });
      setMediaFile(null);
      setUploadProgress(100);
    } catch (error) {
      console.error("Upload error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-800/50 p-8 rounded-lg border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
              placeholder="Enter media title"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">
              Media Type *
            </label>
            <select
              name="mediaType"
              value={formData.mediaType}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
            >
              <option value="movie">Movie</option>
              <option value="tv-show">TV Show</option>
              <option value="documentary">Documentary</option>
              <option value="short-film">Short Film</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Genre</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
              placeholder="e.g., Action, Drama"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">
              Release Year
            </label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              min="1900"
              max="2030"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
              placeholder="2024"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              min="1"
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
              placeholder="120"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Director
            </label>
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
              placeholder="Director name"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Cast</label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
              placeholder="Main cast members"
            />
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
            placeholder="Brief description of the media content..."
          />
        </div>

        <div>
          <label className="block text-white font-medium mb-2 ">
            Media File *
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="video/*"
            required
            className=" w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:cursor-pointer file:bg-[#0DCAF0] file:text-black file:font-medium hover:file:bg-[#0DCAF0]/90"
          />
          {mediaFile && (
            <p className="text-gray-300 text-sm mt-2">
              Selected: {mediaFile.name} (
              {(mediaFile.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {isSubmitting && uploadProgress > 0 && (
          <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
            <div
              className="bg-[#0DCAF0] h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
            <p className="text-white text-sm mt-2 text-center">
              Uploading to S3... {uploadProgress}%
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !isAuthenticated}
          className="w-full bg-[#0DCAF0] text-black py-3 px-6 rounded font-bold hover:bg-[#0DCAF0]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Uploading..." : "Upload Media"}
        </button>

        {submitStatus === "success" && (
          <div className="bg-green-900/20 border border-green-500 rounded p-4 text-green-300">
            Media uploaded successfully! It will be reviewed before being
            published.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="bg-red-900/20 border border-red-500 rounded p-4 text-red-300">
            {!isAuthenticated
              ? "Please log in to upload media."
              : "Failed to upload media. Please try again."}
          </div>
        )}
      </form>
    </div>
  );
}
