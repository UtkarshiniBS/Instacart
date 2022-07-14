const https = require("https");
const http = require("http");

//creating http server that will be called in frontend using axios
http
  .createServer((req, res) => {
    //checking the path to orders and run https reqest to instacart server
    if (req.url == "/orders") {
      https
        .get(
          {
            hostname: "https://www.instacart.com",
            path: "/v3/orders?page=1",
            headers: {
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive",
                "Referer": "https://www.instacart.com/store/account/orders",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
              "x-csrf-token":
                "OSznbdcMig+dwrxazLedlpXXvUZaWdSYSD1j3d44/vb851dUBRW0YfnILtrnloRWXD3cyu7IV3Epv7zZ01st6w==",
                "x-client-identifier": "web"

            },
          },
          (response) => {
            let data = "";
            response.on("data", (chunk) => {
              data += chunk;
            });
            response.on("end", () => {
              res.write(data);
              res.end();
            });
          }
        )
        .on("error", (err) => {
          res.write(err.message);
        });
    }
    //if path is not /orders showing error message
    else {
      res.write(`Server Not Found ${req.url}`);
      res.end();
    }
  })
  .listen(5000);

console.log("Starting server on port http://localhost:5000 .....");