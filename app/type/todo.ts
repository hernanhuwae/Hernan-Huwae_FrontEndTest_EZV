export interface Todo{
    userId: number
    id: number
    title:string
    completed: boolean
}

export interface createTodoRequest{
    userId: number
    title: string
    completed: boolean
}

export interface CreateTodoResponse extends Todo{}