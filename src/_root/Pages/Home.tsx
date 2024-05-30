import Loader from '@/components/Shared/Loader';
import PostCard from '@/components/Shared/PostCard';
import { useGetRecentPosts } from '@/lib/reactQuery/quiriesAndMutations';
import { Models } from 'appwrite';

const Home = () => {

  const {data: posts, isLoading: isPostLoading}= useGetRecentPosts();

  return (
    <div className='flex flex-1'>
      <div className="home-container">
        <div className="home-posts">
          <h2 className='h3-bold md:h2-bold text-left w-full'>
            Home Feed
            {
              isPostLoading && !posts ? (
                <Loader />
              ): (
                <ul className='flex flex-col flex-1 gap-9 w-full'>
                  {posts?.documents.map((post: Models.Document) => (
                      <PostCard post={post} key={post.caption}/>
                  ))}
                </ul>
              )
            }
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Home