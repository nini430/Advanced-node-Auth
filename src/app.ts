import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import config from 'config';
import connectDB from './utils/connectDB';
import log from './utils/logger';

import api from './routes/api'

const PORT=config.get('port')

const app=express();

app.use('/api/v1',api);

app.listen(PORT,()=>{
    connectDB();
    log.info(`Server running at http://localhost:${PORT}`)
})


