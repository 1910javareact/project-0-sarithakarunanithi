import express from 'express';
import { Reimbursement } from '../models/reimbursement ';
import { getReimbursementsByUserId, getReimbursementsByStatusId, patchReimbursement, postReimbursement } from '../service/reimbursement-service';

export const reimbursementRouter = express.Router();

// statusId
reimbursementRouter.get('/status/:statusId', async (req, res) => {
    const statusId = +req.params.statusId;
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



// post reimbursement - submitting
reimbursementRouter.post('', async (req, res) => {
    const { body } = req;
    const newR = new Reimbursement(0, 0, 0, 0, 0, ``, 0, 0, 0);
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
        if (result != undefined) {
            //  res.status(201).json('created');
            res.status(201).json(result);

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
        const update = await patchReimbursement(reimburse);
        res.status(201).json(update);
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});