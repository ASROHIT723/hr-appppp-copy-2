import { useEffect } from "react";
import { Box, Grid, TextField,Typography, styled, MenuItem, Button } from "@mui/material";
import { useForm, Form } from "../../../components/useForm";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from 'axios'
import { mode } from "../../../data";
import { useState } from 'react';
import studentId from "../[studentId]";






const Item = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': { margin: '0.4rem', width: '30ch' }

}))

const initialValues = {
    cName: "",
    mode: "",
    
}

const classes = {
    root:{
        padding: "1rem"
    }
}

export default function modify(){



    const router = useRouter();


    const [companies, setCompanies] = useState([]);

    const {data: session, status} = useSession();
    

    useEffect(()=>{
        if(status === "unauthenticated") router.replace("/");
    },[])

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)

    const validate = () => {
        let temp = {}
        temp.cName = (/^[A-Za-z\s]+$/).test(values.cName) ? "" : "ENTER VALID COMPANY NAME"
        temp.mode =  (values.mode).length > 0 ? "" : "Select mode"
        setErrors({
            ...temp
        })
        return Object.values(temp).every(x => x === "")
    }

    async function handleSubmit(){
        
        
            let cName = values.cName;
            let mode = values.mode;
            
            const {data} = await axios.put("/api/student",{companies:
                    [
                        {
                            "cName":cName,
                            "mode":mode,
                        }
                        
                    ]

            })
            console.log(data)
            axios.get(url).then(response => {
            console.log(response);
            })
            .catch(error => {
            console.log(error);
            });
            
        
    }


    return <Box sx={{...classes.root}}>
        <Typography variant="h6">Companies Entry</Typography>
        <Form>
            <Grid container sx={{display: "flex", justifyContent: "center"}}>
                <Grid item>
                    <Item>
                        <TextField
                                variant='filled'
                                label="Company Name"
                                name="cName"
                                size="small"
                                value={values.cName}
                                onChange={handleInputChange}
                                {...(errors ? { error: (errors.cName? true : false), helperText: errors.cName } : false)}
                        />
                        <TextField
                            select
                            name="mode"
                            size="small"
                            variant='filled'
                            label='Select mode'
                            value={values.mode}
                            onChange={handleInputChange}
                        >
                            {mode.map((e) => (
                                <MenuItem key={e.id} value={e.value}>
                                    {e.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        
                        <Button 
                            type="button"
                            variant="contained"
                            size="small"
                            sx={{padding: "0", margin: "1rem 0"}}
                            onClick={handleSubmit}
                        >ADD
                        </Button>
                        <ul>{companies.map
                        (companies => (
                        <li key={companies.cName}>{companies.mode}
                        </li>))}
                        </ul>
                    </Item>
                </Grid>
            </Grid>
        </Form>
    </Box>

}