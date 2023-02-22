import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/users/"
    }),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "getAll",
                params: {},
                method: "GET"
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: "getuser",
                params: {},
                method: "GET",
            }),
        }),
        userLogin: builder.mutation({
            query: (userData) => ({
                url: "login",
                method: "POST",
                headers: {
                    "Content-Type": 'application/json;charset=UTF-8',
                },
                credentials: 'include',
                body: userData
            }),
        }),
        changeUserRole: builder.mutation({
            query: (userData) => ({
                url: `updateuserrole/${userData.UId}`,
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(userData.URole),


            }),
        }),
        registerUser: builder.mutation({
            query: (userData) => ({
                url: "register",
                method: "POST",
                headers: {
                    "Content-Type": 'application/json;charset=UTF-8',
                },
                credentials: 'include',
                body: userData
            }),
        }),

    }),
});


export const { useGetAllUsersQuery, useChangeUserRoleMutation, useUserLoginMutation, useRegisterUserMutation } = userApi;