import React, { StrictMode, useEffect } from "react";
import { css, style } from "@pandacss/dev";

const container = css({
  w: "1700px",
  h: "1700px",
  pos: "relative",
  display: "flex",
  flexWrap: "wrap",
  placeContent: "center",
  overflow: "hidden",
  "@media (max-width:1111px)": {
    zoom: 0.45,
  },
  selectors: {
    ".item": {
      pos: "absolute",
      inset: "calc(var(--d) * 10px)",
      animation: "girar 2s linear infinite alternate both",
      animationDelay: "calc(var(--d) * 0.1s)",
      zIndex: -1,
      "&:nth-child(even)": {
        bg: "var(--primary-color)",
        "&::before": {
          content: "''",
          pos: "absolute",
          top: "50%",
          left: 0,
          w: "100%",
          h: "50%",
          bg: "var(--secondary-color)",
          transform: "translateY(-50%)",
        },
        "&::after": {
          content: "''",
          pos: "absolute",
          top: 0,
          left: "50%",
          w: "50%",
          h: "100%",
          bg: "var(--secondary-color)",
          transform: "translateX(-50%)",
        },
      },
      "&:nth-child(odd)": {
        bg: "var(--secondary-color)",
        "&::before": {
          content: "''",
          pos: "absolute",
          top: "50%",
          left: 0,
          w: "100%",
          h: "50%",
          bg: "var(--primary-color)",
          transform: "translateY(-50%)",
        },
        "&::after": {
          content: "''",
          pos: "absolute",
          top: 0,
          left: "50%",
          w: "50%",
          h: "100%",
          bg: "var(--primary-color)",
          transform: "translateX(-50%)",
        },
      },
    },
  },
});

const globalStyles = `
  *,*::after,*::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue';
  }
  a {
    -webkit-tap-highlight-color: transparent;
  }
  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }
  :root {
    --primary-color: #fff;
    --secondary-color: #87f4b5;
  }
  body {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    place-content: center;
    overflow: hidden;
  }
  @keyframes girar {
    0% { transform: rotate(0deg);}
    100% { transform: rotate(360deg);}
  }
`;

function App() {
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = globalStyles;
    document.head.appendChild(styleTag);
  }, []);

  const items = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <article className={style(container)}>
      {items.map((d) => (
        <section key={d} className="item" style={{ "--d": d }} />
      ))}
    </article>
  );
}

function createRootAndRender() {
  if (!document.getElementById("root")) {
    const rootDiv = document.createElement("div");
    rootDiv.id = "root";
    document.body.appendChild(rootDiv);
  }
  const root = document.getElementById("root");
  import("react-dom/client").then(({ createRoot }) => {
    const rootApp = createRoot(root);
    rootApp.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  });
}

createRootAndRender();

export default App;
