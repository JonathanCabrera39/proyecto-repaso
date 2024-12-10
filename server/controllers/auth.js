const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("../utils/jwt");

async function register(req, res) {
  const { firstname, lastname, email, password } = req.body;

  if (!email) res.status(400).send({ msg: "email required for registration " });
  if (!password)
    res.status(400).send({ msg: "password required for registration " });

  const user = new User({
    firstname: firstname,
    lastname: lastname,
    email: email.toLowerCase(),
    password: password,
    active: true,
    role: "user",
  });

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);
  user.password = hashPassword;

  try {
    await user.save();
    res.status(200).send({ msg: "Success" });
  } catch (err) {
    res.status(500).send({ msg: `error al crear el usuario:${err} ` });
  }
}
async function login(req, res) {
// lo que llega del body
  const {email, password} = req.body;
// si el usario completo los campos ubligatorios
  if (!email) res.status(400).send({ msg: "email required for registration " });
  if (!password)
    res.status(400).send({ msg: "password required for registration " });
// verificando si el email exite 
// compara password que esta en BD con la password que incresa el usario
  try {
  const user = await User.findOne({email: email.toLowerCase()});     
  const check = await bcrypt.compare(password, user.password);
// checkiando el password y si el usario esta activo
  if (!check) {
    return res.status(400).send({ msg: "Contraseña incorrecta" });
  } else if (!user.active){
    res.status(401).send({ msg: "usario no autorizado o no activo" });  
  }  else {
    res.status(200).send({ access: jwt.createAccessToken(user)});
  }
  console.log(user)
  console.log("password" + password)

  } catch (err) {
    res.status(500).send({ msg: `error el el servidor:${err} ` });
  }
}

module.exports = {
    register,
    login,
  };