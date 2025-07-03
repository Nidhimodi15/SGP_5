import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

async function generateSummaryAndName(userPrompt) {
  const systemPrompt = `
  RULES:
- Do not add explanations.
- Only output valid JSON.
- and only return JSON output and no need to add any text,symbol,special character nothing only json output
- Do NOT wrap the output in triple backticks or markdown. Return only raw JSON. 

You're an expert web UI/UX designer and naming strategist.

A user will give you a prompt describing the website they want.

You must reply in a clean JSON format like this:
{
  "summary": "...",  // a confident, 3–5 sentence summary of what the AI will build
  "title": "...",    // a short, human-readable project title (max 5 words, no special chars)
  "slug": "..."      // slugified version of the title: lowercase, dash-separated, no spaces
}

RULES:
- Do not add explanations.
- Only output valid JSON.
- and only return JSON output and no need to add any text,symbol,special character nothing only json output
- Do NOT wrap the output in triple backticks or markdown. Return only raw JSON. 
`;

  const prompt = `${systemPrompt}\n\nUser Prompt: "${userPrompt}"`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error("Failed to parse Gemini JSON response:", text);
    throw new Error("Invalid Gemini response");
  }
}

async function generatePromptForCode(summary) {

  const systemPrompt = `

  RULES:
- Only output valid JSON.
- and only return JSON output and no need to add any text,symbol,special character nothing only json output
- Do NOT wrap the output in triple backticks or markdown. Return only raw JSON.
- Only output simple text and dont include special character and emojie
- dont use *,# and dont make font bold
- strictly dont use *,#
Do not use triple backticks
Do not use special characters or emojis
Do not use asterisks or hash symbols
Only return clean JSON that can be parsed directly

  You are a senior UI/UX design architect preparing a detailed and production-ready design specification for a modern React and Tailwind CSS website.

You will receive a functional description of a feature or section that needs to be built. Your task is to transform that description into a clear and structured UI/UX design blueprint that can guide frontend developers or AI code generators.

Here is the input feature description:
"${summary}"

Your output should be a comprehensive UI/UX design brief covering the following sections:

1. Layout Structure  
- Define the overall layout (grid, flex, or stacked) for both desktop and mobile.  
- Describe alignment, spacing, and how elements should be positioned.  
- Mention responsive behavior and any fixed or sticky positioning if required.

2. Color System and Visual Hierarchy  
- Define the primary, secondary, and accent colors.  
- Specify hex values or Tailwind color utility classes (e.g., bg-gray-50, text-blue-700).  
- Describe how colors will be used to emphasize important content or actions.

3. Typography System  
- Define the fonts, sizes, weights, and line heights to be used.  
- Include styles for headings, subheadings, body text, and captions.  
- Use Tailwind-compatible typography classes in your explanation.

4. Component Structure  
- List all individual components involved (e.g., buttons, cards, forms, icons).  
- Describe the internal structure of each component.  
- Indicate how components should be reused or composed.

5. Interactions and Animations  
- Explain hover effects, active states, and animations.  
- Use Tailwind utility classes or recommend Framer Motion animation patterns.  
- Describe smooth transitions and interaction behavior.

6. Responsiveness and Mobile Behavior  
- Explain how the section should adapt to different screen sizes.  
- Include stacking behavior, collapsible layouts, and visibility toggles.  
- Provide class suggestions like md:flex, sm:hidden, etc.

7. Spacing and Alignment  
- Define margin and padding standards between elements.  
- Mention use of utilities like space-y, px, py, gap, justify-center, etc.  
- Ensure spacing maintains clean visual rhythm and alignment.

8. Accessibility Considerations  
- Recommend ARIA attributes or roles where needed.  
- Describe how keyboard navigation and screen readers should be supported.  
- Ensure text contrast is sufficient for readability.

9. Optional Enhancements  
- Mention optional features like dark mode compatibility.  
- Suggest advanced UI elements if applicable, like toggle switches, tooltips, or modals.  
- If relevant, explain icon usage, illustrations, or background visuals.

Final Output Format:  
Structure your response using clear section headers as listed above. Avoid writing implementation code. Focus on describing the visual and interactive behavior in detail so that it can be handed off to a frontend team or AI-based code generation system.

You must reply in a clean JSON format like this:
{
  "prompt":".....the whole generated prompt"
} 
RULES:
- Only output valid JSON.
- and only return JSON output and no need to add any text,symbol,special character nothing only json output
- Do NOT wrap the output in triple backticks or markdown. Return only raw JSON.
- Only output simple text and dont include special character and emojie
- dont use *,# and dont make font bold
- strictly dont use *,#
Do not use triple backticks
Do not use special characters or emojis
Do not use asterisks or hash symbols
Only return clean JSON that can be parsed directly`

  const result = await model.generateContent(systemPrompt);
  const text = result.response.text();
  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error("Failed to parse Gemini JSON response:", text);
    throw new Error("Invalid Gemini response");
  }
}

async function generateCodeFIles(aiMessage2) {


  const systemPrompt = `
 You are a senior frontend developer specializing in React and Tailwind CSS.

Your task is to generate a complete, functional, and visually polished React frontend using Tailwind CSS based on the following design specification:

"${aiMessage2}"

Requirements:

Build responsive, accessible, and modern UIs with exceptional user experience.

Use React functional components with hooks as needed.

Use Tailwind CSS utility classes extensively for layout, spacing, typography, responsiveness, and transitions.

Follow mobile-first, accessibility-first, and performance-first best practices.

Prioritize a clean, futuristic design with subtle gradients, glassmorphism, soft shadows, and elegant animations.

Use Framer Motion for interactive transitions and animations.

Use Heroicons or Lucide icons for clarity and consistency.

Ensure the project runs in CodeSandbox without modification.

Use the .jsx extension for all component files.

Structure:

Include an index.js and App.jsx.

Organize all reusable UI elements in src/components.

Include a minimal tailwind.config.js and postcss.config.js (only if needed for customizations).

Ensure every file is self-contained, individually importable, and default-exported.

Output Format:

Only return a valid JSON object, structured as follows:

{
"files": [
{
"filename": "App.jsx",
"path": "src/App.jsx",
"content": "import React from 'react'; ... export default App;"
},
{
"filename": "Navbar.jsx",
"path": "src/components/Navbar.jsx",
"content": "..."
}
...
],
"dependencies": {
"react": "^18.2.0",
"react-dom": "^18.2.0",
"tailwindcss": "^3.4.1",
"autoprefixer": "^10.4.15",
"postcss": "^8.4.21",
"framer-motion": "^10.16.4",
"lucide-react": "^0.263.0"
// Add more if needed
}
}

Rules:

Do not add explanations or comments.

Only output valid JSON.

Do not include markdown formatting.

Do not add any special characters or extra text.

Only return the raw JSON object as described above.


  `
  const result = await model.generateContent(systemPrompt);
  const text = result.response.text();

  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error("Failed to parse Gemini JSON response:", text);
    throw new Error("Invalid Gemini response");
  }
}


export {generateSummaryAndName,generatePromptForCode,generateCodeFIles}