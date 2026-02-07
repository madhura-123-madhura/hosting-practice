"use client"

import { useLoginMutation } from '@/redux/apies/auth.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import z from 'zod'

const Login = () => {
  const router = useRouter()
  const [signin] = useLoginMutation()
  const loginSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
  })

  type loginType = z.infer<typeof loginSchema>
  const { reset, register, handleSubmit, formState: { errors } } = useForm<loginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })
  const handleLogin = async (data: loginType) => {
    try {
      await signin(data).unwrap()
      toast.success("login success")
      router.push("/admin")
    } catch (error) {
      console.log(error);
      toast.error("unabel to login")
    }
    reset()
  }

  return <>
    <form onSubmit={handleSubmit(handleLogin)}>
      <input type="email" {...register("email")} placeholder='enter email' />
      <input type="password"{...register("password")} placeholder='enter password' />
      <button type='submit'>login</button>
    </form>
  </>
}

export default Login