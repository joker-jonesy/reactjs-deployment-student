import { Routes, Route, Link } from 'react-router-dom';
import TaskList from './pages/TaskList.jsx';
import TaskForm from './pages/TaskForm.jsx';

export default function App() {
  return (
    <div className="container">
      <header>
        <h1><Link to="/">Tasks</Link></h1>
        <Link className="btn" to="/new">+ New task</Link>
      </header>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/new" element={<TaskForm />} />
        <Route path="/tasks/:id" element={<TaskForm />} />
        <Route path="*" element={<p>Page not found.</p>} />
      </Routes>
    </div>
  );
}
