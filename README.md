# kycsavingscalc
This `README.md` is written from the perspective of a **Developer Marketer**. It is designed to be placed in your GitHub/GitLab repository to explain both the **technical setup** and the **business value** of the tool to anyone on your team who might manage it.

***

# 🚀 Avelin.ai Strategic ROI & Business Case Engine

### *Turning Compliance Complexity into Quantifiable Value*

The **Avelin.ai ROI Engine** is a high-fidelity, client-facing interactive tool designed to move prospects from "evaluating features" to "approving a business case." Built with **React** and **Tailwind CSS**, it utilizes industry-standard benchmarks to quantify the hard and soft savings of the Avelin.ai platform.

---

## 💎 Value Proposition

*   **Evidence-Based Credibility:** Every calculation is mapped to primary research from **Thomson Reuters, PwC, IBM, and Wolters Kluwer**.
*   **Three-Pillar Savings Logic:**
    1.  **Direct Labour:** Recapturing manual hours spent on spreadsheets.
    2.  **Risk Mitigation:** Quantifying the avoidance of the $15M average non-compliance penalty.
    3.  **Communication Noise:** Visualizing the 40-75% reduction in "email archaeology."
*   **Frictionless Conversion:** Includes a built-in lead capture form that generates a "Print-to-PDF" Executive Business Case addressed specifically to the prospect.

---

## 🛠 Tech Stack

*   **Framework:** [React.js](https://reactjs.org/) (Functional Components + Hooks)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Components:** Custom UI primitives inspired by Shadcn/UI (Slider, Tabs, Alerts, Cards).

---

## 📦 Installation & Setup

To run this calculator locally for development or customization:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/avelin-roi-calculator.git
    cd avelin-roi-calculator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```

4.  **Build for production:**
    ```bash
    npm run build
    ```

---

## 📊 Methodology & Sources

The calculator logic is transparent and verifiable. All calculations are located in the `useMemo` block within the main component. 

### Key Benchmarks:
*   **Labour Rate:** $60/hr (Blended US Financial Services rate).
*   **Manual Baseline:** 15.2 manual hrs/week per 8 FTEs ([Hyperproof 2023](https://hyperproof.io/2023-it-compliance-benchmark-report/)).
*   **Enforcement Risk:** $15M average penalty ([IBM/Fenergo 2024](https://resources.fenergo.com/reports/aml-enforcement-action-in-2024)).
*   **Regulatory Load:** 200+ daily global updates ([Thomson Reuters 2023](https://www.thomsonreuters.com/en-us/posts/investigation-fraud-and-risk/2023-cost-of-compliance-report/)).

---

## 🌐 Deployment (Private Sharing)

To share this with specific clients without making it public:

1.  **Vercel/Netlify:** Deploy the `build` folder. Use a custom, unguessable slug (e.g., `avelin.ai/calc/jpm-analysis-2026`).
2.  **Password Protection:** Enable "Deployment Protection" in your Vercel settings to gate the URL behind a password.
3.  **Analytics:** (Recommended) Add a simple Segment or GA4 tag to track when a prospect generates a "Business Case" PDF.

---

## 📝 Business Case Generation

The tool includes a hidden "Report" view that is optimized for **CSS Print Media**. 
*   **Margins:** Set to 0.5in for PDF export.
*   **Elements:** Branding, Confidentiality disclaimers, and personalized addressing are automatically injected from the lead capture form.
*   **Contact:** All reports direct inquiries to `b@avelin.ai`.

---

## ⚖️ License & Confidentiality

**Confidential | Internal Sales & Commercial Use Only**
This tool contains proprietary logic and messaging belonging to Avelin.ai. Distribution should be limited to active prospects and authorized partners.

© 2026 Avelin.ai. All rights reserved.
