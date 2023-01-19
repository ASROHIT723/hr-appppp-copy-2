import User from '../../../models/userModel'
import connectDB from '../../../utils/connectDB'

export default async function signIn(req,res){

    if(req.method === "GET"){
        res.status(200).json("The Server is Working...")
    }else if(req.method === "POST"){
        try {

            await connectDB();

            const {name, email, password} = req.body;

            const user = await User.find({
                email: email
            });

            
            if(user[0].password === password){
                res.status(200).json({
                    userStatus: true,
                    user: user[0]
                });
            }else{
                res.json({
                    userStatus: false
                })
            }

        } catch (error) {
            res.json(error);
            console.log(error)
        }
    }
}