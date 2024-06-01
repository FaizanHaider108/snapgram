import GridPostsList from "@/components/Shared/GridPostsList";
import { useGetCurrentUser } from "@/lib/reactQuery/quiriesAndMutations";
import { Loader } from "lucide-react";

const LikedPosts = () => {
  const { data: currentUser } = useGetCurrentUser();

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <>
      {currentUser.liked.length === 0 && (
        <p className="text-light-4">No liked posts</p>
      )}

      <GridPostsList posts={currentUser.liked} showStats={false} />
    </>
  );
};

export default LikedPosts;