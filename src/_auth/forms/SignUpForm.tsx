import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button'
import {Form,FormControl,FormField,FormItem,FormMessage,FormLabel} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { SignUpformSchema } from '@/lib/validation'
import { z } from 'zod'
import Loader from '@/components/shared/Loader'
import { useToast } from '@/components/ui/use-toast'
import { useCreateUserAccount, useSignInAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'


function SignUpForm() {
  const {toast} = useToast();
  const {mutateAsync:createUserAccount, isPending:isCreatingAccount} = useCreateUserAccount();
  const {mutateAsync:signInAccount, isPending:isSigningInUser} = useSignInAccount();
  const {checkAuthUser, isLoading:isUserLoading} = useUserContext();
  const navigate = useNavigate();
     // 1. Define your form.
  const form = useForm<z.infer<typeof SignUpformSchema>>({
    resolver: zodResolver(SignUpformSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpformSchema>) {
      try {
        const newUser = await createUserAccount(values);
        if (!newUser) {
          toast({ title: "Sign up failed. Please try again.", });
          
          return;
        }
        const session = await signInAccount({email:values.email,password:values.password})
        
        if (!session) {
          toast({ title: "Something went wrong. Please login your new account", });
          
          navigate("/sign-in");
          
          return;
        }
        console.log(newUser);
  
        const isLoggedIn = await checkAuthUser()
        if(isLoggedIn){
          form.reset();
          toast({title:'Account Created Succesfully'})
          navigate('/')
        }else{
          toast({title:'Trouble logging In'})
          return;
        }
      } catch (error) {
        console.log({error});
      }
  }


  return (
    <>
    <Form {...form}>
        <div className='sm:w-420 flex-center flex-col'>
            <img src='assets/images/logo.svg' alt= 'logo' className='w-40 h-40 sm:w-1/2 sm:h-1/2 '/>
            <h2 className='h3-bold md:h2-bold pt-5 sm:pt-12'>Create a new account</h2>
            <p className='text-light-3 small-medium md:base-regular mt-2'>To use LensGram, please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full pt-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input'{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type='text' className='shad-input'{...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                {isCreatingAccount || isSigningInUser || isUserLoading ? 
                    <div className='flex-center gap-2'><Loader />Loading....</div>:<div>Sign Up</div>
                }
            </Button>
            <p className='text-small-regular text-light-2 text-center mt-2'>
                Already have an account?
                <Link to='/sign-in' className='text-primary-500 ml-2'>Log In</Link>
            </p>
        </form>
      </div>
    </Form>
    </>
  )
}

export default SignUpForm