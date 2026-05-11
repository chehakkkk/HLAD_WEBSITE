export default function Footer() {
  return (
    <footer className="border-t border-charcoal/10 bg-charcoal py-14 text-parchment">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 md:flex-row md:items-start md:justify-between md:px-6">
        <div>
          <div className="font-display text-2xl font-semibold tracking-tight text-white">HLAD</div>
          <p className="font-hindi mt-1 text-sm text-saffron-soft">हिंदी साहित्य और कला प्रभाग</p>
          <p className="font-body mt-4 max-w-xs text-sm text-white/65">
            A literary arts society devoted to Hindi language, craft, and community.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-white/50">Explore</p>
            <ul className="font-body mt-3 space-y-2 text-sm text-white/75">
              <li>
                <a href="#about" className="no-underline hover:text-saffron-soft">
                  About
                </a>
              </li>
              <li>
                <a href="#events" className="no-underline hover:text-saffron-soft">
                  Events
                </a>
              </li>
              <li>
                <a href="#gallery" className="no-underline hover:text-saffron-soft">
                  Gallery
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-white/50">Connect</p>
            <ul className="font-body mt-3 space-y-2 text-sm text-white/75">
              <li>
                <a href="#" className="no-underline hover:text-saffron-soft">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="no-underline hover:text-saffron-soft">
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-white/50">Visit</p>
            <p className="font-body mt-3 text-sm text-white/75">Literary Arts Hall, Campus Quad</p>
          </div>
        </div>
      </div>
      <div className="font-body mx-auto mt-12 max-w-6xl border-t border-white/10 px-4 pt-6 text-center text-xs text-white/45 md:px-6">
        © {new Date().getFullYear()} HLAD — Hindi Literature &amp; Debating Club
      </div>
    </footer>
  )
}
