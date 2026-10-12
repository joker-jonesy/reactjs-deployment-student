import { Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskItem({ task }) {
  const { editTask, removeTask } = useTasks();

  return (
    <li className={task.done ? 'task done' : 'task'}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => editTask(task.id, { done: !task.done })}
      />
      <div className="grow">
        <Link to={`/tasks/${task.id}`}>{task.title}</Link>
        {task.notes && <small>{task.notes}</small>}
      </div>
      <button className="btn danger" onClick={() => removeTask(task.id)}>Delete</button>
    </li>
  );
}
