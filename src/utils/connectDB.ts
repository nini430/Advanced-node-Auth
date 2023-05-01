import mongoose from 'mongoose'
import config from 'config';
import log from './logger';


const dbUri=config.get<string>('dbUri');

const connectDB=async()=>{
    try{
        const connection=await mongoose.connect(dbUri);
        log.info(`MongoDB connection ready at ${connection.connection.host}`)
    }catch(err) {
        process.exit(1);
    }
}

export default connectDB;