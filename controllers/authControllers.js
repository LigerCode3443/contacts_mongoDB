import * as authServices from "../services/authServices.js";
import * as fs from "node:fs/promises";
import path from "node:path";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { Jimp } from "jimp";

const avatarPath = path.resolve("public", "avatars");

const register = async (req, res) => {
  const newUser = await authServices.signup(req.body);

  res.status(201).json({
    subscription: newUser.subscription,
    email: newUser.email,
  });
};

const login = async (req, res) => {
  const data = await authServices.signin(req.body);

  res.json(data);
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });

  res.json({ message: "Logout success" });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id, token, email } = req.user;
  await authServices.updateUser({ _id }, { subscription });

  res.json({ token, user: { email, subscription: req.user.subscription } });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);

  const avatar = await Jimp.read(oldPath);
  avatar.resize({ w: 250, h: 250 });

  await fs.rename(oldPath, newPath);

  await avatar.write(newPath);

  const avatarURL = path.join("avatars", filename);

  await authServices.updateUser({ _id }, { avatarURL });

  res.json({
    avatarURL,
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  await authServices.verifyUser(verificationToken);

  res.json({
    message: "Email verified successful",
  });
};

const resendVerify = async (req, res) => {
  const { email } = req.body;

  await authServices.resendVerifyEmail(email);

  res.json({
    message: "Verify email send again",
  });
};

export default {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
