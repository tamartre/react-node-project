
import apiSlice from "../../app/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: "/api/user",
                method: "GET",

            }),
            providesTags: ["Users"]
        }),
        updateUser: build.mutation({
            query: (user) => ({
                url: "/api/user",
                method: "PUT",
                body: user
            })
        }),
    })
})
export const { useGetAllUsersQuery, useUpdateUserMutation } = userApiSlice

