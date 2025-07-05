import React from 'react';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-bg-dark text-white text-center px-4">


      <h1 className="text-4xl md:text-7xl font-extrabold leading-tight mb-4">
        Build your SaaS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">10x <br />faster</span> with AI-powered <br /> tools
      </h1>

      <p className="text-lg text-text-muted max-w-2xl mt-4 mb-8">
        Launch your next project in minutes, not months. SaaSFlow gives you everything you need to build, launch, and grow your SaaS business.
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        <button className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition">
          Get Started Free →
        </button>
        <button className="border border-pink-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-pink-500/10 transition">
          See How It Works
        </button>
      </div>
    </section>
  );
}
