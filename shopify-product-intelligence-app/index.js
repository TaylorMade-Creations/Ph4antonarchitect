const http = require("http");
const next = require("next");

const port = Number.parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  http
    .createServer((request, response) => {
      handle(request, response);
    })
    .listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
});
