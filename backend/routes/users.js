import express, { json } from "express";
import { login } from "../controllers/auth.js";
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', async function(req, res, next) {
  const auth = await login(req, res);
  console.log(auth);
  if (auth.response === "Authorized entry")
    res.status(200).json({"token": auth.token})
  else
    res.status(401).json(auth)
});
export default router;