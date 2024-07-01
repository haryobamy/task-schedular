import { useCallback, useEffect } from 'react';
import * as z from 'zod';
import { RadioInput, Button, TextInput, SelectInput } from '../ui';
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from '../../lib/redux/tasks/taskApi';
import { useForm } from 'react-hook-form';
import { If, Then, Else } from 'react-if';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useAppSelector } from '../../lib/redux/store';

const TaskSchema = z
  .object({
    name: z.string().min(1, 'Task name is required'),
    type: z.enum(['one-time', 'recurring']),
    cron: z.string().min(1, 'Cron field is required'),
    time: z.date().min(new Date(), 'Can not be before now').optional(),
  })
  .refine(
    ({ type, time }) =>
      type === 'one-time' ? time !== undefined && time >= new Date() : true,
    {
      message: 'Time is required for one-time tasks and must be in the future',
      path: ['time'],
    }
  );

function TaskForm() {
  const { selectedTask } = useAppSelector((state) => state?.task);
  const [createTask, { isLoading, isSuccess, error, data }] =
    useCreateTaskMutation();
  const [
    updateTask,
    {
      isSuccess: isSuccessUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateTaskMutation();

  const {
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITask>({
    defaultValues: {
      name: '',
      type: 'recurring',
      time: new Date(Date.now() + 5 * 60 * 1000), //  5 minute from now
      cron: '0 0 * * *',
    },
    resolver: zodResolver(TaskSchema),
    mode: 'all',
  });

  console.log(errors);

  const onSubmit = useCallback(
    async (value: ITask) => {
      try {
        const { cron, ...oneTimePayload } = value;

        const { time, ...recurringPayload } = value;

        const payload =
          value.type === 'one-time' ? oneTimePayload : recurringPayload;
        console.log(payload);
        if (selectedTask !== null) {
          await updateTask(payload);
        } else {
          await createTask(payload);
        }

        reset();
      } catch (error) {
        console.error('Error scheduling task', error);
      }
    },
    [createTask, updateTask]
  );

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || 'Tasks created successful';
      toast.success(message);
    }
    if (error) {
      if ('data' in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }

    if (isSuccessUpdate) {
      const message = data?.message || 'Tasks updated successful';
      toast.success(message);
    }

    if (errorUpdate) {
      if ('data' in errorUpdate) {
        const errorData = errorUpdate as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [isSuccess, error, isSuccessUpdate, errorUpdate]);

  useEffect(() => {
    if (selectedTask) {
      console.log({ selectedTask });
      setValue('name', selectedTask.name);
      setValue('type', selectedTask.type);
      setValue('cron', selectedTask.cron);
      setValue('time', selectedTask.time);
    }
  }, [selectedTask]);

  const generateCronOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const hourStr = hour.toString().padStart(2, '0');
        const minuteStr = minute.toString().padStart(2, '0');
        const cronExpression = `${minute} ${hour} * * *`;
        options.push({
          label: `${hourStr}:${minuteStr}`,
          value: cronExpression,
        });
      }
    }
    return options;
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" max-w-2xl px-8 py-16 rounded-xl mx-auto my-16 space-y-4 bg-slate-200  "
    >
      <div className="flex gap-4">
        <RadioInput
          label="One-Time"
          checked={watch('type') === 'one-time'}
          value={watch('type')}
          onChange={() => setValue('type', 'one-time')}
        />
        <RadioInput
          label="Recurring"
          checked={watch('type') === 'recurring'}
          value={watch('type')}
          onChange={() => setValue('type', 'recurring')}
        />
      </div>

      <If condition={watch('type') === 'one-time'}>
        <Then>
          <TextInput
            label="Time"
            type="datetime-local"
            placeholder="Select Date and Time"
            onChange={(e) => setValue('time', new Date(e.target.value))}
            error={errors.time?.message}
            value={watch('time')?.toString()}
          />
        </Then>
        <Else>
          <SelectInput
            value={watch('cron')}
            placeholder="0 0 * * *"
            label="Cron"
            selectItems={generateCronOptions()}
            onChange={(e) => setValue('cron', e.target.value)}
            error={errors.cron?.message}
          />
        </Else>
      </If>

      <TextInput
        label="Task"
        type="text"
        value={watch('name')}
        placeholder="echo Hello World"
        onChange={(e) => setValue('name', e.target.value)}
        error={errors.name?.message}
      />

      <Button type="submit" disabled={isLoading}>
        <If condition={!isLoading && selectedTask === null}>
          <Then>{!isLoading ? 'Schedule Task' : 'Creating...'}</Then>
          <Else>{!isLoading ? 'Update' : 'Updating...'}</Else>
        </If>
      </Button>
    </form>
  );
}

export default TaskForm;
