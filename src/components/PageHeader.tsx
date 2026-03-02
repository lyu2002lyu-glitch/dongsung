import { motion } from 'motion/react';
import { GENERATED_IMAGES } from '../constants/images';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative h-[400px] flex items-center justify-center bg-white border-b border-gray-100 mt-20">
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-10 tracking-tight">
            {title}
          </h1>
          <div className="w-12 h-[1px] bg-black mx-auto mb-10" />
          <p className="text-sm md:text-base text-gray-400 font-light tracking-[0.3em] uppercase max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
