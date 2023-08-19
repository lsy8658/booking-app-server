import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
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

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    /* 
      임시 key 발급 터미널에서 실행이 안되어서 gitbash에서 사용
      명령어 : openssl rand -base64 32

      쿠키 설정을 위해 cookie-parser 설치
    */
    const { password, isAdmin, ...otherDetail } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetail });
  } catch (err) {
    next(err);
  }
};
