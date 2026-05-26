"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X, ChevronDown } from "lucide-react";
// Import the ThemeToggle component
import { ThemeToggle } from "@/src/components/ThemeToggle"; 

const navLinks = [
  { id: 1, label: "Home", labelHindi: "मुख्य", href: "#hero" },
  { id: 2, label: "About", labelHindi: "परिचय", href: "#about" },
  { id: 3, label: "Events", labelHindi: "कार्यक्रम", href: "#events" },
  { id: 4, label: "Team", labelHindi: "टीम", href: "#team" },
  { id: 5, label: "FAQ", labelHindi: "प्रश्न", href: "#faq" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        {/* Decorative top border */}
        <div className="h-1 bg-gradient-to-r from-primary via-saffron-dark to-primary"></div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-saffron-dark rounded-lg flex items-center justify-center shadow-lg">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl font-display text-foreground transition-colors">
                  HLAD
                </h1>
                <p className="text-xs font-hindi-devanagari text-primary transition-colors">
                  हिंदी साहित्य
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.href)}
                  className="group relative"
                >
                  <span className="font-display text-foreground transition-colors group-hover:text-primary">
                    {link.label}
                  </span>
                  <span className="block text-xs font-hindi-devanagari text-muted-foreground transition-colors group-hover:text-primary">
                    {link.labelHindi}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
                </button>
              ))}
            </nav>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              {/* Added the ThemeToggle here */}
              <ThemeToggle /> 

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex items-center gap-2 bg-primary hover:bg-saffron-dark text-white px-6 py-3 rounded-lg font-display transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Join Now
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-background transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-foreground" />
                ) : (
                  <Menu className="w-6 h-6 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-background shadow-2xl z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="p-6 border-b border-primary/20 bg-muted">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-saffron-dark rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-display text-foreground">
                        HLAD
                      </h2>
                      <p className="text-xs font-hindi-devanagari text-primary">
                        हिंदी साहित्य
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-background transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6 text-foreground" />
                  </button>
                </div>
                
                {/* Decorative Quote */}
                <div className="bg-background/80 p-4 rounded-lg border-l-4 border-primary">
                  <p className="text-sm font-hindi-devanagari text-foreground">
                    निज भाषा उन्नति अहै
                  </p>
                </div>
              </div>

              {/* Mobile Menu Links */}
              <nav className="p-6">
                <ul className="space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="w-full text-left p-4 rounded-lg hover:bg-muted transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="block text-lg font-display text-foreground group-hover:text-primary transition-colors">
                              {link.label}
                            </span>
                            <span className="block text-sm font-hindi-devanagari text-muted-foreground group-hover:text-primary transition-colors">
                              {link.labelHindi}
                            </span>
                          </div>
                          <ChevronDown className="w-5 h-5 text-primary -rotate-90" />
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="mt-8 space-y-3"
                >
                  <button className="w-full bg-primary hover:bg-saffron-dark text-white py-4 rounded-lg font-display transition-all duration-300 shadow-lg">
                    Join HLAD
                  </button>
                  <button className="w-full bg-background hover:bg-secondary hover:text-white text-foreground py-4 rounded-lg border-2 border-secondary font-display transition-all duration-300">
                    Contact Us
                  </button>
                </motion.div>

                {/* Decorative Element */}
                <div className="mt-8 pt-8 border-t border-primary/20 text-center">
                  <div className="text-primary text-4xl mb-2">❀</div>
                  <p className="text-sm font-body text-muted-foreground">
                    Celebrating Hindi Literature
                  </p>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}