
# KnowAbi 📚

> *KnowAbi* is an AI-powered flashcard generation tool designed for students. It lets users create, view, and manage flashcards, while integrating with Google's Gemini API to generate question-answer pairs from any topic.

---



## 📙 Table of Contents

* [1. Overview](#1-overview)  
* [2. Key Features](#2-key-features)  
* [3. Tech Stack](#3-tech-stack)  
* [4. Local Development](#4-local-development)  
* [5. Folder Structure](#5-folder-structure)  
* [6. Scripts](#6-scripts)  
* [7. Environment Variables](#7-environment-variables)  
* [8. Contributing](#8-contributing)  
* [9. License](#9-license)  

---

## 1. Overview

KnowAbi is a lightweight React + Vite front-end application that helps students create and review flashcards. Users can manually create flashcards or let Gemini AI generate them automatically based on a chosen topic. It's perfect for quick revision, spaced repetition, and interactive learning.

---

## 2. Key Features

* 🧠 *AI-Generated Flashcards* — powered by Google Gemini API  
* ✍️ *Custom Card Creation* — manually create and manage your own cards  
* 🎛 *Interactive UI* — clean card flip interface with control buttons  
* ⚡ *Fast Dev Experience* — built on Vite + React + TypeScript  
* 💾 *Local Save Support* — persistent card state during sessions  

---

## 3. Tech Stack

| Layer            | Technology                         |
| ---------------- | ---------------------------------- |
| *Frontend*       | React ★ Vite ★ TypeScript          |
| *Styling*        | Tailwind CSS                       |
| *AI Integration* | Google Gemini API                  |
| *State Mgmt*     | React Hooks                        |
| *Linting*        | ESLint                             |
| *Bundler*        | Vite                               |

---

## 4. Local Development

### 4.1 Requirements

* Node.js v18+  
* npm or Yarn  

### 4.2 Setup & Run

```bash
# 1. Clone the repo
git clone https://github.com/odanyi/KnowAbi.git
cd KnowAbi

# 2. Install dependencies
npm install
# or
yarn install

# 3. Create your .env file and add your Gemini API key:
echo "VITE_GEMINI_API_KEY=your-gemini-api-key" > .env

# 4. Start development server
npm run dev
# or
yarn dev

# 5. Visit the app at
http://localhost:5173
```

---

## 5. Folder Structure

```
KnowAbi/
├── public/
│   └── assets/                # Logo and images
├── src/
│   ├── components/            # Flashcard, Form, Controls, List
│   ├── hooks/                 # useFlashcards custom hook
│   ├── services/              # aiService (Gemini API integration)
│   ├── types/                 # TypeScript types
│   ├── utils/                 # fileUtils for local file handling
│   ├── App.tsx                # Main UI wrapper
│   ├── main.tsx               # React entry point
│   └── index.css              # Global styles (Tailwind)
├── index.html                 # Vite HTML template
├── .env                       # Environment variables
├── package.json               # Project metadata & scripts
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build config
├── tailwind.config.js         # Tailwind CSS setup
├── postcss.config.js          # PostCSS setup
└── .bolt/                     # Bolt CLI configuration
```

---

## 6. Scripts

Available commands via `npm run` or `yarn`:

* `dev` — start development server
* `build` — build production files
* `preview` — preview production locally
* `lint` — run ESLint on project files

---

## 7. Environment Variables

Create a `.env` file in your project root:

```
VITE_GEMINI_API_KEY=your-gemini-api-key
```

This key is used in `src/services/aiService.ts` to connect with Google's Gemini API.

---

## 8. Contributing

Contributions are welcome! To get started:

```bash
# 1. Fork and clone the repo
git checkout -b feature/your-feature-name

# 2. Make your changes and commit
git commit -m "feat: added cool feature"

# 3. Push to your fork and open a pull request
```

---

## 9. License

This project is licensed under the MIT License.
