import { useEffect } from "react";
import { Box, Grid, TextField,Typography, styled, MenuItem, Button} from "@mui/material";
import { useForm, Form } from "../../components/useForm";
import { branches } from "../../data/index";
import {useRouter} from "next/router";
import { useSession } from "next-auth/react";
import axios from 'axios'
import { modify } from '../../student/modify'
import Alert from '@mui/material/Alert';
import { WindowRounded } from "@mui/icons-material";


const Item = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': { margin: '0.4rem', width: '30ch' }

}))

const initialValues = {
    name: "",
    regNo: "",
    dept: "",
    
}

const classes = {
    root:{
        padding: "1rem"
    }
}

export default function addstudent(){

    const router = useRouter();

    const {data: session, status} = useSession();
    console.log(data);

    useEffect(()=>{
        if(status === "unauthenticated") router.replace("/");
    },[])

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)

    const validate = () => {
        let temp = {}
        temp.name = (/^[A-Za-z\s]+$/).test(values.name) ? "" : "Enter svce email id "
        temp.regNo = (/^[0-9]+$/.test(values.regNo) && values.regNo.length === 13 && values.regNo.startsWith("2127")) ? ""  : "Enter valid register"
        temp.dept =  (values.dept).length > 0 ? "" : "Select department"
        setErrors({
            ...temp
        })

        return Object.values(temp).every(x => x === "")
    }
    async function handleSubmit(){
        if(validate()){
            
            let name = values.name;
            let regNo = values.regNo;
            let dept = values.dept;
            

            const {data} = await axios.post("/api/student",{name,regNo,dept})
            console.log(data)
            if (data.regNo>0){
                window.alert('Student added successfully');
            }
            
        }
    }
    return <Box sx={{...classes.root}}>
        <Typography variant="h6">Add Student</Typography>
        <Form>
            <Grid container sx={{display: "flex", justifyContent: "center"}}>
                <Grid item>
                    <Item>
                        <TextField
                                variant='filled'
                                label="Name"
                                name="name"
                                size="small"
                                value={values.name}
                                onChange={handleInputChange}
                                {...(errors ? { error: (errors.name? true : false), helperText: errors.name } : false)}
                        />
                        <TextField
                                variant='filled'
                                label="Register no"
                                name="regNo"
                                size="small"
                                value={values.regNo}
                                onChange={handleInputChange}
                                {...(errors ? { error: (errors.regNo? true : false), helperText: errors.regNo } : false)}
                        />
                        <TextField
                            select
                            name="dept"
                            size="small"
                            variant='filled'
                            label='Select Dept'
                            value={values.dept}
                            onChange={handleInputChange}
                        >
                            {branches.map((e) => (
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
                             
                        >Create
                        </Button>
                    </Item>
                </Grid>
            </Grid>
        </Form>
    </Box>
}