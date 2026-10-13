# ⚡ SyntaxSprint

> A developer-focused typing platform designed to build muscle memory for actual code syntax, symbols, and language structural patterns rather than plain English prose.

---

## ⚡ Overview

Standard typing tests focus on prose, which fails to prepare developers for the ergonomic demands of programming. **SyntaxSprint** challenges software engineers with real-world code snippets across **TypeScript, SQL, HTML, CSS, and Python**. 

Built as an offline-first **Progressive Web App (PWA)**, SyntaxSprint measures standard WPM alongside developer-specific analytics, such as accuracy heatmaps for special symbols (`{ }`, `[ ]`, `=>`, `;< >`), syntax error velocity, and language proficiency over time.

---

## 🚀 Tech Stack

### **Frontend**
* **Framework:** React 18 (Vite)
* **Language:** TypeScript
* **Styling:** Vanilla CSS (Modern CSS Variables, Flexbox, Grid)
* **PWA / Offline Storage:** Workbox Service Worker & Dexie.js (IndexedDB)

### **Backend**
* **Runtime:** Node.js
* **Framework:** Express.js (REST API)
* **Language:** TypeScript

### **Database & Analytics**
* **Engine:** PostgreSQL
* **Features:** Relational schema, automated migration runner, analytical SQL views for global leaderboards

---

## Key Modules

| Module | Route | Description |
| :--- | :--- | :--- |
| **Test Arena** | `/` | Core typing engine featuring real-time token parsing, virtual caret tracking, WPM/Accuracy metric calculation, and live key miss capturing. |
| **Analytics & Heatmap** | `/analytics` | Visual breakdown highlighting error frequency on special code characters, historical speed graphs, and accuracy by language. |
| **Snippet Vault** | `/snippets` | Searchable index allowing developers to filter code snippets by language or difficulty and submit custom snippets. |
| **Leaderboards** | `/leaderboard` | Global rankings filtering top performers per language powered by PostgreSQL database views. |

---

## 🛠️ Database Schema Baseline