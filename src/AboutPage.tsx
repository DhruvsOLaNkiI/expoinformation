import { useState } from "react";
import { AboutSection } from "./AboutSection";
import { JoinCtaSection } from "./JoinCtaSection";
import { RegistrationForms } from "./RegistrationForms";
import { SiteHeader } from "./SiteHeader";

export function AboutPage() {
  const [activeForm, setActiveForm] = useState<"visitor" | "exhibitor" | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 text-[#0a1121] font-sans selection:bg-[#f26522] selection:text-white">
      <div className="bg-[#0a1121] pt-6 pb-8">
        <SiteHeader variant="dark" className="relative z-10" />
      </div>
      <AboutSection />
      <JoinCtaSection onRegister={() => setActiveForm("visitor")} />
      <RegistrationForms activeForm={activeForm} onClose={() => setActiveForm(null)} />
    </div>
  );
}
