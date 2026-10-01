"use client";
import { useEffect } from "react";

export function MotionController() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const active = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    const setup = () => {
      observer?.disconnect();
      active.forEach(animation => animation.cancel());
      active.clear();
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        let order = 0;
        entries.forEach(entry => {
          if (!entry.isIntersecting || seen.has(entry.target)) return;
          seen.add(entry.target);
          observer?.unobserve(entry.target);
          const card = entry.target.matches(".category-card, .feature-card, .social-gallery>a");
          // Individual transform properties preserve existing rotations and hover transforms.
          const animation = entry.target.animate([
            { opacity: .15, translate: "0 24px", scale: card ? ".96" : "1" },
            { opacity: 1, translate: "0 0", scale: "1" },
          ], { duration: card ? 650 : 550, delay: Math.min(order++, 3) * 65, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
          active.add(animation);
          animation.onfinish = () => active.delete(animation);
        });
      }, { threshold: .12, rootMargin: "0px 0px -24px 0px" });
      document.querySelectorAll("[data-reveal], .social-gallery>a").forEach(element => {
        if (!seen.has(element)) observer?.observe(element);
      });
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      active.forEach(animation => animation.cancel());
      preference.removeEventListener("change", setup);
    };
  }, []);
  return null;
}
