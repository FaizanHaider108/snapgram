"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { SigninFormSchema  } from "@/lib/validations";
import Loader from "@/components/Shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/reactQuery/quiriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SigninForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutateAsync: signInAccount   } =
    useSignInAccount();

  const { checkAuthUser, isLoading } = useUserContext();

  const form = useForm<z.infer<typeof SigninFormSchema>>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SigninFormSchema>) {
    try {
      console.log("Submitting form with values:", values);

      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (!session) {
        toast({ title: "Signin failed, Please try again" });
        return;
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        toast({ title: "Signin failed. Please try again!" });
      }
    } catch (error) {
      console.error("Error during signin:", error);
      toast({ title: "An error occurred. Please try again!" });
    }
  }
  return (
    <Form {...form}>
      <div className="sm:w-420 flex flex-col">
        <img src="/assets/images/logo.svg" alt="snapgram" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
         Log in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular">
          Welcome back, Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 flex flex-col gap-3 w-full mt-4">
          
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
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader />
              </div>
            ) : (
              "Log in"
            )}
           
          </Button>

          <p className="text-small-regular text-light-2 mt-2 text-center">
            Dont have an Account
            <Link to={"/sign-up"} className="text-primary-500 text-semibold">
              {" "}
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SigninForm;
