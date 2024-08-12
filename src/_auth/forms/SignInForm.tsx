import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import {Form,FormControl,FormField,FormItem,FormMessage,FormLabel} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { SignInValidation} from '@/lib/validation'
import { z } from 'zod'
import Loader from '@/components/shared/Loader'
import { useToast } from '@/components/ui/use-toast'
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'


function SigninForm() {
  const navigate = useNavigate();
  const {toast} = useToast();
  const {mutateAsync:signInAccount} = useSignInAccount();
  const {checkAuthUser, isLoading:isUserLoading} = useUserContext();
     // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password:""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
      const session = await signInAccount({email:values.email,password:values.password})
      console.log(session)
      if(!session){
        toast({title:"Sign in failed. please try again"})
        return;
      }
      const isLoggedIn = await checkAuthUser()
      console.log(isLoggedIn)
      if(isLoggedIn){
        form.reset();
        navigate('/')
      }else{
        return toast({title:'Trouble logging In'})
      }
  }


  return (
    <>
    <Form {...form}>
        <div className='sm:w-420 flex-center flex-col'>
            <img src='assets/images/logo.svg' alt= 'logo' className='w-40 h-40 sm:w-1/2 sm:h-1/2 ' />
            <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Log in to your account</h2>
            <p className='text-light-3 small-medium md:base-regular mt-2'>Welcome back! Please enter your details.</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full pt-5">
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' className='shad-input'{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' className='shad-input'{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <Button type="submit" className='shad-button_primary'>
                {isUserLoading?
                    <div className='flex-center gap-2'><Loader />Loading....</div>:<div>Log in</div>
                }
            </Button>
            <p className='text-small-regular text-light-2 text-center mt-2'>
                Don't have an account?
                <Link to='/sign-up' className='text-primary-500 ml-2'>Sign Up</Link>
            </p>
        </form>
      </div>
    </Form>
    </>
  )
}

export default SigninForm