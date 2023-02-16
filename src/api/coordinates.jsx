import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const coordinatesApi = createApi({
    reducerPath: "coordinates",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/coordinates/"
    }),
    endpoints: (builder) => ({
        createCoordinates: builder.query({
            query: (coordinates) => ({
                url: "create",
                body: coordinates,
                method: "POST",
            }),
        }),
    }),
});


export const { use } = coordinatesApi;