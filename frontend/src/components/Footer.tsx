import { BookOpen, Mail, Phone, MapPin, MessageCircleMore, Camera, BriefcaseBusiness, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      <div className="container mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display text-secondary-foreground">
                  HLAD
                </h3>
                <p className="text-sm font-hindi-devanagari text-secondary-foreground/70">
                  हिंदी साहित्य और कला प्रभाग
                </p>
              </div>
            </div>
            <p className="font-body text-secondary-foreground/70 mb-6 leading-relaxed max-w-md">
              Celebrating the richness of Hindi literature and fostering a vibrant community of writers, poets, and literature enthusiasts since 2020.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300"
                aria-label="Twitter"
              >
                <MessageCircleMore className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <Camera className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300"
                aria-label="LinkedIn"
              >
                <BriefcaseBusiness className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display mb-6 text-secondary-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["About Us", "Events", "Membership", "Blog", "Resources", "Gallery"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="font-body text-secondary-foreground/70 hover:text-primary transition-colors duration-300 inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display mb-6 text-secondary-foreground">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="font-body text-secondary-foreground/70 text-sm">
                  HLAD, NIT Kurukshetra, Haryana, India - 136119
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <a
                  href="hladnitkkr@nitkkr.ac.in"
                  className="font-body text-secondary-foreground/70 hover:text-primary transition-colors duration-300 text-sm"
                >
                  hladnitkkr@nitkkr.ac.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <a
                  href="tel:+911234567890"
                  className="font-body text-secondary-foreground/70 hover:text-primary transition-colors duration-300 text-sm"
                >
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-secondary px-4">
              <div className="text-primary text-2xl">❀</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-secondary-foreground/60">
          <p className="font-body">
            © 2026 HLAD. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-primary transition-colors duration-300 font-body"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-300 font-body"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors duration-300 font-body"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div
        className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--primary)", opacity: 0.05 }}
      ></div>
    </footer>
  );
}
