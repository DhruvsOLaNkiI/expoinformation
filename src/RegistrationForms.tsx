import { useState, type FormEvent, type ReactNode } from "react";
import { X, ChevronRight, Building2, Users } from "lucide-react";

type FormKind = "visitor" | "exhibitor";

type RegistrationFormsProps = {
  activeForm: FormKind | null;
  onClose: () => void;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_URL = "https://api.web3forms.com/submit";
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-[#0a1121] outline-none focus:border-[#f26522] focus:ring-2 focus:ring-[#f26522]/20";

const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-600";

function isAccessKeyConfigured() {
  return Boolean(
    accessKey &&
      accessKey !== "your_web3forms_access_key_here" &&
      !accessKey.startsWith("paste_")
  );
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function sendToWeb3Forms(payload: Record<string, string>): Promise<boolean> {
  if (!isAccessKeyConfigured()) return false;

  const res = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      ...payload,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Could not send your registration email. Please try again.");
  }

  return true;
}

async function saveToApi(endpoint: string, body: Record<string, string>) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    error?: string;
    message?: string;
    detail?: string;
  };

  if (!res.ok || !data.success) {
    const base =
      data.error ||
      (res.status === 503
        ? "Database not available. Run npm run dev:api in a second terminal."
        : "Could not save your submission. Please try again.");
    const hint = data.detail ? ` (${data.detail})` : "";
    throw new ApiError(`${base}${hint}`, res.status);
  }
}

/** Saves to MongoDB when available; falls back to Web3Forms email if DB returns 503. */
async function submitRegistration(
  apiEndpoint: string,
  apiBody: Record<string, string>,
  emailPayload: Record<string, string>
) {
  let savedToDb = false;

  try {
    await saveToApi(apiEndpoint, apiBody);
    savedToDb = true;
  } catch (err) {
    const isDbDown = err instanceof ApiError && err.status === 503;
    if (!isDbDown) throw err;
  }

  const emailed = await sendToWeb3Forms(emailPayload);

  if (!savedToDb && !emailed) {
    throw new Error(
      "Registration could not be completed. The server database is not connected (set MONGODB_URI in Coolify), and email is not configured. Please contact support."
    );
  }
}

function ModalShell({
  title,
  subtitle,
  icon: Icon,
  onClose,
  children,
}: {
  title: string;
  subtitle: string;
  icon: typeof Users;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-500 hover:bg-gray-100 hover:text-[#0a1121]"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="border-b border-gray-100 bg-[#0a1121] px-6 py-6 text-white">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f26522]">
            <Icon className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight">{title}</h2>
          <p className="mt-1 text-sm text-gray-300">{subtitle}</p>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function VisitorForm({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = new FormData(e.currentTarget);
    const fullName = String(form.get("fullName") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const city = String(form.get("city") ?? "");
    const interestType = String(form.get("interestType") ?? "");
    const message = String(form.get("message") ?? "");

    try {
      await submitRegistration(
        "/api/register",
        {
          fullName,
          email,
          phone,
          city,
          interestType,
          message,
        },
        {
          subject: `DB Expo — Visitor Registration: ${fullName}`,
          from_name: fullName,
          email,
          replyto: email,
          phone,
          city,
          interest_type: interestType,
          message: message || "-",
          form_type: "Visitor Registration",
        }
      );
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <p className="text-lg font-bold text-[#0a1121]">You are registered!</p>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for your interest in DB Expo 2026. We will contact you with event updates and your entry details.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[#f26522] py-3 font-bold text-white hover:bg-[#d9561c]"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-600">
        Register to take part in Virtual Property Expo 2026 — free entry for visitors.
      </p>

      {/* Web3Forms spam honeypot — leave empty */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div>
        <label className={labelClass} htmlFor="fullName">Full name *</label>
        <input id="fullName" name="fullName" required className={inputClass} placeholder="Your full name" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required className={inputClass} placeholder="you@email.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Phone *</label>
          <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="+91 98765 43210" />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="city">City</label>
        <input id="city" name="city" className={inputClass} placeholder="Your city" />
      </div>

      <div>
        <label className={labelClass} htmlFor="interestType">I want to participate as *</label>
        <select id="interestType" name="interestType" required className={inputClass} defaultValue="Home Buyer">
          <option>Home Buyer</option>
          <option>Investor</option>
          <option>Brokers</option>
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">Message (optional)</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className={inputClass}
          placeholder="Tell us what you are looking for at the expo"
        />
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center rounded-lg bg-[#f26522] py-3.5 font-bold text-white hover:bg-[#d9561c] disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit registration"}
        {status !== "submitting" && <ChevronRight className="ml-2 h-5 w-5" />}
      </button>
    </form>
  );
}

function ExhibitorForm({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [selectedCompanyType, setSelectedCompanyType] = useState("Developer");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = new FormData(e.currentTarget);
    const companyName = String(form.get("companyName") ?? "");
    const contactName = String(form.get("contactName") ?? "");

    try {
      const businessEmail = String(form.get("email") ?? "");
      const phone = String(form.get("phone") ?? "");
      const companyTypeVal = String(form.get("companyType") ?? "");
      const financePartnerType = String(form.get("financePartnerType") ?? "");
      
      const finalCompanyType = companyTypeVal === "Finance Partner" && financePartnerType 
        ? `Finance Partner (${financePartnerType})` 
        : companyTypeVal;

      const website = String(form.get("website") ?? "");
      const projectsCount = String(form.get("projectsCount") ?? "");
      const boothPreference = String(form.get("boothPreference") ?? "");
      const message = String(form.get("message") ?? "");

      await submitRegistration(
        "/api/exhibitor",
        {
          companyName,
          contactName,
          email: businessEmail,
          phone,
          companyType: finalCompanyType,
          website,
          projectsCount,
          boothPreference,
          message,
        },
        {
          subject: `DB Expo — Exhibitor Application: ${companyName}`,
          from_name: contactName,
          email: businessEmail,
          replyto: businessEmail,
          phone,
          company_name: companyName,
          company_type: finalCompanyType,
          website: website || "-",
          projects_count: projectsCount || "-",
          booth_preference: boothPreference || "-",
          message: message || "-",
          form_type: "Exhibitor Application",
        }
      );
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <p className="text-lg font-bold text-[#0a1121]">Application received!</p>
        <p className="mt-2 text-sm text-gray-600">
          Our team will review your exhibitor request and contact you about booth options for DB Expo 2026.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[#f26522] py-3 font-bold text-white hover:bg-[#d9561c]"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-600">
        Apply to exhibit your projects and showcase your brand at India&apos;s virtual property expo.
      </p>

      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div>
        <label className={labelClass} htmlFor="companyName">Company / brand name *</label>
        <input id="companyName" name="companyName" required className={inputClass} placeholder="Company name" />
      </div>

      <div>
        <label className={labelClass} htmlFor="contactName">Contact person *</label>
        <input id="contactName" name="contactName" required className={inputClass} placeholder="Full name" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="exhibitor-email">Business email *</label>
          <input id="exhibitor-email" name="email" type="email" required className={inputClass} placeholder="office@company.com" />
        </div>
        <div>
          <label className={labelClass} htmlFor="exhibitor-phone">Phone *</label>
          <input id="exhibitor-phone" name="phone" type="tel" required className={inputClass} placeholder="+91 98765 43210" />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="companyType">Company type *</label>
        <select
          id="companyType"
          name="companyType"
          required
          className={inputClass}
          value={selectedCompanyType}
          onChange={(e) => setSelectedCompanyType(e.target.value)}
        >
          <option>Developer</option>
          <option>Finance Partner</option>
          <option>Channel Partner</option>
        </select>
      </div>

      {selectedCompanyType === "Finance Partner" && (
        <div>
          <label className={labelClass} htmlFor="financePartnerType">Type of Institution *</label>
          <select id="financePartnerType" name="financePartnerType" required className={inputClass} defaultValue="Bank">
            <option>Bank</option>
            <option>NBFC'S</option>
          </select>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="website">Website</label>
          <input id="website" name="website" type="url" className={inputClass} placeholder="https://..." />
        </div>
        <div>
          <label className={labelClass} htmlFor="projectsCount">Projects to showcase</label>
          <input id="projectsCount" name="projectsCount" className={inputClass} placeholder="e.g. 3 projects" />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="boothPreference">Booth preference</label>
        <select id="boothPreference" name="boothPreference" className={inputClass} defaultValue="">
          <option value="">Select preference</option>
          <option>Standard booth</option>
          <option>Premium booth</option>
          <option>Custom pavilion</option>
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="exhibitor-message">Message</label>
        <textarea
          id="exhibitor-message"
          name="message"
          rows={3}
          className={inputClass}
          placeholder="Tell us about your brand and exhibition goals"
        />
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full items-center justify-center rounded-lg bg-[#0a1121] py-3.5 font-bold text-white hover:bg-[#121d36] disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Apply as exhibitor"}
        {status !== "submitting" && <ChevronRight className="ml-2 h-5 w-5" />}
      </button>
    </form>
  );
}

export function RegistrationForms({ activeForm, onClose }: RegistrationFormsProps) {
  if (!activeForm) return null;

  if (activeForm === "visitor") {
    return (
      <ModalShell
        title="Register for DB Expo"
        subtitle="Join as a visitor — explore projects, connect & invest"
        icon={Users}
        onClose={onClose}
      >
        <VisitorForm onClose={onClose} />
      </ModalShell>
    );
  }

  return (
    <ModalShell
      title="Become an Exhibitor"
      subtitle="Showcase your projects at Virtual Property Expo 2026"
      icon={Building2}
      onClose={onClose}
    >
      <ExhibitorForm onClose={onClose} />
    </ModalShell>
  );
}
