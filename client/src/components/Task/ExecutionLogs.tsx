import { useCallback, useEffect, useRef } from 'react';
import { useLazyGetLogsQuery } from '../../lib/redux/tasks/taskApi';
import { TQueryActionCreatorResult } from '../../lib/redux/slices/apiSlice';
import toast from 'react-hot-toast';

function ExecutionLogs() {
  const [getLogs, { isFetching, data, isSuccess, error }] =
    useLazyGetLogsQuery();
  const triggerRef = useRef<TQueryActionCreatorResult>();

  const getAllLogs = useCallback(() => {
    if (triggerRef.current) {
      triggerRef.current.abort();
    }
    triggerRef.current = getLogs({});
  }, [getLogs]);

  useEffect(() => {
    getAllLogs();
  }, [getAllLogs]);

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Logs retrieved successful';
      toast.success(message);
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error]);
  return (
    <div>
      <h2 className="text-2xl text-center  mb-4  font-bold ">Execution Log</h2>
      <ul>
        {data?.map((log: any) => (
          <li key={log.id}>
            {log.task} executed at {log.executionTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExecutionLogs;
