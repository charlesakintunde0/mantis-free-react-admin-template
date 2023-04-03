import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const weedApi = createApi({
    reducerPath: "weedApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/weeds/"
    }),
    endpoints: (builder) => ({
        getAllWeeds: builder.query({
            query: () => ({
                url: "getAll",
                params: {},
                method: "GET",
            })
            , providesTags: (result) => [
                { type: 'Weed', id: 'List' },
                ...result?.map((Weed) => ({ type: 'Weed', id: Weed.id })),
            ],
        }),
        createWeed: builder.mutation({
            query: (disease) => ({
                url: "create",
                body: disease,
                method: "POST",
            }),
            invalidatesTags: [{ type: 'Weed', id: 'List' },
            { type: 'Weed', id: (id) => id }],
        }),
        updateWeed: builder.mutation({
            query: (weed) => ({
                url: `updateWeed`,
                body: weed,
                method: "PUT",
            }),
            invalidatesTags: [{ type: 'Weed', id: 'List' },
            { type: 'Weed', id: (id) => id }],
        }),
        onError: (error) => {
            console.error('An error occurred in the API:', error);
            // Handle the error here
        },
        deleteWeed: builder.mutation({
            query: (id) => ({
                url: `deleteWeed/${id}`,
                body: id,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Weed', id: 'List' },
            { type: 'Weed', id: (id) => id }],
        }),
        deleteUploadedImage: builder.mutation({
            query: (id) => ({
                url: `deleteUploadedImage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Weed', id: 'List' },
            { type: 'Weed', id: (id) => id }],
        }),


        /// DiseaseInfoDescription
        createWeedInfoDescription: builder.mutation({
            query: (formData) => {
                return {
                    url: '/createDescription',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: [
                { type: 'WeedInfoDescription', id: 'List' },
                { type: 'WeedInfoDescription', id: (id) => id },
            ],
        }),

        updateWeedInfoDescription: builder.mutation({
            query: (data) => ({
                url: `updateDescription`,
                body: data,
                method: "PUT",
            }),
            invalidatesTags: [{ type: 'WeedInfoDescription', id: 'List' },
            { type: 'WeedInfoDescription', id: (id) => id }],
        }),
        deleteWeedInfoDescription: builder.mutation({
            query: (id) => ({
                url: `deleteDescription/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'WeedInfoDescription', id: 'List' },
            { type: 'WeedInfoDescription', id: (id) => id }],
        }),
        onError: (error) => {
            console.error('An error occurred in the API:', error);
            // Handle the error here
        },
        deleteUploadedImageInWeedInfoDescription: builder.mutation({
            query: (id) => ({
                url: `deleteUploadedImage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'WeedInfoDescription', id: 'List' },
            { type: 'WeedInfoDescription', id: (id) => id }],
        }),
        getWeedInfoDescription: builder.query({
            query: (diseaseId) => ({
                url: `getDescription/${diseaseId}`,
                params: {},
                method: "GET",

            }),
            providesTags: (result) => [
                { type: 'WeedInfoDescription', id: 'List' },
                ...result?.map((WeedInfoDescription) => (
                    { type: 'WeedInfoDescription', id: WeedInfoDescription.id })),
            ],
        }),

    }),
});


export const { useGetAllWeedsQuery, useDeleteUploadedImageInWeedInfoDescriptionMutation, useDeleteUploadedImageMutation, useDeleteWeedInfoDescriptionMutation, useUpdateWeedInfoDescriptionMutation, useCreateWeedMutation, useUpdateWeedMutation, useDeleteWeedMutation, useGetWeedInfoDescriptionQuery, useCreateWeedInfoDescriptionMutation } = weedApi;