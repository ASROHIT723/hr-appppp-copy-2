import User from '../../../models/userModel'
import connectDB from '../../../utils/connectDB'

export default async function signUp(req,res){

    if(req.method === "GET"){
        res.status(200).json("The Server is Working...")
    }else if(req.method === "POST"){
        try {

            await connectDB();

            const {name, email, password} = req.body;

            const newUser = await User.create({
                name,
                email,
                password
            });
    
            if(newUser){
                res.status(201).json(newUser);
                console.log(newUser);
            }
    
        } catch (error) {
            res.json(error);
            console.log(error)
        }
    }
}