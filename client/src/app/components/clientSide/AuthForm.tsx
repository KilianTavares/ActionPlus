"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormInput, authFormProps } from "../../../../../types/interfaces";
import { useAuth } from "../../../contexts/AuthContext";

const signUpInputs: FormInput[] = [
  {
    type: "text",
    header: "Full Name",
    name: "name",
    required: true,
    placeholder: "Enter your full name",
  },
  {
    type: "email",
    header: "Email Address",
    name: "email",
    required: true,
    placeholder: "Enter your email",
  },
  {
    type: "password",
    header: "Password",
    name: "password",
    required: true,
    placeholder: "Create a password",
  },
];

const signInInputs: FormInput[] = [
  {
    type: "email",
    header: "Email Address",
    name: "email",
    required: true,
    placeholder: "Enter your email",
  },
  {
    type: "password",
    header: "Password",
    name: "password",
    required: true,
    placeholder: "Enter your password",
  },
];

export default function AuthForm() {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const endpoint = signUp
    ? `${process.env.NEXT_PUBLIC_AWS_APIGATEWAY_URL_dev}/user/create`
    : `${process.env.NEXT_PUBLIC_AWS_APIGATEWAY_URL_dev}/user/login`;

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Submitting to:", endpoint);
    console.log("Form data:", formData);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Submission failed");

      const data = await response.json();
      if (data.success && data.accessToken) {
        login(data.accessToken, data.user);
        router.push("/");
      }
      setFormData({});
    } catch (error) {
      alert(
        `Error: ${error instanceof Error ? error.message : "An error occurred"}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="max-w-md mx-auto text-white bg-gray-800/50
border-gray-700 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-2">
        {signUp ? "Sign Up" : "Sign In"}
      </h2>
      <p className="text-gray-400 mb-6">
        {signUp
          ? "Join ActionPlus to discover amazing content"
          : "Welcome back, Sign in to get back into the action"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 ">
        {(signUp ? signUpInputs : signInInputs).map((input) => (
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
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : signUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <button
        onClick={() => setSignUp(!signUp)}
        className="text-gray-600 mt-4 w-full text-center"
      >
        {signUp ? "Already have an account? Sign in" : "New here? Sign up here"}
      </button>
    </div>
  );
}
