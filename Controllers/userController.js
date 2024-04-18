import { Sequelize, where } from "sequelize";
import { userModel } from "../Models/userModels.js";

const connection = async () => {
  const sequelize = new Sequelize("demoDB", "postgres", "mani2023@", {
    host: "localhost",
    dialect: "postgres",
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    const User = userModel(sequelize);
    await sequelize.sync();
    console.log("Table created successfully.");
    return User;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const getUsers = async (req, res) => {
  try {
    const User = await connection();
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getIdbyUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const User = await connection();
    const users = await User.findByPk(id);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {

  try {
    const User = await connection();
    const newUser = await User.create({
      username: req.body.username,
      companyName: req.body.companyName,
      address: req.body.address,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating a user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await connection();
    const updatedRowsCount = await User.update(req.body, { where: { id } });

    if (!updatedRowsCount) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User updated successfully" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await connection();
    const deletedRowsCount = await User.destroy({ where: { id } });

    if (!deletedRowsCount) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTable = async (req, res) => {
  try {
    const User = await connection();

    await User.drop();

    res.status(200).json({ message: "Table deleted successfully" });
  } catch (error) {
    console.error("Error deleting table:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getUsers, createUser, deleteUser, editUser, deleteTable ,getIdbyUsers};
