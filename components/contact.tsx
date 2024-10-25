"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ContactSchema } from "@/schemas"
import { addContactToDb } from "@/actions/add-contact-to-db"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

export function Contact() {
  const router = useRouter()
  
  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      email: "",
      info: "",
    },
  })


  async function onSubmit(values: z.infer<typeof ContactSchema>) {
    await toast.promise(addContactToDb({ email: values.email, info: values.info }), {
      loading: "Sending feedback...",
      success: "Feedback sent!",
      error: "Failed to send feedback",
    })

    form.reset()
    router.push("/")
  }

  return (
    <div className="p-8 bg-background-secondary text-white w-full max-w-md mx-auto rounded-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-sm font-normal">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email address"
                    {...field}
                    className="bg-black border-[#333] text-white placeholder-gray-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="info"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white text-sm font-normal px-2 py-1 inline-block">How can we help?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please describe"
                    {...field}
                    className="bg-black border-[#333] text-white placeholder-gray-500 min-h-[300px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Talk to Briefchat
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}