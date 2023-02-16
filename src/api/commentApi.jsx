import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:44361/api/comments/"
    }),
    endpoints: (builder) => ({
        getAllComments: builder.query({
            query: () => ({
                url: "getAll",
                params: {},
                method: "GET",
            }),
        }),
        getReplies: builder.query({
            query: () => ({
                url: "getreplies",
                params: {},
                method: "GET",
            }),
        }),
        postComment: builder.mutation({
            query: (comment) => ({
                url: "postComment",
                body: comment,
                method: "POST",
            }),
        }),
        postReply: builder.mutation({
            query: (comment) => ({
                url: "postReply",
                body: comment,
                method: "POST",
            }),
        }),
        updateCommentImages: builder.mutation({
            query: (comment) => ({
                url: `UpdateCommentImages/${comment.id}`,
                body: comment,
                method: "PUT",
            }),
        }),
        deleteComment: builder.mutation({
            query: (id) => ({
                url: `DeleteCrop/${id}`,
                body: id,
                method: "DELETE",
            }),
        }),
    }),
});


export const {useUpdateCommentImagesMutation, useGetAllCommentsQuery, useGetRepliesQuery, useDeleteCommentMutation, usePostCommentMutation, useUpdateCommentMutation, usePostReplyMutation } = commentApi;