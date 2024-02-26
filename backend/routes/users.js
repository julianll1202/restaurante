import express from "express";
import { login } from "../controllers/auth.js";
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
 login(req, res);
  //   res.status(200).send()
  // }
  // else{
  //   console.log('hola');
  //   res.status(401).send()
  // }
});
export default router;