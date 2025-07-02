import { useEffect, useState } from 'react';
import { auth, signOut } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = "https://todo-backend-production-a839.up.railway.app/api/tasks";

function TodoDashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('todo');
  const [editId, setEditId] = useState(null);

  // Fetch tasks from backend on load
  useEffect(() => {
    axios.get(API).then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if (!input.trim()) return;
    const res = await axios.post(API, { text: input, status });
    setTasks([...tasks, res.data]);
    setInput('');
    setStatus('todo');
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;
    await axios.delete(`${API}/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setInput(task.text);
    setStatus(task.status);
  };

  const updateTask = async () => {
    const res = await axios.put(`${API}/${editId}`, { text: input, status });
    setTasks(tasks.map(t => (t._id === editId ? res.data : t)));
    setEditId(null);
    setInput('');
    setStatus('todo');
  };

  const updateStatus = async (id, newStatus) => {
    const task = tasks.find(t => t._id === id);
    const res = await axios.put(`${API}/${id}`, { ...task, status: newStatus });
    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6">
      <div className="max-w-xl mx-auto bg-white rounded-lg p-6 shadow-md text-black">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Todo List with Progress</h2>
            <h3 className="text-sm text-gray-600">Hello, {user?.displayName} 👋</h3>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-3 py-2 border rounded"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-2 rounded"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          <button
            onClick={editId ? updateTask : addTask}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            {editId ? 'Update' : 'Add'}
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-purple-100 rounded p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{task.text}</p>
                <p className="text-sm italic text-gray-700">
                  {task.status === 'todo'
                    ? '📝 To Do'
                    : task.status === 'in-progress'
                    ? '⏳ In Progress'
                    : '✅ Done'}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={task.status}
                  onChange={(e) => updateStatus(task._id, e.target.value)}
                  className="text-sm border rounded px-1"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <button
                  onClick={() => startEdit(task)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoDashboard;
