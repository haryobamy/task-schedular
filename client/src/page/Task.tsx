import TaskForm from '../components/Task/TaskForm';
import TaskList from '../components/Task/TaskList';
import ExecutionLogs from '../components/Task/ExecutionLogs';

function Task() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl text-center font-bold ">
        Distributed Task Scheduler
      </h1>
      <TaskForm />
      <TaskList />
      <ExecutionLogs />
    </div>
  );
}

export default Task;
