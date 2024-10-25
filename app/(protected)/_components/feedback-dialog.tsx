"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { feedbackSchema } from "@/schemas"
import { addFeedbackToDb } from "@/actions/add-feedback-to-db"
import toast from "react-hot-toast"

export function FeedbackDialog() {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof feedbackSchema>>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
        feedback: "",
        },
    })

    async function onSubmit(values: z.infer<typeof feedbackSchema>) {
        toast.promise(addFeedbackToDb({ feedback: values.feedback }), {
            loading: "Sending feedback...",
            success: "Feedback sent!",
            error: "Failed to send feedback",
        })
        form.reset()
    }

    return (
    <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="cursor-pointer" asChild>
                <MessageSquare className="h-5 w-5" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-xl bg-background-secondary">
                <DialogHeader>
                    <DialogTitle>Leave Feedback</DialogTitle>
                    <DialogDescription>
                        We&apos;d love to hear what went well or how we can improve the product experience.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="feedback"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Feedback</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Your feedback"
                                                className="bg-inherit border-neutral-700 text-white min-h-24 placeholder-neutral-400 placeholder:justify-start"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button variant="secondary" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit">Submit</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}