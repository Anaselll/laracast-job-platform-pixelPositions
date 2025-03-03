import mongoose from 'mongoose';
export const connectDB=async ()=>{
    try {
      const conn = await mongoose.connect("mongodb://localhost:27017/TeachMe");

        console.log(`MongoDB connected: ${conn.connection.host}`)
    }catch(error){
                console.log(`MongoDB connected error: ${error}`);


    }
}
