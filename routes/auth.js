import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hi i'm auth!!");
});

router.get("/register", (req, res) => {
  res.send("hi i'm auth register!!");
});
//CREATE

//UPDATE

//DELETE

//GET
export default router;
