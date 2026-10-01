const address = "Rua Paissandu, 1850, Centro, Passo Fundo, RS";
// Official contact supplied by the store; environment can override it.
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "555497068562").replace(/\D/g, "");
if (whatsappNumber && !/^55\d{10,11}$/.test(whatsappNumber)) {
  throw new Error("NEXT_PUBLIC_WHATSAPP_NUMBER deve conter 55, DDD e número oficial.");
}
export const STORE_INFO = {
  cardsStoreUrl: "https://www.lojaradioativa.com.br/",
  address,
  whatsappNumber,
  instagramUrl: "https://www.instagram.com/lojaradioativageek/",
  instagramHandle: "@lojaradioativageek",
  mapsUrl: "https://www.google.com/maps?cid=14988804454881915424",
  mapsEmbedUrl: "https://maps.google.com/maps?cid=14988804454881915424&output=embed",
  reviewsUrl: "https://www.google.com/maps?cid=14988804454881915424",
} as const;

export function whatsappUrl(message = "Olá! Vim pelo site da Radioativa Geek.") {
  return STORE_INFO.whatsappNumber
    ? `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;
}
