# Radioativa Geek

Landing page da Radioativa em Next.js 14, React 18, TypeScript e CSS. Mantém a stack original, usa o preview preto/amarelo aprovado e os materiais enviados no projeto.

A versão atual está em `app/` e é executada pelos comandos npm abaixo. Os arquivos estáticos anteriores (`index.html`, `styles.css`, `script.js`, `server.mjs`, `assets/` e `images/`) foram preservados do repositório existente como referência. Para servir o redesign, utilize Next.js; abrir o HTML antigo não exibe a versão atual.

## Desenvolvimento e produção

```sh
npm install
npm run dev
npm run typecheck
npm run build
npm run start
```

A prévia usa `.next`; build e servidor de produção usam `.next-production`, permitindo validar produção sem interferir no servidor de desenvolvimento.

## Configuração antes de publicar

Copie `.env.example` para `.env.local` e preencha:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: WhatsApp oficial, com 55 + DDD + número, somente dígitos. Requer novo build. Enquanto estiver vazio, os botões abrem uma mensagem acessível de indisponibilidade com alternativas de Instagram e rota; não enviam o visitante para um número presumido.
- `SITE_URL`: origem HTTPS definitiva. Ativa canonical, sitemap e URLs absolutas corretas de compartilhamento. Sem domínio, o sitemap fica vazio e o Next usa localhost nas imagens sociais durante a prévia.

Instagram e rota estão centralizados em `app/store-info.ts`. Mensagens do WhatsApp variam entre produto, presente, cards e contato geral.

## Conteúdo e imagens

- `app/components/LandingSections.tsx`: seções, categorias, benefícios e galeria estática.
- `app/testimonials.ts`: textos preservados do projeto anterior, com trechos expansíveis na página.
- `public/assets/radioativa/`: 30 arquivos WebP preparados a partir dos materiais fornecidos; logo, ícones, hero desktop/mobile, categorias e loja.
- `scripts/prepare-assets.py`: recortes e otimização reproduzíveis com Pillow. Os arquivos-fonte são os anexos na pasta Downloads. Não é necessário executá-lo para fazer build.
- A galeria usa artes fornecidas; não representa um feed obtido da API do Instagram, estoque confirmado ou fotografia documental da loja.
- +14 anos, +8 mil e centenas seguem o pedido textual. Confirmar a atualidade dos indicadores antes da publicação.
- Confirmar fotografias reais, autorização dos depoimentos e número oficial. Horários, preços, promoções e disponibilidade não foram inventados.

## Verificação

`npm run build` e `npm run typecheck`. O script `scripts/verify-browser.cjs` verifica a versão em `http://localhost:3003`, configurável por `TEST_URL`, com Playwright disponível no ambiente (`PLAYWRIGHT_MODULE` aceita o caminho para uma instalação existente). Não adiciona Playwright às dependências do site.

Verifica larguras de 320 a 1440 px, overflow, imagens, H1, console, âncoras, menu, Escape, navegação, expansão de depoimentos e contato sem número. Capturas e relatórios ficam em `tmp/`.
