"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

type Task = {
  id: string;
  task: string;
  user_id: string;
};

export default function Todo() {
  const session = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true });

      if (error) console.error(error);
      else setTasks(data || []);
    };

    fetchTasks();
  }, [session, router]);

  const addTask = async () => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task: newTask, user_id: session!.user.id }]);

    if (error) console.error(error);
    else setTasks([...tasks, ...(data || [])]);
    setNewTask('');
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);

    if (error) console.error(error);
    else setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.task}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
