"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupFormSchema } from "@/lib/validations";
import Loader from "@/components/Shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useCreateUserAccount, useSignInAccount } from "@/lib/reactQuery/quiriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount  } = useSignInAccount();
  
  const { checkAuthUser } = useUserContext();

  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignupFormSchema>) {
    try {
      console.log("Submitting form with values:", values);
      const newUser = await createUserAccount(values);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again!" });
        return;
      }

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        toast({ title: "Signup failed, Please try again" });
        return;
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();
        navigate('/');
      } else {
        toast({ title: 'Signup failed. Please try again!' });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast({ title: "An error occurred. Please try again!" });
    }
  }
  return (
    <Form {...form}>

      <div className="sm:w-420 flex flex-col">
        <img src="/assets/images/logo.svg" alt="snapgram" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular">To use snapgram, Please enter your account details</p>
     

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col gap-3 w-full mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
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
              <FormLabel>username</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
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
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input type="email" className="shad-input" {...field} />
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
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input type="password" className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="shad-button_primary">
          {isCreatingAccount ? (
            <div className="flex-center gap-2">
              <Loader />Loading...
            </div>
           ) : ("Sign up")}
        </Button>

            <p className="text-small-regular text-light-2 mt-2 text-center">Already have an Account
            <Link to={"/sign-in"} className="text-primary-500 text-semibold"> Log in</Link>
            </p>

      </form>
      </div>
    </Form>
    
  );
};

export default SignupForm;
