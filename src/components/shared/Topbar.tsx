import { useSignOut } from '@/lib/react-query/queriesAndMutations'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';
import { useUserContext } from '@/context/AuthContext';

function Topbar() {
    const navigate = useNavigate();
    const {mutate:signOut, isSuccess} = useSignOut();
    const {user} = useUserContext();
    useEffect(() => {
    if(isSuccess) navigate(0)
    }, [isSuccess])
    
  return (
    <section className='topbar'>
        <div className='flex-between py-4 px-5'>
            <Link to='/' className='flex gap-3 items-center'>
                <img 
                src='/assets/images/logo.svg'
                alt='logo'
                width={60}
                height={60}
                />
            </Link>

            <div className='flex gap-4'>
                <Button variant="ghost" className='shad-button_ghost' onClick={() =>signOut()}>
                    <img
                    src='/assets/icons/logout.svg' alt='logout'
                    />
                </Button>
                <Link to={`/profile/${user.id}`}>
                    <img 
                    src={user.imageUrl || '/assets/iamges/profile-placeholder.svg'}
                    alt='profile-photo'
                    className='w-8 h-8 rounded-full'
                    />
                </Link>
            </div>
        </div>
    </section>
  )
}

export default Topbar