import { useState } from "react";
import { SiteHeader } from "./SiteHeader";
import { RegistrationForms } from "./RegistrationForms";
import { JoinCtaSection } from "./JoinCtaSection";
import { Sparkles, Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function GalleryPage() {
  const [activeForm, setActiveForm] = useState<"visitor" | "exhibitor" | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "halls" | "register" | "helpdesk">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = [
    {
      src: "/halls/hall-aisle.png",
      title: "Expo Hall Aisle",
      category: "halls",
      categoryLabel: "Expo Hall"
    },
    {
      src: "/halls/hall-overview.png",
      title: "Main Hall Overview",
      category: "halls",
      categoryLabel: "Expo Hall"
    },
    {
      src: "/halls/luxe-towers-hall.png",
      title: "Luxe Towers Pavilion",
      category: "halls",
      categoryLabel: "Expo Hall"
    },
    {
      src: "/halls/registration-lobby.png",
      title: "Virtual Registration Lobby",
      category: "halls",
      categoryLabel: "Expo Hall"
    },
    {
      src: "/halls/vertex-elite-area.png",
      title: "Vertex Elite Pavilion",
      category: "halls",
      categoryLabel: "Expo Hall"
    },
    {
      src: "/halls/premium-display.png",
      title: "Premium Virtual Display",
      category: "halls",
      categoryLabel: "Expo Hall"
    },
    {
      src: "/halls/virtual-expo-stage.png",
      title: "Virtual Expo Stage",
      category: "halls",
      categoryLabel: "Expo Hall"
    },
    {
      src: "/halls/crown-estates-view.png",
      title: "Crown Estates Exhibition View",
      category: "halls",
      categoryLabel: "Expo Hall"
    },
    {
      src: "/register/register-desk.png",
      title: "Main Registration Desk",
      category: "register",
      categoryLabel: "Registration"
    },
    {
      src: "/register/register-desk-view.png",
      title: "Visitor Welcoming Lobby",
      category: "register",
      categoryLabel: "Registration"
    },
    {
      src: "/help-desk/help-desk.png",
      title: "Help Desk Hub",
      category: "helpdesk",
      categoryLabel: "Help Desk"
    },
    {
      src: "/help-desk/help-desk-view.png",
      title: "Interactive Virtual Support",
      category: "helpdesk",
      categoryLabel: "Help Desk"
    }
  ];

  // Filter images based on selected category
  const filteredImages = selectedCategory === "all" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const categories = [
    { id: "all", label: "All Spaces" },
    { id: "halls", label: "Expo Halls" },
    { id: "register", label: "Registration Lobby" },
    { id: "helpdesk", label: "Help Desk" }
  ];

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#0a1121] font-sans selection:bg-[#f26522] selection:text-white">
      {/* Header section */}
      <div className="bg-[#0a1121] py-4">
        <SiteHeader variant="dark" className="relative z-10" />
      </div>

      {/* Gallery Section */}
      <section className="py-16 max-w-[1400px] mx-auto px-6 md:px-12 relative z-20">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id as any);
                setLightboxIndex(null);
              }}
              className={`px-6 py-3 font-bold rounded-full text-sm transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-[#f26522] text-white shadow-lg shadow-[#f26522]/20"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-[#f26522]/40 hover:text-[#f26522]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Trailer Section */}
        <div className="mb-16 bg-white border border-gray-200/80 rounded-3xl p-6 md:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.05)] hover:border-[#f26522]/30 transition-colors duration-500">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Video Container */}
            <div className="w-full lg:w-3/5 aspect-video rounded-2xl overflow-hidden shadow-lg bg-[#0a1121] border border-white/10">
              <video
                src="/video/EXPO Video.mp4"
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content Info */}
            <div className="w-full lg:w-2/5 flex flex-col justify-center">
              <span className="text-[#f26522] font-black uppercase tracking-widest text-[10px] bg-[#f26522]/10 border border-[#f26522]/20 px-3 py-1 rounded-full w-fit mb-4">
                Official Trailer
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0a1121] tracking-tight leading-tight mb-4">
                Experience the Future of Property Discovery
              </h2>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                Watch our official trailer showcasing the highly immersive 3D corridors, interactive booths, developer virtual presentation spaces, and real-time support systems engineered for DB Expo 2026.
              </p>
              <button
                type="button"
                onClick={() => setActiveForm("visitor")}
                className="w-fit bg-[#f26522] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-[#d9561c] shadow-md shadow-[#f26522]/25 transition-all text-sm"
              >
                Register For Early Access
              </button>
            </div>
          </div>
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((img, index) => (
            <div
              key={index}
              onClick={() => setLightboxIndex(index)}
              className="bg-white border border-gray-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] hover:border-[#f26522]/30 transition-all duration-500 group cursor-pointer flex flex-col"
            >
              {/* Image box */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Floating category pill */}
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[10px] text-[#0a1121] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-sm">
                  {img.categoryLabel}
                </span>
              </div>

              {/* Title box */}
              <div className="p-5 border-t border-gray-100">
                <h3 className="font-extrabold text-gray-800 text-sm group-hover:text-[#f26522] transition-colors leading-tight">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox / Slider Modal */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-[#0a1121]/98 flex flex-col justify-between p-6">
            
            {/* Top Bar */}
            <div className="flex justify-between items-center text-white relative z-10">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#f26522]" />
                <span className="font-bold text-sm tracking-wide">
                  Category: <span className="text-[#f26522]">{filteredImages[lightboxIndex].categoryLabel}</span>
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Slider Main View */}
            <div className="flex-1 flex items-center justify-between relative max-w-[1200px] w-full mx-auto my-4">
              
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-0 md:left-4 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              {/* Image Frame */}
              <div className="flex-1 h-full max-h-[70vh] flex flex-col items-center justify-center px-12">
                <img
                  src={filteredImages[lightboxIndex].src}
                  alt={filteredImages[lightboxIndex].title}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/5"
                />
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-0 md:right-4 z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 flex items-center justify-center text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center text-white mb-4 relative z-10">
              <h2 className="text-xl md:text-2xl font-black mb-1">{filteredImages[lightboxIndex].title}</h2>
              <p className="text-gray-400 text-xs">
                Image {lightboxIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        )}

        <p className="text-center mt-20">
          <Link to="/" className="text-[#f26522] font-semibold hover:underline inline-flex items-center gap-2">
            ← Back to Home Page
          </Link>
        </p>
      </section>

      <JoinCtaSection onRegister={() => setActiveForm("visitor")} />
      <RegistrationForms activeForm={activeForm} onClose={() => setActiveForm(null)} />
    </div>
  );
}
