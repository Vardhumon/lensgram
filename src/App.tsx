import { Route,Routes } from 'react-router-dom'
import './global.css'
import AuthLayout from './_auth/AuthLayout'
import SignUpForm from './_auth/forms/SignUpForm'
import SignInForm from './_auth/forms/SignInForm'
import RootLayout from './_root/RootLayout'
import { Home,Explore,Saved,AllUsers,CreatePost,EditPost,PostDetails,Profile,UpdateProfile} from './_root/pages'
import { Toaster } from './components/ui/toaster'
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
              <Route index element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/all-users" element={<AllUsers />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:id" element={<EditPost />} />
              <Route path="/posts/:id" element={<PostDetails />} />
              <Route path="/profile/:id/*" element={<Profile />} />
              <Route path="/update-profile/:id" element={<UpdateProfile />} />
            </Route>
        </Routes>
        <Toaster />
    </main>
  )
}

export default App