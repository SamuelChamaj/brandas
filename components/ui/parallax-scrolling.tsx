'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Sparkles } from 'lucide-react';

const layers = [
  { layer: '1', yPercent: 70 },
  { layer: '2', yPercent: 55 },
  { layer: '3', yPercent: 40 },
  { layer: '4', yPercent: 10 },
] as const;

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector<HTMLElement>(
      '[data-parallax-layers]',
    );

    if (!triggerElement) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll<HTMLElement>(
            `[data-parallax-layer="${layerObj.layer}"]`,
          ),
          {
            yPercent: layerObj.yPercent,
            ease: 'none',
          },
          idx === 0 ? undefined : '<',
        );
      });
    }, parallaxRef);

    const lenis = new Lenis();
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={parallaxRef} className="relative isolate overflow-x-clip bg-zinc-950 text-white">
      <section className="relative h-[140vh] min-h-[860px] overflow-hidden">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-24 bg-gradient-to-b from-zinc-950 to-transparent" />
          <div data-parallax-layers className="absolute inset-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
              loading="eager"
              width="1600"
              height="1200"
              data-parallax-layer="1"
              alt=""
              className="absolute inset-0 h-[115%] w-full object-cover opacity-75 [will-change:transform]"
            />
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
              loading="eager"
              width="1600"
              height="1200"
              data-parallax-layer="2"
              alt=""
              className="absolute inset-0 h-[115%] w-full object-cover opacity-45 mix-blend-screen [will-change:transform]"
            />
            <div
              data-parallax-layer="3"
              className="absolute inset-0 z-10 flex items-center justify-center px-6 [will-change:transform]"
            >
              <h2 className="text-center text-6xl font-semibold tracking-normal text-white sm:text-8xl lg:text-9xl">
                Parallax
              </h2>
            </div>
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80"
              loading="eager"
              width="1600"
              height="1200"
              data-parallax-layer="4"
              alt=""
              className="absolute inset-x-0 bottom-[-14%] z-20 h-[70%] w-full object-cover opacity-65 mix-blend-lighten [will-change:transform]"
            />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-56 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent" />
        </div>
      </section>

      <section className="grid min-h-screen place-items-center bg-zinc-950 px-6">
        <Sparkles className="h-24 w-24 text-white sm:h-36 sm:w-36" aria-hidden="true" />
      </section>
    </div>
  );
}
