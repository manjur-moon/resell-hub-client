import PublicLayout from "@/components/layout/PublicLayout";
import {
  ArrowRight,
  BadgeCheck,
  CircleUserRound,
  Clock3,
  CreditCard,
  Mail,
  MapPin,
  MessageSquareText,
  PackageCheck,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email support",
    value: "support@resellhub.com",
    text: "Best for account, order and payment questions.",
    note: "Detailed requests",
  },
  {
    icon: Phone,
    label: "Phone support",
    value: "+880 1712 345678",
    text: "For direct support during business hours.",
    note: "Quick conversations",
  },
  {
    icon: MapPin,
    label: "Support base",
    value: "Dhaka, Bangladesh",
    text: "Marketplace operations and support base.",
    note: "Local marketplace team",
  },
];

const supportTopics = [
  {
    icon: CircleUserRound,
    label: "Account",
    text: "Access & profile",
    className: "contact-support-node-account",
  },
  {
    icon: BadgeCheck,
    label: "Seller",
    text: "Verification",
    className: "contact-support-node-seller",
  },
  {
    icon: PackageCheck,
    label: "Orders",
    text: "Checkout & delivery",
    className: "contact-support-node-orders",
  },
  {
    icon: CreditCard,
    label: "Payments",
    text: "Payment context",
    className: "contact-support-node-payments",
  },
];

const supportNotes = [
  "Mention the relevant order or listing when possible.",
  "Never include passwords or payment credentials.",
  "Use the same email connected to your account.",
];

export default function ContactPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#f5f1eb] dark:bg-[#0f0c0a]">
        <section className="px-4 pb-5 pt-6 sm:px-6 sm:pb-7 sm:pt-8 lg:px-8">
          <div className="contact-premium-hero mx-auto max-w-7xl">
            <div className="contact-premium-grid" aria-hidden="true" />
            <div className="contact-premium-orb contact-premium-orb-one" aria-hidden="true" />
            <div className="contact-premium-orb contact-premium-orb-two" aria-hidden="true" />

            <div className="relative z-10 grid gap-10 p-6 sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:p-10 xl:p-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/70 bg-white/70 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 shadow-sm backdrop-blur-md dark:border-orange-500/20 dark:bg-orange-500/[0.08] dark:text-orange-300">
                  <MessageSquareText size={15} />
                  Contact support
                </div>

                <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.045em] text-[#211a16] sm:text-5xl lg:text-[3.65rem] lg:leading-[1.02] dark:text-white">
                  Help should feel clear, not complicated.
                </h1>

                <p className="mt-5 max-w-xl text-base leading-8 text-[#6f6259] sm:text-lg dark:text-[#c9bbb1]">
                  Share the right context once and reach the support path that fits your account, listing, order or payment question.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#contact-form" className="btn-primary">
                    Send a message
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="mailto:support@resellhub.com"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#d8c9bc] bg-white/72 px-4 py-2.5 text-sm font-semibold text-[#3e312a] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-600 dark:border-white/10 dark:bg-white/[0.05] dark:text-[#efe5de] dark:hover:border-orange-500/35 dark:hover:text-orange-300"
                  >
                    <Mail size={16} />
                    Email support
                  </a>
                </div>

                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#6f6259] dark:text-[#bca99d]">
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck size={16} className="text-orange-500" />
                    Safe support guidance
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={16} className="text-orange-500" />
                    Clearer issue routing
                  </span>
                </div>
              </div>

              <div className="contact-support-map" aria-label="Support areas">
                <div className="contact-support-ring contact-support-ring-one" aria-hidden="true" />
                <div className="contact-support-ring contact-support-ring-two" aria-hidden="true" />

                <div className="contact-support-hub">
                  <span className="contact-support-hub-glow" aria-hidden="true" />
                  <MessageSquareText size={28} />
                  <strong>Support</strong>
                </div>

                {supportTopics.map((topic) => {
                  const Icon = topic.icon;

                  return (
                    <div key={topic.label} className={`contact-support-node ${topic.className}`}>
                      <span className="contact-support-node-icon">
                        <Icon size={17} />
                      </span>
                      <span>
                        <strong>{topic.label}</strong>
                        <small>{topic.text}</small>
                      </span>
                    </div>
                  );
                })}

                <div className="contact-support-signal contact-support-signal-one">
                  <ShieldCheck size={13} />
                  Protected context
                </div>
                <div className="contact-support-signal contact-support-signal-two">
                  <Sparkles size={13} />
                  Right channel faster
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-9 sm:px-6 sm:py-11 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                  Choose a channel
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-[#211a16] sm:text-4xl dark:text-white">
                  Reach support your way.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-[#7b6b60] dark:text-[#a79488]">
                Use email for detailed context, phone for a quick conversation, or include marketplace details in the form below.
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {contactItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.label}
                    className="group relative overflow-hidden rounded-[26px] border border-[#ded2c7] bg-[#fffaf6] p-5 shadow-[0_14px_38px_rgba(60,40,27,0.06)] transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_22px_48px_rgba(60,40,27,0.1)] dark:border-[#30251f] dark:bg-[#17120f] dark:hover:border-orange-500/35"
                  >
                    <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-orange-500/[0.07] blur-2xl transition group-hover:bg-orange-500/[0.12]" />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-500/15 dark:bg-orange-500/10 dark:text-orange-400">
                          <Icon size={19} />
                        </span>
                        <span className="text-xs font-semibold tracking-[0.16em] text-[#aa9588] dark:text-[#88766c]">
                          0{index + 1}
                        </span>
                      </div>

                      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-orange-600 dark:text-orange-400">
                        {item.label}
                      </p>
                      <p className="mt-2 break-words text-lg font-semibold tracking-[-0.02em] text-[#211a16] dark:text-white">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#716159] dark:text-[#ab998e]">
                        {item.text}
                      </p>

                      <div className="mt-5 border-t border-[#eadfd5] pt-4 text-xs font-medium text-[#927e72] dark:border-[#2c221d] dark:text-[#8f7c71]">
                        {item.note}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact-form" className="scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid overflow-hidden rounded-[30px] border border-[#ddd2c6] bg-[#fffaf6] shadow-[0_24px_70px_rgba(61,42,30,0.08)] dark:border-[#2f241d] dark:bg-[#17120f] lg:grid-cols-[0.78fr_1.22fr]">
              <aside className="relative overflow-hidden border-b border-[#e4d8cd] bg-[linear-gradient(145deg,#f8ece2_0%,#fff8f2_55%,#f4e7dc_100%)] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10 dark:border-[#30251f] dark:bg-[linear-gradient(145deg,#1d1511_0%,#130f0d_58%,#1b130f_100%)]">
                <div className="absolute -left-12 top-8 h-44 w-44 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="absolute -bottom-16 right-0 h-56 w-56 rounded-full bg-[#c69b7e]/15 blur-3xl dark:bg-orange-500/[0.05]" />

                <div className="relative">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-200 bg-[#fffaf6] text-orange-600 shadow-sm dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400">
                    <ShieldCheck size={22} />
                  </div>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                    Before you send
                  </p>
                  <h2 className="mt-3 max-w-sm text-3xl font-semibold tracking-[-0.035em] text-[#211a16] dark:text-white">
                    Give support enough context to help.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-[#716159] dark:text-[#ab998e]">
                    A short, specific message usually makes the next step easier to identify without unnecessary back-and-forth.
                  </p>

                  <div className="mt-8 space-y-3">
                    {supportNotes.map((note, index) => (
                      <div
                        key={note}
                        className="flex items-start gap-3 rounded-2xl border border-[#ddcec1] bg-white/58 p-4 backdrop-blur-sm dark:border-white/[0.07] dark:bg-white/[0.035]"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <p className="pt-0.5 text-sm leading-6 text-[#5e5048] dark:text-[#c7b7ad]">
                          {note}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex items-start gap-3 rounded-2xl border border-orange-200/80 bg-orange-50/80 p-4 dark:border-orange-500/15 dark:bg-orange-500/[0.07]">
                    <Clock3 size={18} className="mt-0.5 shrink-0 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="text-sm font-semibold text-[#3c2e27] dark:text-white">
                        Support note
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#806c60] dark:text-[#9f8c81]">
                        Clear subject details and relevant identifiers make support conversations easier to resolve.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>

              <form className="p-7 sm:p-9 lg:p-10">
                <div className="flex flex-col gap-4 border-b border-[#e5dbd0] pb-6 dark:border-[#2d241f] sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 ring-1 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:ring-orange-500/15">
                      <MessageSquareText size={21} />
                    </span>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-[-0.025em] text-[#211a16] dark:text-white">
                        Send a message
                      </h2>
                      <p className="mt-0.5 text-sm text-[#807168] dark:text-[#9a8980]">
                        Tell us what happened and what you need.
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ded5cb] bg-[#f8f3ed] px-3 py-1.5 text-xs font-medium text-[#6f6259] dark:border-[#342922] dark:bg-[#130e0c] dark:text-[#b8a79d]">
                    <ShieldCheck size={14} className="text-orange-500" />
                    Do not share passwords
                  </div>
                </div>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-[#584940] dark:text-[#e2d7ce]">
                      Your name
                    </span>
                    <input placeholder="Enter your name" className="input-control" />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-[#584940] dark:text-[#e2d7ce]">
                      Email address
                    </span>
                    <input type="email" placeholder="you@example.com" className="input-control" />
                  </label>
                </div>

                <label className="mt-5 block">
                  <span className="mb-1.5 block text-sm font-semibold text-[#584940] dark:text-[#e2d7ce]">
                    Message
                  </span>
                  <textarea
                    rows={7}
                    placeholder="Describe your issue, relevant product/order context, and what you need help with..."
                    className="input-control resize-none"
                  />
                </label>

                <div className="mt-6 flex flex-col gap-4 border-t border-[#e5dbd0] pt-6 dark:border-[#2d241f] sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-md text-xs leading-5 text-[#807168] dark:text-[#9a8980]">
                    Include enough context to identify the relevant account, order or listing. Avoid sensitive credentials.
                  </p>

                  <button type="button" className="btn-primary shrink-0">
                    Send message
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}