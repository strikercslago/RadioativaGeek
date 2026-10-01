const address = "Rua Paissandu, 1850, Centro, Passo Fundo, RS";
// TODO: configure the official number, including country code, before publishing.
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
if (whatsappNumber && !/^55\d{10,11}$/.test(whatsappNumber)) {
  throw new Error("NEXT_PUBLIC_WHATSAPP_NUMBER deve conter 55, DDD e número oficial.");
}
export const STORE_INFO = {
  address,
  whatsappNumber,
  instagramUrl: "https://www.instagram.com/lojaradioativageek/",
  instagramHandle: "@lojaradioativageek",
  mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
} as const;

export function whatsappUrl(message = "Olá! Vim pelo site da Radioativa Geek.") {
  return STORE_INFO.whatsappNumber
    ? `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;
}
