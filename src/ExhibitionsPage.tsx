import { useState } from "react";
import { SiteHeader } from "./SiteHeader";
import { RegistrationForms } from "./RegistrationForms";
import { JoinCtaSection } from "./JoinCtaSection";
import { Calendar, MapPin, Sparkles, Lock } from "lucide-react";
import { Link } from "react-router-dom";

export function ExhibitionsPage() {
  const [activeForm, setActiveForm] = useState<"visitor" | "exhibitor" | null>(null);

  const activeExpo = {
    id: "virtual-digital-expo-noida",
    title: "Virtual Digital Expo (Noida)",
    date: "July 2026 (1st - 2nd Week)",
    status: "Upcoming",
    location: "Noida (Virtual)",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop",
  };

  const blurredExhibitions = [
    {
      id: "virtual-digital-expo-gurugram",
      title: "Virtual Property Expo (Gurugram)",
      location: "Gurugram (Virtual)",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "virtual-digital-expo-mumbai",
      title: "Premium Property Expo (Mumbai)",
      location: "Mumbai (Virtual)",
      image: "https://images.unsplash.com/photo-1562618956-4308528a2a8e?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "virtual-digital-expo-bengaluru",
      title: "Digital Metro Expo (Bengaluru)",
      location: "Bengaluru (Virtual)",
      image: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "virtual-digital-expo-pune",
      title: "Elite Estates Show (Pune)",
      location: "Pune (Virtual)",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-[#0a1121] font-sans selection:bg-[#f26522] selection:text-white">
      {/* Header section */}
      <div className="bg-[#0a1121] pt-6 pb-8">
        <SiteHeader variant="dark" className="relative z-10" />
      </div>

      {/* Hero Intro */}
      <section className="relative py-20 bg-[#0a1121] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-screen"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1121]/30 pointer-events-none"></div>
        
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-[#f26522] font-black uppercase tracking-widest text-sm mb-4 inline-flex items-center gap-2 px-3 py-1 bg-[#f26522]/10 rounded-full border border-[#f26522]/30">
            <Sparkles className="w-4 h-4 animate-pulse" /> Virtual Pavilions & Shows
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-none">
            Upcoming <span className="text-[#f26522]">Exhibitions</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore premium digital property expos. Click below to register early.
          </p>
        </div>
      </section>

      {/* Cards Grid Section */}
      <section className="py-20 max-w-[1200px] mx-auto px-6 md:px-12 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Noida Card (Active / Interactive) */}
          <div className="flex flex-col group">
            {/* The Premium Card */}
            <div 
              onClick={() => setActiveForm("visitor")}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_rgba(242,101,34,0.15)] hover:border-[#f26522]/40 transition-all duration-500 relative aspect-[4/5] flex flex-col justify-end p-6 cursor-pointer"
            >
              {/* Image */}
              <img 
                src={activeExpo.image} 
                alt={activeExpo.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25"></div>
              
              {/* Active Badge */}
              <div className="absolute top-4 left-4 bg-[#f26522] text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white block animate-ping"></span>
                {activeExpo.status}
              </div>

              {/* Title & Location */}
              <div className="relative z-10 text-white mb-2">
                <h3 className="text-2xl font-black tracking-tight leading-tight mb-2 group-hover:text-[#f26522] transition-colors">
                  {activeExpo.title}
                </h3>
                <div className="flex items-center gap-1.5 text-gray-200 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#f26522]" />
                  <span>{activeExpo.location}</span>
                </div>
              </div>
            </div>

            {/* Date Display Below The Card */}
            <div className="mt-4 flex items-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-2xl shadow-sm self-center group-hover:border-[#f26522]/30 transition-colors">
              <Calendar className="w-4.5 h-4.5 text-[#f26522]" />
              <div className="text-left">
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black leading-none mb-0.5">Event Date</p>
                <p className="text-gray-800 font-extrabold text-xs md:text-sm leading-tight">{activeExpo.date}</p>
              </div>
            </div>
          </div>

          {/* Blurred Cards */}
          {blurredExhibitions.map((expo) => (
            <div key={expo.id} className="flex flex-col">
              {/* Blurred Card */}
              <div 
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/60 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative aspect-[4/5] flex flex-col justify-end p-6 select-none pointer-events-none"
              >
                {/* Background Image */}
                <img 
                  src={expo.image} 
                  alt={expo.title} 
                  className="absolute inset-0 w-full h-full object-cover filter blur-[8px] scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1121]/95 via-[#0a1121]/85 to-[#0a1121]/75"></div>
                
                {/* Lock Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                  <div className="w-12 h-12 bg-white/5 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center shadow-lg mb-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <span className="text-gray-400 font-black tracking-widest text-[9px] uppercase bg-white/5 border border-white/10 px-2 py-0.5 rounded-full mb-1">
                    Upcoming
                  </span>
                  <h4 className="text-white text-lg font-bold tracking-tight px-2 opacity-35 leading-tight">
                    {expo.title}
                  </h4>
                </div>

                {/* Footer details */}
                <div className="relative z-10 w-full border-t border-white/10 pt-3 flex justify-between items-center text-gray-500 text-[10px]">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{expo.location}</span>
                  </div>
                </div>
              </div>

              {/* Status Below Blurred Cards */}
              <div className="mt-4 flex items-center gap-2 bg-gray-100 border border-gray-200/60 px-4 py-3 rounded-2xl self-center">
                <Calendar className="w-4.5 h-4.5 text-gray-400" />
                <div className="text-left">
                  <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black leading-none mb-0.5">Event Date</p>
                  <p className="text-gray-500 font-bold text-xs md:text-sm leading-tight">To Be Announced</p>
                </div>
              </div>
            </div>
          ))}

        </div>

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
