import { configureStore } from "@reduxjs/toolkit";
import { todoApi } from "./apies/todo.api";
import { authApi } from "./apies/auth.api";


const reduxStore = configureStore({
    reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: def => def().concat(todoApi.middleware, authApi.middleware)
})

export default reduxStore