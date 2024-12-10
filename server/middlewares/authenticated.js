const jwt = require("../utils/jwt");

 async function asureAuth(req, res, next) {
  // console.log(req.headers.authorization);

   if (!req.headers.authorization) {
    res.status(403).send({ msg: "la peticion no tiene la cabecera" });
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const payload = jwt.decode(token);
    const { exp } = payload;
    const currentData = new Date().getTime();

    if (exp <= currentData) {
      return res.status(400).send({ msg: "el token ha expirado" });
    }
    req.user = payload;
    //console.log(payload);
    next();
  } catch (e) {
    res.status(403).send({ msg: "Token invalido" });
  
  }
}
module.exports = {
  asureAuth,
};
