import { useGetUser } from "@/lib/reactQuery/quiriesAndMutations";
import { useToast } from "../ui/use-toast";
import UserCard from "./UserCard";
import { Loader } from "lucide-react";

const RightSidebar = () => {
  const { toast } = useToast();

  const { data: creators, isLoading, isError: isErrorCreators } = useGetUser();

  if (isErrorCreators) {
    toast({ title: "Something went wrong." });

    return;
  }

  return (
   
      <div className="rightsidebar">
        <div className="px-4 py-10">
          <h2 className="h3-bold md:h2-bold text-left w-full">Top Creators</h2>
        </div>
        {isLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="flex flex-col gap-6 overflow-x-auto custom-scrollbar ">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id} className=" px-3">
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
   
  );
};

export default RightSidebar;
