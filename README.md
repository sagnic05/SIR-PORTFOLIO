# Bittu Kumar Portfolio
Run: open `index.html`, or VS Code → Live Server. Deploy: push folder to a GitHub repo → Settings → Pages → deploy from `main` / root.

## Replacing images (no code edits needed)
Drop the file at the path below; the placeholder is replaced automatically. Use JPG with exactly these names.
- Profile: `assets/profile/bittu-kumar.jpg`
- Projects: `assets/projects/project-XX/project-XX-01.jpg` … `-04.jpg` (XX = 01–10)
- Certificates: `assets/certificates/pmp.jpg`, `jetking.jpg`, `dca.jpg`, `sophos.jpg`
- Awards: `assets/awards/project-excellence.jpg`, `dm-murshidabad.jpg`
- Resume: `assets/resume/Bittu-Kumar-Resume.pdf`
To rename any path, edit `config.js` only. All text content is also in `config.js`.

## Open in VS Code / Live Server
1. Unzip, then VS Code → File → Open Folder → select the folder.
2. Install the "Live Server" extension, right-click `index.html` → Open with Live Server.
(Double-clicking `index.html` also works.)

## GitHub Pages
Create a public repo, upload ALL files (keep `assets/` structure), then Settings → Pages → Source: `main` branch, `/ (root)` → Save. The site appears at `https://<user>.github.io/<repo>/`.

## Files
`index.html` page · `style.css` styles · `script.js` rendering/theme · `animations.js` intro, scroll reveal, count-up · `config.js` all content and image paths.
Profile photo (used in intro, hero, About): replace `assets/profile/bittu-kumar.jpg` (portrait, ~3:4 works best).

## Notes
- The intro plays on every page load (about 5 seconds; use Skip intro to bypass).
- `assets/resume/Bittu-Kumar-Resume.pdf` is the official resume supplied by Bittu Kumar.
- Console shows "file not found" for project/certificate/award images that haven't been added yet; placeholders display instead. These disappear as you add images.
- If Windows/macOS has "reduce animations" switched on, browsers report reduced-motion; the intro then shows as a short static screen (about 2.4 s) with no motion. Use the "Replay intro" link in the footer to run it again.
- Intro: scenes: atmosphere, BK monogram, name reveal, identity, portrait, final message (~8 s) then a curtain opens onto the top of the hero. Every full load/refresh starts at the top; nothing is stored. The footer "Replay intro" link reloads the page.
- V3: global dark/light theme (all sections), layered interactive portrait, paint-first cinematic intro with in-page replay.
- Theme: all colours come from tokens in the "GLOBAL THEME SYSTEM" block of style.css (`html[data-theme="dark|light"]`). The default is dark; the visitor's choice is saved in localStorage and applied in `<head>` before first paint. To make light the default, change `'light'`/`'dark'` in the inline script in index.html.
- Portrait: pointer-following depth (max 2° X / 3° Y), parallax layers, light sweep and corner details run only with a mouse and when reduced-motion is off; touch screens get the static portrait.
- **Reduced motion:** the site follows the operating-system setting `prefers-reduced-motion` (Windows: Settings > Accessibility > Visual effects > Animation effects). When it is off, the site shows gentle fades instead of movement and the portrait tilt/parallax is disabled. The cinematic intro always plays in full and can be skipped.
- **Design V4:** editorial section layouts, ledger-style experience timeline, numbered case studies with a project index (wide screens), framed certificates, outlined section numerals. Everything uses the theme tokens, so both themes stay consistent. The mouse cursor is the browser default everywhere.
- **V3 design layer:** italic serif accent words in headings (Instrument Serif, falls back to Georgia italic), per-section lighting, hero highlights, intro artwork (drawn rings, BK outline echo, arch portrait, seam light), case-study captions, arch/offset image masks and a gallery-aware lightbox (captions, 01 / 04 counter, previous/next, arrow keys, Esc).
- Replace images only at the documented paths (assets/projects/project-XX/project-XX-0N.jpg); placeholders swap automatically and the lightbox then navigates between a project's four photos.
- **V4:** a rebuilt six-scene cinematic intro (atmosphere, BK, name + identity, portrait + statement, curtain onto the hero), homepage entrance choreography, scroll parallax on decorative layers, drawn section dividers, staggered reveals, directional image wipes, certificate/award numerals. Cursor untouched.
- **V5 creative layer:** masked hero headline with scroll-driven background lettering; a scroll-progress spine (wide screens) that maps the whole page; a sliding navigation marker; scroll-scrubbed biography typography; animated SVG line drawings; different reveal directions per section; a gradient that travels across the buttons on hover; directional slides in the image gallery. Built with CSS + vanilla JavaScript (no GSAP / no libraries). Scrolling is never hijacked. The mouse cursor is untouched.

## V6 - cinematic layer and image guidance
- **Intro:** establishing shot (architectural lines draw in, two slow light beams, a few drifting particles), BK monogram, name, portrait, statement, curtain. About 9 s, always plays, Skip and Replay available.
- **Camera-style motion:** hero lighting drifts slowly (only while that section is on screen), the grid pushes in once, the portrait is revealed through a mask while the lens settles, and the case study in view is fully lit while its neighbours recede.
- **Back to top** has a ring that fills with reading progress; the footer name opens up as it arrives; section numbers count up.
- **HD imagery (important):** the supplied profile photograph is only 378 x 496 pixels, so it cannot look truly sharp on large or high-density screens. Replace `assets/profile/bittu-kumar.jpg` with the original (recommended at least 1200 x 1575 px). It is used at its native size, preloaded with high priority and never stretched.
- **Project / certificate / award photos:** below-the-fold images load only when you scroll near them (lazy loading) and decode off the main thread. Recommended export: 2000-2400 px wide, WebP or high-quality JPEG. If you export WebP/AVIF/PNG, change `imageExt` once in `config.js` (default `jpg`) and name the files accordingly.
- No video or fabricated imagery is used; cinematic motion is built from CSS, SVG and light layers.
