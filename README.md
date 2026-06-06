# Receipt Scanner PWA

A Progressive Web App for scanning receipts and QR codes using OCR.  
Works on mobile (Android / iOS Safari) and desktop browsers.

## Tech Stack

| Layer | Library / API |
|---|---|
| Camera | `navigator.mediaDevices.getUserMedia` |
| OCR | `Tesseract.js v5` |
| Barcode / QR | `BarcodeDetector` (native) + `jsQR` (fallback) |
| Storage | `IndexedDB` (ScannerDB → objectStore: scans) |
| Offline | Service Worker (`sw.js`) with cache-first strategy |

---

## Files

```
receipt-scanner-pwa/
├── index.html      Main app (single file, no build step)
├── sw.js           Service Worker — offline caching
├── manifest.json   PWA manifest (icons, theme, display mode)
├── icon-192.png    PWA icon 192×192
├── icon-512.png    PWA icon 512×512
└── README.md       This file
```

---

## Quick Start

### Serve locally (camera requires HTTPS or localhost)

```bash
# Python 3
python3 -m http.server 8080
# open http://localhost:8080

# Node.js
npx serve .
# open http://localhost:3000
```

### HTTPS for mobile testing (phone and PC on same Wi-Fi)

```bash
# 1. Find your PC's local IP (e.g. 192.168.1.5)
#    Mac/Linux: ifconfig | grep "inet "
#    Windows:   ipconfig  →  IPv4 Address

# 2. Generate a trusted cert for that IP
mkcert -install
mkcert 192.168.1.5

# 3. Serve with HTTPS
npx serve . --ssl-cert 192.168.1.5.pem --ssl-key 192.168.1.5-key.pem

# 4. Open on phone: https://192.168.1.5:3000
```

---

## Config Parameters

Edit the `CFG` object near the top of `index.html`:

```js
const CFG = {
  lang: 'eng+rus',  // Tesseract language pack(s)
                    // Examples: 'eng', 'eng+deu', 'chi_sim', 'fra', 'jpn'
                    // Full list: https://tesseract-ocr.github.io/tessdoc/Data-Files

  psm:  '6',        // Tesseract Page Segmentation Mode
                    //  3 = fully automatic (default)
                    //  6 = single uniform block of text  ← good for receipts
                    // 11 = sparse text (scattered words)

  facingMode: 'environment'  // rear camera (only option — flip removed)
};
```

### Language pack examples

| Value | Languages |
|---|---|
| `'eng'` | English only |
| `'eng+rus'` | English + Russian |
| `'eng+deu+fra'` | English + German + French |
| `'chi_sim'` | Simplified Chinese |
| `'jpn'` | Japanese |

> Tesseract downloads language data on first use (~6 MB per language from CDN).

---

## PWA Installation

| Platform | How |
|---|---|
| Android Chrome | Tap **⋮ → Add to Home Screen** |
| iOS Safari | Tap **Share → Add to Home Screen** |
| Desktop Chrome/Edge | Click the install icon in the address bar |

---

## IndexedDB Schema

```
Database : ScannerDB  (version 1)
Store    : scans
  id      — auto-increment integer (primary key)
  text    — string, full extracted text
  date    — ISO 8601 string
  hasQR   — boolean
```

---

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Samsung Internet |
|---|---|---|---|---|
| Camera | ✅ | ✅ | ✅ | ✅ |
| OCR (Tesseract.js) | ✅ | ✅ | ✅ | ✅ |
| BarcodeDetector | ✅ | ❌ (jsQR fallback) | ❌ (jsQR fallback) | ✅ |
| PWA install | ✅ | partial | partial | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |

---

## Notes

- Camera requires **HTTPS** or **localhost** (browser security restriction).
- All data is stored **locally** — nothing is sent to any server.
- To reset all scans: click **Clear All** in the history panel, or open DevTools → Application → IndexedDB → ScannerDB → scans → Clear.