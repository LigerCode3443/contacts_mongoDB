import * as authServices from "../services/authServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

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

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
};
