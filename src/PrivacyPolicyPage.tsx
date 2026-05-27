import { Link } from "react-router-dom";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { SiteHeader } from "./SiteHeader";

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-[#0a1121] font-sans selection:bg-[#f26522] selection:text-white">
      <div className="bg-white border-b border-gray-200 pt-6 pb-4">
        <SiteHeader variant="light" />
      </div>
      <PrivacyPolicy />
      <p className="text-center pb-16 px-6">
        <Link to="/" className="text-[#f26522] font-semibold hover:underline">
          ← Back to DB Expo Home
        </Link>
      </p>
    </div>
  );
}
