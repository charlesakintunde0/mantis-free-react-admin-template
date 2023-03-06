import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const pestApi = createApi({
    reducerPath: "pestApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/pests/"
    }),
    endpoints: (builder) => ({
        getAllPests: builder.query({
            query: () => ({
                url: "getAll",
                params: {},
                method: "GET",
            }),
        }),
        getPestInfoDescription: builder.query({
            query: (id) => ({
                url: `getDescription/${id}`,
                params: {},
                method: "GET",
                providesTags: (result) => [
                    { type: 'PestInfoDescription', id: 'List' },
                    ...result?.map((PestInfoDescription) => ({ type: 'PestInfoDescription', id: PestInfoDescription.id })),
                ],
            }),
        }),
        createPestInfoDescription: builder.mutation({
            query: (formData) => ({
                url: `createDescription`,
                body: formData,
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                invalidatesTags: [{ type: 'PestInfoDescription', id: 'List' }, { type: 'PestInfoDescription', id: (id) => id }],
            }),
        }),
        updatePestInfoDescription: builder.mutation({
            query: (data) => ({
                url: `updateDescription`,
                body: data,
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data"
                },

                invalidatesTags: [{ type: 'PestInfoDescription', id: 'List' }, { type: 'PestInfoDescription', id: (id) => id }],
            }),
        }),
        deletePestInfoDescription: builder.mutation({
            query: (id) => ({
                url: `deleteDescription/${id}`,
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                invalidatesTags: [{ type: 'PestInfoDescription', id: 'List' }, { type: 'PestInfoDescription', id: (id) => id }],
            }),
        }),
        onError: (error) => {
            console.error('An error occurred in the API:', error);
            // Handle the error here
        },
        // getSpecificCrop: builder.query({
        //     query: () => ({
        //         url: "getspecific",
        //         params: {},
        //         method: "GET",
        //     }),
        // }),
        // createPest: builder.mutation({
        //     query: (crop) => ({
        //         url: "create",
        //         body: crop,
        //         method: "POST",
        //     }),
        // }),
        // updatePestDescription: builder.mutation({
        //     query: (comment) => ({
        //         url: `updatedescription/${comment.id}`,
        //         body: comment,
        //         method: "PUT",
        //     }),
        // }),
        // deletePest: builder.mutation({
        //     query: (id) => ({
        //         url: `DeleteCrop/${id}`,
        //         body: id,
        //         method: "DELETE",
        //     }),
        // }),
    }),
});


export const { useUpdatePestInfoDescriptionMutation, useDeletePestInfoDescriptionMutation, useGetPestInfoDescriptionQuery, useGetAllPestsQuery, useCreatePestInfoDescriptionMutation } = pestApi;