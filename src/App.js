import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './authentication/Profile'
import Register from './authentication/Register'
import VerifyEmail from './authentication/VerifyEmail';
import Login from './authentication/Login'
import {useState, useEffect} from 'react'
import {AuthProvider} from '././contexts/AuthContext'
import {auth} from './firebase'
import {onAuthStateChanged} from 'firebase/auth'
import PrivateRoute from './authentication/PrivateRoute'

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  }, [])

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
         <Routes>

              <Route exact path="/" element={<PrivateRoute />} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/register" element={<Register/>} />
              <Route exact path='/verify-email' element={<VerifyEmail/>} /> 
              <Route exact path="/profile" element={<Profile/>} />

          </Routes> 
      </AuthProvider>
  </Router>
  );
}

export default App;
