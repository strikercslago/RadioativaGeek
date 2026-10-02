"use client";
import { useEffect, useRef, useState } from "react";
import { ContactButton } from "./ContactButton";

const links = [["inicio", "Início"], ["produtos", "Produtos"], ["sobre", "Sobre"], ["visite", "Loja física"], ["contato", "Contato"]];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const menu = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-15% 0px -60% 0px", threshold: 0 });
    links.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); menu.current?.focus(); } };
    const outside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    const resize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", resize);
    return () => { observer.disconnect(); document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); window.removeEventListener("resize", resize); };
  }, []);
  return <header className="header" ref={header}>
    <div className="container header__inner">
      <a className="brand" href="#inicio" aria-label="Radioativa Geek — início" onClick={() => setOpen(false)}><img decoding="async" src="/assets/radioativa/logos/logo-oficial.webp" alt="Radioativa Geek / Nerd" width="240" height="113" /></a>
      <nav className={`nav ${open ? "nav--open" : ""}`} id="navigation" aria-label="Navegação principal">
        {links.map(([id, title]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{title}</a>)}
      </nav>
      <div className="header__contact"><ContactButton label="Chamar no WhatsApp"><img decoding="async" className="button-icon" src="/assets/radioativa/icons/whatsapp.webp" width="24" height="24" alt="" /><span>Chamar no WhatsApp</span></ContactButton></div>
      <button ref={menu} type="button" className={`menu-button ${open ? "menu-button--open" : ""}`} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-controls="navigation" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /><span /></button>
    </div>
  </header>;
}
