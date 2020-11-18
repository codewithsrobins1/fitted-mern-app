import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

//Parse Files
app.use(bodyParser.json({
    limit: "30mb", 
    extended: true
}))
app.use(bodyParser.urlencoded({
    limit: "30mb", 
    extended: true
}))

app.use(cors());

//Connect to Mongo DB
const MONGO_CONNECTION_URL = 'mongodb+srv://fitted-admin:test123@bloggerapplication.hv64k.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((err) =>  console.log(err.message));

mongoose.set('useFindAndModify', false);
