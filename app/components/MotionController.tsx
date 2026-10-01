"use client";
import { useEffect } from "react";
export function MotionController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.animate([{ opacity: .35, transform: "translateY(16px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 450, easing: "ease-out" });
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return null;
}
