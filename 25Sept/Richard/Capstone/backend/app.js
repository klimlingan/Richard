const express = require("express");
const { jwtConfig } = require("./config");

const app = express();

const cors = require("cors");
app.use(cors());

const commonresult = require("./middleware/returnvalue");
app.use(commonresult.commonresult);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var { expressjwt: jwt } = require("express-jwt");

app.use(
  jwt({
    secret: jwtConfig.secret,
    algorithms: jwtConfig.algorithms,
  }).unless({ path: [/^\/token/, /^\/api/] })
);

const routertoken = require("./router/routertoken");
app.use("/token", routertoken);

const routerregister = require("./router/routerregister");
app.use("/api", routerregister);

const routershift = require("./router/routershift");
app.use("/shift", routershift);

const erorhandle = require("./middleware/errorhandling");
app.use(erorhandle.errorhandling);

app.listen(9000, () => {
  console.log("connection succssful");
});
