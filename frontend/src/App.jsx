import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [recommendations, setRecommendations] = useState({}); // Store AI results by task ID
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const empRes = await axios.get('http://localhost:8080/api/employees');
      const taskRes = await axios.get('http://localhost:8080/api/tasks');
      setEmployees(empRes.data);
      setTasks(taskRes.data);
      setLoading(false);
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setLoading(false);
    }
  };

  // The AI Magic Function
  const handleGetRecommendations = async (task) => {
    try {
      const res = await axios.post('http://localhost:8080/api/tasks/recommendations', task);
      // Store result mapped to this specific task ID
      setRecommendations({ ...recommendations, [task.id]: res.data });
    } catch (error) {
      console.error("AI Error:", error);
      alert("Failed to get AI suggestions.");
    }
  };

  const handleAssign = async (taskId, employeeId) => {
    try {
      await axios.put(`http://localhost:8080/api/tasks/${taskId}/assign/${employeeId}`);
      alert("Task Assigned Successfully! ✅");
      fetchData(); // Refresh data
      setRecommendations({ ...recommendations, [taskId]: null }); // Clear suggestions
    } catch (error) {
      alert("Assignment failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">SmartStaff Manager 🤖</h1>
          <p className="text-gray-600">AI-Powered Resource Allocation System</p>
        </div>
        <button onClick={fetchData} className="text-indigo-600 hover:underline">Refresh Data 🔄</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Employees Column */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">👥 Employees</h2>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-bold px-2.5 py-0.5 rounded">
              Total: {employees.length}
            </span>
          </div>
          
          <div className="space-y-3">
            {employees.map(emp => (
              <div key={emp.id} className="border border-gray-200 p-3 rounded hover:bg-gray-50 transition">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-700">{emp.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">{emp.role}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {emp.skills?.map(skill => (
                    <span key={skill} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full border border-blue-100">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-400 flex justify-between border-t pt-2">
                  <span>Load: {emp.activeTaskCount} tasks</span>
                  <span>Rating: ⭐ {emp.performanceRating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Column */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Active Tasks</h2>

          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="border border-gray-200 p-4 rounded-lg shadow-sm border-l-4 border-l-indigo-500 bg-white">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg text-gray-800">{task.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded font-bold ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {task.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                <div className="mt-2">
                   <span className="text-xs font-semibold text-gray-500">Required: </span>
                   {task.requiredSkills?.join(", ")}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {task.status}
                  </span>
                  
                  {/* AI Button - Only show if pending */}
                  {task.status === 'Pending' && !recommendations[task.id] && (
                    <button 
                      onClick={() => handleGetRecommendations(task)}
                      className="text-xs bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-3 py-1.5 rounded shadow hover:opacity-90 transition flex items-center gap-1"
                    >
                      ✨ Auto-Assign (AI)
                    </button>
                  )}
                </div>

                {/* AI Recommendations Area */}
                {recommendations[task.id] && (
                  <div className="mt-4 bg-purple-50 p-3 rounded border border-purple-100 animate-fade-in">
                    <p className="text-xs font-bold text-purple-800 mb-2 uppercase tracking-wide">AI Recommendations:</p>
                    <div className="space-y-2">
                      {recommendations[task.id].map((rec, index) => (
                        <div key={rec.employee.id} className="flex justify-between items-center bg-white p-2 rounded border border-purple-100">
                          <div>
                            <p className="text-sm font-bold text-gray-700">{rec.employee.name}</p>
                            <p className="text-xs text-gray-500">Match Score: <span className="text-green-600 font-bold">{rec.score.toFixed(1)}%</span></p>
                          </div>
                          <button 
                            onClick={() => handleAssign(task.id, rec.employee.id)}
                            className="text-xs bg-indigo-600 text-white px-2 py-1 rounded hover:bg-indigo-700"
                          >
                            Select
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;