import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/users/",
    }),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => ({
                url: "getAll",
                params: {},
                method: "GET",
            }),
            providesTags: (result) => [
                { type: 'User', id: 'List' },
                ...result?.map((user) => ({ type: 'User', id: user.id })),
            ],
        }),
        userLogOut: builder.mutation({
            query: () => ({
                url: "logout",
                params: {},
                method: "GET",
            }),
        }),

        getUser: builder.query({
            query: () => ({
                url: "getuser",
                method: "GET",
                params: {},
                headers: { "Content-Type": 'application/json;charset=UTF-8' },
                credentials: 'include',

            }),
        }),
        userLogin: builder.mutation({
            query: (userData) => ({
                url: "login",
                method: "POST",
                headers: {
                    "Content-Type": 'application/json',
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
                    'Content-Type': 'application/json',
                },
                body: userData

            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `deleteuser/${id}`,
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'User', id: 'List' }, { type: 'User', id: (id) => id }],
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


export const { useUserLogOutMutation, useDeleteUserMutation, useGetAllUsersQuery, useChangeUserRoleMutation, useUserLoginMutation, useRegisterUserMutation, useGetUserQuery } = userApi;