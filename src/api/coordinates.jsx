import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const coordinatesApi = createApi({
    reducerPath: "coordinates",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/coordinates/"
    }),
    endpoints: (builder) => ({
        createCoordinates: builder.mutation({
            query: (coordinates) => ({
                url: "create",
                body: coordinates,
                headers: { "Content-Type": 'application/json;charset=UTF-8' },
                method: "POST",
            }),
        }),
    }),
});


export const { useCreateCoordinatesMutation } = coordinatesApi;