"use client";
import { useState } from 'react'
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import ScrollReveal from './ScrollReveal'

const faqs = [
  {
    id: 1,
    question: "What is HLAD?",
    questionHindi: "HLAD क्या है?",
    answer: "HLAD (Hindi Literature & Debating Club) is a community dedicated to promoting, preserving, and celebrating Hindi literature. We organize poetry slams, book readings, workshops, and literary festivals to bring together Hindi literature enthusiasts from all walks of life.",
  },
  {
    id: 2,
    question: "How can I become a member?",
    questionHindi: "मैं सदस्य कैसे बन सकता हूँ?",
    answer: "Becoming a member is easy! Simply fill out our membership form, login with your credentials and you'll gain access to all our events, workshops, and our exclusive literary magazine. Student discounts are available.",
  },
  {
    id: 3,
    question: "Do I need to be fluent in Hindi?",
    questionHindi: "क्या मुझे हिंदी में पारंगत होना आवश्यक है?",
    answer: "Not at all! We welcome everyone from beginners to advanced speakers. Many sessions are bilingual with patient facilitation, and we offer special workshops for those just starting their Hindi literary journey.",
  },
  {
    id: 4,
    question: "What types of events do you organize?",
    questionHindi: "आप किस प्रकार के कार्यक्रम आयोजित करते हैं?",
    answer: "We organize poetry slams (Kavi Sammelan) in our annual flagship event 'KAVYANJALI', book club meetings, creative writing workshops, author meet-and-greets, literary festivals, and open mic nights. We also host online webinars with renowned Hindi authors.",
  },
  {
    id: 5,
    question: "Can I perform my own poetry at your events?",
    questionHindi: "क्या मैं आपके कार्यक्रमों में अपनी कविता प्रस्तुत कर सकता हूँ?",
    answer: "Absolutely! We encourage original works and provide a platform for emerging poets and writers. Our open mic events are perfect for showcasing your talent. We also have competitions with prizes for outstanding performances.",
  },
  {
    id: 6,
    question: "Is there a membership fee?",
    questionHindi: "क्या कोई सदस्यता शुल्क है?",
    answer: "Absolutely not! We don't have any membership fee. We are a community of volunteers who are passionate about Hindi literature and want to promote it. We are open to all and we don't discriminate based on any criteria.",
  },
  {
    id: 7,
    question: "Are events hybrid or in-person?",
    questionHindi: "क्या आप हिंदी साहित्य के लिए ऑनलाइन कार्यक्रम प्रदान करते हैं?",
    answer: "Workshops and open mics are primarily in person to preserve the intimacy of shared recitation. Members across the country can join our online poetry readings and discussion forums.",
  },
  {
    id: 8,
    question: "How can I stay updated about upcoming events?",
    questionHindi: "मैं आगामी कार्यक्रमों के बारे में कैसे अपडेट रह सकता हूँ?",
    answer: "Follow us on social media (Twitter, Instagram, LinkedIn) and subscribe to our website. Members receive exclusive early access to event registrations and special announcements.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-even section-edge-top py-24 md:py-32 relative overflow-hidden">
      {/* Decorative Devanagari background glyphs */}
      {/* Corner ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="corner-glow corner-glow-tr h-[420px] w-[420px] bg-saffron/[0.08]" />
        <div className="corner-glow corner-glow-bl h-[340px] w-[340px] bg-gold/[0.055]" />
      </div>
    <div className="absolute top-0 right-0 text-saffron/5 text-9xl font-hindi select-none pointer-events-none">क</div>
      <div className="absolute bottom-0 left-0 text-saffron/5 text-9xl font-hindi select-none pointer-events-none">ह</div>

      <div className="mx-auto max-w-3xl px-4 md:px-6 relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-saffron mb-4">
            <div className="w-8 h-px bg-saffron" />
            <HelpCircle className="w-5 h-5" />
            <div className="w-8 h-px bg-saffron" />
          </div>
          <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-saffron">FAQ</p>
          <h2 className="font-display mt-3 text-4xl font-semibold text-charcoal md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="font-body mt-4 text-charcoal-muted">
            Everything you need to know about HLAD
          </p>
        </ScrollReveal>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = open === idx;
            return (
              <ScrollReveal key={faq.id} delay={idx * 0.04}>
                <div className="overflow-hidden rounded-2xl border border-white/70 dark:border-zinc-700/70 bg-white/80 dark:bg-zinc-800/80 shadow-sm backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <div>
                      <p className="font-body text-sm font-semibold text-charcoal md:text-base">
                        {faq.question}
                      </p>
                      <p className="font-hindi text-xs text-saffron mt-0.5">
                        {faq.questionHindi}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-saffron text-lg leading-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="border-t border-charcoal/5"
                      >
                        <p className="font-body px-5 pb-4 pt-2 text-sm leading-relaxed text-charcoal-muted">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}