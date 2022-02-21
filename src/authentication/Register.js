import {useState} from 'react'
import {auth} from '../firebase'
import {useNavigate, Link} from 'react-router-dom'
import {createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth'
import {useAuthValue} from '../contexts/AuthContext'


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

function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const {setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        setError('Passwords does not match')
      }
    }
    return isValid
  }

  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      // Create a new user with email and password using firebase
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          sendEmailVerification(auth.currentUser)   
          .then(() => {
            setTimeActive(true)
            navigate('/verify-email')
          }).catch((err) => alert(err.message))
        })
        .catch(err => setError(err.message))
    }
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }



  const useStyles = makeStyles({

    root0: {
      color: '#8B0000',
    },

    root1: {
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgb(30, 70, 178)',
      color: '#1e46b2',
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
            SignUp
          </Typography>{error && <Alert severity="error">{error}</Alert>}
          <Box component="form" noValidate onSubmit={register} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
            type='email' 
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}
            variant="filled"
            color="warning"
            sx={{ input: { color: 'red' } }}
            />
            </Grid>
          <Grid item xs={12}>
            <TextField 
            type='password'
            value={password} 
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}
            variant="outlined"
            color="warning"
            sx={{ input: { color: 'red' } }}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField 
            type='password'
            value={confirmPassword} 
            required
            placeholder='Confirm password'
            variant="outlined"
            color="warning"
            sx={{ input: { color: 'red' } }}
            onChange={e => setConfirmPassword(e.target.value)}
            />
            </Grid>
            </Grid>
            <Button
              type="submit"
              className={classes.root1}
              sx={{ mt: 3, mb: 2 }}
            > Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <div className={classes.root0}>
                Already have an account?</div>
              <Link to='/login'
              className={classes.root2}>
              login</Link>
              </Grid>
              </Grid>
             </Box>
        </Box >
      </Container>
    </CenteredContainer>
    </CssBaseline>
    </ThemeProvider>
  );
}

export default Register