# Brand asset sources

Assets are stored unchanged from these sources:

- Eitaa: https://eitaa.com/favicon.svg — official icon. Guidance: https://eitaa.com/page/badge/
- Rubika: https://rubika.ir/static/images/logo.svg — official wordmark from https://rubika.ir/
- Bale: https://bale.ai/logo/bale_logo.svg — official wordmark/icon from https://bale.ai/
- WhatsApp (whatsapp-mark.svg): https://cdn.jsdelivr.net/npm/simple-icons@16.34.0/icons/whatsapp.svg — unchanged vector mark from the pinned Simple Icons package, displayed as a theme-colored CSS mask.
- Docker: https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/docker.svg
- GitHub: https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg
- React, Python, TypeScript, PostgreSQL and Kubernetes: matching icon files in https://github.com/simple-icons/simple-icons/tree/develop/icons

Docker and GitHub icons come from Simple Icons and identify technologies in the background. Trademarks belong to their owners. The Rayban logo at public/raiban-logo.webp was supplied by the site owner.

The original files remain as source references. eitaa-mark.svg extracts the Eitaa glyph without its colored badge; bale-mark.svg extracts the Bale symbol without its wordmark. rubika-mark.svg extracts the official faceted hexagon and central cube from rubika.svg, using alpha shades to retain the facets. MessengerMark.tsx displays these glyphs as theme-colored CSS masks. These themed adaptations were requested by the site owner; they are not presented as official brand artwork.

## Expanded background technology catalogue

The following additional SVGs are stored unchanged from the pinned Simple Icons 16.34.0 package:
https://cdn.jsdelivr.net/npm/simple-icons@16.34.0/icons/<slug>.svg
Source project: https://github.com/simple-icons/simple-icons

- AI and data: pytorch, tensorflow, keras, onnx, scikitlearn, numpy, pandas, scipy, jupyter.
- Web: html5, css, tailwindcss, vite, javascript, nodedotjs, vuedotjs, fastapi, vercel.
- Linux and infrastructure: linux, ubuntu, debian, nginx, git, redis, apachekafka, ansible, grafana, prometheus.
- Network and security: wireshark, openssl, openvpn, kalilinux, cloudflare, cilium, owasp.

The backdrop uses monochrome CSS filters for consistency with the dark and light palettes. Its sequential catalogue displays each logo at most once per page; longer pages continue with abstract programming symbols.

The scene's public/rayban-logo.svg and src/assets/rayban-logo-shapes.json are generated from the unchanged owner-supplied public/raiban-logo.webp by scripts/trace-logo.py. Native-resolution tracing and interpolated, smoothed contours preserve the emblem while removing raster stair steps. The SVG is used for the scene's loading and error fallbacks; the live scene extrudes the matching contours as geometry.
