import React from 'react'
import { Route,Routes } from 'react-router-dom'
import './global.css'
import AuthLayout from './_auth/AuthLayout'
import SignUpForm from './_auth/forms/SignUpForm'
import SignInForm from './_auth/forms/SignInForm'
import RootLayout from './_root/RootLayout'
import { Home } from './_root/pages'
function App() {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public Routes */}
            <Route element={<AuthLayout />}>
                <Route path='sign-up' element={<SignUpForm/>}></Route>
                <Route path='sign-in' element={<SignInForm/>}></Route>
            </Route>


            {/* private Routes */}
            <Route element={<RootLayout />}>
                <Route index element={<Home />}></Route>
            </Route>
        </Routes>
    </main>
  )
}

export default App