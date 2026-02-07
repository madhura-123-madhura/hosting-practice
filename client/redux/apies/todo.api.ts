import { Todo } from "@/types/Todo"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/todo",
        credentials: "include"  //imp for cookie
    }),
    tagTypes: ["todo"],
    endpoints: (builder) => {
        return {
            //                      return , argument
            getTodos: builder.query<Todo[], void>({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                providesTags: ["todo"]
            }),
            //                       return, argument 
            addTodo: builder.mutation<void, Todo>({
                query: tododata => {
                    return {
                        url: "/create",
                        method: "POST",
                        body: tododata
                    }
                },
                invalidatesTags: ["todo"]
            }),
            updateTodo: builder.mutation<void, Todo>({
                query: tododata => {
                    return {
                        url: "/modify/" + tododata._id as string,
                        method: "PATCH",
                        body: tododata
                    }
                },
                invalidatesTags: ["todo"]
            }),
            deleteTodo: builder.mutation<void, string>({
                query: _id => {
                    return {
                        url: "/delete/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["todo"]
            }),

        }
    }
})

export const { useAddTodoMutation, useGetTodosQuery, useDeleteTodoMutation, useUpdateTodoMutation } = todoApi
