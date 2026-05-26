import { BookOpen, Mail, Phone, MapPin, MessageCircleMore, Camera, BriefcaseBusiness, Globe } from "lucide-react";

export function Footer() {
  return (
    // Always-dark footer — uses fixed warm-charcoal bg so it stays dark in both modes.
    // text-[#faf6ee] replaces text-parchment, which flips to dark in dark-mode theme.
    <footer className="border-t border-white/5 bg-[#1c1410] text-[#faf6ee] relative overflow-hidden">
      {/* Saffron accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-saffron to-transparent" />

      <div className="mx-auto max-w-6xl px-4 md:px-6 py-16 relative z-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">

          {/* ── Brand ── */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-saffron rounded-lg flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display text-2xl font-semibold tracking-tight text-white">HLAD</div>
                <p className="font-hindi text-xs text-saffron-soft">हिंदी साहित्य और कला प्रभाग</p>
              </div>
            </div>

            <p className="font-body text-sm text-white/60 leading-relaxed mb-6">
              Celebrating the richness of Hindi literature and fostering a vibrant
              community of writers, poets, and literature enthusiasts since 2020.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { icon: MessageCircleMore, label: "Twitter" },
                { icon: Camera,            label: "Instagram" },
                { icon: BriefcaseBusiness, label: "LinkedIn" },
                { icon: Globe,             label: "Facebook" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-saffron border border-white/10 hover:border-saffron rounded-lg flex items-center justify-center transition-all duration-300"
                >
                  <Icon className="w-4 h-4 text-white/80 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Links grid ── */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">

            {/* Explore */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-saffron/70 mb-3">
                Explore
              </p>
              <ul className="font-body space-y-2.5 text-sm text-white/65">
                {[
                  { label: "About",      href: "#about" },
                  { label: "Events",     href: "#events" },
                  { label: "Membership", href: "#" },
                  { label: "Gallery",    href: "#gallery" },
                  { label: "Blog",       href: "#" },
                  { label: "Resources",  href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="no-underline hover:text-saffron-soft transition-colors duration-300">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-saffron/70 mb-3">
                Connect
              </p>
              <ul className="font-body space-y-2.5 text-sm text-white/65">
                {["Instagram", "Newsletter", "Twitter", "LinkedIn"].map((item) => (
                  <li key={item}>
                    <a href="#" className="no-underline hover:text-saffron-soft transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-2 sm:col-span-1">
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-saffron/70 mb-3">
                Contact
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-saffron flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-white/65 leading-relaxed">
                    123 Literary Lane,<br />New Delhi, India 110001
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-saffron flex-shrink-0" />
                  <a
                    href="mailto:info@hlad.org"
                    className="font-body text-sm text-white/65 hover:text-saffron-soft transition-colors duration-300"
                  >
                    info@hlad.org
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-saffron flex-shrink-0" />
                  <a
                    href="tel:+911234567890"
                    className="font-body text-sm text-white/65 hover:text-saffron-soft transition-colors duration-300"
                  >
                    +91 123 456 7890
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Divider with ornament ── */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center">
            {/* bg matches footer bg so the ornament "floats" over the rule */}
            <div className="bg-[#1c1410] px-4 text-saffron text-xl">❀</div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/35">
          <p className="font-body">
            © {new Date().getFullYear()} HLAD — Hindi Literature &amp; Debating Club. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-body hover:text-saffron-soft transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Ambient saffron glow — bottom right */}
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl bg-saffron/8 pointer-events-none" />
      {/* Subtle top-left glow */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full blur-3xl bg-saffron/5 pointer-events-none" />
    </footer>
  );
}
