import { STORE_INFO } from "../store-info";

const assets = "/assets/radioativa/cardgames";

export function CardGames() {
  return <section className="cardgames" id="card-games" aria-labelledby="cardgames-title">
    <div className="cardgames__layout">
      <div className="cardgames__copy">
        <img className="cardgames__logo" src="/assets/radioativa/logos/logo-oficial.webp" width="220" height="104" alt="Radioativa Geek / Nerd" loading="lazy" decoding="async" />
        <p className="cardgames__eyebrow">Loja oficial da Radioativa</p>
        <h2 id="cardgames-title">Seu próximo<span className="brush">Duelo começa aqui!</span></h2>
        <p className="cardgames__description"><strong>Magic, Pokémon, Yu-Gi-Oh!, Digimon,</strong> acessórios, produtos selados e muito mais na loja oficial da <strong>Radioativa.</strong></p>
        <a className="button button--primary cardgames__cta" href={STORE_INFO.cardsStoreUrl} target="_blank" rel="noopener noreferrer" aria-describedby="cardgames-destination">
          <img className="cardgames__cart" src={`${assets}/cart.svg`} width="26" height="26" alt="" loading="lazy" />
          <span>Acessar a loja de cards</span>
          <img src={`${assets}/external-link.svg`} width="20" height="20" alt="" loading="lazy" />
        </a>
        <p id="cardgames-destination" className="cardgames__destination">Você será direcionado para <strong>lojaradioativa.com.br</strong><span className="cardgames__sr"> em uma nova aba</span></p>
      </div>
      <img className="cardgames__art" src={`${assets}/vitrine-radioativa.png`} width="1672" height="941" alt="Vitrine da Radioativa com monitor da loja online, cartas de Magic, Pokémon e Digimon, boosters, teclado e caneca em um ambiente geek preto e amarelo" loading="lazy" decoding="async" />
    </div>
  </section>;
}
