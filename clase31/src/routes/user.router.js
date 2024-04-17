import { Router } from "express";


const router = Router();

router.get("/", async (req, res) => {
  let users = [];
 
  res.send({ status: "success", payload: users });
});

export default router;
