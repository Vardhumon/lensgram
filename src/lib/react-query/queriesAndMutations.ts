import { INewPost, INewUser } from '@/types'
import {useQuery,useMutation,useQueryClient,useInfiniteQuery} from '@tanstack/react-query'
import { createPost, createUserAccount, signInUser, signOutAccount } from '../appwrite/api'
import { QUERY_KEYS } from './querykeys'

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

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };