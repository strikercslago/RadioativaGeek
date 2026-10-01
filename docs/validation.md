# Validação do redesign

Validação local em 30/09/2026, na versão de produção.

- Build de produção: aprovado, incluindo validação de tipos.
- JavaScript inicial da home: 90,3 KB (relatório Next).
- Assets novos: 30 WebP, 807.830 bytes no total.
- Navegador: 320, 360, 390, 430, 768, 1024, 1280 e 1440 px.
- Sem overflow horizontal ou elementos excedendo a viewport, imagens quebradas, âncoras inválidas ou erros de console.
- Menu abre e fecha; Escape e seleção de link funcionam. Depoimentos expandem. Contato sem número mostra alternativas reais. Reduced motion respeitado.

## Lighthouse mobile

| Categoria | Pontuação |
| --- | ---: |
| Desempenho | 70 |
| Acessibilidade | 100 |
| Boas práticas | 100 |
| SEO | 100 |

LCP: 4,3 s. CLS: 0,001. TBT: 420 ms. Resultado local com simulação mobile/CPU do Lighthouse; não representa medição de usuários reais. O desempenho mobile ainda fica abaixo da meta de excelência. Reavaliar na hospedagem definitiva, incluindo cache/CDN e latência; a maior oportunidade restante é o custo inicial de renderização/hidratação. Não foi alterada a stack para remover o runtime do Next.

Relatório completo: `tmp/lighthouse-mobile.json`. Navegador: `tmp/browser-check.json`. Capturas: `tmp/desktop-redesign.png` e `tmp/mobile-redesign.png`.

## Antes de publicar

1. Configurar o WhatsApp oficial em `NEXT_PUBLIC_WHATSAPP_NUMBER` e refazer o build. Sem ele, nenhum número fictício é usado.
2. Configurar `SITE_URL` para canonical, sitemap e Open Graph absolutos. A prévia local usa localhost para as imagens sociais.
3. Confirmar os indicadores fornecidos (+14 anos, +8 mil seguidores, centenas de produtos), autorização dos depoimentos e adequação das artes/fotos à loja real.
4. Validar a conversa no WhatsApp com o número confirmado. Instagram e Google Maps foram verificados quanto à URL e destino; não foram enviados contatos nem executadas ações nessas plataformas.
