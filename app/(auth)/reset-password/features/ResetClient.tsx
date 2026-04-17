"use client";

import { useEffect, useState } from "react";
import ResetForm from "./ResetForm";

export default function ResetClient() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      setLoading(false);
      return;
    }
    const params = new URLSearchParams(hash.replace("#", ""));

    const accessToken = params.get("access_token");
    const type = params.get("type");

    if (type === "recovery" && accessToken) {
      setToken(accessToken);
    }

    setLoading(false);
  }, []);
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">
          Validating reset link...
        </p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 text-center border">
          
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-100">
              <svg
                className="w-7 h-7 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01M12 3a9 9 0 110 18 9 9 0 010-18z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-800">
            Invalid or expired link
          </h1>

          {/* Description */}
          <p className="text-gray-500 mt-2 text-sm">
            This password reset link is invalid or has expired.
          </p>

          <p className="text-gray-500 text-sm">
            Please request a new password reset link.
          </p>

          {/* Actions */}
          <div className="mt-6 space-y-3">
            <a
              href="/forgot-password"
              className="block w-full bg-black text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              Request New Link
            </a>

            <a
              href="/login"
              className="block text-sm text-gray-500 hover:text-gray-700"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    );
  }
  return <ResetForm accessToken={token} />;
}