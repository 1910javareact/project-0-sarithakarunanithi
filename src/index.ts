import express from 'express'
import bodyparser from 'body-parser';
import { userRouter } from './routers/user-router';
import { sessionMiddleware } from './middleware/session-middleware';

// Initializing an app from express
const app = express()

// Middleware - all req is go by this bodyparser & fall into next endpoint
app.use(bodyparser.json())

// session middleware
 app.use(sessionMiddleware)

// registering the router with base path
app.use('/users', userRouter)

// Creating routes by calling single call back function & using arrow function
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Reimbursment app!!</h1>')
});

// Environment variable setup for PORT
const PORT = process.env.PORT || 3001;

// Start server with PORT || 3000
app.listen(PORT, () => {
    console.log(`app started on port ${PORT}...`);
});
