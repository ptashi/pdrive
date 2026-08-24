"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";


//zod schema: describes what a valid submission looks like
const authSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").optional(),
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AuthFormValues = z.infer<typeof authSchema>;

type AuthFormProps = {
  type: "sign-in" | "sign-up"
}

const AuthForm = ({ type }: AuthFormProps) => {
  const isSignUp = type === "sign-up";

  const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema)
  })

  async function onSubmit(data: AuthFormValues) {
    console.log("Form submitted:", data);
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-md">
      <h1 className="flex text-4xl font-bold justify-center text-brand mb-10">
        {isSignUp ? "Create your account" : "Welcome back"}
      </h1>

      {isSignUp && ( // only shows up if sign-up page
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <input
            id='fullName'
            type='text'
            placeholder='Your Name'
            className='border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-peanut/40'
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500">{errors.fullName.message}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-peanut/40"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full font-medium bg-brand hover:bg-brand-dark py-8 rounded-full">
        {isSubmitting ? "Please wait..." : isSignUp ? "Sign up" : "Sign in"}
      </Button>

      <div className="body-2 flex justify-center">
        <p className="text-light-100">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </p>
        <Link
          href={isSignUp ? "/sign-in" : "/sign-up"}
          className="ml-1 font-medium text-brand"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </Link>
    </div>

    </form>


  )
}

export default AuthForm;