"""
Generate product OG images for LaunchPath — 1200×630, dark/gold brand palette.
Uses system Liberation fonts (Serif for title, Mono for labels).
"""
from PIL import Image, ImageDraw, ImageFont
import os, math

# ── Brand palette ────────────────────────────────────────────────────────────
BG          = (13, 13, 13)          # #0d0d0d
WHITE       = (245, 243, 238)       # warm white
GOLD        = (212, 144, 10)        # #d4900a
GOLD_MUTED  = (138, 109, 47)        # muted gold for labels
GOLD_FAINT  = (45, 36, 15)         # very faint gold for geometric
CORAL       = (216, 90, 48)         # #d85a30 — accent only
LINE        = (40, 35, 20)          # very dark gold-tinted line

# ── Fonts ────────────────────────────────────────────────────────────────────
SERIF_BOLD  = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SERIF_REG   = "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf"
MONO_BOLD   = "/usr/share/fonts/truetype/liberation/LiberationMono-Bold.ttf"
MONO_REG    = "/usr/share/fonts/truetype/liberation/LiberationMono-Regular.ttf"
SANS_BOLD   = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"

W, H = 1200, 630
OUT = "/app/frontend/public"

# ── Product definitions ───────────────────────────────────────────────────────
PRODUCTS = [
    dict(slug="new-entrant-packet",          code="LP-PKT-001", title="New Entrant Packet",             sub="FMCSA New-Authority Operating Standard",       shape="gateway"),
    dict(slug="drug-alcohol-packet",         code="LP-PKT-002", title="Drug & Alcohol Packet",          sub="Part 382 Compliance Operating Standard",       shape="grid"),
    dict(slug="hos-packet",                  code="LP-PKT-003", title="HOS & Dispatch Packet",          sub="Part 395 Hours-of-Service Standard",           shape="timeline"),
    dict(slug="maintenance-packet",          code="LP-PKT-004", title="Maintenance & Unit File Packet", sub="Part 396 Fleet Maintenance Standard",          shape="tabs"),
    dict(slug="insurance-packet",            code="LP-PKT-005", title="Insurance & Authority Packet",   sub="Carrier Authority & Insurance Standard",       shape="shield"),
    dict(slug="new-carrier-document-system", code="LP-BDL-001", title="New Carrier Document System",   sub="Complete Operating Document Architecture",     shape="layers"),
    dict(slug="safety-audit-prep-pack",      code="LP-PKT-SAP", title="Safety Audit Prep Pack",        sub="FMCSA Audit Preparation Standard",             shape="checklist"),
    dict(slug="safety-audit-prep",           code="LP-PKT-SA",  title="Safety Audit Prep",             sub="New Entrant Audit Preparation Standard",       shape="checklist"),
    dict(slug="starter-stack",               code="LP-STK-001", title="Starter Stack",                  sub="Foundation Document Set for New Carriers",     shape="stack"),
    dict(slug="dq-file-builder",             code="LP-DQF-001", title="DQ File Builder Kit",            sub="Driver Qualification File System",             shape="file"),
]

def draw_shape(draw, shape, gold_faint, gold_muted):
    """Draw a distinct abstract background element on the right side."""
    rx = W * 0.62   # start x of right panel

    if shape == "gateway":
        # Vertical threshold lines — one thick, others faint
        for i, x in enumerate([rx + 100, rx + 160, rx + 220]):
            w = 2 if i == 0 else 1
            col = GOLD_MUTED if i == 0 else GOLD_FAINT
            draw.line([(x, 60), (x, H - 60)], fill=col, width=w)
        # Horizontal crossbars
        for y in [H * 0.3, H * 0.5, H * 0.7]:
            draw.line([(rx + 80, y), (rx + 260, y)], fill=GOLD_FAINT, width=1)

    elif shape == "grid":
        # Compliance log matrix
        cols = range(int(rx + 60), W - 60, 36)
        rows = range(80, H - 60, 42)
        for x in cols:
            draw.line([(x, 80), (x, H - 60)], fill=GOLD_FAINT, width=1)
        for y in rows:
            draw.line([(int(rx + 60), y), (W - 60, y)], fill=GOLD_FAINT, width=1)
        # Highlight first column header
        draw.line([(int(rx + 60), 80), (int(rx + 60), H - 60)], fill=GOLD_MUTED, width=2)
        draw.line([(int(rx + 60), 80), (W - 60, 80)], fill=GOLD_MUTED, width=2)

    elif shape == "timeline":
        # Horizontal duty-status bars
        bar_y = 160
        widths = [340, 220, 280, 180, 310, 240, 190]
        for i, bw in enumerate(widths):
            y = bar_y + i * 58
            col = GOLD_MUTED if i == 0 else GOLD_FAINT
            h_bar = 3 if i == 0 else 1
            draw.rectangle([(rx + 60, y), (min(rx + 60 + bw, W - 60), y + h_bar)], fill=col)

    elif shape == "tabs":
        # File-folder tabs stacked with offset
        tab_w, tab_h = 200, 48
        for i in range(6):
            x = rx + 60 + i * 18
            y = 90 + i * 72
            if y + tab_h > H - 60:
                break
            draw.rectangle([(x, y), (x + tab_w, y + tab_h)], outline=GOLD_FAINT if i > 0 else GOLD_MUTED, width=1 if i > 0 else 2)
            # Tab ear
            draw.rectangle([(x, y - 16), (x + 60, y)], outline=GOLD_FAINT, width=1)

    elif shape == "shield":
        # Shield outline — authority emblem
        cx, cy = int(rx + 210), H // 2
        pts = [(cx, cy - 130), (cx + 100, cy - 80), (cx + 100, cy + 40), (cx, cy + 130), (cx - 100, cy + 40), (cx - 100, cy - 80)]
        draw.polygon(pts, outline=GOLD_MUTED, fill=None)
        # Inner smaller shield
        pts2 = [(cx, cy - 90), (cx + 65, cy - 50), (cx + 65, cy + 25), (cx, cy + 90), (cx - 65, cy + 25), (cx - 65, cy - 50)]
        draw.polygon(pts2, outline=GOLD_FAINT, fill=None)

    elif shape == "layers":
        # Stacked rectangular layers — document architecture
        for i in range(5):
            x = rx + 60 + i * 12
            y = 120 + i * 72
            draw.rectangle([(x, y), (x + 320 - i * 20, y + 52)], outline=GOLD_MUTED if i == 0 else GOLD_FAINT, width=2 if i == 0 else 1)

    elif shape == "checklist":
        # Checklist rows with boxes
        for i in range(6):
            y = 120 + i * 68
            # Checkbox square
            bx = int(rx + 80)
            draw.rectangle([(bx, y), (bx + 22, y + 22)], outline=GOLD_MUTED if i < 2 else GOLD_FAINT, width=1)
            if i < 2:
                # Checkmark
                draw.line([(bx + 4, y + 11), (bx + 9, y + 17), (bx + 18, y + 5)], fill=GOLD_MUTED, width=2)
            # Line after checkbox
            draw.line([(bx + 34, y + 11), (min(bx + 34 + 200 - i * 20, W - 60), y + 11)], fill=GOLD_FAINT if i > 1 else GOLD_MUTED, width=1)

    elif shape == "stack":
        # Foundation stack — wide base, narrower top
        widths_s = [340, 300, 260, 220, 180]
        for i, bw in enumerate(widths_s):
            x = int(rx + 60 + (340 - bw) / 2)
            y = H - 100 - i * 70
            draw.rectangle([(x, y), (x + bw, y + 44)], outline=GOLD_MUTED if i == 0 else GOLD_FAINT, width=2 if i == 0 else 1)

    elif shape == "file":
        # DQ file — tabbed folder with content lines
        fx, fy = int(rx + 80), 100
        fw, fh = 300, 360
        # Tab
        draw.rectangle([(fx, fy), (fx + 80, fy + 24)], outline=GOLD_MUTED, width=2)
        # Folder body
        draw.rectangle([(fx, fy + 24), (fx + fw, fy + 24 + fh)], outline=GOLD_MUTED, width=2)
        # Lines inside
        for i in range(7):
            ly = fy + 60 + i * 40
            draw.line([(fx + 20, ly), (fx + fw - 20, ly)], fill=GOLD_FAINT, width=1)
        # Header line
        draw.line([(fx + 20, fy + 50), (fx + fw - 20, fy + 50)], fill=GOLD_MUTED, width=1)


def make_og(p):
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Subtle top border
    draw.line([(0, 0), (W, 0)], fill=GOLD_MUTED, width=2)

    # Right-side geometric element
    draw_shape(draw, p["shape"], GOLD_FAINT, GOLD_MUTED)

    # Vertical divider line (left content | right visual)
    draw.line([(int(W * 0.60), 40), (int(W * 0.60), H - 40)], fill=LINE, width=1)

    # ── Left content panel ──────────────────────────────────────────────────
    lx = 72   # left text X

    # Product code — top
    font_code = ImageFont.truetype(MONO_REG, 13)
    draw.text((lx, 54), p["code"], font=font_code, fill=GOLD_MUTED)

    # Category badge
    draw.text((lx, 78), "LAUNCHPATH OPERATING STANDARD", font=ImageFont.truetype(MONO_REG, 11), fill=LINE)

    # Product title — main headline
    font_title = ImageFont.truetype(SERIF_BOLD, 56)
    title = p["title"]

    # Wrap title if long
    words = title.split()
    lines = []
    current = ""
    max_title_w = int(W * 0.55)
    for word in words:
        test = (current + " " + word).strip()
        bb = font_title.getbbox(test)
        if bb[2] > max_title_w and current:
            lines.append(current)
            current = word
        else:
            current = test
    if current:
        lines.append(current)

    title_y = H // 2 - (len(lines) * 64) // 2 - 20
    for ln in lines:
        draw.text((lx, title_y), ln, font=font_title, fill=WHITE)
        title_y += 68

    # Subtitle
    font_sub = ImageFont.truetype(MONO_BOLD, 13)
    sub_y = title_y + 12
    sub_text = p["sub"].upper()
    # Wrap subtitle
    sub_words = sub_text.split()
    sub_lines = []
    sc = ""
    for w in sub_words:
        test = (sc + " " + w).strip()
        bb = font_sub.getbbox(test)
        if bb[2] > max_title_w and sc:
            sub_lines.append(sc)
            sc = w
        else:
            sc = test
    if sc:
        sub_lines.append(sc)
    for sl in sub_lines:
        draw.text((lx, sub_y), sl, font=font_sub, fill=GOLD)
        sub_y += 20

    # Gold rule under subtitle
    draw.line([(lx, sub_y + 10), (lx + 180, sub_y + 10)], fill=GOLD_MUTED, width=1)

    # ── LaunchPath wordmark — bottom left ───────────────────────────────────
    font_mark = ImageFont.truetype(SANS_BOLD, 14)
    draw.text((lx, H - 52), "LAUNCHPATH", font=font_mark, fill=GOLD_MUTED)
    font_tagline = ImageFont.truetype(MONO_REG, 11)
    draw.text((lx, H - 32), "Transportation Compliance Education", font=font_tagline, fill=LINE)

    # Bottom border
    draw.line([(0, H - 1), (W, H - 1)], fill=GOLD_MUTED, width=2)

    out_path = os.path.join(OUT, f"og-{p['slug']}.png")
    img.save(out_path, "PNG", optimize=True)
    print(f"  ✓ {p['slug']} → {out_path}")
    return out_path


if __name__ == "__main__":
    print(f"Generating {len(PRODUCTS)} OG images…")
    for p in PRODUCTS:
        make_og(p)
    print("Done.")
