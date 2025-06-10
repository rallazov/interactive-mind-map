# Interactive Mind Map – SDET Experience Visualizer

This is a lightweight, fully client-side interactive mind map that visualizes your technical skills and tools used across different companies. Designed for personal portfolios and resumes, this component allows users to explore which tools were used at which companies via hover-based filtering.

---

## 💡 Features

- 🎯 Role-centric visualization (e.g., SDET, Developer)
- 🛠 Tool nodes dynamically loaded from `config.json`
- 🏢 Hover over a company to highlight tools used there
- 📁 Simple HTML/CSS/JS — no external libraries required
- 🧠 Easy to extend, style, and embed in personal sites

---

## 📂 Project Structure

├── index.html # Main HTML page
├── style.css # All styles for layout and highlighting
├── script.js # Dynamic rendering and interactivity logic
├── config.json # Structured tool data, editable for reuse
└── README.md

🧩 Configuration
All tools and their mapping to companies are defined in config.json:

json
Copy
Edit
{
  "role": "SDET",
  "nodes": [
    {
      "name": "Selenium",
      "color": "#90caf9",
      "usedAt": ["Cigna", "Goldman Sachs"]
    }
  ]
}
Special Values
"All" = Used at all companies

"Personal Projects" = Used independently

🛠 Customization Ideas
Change role from "SDET" to "Developer" or others

Add click-to-filter behavior

Convert layout to SVG or D3.js for more advanced visuals

Group tools by category (e.g., Testing, DevOps, Infra)

📄 License
MIT License — use, modify, and share freely.

🙋‍♂️ Author
Ramin Allazov
https://www.linkedin.com/in/ramin-allazov/
