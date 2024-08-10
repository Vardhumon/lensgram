import { INewUser } from '@/types'
import {useQuery,useMutation,useQueryClient,useInfiniteQuery} from '@tanstack/react-query'
import { createUserAccount, signInUser, signOutAccount } from '../appwrite/api'

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn:(user:INewUser) => createUserAccount(user),
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn:(user:{
            email:string,
            password:string
        }) => signInUser(user),
    })
}

export const useSignOut = () => {
    return useMutation({
        mutationFn:signOutAccount,
    })
}