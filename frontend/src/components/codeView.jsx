import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";

const defaultFiles = {
  "/index.js": `import React from "react";\nimport { createRoot } from "react-dom/client";\nimport App from "./App";\nimport "./styles.css";\n\nconst root = createRoot(document.getElementById("root"));\nroot.render(<App />);`,
  "/App.js": `export default function App() {\n  return <h1 className="text-3xl font-bold underline text-purple-600">Hello Tailwind + React!</h1>;\n}`,
  "/index.html": `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>React + Tailwind</title>\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>`,
  "/tailwind.config.js": `module.exports = {\n  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};`,
  "/postcss.config.js": `module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};`,
  "/styles.css": `@tailwind base;\n@tailwind components;\n@tailwind utilities;`,
};

const CodeView = ({ files }) => {
  const [codeViewOpen, setCodeViewOpen] = useState(true);

  return (
    <div className="flex-1 bg-opacity-60 backdrop-blur-md rounded-xl p-0 flex flex-col shadow-lg h-full">
      <div className="px-4 py-3 border-b border-gray-800 flex items-center bg-[#0a0a0a]">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-semibold text-white ml-4">
          Generated Code
        </span>
        <div className="flex flex-1 justify-end items-center space-x-2 ml-auto">
          <button
            onClick={() => setCodeViewOpen(!codeViewOpen)}
            className="text-white px-3 py-1.5 rounded-md shadow-sm transition-all duration-300 ease-in-out bg-gradient-to-r from-purple-400 to-purple-700"
          >
            {codeViewOpen ? "View Output" : "View Code"}
          </button>
        </div>
      </div>

      <div className="flex-1 h-full custom-scrollbar bg-[#0a0a0a]">
        <SandpackProvider
          template="react"
          theme="dark"
          options={{
            externalResources: [
              "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
            ],
          }}
          customSetup={{
            dependencies: {
              react: "latest",
              "react-dom": "latest",
              tailwindcss: "latest",
              "@types/react": "latest",
              "@types/react-dom": "latest",
              "react-router-dom": "latest",
              axios: "latest",
              next: "latest", // optional, can remove if not used
              "@emotion/react": "latest",
              "@emotion/styled": "latest",
              "@mui/material": "latest",
              "@mui/icons-material": "latest",
            },
          }}
          files={Object.keys(files || {}).length ? files : defaultFiles}
        >
          <SandpackLayout style={{ height: "80vh" }}>
            {codeViewOpen ? (
              <>
                <SandpackFileExplorer style={{ height: "80vh" }} />
                <SandpackCodeEditor style={{ height: "80vh" }} />
              </>
            ) : (
              <SandpackPreview style={{ height: "80vh" }} showNavigator />
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
};

export default CodeView;
