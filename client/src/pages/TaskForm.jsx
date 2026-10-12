import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TaskContext.jsx';

export default function TaskForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { tasks, loading, addTask, editTask } = useTasks();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  const existing = tasks.find((t) => t.id === Number(id));
  useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setNotes(existing.notes);
    }
  }, [existing]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isEdit) await editTask(Number(id), { title, notes });
      else await addTask({ title, notes });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  }

  if (isEdit && loading) return <p>Loading…</p>;
  if (isEdit && !existing) return <p>Task not found.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Edit task' : 'New task'}</h2>
      {error && <p className="error">{error}</p>}
      <label>Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
      </label>
      <label>Notes
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} />
      </label>
      <button className="btn" type="submit">{isEdit ? 'Save' : 'Create'}</button>
    </form>
  );
}
