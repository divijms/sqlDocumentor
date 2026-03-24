# 🚀 SQL AI Processor – VS Code Extension

An AI-powered Visual Studio Code extension that allows users to **select a directory of `.sql` files, process them using a custom prompt via Google Gemini AI, and save transformed outputs as `.txt` files**.

---

## ✨ Features

* 📁 Select **input directory** containing `.sql` files
* 📁 Select **output directory** for processed files
* 🔄 Automatically converts `.sql → .txt`
* 🤖 AI-powered transformation using **Google Gemini API**
* ✍️ Custom **user-defined prompt input**
* 💾 Saves processed output as `*_processed.txt`
* ⚡ Lightweight and easy to use

---

## 🧠 Use Cases

* Convert SQL queries into **human-readable explanations**
* Optimize and refactor SQL queries
* Extract metadata (tables, columns, joins)
* Generate documentation from SQL scripts
* Build AI-assisted data engineering workflows

---

## 🏗️ Project Structure

```
sqlConverter/
├── src/
│   └── extension.ts       # Core extension logic
├── out/                   # Compiled JS output
├── package.json           # Extension configuration
├── tsconfig.json
├── .env                   # API key (not committed)
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```
git clone https://github.com/your-username/sql-ai-processor.git
cd sql-ai-processor
```

---

### 2. Install Dependencies

```
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```
GEMINI_API_KEY=your_api_key_here
```

---

### 4. Get Gemini API Key (Free)

1. Visit: https://aistudio.google.com/app/apikey
2. Click **Create API Key**
3. Copy and paste into `.env`

---

### 5. Run Extension

```
npm run compile
```

Press:

```
F5
```

This launches the **Extension Development Host**

---

## ▶️ Usage

1. Open Command Palette:

   ```
   Ctrl + Shift + P
   ```

2. Run:

   ```
   Process Input Directory
   ```

3. Steps:

   * Select input folder containing `.sql` files
   * Select output folder
   * Enter your AI prompt

4. Output:

   ```
   file1_processed.txt
   file2_processed.txt
   ```

---

## 💡 Example Prompts

* `Explain this SQL in simple terms`
* `Optimize this SQL query`
* `Convert SQL into step-by-step logic`
* `Extract tables and columns used`

---

## 🛠️ Tech Stack

* **TypeScript**
* **VS Code Extension API**
* **Node.js (fs, path)**
* **Google Gemini API (@google/generative-ai)**
* **dotenv (for secure API handling)**

---

## 🔐 Security

* API keys are stored in `.env`
* `.env` is excluded via `.gitignore`
* No sensitive data is committed

---

## ⚠️ Limitations (Current Version)

* No recursive folder processing
* No progress bar UI
* No error handling per file
* Sequential processing (not parallelized)

---

## 🚀 Future Enhancements

* 🔄 Recursive directory traversal
* 📊 Progress bar UI
* ⚡ Parallel processing
* ⚙️ VS Code settings-based API key
* 🖥️ Webview UI (interactive panel)
* 📂 File preview before processing
* 🔍 Advanced filtering (`*.ddl`, `*.dml`)

---
