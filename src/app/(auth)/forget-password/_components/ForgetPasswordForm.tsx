"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useState } from "react";
import forgotPasswordIllustration from "@/assets/image/forget-password-form.png";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function ForgetPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here you would typically call your API to send the reset email
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-mint-50">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Left Side - Illustration */}
        <div className="lg:w-1/3 md:w-1/2 flex items-center justify-center ">
          <div className="w-full text-center">
            <Image
              src={forgotPasswordIllustration}
              alt="Forgot Password Illustration"
              className="w-full h-auto mb-6 rounded-lg"
            />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/3 md:w-1/2 flex items-center justify-end p-8">
          <div className="w-full space-y-6">
            <>
              <div className="text-center space-y-2">
                <h1 className="lg:text-3xl text-xl font-bold text-foreground">
                  Forget password
                </h1>
                <p className="text-muted-foreground md:text-xs lg:text-base ">
                  Enter your email address to get a verification code for
                  resetting your password.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground font-medium">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            type="email"
                            className="bg-card border-input py-6 focus:ring-main-color focus:border-main-color"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-main-color hover:bg-main-color-hover text-main-color-foreground font-medium py-6 text-lg rounded-lg transition-colors"
                  >
                    Get OTP
                  </Button>
                </form>
              </Form>

              <div className="text-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-main-color hover:text-main-color-hover"
                >
                  Back to Login
                </Button>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
