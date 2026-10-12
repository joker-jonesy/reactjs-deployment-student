import { useTasks } from '../context/TaskContext.jsx';
import TaskItem from '../components/TaskItem.jsx';

export default function TaskList() {
  const { tasks, loading, error } = useTasks();

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="error">Could not load tasks: {error}</p>;
  if (tasks.length === 0) return <p>No tasks yet. Add one!</p>;

  return (
    <ul className="tasks">
      {tasks.map((task) => <TaskItem key={task.id} task={task} />)}
    </ul>
  );
}
