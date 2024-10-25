"use client"
import React from 'react'
import { HomeHeader } from './home-header'
import { HomeHero } from './home-hero'
import { HomeBento } from './home-bento'

export const HomeMain = () => {
    return (
        <div className='min-h-screen'>
            <HomeHeader />
            <div className="container mx-auto">
                <HomeHero />
                <HomeBento />
            </div>
        </div>
    )
}