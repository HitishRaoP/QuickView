"use client"

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from "react-hot-toast";
import { deleteVideoContent } from "@/actions/delete-video-content";
import { useRouter } from "next/navigation";

export function SummaryDelete({ videoId }: { videoId: string }) {

  const router = useRouter();

  const handleDeleteContent = async () => {
    await toast.promise(deleteVideoContent(videoId), {
      loading: 'Loading...',
      success: 'Content cleared',
      error: 'Error clearing content',
    });
    router.push("/history");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} className="text-red-500 hover:text-red-500 hover:bg-[#2A1314] flex items-center justify-center gap-2">
          <span><Trash className="w-4 h-4" /></span>
          <span className="hidden md:block">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently this video
            and remove your this data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteContent}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}