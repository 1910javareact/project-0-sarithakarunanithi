import express from 'express';
import bodyparser from 'body-parser';
import { userRouter } from './routers/user-router';
import { sessionMiddleware } from './middleware/session-middleware';
import { getUserByUsernameAndPassword } from './service/user-service';
import { reimbursementRouter } from './routers/reimbursement-router';

// Initializing an app from express
const app = express();

// Middleware - all req is go by this bodyparser
// req json string turn into json obj & fall into next endpoint
app.use(bodyparser.json());

// session middleware - handling the session
app.use(sessionMiddleware);

// Creating routes by calling single call back function & using arrow function
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Reimbursment API!!</h1>');
});

// login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send('Please have an username and password field');
    }
    try {
        const user = await getUserByUsernameAndPassword(username, password);
        req.session.user = user;
        res.json(user);   // it sends the logged user info after log in
    } catch (e) {
        res.status(e.status).send(e.message);
    }
});

// registering the router with base path - /users
app.use('/users', userRouter);

// - /reimbursements
app.use('/reimbursements', reimbursementRouter);

// Environment variable setup for PORT
const PORT = process.env.PORT || 3001;

// Start server with PORT || 3002
app.listen(PORT, () => {
    console.log(`app started on port ${PORT}...`);
});
