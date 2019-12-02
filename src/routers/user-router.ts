import express from 'express';
import { getUpdateUser, getAllUser } from '../service/user-service';
//import { authorization } from '../middleware/auth-middleware';
import { daoGetUserById } from '../repositories/user-dao';

//router base path
export const userRouter = express.Router();

//get all users
async function controllerGetUsers(req, res) {
    try {
    const users = await getAllUser();
        res.json(users);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
}

//HTTP GET request method retrieves information from the server
//userRouter.get('', [authorization([1]), controllerGetUsers ]);
userRouter.get('', controllerGetUsers);

userRouter.get('/:id', async(req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
            const users = await daoGetUserById(id);
            res.json(users);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
});

//patch method is used to update 
//userRouter.patch('', authorization([2]), async(req, res) => {
    userRouter.patch('', async(req, res) => {
    try{
        const {body} = req
        const user = await getUpdateUser(body)
        res.status(200).json(user)
    }catch(e){
        res.status(e.status).send(e.message)
    }
})


