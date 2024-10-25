import { User, Building, Pencil, Globe } from "lucide-react"
import { InfoCard } from "./info-card"

export const About = () => {
  return (
    <div className="sm:mt-0 container mx-auto max-w-4xl">
      <div className="border-b px-8 md:px-0">
        <div className="text-3xl md:text-5xl text-start pt-24 font-bold leading-normal">
          <span className="bg-gradient-to-r from-yellow-400 via-orange-600 to-red-500 text-transparent bg-clip-text">
            Briefchat
          </span> helps you <br />summarize YouTube videos instantly
        </div>
        <div className="text-start text-neutral-400 pt-6 pb-24 text-md md:text-xl">
          Get the essence of any video without watching the whole thing.<br />
          Our AI transforms lengthy content into bite-sized, insightful summaries.
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <InfoCard
          icon={<User />}
          boldText="User-Focused"
          content="Designed for creators, researchers, and anyone who values their time." />
        <InfoCard
          icon={<Globe />}
          boldText="Global"
          content="Summarizes videos in multiple languages for a wider reach." />
        <InfoCard
          icon={<Pencil />}
          boldText="AI-Powered"
          content="Harnesses advanced AI to distill key points and insights from any video." />
      </div>
      <div className="h-6"></div>
    </div>
  )
}
