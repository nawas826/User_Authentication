import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, TextField, Grid, Button, Typography, Link, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useForm } from "react-hook-form";
import axios from 'axios';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  box: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 200,

  },
  paper: {
      width: '35vw',
      height: '50vh',
      backgroundColor: '#e8f0fe'
  },
  container: {
    padding: 20
  },
  formGrid: {
    padding: '0px 80px'
  }

});

function SignUp() {
    const classes = useStyles();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [open, setOpen] = React.useState({isShow: false});
    
    const formSubmit = (data)=> {
      console.log("11111111111", data)

    
      axios({  
        method: 'post',  
        url: 'http://localhost:4000/signup',  
        data: data,
      }).then((res)=>{
        console.log("Res: ", res)
        setOpen({ isShow: true, status: res?.status, message: res?.data });
        setTimeout(()=>{window.Location='/signin'},5000);
      }).catch((err)=> {
        console.log("Error : ", err)
        setOpen({ isShow: true, status: err.response?.status, message: err.response?.data });
      }); 

    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen({isShow: false});
    }

    const emailValidation = (email)=> {
      console.log("email => ", email)
      const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
      return emailRegex.test(email);

    }
    const passwordValidation = (pswd)=> {
      console.log("pswd => ", pswd)
    }
    const cfPasswordValidation = (cpswd)=> {
      const pswd = getValues('pswd');
      console.log(pswd === cpswd)
      return pswd === cpswd ? true : false;
    }

    return (
      <div className={classes.box}>
            <Paper celevation={5} className={classes.paper}>
                <div className={classes.container}>
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit(formSubmit)} autoComplete="off">
                      <Grid container spacing={1} className={classes.formGrid}>
                        <Grid item xs={12}>
                          <TextField 
                            id="emailId" 
                            name='emailId'
                            label="Username" 
                            variant="outlined"
                            fullWidth
                            required={true}
                            inputProps={register("emailId", {required: true, validate: emailValidation})}
                            error={errors.emailId ? true : false }
                            helperText={errors?.emailId?.type == 'required' ? "Field is required" : errors?.emailId ? 'Email is invalid' : ''}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField 
                            id="pswd" 
                            name='pswd'
                            type="password" 
                            label="Password" 
                            variant="outlined" 
                            fullWidth
                            inputProps={register("pswd",{ required: true, validate: passwordValidation})}
                            error={errors.pswd ? true : false }
                            helperText={errors?.pswd?.type == 'required' ? "Field is required" : errors?.pswd ? 'Enter atleast 4 characters' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField 
                            id="cpswd" 
                            name='cpswd'
                            type="password" 
                            label="Confirm password" 
                            variant="outlined" 
                            fullWidth
                            inputProps={register("cpswd", {required: true, validate: cfPasswordValidation})}
                            error={errors.cpswd ? true : false }
                            helperText={errors?.cpswd?.type == 'required' ? "Field is required" : errors?.cpswd ? 'Password and confirm password are different' : ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <Button variant="contained" onClick={handleSubmit(formSubmit)}>Signup</Button>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>Already have an account?
                            <Link href={'/'}> Sign In</Link>
                          </Typography>
                        </Grid>
                      </Grid>
                    
                  </form>
                </div>
                <Snackbar open={open?.isShow} autoHideDuration={5000} anchorOrigin={{ vertical: "top",horizontal: "right" }} onClose={handleClose}>
                      <Alert onClose={handleClose} severity={open?.status === 200 ? 'success' : 'error'}>
                        {open?.message}
                      </Alert>
                </Snackbar>
            </Paper>
        </div>
    );
  }
  
  export default SignUp;


