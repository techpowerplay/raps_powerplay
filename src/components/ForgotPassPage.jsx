import React from "react";

const WelcomeEmail = ({ userName }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Banner Image with Overlay Text */}
        <div className="relative">
          <img
            src="https://i.ibb.co/vY4Srz2/gaming-banner.jpg" 
            alt="RapsPowerPlay"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              🎮 RapsPowerPlay
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            Welcome {userName}!
          </h2>
          <p className="text-gray-700 mb-6">
            Get ready for an exciting gaming experience on{" "}
            <span className="font-semibold">RapsPowerPlay</span>.  
            Battle in epic matches like <span className="text-red-500">BGMI</span>,{" "}
            <span className="text-green-500">Free Fire</span>, and{" "}
            <span className="text-yellow-500">Call of Duty</span>. 🚀
          </p>
          <a
            href="https://yourwebsite.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Go to Dashboard
          </a>
          <div className="mt-6 text-sm text-gray-500">
            If you didn’t request this login, please ignore this email.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeEmail;
