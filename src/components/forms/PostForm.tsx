"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../Shared/FileUploader"
import { PostValidations } from "@/lib/validations"
import { Models } from "appwrite"
import { useCreatePost } from "@/lib/reactQuery/quiriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"

type PostFormProps = {
  post?: Models.Document;
}


const PostForm = ({post}: PostFormProps) => {
  const {user} = useUserContext();
  const {toast} = useToast();
  const navigate = useNavigate();
  const {mutateAsync:createPost } = useCreatePost();

     // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidations>>({
    resolver: zodResolver(PostValidations),
    defaultValues: {
      caption:post ?  post?.caption: "",
      file: [],
      location: post ? post?.location: "",
      tags: post ? post.tags.join(','): ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidations>) {
    const newPost = await createPost({
        ...values,
        userId: user.id,
    })

    if(!newPost){
      toast({
        title: `Please try again`
      })
    }
    navigate("/")
  }


  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Caption</FormLabel>
            <FormControl>
              <Textarea
              className="shad-textarea custom-scrollbar" {...field} />
            </FormControl>
            <FormMessage  className=""/>
         
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Photos</FormLabel>
            <FormControl>
            <FileUploader 
            fieldChange={field.onChange}
            mediaUrl = {post?.imageUrl}
            />
            </FormControl>
            <FormMessage  className="shad-form_message"/>
         
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">Add Location</FormLabel>
            <FormControl>
              <Input
              type="text"
              className="shad-input" {...field} />
            </FormControl>
            <FormMessage  className="shad-form_message"/>
         
            <FormMessage />
          </FormItem>
        )}
      />
       <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="shad-form_label">
                Add tags (separated by comma " , ")
            </FormLabel>
            <FormControl>
              <Input
              type="text"
              className="shad-input" 
              placeholder="Art, Expression, Learn"
              {...field} />
            </FormControl>
            <FormMessage  className="shad-form_message"/>
         
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-4 items-center justify-end">
      <Button type="submit" className="shad-button_dark_4">Cancel</Button>
      <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>

      </div>
      
    </form>
  </Form>
  )
}

export default PostForm