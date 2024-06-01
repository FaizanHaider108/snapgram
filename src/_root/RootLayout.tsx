import Bottombar from '@/components/Shared/Bottombar';
import LeftSidebar from '@/components/Shared/LeftSidebar';
import RightSidebar from '@/components/Shared/RightSidebar';
import Topbar from '@/components/Shared/Topbar';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Topbar/>
      <LeftSidebar />


      <section className='flex flex-1 h-full'>
      <Outlet />
      </section>


      <RightSidebar />
      <Bottombar />
    </div>
  );
};

export default RootLayout;
