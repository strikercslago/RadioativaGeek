import { Header } from "./components/Header";
import { CardGames } from "./components/CardGames";
import { MotionController } from "./components/MotionController";
import { Hero, About, Categories, BrandStory, InstagramGallery, Benefits, Testimonials, StoreLocation, Footer, WhatsAppFloatingButton } from "./components/LandingSections";
import { STORE_INFO } from "./store-info";

const schema = {
  "@context": "https://schema.org", "@type": "Store", name: "Radioativa Geek",
  description: "Loja geek em Passo Fundo com camisetas, canecas, Funkos, TCG, colecionáveis e presentes criativos.",
  foundingDate: "2012", sameAs: [STORE_INFO.instagramUrl],
  ...(STORE_INFO.whatsappNumber ? { telephone: `+${STORE_INFO.whatsappNumber}` } : {}),
  address: { "@type": "PostalAddress", streetAddress: "Rua Paissandu, 1850, Centro", addressLocality: "Passo Fundo", addressRegion: "RS", addressCountry: "BR" },
};
export default function Home() {
  return <>
    <a className="skip-link" href="#conteudo-principal">Ir para o conteúdo</a>
    <MotionController />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <Header />
    <main id="conteudo-principal"><Hero /><About /><Categories /><CardGames /><BrandStory /><InstagramGallery /><Benefits /><Testimonials /><StoreLocation /></main>
    <Footer /><WhatsAppFloatingButton />
  </>;
}
