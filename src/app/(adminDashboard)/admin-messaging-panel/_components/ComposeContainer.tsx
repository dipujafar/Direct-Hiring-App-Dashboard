"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  userRole: z.string().min(1, {
    message: "Please select a user role.",
  }),
  subject: z.string().min(1, {
    message: "Subject is required.",
  }),
  message: z.string().min(1, {
    message: "Message is required.",
  }),
});

export default function ComposeContainer() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userRole: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission here
  }

  return (
    <div className=" bg-green-50 p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-xl font-medium text-gray-800">Compose</h1>
          <div className="flex ">
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-none"
            >
              Compose
            </Button>
            <Button
              variant="secondary"
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 rounded-none"
              asChild
            >
              <Link href="/admin-messaging-panel/history">History</Link>
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="mt-10 xl:mt-20 2xl:px-20 lg:px-10 md:px-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="userRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      User Role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white border-gray-200 h-12">
                          <SelectValue placeholder="Select user Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="employer">Employer</SelectItem>
                        <SelectItem value="helper">Helper</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Subject
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter subject..."
                        className="bg-white border-gray-200 h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter..."
                        className="bg-white border-gray-200 min-h-[200px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-medium"
              >
                Send
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
