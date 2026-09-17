const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Serve is runing");
});

server.listen(9000, () => {
  console.log("server is runing on port 9000");
});
