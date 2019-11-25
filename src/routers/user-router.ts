import express from 'express';
//import { User } from "../models/user";
import { getAllUsers, getUserById, getUpdateUser } from '../service/user-service';
import { authorization } from '../middleware/auth-middleware';

//router base path
export const userRouter = express.Router();

//get all users
async function controllerGetUsers(req, res) {
    try {
    const users = await getAllUsers();
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}
//
userRouter.get('', [authorization([1]), controllerGetUsers ]);
//
userRouter.get('/:id', async(req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
            const user = await getUserById(id);
            res.json(user);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
});

//patch user
userRouter.patch('', authorization([2]), async(req, res) => {
    try{
        let {body} = req
        let user = await getUpdateUser(body)
        res.status(200).json(user)
    }catch(e){
        res.status(e.status).send(e.message)
    }
})


