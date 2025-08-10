// app/page.tsx
'use client';

import Image from 'next/image';
import FancyParticles from '@/app/components/FancyParticles';

export default function Page() {
  return (
    <div className="min-h-[120vh]">
      {/* Hero: particles as background, clean logo, centered text */}
      <section className="relative flex items-center justify-center pt-16 pb-24 overflow-hidden">
        {/* Particles */}
        <FancyParticles />

        {/* subtle vignette to add depth while keeping white page */}
        <div className="pointer-events-none absolute inset-0"
             style={{
               background:
                 'radial-gradient(80% 50% at 50% 20%, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 60%)'
             }}
        />

        <div className="relative z-10 container text-center">
          <div className="mx-auto mb-6 flex items-center justify-center">
            {/* logo only, no gray box */}
            <Image
              src="/logo.png"
              alt="Logo"
              width={64}
              height={64}
              priority
              className="h-16 w-16 object-contain"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#0B1220]">
            Coming Soon
          </h1>

          <p className="mt-3 text-slate-600">
            We’re polishing the details so your ad comments go from chaos to calm.
          </p>
        </div>
      </section>

      {/* Small info section so the page isn’t empty */}
      <section className="container pb-16">
        <div className="mx-auto max-w-2xl text-center text-sm text-slate-600">
          Need anything in the meantime? Visit <a className="underline" href="/contact">Contact</a>,
          or review our <a className="underline" href="/privacy">Privacy</a> and <a className="underline" href="/terms">Terms</a>.
        </div>
      </section>
    </div>
  );
}
