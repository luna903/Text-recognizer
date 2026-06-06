# Receipt Scanner

Приложение PWA для сканирования чеков и QR-кодов с помощью технологии OCR.
Работает в мобильных браузерах (Android / iOS Safari) и на настольных ПК.

## Используемые технологии

| Уровень | Библиотека / API |
|---|---|
| Camera | `navigator.mediaDevices.getUserMedia` |
| OCR | `Tesseract.js v5` |
| Barcode / QR | `BarcodeDetector`  |
| Storage | `IndexedDB` (ScannerDB → objectStore: scans) |
| Offline | Service Worker (`sw.js`) with cache-first strategy |

---

## Структура файлов

```
receipt-scanner-pwa/
├── index.html      Основной файл приложения (однофайловая сборка без шагов компиляции)
├── sw.js           Service Worker — кэширование для офлайн-доступа
├── manifest.json   Манифест PWA (иконки, цветовая тема, режим отображения)
└── README.md       Данный файл документации
```

---

## Быстрый запуск

### Локальный запуск (для работы камеры требуется HTTPS или localhost)

```bash
# Python 3
python3 -m http.server 8080
# open http://localhost:8080

# Node.js
npx serve .
# open http://localhost:3000
```

## Параметры конфигурации

Измените объект CFG в верхней части файла index.html:

```js
const CFG = {
  lang: 'eng+rus',  // Языковые пакеты Tesseract
                    // Примеры: 'eng', 'eng+deu', 'chi_sim', 'fra', 'jpn'
                    // Полный список: https://tesseract-ocr.github.io/tessdoc/Data-Files

  psm:  '6',        // Режим сегментации страницы Tesseract
                    //  3 = полностью автоматический режим (по умолчанию)
                    //  6 = единый цельный блок текста 
                    // 11 = разрозненный текст (отдельные слова)

  facingMode: 'environment'  // Использование задней камеры устройства
};
```

### Примеры наборов языковых пакетов

| Value | Languages |
|---|---|
| `'eng'` | English |
| `'eng+rus'` | English + Russian |
| `'eng+deu+fra'` | English + German + French |
| `'chi_sim'` | Simplified Chinese |
| `'jpn'` | Japanese |

---

## Схема базы данных IndexedDB
```
База данных : ScannerDB  (версия 1)
Хранилище    : scans
  id      — автоинкрементное целое число (первичный ключ)
  text    — строка, полный распознанный текст документа
  date    — дата в формате строки ISO 8601
  hasQR   — булево значение (наличие QR-кода в документе)
```

---

## Совместимость с браузерами

| Feature | Chrome | Firefox | Safari | Samsung Internet |
|---|---|---|---|---|
| Camera | ✅ | ✅ | ✅ | ✅ |
| OCR (Tesseract.js) | ✅ | ✅ | ✅ | ✅ |
| BarcodeDetector | ✅ | ❌ | ❌  | ✅ |
| PWA install | ✅ | partial | partial | ✅ |
| Service Worker | ✅ | ✅ | ✅ | ✅ |

---
## Скриншоты использования

### В терминале введите: python -m http.server 8e8e
<img width="759" height="66" alt="356c63932b7476cf3167dff7c5342bab" src="https://github.com/user-attachments/assets/70393707-54cf-438d-a307-c63fed78c0a3" />

### Переход на главную страницу Receipt Scanner：

<img width="2556" height="1470" alt="877469aecbe49069a8357e788c84454e" src="https://github.com/user-attachments/assets/7f4678e7-5d29-40e5-acde-077ddebb87ff" />

### Можно перетащить изображение с рабочего стола для распознавания текста：

<img width="1878" height="1341" alt="0587ba2283c7992498e6b01a573e96ca" src="https://github.com/user-attachments/assets/3811fecb-b0f8-4319-80c3-1b8cec112a97" />

### Получение результата：

<img width="2124" height="1364" alt="1c14e8be0f21e85868b618a76aebe2a5" src="https://github.com/user-attachments/assets/8e1deaee-ba34-4c2b-aceb-ca738bfa161c" />

#### Открытие камеры для съёмки и распознавания：

<img width="1689" height="1263" alt="b987887f2f8858f2749536cb22c546b7" src="https://github.com/user-attachments/assets/7775ad9a-e75d-43c0-8d9a-b879c900c729" />

### Распознавание QR-кода：

<img width="1656" height="1203" alt="a889b15be5bca66c0435c411697d91ff" src="https://github.com/user-attachments/assets/0d5ea47f-0a40-40d5-97ec-4c30a2bd59d2" />
---
