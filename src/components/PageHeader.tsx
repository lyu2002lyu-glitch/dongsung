import { motion } from 'motion/react';
import { GENERATED_IMAGES } from '../constants/images';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative h-[400px] flex items-center justify-center bg-black mt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="https://raw.githubusercontent.com/lyu2002lyu-glitch/dongsung/main/movie_ver03.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-10 tracking-tight">
            {title}
          </h1>
          <div className="w-12 h-[1px] bg-white/50 mx-auto mb-10" />
          <p className="text-sm md:text-base text-gray-300 font-light tracking-[0.3em] uppercase max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
