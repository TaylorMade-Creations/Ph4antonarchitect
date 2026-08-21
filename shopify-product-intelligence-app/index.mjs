import http from "node:http";
import next from "next";

const port = Number.parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

await app.prepare();

http
  .createServer((request, response) => {
    handle(request, response);
  })
  .listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
