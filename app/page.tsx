// app/page.tsx
"use client";

import { motion } from "framer-motion";
import ParticleFlow from "./components/ParticleOrbit";
import { PRODUCT_BRAND_NAME } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="relative min-h-[85vh] overflow-hidden">
      <ParticleFlow />

      <section className="relative flex min-h-[85vh] items-center justify-center text-center px-6">
        <div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {PRODUCT_BRAND_NAME}
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl text-slate-300"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          >
            Coming Soon
          </motion.p>
        </div>
      </section>

      {/* Scroll section with subtle parallax */}
      <section className="relative px-6 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Automating on-brand replies to ad comments
          </h2>
          <p className="mt-4 text-slate-300">
            Stay tuned—we’re polishing the details so your ad comments go from chaos to calm.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
