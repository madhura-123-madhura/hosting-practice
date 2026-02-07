"use client"
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '@/redux/apies/todo.api'
import { Todo } from '@/types/Todo'
import { zodResolver } from '@hookform/resolvers/zod'
import { log, table } from 'console'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'


const Dashbord = () => {
    const { data } = useGetTodosQuery()
    const [deleteid] = useDeleteTodoMutation()
    const [update] = useUpdateTodoMutation()
    const [addTodo] = useAddTodoMutation()
    const todoSchema = z.object({
        task: z.string().min(1),
        desc: z.string().min(1),
        priority: z.string().min(1),
    })

    type todoType = z.infer<typeof todoSchema>
    const { reset, register, handleSubmit, formState: { errors } } = useForm<todoType>({
        defaultValues: {
            task: "",
            desc: "",
            priority: ""
        },
        resolver: zodResolver(todoSchema)
    })
    const handleCreate = (values: todoType) => {
        handleAdd(values);

    }
    const handleAdd = async (data: todoType) => {
        try {
            await addTodo(data).unwrap()
            console.log("added");

        } catch (error) {
            console.log(error);

        }
    }
    const deleteTodo = async (_id: string) => {
        try {
            await deleteid(_id).unwrap()
            console.log("deleed");

        } catch (error) {
            console.log(error);

        }

    }
    const handleupdate = async (data: todoType, iscomplete: boolean) => {

        try {
            await update({ ...data, complete: iscomplete }).unwrap()
            console.log("updated");

        } catch (error) {
            console.log(error);

        }

    }
    return <>
        <form onSubmit={handleSubmit(handleCreate)}>
            <input  {...register("task")} type="text" placeholder='enter task' />
            <input  {...register("desc")} type="text" placeholder='enter desc' />
            <select {...register("priority")}  >
                <option value="">choose priority</option>
                <option value="heigh">heigh</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
            </select>
            <button type='submit'>add todo</button>
        </form>
        <hr />
        {
            data && <table className='styled-table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>task</th>
                        <th>desc</th>
                        <th>priority</th>
                        <th>Complete</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(item => <tr key={item._id} className={item.complete ? "bg-green-400" : "bg-red-400"}>
                            <td>{item._id}</td>
                            <td>{item.task}</td>
                            <td>{item.desc}</td>
                            <td>{item.priority}</td>
                            <td>{item.complete ? "completed" : "pending"}</td>
                            <td>
                                {
                                    item.complete
                                        ? <button type='button' onClick={e => handleupdate(item, false)}> mark complete</button>
                                        : <button type='button' onClick={e => handleupdate(item, true)}>mark pending</button>


                                }
                                <button type='button' onClick={() => deleteTodo(item._id as string)}>Delete</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        }
    </>
}

export default Dashbord