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
        getCropsPest: builder.query({
            query: (id) => ({
                url: `getPests/${id}`,
                method: "GET"
            }),
            providesTags: (result) => [
                { type: 'Pest', id: 'List' },
                ...result?.map((Pest) => ({ type: 'Pest', id: Pest.id })),
            ],
        }),
        createPest: builder.mutation({
            query: (pest) => ({
                url: "create",
                body: pest,
                method: "POST",
            }),
            invalidatesTags: [{ type: 'Pest', id: 'List' },
            { type: 'Pest', id: (id) => id }],
        }),
        updatePest: builder.mutation({
            query: (pest) => ({
                url: `updatePest`,
                body: pest,
                method: "PUT",
            }),
            invalidatesTags: [{ type: 'Pest', id: 'List' },
            { type: 'Pest', id: (id) => id }],
        }),
        deletePest: builder.mutation({
            query: (id) => ({
                url: `deletePest/${id}`,
                body: id,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Pest', id: 'List' },
            { type: 'Pest', id: (id) => id }],
        }),
        deleteUploadedImage: builder.mutation({
            query: (id) => ({
                url: `deleteUploadedImage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Pest', id: 'List' },
            { type: 'Pest', id: (id) => id }],
        }),

        // Pest Info Description
        getPestInfoDescription: builder.query({
            query: (pestId) => ({
                url: `getDescription/${pestId}`,
                params: {},
                method: "GET",

            }),
            providesTags: (result) => [
                { type: 'PestInfoDescription', id: 'List' },
                ...result?.map((PestInfoDescription) => ({ type: 'PestInfoDescription', id: PestInfoDescription.id })),
            ],
        }),
        createPestInfoDescription: builder.mutation({
            query: (formData) => {

                return {
                    url: '/createDescription',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: [
                { type: 'PestInfoDescription', id: 'List' },
                { type: 'PestInfoDescription', id: (id) => id },
            ],
        }),

        updatePestInfoDescription: builder.mutation({
            query: (data) => ({
                url: `updateDescription`,
                body: data,
                method: "PUT",
            }),
            invalidatesTags: [{ type: 'PestInfoDescription', id: 'List' }, { type: 'PestInfoDescription', id: (id) => id }],
        }),

        deletePestInfoDescription: builder.mutation({
            query: (id) => ({
                url: `deleteDescription/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'PestInfoDescription', id: 'List' }, { type: 'PestInfoDescription', id: (id) => id }],
        }),
        deleteUploadedImage: builder.mutation({
            query: (id) => ({
                url: `deleteUploadedImage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'PestInfoDescription', id: 'List' }, { type: 'PestInfoDescription', id: (id) => id }],
        }),
        deleteUploadedImageInPestInfoDescription: builder.mutation({
            query: (id) => ({
                url: `deleteUploadedImage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'PestInfoDescription', id: 'List' },
            { type: 'PestInfoDescription', id: (id) => id }],
        }),
    }),
});


export const { useDeleteUploadedImageInPestInfoDescriptionMutation, useUpdatePestInfoDescriptionMutation, useDeletePestInfoDescriptionMutation, useGetPestInfoDescriptionQuery, useGetAllPestsQuery, useCreatePestInfoDescriptionMutation, useGetCropsPestQuery, useCreatePestMutation, useUpdatePestMutation, useDeletePestMutation, useDeleteUploadedImageMutation } = pestApi;