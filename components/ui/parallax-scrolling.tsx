'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

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

      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(
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
    <div className="parallax" ref={parallaxRef}>
      <style jsx global>{`
        .parallax {
          position: relative;
          isolation: isolate;
          overflow-x: clip;
          background: #09090b;
          color: #ffffff;
        }

        .parallax__header {
          position: relative;
          height: 140vh;
          min-height: 860px;
          overflow: hidden;
        }

        .parallax__visuals {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }

        .parallax__black-line-overflow {
          pointer-events: none;
          position: absolute;
          inset: 0 0 auto;
          z-index: 30;
          height: 96px;
          background: linear-gradient(to bottom, #09090b, transparent);
        }

        .parallax__layers {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .parallax__layer-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 115%;
          object-fit: cover;
          will-change: transform;
        }

        .parallax__layer-img[data-parallax-layer='1'] {
          opacity: 0.78;
        }

        .parallax__layer-img[data-parallax-layer='2'] {
          opacity: 0.42;
          mix-blend-mode: screen;
        }

        .parallax__layer-img[data-parallax-layer='4'] {
          top: auto;
          bottom: -14%;
          z-index: 20;
          height: 70%;
          opacity: 0.68;
          mix-blend-mode: lighten;
        }

        .parallax__layer-title {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: grid;
          place-items: center;
          padding: 1.5rem;
          will-change: transform;
        }

        .parallax__title {
          margin: 0;
          text-align: center;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(4rem, 16vw, 13rem);
          font-weight: 500;
          line-height: 0.88;
          letter-spacing: 0;
          text-shadow: 0 18px 80px rgba(0, 0, 0, 0.55);
        }

        .parallax__fade {
          pointer-events: none;
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 30;
          height: 240px;
          background: linear-gradient(
            to top,
            #09090b,
            rgba(9, 9, 11, 0.76),
            transparent
          );
        }

        .parallax__content {
          display: grid;
          min-height: 100vh;
          place-items: center;
          padding: 3.5rem 1.5rem;
          background: #09090b;
        }

        .osmo-icon-svg {
          width: min(34vw, 170px);
          color: #ffffff;
        }

        .osmo-credits {
          border-top: 1px solid rgba(255, 255, 255, 0.16);
          padding: 28px 24px 36px;
          background: #09090b;
          color: #a1a1aa;
          text-align: center;
          font-size: 0.95rem;
        }

        .osmo-credits__p {
          margin: 0;
        }

        .osmo-credits__p-a {
          color: #ffffff;
          text-underline-offset: 4px;
        }

        @media (max-width: 700px) {
          .parallax__header {
            min-height: 720px;
          }

          .parallax__layer-img {
            height: 112%;
          }

          .parallax__layer-img[data-parallax-layer='4'] {
            height: 62%;
          }
        }
      `}</style>

      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80"
              loading="eager"
              width="1800"
              height="1200"
              data-parallax-layer="1"
              alt=""
              className="parallax__layer-img"
            />
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=80"
              loading="eager"
              width="1800"
              height="1200"
              data-parallax-layer="2"
              alt=""
              className="parallax__layer-img"
            />
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">Parallax</h2>
            </div>
            <img
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=80"
              loading="eager"
              width="1800"
              height="1200"
              data-parallax-layer="4"
              alt=""
              className="parallax__layer-img"
            />
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>
      <section className="parallax__content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          viewBox="0 0 160 160"
          fill="none"
          className="osmo-icon-svg"
          aria-hidden="true"
        >
          <path
            d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
            fill="currentColor"
          ></path>
        </svg>
      </section>
    </div>
  );
}
