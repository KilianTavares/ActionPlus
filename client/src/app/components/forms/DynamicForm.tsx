"use client";

import { useState } from "react";
import { FormInput, DynamicFormProps } from "@/types";

export default function DynamicForm({
  header,
  subheading,
  inputs,
  endpoint,
  onSuccess,
  onError,
}: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed");

      onSuccess?.();
      setFormData({});
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="max-w-md mx-auto text-white bg-gray-800/50
border-gray-700 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-2">{header}</h2>
      <p className="text-gray-400 mb-6">{subheading}</p>

      <form onSubmit={handleSubmit} className="space-y-4 ">
        {inputs.map((input) => (
          <div key={input.name}>
            <label className="block font-medium text-gray-500 mb-1">
              {input.header}
            </label>
            <input
              type={input.type}
              name={input.name}
              required={input.required}
              placeholder={input.placeholder}
              value={formData[input.name] || ""}
              onChange={(e) => handleInputChange(input.name, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {}
    </div>
  );
}
