import { MessageResponse, UserResponse } from "./../../types/userapi.d";
import { User } from "../../types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
//mutation: create, update, delete
//query: read

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKENDSERVER_URL}/api/v1/user`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<MessageResponse, User>({
      query: (user) => ({
        url: "new",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const getUser = async (id: string) => {
  try {
    const { data }: { data: UserResponse } = await axios.get(
      `${import.meta.env.VITE_BACKENDSERVER_URL}/api/v1/user/${id}`
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const { useLoginMutation } = userAPI;
