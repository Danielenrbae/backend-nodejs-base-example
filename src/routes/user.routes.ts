import { Router } from "express";
import { getUsers, createUser , getUser, deleteUser, updateUser } from "../controllers/user.controller";


const routes = Router();

routes.route('/')
    .get(getUsers)
    .post(createUser);

routes.route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUser);



export default routes;