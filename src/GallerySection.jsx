import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const GALLERY_IMAGES = [
  { src: '/gallery-1.png', alt: 'Receiving recognition certificate' },
  { src: '/gallery-2.png', alt: 'Achievement award ceremony' },
  { src: '/gallery-3.png', alt: 'Team appreciation moment' },
  { src: '/gallery-4.png', alt: 'Award presentation photo' },
  { src: '/gallery-5.png', alt: 'Corporate excellence recognition' },
];

export default function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const tick = () => {
      setCurrentSlide((prev) => (prev + 1) % GALLERY_IMAGES.length);
    };

    const slideTimer = window.setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      tick();
    }, 5000);

    return () => window.clearInterval(slideTimer);
  }, []);

  return (
    <div className="w-full px-4 mt-6 mb-20">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/40"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 pointer-events-none" />
          {GALLERY_IMAGES.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              className={`w-full h-[360px] md:h-[440px] object-cover absolute inset-0 transition-opacity duration-700 ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          <div className="relative z-20 h-[360px] md:h-[440px] flex flex-col justify-end p-6 md:p-8">
            <p className="text-white/80 text-sm uppercase tracking-[0.25em]">Highlights</p>
            <h3 className="text-white text-2xl md:text-3xl font-bold mt-2">Awards & Recognition</h3>
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {GALLERY_IMAGES.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentSlide === index ? 'w-8 bg-white' : 'w-2.5 bg-white/45'
                    }`}
                    aria-label={`Show gallery image ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlide((prevSlide) =>
                      prevSlide === 0 ? GALLERY_IMAGES.length - 1 : prevSlide - 1
                    )
                  }
                  className="h-10 w-10 rounded-full border border-white/60 text-white hover:bg-white/20"
                  aria-label="Previous gallery image"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlide((prevSlide) => (prevSlide + 1) % GALLERY_IMAGES.length)
                  }
                  className="h-10 w-10 rounded-full border border-white/60 text-white hover:bg-white/20"
                  aria-label="Next gallery image"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
