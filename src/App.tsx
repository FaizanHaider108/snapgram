import "./globals.css";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
import Home from "./_root/Pages/Home";
import { Toaster } from "./components/ui/toaster";
import Explore from "./_root/Pages/Explore";
import Saved from "./_root/Pages/Saved";
import AllUsers from "./_root/Pages/AllUsers";
import CreatePosts from "./_root/Pages/CreatePosts";
import EditPosts from "./_root/Pages/EditPosts";
import PostDetails from "./_root/Pages/PostDetails";
import Profile from "./_root/Pages/Profile";
import UpdateProfile from "./_root/Pages/UpdateProfile";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePosts />} />
          <Route path="/update-post/:id" element={<EditPosts />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
