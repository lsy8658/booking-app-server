import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send(" 로그인 성공 !! , 환영합니다.");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send(" 본인의 계정을 삭제할 수 있습니다. ");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send(" 모든 계정을 삭제할 수 있습니다. ");
// });

//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
