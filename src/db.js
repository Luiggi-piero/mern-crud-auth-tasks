// mongodb+srv://user-1:user-1@cluster0.pro57gv.mongodb.net/bd-j?retryWrites=true&w=majority
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://user-1:user-1@cluster0.pro57gv.mongodb.net/bd-j?retryWrites=true&w=majority')
        console.log('DB is connected!');
    } catch (error) {
        console.log(error);
    }
}