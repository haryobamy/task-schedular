import { apiSlice } from '../slices/apiSlice';

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder: TAppEndpointBuilder) => ({
    //create task
    createTask: builder.mutation<ApiResponse<any>, ITask>({
      query: (data: ITask) => ({
        url: 'task',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Tasks'],
    }),

    //get tasks
    getTasks: builder.query<ApiResponse<ITask[]>, unknown>({
      query: () => ({
        url: 'tasks',
        method: 'GET',
      }),

      providesTags: ['Tasks'],

      async onQueryStarted(_arg: unknown, { dispatch, queryFulfilled }: any) {
        try {
          const res = await queryFulfilled;
          // const result = res?.data;
          console.log({ res });
          // if (result?.status === true) {
          // }
        } catch (error: any) {
          console.log({ error });
        }
      },
    }),

    //update task
    updateTask: builder.mutation<ApiResponse<any>, string>({
      query: (data: ITask) => ({
        url: `task/${data._id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    //delete task
    deleteTask: builder.mutation<ApiResponse<any>, string>({
      query: (id: string) => ({
        url: `task/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Tasks'],
    }),

    //  logs
    getLogs: builder.query<ApiResponse<any>, string>({
      query: () => ({
        url: `logs`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useLazyGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetLogsQuery,
  useLazyGetLogsQuery,
} = taskApi;
