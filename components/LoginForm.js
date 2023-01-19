import { Button, Grid,styled,Box,TextField } from '@mui/material'
import {useForm, Form} from '../components/useForm'
import {signIn} from "next-auth/react"

const Item = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    '& .MuiTextField-root': { margin: '0.4rem', width: '30ch' }

}))

const initialValues = {
    email: "",
    password: ""
}

export default function LoginForm(){

    const { values, setValues, errors, setErrors, handleInputChange } = useForm(initialValues)
    
    const validate = () => {
        let temp = {}
        temp.email = (/@/).test(values.email) && (values.email.endsWith("@svce.ac.in")) ? "" : "Enter svce email id "
        temp.password = values.password ? "" : "This field is required"

        setErrors({
            ...temp
        })


        return Object.values(temp).every(x => x === "")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(validate()){
            // window.alert("Login Validated !!")
            const res = await signIn('credentials',{
                email: values.email,
                password: values.password,
                redirect: false
            });
        }
    }


    return (
        <Form>
            <Grid container>
                <Grid item>
                    <Item>
                        <TextField
                            variant='outlined'
                            label='Email'
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                            {...(errors ? { error: (errors.email? true : false), helperText: errors.email } : false)}
                        />
                        <TextField
                            variant='outlined'
                            label='Password'
                            name="password"
                            value={values.password}
                            onChange={handleInputChange}
                            {...(errors ? { error: (errors.password ? true : false), helperText: errors.password } : false)}
                        />
                        <Button type='button' variant='contained' onClick={handleSubmit} >Login</Button>
                    </Item>
                </Grid>
            </Grid>
        </Form>
    )

}