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
  root: {
    backgroundImage: `url('../../../images/login-wallpaper.jpg')`,
    margin: 0,
    height: '100vh'
    
  }, 
  box: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 150,
  },
  paper: {
      width: '35vw',
      backgroundColor: '#e8f0fe'
  },
  container: {
    padding: 20
  },
  formGrid: {
    padding: '15px 80px'
  }

});

function SignIn() {
    const classes = useStyles();
    const [open, setOpen] = React.useState({isShow: false});
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const formSubmit = (data)=> {
      console.log("2222222222", data)

    
      axios({  
        method: 'post',  
        url: 'http://localhost:4000/signin',  
        data: data,
      }).then((res)=>{
        console.log("Res: ", res)
        setOpen({ isShow: true, status: res?.status, message: res?.data });
      }).catch((err)=> {
        setOpen({ isShow: true, status: err.response?.status, message: err.response?.data });
        console.log("Error : ", err)
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

    return (
        <div className={classes.root}>
            <div className={classes.box}>
                <Paper celevation={5} className={classes.paper}>
                    <div className={classes.container}>
                        <h2>Sign In</h2>
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
                            <Button variant="contained" onClick={handleSubmit(formSubmit)}>Signin</Button>
                            </Grid>
                            <Grid item xs={12}>
                            <Typography>Don't have an account? 
                                <Link href={'/signup'}> Sign Up</Link>
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
        </div>
    );
  }
  
  export default SignIn;


