import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
const { genSaltSync, hashSync, compare } = bcrypt;
export const register = async (req, res, next) => {
  try {
    const salt = genSaltSync(10);
    const hash = hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json("회원가입 성공");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "해당 User가 없습니다."));

    const isPasswordCorrect = await compare(req.body.password, user.password);
    if (!isPasswordCorrect) return next(createError(400, "암호가 다릅니다."));

    const { password, isAdmin, ...otherDetail } = user._doc;
    res.status(200).json({ ...otherDetail });
  } catch (err) {
    next(err);
  }
};
