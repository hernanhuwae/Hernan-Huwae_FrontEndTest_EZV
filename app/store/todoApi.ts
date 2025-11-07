import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createTodoRequest, CreateTodoResponse, Todo } from "../type/todo";


export const todoApi = createApi({
    reducerPath:'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[],{start:number ; limit:number}>({
            query:({start,limit})=> 'todos?_start=${start}&_limit=${limit}',
            providesTags: ['Todo']
        }),
        createTodos: builder.mutation<CreateTodoResponse, createTodoRequest>({
            query: (newTodo)=>({
                url:'/todos',
                method: 'POST',
                body: newTodo
            }),
            invalidatesTags: ['Todo']
        })
    })
})

export const { useGetTodosQuery,useCreateTodosMutation } = todoApi;