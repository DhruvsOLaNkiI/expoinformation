import { useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageGallerySliderProps = {
  title: string;
  images: string[];
  slideIndex: number;
  dragOffset: number;
  onClose: () => void;
  onSlideChange: (index: number) => void;
  onDragOffsetChange: (offset: number) => void;
};

export function ImageGallerySlider({
  title,
  images,
  slideIndex,
  dragOffset,
  onClose,
  onSlideChange,
  onDragOffsetChange,
}: ImageGallerySliderProps) {
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const goToSlide = useCallback(
    (index: number) => {
      const len = images.length;
      onSlideChange(((index % len) + len) % len);
      onDragOffsetChange(0);
    },
    [images.length, onSlideChange, onDragOffsetChange]
  );

  const handleDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    isDragging.current = true;
    onDragOffsetChange(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current || dragStartX.current === null) return;
    onDragOffsetChange(clientX - dragStartX.current);
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    const threshold = 60;
    if (dragOffset < -threshold) goToSlide(slideIndex + 1);
    else if (dragOffset > threshold) goToSlide(slideIndex - 1);
    else onDragOffsetChange(0);
    dragStartX.current = null;
    isDragging.current = false;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToSlide(slideIndex - 1);
      if (e.key === "ArrowRight") goToSlide(slideIndex + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, slideIndex, goToSlide]);

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute top-4 right-4 bg-white text-[#0a1121] rounded-md px-3 py-1 text-sm font-bold z-10"
        onClick={onClose}
      >
        Close
      </button>
      <div className="max-w-6xl w-full relative" onClick={(e) => e.stopPropagation()}>
        <p className="text-white text-sm md:text-base font-bold mb-4 text-center">{title}</p>

        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center hover:bg-[#f26522] transition-colors"
          onClick={() => goToSlide(slideIndex - 1)}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center hover:bg-[#f26522] transition-colors"
          onClick={() => goToSlide(slideIndex + 1)}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div
          className="overflow-hidden rounded-xl border border-white/20 touch-pan-y select-none mx-10 md:mx-14"
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          onTouchCancel={handleDragEnd}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(calc(-${slideIndex * 100}% + ${dragOffset}px))`,
              transition: dragOffset !== 0 ? "none" : "transform 0.35s ease-out",
            }}
          >
            {images.map((img, i) => (
              <div key={img} className="min-w-full flex-shrink-0">
                <img
                  src={img}
                  alt={`${title} ${i + 1}`}
                  className="w-full max-h-[75vh] object-contain bg-black/40 pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === slideIndex ? "w-8 bg-[#f26522]" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
        <p className="text-center text-white/70 text-xs mt-2">
          Swipe left or right · {slideIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
