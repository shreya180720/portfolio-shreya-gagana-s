'use client';

import * as React from 'react';
import { motion, PanInfo } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Testimonial {
  id: number | string;
  name: string;
  role?: string;
  avatar: string;
  description: string;
}

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  showArrows?: boolean;
  showDots?: boolean;
}

const TestimonialCarousel = React.forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  ({ className, testimonials, showArrows = true, showDots = true, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [exitX, setExitX] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);

    const goNext = React.useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const goPrev = React.useCallback(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    React.useEffect(() => {
      if (isDragging) return;
      const timer = setInterval(goNext, 5000);
      return () => clearInterval(timer);
    }, [goNext, isDragging]);

    const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);
      if (Math.abs(info.offset.x) > 80) {
        const direction = info.offset.x < 0 ? 'next' : 'prev';
        setExitX(info.offset.x > 0 ? 300 : -300);
        setTimeout(() => {
          direction === 'next' ? goNext() : goPrev();
          setExitX(0);
        }, 180);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('h-[460px] w-full flex items-center justify-center', className)}
        {...props}
      >
        <div className="relative w-[420px] h-[390px]">
          {testimonials.map((testimonial, index) => {
            const isCurrentCard = index === currentIndex;
            const isPrevCard = index === (currentIndex + 1) % testimonials.length;
            const isNextCard = index === (currentIndex + 2) % testimonials.length;

            if (!isCurrentCard && !isPrevCard && !isNextCard) return null;

            return (
              <motion.div
                key={testimonial.id}
                className={cn(
                  'absolute w-full h-full rounded-2xl overflow-hidden',
                  isCurrentCard ? 'cursor-grab active:cursor-grabbing' : 'cursor-default',
                  'bg-white border border-slate-200/80',
                  'dark:bg-[#1c1108] dark:border-orange-900/30',
                  'shadow-xl dark:shadow-[0_0_32px_rgba(249,115,22,0.08)]',
                )}
                style={{ zIndex: isCurrentCard ? 3 : isPrevCard ? 2 : 1 }}
                drag={isCurrentCard ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={isCurrentCard ? handleDragEnd : undefined}
                initial={{ scale: 0.95, opacity: 0, y: isCurrentCard ? 0 : isPrevCard ? 8 : 16, rotate: isCurrentCard ? 0 : isPrevCard ? -2 : -4 }}
                animate={{
                  scale: isCurrentCard ? 1 : 0.95,
                  opacity: isCurrentCard ? 1 : isPrevCard ? 0.55 : 0.25,
                  x: isCurrentCard ? exitX : 0,
                  y: isCurrentCard ? 0 : isPrevCard ? 8 : 16,
                  rotate: isCurrentCard ? exitX / 22 : isPrevCard ? -2 : -4,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              >
                {showArrows && isCurrentCard && (
                  <div className="absolute inset-x-0 top-3 flex justify-between px-4 z-10">
                    <button
                      onClick={goPrev}
                      className="text-xl select-none text-slate-300 hover:text-blue-500 dark:text-orange-900/60 dark:hover:text-orange-400 transition-colors duration-200"
                      aria-label="Previous"
                    >
                      ←
                    </button>
                    <button
                      onClick={goNext}
                      className="text-xl select-none text-slate-300 hover:text-blue-500 dark:text-orange-900/60 dark:hover:text-orange-400 transition-colors duration-200"
                      aria-label="Next"
                    >
                      →
                    </button>
                  </div>
                )}

                <div className="p-7 pt-9 flex flex-col items-center gap-3 h-full overflow-hidden">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-blue-400/40 dark:ring-orange-500/40 flex-shrink-0"
                  />
                  <div className="text-center flex-shrink-0">
                    <h3 className="text-base font-semibold font-poppins text-slate-900 dark:text-[#fef3e2]">
                      {testimonial.name}
                    </h3>
                    {testimonial.role && (
                      <p className="text-xs font-inter text-blue-500 dark:text-orange-400 mt-0.5">
                        {testimonial.role}
                      </p>
                    )}
                  </div>
                  <p className="text-center text-sm font-inter text-slate-500 dark:text-[#c49a6c] leading-relaxed italic overflow-hidden line-clamp-5">
                    &ldquo;{testimonial.description}&rdquo;
                  </p>
                </div>
              </motion.div>
            );
          })}

          {showDots && (
            <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'bg-blue-500 dark:bg-orange-500 w-4'
                      : 'bg-slate-300 dark:bg-orange-900/50',
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);
TestimonialCarousel.displayName = 'TestimonialCarousel';

export { TestimonialCarousel };
