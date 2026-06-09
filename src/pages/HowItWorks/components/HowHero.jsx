import React from 'react';

export default function HowHero() {
  return (
    <section className="relative h-[60vh] min-h-[500px] w-full flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/hw_hero.png')`,
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mt-20">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl md:text-7xl font-cursive mb-6 leading-tight">
            The Art of the<br />Experience
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
            Discover a seamless journey from your first inquiry to the final exquisite bite. We curate every detail of your private culinary event, ensuring effortless luxury at every step.
          </p>
        </div>
      </div>
    </section>
  );
}
