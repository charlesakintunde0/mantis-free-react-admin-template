import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const cropApi = createApi({
    reducerPath: "cropApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/crops/"
    }),
    endpoints: (builder) => ({
        getAllCrops: builder.query({
            query: () => ({
                url: "getAll",
                params: {},
                method: "GET"
            })
            , providesTags: (result) => [
                { type: 'Crop', id: 'List' },
                ...result?.map((Crop) => ({ type: 'Crop', id: Crop.id })),
            ],
        }),
        // getDiseases: builder.query({
        //     query: () => ({
        //         url: "getDiseases",
        //         params: {},
        //         method: "GET",
        //     }),
        // }),
        // getSpecificCrop: builder.query({
        //     query: () => ({
        //         url: "getspecific",
        //         params: {},
        //         method: "GET",
        //     }),
        // }),
        createCrops: builder.mutation({
            query: (crop) => ({
                url: "create",
                body: crop,
                method: "POST",
            }),
            invalidatesTags: [{ type: 'Crop', id: 'List' }, { type: 'Crop', id: (id) => id }],
        }),
        updateCrop: builder.mutation({
            query: (crop) => ({
                url: `updateCrop`,
                body: crop,
                method: "PUT",
            }),
            invalidatesTags: [{ type: 'Crop', id: 'List' }, { type: 'Crop', id: (id) => id }],
        }),
        deleteCrop: builder.mutation({
            query: (id) => ({
                url: `DeleteCrop/${id}`,
                body: id,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Crop', id: 'List' }, { type: 'Crop', id: (id) => id }],
        }),
        deleteUploadedImage: builder.mutation({
            query: (id) => ({
                url: `deleteUploadedImage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Crop', id: 'List' }, { type: 'Crop', id: (id) => id }],
        }),
    }),
});


export const { useDeleteUploadedImageMutation, useGetAllCropsQuery, useCreateCropsMutation, useUpdateCropMutation, useDeleteCropMutation } = cropApi;