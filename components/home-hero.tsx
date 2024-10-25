"use client"
import React from 'react'
import Link from 'next/link'
import { RainbowButton } from "@/components/ui/rainbow-button";
import BlurIn from './ui/blur-in';

export function HomeHero() {
    return (
        <section className="bg-black text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center sm:text-start">
                <BlurIn
                    className="text-3xl sm:text-5xl text-start md:text-6xl font-bold leading-tight mb-6"
                    word='Briefchat is a tool for summarizing YouTube videos' />
                <BlurIn
                    className="font-normal text-lg text-start md:text-2xl text-muted-foreground leading-tight mb-6"
                    word='Get instant video summaries in seconds. Save time with our AI-driven tool. Perfect for staying informed without watching the whole video!'
                />
                <RainbowButton className="w-full sm:w-auto">
                    <Link href={"/new-video"}>
                        Summarize
                    </Link>
                </RainbowButton>
            </div>
        </section>
    )
}