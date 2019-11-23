import express from 'express';
//import { User } from "../models/user";
import { getAllUsers, getUserById } from '../service/user-service';
import { authorization } from '../middleware/auth-middleware';

//router base path
export const userRouter = express.Router();

//get all users
function controllerGetUsers(req, res){
    let users = getAllUsers()
    if(users){
        res.json(users)
    }else{
        res.sendstatus(500)
    }
}

userRouter.get('', [authorization(['Admin']), controllerGetUsers ])

userRouter.get('/:id', (req,res) => {
    let id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        try{
            let user = getUserById(id)
            res.json(user)
        }catch(e){
            res.status(e.status).send
        }
    }
})


