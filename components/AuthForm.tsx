"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, confirmSignIn, signUp } from "aws-amplify/auth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CloudLightning } from "lucide-react";


//zod schema: describes what a valid submission looks like
const authSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").optional(),
  email: z.email("Enter a valid email address")
});

type AuthFormValues = z.infer<typeof authSchema>;

const otpSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code")
})
type OtpValues = z.infer<typeof otpSchema>

type AuthFormProps = {
  type: "sign-in" | "sign-up"
}

const AuthForm = ({ type }: AuthFormProps) => {
  const isSignUp = type === "sign-up"; 
  const router = useRouter()

  const [stage , setStage] = useState<"email" | "code">("email") // this is TS - basically stage can only ever be email or code, default email
  const [pendingEmail, setPendingEmail] = useState("") // the email code is going to be sent to 
  const [authError, setAuthError] = useState("") // holds error messages from Cognito

  const {
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema)
  })

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors, isSubmitting: isOtpSubmitting },
  } = useForm<OtpValues>({
    resolver: zodResolver(otpSchema)
  })


  async function onSubmitEmail(data: AuthFormValues) { // user submits email
      setAuthError("")
      try {
        if (isSignUp) {
          await signUp({ // this is creating a new Cognito user account
            username: data.email,
            password: crypto.randomUUID() + "Aa1!", // this bc Cognito still expects a password so we just make a rnadom one that user never has to see
            options: {
              userAttributes: { email: data.email, name: data.fullName ?? ""}
            }
          })
        }
        await signIn({ // this runs the lambda funciton triggers - runs on both signin and signup 
          username: data.email,
          options: { authFlowType: "CUSTOM_WITHOUT_SRP" } // specific flag that tells Amplify "use our custom Lambda challenge flow instead of standard pwd bassed login"
        })
        console.log("swicthingnt yo vofe");
        setPendingEmail(data.email);
        setStage("code");
    } catch (err: any) {
      console.log("autherror cauight:", err);
      setAuthError(err.message ?? "Something went wrong. Try again.")
    }
  }

  async function onSubmitCode(data: OtpValues) {
    setAuthError("")

    try {
      const result = await confirmSignIn({ challengeResponse: data.code }) 
      //challengeResponse stores user input code, confirmSignIn is a built-in fucntion that sends that to Cognito which then invokes VerifyAuthCallenge and then that result goes to DefineAuth which handles the logic and issues tokens/asks again/reject -> result object
      
      if (result.isSignedIn) {  // isSignedIn holds the true or false of what DefineAuthChallenge returned
        router.push("/dashboard")
      } else {
        setAuthError("Incorrect code, try again.")
      }
    } catch (err: any) {
      setAuthError(err.message ?? "Something went wrong. Try again.")
    }
  }


  if (stage === "code") {
    return (
      <form onSubmit={handleOtpSubmit(onSubmitCode)} noValidate className="flex flex-col gap-5 w-full max-w-md">
        <h1 className="flex text-4xl font-extrabold justify-center text-brand mb-4">
          Enter your code
        </h1>
        <p className="text-center text-sm text-brand-dark">
          We sent a 6-digit code to {pendingEmail}
        </p>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="code">Code</Label>
          <input
            id="code"
            type="text"
            maxLength={6}
            placeholder="123456"
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-brand/40"
            {...registerOtp("code")}/>
          {otpErrors.code && (
            <p className="text-xs text-red-500">
              {otpErrors.code.message}
            </p>
          )}
        </div>

        {authError && <p className="text-xs text-red-500 text-center">{authError}</p>}

        <Button
          type="submit"
          disabled={isOtpSubmitting}
          className="w-full font-medium bg-brand hover:bg-brand-dark py-8 rounded-full"
        >
          {isOtpSubmitting ? "Verifying..." : "Verify code"}
        </Button>
      </form>
    )
  }


  return (
    <form onSubmit={handleSubmit(onSubmitEmail)} noValidate className="flex flex-col gap-5 w-full max-w-md">
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