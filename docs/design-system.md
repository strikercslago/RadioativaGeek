# Design system — Radioativa Geek

## Direção

O pedido textual e o preview aprovado prevalecem sobre a sugestão vermelha do PDF. Identidade preto/amarelo, tipografia condensada, palavras manuscritas, fotos em molduras e texturas discretas.

## Tokens

`app/globals.css` centraliza cores (`--yellow: #FFD600`, `--black: #0B0B0B`, `--surface: #1A1A1A`), container de 1280 px, gutters, radius e espaçamento de seções. Fontes: Inter, Bebas Neue e Permanent Marker, servidas localmente pelo next/font depois do build.

## Componentes

Header e ContactButton são componentes client; seções permanecem server components. MotionController usa IntersectionObserver e Web Animations, sem ocultar o conteúdo caso JavaScript falhe, e respeita reduced motion. Depoimentos usam details/summary nativos. O menu fecha com Escape, clique fora, seleção e mudança para desktop.

## Assets

Artes recebidas recortadas e otimizadas em `public/assets/radioativa/`, sem recriar produtos ou buscar imagens de terceiros. Hero usa picture com arte mobile específica e prioridade alta; demais imagens têm dimensões e lazy loading. Galeria estática aponta ao perfil oficial informado.

## Pendências externas

Número oficial do WhatsApp e domínio de produção: `.env.local`, conforme `.env.example`. Confirmar métricas fornecidas, fotos documentais e autorização dos depoimentos antes de publicar. Não há telefone, preços ou horários fictícios.

## QA

Breakpoints: 320, 360, 390, 430, 768, 1024, 1280 e 1440 px. Build isolado em `.next-production`. Relatórios de navegador em `tmp/browser-check.json` e capturas desktop/mobile em `tmp/`.
