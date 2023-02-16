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
            }),
        }),
        // createPest: builder.mutation({
        //     query: (crop) => ({
        //         url: "create",
        //         body: crop,
        //         method: "POST",
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


export const { useGetAllWeedsQuery } = weedApi;