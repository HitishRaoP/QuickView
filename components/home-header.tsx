'use client'

import React, { useState } from 'react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import LoginButton from './auth/login-button'
import { Button } from './ui/button'
import { Command, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const items = [
  {
    name: "Home",
    href: "/home"
  },
  {
    name: "Pricing",
    href: "/pricing"
  },
  {
    name: "About",
    href: "/about"
  },
  {
    name: "Contact",
    href: "/contact"
  },
]

export const HomeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm p-4'>
     <div className='w-full mx-auto px-4'>
        <div className='bg-transparent rounded-2xl border shadow-lg'>
          <div className='flex items-center justify-between p-2'>
            <Link className='flex items-center' href="/">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                <Command className="size-4" />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="font-semibold text-foreground">Briefchat</span>
              </div>
            </Link>
    
            <NavigationMenu className="hidden md:block">
              <NavigationMenuList className='flex gap-6'>
                {items.map((item) => (
                  <NavigationMenuItem className='font-semibold text-muted-foreground' key={item.name}>
                    <NavigationMenuLink href={item.href}>
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className='hidden md:flex gap-2'>
              <Button size="sm" variant="secondary" className='rounded-lg' asChild>
                <Link href="/auth/login">
                  Log in
                </Link>
              </Button>
              <LoginButton>
                <Button
                  size="sm"
                  className='rounded-lg'
                >
                  Sign up
                </Button>
              </LoginButton>
            </div>

            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="md:hidden overflow-hidden"
              >
                <nav className="flex flex-col gap-4 p-4 bg-transparent rounded-b-2xl">
                  {items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <hr className="my-4 border-muted" />
                  <Button variant="secondary" asChild className="justify-center">
                    <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                  </Button>
                  <LoginButton>
                    <Button className="w-full" onClick={() => setIsMenuOpen(false)}>Sign up</Button>
                  </LoginButton>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}