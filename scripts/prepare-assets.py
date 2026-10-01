"""Prepare supplied artwork for the website; no generated or external product images."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = Path.home() / 'Downloads'
target = root / 'public/assets/radioativa'

def source_image(suffix):
    return Image.open(next(source.glob(f'Imagem do ChatGPT 30 de set. de 2026, 22_49*{suffix}.png')))

def save(image, name, width, quality=85):
    path = target / name
    path.parent.mkdir(parents=True, exist_ok=True)
    image.thumbnail((width, 2400), Image.Resampling.LANCZOS)
    image.save(path, 'WEBP', quality=quality, method=6)

save(source_image('-5'), 'hero/desktop.webp', 1672, 78)
save(source_image('-6').crop((0, 330, 941, 1672)), 'hero/mobile.webp', 750, 72)
logos = source_image('-2')
save(logos.crop((190, 0, 1330, 538)), 'logos/logo.webp', 360, 82)
icon = logos.crop((985, 545, 1265, 820))
save(icon.copy(), 'logos/symbol.webp', 160, 95)
icon.resize((64, 64), Image.Resampling.LANCZOS).save(root / 'app/icon.png')

sheet = source_image('-7')
for name, box in {
    'camisetas': (365, 25, 820, 326),
    'canecas': (1215, 24, 1655, 326),
    'colecionaveis': (400, 357, 820, 645),
    'cards': (1200, 359, 1654, 647),
    'presentes': (820, 676, 1295, 916),
}.items():
    save(sheet.crop(box), f'categories/{name}.webp', 640, 77)

mosaic = source_image('-8')
for name, box in {
    'interior': (681, 0, 1190, 386),
    'vitrine': (1206, 0, 1672, 386),
    'caneca': (684, 404, 1191, 696),
    'pelucias': (630, 716, 950, 941),
    'fachada': (180, 0, 666, 459),
}.items():
    save(mosaic.crop(box), f'store/{name}.webp', 800, 77)

icons = source_image('-3')
boxes = {
    'whatsapp': (314, 49, 567, 301), 'instagram': (596, 55, 851, 299),
    'pin': (891, 43, 1125, 311), 'store': (1161, 65, 1418, 294),
    'gift': (323, 311, 580, 575), 'anime': (602, 303, 852, 586),
    'cards': (859, 320, 1123, 590), 'games': (1123, 352, 1438, 579),
    'movies': (30, 584, 281, 832), 'community': (301, 616, 594, 824),
    'chat': (608, 602, 851, 829), 'star': (45, 838, 268, 1054),
    'clock': (319, 829, 566, 1065),
}
for name, box in boxes.items():
    save(icons.crop(box), f'icons/{name}.webp', 80, 76)
graphics = source_image('-4')
save(graphics.crop((0, 0, 566, 162)), 'textures/brush.webp', 566)
save(graphics.crop((984, 0, 1245, 151)), 'textures/arrow.webp', 180, 72)
save(Image.open(root / 'public/assets/textures/texture-dark-grunge.webp'), 'textures/grunge.webp', 600, 65)

# Customer messages are versioned in app/testimonials.ts independently of artwork.
print(f'Prepared {len(list(target.rglob("*.webp")))} optimized assets.')
