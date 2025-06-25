# 📦 URL Shortener with Click Analytics

This is a full-stack web application built with React, Node.js (Express), and MySQL that allows users to shorten URLs and track the number of clicks.

---

## 🚀 Tech Stack

* **Frontend**: React + TailwindCSS
* **Backend**: Node.js + Express
* **Database**: MySQL

---

## 🛠️ Getting Started

### ✅ Prerequisites

* Node.js installed
* MySQL installed and running
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

## ⚙️ Backend Setup

```bash
cd backend
npm init -y
npm install express cors dotenv mysql2 nanoid
```

### ✏️ Create `.env` file in `/backend`

```
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=url_shortener
BASE_URL=http://localhost:5001
```

### 🧱 MySQL Setup

1. Open terminal:

```bash
mysql -u root -p
```

2. Create database and table:

```sql
CREATE DATABASE url_shortener;
USE url_shortener;

CREATE TABLE urls (
  id INT AUTO_INCREMENT PRIMARY KEY,
  long_url TEXT NOT NULL,
  short_id VARCHAR(10) UNIQUE NOT NULL,
  click_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### ▶️ Run Backend

```bash
node src/server.js
```

Make sure it's listening on **[http://localhost:5001](http://localhost:5001)**

---

## 🎨 Frontend Setup

```bash
cd frontend
npm create vite@latest
# Choose React + JavaScript template
cd your-project-name
npm install
npm install axios tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 🧩 Tailwind Configuration

#### In `tailwind.config.js`:

```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
theme: {
  extend: {},
},
plugins: [],
```

#### In `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 🔌 Replace `App.jsx` with provided code

Replace the contents of `src/App.jsx` with the version in this repo.

### ▶️ Run Frontend

```bash
npm run dev
```

Visit: **[http://localhost:5173](http://localhost:5173)** (or whatever port Vite shows)

---

## ✅ Features

* Shorten long URLs with a unique ID
* Store and retrieve mappings in MySQL
* Auto-increment click counter on redirection
* Edit or delete existing mappings
* Stylish, responsive dark UI with TailwindCSS

---

## 📂 Project Structure

```
- backend/
  - src/server.js
  - .env
- frontend/
  - src/App.jsx
  - tailwind.config.js
  - index.css
```

---

## 🧪 Test Sample URLs

```txt
https://www.google.com
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://en.wikipedia.org/wiki/OpenAI
```

---

