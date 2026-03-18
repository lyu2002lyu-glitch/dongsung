import { motion } from 'motion/react';
import { GENERATED_IMAGES } from '../constants/images';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
  variant?: 'dark' | 'light';
  paddingTop?: string;
  paddingBottom?: string;
  pcVerticalAlignment?: 'center' | 'bottom';
}

export default function PageHeader({ title, subtitle, imageSrc, variant = 'dark', paddingTop, paddingBottom, pcVerticalAlignment = 'center' }: PageHeaderProps) {
  const isLight = variant === 'light';
  const verticalAlignClass = pcVerticalAlignment === 'bottom' ? 'items-center md:items-end' : 'items-center';
  const contentPaddingClass = pcVerticalAlignment === 'bottom' ? 'md:pb-20' : '';

  return (
    <div className={`relative min-h-[300px] h-auto md:h-[400px] flex ${verticalAlignClass} justify-center ${paddingTop || 'pt-[100px] md:py-0'} ${paddingBottom || 'pb-[20px] md:py-0'} overflow-hidden ${isLight ? 'bg-white' : 'bg-black'}`}>
      {!isLight && (
        <div className="absolute inset-0 z-0">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div 
              className="w-full h-full absolute inset-0"
              dangerouslySetInnerHTML={{
                __html: `
                  <video
                    autoplay
                    loop
                    muted
                    playsinline
                    class="w-full h-full object-cover opacity-60"
                  >
                    <source src="/movie_ver03.mp4" type="video/mp4" />
                  </video>
                `
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        </div>
      )}

      <div className={`relative z-10 text-center px-4 ${contentPaddingClass}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className={`text-3xl md:text-h1 mb-10 tracking-tight font-bold ${isLight ? 'text-black' : 'text-white'}`}>
            {title}
          </h1>
          <div className={`w-12 h-[1px] mx-auto mb-10 ${isLight ? 'bg-black/20' : 'bg-white/50'}`} />
          <p className={`text-body-s md:text-body-m tracking-[0.1em] md:tracking-[0.3em] uppercase max-w-2xl mx-auto ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
