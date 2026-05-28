import { useState } from "react";
import {
  Calendar, Clock, MonitorSmartphone, Users, Gift,
  ChevronRight, Home, Video, Box, Percent, IndianRupee,
  TrendingUp, Building2, Landmark, Briefcase, Glasses,
  Smartphone, Bot, MessageCircle, ShieldCheck,
  Facebook, Linkedin, Instagram, Youtube, Phone, Mail, Globe
} from "lucide-react";
import { ImageGallerySlider } from "./ImageGallerySlider";
import { RegistrationForms } from "./RegistrationForms";
import { SiteHeader } from "./SiteHeader";
import { JoinCtaSection } from "./JoinCtaSection";
import { Logo } from "./Logo";

const exploreFeatures = [
  { id: 1, icon: Home, title: "Explore Premium\nReal Estate Projects" },
  { id: 2, icon: Users, title: "Connect Directly\nWith Developers" },
  { id: 3, icon: Video, title: "Live Consultations\n& Expert Advice" },
  { id: 4, icon: Box, title: "Immersive 3D Property\nWalkthroughs" },
  { id: 5, icon: Percent, title: "Exclusive Expo\nOffers & Discounts" },
  { id: 6, icon: IndianRupee, title: "Home Loan & Finance\nSolutions" },
];

const attendees = [
  { id: 1, icon: Users, title: "HOME BUYERS", desc: "Find your dream home from top projects in one virtual place." },
  { id: 2, icon: TrendingUp, title: "INVESTORS", desc: "Discover high-potential investment opportunities & grow your portfolio." },
  { id: 3, icon: Building2, title: "DEVELOPERS", desc: "Showcase your projects, generate quality leads & expand your reach." },
  { id: 4, icon: Landmark, title: "FINANCE PARTNERS", desc: "Connect with genuine leads & offer the best financial solutions." },
  { id: 5, icon: Briefcase, title: "CHANNEL PARTNERS", desc: "Build relationships & collaborate for mutual growth." },
];

const whyReasons = [
  { id: 1, icon: Glasses, title: "Virtual & Interactive\nExperience" },
  { id: 2, icon: Smartphone, title: "Easy Access From\nAny Device" },
  { id: 3, icon: Clock, title: "Save Time\n& Travel Cost" },
  { id: 4, icon: Bot, title: "AI-Powered Property\nDiscovery" },
  { id: 5, icon: MessageCircle, title: "Real-time Chat\n& Support" },
  { id: 6, icon: ShieldCheck, title: "Secure & Seamless\nConnections" },
];

const bottomStats = [
  { id: 1, icon: Users, value: "500+", label: "EXPECTED\nVISITORS" },
  { id: 2, icon: Home, value: "60", label: "PAVILIONS" },
  { id: 3, icon: Building2, value: "100+", label: "PROJECTS" },
  { id: 4, icon: Briefcase, value: "50+", label: "DEVELOPERS" },
  { id: 5, icon: Landmark, value: "20+", label: "FINANCE\nPARTNERS" },
];

export function HomePage() {
  const expoHallGallery = [
    "/halls/hall-aisle.png",
    "/halls/hall-overview.png",
    "/halls/luxe-towers-hall.png",
    "/halls/registration-lobby.png",
    "/halls/vertex-elite-area.png",
    "/halls/premium-display.png",
    "/halls/virtual-expo-stage.png",
    "/halls/crown-estates-view.png",
  ];

  const registerGallery = [
    "/register/register-desk.png",
    "/register/register-desk-view.png",
  ];

  const helpDeskGallery = [
    "/help-desk/help-desk.png",
    "/help-desk/help-desk-view.png",
  ];

  const [activeGallery, setActiveGallery] = useState<"expo" | "register" | "helpDesk" | null>(null);
  const [activeForm, setActiveForm] = useState<"visitor" | "exhibitor" | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const openGallery = (type: "expo" | "register" | "helpDesk") => {
    setSlideIndex(0);
    setDragOffset(0);
    setActiveGallery(type);
  };
  const hallCards = [
    {
      num: 1,
      label: "Expo hall",
      img: "/halls/expo-hall.png",
    },
    {
      num: 2,
      label: "Register",
      img: "/register/register-desk.png",
    },
    {
      num: 3,
      label: "Help Desk",
      img: "/help-desk/help-desk.png",
    },
    {
      num: 4,
      label: "booths",
      img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-[#0a1121] font-sans selection:bg-[#f26522] selection:text-white">
      {/* 1. HERO SECTION */}
      <section className="bg-[#0a1121] text-white pt-6 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none mix-blend-screen"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1121] pointer-events-none"></div>

        <SiteHeader variant="dark" className="relative z-10 mb-16" />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Left Content */}
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-2 leading-none">
              DB EXPO <span className="text-[#f26522]">2026</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-gray-200 mb-8 leading-snug">
              India's Virtual Property Discovery Platform
            </h2>
            <div className="space-y-4 text-gray-300 text-base md:text-lg mb-10 max-w-xl">
              <p>
                DBEXPO is a Discovery platform, designed to replicate Property Expos, eliminating the need for physically reaching out to different Real estate projects.
              </p>
              <p>
                DB EXPO creates an immersive and interactive environment, where home buyers / investors can explore various real estate projects & services under one <span className="italic text-white">"Virtual Roof"</span>, whether they are real estate projects or Finance Partners.
              </p>
              <p>
                DB Expo is coming up with its first ever virtual expo in the month of July 2026, Called "Virtual Property Expo - 2026."
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                type="button"
                onClick={() => setActiveForm("visitor")}
                className="bg-[#f26522] text-white px-8 py-4 font-bold rounded-md shadow-[0_0_20px_rgba(242,101,34,0.4)] hover:bg-[#d9561c] transition-all flex items-center justify-center text-lg tracking-wide hover:-translate-y-1"
              >
                PRE-REGISTRATION <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveForm("exhibitor")}
                className="border border-white/50 bg-white/5 text-white px-8 py-4 font-bold rounded-md hover:bg-white/10 transition-all text-lg tracking-wide hover:-translate-y-1"
              >
                BECOME AN EXHIBITOR
              </button>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 w-fit">
              <Gift className="w-10 h-10 text-[#f26522]" />
              <div>
                <p className="text-[#f26522] font-semibold text-lg leading-tight">Early Registrations Open Soon!</p>
                <p className="text-gray-300 text-sm">Be the first to explore. Be the first to benefit.</p>
              </div>
            </div>
          </div>

          {/* Hero Right — laptop monitor + phone */}
          <div className="hidden lg:flex w-full justify-end relative h-[500px] items-center">
            {/* Laptop / monitor */}
            <div className="relative w-full max-w-[650px] aspect-[16/10] bg-[#0d172e] rounded-t-2xl border-x-[6px] border-t-[6px] border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.8)] p-2 flex flex-col overflow-hidden z-10 transition-transform hover:scale-[1.02] duration-500">
              <div className="relative z-10 w-full h-full border border-white/10 rounded overflow-hidden bg-[#0a1121]">
                <video
                  src="/video/EXPO Video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
            </div>
            <div className="absolute bottom-[20px] left-[5%] right-[2%] h-4 bg-gray-500 rounded-b-3xl border-t border-gray-400 shadow-2xl z-10" />
            <div className="absolute bottom-[10px] left-[15%] right-[10%] h-2 bg-gray-700 rounded-b-full shadow-2xl z-0" />

            {/* Phone */}
            <div className="absolute -bottom-[10px] right-4 w-[160px] h-[320px] bg-[#0d172e] rounded-[2rem] border-[6px] border-gray-800 shadow-[20px_20px_40px_rgba(0,0,0,0.8)] overflow-hidden z-20 flex flex-col transition-transform hover:scale-[1.05] duration-500">
              <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-50">
                <div className="w-16 h-full bg-gray-800 rounded-b-xl flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-gray-600 mr-1" />
                  <div className="w-4 h-1 rounded-full bg-gray-900 border border-black" />
                </div>
              </div>
              <div className="flex-1 relative overflow-hidden bg-[#0a1121]">
                <img
                  src="/hero/expo-lobby-phone.png"
                  alt="Virtual Property Expo on mobile"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EVENT INFO BANNER (Overlapping) */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-20 -mt-16 mb-16">
        <div className="bg-[#0f172a] border border-[#f26522]/40 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-800 backdrop-blur-xl">
          <div className="py-6 px-4 md:px-8 flex items-center gap-4 group">
            <Calendar className="w-10 h-10 text-[#f26522] flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-white font-bold tracking-wide">JULY 2026</p>
              <p className="text-gray-400 text-xs mt-1 w-max">(To be declared soon)</p>
            </div>
          </div>
          <div className="py-6 px-4 md:px-8 flex items-center gap-4 group">
            <Clock className="w-10 h-10 text-[#f26522] flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-white font-bold tracking-wide">10:00 AM - 6:00 PM</p>
              <p className="text-gray-400 text-xs mt-1">Event Timing</p>
            </div>
          </div>
          <div className="py-6 px-4 md:px-8 flex items-center gap-4 group">
            <MonitorSmartphone className="w-10 h-10 text-[#f26522] flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-white font-bold tracking-wide">ON YOUR DEVICE</p>
              <p className="text-gray-400 text-xs mt-1">Event Venue</p>
            </div>
          </div>
          <div className="py-6 px-4 md:px-8 flex items-center gap-4 group">
            <Users className="w-10 h-10 text-[#f26522] flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <p className="text-white font-bold tracking-wide">500+</p>
              <p className="text-gray-400 text-xs mt-1">Expected Visitors</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. THE EXPO WILL BE SPREAD IN */}
      <section className="py-16 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Left Stats Block */}
          <div className="lg:w-1/3 bg-gray-100 rounded-3xl p-8 flex flex-col justify-center text-center shadow-inner border border-gray-200">
            <h3 className="uppercase font-bold text-gray-800 tracking-widest text-sm mb-10">THE EXPO WILL BE SPREAD IN</h3>
            <div className="grid grid-cols-3 gap-2 md:gap-4 divide-x divide-gray-300">
              <div className="flex flex-col items-center justify-center p-2">
                <div className="text-4xl md:text-5xl font-black text-[#f26522] mb-3">6</div>
                <div className="text-xs uppercase font-bold text-gray-700 whitespace-pre-line">EXPO HALLS</div>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <div className="text-4xl md:text-5xl font-black text-[#f26522] mb-3">10</div>
                <div className="text-xs uppercase font-bold text-gray-700 whitespace-pre-line">{"PAVILIONS\nPER EXPO HALL"}</div>
              </div>
              <div className="flex flex-col items-center justify-center p-2">
                <div className="text-4xl md:text-5xl font-black text-[#f26522] mb-3">60</div>
                <div className="text-xs uppercase font-bold text-gray-700 whitespace-pre-line">{"PAVILIONS\nIN TOTAL"}</div>
              </div>
            </div>
          </div>
          
          {/* Right Hall Cards Block */}
          <div className="lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {hallCards.map(({ num, label, img }) => (
              <div
                key={num}
                className={`rounded-2xl overflow-hidden aspect-[4/5] relative flex flex-col items-center p-4 border border-gray-800 shadow-xl group ${num === 1 || num === 2 || num === 3 ? "cursor-pointer" : "cursor-default"}`}
                onClick={() => {
                  if (num === 1) openGallery("expo");
                  if (num === 2) openGallery("register");
                  if (num === 3) openGallery("helpDesk");
                }}
              >
                {/* Themed image */}
                <img
                  src={img}
                  alt={label}
                  className="absolute inset-0 w-full h-full object-cover origin-top transition-all duration-500 [transform:perspective(900px)_rotateX(12deg)_scale(1.08)] group-hover:[transform:perspective(900px)_rotateX(0deg)_scale(1.12)]"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50"></div>

                {/* Hall label top */}
                <div className="absolute top-4 bg-white px-3 py-1.5 text-[10px] font-black rounded text-[#0a1121] shadow-md z-10 tracking-wide">
                  {label}
                </div>

                <div className="mt-auto relative z-10 w-full flex justify-center mb-4">
                  <div className="w-20 h-8 border border-[#f26522] rounded flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:bg-[#f26522] transition-colors">
                    <span className="text-[#f26522] group-hover:text-white font-black text-[10px] transition-colors">{label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPLORE. CONNECT. INVEST. */}
      <section className="py-20 bg-white border-y border-gray-200 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1121] text-center mb-16 tracking-tight">EXPLORE. CONNECT. INVEST.</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {exploreFeatures.map(feature => (
              <div key={feature.id} className="flex flex-col items-center group">
                <div className="w-20 h-20 bg-[#f8f9fa] border border-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md group-hover:border-[#f26522]/30 transition-all">
                  <feature.icon className="w-10 h-10 text-[#0a1121] group-hover:text-[#f26522] transition-colors" strokeWidth={1.5} />
                </div>
                <p className="font-semibold text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                  {feature.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHO CAN ATTEND? */}
      <section className="py-24 bg-[#0a1121] text-white px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 tracking-tight uppercase">WHO CAN ATTEND?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {attendees.map(a => (
              <div key={a.id} className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-[#121d36] rounded-2xl flex items-center justify-center mb-6 shadow-xl border border-white/5 hover:-translate-y-2 transition-transform duration-300 cursor-default">
                   <a.icon className="w-10 h-10 text-[#f26522]" strokeWidth={1.5} />
                </div>
                <h4 className="text-[#f26522] font-bold uppercase tracking-widest mb-4 text-sm">{a.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed max-w-[200px]">
                  {a.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY DB EXPO? */}
      <section className="py-24 bg-[#f8f9fa] px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16 tracking-tight text-[#0a1121]">WHY DB EXPO?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {whyReasons.map(r => (
              <div key={r.id} className="flex flex-col items-center group">
                <div className="w-20 h-20 bg-white border border-gray-200 rounded-3xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 group-hover:shadow-lg group-hover:border-[#f26522]/30 transition-all">
                  <r.icon className="w-10 h-10 text-[#0a1121]" strokeWidth={1.5} />
                </div>
                <p className="font-bold text-sm text-[#0a1121] whitespace-pre-line leading-relaxed">
                  {r.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JoinCtaSection onRegister={() => setActiveForm("visitor")} />

      {/* 8. BOTTOM STATS & FOOTER */}
      <section className="bg-white border-t border-gray-200 px-6 md:px-12 pb-12 pt-16">
        <div className="max-w-[1400px] mx-auto">
          {/* Bottom Stats Row */}
          <div className="flex flex-wrap lg:flex-nowrap justify-between gap-8 mb-16 items-start lg:items-center">
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 flex-1 w-full lg:w-auto pr-0 lg:pr-12">
               {bottomStats.map(stat => (
                 <div key={stat.id} className="flex items-center gap-4">
                   <stat.icon className="w-10 h-10 md:w-12 md:h-12 text-[#f26522] flex-shrink-0" strokeWidth={1} />
                   <div>
                     <div className="text-2xl md:text-3xl font-black text-[#0a1121] mb-1 leading-none">{stat.value}</div>
                     <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest whitespace-pre-line leading-tight">
                        {stat.label}
                     </div>
                   </div>
                 </div>
               ))}
            </div>

            {/* Stay Connected Box */}
            <div className="bg-[#0a1121] text-white p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center min-w-[280px] w-full lg:w-auto shadow-2xl">
               <h4 className="text-sm font-bold uppercase tracking-widest mb-6">STAY CONNECTED</h4>
               <div className="flex gap-6">
                 <a href="#" className="hover:-translate-y-1 hover:text-[#f26522] transition-all"><Facebook className="w-6 h-6" /></a>
                 <a href="#" className="hover:-translate-y-1 hover:text-[#f26522] transition-all"><Linkedin className="w-6 h-6" /></a>
                 <a href="#" className="hover:-translate-y-1 hover:text-[#f26522] transition-all"><Instagram className="w-6 h-6" /></a>
                 <a href="#" className="hover:-translate-y-1 hover:text-[#f26522] transition-all"><Youtube className="w-6 h-6" /></a>
               </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="w-full h-px bg-gray-200 mb-8"></div>

          {/* Footer Bottom Line */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-12">
            <div className="text-2xl font-extrabold tracking-tight flex items-center">
              <span className="text-[#0a1121] font-black">Digital</span><span className="text-[#f26522] font-black">Broker</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-10 text-sm font-semibold text-gray-700">
               <a href="tel:+918851686642" className="flex items-center gap-2 hover:text-[#f26522] transition-colors">
                  <Phone className="w-4 h-4 text-[#f26522]"/> +91 88516 86642
               </a>
               <a href="mailto:marketing@digitalbroker.in" className="flex items-center gap-2 hover:text-[#f26522] transition-colors">
                  <Mail className="w-4 h-4 text-[#f26522]"/> marketing@digitalbroker.in
               </a>
            </div>
          </div>
        </div>
      </section>

      {activeGallery === "expo" && (
        <ImageGallerySlider
          title="Expo hall"
          images={expoHallGallery}
          slideIndex={slideIndex}
          dragOffset={dragOffset}
          onClose={() => setActiveGallery(null)}
          onSlideChange={setSlideIndex}
          onDragOffsetChange={setDragOffset}
        />
      )}
      {activeGallery === "register" && (
        <ImageGallerySlider
          title="Register"
          images={registerGallery}
          slideIndex={slideIndex}
          dragOffset={dragOffset}
          onClose={() => setActiveGallery(null)}
          onSlideChange={setSlideIndex}
          onDragOffsetChange={setDragOffset}
        />
      )}
      {activeGallery === "helpDesk" && (
        <ImageGallerySlider
          title="Help Desk"
          images={helpDeskGallery}
          slideIndex={slideIndex}
          dragOffset={dragOffset}
          onClose={() => setActiveGallery(null)}
          onSlideChange={setSlideIndex}
          onDragOffsetChange={setDragOffset}
        />
      )}

      <RegistrationForms activeForm={activeForm} onClose={() => setActiveForm(null)} />
    </div>
  );
}
