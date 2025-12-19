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
import { Checkbox } from "@/components/ui/checkbox";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { useState } from "react";
import { EyeClosed, EyeOff, Loader2 } from "lucide-react";
import shadowImage1 from "@/assets/image/shadow_image.png";
import shadowImage2 from "@/assets/image/shadow_image_down.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";

const formSchema = z.object({
  email: z.string({ message: "Email is required." }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  rememberPassword: z.boolean().optional(),
});

export default function LoginForm() {
  const [makeLogin, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "112233",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("values__", values);

    try {
      const res = await makeLogin(values).unwrap();
      console.log("res", res.data.accessToken);

      if (res.success) {
        dispatch(
          setUser({
            user: res.data.user,
            token: res.data.accessToken,
          })
        );
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      console.log("login time error::", error);
      toast.error(getErrorMessage(error));
    }
  }

  return (
    <div className="relative min-h-screen bg-background overflow-y-hidden">
      <Image
        src={shadowImage1}
        alt="shadow"
        className="absolute top-0 left-0 z-0 pointer-events-none"
      ></Image>
      <div className="z-10 flex flex-col md:flex-row min-h-screen">
        {/* Left Side - Logo/Brand */}
        <div className="md:w-1/3 flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <Image src={logo} alt="logo" width={100} height={100} />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Direct Hiring
            </h1>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-border"></div>

        {/* Right Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-8 md:w-1/3">
          <div className="w-full max-w-2xl space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Login to Account!
              </h2>
              <p className="text-muted-foreground">
                Please enter your email and password to continue.
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
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="mostain@gmail.com"
                          type="email"
                          className="bg-card border-input py-6"
                          {...field}
                        />
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
                      <FormLabel className="text-foreground font-medium">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            className="bg-card border-input  py-6"
                            {...field}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-muted-foreground"
                            >
                              {showPassword ? (
                                <EyeClosed size={20} />
                              ) : (
                                <EyeOff size={20} />
                              )}
                            </button>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  {/* <FormField
                    control={form.control}
                    name="rememberPassword"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-1 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5 border-main-color"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-muted-foreground cursor-pointer">
                            Remember password
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  /> */}

                  <Link href="/forget-password">
                    {" "}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0 h-auto hover:text-primary/80 text-main-color"
                    >
                      Forgot password?
                    </Button>
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full  hover:bg-primary/90 text-primary-foreground font-medium bg-main-color py-5"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Sign in
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Image
        src={shadowImage2}
        alt="shadow"
        className="absolute bottom-0 right-0 z-0 pointer-events-none"
      ></Image>
    </div>
  );
}
