import NextAuth, {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'


const authOptions = {
    session:{
        strategy: "jwt"
    },
    providers:[
        CredentialsProvider({
            type: 'credentials',
            credentials:{},
            async authorize(credentials,req){
                const {email, password} = credentials;

                const res = await fetch('http://localhost:3000/api/user/signin', {
                    method: "POST",
                    body: JSON.stringify({email, password}),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })

                const data = await res.json();

                if(data.userStatus){
                    return {name: data.user.name, email: data.user.email};
                }else{
                    throw new Error("Invalid Credentails")
                }

            }
        })
    ],
    pages:{
        signIn: '/',
    }
}

export default NextAuth(authOptions)