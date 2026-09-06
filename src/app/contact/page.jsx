import PublicLayout from "@/components/layout/PublicLayout";
import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  ShieldCheck,
} from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "support@resellhub.com",
    text: "Best for account, order and payment questions.",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+880 1712 345678",
    text: "For direct support during business hours.",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Dhaka, Bangladesh",
    text: "Marketplace operations and support base.",
  },
];

const supportTopics = [
  "Account & access",
  "Seller verification",
  "Orders & checkout",
  "Payments & refunds",
];

export default function ContactPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#f4f1eb]/70 dark:bg-[#0f0c0a]">
        <section className="border-b border-[#2a1d16] bg-[#15110f] px-4 pb-14 pt-10 text-white sm:px-6 sm:pb-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                  <MessageSquareText size={15} />
                  Contact support
                </div>
                <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Tell us what you need help with.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
                  Whether it is an account issue, seller verification, an order or a payment question, clear context helps support identify the right next step faster.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {supportTopics.map((topic, index) => (
                  <div
                    key={topic}
                    className="rounded-[22px] border border-white/10 bg-white/[0.055] p-4 backdrop-blur"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                      0{index + 1}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white">{topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid overflow-hidden rounded-[30px] border border-[#ddd2c6] bg-[#fbf8f4] shadow-[0_22px_60px_rgba(35,24,18,0.07)] dark:border-[#2f241d] dark:bg-[#17120f] lg:grid-cols-[0.82fr_1.18fr]">
              <aside className="relative overflow-hidden bg-[#0f0c0a] p-7 text-white sm:p-9 lg:p-10">
                <div className="absolute -right-14 -top-10 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-400">
                    Direct support
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                    Reach the right channel.
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/58">
                    Include relevant order, product or account context in your message. Avoid sharing passwords or sensitive payment credentials.
                  </p>

                  <div className="mt-8 space-y-3">
                    {contactItems.map((item) => {
                      const Icon = item.icon;

                      return (
                        <div
                          key={item.label}
                          className="rounded-[22px] border border-white/10 bg-white/[0.045] p-4 transition hover:border-orange-400/30 hover:bg-white/[0.065]"
                        >
                          <div className="flex items-start gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
                              <Icon size={18} />
                            </span>
                            <div className="min-w-0">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/38">
                                {item.label}
                              </p>
                              <p className="mt-1 break-words text-sm font-semibold text-white">
                                {item.value}
                              </p>
                              <p className="mt-1 text-xs leading-5 text-white/45">
                                {item.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex items-start gap-3 rounded-[22px] border border-orange-500/15 bg-orange-500/[0.07] p-4">
                    <Clock3 size={18} className="mt-0.5 shrink-0 text-orange-400" />
                    <div>
                      <p className="text-sm font-semibold text-white">Support note</p>
                      <p className="mt-1 text-xs leading-5 text-white/48">
                        Clear subject details and relevant identifiers make support conversations easier to resolve.
                      </p>
                    </div>
                  </div>
                </div>
              </aside>

              <form className="p-7 sm:p-9 lg:p-10">
                <div className="flex flex-col gap-4 border-b border-[#e5dbd0] pb-6 dark:border-[#2d241f] sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
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
                    <input
                      placeholder="Enter your name"
                      className="input-control"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-[#584940] dark:text-[#e2d7ce]">
                      Email address
                    </span>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="input-control"
                    />
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
                    Support requests are easier to review when the message includes enough context to identify the relevant account, order or listing.
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
