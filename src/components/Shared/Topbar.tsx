import  { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/reactQuery/quiriesAndMutations'
import { useUserContext } from '@/context/AuthContext'

const Topbar = () => {
  const {mutate: signOut, isSuccess} = useSignOutAccount();
  const {user} = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if(isSuccess) navigate(0)
  }, [isSuccess])
  
  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link to={'/'}  className='flex gap-3 items-center'>
        <img src="/assets/images/logo.svg" alt="logo" width={130} height={325}/>
        </Link>
        <div className='flex gap-4 items-center'>
          <Button variant={"ghost"} className='shad-button_ghost'>
            <img src="/assets/icons/logout.svg" alt="logout" onClick={() => signOut()}/>
          </Button>
          {/* profile image */}
          <Link to={`/profile/${user.id}`}>
          <img src={user.imageUrl || '/assets/images/profile-placeholder.svg'} alt="Profile"
          className='h-8 w-8 rounded-full'
          />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Topbar