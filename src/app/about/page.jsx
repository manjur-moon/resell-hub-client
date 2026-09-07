import PublicLayout from "@/components/layout/PublicLayout";
import {
  ArrowRight,
  BadgeCheck,
  Leaf,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: BadgeCheck,
    number: "01",
    title: "Trust before transaction",
    text: "Seller verification, moderated listings and visible product details help buyers make more informed decisions before checkout.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Clear role boundaries",
    text: "Buyers, sellers and admins get focused tools so important marketplace actions stay understandable and controlled.",
  },
  {
    icon: Leaf,
    number: "03",
    title: "Useful products, longer life",
    text: "ReSell Hub makes it easier to keep quality products in circulation instead of letting valuable items sit unused.",
  },
];

const roles = [
  {
    icon: ShoppingBag,
    label: "Buyer",
    title: "Discover with context",
    text: "Browse, filter, wishlist, review seller information, order and pay from one focused buying flow.",
  },
  {
    icon: Store,
    label: "Seller",
    title: "Run listings clearly",
    text: "Publish products, maintain inventory and manage incoming orders from a dedicated seller workspace.",
  },
  {
    icon: ShieldCheck,
    label: "Admin",
    title: "Protect marketplace quality",
    text: "Moderate users, products, payments and reports through role-based administrative controls.",
  },
];

export default function AboutPage() {
  return (
    <PublicLayout>
      <main className="min-h-screen bg-[#f4f1eb]/70 dark:bg-[#0f0c0a]">
        <section className="px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-8 lg:pb-14">
          <div className="about-intro mx-auto max-w-7xl">
            <div className="about-intro-grid" aria-hidden="true" />
            <div className="about-intro-orb about-intro-orb-one" aria-hidden="true" />
            <div className="about-intro-orb about-intro-orb-two" aria-hidden="true" />

            <div className="relative z-10 grid gap-10 px-6 py-9 sm:px-8 sm:py-11 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-11 lg:py-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/85 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 shadow-sm backdrop-blur dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
                  <PackageCheck size={15} />
                  About ReSell Hub
                </div>

                <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[#211a16] dark:text-white sm:text-5xl lg:text-6xl">
                  Resale works better when
                  <span className="block text-orange-600 dark:text-orange-400">every role has context.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[#6f6259] dark:text-[#c9bbb1] sm:text-lg">
                  ReSell Hub brings buyers, sellers and admins into one focused marketplace where product condition, seller identity and transaction context stay visible from discovery to checkout.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/products" className="btn-primary">
                    Explore marketplace
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#d8cbc0] bg-[#fffaf6]/80 px-4 text-sm font-semibold text-[#2e241f] shadow-sm backdrop-blur transition hover:border-orange-300 hover:bg-white dark:border-white/10 dark:bg-white/[0.045] dark:text-white dark:hover:border-orange-400/30 dark:hover:bg-white/[0.08]"
                  >
                    Start selling
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#6f6259] dark:text-[#b9aaa0]">
                  <span className="inline-flex items-center gap-2">
                    <BadgeCheck size={16} className="text-orange-500" />
                    Verified seller signals
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck size={16} className="text-orange-500" />
                    Role-based access
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Leaf size={16} className="text-orange-500" />
                    Better product reuse
                  </span>
                </div>
              </div>

              <div className="about-role-map" aria-label="Buyer, seller and admin marketplace roles">
                <div className="about-role-ring about-role-ring-one" aria-hidden="true" />
                <div className="about-role-ring about-role-ring-two" aria-hidden="true" />

                <div className="about-role-hub">
                  <div className="about-role-hub-glow" />
                  <PackageCheck size={28} />
                  <span>ReSell Hub</span>
                </div>

                <div className="about-role-node about-role-buyer">
                  <div className="about-role-icon"><ShoppingBag size={17} /></div>
                  <div>
                    <strong>Buyer</strong>
                    <small>Discover · Wishlist · Purchase</small>
                  </div>
                </div>

                <div className="about-role-node about-role-seller">
                  <div className="about-role-icon"><Store size={17} /></div>
                  <div>
                    <strong>Seller</strong>
                    <small>List · Manage · Fulfil</small>
                  </div>
                </div>

                <div className="about-role-node about-role-admin">
                  <div className="about-role-icon"><ShieldCheck size={17} /></div>
                  <div>
                    <strong>Admin</strong>
                    <small>Verify · Moderate · Protect</small>
                  </div>
                </div>

                <div className="about-role-note about-role-note-one">
                  <BadgeCheck size={14} />
                  Verified context
                </div>
                <div className="about-role-note about-role-note-two">
                  <Leaf size={14} />
                  Longer product life
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div className="lg:sticky lg:top-24">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                  What matters
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-[#211a16] dark:text-white sm:text-4xl">
                  Trust, usefulness and responsible reuse.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-7 text-[#6f6259] dark:text-[#c9bbb1]">
                  The interface is designed around marketplace decisions—not decoration. Every role sees the information and actions that matter to them.
                </p>
              </div>

              <div className="grid gap-4">
                {values.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="group grid gap-5 rounded-[26px] border border-[#ddd2c6] bg-[#fbf8f4] p-6 shadow-[0_16px_42px_rgba(35,24,18,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-orange-300 dark:border-[#2f241d] dark:bg-[#17120f] dark:hover:border-orange-500/40 sm:grid-cols-[auto_1fr] sm:p-7"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400">
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="text-xl font-semibold tracking-[-0.02em] text-[#211a16] dark:text-white">
                            {item.title}
                          </h3>
                          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a58e82] dark:text-[#8f7c71]">
                            {item.number}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-[#6f6259] dark:text-[#c9bbb1]">
                          {item.text}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#ded5cb] bg-[#eee8e1] px-4 py-14 dark:border-[#2a211c] dark:bg-[#130e0c] sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                  Three focused experiences
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.035em] text-[#211a16] dark:text-white sm:text-4xl">
                  One marketplace, different responsibilities.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#6f6259] dark:text-[#b8a79d]">
                Role-based access keeps buyer, seller and administrative tasks focused instead of forcing every user into the same interface.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {roles.map((item, index) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.label}
                    className="relative overflow-hidden rounded-[26px] border border-[#d9cec2] bg-[#fbf8f4] p-6 dark:border-[#2f241d] dark:bg-[#17120f]"
                  >
                    <div className="absolute right-4 top-2 text-7xl font-semibold tracking-[-0.06em] text-[#e8ddd2] dark:text-white/[0.035]">
                      0{index + 1}
                    </div>
                    <div className="relative">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#211a16] text-orange-400 dark:bg-[#0f0c0a]">
                        <Icon size={20} />
                      </div>
                      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 dark:text-orange-400">
                        {item.label}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#211a16] dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-[#6f6259] dark:text-[#c9bbb1]">
                        {item.text}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[30px] border border-[#2f241d] bg-[#15110f] px-6 py-10 text-white shadow-[0_22px_60px_rgba(22,15,11,0.18)] sm:px-8 lg:px-10">
              <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">
                    <Users size={15} />
                    Marketplace community
                  </div>
                  <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                    Find a useful product—or give one a second life.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-white/58">
                    Browse approved listings as a buyer or create an account and build your own seller workspace.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link href="/products" className="btn-primary">
                    Browse products
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}