import express from 'express';
import cors from 'cors';
import { PORT, mongoDBURL } from './config.js';  
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoutes.js'
const app = express();

// middleware for parsing request body
app.use(express.json());

// middleware for handling CORS POLICY
// option 1 Allow All origin with DEfault of cors
app.use(cors());
// allow custom origin
// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('<h1>server responded</h1>');
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to mongodb');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});
