import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
export { App };
export { mergeRealProjects } from "./realProjects";
export { initialContent, validateContent, safeUrl } from "./studio";
export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
