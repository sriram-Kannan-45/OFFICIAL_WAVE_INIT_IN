import os
from PIL import Image, ImageDraw, ImageFont

public_dir = r"d:\wave_init_official\wave-init\client\public"
os.makedirs(public_dir, exist_ok=True)

# Helper to find a suitable sans-serif font
def get_font(size, bold=False):
    font_paths = [
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

# 1. Generate Favicon PNGs (16x16, 32x32, 180x180)
def create_favicon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Rounded white background
    corner_radius = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=corner_radius, fill=(255, 255, 255, 255), outline=(22, 163, 74, 255), width=max(1, int(size * 0.04)))
    
    # Stylized W wave mark
    w = size
    h = size
    points = [
        (int(w * 0.22), int(h * 0.32)),
        (int(w * 0.36), int(h * 0.68)),
        (int(w * 0.50), int(h * 0.42)),
        (int(w * 0.64), int(h * 0.68)),
        (int(w * 0.78), int(h * 0.32)),
    ]
    line_w = max(2, int(size * 0.09))
    draw.line(points, fill=(22, 163, 74, 255), width=line_w, joint="round")
    
    # Center node dot
    r = max(2, int(size * 0.06))
    cx, cy = points[2]
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(22, 163, 74, 255))
    
    return img

fav_16 = create_favicon(16)
fav_32 = create_favicon(32)
fav_48 = create_favicon(48)
fav_180 = create_favicon(180)

fav_16.save(os.path.join(public_dir, "favicon-16x16.png"), "PNG")
fav_32.save(os.path.join(public_dir, "favicon-32x32.png"), "PNG")
fav_180.save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG")

# Save multi-resolution favicon.ico
fav_32.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("Favicons generated successfully.")

# 2. Generate logo.png (400x88)
logo_img = Image.new("RGBA", (400, 88), (255, 255, 255, 0))
logo_draw = ImageDraw.Draw(logo_img)
font_bold = get_font(52, bold=True)

# "WAVE " in dark slate (#0f172a)
logo_draw.text((10, 12), "WAVE ", font=font_bold, fill=(15, 23, 42, 255))

# Calculate offset for "INIT"
bbox = logo_draw.textbbox((10, 12), "WAVE ", font=font_bold)
init_x = bbox[2] + 4

# "INIT" in Wave Init Green (#16a34a)
logo_draw.text((init_x, 12), "INIT", font=font_bold, fill=(22, 163, 74, 255))

logo_img.save(os.path.join(public_dir, "logo.png"), "PNG")
print("logo.png generated.")

# 3. Generate og-image.png (1200x630)
og_img = Image.new("RGB", (1200, 630), (255, 255, 255))
og_draw = ImageDraw.Draw(og_img)

# Subtle ambient gradient / soft borders
for y in range(630):
    # Very subtle vertical gradient from white to soft greenish white
    t = y / 630.0
    r = int(255 - t * 8)
    g = int(255 - t * 2)
    b = int(255 - t * 8)
    og_draw.line([(0, y), (1200, y)], fill=(r, g, b))

# Ambient geometric lines
og_draw.line([(850, 120), (1050, 180)], fill=(203, 213, 225), width=2)
og_draw.line([(1050, 180), (1120, 320)], fill=(203, 213, 225), width=2)
og_draw.line([(1050, 180), (960, 310)], fill=(203, 213, 225), width=2)
og_draw.line([(960, 310), (900, 460)], fill=(203, 213, 225), width=2)

for pt in [(850, 120), (1050, 180), (1120, 320), (960, 310), (900, 460)]:
    og_draw.ellipse([pt[0]-6, pt[1]-6, pt[0]+6, pt[1]+6], fill=(22, 163, 74))

# Decorative Badge
og_draw.rounded_rectangle([90, 80, 350, 124], radius=22, fill=(240, 253, 244), outline=(134, 239, 172), width=2)
og_draw.ellipse([110, 97, 120, 107], fill=(22, 163, 74))
font_badge = get_font(15, bold=True)
og_draw.text((130, 93), "AI PRODUCT STUDIO", font=font_badge, fill=(21, 128, 61))

# Main Logo: WAVE INIT
font_hero_logo = get_font(68, bold=True)
og_draw.text((90, 155), "WAVE ", font=font_hero_logo, fill=(15, 23, 42))
bbox_og = og_draw.textbbox((90, 155), "WAVE ", font=font_hero_logo)
og_draw.text((bbox_og[2] + 4, 155), "INIT", font=font_hero_logo, fill=(22, 163, 74))

font_solutions = get_font(20, bold=True)
og_draw.text((92, 240), "S O L U T I O N S", font=font_solutions, fill=(100, 116, 139))

# Main Headline
font_h1 = get_font(46, bold=True)
og_draw.text((90, 290), "Build Smarter Digital Products with AI", font=font_h1, fill=(15, 23, 42))

# Subtitle
font_sub = get_font(22, bold=False)
og_draw.text((90, 360), "Full-Stack Software · Generative AI Solutions · Autonomous Workflows", font=font_sub, fill=(71, 85, 105))

# Capabilities Pills
pills = ["AI Software Dev", "Full-Stack Platforms", "GenAI & Automation"]
px = 90
font_pill = get_font(17, bold=True)
for pill in pills:
    pill_bbox = og_draw.textbbox((0, 0), pill, font=font_pill)
    pw = pill_bbox[2] - pill_bbox[0] + 40
    og_draw.rounded_rectangle([px, 420, px + pw, 468], radius=14, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    og_draw.text((px + 20, 432), pill, font=font_pill, fill=(51, 65, 85))
    px += pw + 18

# Bottom Domain Banner
font_url = get_font(20, bold=True)
og_draw.text((90, 525), "waveinitsolutions.com", font=font_url, fill=(22, 163, 74))

# Border outline around the image
og_draw.rectangle([0, 0, 1199, 629], outline=(226, 232, 240), width=3)

og_img.save(os.path.join(public_dir, "og-image.png"), "PNG")
print("og-image.png (1200x630) generated successfully.")
