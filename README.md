# Receipt Scanner

A Progressive Web App for scanning receipts and QR codes using OCR.  
Works on mobile (Android / iOS Safari) and desktop browsers.

## Tech Stack

| Layer | Library / API |
|---|---|
| Camera | `navigator.mediaDevices.getUserMedia` |
| OCR | `Tesseract.js v5` |
| Barcode / QR | `BarcodeDetector`  |
| Storage | `IndexedDB` (ScannerDB → objectStore: scans) |
| Offline | Service Worker (`sw.js`) with cache-first strategy |

---

## Files

```
receipt-scanner-pwa/
├── index.html      Main app (single file, no build step)
├── sw.js           Service Worker — offline caching
├── manifest.json   PWA manifest (icons, theme, display mode)
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

## Config Parameters

Edit the `CFG` object near the top of `index.html`:

```js
const CFG = {
  lang: 'eng+rus',  // Tesseract language pack(s)
                    // Examples: 'eng', 'eng+deu', 'chi_sim', 'fra', 'jpn'
                    // Full list: https://tesseract-ocr.github.io/tessdoc/Data-Files

  psm:  '6',        // Tesseract Page Segmentation Mode
                    //  3 = fully automatic (default)
                    //  6 = single uniform block of text 
                    // 11 = sparse text (scattered words)

  facingMode: 'environment'  // rear camera
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
| BarcodeDetector | ✅ | ❌ | ❌  | ✅ |
| PWA install | ✅ | partial | partial | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |

---
## 使用截图
### 在终端输入：python -m http.server 8e8e
<img width="759" height="66" alt="356c63932b7476cf3167dff7c5342bab" src="https://github.com/user-attachments/assets/70393707-54cf-438d-a307-c63fed78c0a3" />
### 进入Receipt Scanner主页面：
<img width="2556" height="1470" alt="877469aecbe49069a8357e788c84454e" src="https://github.com/user-attachments/assets/7f4678e7-5d29-40e5-acde-077ddebb87ff" />
### 可以从桌面拖入图片进行文字识别：
<img width="1878" height="1341" alt="0587ba2283c7992498e6b01a573e96ca" src="https://github.com/user-attachments/assets/3811fecb-b0f8-4319-80c3-1b8cec112a97" />
### 得出结果：
<img width="2124" height="1364" alt="1c14e8be0f21e85868b618a76aebe2a5" src="https://github.com/user-attachments/assets/8e1deaee-ba34-4c2b-aceb-ca738bfa161c" />
#### 打开相机，进行拍照识别：
<img width="1689" height="1263" alt="b987887f2f8858f2749536cb22c546b7" src="https://github.com/user-attachments/assets/7775ad9a-e75d-43c0-8d9a-b879c900c729" />
### 识别二维码：
<img width="1656" height="1203" alt="a889b15be5bca66c0435c411697d91ff" src="https://github.com/user-attachments/assets/0d5ea47f-0a40-40d5-97ec-4c30a2bd59d2" />

