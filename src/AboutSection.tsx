import { Calendar, Clock, MonitorSmartphone, Users } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-24 bg-white px-6 md:px-12 border-y border-gray-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-[#f26522] font-bold uppercase tracking-widest text-sm mb-2">About Us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1121] tracking-tight">
              Digital<span className="text-[#f26522]">Broker</span>
              <span className="text-gray-400 font-normal mx-3">|</span>
              DB Expo
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6 text-gray-700 text-base md:text-lg leading-relaxed">
            <p>
              DBEXPO is a Discovery platform, designed to replicate Property Expos, eliminating the need for
              physically reaching out to different Real estate projects.
            </p>
            <p>
              DB EXPO creates an immersive and interactive environment, where home buyers / investors can explore
              various real estate projects &amp; services under one{" "}
              <span className="italic text-[#0a1121] font-medium">&quot;Virtual Roof&quot;</span>, whether they are
              real estate projects or Finance Partners.
            </p>
            <p>
              DB Expo is coming up with its first ever virtual expo in the month of July 2026, Called &quot;Virtual
              Property Expo - 2026.&quot;
            </p>
          </div>

          <div className="bg-[#f8f9fa] rounded-3xl p-8 border border-gray-200 shadow-inner">
            <h3 className="uppercase font-bold text-gray-800 tracking-widest text-sm mb-8 text-center">
              The EXPO will be spread in
            </h3>
            <div className="grid grid-cols-3 gap-4 divide-x divide-gray-300 text-center">
              <div className="px-2">
                <div className="text-4xl font-black text-[#f26522] mb-2">4</div>
                <div className="text-xs uppercase font-bold text-gray-700 leading-tight">Expo Halls</div>
              </div>
              <div className="px-2">
                <div className="text-4xl font-black text-[#f26522] mb-2">10</div>
                <div className="text-xs uppercase font-bold text-gray-700 leading-tight">
                  Pavilion
                  <br />
                  per Expo hall
                </div>
              </div>
              <div className="px-2">
                <div className="text-4xl font-black text-[#f26522] mb-2">40</div>
                <div className="text-xs uppercase font-bold text-gray-700 leading-tight">
                  Pavilions
                  <br />
                  in Total
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-xl font-extrabold text-[#0a1121] mb-8 uppercase tracking-wide">Event Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#0a1121] text-white border border-[#f26522]/30">
              <Users className="w-10 h-10 text-[#f26522] flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Expected Visitor Count</p>
                <p className="font-bold text-lg">4,000</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#0a1121] text-white border border-[#f26522]/30">
              <Clock className="w-10 h-10 text-[#f26522] flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Timing</p>
                <p className="font-bold text-lg">10:00 to 6:00</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#0a1121] text-white border border-[#f26522]/30">
              <MonitorSmartphone className="w-10 h-10 text-[#f26522] flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Venue</p>
                <p className="font-bold text-lg">On your Device</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[#0a1121] text-white border border-[#f26522]/30">
              <Calendar className="w-10 h-10 text-[#f26522] flex-shrink-0" />
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Date</p>
                <p className="font-bold text-lg">To be declared soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
