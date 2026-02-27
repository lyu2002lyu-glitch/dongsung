import { motion } from 'motion/react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
}

export default function PageHeader({ title, subtitle, imageSrc = "https://picsum.photos/seed/office/1920/400?grayscale" }: PageHeaderProps) {
  return (
    <div className="relative h-[400px] flex items-center justify-center bg-black overflow-hidden mt-20">
      <div className="absolute inset-0 z-0">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="relative z-10 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 font-light"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
