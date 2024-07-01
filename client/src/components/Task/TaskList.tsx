import { useCallback, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { TQueryActionCreatorResult } from '../../lib/redux/slices/apiSlice';

import { Else, If, Then } from 'react-if';
import { Button } from '../ui';
import {
  useDeleteTaskMutation,
  useLazyGetTasksQuery,
} from '../../lib/redux/tasks/taskApi';
import { useAppDispatch } from '../../lib/redux/store';
import { selectedTask } from '../../lib/redux/tasks/taskSlice';

function TaskList() {
  const dispatch = useAppDispatch();
  const [getTasks, { isFetching, data, isSuccess, error }] =
    useLazyGetTasksQuery();

  const [
    deleteTask,
    {
      isLoading: DeletingTask,
      isSuccess: isDeletingSuccess,
      error: deleteError,
    },
  ] = useDeleteTaskMutation();

  const triggerRef = useRef<TQueryActionCreatorResult>();

  const getAllTasks = useCallback(() => {
    if (triggerRef.current) {
      triggerRef.current.abort();
    }

    triggerRef.current = getTasks({});
  }, [getTasks]);

  useEffect(() => {
    getAllTasks();
  }, [getAllTasks]);

  useEffect(() => {
    if (isSuccess && !isDeletingSuccess) {
      const message = data?.message || 'Tasks retrieved successful';
      toast.success(message);
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }

    if (isDeletingSuccess) {
      const message = 'Task deleted successful';
      toast.success(message);
    }

    if (deleteError) {
      if ('data' in deleteError) {
        const errorData = deleteError as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error, isDeletingSuccess, deleteError]);

  console.log(data);

  return (
    <div>
      <h2 className="text-2xl text-center  mb-4  font-bold ">
        Scheduled Tasks
      </h2>
      <If condition={data?.length === 0}>
        <Then>
          <p className="text-center text-lg ">No tasks found</p>
        </Then>
        <Else>
          <ul className="grid grid-cols-3 gap-4">
            {!isFetching &&
              data?.map((task: ITask) => (
                <li
                  key={task._id}
                  className="bg-gray-500 rounded-lg  h-full flex  flex-col  gap-4  p-4"
                >
                  <h2 className="text-lg">
                    Name:{' '}
                    <span className="text-white text-base capitalize">
                      {task.name}
                    </span>
                  </h2>
                  <h6>
                    <If condition={task.type === 'one-time'}>
                      <Then>Time: {new Date(task.time).toLocaleString()}</Then>
                      <Else>
                        <Then>Cron: {task.cron}</Then>
                      </Else>
                    </If>
                  </h6>
                  <If condition={task.executed}>
                    <span>
                      Executed:{' '}
                      {new Date(task?.executedAt as Date).toLocaleString()}
                    </span>
                  </If>

                  <div className="flex gap-4 items-center">
                    <Button
                      className="bg-red-400  p-2"
                      onClick={() => deleteTask(task._id)}
                    >
                      {DeletingTask ? 'Deleting...' : 'Delete'}
                    </Button>
                    <Button
                      className="p-2"
                      onClick={() => dispatch(selectedTask(task))}
                    >
                      Edit
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        </Else>
      </If>
    </div>
  );
}

export default TaskList;
