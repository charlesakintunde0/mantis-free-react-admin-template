import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/users/"
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: "getuser",
                params: {},
                method: "GET",
            }),
        }),
        registerUser: builder.query({
            query: (user) => ({
                url: "register",
                body: user,
                method: "POST",
            }),
        }),
        logIn: builder.query({
            query: (user) => ({
                url: "login",
                body: user,
                method: "POST",
            }),
        }),
        logOut: builder.query({
            query: (user) => ({
                url: "logout",
                body: user,
                method: "POST",
            }),
        }),
    }),
});


export const { useLogOutMutation } = userApi;