import { APP_URL } from "@/constants/config"
import { User } from "@/types/User"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${APP_URL}/api/auth`, credentials: "include" }),
    tagTypes: [""],
    endpoints: (builder) => {
        return {

            register: builder.mutation<void, User>({
                query: registerData => {
                    return {
                        url: "/signup",
                        method: "POST",
                        body: registerData
                    }
                },
            }),
            login: builder.mutation<void, User>({
                query: loginData => {
                    return {
                        url: "/signin",
                        method: "POST",
                        body: loginData
                    }
                },
            }),
            logout: builder.mutation<void, User>({
                query: lgoutData => {
                    return {
                        url: "/signout",
                        method: "POST",
                        body: lgoutData
                    }
                },
            }),

        }
    }
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi
