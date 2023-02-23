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
        // createCrops: builder.mutation({
        //     query: (crop) => ({
        //         url: "create",
        //         body: crop,
        //         method: "POST",
        //     }),
        // }),
        // updateCrop: builder.mutation({
        //     query: (crop) => ({
        //         url: `DeleteCrop/${crop.id}`,
        //         body: crop,
        //         method: "PUT",
        //     }),
        // }),
        // deleteCrop: builder.mutation({
        //     query: (id) => ({
        //         url: `DeleteCrop/${id}`,
        //         body: id,
        //         method: "DELETE",
        //     }),
        // }),
    }),
});


export const { useGetAllCropsQuery } = cropApi;