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
        getPestDescription: builder.query({
            query: () => ({
                url: "getDescription",
                params: {},
                method: "GET",
            }),
        }),
        getSpecificCrop: builder.query({
            query: () => ({
                url: "getspecific",
                params: {},
                method: "GET",
            }),
        }),
        createPest: builder.mutation({
            query: (crop) => ({
                url: "create",
                body: crop,
                method: "POST",
            }),
        }),
        updatePestDescription: builder.mutation({
            query: (comment) => ({
                url: `updatedescription/${comment.id}`,
                body: comment,
                method: "PUT",
            }),
        }),
        deletePest: builder.mutation({
            query: (id) => ({
                url: `DeleteCrop/${id}`,
                body: id,
                method: "DELETE",
            }),
        }),
    }),
});


export const { useGetPestDescriptionQuery,useGetSpecificCropQuery ,useGetAllPestsQuery, useDeletePestMutation, useCreatePestMutation,  } = pestApi;