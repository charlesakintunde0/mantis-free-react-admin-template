
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const cropsPestApi = createApi({
    reducerPath: "cropsPestApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/cropsPests/"
    }),
    endpoints: (builder) => ({
        getCropsPests: builder.query({
            query: () => ({
                url: "getAll",
                params: {},
                method: "GET",
            }),
        }),
        createCropPest: builder.mutation({
            query: (comment) => ({
                url: "create",
                body: comment,
                method: "POST",
            }),
        }),
        deleteCropPest: builder.mutation({
            query: (id) => ({
                url: `DeletePest/${id}`,
                body: id,
                method: "DELETE",
            }),
        }),
    }),
});


export const { useCreateCropsPestMutation, useDeleteCropPestMutation } = cropsPestApi;