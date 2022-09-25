module.exports = {
  jwtConfig: {
    secret: "shhhhhhared-secret",
    audience: "apitester",
    issuer: "issuer",
    algorithms: ["HS256"],
    expiresIn:'2h'
  },
  mysqlConfig: {
    host: "localhost",
    user: "root",
    password: "password",
    database: "roster",
  }
};
