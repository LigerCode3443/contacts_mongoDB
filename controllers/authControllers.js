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
  await fs.rename(oldPath, newPath);

  const avatar = await Jimp.read(oldPath);
  console.log(avatar);

  avatar.resize(250, 250);

  await avatar.writeAsync(newPath);

  const avatarURL = path.join("avatars", filename);

  await authServices.updateUser({ _id }, { avatarURL });

  res.json({
    avatarURL,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
