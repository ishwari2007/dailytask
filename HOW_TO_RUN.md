# How to Run BookMyShow Website

## Method 1: Open Directly in Browser (Quickest)

1. **Navigate to your project folder:**
   ```
   D:\Bookmyshow
   ```

2. **Open `index.html` in your web browser:**
   - Double-click `index.html` 
   - OR right-click → "Open with" → Choose your browser (Chrome, Firefox, Edge, etc.)

3. **Then navigate to the Movies page:**
   - Click "START" button
   - Click "Movies" in the navigation menu
   - OR directly open `movies.html` in your browser

## Method 2: Using a Local Web Server (Recommended)

If you encounter issues with JavaScript not loading or CORS errors, use a local server:

### Option A: Using Python (if installed)

1. **Open PowerShell or Command Prompt** in the project folder (`D:\Bookmyshow`)

2. **Run one of these commands:**

   For Python 3:
   ```bash
   python -m http.server 8000
   ```

   For Python 2:
   ```bash
   python -m SimpleHTTPServer 8000
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:8000/index.html
   ```

### Option B: Using Node.js (if installed)

1. **Install http-server globally** (one time only):
   ```bash
   npm install -g http-server
   ```

2. **Navigate to project folder:**
   ```bash
   cd D:\Bookmyshow
   ```

3. **Start the server:**
   ```bash
   http-server
   ```

4. **Open your browser** and go to the URL shown (usually `http://localhost:8080`)

### Option C: Using VS Code Live Server Extension

1. **Install "Live Server" extension** in VS Code
2. **Right-click on `index.html`** → Select "Open with Live Server"
3. The page will automatically open in your browser

### Option D: Using PHP (if installed)

1. **Navigate to project folder** in terminal
2. **Run:**
   ```bash
   php -S localhost:8000
   ```
3. **Open:** `http://localhost:8000/index.html`

## Quick Start Guide

1. **Start from the homepage:**
   - Open `index.html` → Click "START"
   - OR directly open `main.html`

2. **View all movies:**
   - Click "Movies" in the navigation menu
   - OR directly open `movies.html`

3. **Features available on Movies page:**
   - ✨ Search movies by typing in the search bar
   - 🔍 Filter by Language, Genre, or Format
   - 📊 Sort movies using the dropdown
   - 🎬 Click any movie card to view details

## Troubleshooting

### JavaScript not working?
- Use **Method 2** (local server) instead of opening files directly
- Check browser console (F12) for any errors

### Images not showing?
- Make sure all image files are in the correct folders
- Check file paths are correct (case-sensitive)

### Styles not loading?
- Ensure `movies.css` is in the same folder as `movies.html`
- Check browser console for any 404 errors

## File Structure

```
D:\Bookmyshow\
├── index.html          (Home page)
├── main.html           (Main landing page)
├── movies.html         (Movies listing page) ⭐
├── movies.js           (JavaScript functionality)
├── movies-data.js      (Movie database)
├── movies.css          (Styles)
├── cast/               (Images folder)
└── ... (other files)
```

## Recommended Browser

- **Google Chrome** (recommended)
- **Mozilla Firefox**
- **Microsoft Edge**
- **Safari** (Mac)

---

**Note:** For the best experience, use Method 2 (local web server) as it ensures all JavaScript and CSS files load correctly without CORS issues.


