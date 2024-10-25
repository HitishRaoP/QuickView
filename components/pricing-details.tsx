import { ChevronRight, Clipboard, Globe, Highlighter, Zap } from "lucide-react"
import { ReactNode } from "react"
import { FaYoutube } from "react-icons/fa"

type PricingDetailsType = {
    name: string,
    description: string,
    price: string,
    features: {
        icon: ReactNode,
        feature: string
    }[],
    link: string
}[]

export const PricingDetails: PricingDetailsType = [
    {
        name: "Credits Pack",
        description: "Get 10 credits and access to all features.",
        price: "₹100",
        features: [
            {
                icon: <Zap className="w-4 h-4" />,
                feature: "Quick summarization"
            },
            {
                icon: <Highlighter className="w-4 h-4" />,
                feature: "Identify key topics"
            },
            {
                icon: <Clipboard className="w-4 h-4" />,
                feature: "Quickly copy summaries"
            },
            {
                icon: <FaYoutube className="w-4 h-4" />,
                feature: "Paste any YouTube link"
            },
            {
                icon: <Globe className="w-4 h-4" />,
                feature: "Summarize videos in various languages"
            },
            {
                icon: <ChevronRight className="w-4 h-4" />,
                feature: "More features coming soon"
            },
        ],
        link: "https://buy.stripe.com/test_cN29DNgqd09y2tOaEF"
    },
]