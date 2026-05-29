import { ChevronRight, Users } from "lucide-react";

type JoinCtaSectionProps = {
  onRegister: () => void;
};

export function JoinCtaSection({ onRegister }: JoinCtaSectionProps) {
  return (
    <section className="relative py-24 bg-[#0a1121] overflow-hidden flex flex-col items-center text-center px-6 border-b-8 border-[#f26522]">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1121]/80 via-[#0a1121]/60 to-[#0a1121] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0d172e] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full">
        <h2 className="text-4xl md:text-5xl font-black text-[#f26522] uppercase tracking-tight mb-4 drop-shadow-md">
          JOIN THE FUTURE OF REAL ESTATE
        </h2>
        <p className="text-xl md:text-2xl text-white font-medium mb-12 drop-shadow">
          All under one virtual roof - Anytime, Anywhere!
        </p>

        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 max-w-2xl mx-auto mb-10 shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#f26522] flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-black text-xl uppercase tracking-wide">Register Your Interest</h3>
          </div>
          <p className="text-gray-300 text-sm mb-8 leading-relaxed">
            Be among the first to experience India&apos;s biggest virtual property expo. Get early access, exclusive
            offers, and priority entry.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-black text-[#f26522] mb-1">FREE</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">Entry for Visitors</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-black text-[#f26522] mb-1">JULY</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">2026 Launch</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl font-black text-[#f26522] mb-1">5000+</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest">Expected Visitors</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onRegister}
            className="w-full bg-[#f26522] text-white py-4 font-black rounded-lg shadow-xl hover:bg-[#d9561c] transition-colors flex items-center justify-center text-lg uppercase tracking-wide"
          >
            PRE-REGISTRATION <ChevronRight className="ml-2 w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-400 font-medium text-sm">Be a part of India&apos;s biggest virtual property event.</p>
      </div>
    </section>
  );
}
