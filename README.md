<div align="center">

# 🤖 GeminiNotes Auto Enabler - Google Meet

### Auto-Enable Gemini Notes for Google Meet

![Status](https://img.shields.io/badge/status-active-22c55e?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-Google%20Meet-2563eb?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-0f172a?style=for-the-badge)

*Never lose your meeting notes again — GeminiAuto keeps Gemini Notes running throughout your Google Meet calls.*

</div>

---

## 📌 What Is GeminiAuto?

During a Google Meet call, **Gemini Notes** is a built-in AI feature that automatically transcribes and summarises your meeting. However, users often accidentally stop or dismiss it mid-call — and once stopped, it doesn't restart on its own.

**GeminiAuto** solves this. It's a browser extension that **monitors your Google Meet session and automatically re-enables Gemini Notes** whenever it detects that note-taking has been stopped. Think of it as a silent guardian for your meeting notes — ensuring you never walk away from a call with an incomplete record.

---

## ✨ Features

- **🔁 Auto Re-Enable** — Detects when Gemini Notes is stopped and automatically turns it back on
- **⚡ One-Click Toggle** — Instantly enable or disable the auto-restore behaviour from the popup
- **🟢 Live Status Indicator** — Always shows whether the automation is actively watching your Meet session
- **🔵 Active Badge** — Header badge confirms the extension is loaded and running
- **🪶 Lightweight** — Runs silently in the background with zero performance impact on your calls
- **📦 No Dependencies** — Pure HTML, CSS, and Vanilla JavaScript

---

## 🚀 Getting Started

### Installation (Load Unpacked)

1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/geminiauto.git
   ```

2. Open your browser Extensions page:
   - **Chrome:** `chrome://extensions`
   - **Edge:** `edge://extensions`

3. Enable **Developer Mode** (toggle in the top right)

4. Click **"Load unpacked"** and select the project folder

5. Join any **Google Meet** call — GeminiAuto will automatically keep Gemini Notes active

---

## 💡 Why This Exists

Google Meet's Gemini Notes is powerful — it captures action items, summaries, and transcripts. But it's easy to accidentally click "Stop" during a busy meeting, and there's no built-in way to auto-resume it. GeminiAuto fills that gap, making note-taking truly hands-free.

---

## 📁 Project Structure

```
geminiauto/
├── manifest.json       # Extension manifest (permissions, metadata)
├── popup.html          # Popup UI — toggle and status display
├── popup.js            # Automation logic — detects & re-enables Gemini Notes
└── README.md           # You are here
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (Custom Properties, Flexbox) |
| Scripting | Vanilla JavaScript |
| Platform | Chrome Extension API (Manifest V3) |
| Target App | Google Meet + Gemini Notes |

---

## 📄 License

This project is licensed under the **MIT License**. See [`LICENSE`](./LICENSE) for details.

---

<div align="center">
  <sub>GeminiAuto · Keep your meeting notes running · Always.</sub>
</div>
