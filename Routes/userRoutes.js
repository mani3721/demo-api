import express from "express";
import { createUser, deleteTable, deleteUser, editUser, getIdbyUsers, getUsers } from "../Controllers/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get('/users/:id',getIdbyUsers)
router.post("/users", createUser);
router.put('/users/:id',editUser)
router.delete("/users/:id", deleteUser);
router.delete('/delete/users',deleteTable)

export default router;
