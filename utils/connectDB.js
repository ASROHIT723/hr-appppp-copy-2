import mongoose from 'mongoose';

const connectMongo = async () => mongoose.connect("mongodb+srv://eash2107:1234@cluster0.vrpbbdu.mongodb.net/?retryWrites=true&w=majority");

export default connectMongo;