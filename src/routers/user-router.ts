import express from 'express';
import { getUpdateUser, getAllUser } from '../service/user-service';
import { daoGetUserById } from '../repositories/user-dao';

//routers have base path
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
userRouter.get('', controllerGetUsers);

// user id
userRouter.get('/:id', async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) {
        res.sendStatus(400);
    } else {
        try {
            const users = await daoGetUserById(id);   // have to check
            res.json(users);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
});

//patch method is used to update User
userRouter.patch('', async (req, res) => {
    try {
        const { body } = req; // destructuring
        const user = await getUpdateUser(body)
        res.status(200).json(user)
    } catch (e) {
        res.status(e.status).send(e.message)
    }
})


