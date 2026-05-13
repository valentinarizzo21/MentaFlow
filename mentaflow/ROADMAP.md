# MentaFlow - Professional Roadmap & Architecture

## 🚀 Architettura del Sistema

### Frontend: React (Vite)
- **State Management:** React Context + Hooks (per semplicità) o Redux Toolkit (per scalabilità).
- **Styling:** Tailwind CSS + Framer Motion (animazioni).
- **Charts:** Recharts / D3.js.
- **Form Handling:** React Hook Form + Zod validation.

### Backend: C# .NET 8 Web API
- **Pattern:** Clean Architecture (Domain, Application, Infrastructure, WebAPI).
- **ORM:** Entity Framework Core.
- **Autenticazione:** JWT Bearer Token con ASP.NET Core Identity.
- **Real-time:** SignalR per notifiche e sync live.

### Database: SQL Server
- Hosted su Azure SQL o Docker container.
- **Relazioni:** One-to-Many (User -> Subjects), One-to-Many (Subject -> Tasks).

---

## 🗺️ Roadmap di Sviluppo

### Fase 1: MVP & Core Features (Settimana 1-2)
- [ ] Setup ambiente (React + .NET API).
- [ ] Autenticazione (Login/Register).
- [ ] Modulo Gestione Materie (CRUD).
- [ ] Dashboard Base (Widget ore studiate).

### Fase 2: Produttività & Gamification (Settimana 3-4)
- [ ] Timer Pomodoro integrato.
- [ ] Smart Task List con priorità automatica.
- [ ] Sistema XP/Levels e Badges.
- [ ] Heatmap dei contributi (stile GitHub).

### Fase 3: Intelligenza Artificiale (Settimana 5-6)
- [ ] Integrazione Gemini API.
- [ ] Assistente per suggerimenti pause e piano studio.
- [ ] Generazione quiz automatica dagli appunti.
- [ ] Analisi predittiva dei progressi.

### Fase 4: Polishing & Mobile (Settimana 7-8)
- [ ] Tema Dark/Light dinamico.
- [ ] Notifiche Push (Browser & Mobile).
- [ ] Export PDF dei piani di studio.
- [ ] Testing E2E con Playwright.

---

## 🛠️ Librerie Consigliate
- **Animations:** `framer-motion` (Fluidità UI).
- **Date Handling:** `date-fns` (Manipolazione date esami).
- **Icons:** `lucide-react` (Minimal ed eleganti).
- **PDF Export:** `jspdf` o `react-pdf`.
- **AI Backend:** `Semantic Kernel` (SDK Microsoft per integrazione LLM in C#).
