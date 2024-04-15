import User from "../dao/classes/user.dao.js";

const userService = new User();

export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).send({ status: "success", result: users });
};
export const getUserById = async (req, res) => {
  const { uid } = req.params;
  const user = await userService.getUserById(uid);

  res.status(200).send({ status: "success", result: user });
};
export const saveUser = async (req, res) => {
  const user = req.body;
  const result = await userService.saveUser(user);
  res.status(200).send({ status: "success", result });
};
export const updateUser = async (req, res) => {
  res.send({ status: "success", result: "updateUser" });//lo implementamos luego
};
