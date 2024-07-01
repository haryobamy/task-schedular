type TAppEndpointBuilder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  TApiTag,
  'api'
>;

type ITask = {
  _id?: string;
  name: string;
  type: 'one-time' | 'recurring';
  time: Date;
  cron: string;
  executed?: boolean;
  executedAt?: Date;
};

type TaskState = {
  selectedTask: ITask | null;
  logs: any;
};

type ApiResponse<T> = {
  message: string;
  status: boolean;
  data: T;
};
