import { Reimbursement } from "../models/reimbursement ";
import { daoGetAllReimbursement, daoGetReimbursementsByReimbursementId, daoGetReimbursementsByStatusId, daoGetReimbursementsByUserId, daoPostReimbersement } from "../repositories/reimbursement-dao";

//get all reimbursement
export function getAllReims(): Promise<Reimbursement[]> {
    return daoGetAllReimbursement();
}

// Reimbursement id
export function getReimbursementsByReimbursementId(reimbursementid){
    try {
        return daoGetReimbursementsByReimbursementId(reimbursementid);
    } catch(e) {
        throw e;
    }
}

// status id
export function getReimbursementsByStatusId(status: number) {
    try {
        return daoGetReimbursementsByStatusId(status);
    } catch (e) {
        throw e;
    }
}

// get user id
export function getReimbursementsByUserId(userId: number) {
    try {
        return daoGetReimbursementsByUserId(userId);
    } catch (e) {
        throw e;
    }
}

export function postReimbursement(post) {
    try {
        return daoPostReimbersement(post);
    } catch (e) {
        throw e;
    }
}

// //patch
// export async function patchReimbersement(patch) {
//     try {
//         const post = await daoGetReimbursementsByReimbursementId(patch.reimbursementId);
//         for (const key in post) {
//             if (patch.hasOwnProperty(key)) {
//                 post[key] = patch[key];
//             }
//         }
//         return await daoUpdateReimbursement(post);
//     } catch (e) {
//         throw e;
//     }
// }