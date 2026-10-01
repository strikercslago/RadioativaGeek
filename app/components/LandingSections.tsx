import type { ReactNode } from "react";
import { ContactButton } from "./ContactButton";
import { STORE_INFO } from "../store-info";
import { ReviewMarquee } from "./ReviewMarquee";

const assets = "/assets/radioativa";
export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return <img decoding="async" className={`icon ${className}`} src={`${assets}/icons/${name}.webp`} width="48" height="48" alt="" loading="lazy" />;
}
export function SectionTitle({ eyebrow, children, id }: { eyebrow?: string; children: ReactNode; id?: string }) {
  return <div className="section-heading">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2 id={id}>{children}</h2></div>;
}
export function UniverseIcons() {
  const universes = [["anime", "Animes"], ["games", "Games"], ["movies", "Filmes e séries"], ["cards", "TCG e cards"], ["star", "Colecionáveis"], ["gift", "Presentes"]];
  return <div className="universes" aria-label="Encontre seu universo">{universes.map(([icon, title]) => <a href="#produtos" key={title}><Icon name={icon} /><span>{title}</span></a>)}</div>;
}
export function Hero() {
  return <section className="hero" id="inicio" aria-labelledby="hero-title">
    <picture className="hero__art"><source media="(max-width: 767px)" srcSet={`${assets}/hero/fachada-mobile.webp`} /><img decoding="async" src={`${assets}/hero/fachada-desktop.webp`} width="1672" height="941" alt="Fachada da loja Radioativa Geek Nerd, com entrada amarela e vitrine de produtos geek" fetchPriority="high" /></picture>
    <div className="container hero__inner">
      <div className="hero__copy">
        <h1 id="hero-title"><span className="hero__eyebrow">A loja geek de</span><strong>Passo Fundo</strong><span className="hero__line">para quem vive a</span><em className="brush">Cultura Pop</em></h1>
        <p>Camisetas, canecas, Funkos, TCG, colecionáveis e presentes criativos para fãs de animes, games, filmes, séries e muito mais.</p>
        <div className="actions"><ContactButton message="Olá! Vim pelo site da Radioativa e queria saber mais sobre os produtos."><Icon name="whatsapp" />Ver produtos pelo WhatsApp</ContactButton><a className="button button--outline" href={STORE_INFO.mapsUrl} target="_blank" rel="noopener noreferrer"><Icon name="pin" />Como chegar na loja</a></div>
      </div>
      <UniverseIcons />
    </div>
  </section>;
}
export function Stats() {
  return <div className="stats" aria-label="A Radioativa em números">
    {[["clock", "+14 anos", "de história"], ["instagram", "+8 mil", "seguidores no Instagram"], ["gift", "Centenas", "de produtos geek"], ["store", "Loja física", "em Passo Fundo"]].map(([icon, value, label]) => <div className="stat" key={value}><Icon name={icon} /><div><strong>{value}</strong><span>{label}</span></div></div>)}
  </div>;
}
export function About() {
  return <section className="about yellow-section" id="sobre" aria-labelledby="about-title">
    <div className="container about__grid">
      <div className="about__copy" data-reveal><SectionTitle eyebrow="Conheça a" id="about-title">Radioativa Geek</SectionTitle><p>Uma loja feita para quem ama cultura geek, colecionáveis, animes, games, filmes, séries e produtos com personalidade.</p><Stats /></div>
      <div className="about__photos" data-reveal>
        <div className="polaroid polaroid--back"><img decoding="async" src={`${assets}/store/vitrine.webp`} width="466" height="386" alt="Colecionáveis na composição visual da Radioativa" loading="lazy" /></div>
        <div className="polaroid polaroid--front"><img decoding="async" src={`${assets}/store/interior.webp`} width="509" height="386" alt="Interior da loja na referência visual fornecida" loading="lazy" /></div>
        <p className="handwritten">Mais que uma loja,<br />um ponto de encontro geek!</p>
        <img decoding="async" className="doodle-arrow" src={`${assets}/textures/arrow.webp`} alt="" width="140" height="81" loading="lazy" />
      </div>
    </div>
  </section>;
}
const categories = [
  { image: "categories/camisetas-loja", title: "Camisetas Geek", description: "Estampas inspiradas em animes, filmes, séries, games e cultura pop.", message: "Olá! Vim pelo site e quero conhecer as camisetas geek." },
  { image: "categories/canecas-loja", title: "Canecas Criativas", description: "Presentes úteis, divertidos e cheios de personalidade.", message: "Olá! Vim pelo site e queria ver as opções de canecas." },
  { image: "categories/colecionaveis-loja", title: "Funkos e Colecionáveis", description: "Personagens e histórias que merecem um lugar na sua estante.", message: "Olá! Vim pelo site e queria saber mais sobre Funkos e colecionáveis." },
  { image: "categories/cards-loja", title: "TCG e Cards", description: "Para quem joga, troca, coleciona e vive o universo card game.", message: "Olá! Vim pelo site e quero consultar os produtos de TCG e cards." },
  { image: "categories/presentes-loja", title: "Presentes Criativos", description: "Surpreenda quem você gosta com um presente cheio de personalidade.", message: "Olá! Preciso de ajuda para escolher um presente geek." },
  { image: "store/pelucias", title: "E muito mais", description: "Seu próximo achado pode estar aqui. Venha descobrir o seu universo.", message: "Olá! Quero conhecer mais produtos da Radioativa Geek." },
];
export function Categories() {
  return <section className="categories section textured" id="produtos" aria-labelledby="products-title"><div className="container">
    <div className="section-top" data-reveal><SectionTitle eyebrow="O que você encontra na" id="products-title"><span className="brush">Radioativa</span></SectionTitle><p>Produtos para fãs, colecionadores e para quem procura o presente perfeito. Tudo em um só lugar.</p><ContactButton message="Olá! Vim pelo site e quero conhecer os produtos."><Icon name="whatsapp" />Ver tudo pelo WhatsApp</ContactButton></div>
    <div className="categories-grid">{categories.map((category, index) => <article className="category-card" key={category.title} data-reveal>
      <div className="category-card__image"><img decoding="async" src={`${assets}/${category.image}.webp`} alt={`Seleção visual de ${category.title.toLowerCase()}`} width="600" height="400" loading="lazy" /><span className="category-card__number">0{index + 1}</span></div>
      <div className="category-card__body"><h3>{category.title}</h3><p>{category.description}</p><ContactButton className="category-card__link" message={category.message} label={`Ver no WhatsApp: ${category.title}`}>Ver no WhatsApp <span aria-hidden="true">↗</span></ContactButton></div>
    </article>)}</div>
  </div></section>;
}
export function BrandStory() {
  return <section className="story section" id="loja" aria-labelledby="story-title"><div className="container story__grid">
    <div className="story__photo" data-reveal><img decoding="async" src={`${assets}/store/interior.webp`} width="509" height="386" alt="Ambiente da Radioativa representado no material visual do projeto" loading="lazy" /><span className="photo-tag">Desde 2012. De fã para fã.</span></div>
    <div className="story__copy" data-reveal><span className="eyebrow">Todo fã tem um universo</span><h2 id="story-title">Mais que uma loja,<br />um ponto de<br /><span className="brush">encontro geek.</span></h2><p>A Radioativa nasceu para reunir pessoas que compartilham o amor por cultura pop, animes, games, filmes, séries, colecionáveis e presentes criativos.</p><p>Aqui, cada produto tem personalidade e cada cliente encontra algo que combina com seu universo.</p><a className="text-link" href="#visite">Vem conhecer a nossa loja <span aria-hidden="true">↗</span></a></div>
  </div></section>;
}
export function InstagramGallery() {
  return <section className="instagram yellow-section" aria-labelledby="instagram-title"><div className="container instagram__grid">
    <div data-reveal><SectionTitle id="instagram-title">Novidades sempre<br />na Radioativa</SectionTitle><p>Produtos novos, lançamentos, eventos e curiosidades aparecem primeiro no Instagram.</p><a className="button button--dark" href={STORE_INFO.instagramUrl} target="_blank" rel="noopener noreferrer"><Icon name="instagram" />Seguir @lojaradioativageek</a></div>
    <div className="social-gallery social-gallery--instagram">{[["instagram/logo", "Instagram da Radioativa"], ["instagram/perfil", "Perfil @lojaradioativageek no Instagram"], ["instagram/publicacoes", "Publicações com produtos e novidades da Radioativa"]].map(([src, alt]) => <a href={STORE_INFO.instagramUrl} key={src} target="_blank" rel="noopener noreferrer" aria-label={`Conhecer ${alt.toLowerCase()} no Instagram`}><img decoding="async" src={`${assets}/${src}.webp`} alt={alt} width="400" height="400" loading="lazy" /><span><Icon name="instagram" /></span></a>)}</div>
  </div></section>;
}
export function Benefits() {
  const features = [["store", "Loja física em Passo Fundo", "Atendimento próximo e experiência dentro da loja."], ["chat", "Atendimento personalizado", "Fale direto com a gente pelo WhatsApp."], ["games", "Produtos para todos os estilos", "Animes, games, filmes, séries e cultura pop."], ["star", "Novidades frequentes", "Sempre com lançamentos e produtos diferentes."], ["gift", "Opções de presente", "Para todas as ocasiões e tipos de fã."], ["community", "Ambiente feito para fãs", "Uma loja feita de geek para geek."]];
  return <section className="benefits section textured" aria-labelledby="benefits-title"><div className="container"><SectionTitle eyebrow="Aqui, a gente entende o seu universo" id="benefits-title">Por que comprar na <span>Radioativa?</span></SectionTitle><div className="benefits-grid">{features.map(([icon, title, copy]) => <article className="feature-card" key={title} data-reveal><Icon name={icon} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>;
}
export function Testimonials() {
  return <section className="reviews-section section" id="depoimentos" aria-labelledby="testimonials-title">
    <div className="container reviews-heading" data-reveal>
      <SectionTitle eyebrow="Histórias que fazem parte da nossa" id="testimonials-title">Quem conhece,<br /><span className="brush">vira fã.</span></SectionTitle>
      <div className="reviews-intro"><p>Mais do que clientes, a Radioativa reúne pessoas que criaram histórias, memórias e uma relação especial com a loja.</p><p className="reviews-proof"><span aria-label="5 estrelas">★★★★★</span> Avaliações reais de clientes</p></div>
    </div>
    <ReviewMarquee />
    <div className="container reviews-invitation" data-reveal><div><h3>Sua história também faz parte da nossa.</h3><p>Já visitou a Radioativa? Conte como foi sua experiência e deixe sua avaliação no Google.</p></div><a className="button button--dark" href={STORE_INFO.reviewsUrl} target="_blank" rel="noopener noreferrer">Avaliar a loja no Google <span aria-hidden="true">↗</span></a></div>
  </section>;
}
export function StoreLocation() {
  return <section className="visit" id="visite" aria-labelledby="visit-title"><div className="container visit__grid"><div className="visit__copy" data-reveal><SectionTitle eyebrow="Seu universo tem endereço" id="visit-title">Visite a<br /><span>Radioativa Geek</span></SectionTitle><p>Estamos em Passo Fundo esperando por você com produtos geek, colecionáveis, camisetas, canecas, TCG e muitas novidades.</p><address><Icon name="pin" /><span>Rua Paissandu, 1850 · Centro<br />Passo Fundo, RS</span></address><div className="actions"><a className="button button--primary" href={STORE_INFO.mapsUrl} target="_blank" rel="noopener noreferrer"><Icon name="pin" />Ver loja no Google Maps</a><ContactButton className="button button--outline"><Icon name="whatsapp" />Chamar no WhatsApp</ContactButton></div></div><div className="visit__photo"><img decoding="async" src={`${assets}/hero/desktop.webp`} width="1672" height="941" alt="Fachada da Radioativa na arte fornecida para o site" loading="lazy" /><span className="visit__badge"><Icon name="store" />Te esperamos por aqui!</span></div></div><div className="visit-map"><iframe src={STORE_INFO.mapsEmbedUrl} title="Localização da Loja Radioativa Geek Nerd no Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div></section>;
}
export function Footer() {
  return <footer id="contato" className="footer"><div className="container"><div className="footer__top"><div className="footer__brand"><a href="#inicio" aria-label="Voltar ao início"><img decoding="async" src={`${assets}/logos/logo.webp`} alt="Radioativa Geek / Nerd" width="220" height="104" loading="lazy" /></a><p>Todo fã tem um universo.<br />A Radioativa é onde eles se encontram.</p></div><div><h2>Explore a Radioativa</h2><a href="#inicio">Início</a><a href="#produtos">Produtos</a><a href="#sobre">Nossa história</a><a href="#visite">Loja física</a></div><div><h2>Vamos conversar?</h2><a href={STORE_INFO.instagramUrl} target="_blank" rel="noopener noreferrer">{STORE_INFO.instagramHandle} ↗</a><ContactButton className="footer-contact">Chamar no WhatsApp ↗</ContactButton><p>Rua Paissandu, 1850 · Centro<br />Passo Fundo, RS</p></div></div><div className="footer__bottom"><p>© 2026 Radioativa Geek. Todos os direitos reservados.</p><p>Desenvolvido com <span>♥</span> para fãs de cultura pop.</p></div></div></footer>;
}
export function WhatsAppFloatingButton() {
  return <ContactButton className="whatsapp-float" label="Chamar a Radioativa no WhatsApp"><Icon name="whatsapp" /></ContactButton>;
}
