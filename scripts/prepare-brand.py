"""Export the client-supplied logo without changing its artwork or transparency."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
logo = Image.open(root / 'assets/brand/logo-oficial.png').convert('RGBA')
web = logo.copy()
web.thumbnail((960, 960), Image.Resampling.LANCZOS)
web.save(root / 'public/assets/radioativa/logos/logo-oficial.webp', 'WEBP', lossless=True, method=6)
icon = logo.copy()
icon.thumbnail((128, 128), Image.Resampling.LANCZOS)
icon.save(root / 'app/icon.png')
