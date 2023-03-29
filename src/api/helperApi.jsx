import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const helperApi = createApi({
    reducerPath: "helperApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/helper/"
    }),
    endpoints: (builder) => ({
        getImageFile: builder.query({
            query: (url) => ({
                url: `getImageFile/${url}`,
                params: {},
                method: "GET"
            })
            , providesTags: (result) => [
                { type: 'Image', id: 'List' },
                ...result?.map((Image) => ({ type: 'Image', id: Image.id })),
            ],
        }),
    }),
});


export const { useGetImageFileQuery } = helperApi;