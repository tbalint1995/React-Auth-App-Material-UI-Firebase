import {useAuthValue} from '../contexts/AuthContext'
import {useState, useEffect} from 'react'
import {auth} from '../firebase'
import {sendEmailVerification} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'


//new
import { createGlobalStyle } from 'styled-components';
import CenteredContainer from "./CenteredContainer"

// mui
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { deepOrange } from '@mui/material/colors';

const GlobalStyle = createGlobalStyle`
body{
  margin:0;
  padding:0px;
  background:url( http://www.inconexkft.hu/img/42_wicked-nature-4k-3840x2160.jpg );
  background-attachment: fixed;
  background-size: cover;
}`
function VerifyEmail() {

  const {currentUser} = useAuthValue()
  const [time, setTime] = useState(60)
  const {timeActive, setTimeActive} = useAuthValue()
  const navigate = useNavigate()


  useEffect(() => {
    const interval = setInterval(() => {
      currentUser?.reload()
      .then(() => {
        if(currentUser?.emailVerified){
          clearInterval(interval)
          navigate('/profile')
        }
      })
      .catch((err) => {
        alert(err.message)
      })
    }, 1000)
  }, [navigate, currentUser])

  useEffect(() => {
    let interval = null
    if(timeActive && time !== 0 ){
      interval = setInterval(() => {
        setTime((time) => time - 1)
      }, 1000)
    }else if(time === 0){
      setTimeActive(false)
      setTime(60)
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  }, [timeActive, time, setTimeActive])

  const resendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      setTimeActive(true)
    }).catch((err) => {
      alert(err.message)
    })
  }

  const useStyles = makeStyles({

    root0: {
      color: '#8B0000',
    },

    root1: {
      background: 'linear-gradient(60deg, #47e028 70%, #00d4ff 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgb(17, 142, 15)',
      height: 48,
      padding:'0 30px',
    },
    
    root2: {
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgb(255,69,0)',
      color: '#FF4500',
      height: 48,
      padding: '0 30px',
      
    },
  });

  const classes = useStyles();
  const theme = createTheme();

  return(
    <ThemeProvider theme={theme}>
    <CssBaseline >
      <GlobalStyle />
    <CenteredContainer>
    
      <Container 
      component="main" 
      maxWidth="xs" 
      sx={{
        my: 4,
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: '20px'
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
        >
          <Avatar  sx={{ m: 2, bgcolor: deepOrange[500] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="8" style={{color: '#29b6f6'}}>
            VerifyEmail
          </Typography>
          <Box component="form"  sx={{ mt: 3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
        <p className={classes.root0}>
        Verify your Email Address</p>
        </Grid>
        <Grid item xs={12}> 
        <p className={classes.root0}>
          <strong>A Verification email has been sent to:</strong><br/>
          <span>{currentUser?.email}</span>
        </p>
        </Grid>
        
        <Grid item xs={12}> 
        <span className={classes.root0}>
        Follow the instruction in the email to verify your account
        </span>       
        <Button 
          className={classes.root1}
          onClick={resendEmailVerification}
          disabled={timeActive}
        >Resend Email {timeActive && time}
        </Button>
        </Grid>
        </Grid>
        </Box>
        </Box>
      </Container>
    </CenteredContainer>
    </CssBaseline>
    </ThemeProvider>
  );
}

export default VerifyEmail