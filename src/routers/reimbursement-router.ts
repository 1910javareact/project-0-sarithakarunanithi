
import express from 'express';
import { Reimbursement } from '../models/reimbursement ';
//import { daoGetAllReimbursement } from '../repositories/reimbursement-dao';
import { getReimbursementsByUserId, getReimbursementsByStatusId, postReimbursement, patchReimbursement } from '../service/reimbursement-service';


export const reimbursementRouter = express.Router();

// statusId
reimbursementRouter.get('/status/:statusId', async (req, res) => {
    const statusId = +req.params.statusId;
    // console.log(status);
    if (isNaN(statusId)) {
        res.status(400).send('Invalid status');
    } else {
        try {
            const reimbursements = await getReimbursementsByStatusId(statusId);
            res.json(reimbursements);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
});


// userId
reimbursementRouter.get('/user/:userId', async (req, res) => {
    const userId = +req.params.userId;
    if (isNaN(userId)) {
        res.status(400).send('Invalid userid');
    } else {
        try {
            const reimbursements = await getReimbursementsByUserId(userId);
            res.json(reimbursements);
        } catch (e) {
            res.status(e.status).send(e.message);
        }
    }
});



// submit reimbursement
reimbursementRouter.post('', async (req, res) => {
    const { body } = req;
    const newR = new Reimbursement(0, 0, 0, 0, 0, ``, 0, 0, 0);
    // console.log(req.body.description);
    // console.log(req.body.author);

    for (const key in newR) {
        if (!req.body[key]) {
            res.status(400).send(`Please include all fields`);
            break;
        } else {
            newR[key] = body[key];
        }
    }
    try {
        const result = await postReimbursement(newR);

        // const result = await postReimbursement(newR); // have to look
        if (result != undefined) {
            res.status(201).json('created');
        }
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});

//Patch reimbursement

reimbursementRouter.patch('', async (req, res) => {

    const { body } = req;
    const reimburse = new Reimbursement(0, 0, 0, 0, 0, ``, 0, 0, 0);
    for (const key in reimburse) {
        reimburse[key] = body[key];
    }
    const id = reimburse.reimbursementId;
    if (isNaN(id)) {
        res.status(400).send(`Please enter a valid reimbursement id`);
    }
    try {
        const result = await patchReimbursement(reimburse);
        res.status(201).json(result);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});


// reimbursementRouter.get('', async (req, res) => {
//         const reims = await daoGetAllReimbursement();
//         if (reims) {
//             res.json(reims);
//         } else {
//             res.sendStatus(500);
//         }
//     });

// // Reimbursement id
// reimbursementRouter.get('/:reimbursementid', async (req, res) => {
//         const reimbursementid = await +req.params.reimbursementid;
//         if (isNaN(reimbursementid)) {
//             res.status(400).send('Invalid reimbursementid');
//         } else {
//             try {
//                 const reimbursements = await getReimbursementsByReimbursementId(reimbursementid);
//                 res.json(reimbursements);
//             } catch (e) {
//                 res.status(e.status).send(e.message);
//             }
//         }
//     });
