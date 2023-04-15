import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const diseasesApi = createApi({
    reducerPath: "diseasesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/diseases/"
    }),
    endpoints: (builder) => ({
        getAllDiseases: builder.query({
            query: () => ({
                url: "getAll",
                params: {},
                method: "GET",
            }),
        }),
        getCropsDisease: builder.query({
            query: (id) => ({
                url: `getDiseases/${id}`,
                params: {},
                method: "GET"
            }), providesTags: (result) => [
                { type: 'Disease', id: 'List' },
                ...result?.map((Disease) => ({ type: 'Disease', id: Disease.id })),
            ],
        }),
        createDisease: builder.mutation({
            query: (disease) => ({
                url: "create",
                body: disease,
                method: "POST",
            }),
            invalidatesTags: [{ type: 'Disease', id: 'List' },
            { type: 'Disease', id: (id) => id }],
        }),
        updateDisease: builder.mutation({
            query: (crop) => ({
                url: `updateDisease`,
                body: crop,
                method: "PUT",
            }),
            invalidatesTags: [{ type: 'Disease', id: 'List' },
            { type: 'Disease', id: (id) => id }],
        }),
        deleteDisease: builder.mutation({
            query: (id) => ({
                url: `deleteDisease/${id}`,
                body: id,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Disease', id: 'List' },
            { type: 'Disease', id: (id) => id }],
        }),
        deleteUploadedImage: builder.mutation({
            query: (id) => ({
                url: `deleteUploadedImage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'Disease', id: 'List' },
            { type: 'Disease', id: (id) => id }],
        }),


        /// DiseaseInfoDescription
        createDiseaseInfoDescription: builder.mutation({
            query: (formData) => {
                return {
                    url: '/createDescription',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: [
                { type: 'DiseaseInfoDescription', id: 'List' },
                { type: 'DiseaseInfoDescription', id: (id) => id },
            ],
        }),

        updateDiseaseInfoDescription: builder.mutation({
            query: (data) => ({
                url: `updateDescription`,
                body: data,
                method: "PUT",
            }),
            invalidatesTags: [{ type: 'DiseaseInfoDescription', id: 'List' },
            { type: 'DiseaseInfoDescription', id: (id) => id }],
        }),
        deleteDiseaseInfoDescription: builder.mutation({
            query: (id) => ({
                url: `deleteDescription/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'DiseaseInfoDescription', id: 'List' },
            { type: 'DiseaseInfoDescription', id: (id) => id }],
        }),
        onError: (error) => {
            console.error('An error occurred in the API:', error);
            // Handle the error here
        },
        deleteUploadedImageInDiseaseInfoDescription: builder.mutation({
            query: (id) => ({
                url: `deleteUploadedImage/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{ type: 'DiseaseInfoDescription', id: 'List' },
            { type: 'DiseaseInfoDescription', id: (id) => id }],
        }),
        onError: (error) => {
            console.error('An error occurred in the API:', error);
            // Handle the error here
        },
        getDiseaseInfoDescription: builder.query({
            query: (diseaseId) => ({
                url: `getDescription/${diseaseId}`,
                params: {},
                method: "GET",

            }),
            providesTags: (result) => [
                { type: 'DiseaseInfoDescription', id: 'List' },
                ...result?.map((DiseaseInfoDescription) => (
                    { type: 'DiseaseInfoDescription', id: DiseaseInfoDescription.id })),
            ],
        }),


    }),
});


export const { useGetAllDiseasesQuery, useDeleteUploadedImageInDiseaseInfoDescriptionMutation, useDeleteUploadedImageMutation, useDeleteDiseaseInfoDescriptionMutation, useUpdateDiseaseInfoDescriptionMutation, useGetCropsDiseaseQuery, useCreateDiseaseMutation, useUpdateDiseaseMutation, useDeleteDiseaseMutation, useGetDiseaseInfoDescriptionQuery, useCreateDiseaseInfoDescriptionMutation } = diseasesApi;