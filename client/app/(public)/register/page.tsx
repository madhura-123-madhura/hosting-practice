"use client"

import { useRegisterMutation } from '@/redux/apies/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Register = () => {
    const router = useRouter()

    const [signup] = useRegisterMutation()

    const registerSchema = z.object({
        name: z.string().min(1),
        email: z.string().min(1),
        password: z.string().min(1),
    })

    type registerType = z.infer<typeof registerSchema>
    const { reset, register, handleSubmit, formState: { errors } } = useForm<registerType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(registerSchema)
    })
    const handleregister = async (data: registerType) => {
        try {
            await signup(data).unwrap()
            toast.success("register success")
            router.push("/")
            reset()
        } catch (error) {
            console.log(error);
            toast.error("unabel to register")
        }
    }

    return <>
        <form onSubmit={handleSubmit(handleregister)}>
            <input type="text" {...register("name")} placeholder='enter name' />
            <input type="email" {...register("email")} placeholder='enter email' />
            <input type="password"{...register("password")} placeholder='enter password' />
            <button type='submit'>register</button>
        </form>
    </>
}

export default Register