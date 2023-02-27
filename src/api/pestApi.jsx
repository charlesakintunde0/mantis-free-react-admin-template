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
            }),
        }),
        createPestInfoDescription: builder.mutation({
            query: (data) => ({
                url: `createDescription/${data.pestId}`,
                body: data,
                method: "POST",
            }),
        }),
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


export const { useGetPestInfoDescriptionQuery, useGetAllPestsQuery, useCreatePestInfoDescriptionMutation } = pestApi;