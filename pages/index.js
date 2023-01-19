import { useEffect } from "react"
import { useRouter } from "next/router"
import {useSession} from 'next-auth/react'
import { Grid, Box } from "@mui/material"
import LoginForm from "../components/LoginForm"
import Head from "next/head"

const classes = {
  root:{
    backgroundColor: "",
    textAlign: "center",
    height: "100vh",
    color: "black"
  },
  formWrap:{
    width: "100vw",
    display: "flex",
    justifyContent: "center"
  }
}

export default function Index() {

  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(()=>{
      if(session){
        router.push('/home');
      }
  },[session])
 
  return (
    <Grid container sx={{...classes.root}}>
      <Grid item sm={12} sx={{...classes.formWrap}}>
          <Box>
              <h2>Welcome to <br/>Forese Volunteer App</h2>
              <LoginForm />
          </Box>
      </Grid>
    </Grid>
  )
}
