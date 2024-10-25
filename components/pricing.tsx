import React from 'react'
import { PricingDetails } from "./pricing-details"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SmilePlus } from 'lucide-react'

export const Pricing = () => {
    return (
        <div className='grid container gap-4 max-w-4xl'>
            <Alert className='rounded-sm' variant={"success"}>
                <SmilePlus className="h-4 w-4 text-green-700" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    You get 3 Free credits when you sign up
                </AlertDescription>
            </Alert>
            {
                PricingDetails.map((plan, index) => {
                    return (
                        <Card className='rounded-sm' key={index}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription className='pt-4'>{plan.description}</CardDescription>
                                <CardContent className='pt-4'>
                                    <div className='pb-4 text-4xl'>{plan.price}</div>
                                    {
                                        plan.features.map((feature, index) => {
                                            return (
                                                <div key={index} className='flex py-2 items-center'>
                                                    <div className='mr-2'>{feature.icon}</div>
                                                    <div className="text-sm text-accent-foreground">{feature.feature}</div>
                                                </div>
                                            )
                                        })
                                    }
                                </CardContent>
                                <CardFooter>
                                    <Button className='w-full' variant={"outline"} asChild>
                                        <Link href={plan.link}>
                                            Get Started
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </CardHeader>
                        </Card>
                    )
                })
            }
        </div>
    )
}
