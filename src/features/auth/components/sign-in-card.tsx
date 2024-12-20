"use client";

import DottedSpearator from '@/components/dotted-separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { useForm } from 'react-hook-form'
import { FaGoogle } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import Link from 'next/link'
import { loginSchema } from '../schemas'
import { useLogin } from '../api/use-login'



const SignInCard = () => {

    const { mutate, isPending } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate(values);
    }

    return (
        <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
            <CardHeader className='flex items-center justify-center text-center p-7'>
                <CardTitle>
                    Welcome back !
                </CardTitle>
            </CardHeader>
            <div className='px-7'>
                <DottedSpearator />
            </div>
            <CardContent className='p-7'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField name='email' control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='email' placeholder='Enter email address' {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name='password' control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='password' placeholder='Enter Password' {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button size={"lg"} disabled={isPending} className='w-full'>
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className='px-7'>
                <DottedSpearator />
            </div>
            <CardContent className='p-7 flex flex-col gap-y-4'>
                <Button disabled={isPending} size={"lg"} variant={"secondary"} className='w-full'>
                    <FaGoogle className='mr-2 size-5' />
                    Login with Google
                </Button>
                <Button disabled={isPending} size={"lg"} variant={"secondary"} className='w-full'>
                    <FaGithub className='mr-2 size-5' />
                    Login with Github
                </Button>
            </CardContent>
            <div className='px-7'>
                <DottedSpearator />
            </div>
            <CardContent className='p-7 flex items-center justify-center'>
                <p>
                    Don't have an account?
                    <Link href={"/sign-up"}>
                        <span className='text-blue-700'>
                            &nbsp;Sign Up
                        </span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignInCard
