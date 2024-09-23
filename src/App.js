import React, { useEffect } from 'react'
import Header from './pages/header/Header'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login/Login'
import Signup from './pages/auth/signup/Signup'
import Dashboard from './pages/dashboard/Dashboard'
import Chat from './pages/Chat/Chat'
import { useDispatch, useSelector } from "react-redux";
import useAutoLogin from "./hooks/useAutoLogin";
import useTokenRefresh from './hooks/useTokenRefresh'
import Protected from './protected/protected'
import Unauthorized from './pages/unauth/unauthorized'
import { loadUserFromStorage } from './store/authSlice'

const App = () => {
  const isAuth = useSelector(state => state.user.auth);
  const userRole = useSelector(state => state.user.role);
  console.log('Role: ', userRole);
  const user = useSelector(state => state.user);
  console.log('User: ', user);
  console.log('Authenticated: ', isAuth);
  const loading = useAutoLogin();
  useTokenRefresh();
  const dispatch = useDispatch();

  useEffect(() => {
      // Load user from local storage when the app mounts
      dispatch(loadUserFromStorage());
  }, [dispatch]);

  return loading ? 'loading' : (
  // return (
    <>
    <Header></Header>
    <Routes>
      <Route path='/login' element= {<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path="/dashboard" element={
           <Protected isAuth={isAuth} userRole={userRole} requiredRole="admin">
           <Dashboard />
         </Protected>
        } />
      {/* <Route path='/dashboard' element= {<Dashboard />} /> */}
        <Route path='/chat' element={<Chat />} />
      <Route path='/unauthorized' element= {<Unauthorized />} />
        

    </Routes>
    </>
  )
}

export default App