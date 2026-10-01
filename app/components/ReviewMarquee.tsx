"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";

const reviews = [
  { id: "isadora", name: "Isadora De Quadros Almeida", text: "Cara essa loja é a minha favorita amo comprar ali, os preços dos mangas são muitos bons e tem bastante variedade, ao contrário do shopping que não tem muitas opções." },
  { id: "nilton", name: "Nilton Anderson Scalco", text: "Atendimento espetacular, produtos de excelente qualidade. Para todos os níveis de Nerds e fãs nostálgicos de animes (meu caso)!" },
  { id: "jose", name: "José Figueiredo", text: "Loja geek/nerd que oferece uma grande variedade de produtos em diversos temas. Card games (Magic, Pokémon, etc); camisetas (animes, bandas); mangás; além de todo tipo de presentes e lembranças." },
  { id: "aline", name: "Aline Machado Kuns", text: "Loja incrível, proprietários maravilhosos, produtos lindos. Ponto obrigatório para os geeks." },
  { id: "laura", name: "Laura", text: "Ótimo atendimento, tem itens diversos para todos os gostos." },
  { id: "allan", name: "Allan Story de Almeida Martins", text: "Loja geek / nerd referência na região. Perfeita para quem busca qualquer tipo de TCG (Magic, Pokémon e Yu-Gi-Oh) e também uma excelente opção para presentear. Com preços acessíveis e alta disponibilidade de produtos. Os funcionários podem te ajudar, caso exista alguma dúvida." },
  { id: "jessica", name: "Jessica Prado", text: "Nósa meu deus muito bom" },
];

// Keep one shared offset for automatic motion and dragging, so release never resets the track.
function ReviewLane({ row, index }: { row: typeof reviews; index: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const groupWidth = useRef(0);
  const drag = useRef<{ id: number; x: number } | null>(null);

  function paint() {
    const width = groupWidth.current;
    if (!width || !trackRef.current) return;
    offset.current = ((offset.current % width) + width) % width;
    trackRef.current.style.transform = `translate3d(${-offset.current}px, 0, 0)`;
  }

  useEffect(() => {
    const track = trackRef.current;
    const group = track?.firstElementChild;
    if (!track || !group) return;
    const measure = () => { groupWidth.current = group.getBoundingClientRect().width; paint(); };
    const observer = new ResizeObserver(measure);
    observer.observe(group);
    measure();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastTime = 0;
    const tick = (time: number) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 50) : 0;
      lastTime = time;
      if (!drag.current && !reduced.matches) {
        offset.current += elapsed / 1000 * (index === 0 ? 30 : -26);
        paint();
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [index]);

  function release(event: PointerEvent<HTMLDivElement>) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null;
    event.currentTarget.removeAttribute("data-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return <div className={`reviews-lane reviews-lane--${index + 1}`} tabIndex={0} role="region" aria-label={`Avaliações de clientes, faixa ${index + 1}. Arraste ou use as setas para navegar.`}
    onPointerDown={event => {
      if (!event.isPrimary || event.button !== 0) return;
      drag.current = { id: event.pointerId, x: event.clientX };
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.setAttribute("data-dragging", "true");
    }}
    onPointerMove={event => {
      if (drag.current?.id !== event.pointerId) return;
      offset.current -= event.clientX - drag.current.x;
      drag.current.x = event.clientX;
      paint();
    }}
    onPointerUp={release} onPointerCancel={release} onLostPointerCapture={release}
    onKeyDown={event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      offset.current += event.key === "ArrowRight" ? 240 : -240;
      paint();
    }}>
    <div className="reviews-track" ref={trackRef}>
      {[0, 1].map(copy => <div className="reviews-group" key={copy} aria-hidden={copy === 1 || index === 1 ? true : undefined}>
        {row.map(review => <div className="review-art" key={review.id}><img src={`/assets/radioativa/reviews/${review.id}.webp`} width="1448" height="1086" loading="lazy" decoding="async" draggable={false} alt={copy === 0 && index === 0 ? `${review.name}. 5 estrelas. ${review.text}` : ""} /></div>)}
      </div>)}
    </div>
  </div>;
}

export function ReviewMarquee() {
  const rows = [reviews, [...reviews.slice(4), ...reviews.slice(0, 4)]];
  return <div className="reviews-gallery">
    <div className="container reviews-tools"><p className="reviews-swipe">Segure para pausar · Arraste para explorar <span aria-hidden="true">↔</span></p></div>
    <div className="reviews-lanes">{rows.map((row, index) => <ReviewLane row={row} index={index} key={index} />)}</div>
  </div>;
}
