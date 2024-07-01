import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: TaskState = {
  selectedTask: null,
  logs: null,
};

const taskSlice = createSlice({
  name: 'Tasks',
  initialState,
  reducers: {
    selectedTask(state: TaskState, { payload }: PayloadAction<ITask>) {
      state.selectedTask = payload;
    },
    setLogs: (state, { payload }: PayloadAction<any>) => {
      state.logs = payload;
    },
  },
});

export const { selectedTask, setLogs } = taskSlice.actions;

export default taskSlice.reducer;
