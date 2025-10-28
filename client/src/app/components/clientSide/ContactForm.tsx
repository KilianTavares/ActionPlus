"use client";

import { useState } from "react";
import { API_ENDPOINTS } from "@/config/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(API_ENDPOINTS.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        enquiryType: "general",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-800/50 p-8 rounded-lg border border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-white font-medium mb-2">
              Enquiry Type *
            </label>
            <select
              name="enquiryType"
              value={formData.enquiryType}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
            >
              <option value="general">General</option>
              <option value="complaint">Complaint</option>
              <option value="media-request">Media Request</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-white font-medium mb-2">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full bg-gray-700 text-white px-4 py-3 rounded border border-gray-600 focus:border-[#0DCAF0] focus:outline-none"
            placeholder="Tell us how we can help..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0DCAF0] text-black py-3 px-6 rounded font-bold hover:bg-[#0DCAF0]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {submitStatus === "success" && (
          <div className="bg-green-900/20 border border-green-500 rounded p-4 text-green-300">
            Message sent successfully! We'll get back to you soon.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="bg-red-900/20 border border-red-500 rounded p-4 text-red-300">
            Failed to send message. Please try again.
          </div>
        )}
      </form>
    </div>
  );
}
