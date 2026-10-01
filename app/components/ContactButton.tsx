"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { STORE_INFO, whatsappUrl } from "../store-info";

export function ContactButton({ children, message, className = "button button--primary", label }: {
  children: ReactNode; message?: string; className?: string; label?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => { if (show) dialog.current?.showModal(); }, [show]);
  const url = whatsappUrl(message);
  if (url) return <a className={className} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>;
  return <>
    <button type="button" className={className} aria-label={label} onClick={() => setShow(true)}>{children}</button>
    {show && <dialog ref={dialog} className="contact-dialog" aria-label="Fale com a Radioativa" onClose={() => setShow(false)} onClick={event => {
      if (event.target === event.currentTarget) dialog.current?.close();
    }}>
      <form method="dialog"><button className="dialog-close" aria-label="Fechar contato">×</button></form>
      <span className="eyebrow">Conversa de fã para fã</span>
      <h2>Fale com a Radioativa</h2>
      <p>O contato pelo WhatsApp está indisponível neste site no momento. Você pode falar com a gente pelo Instagram ou visitar a loja.</p>
      <a className="button button--primary" href={STORE_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">Abrir Instagram ↗</a>
      <a className="dialog-route" href={STORE_INFO.mapsUrl} target="_blank" rel="noopener noreferrer">{STORE_INFO.address} ↗</a>
    </dialog>}
  </>;
}
