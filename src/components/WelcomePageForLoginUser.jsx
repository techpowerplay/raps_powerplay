import React from "react";

export const WelcomeEmail = ({ userName }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">🎉 Welcome {userName}!</h1>
        <p className="text-gray-700 mb-6">
          We're excited to have you on <span className="font-semibold">MyWebsite</span>.  
          You can now explore all features, connect with others, and get started with your journey. 🚀
        </p>
        <a
          href="https://rapspowerplay.com"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Go to Dashboard
        </a>
        <div className="mt-6 text-sm text-gray-500">
          If you didn’t request this login, please ignore this email.
        </div>
      </div>
    </div>
  );
};
