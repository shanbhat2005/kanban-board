import { useState } from 'react'

function TaskForm({
  onAddTask,
  onUpdateTask,
  onCancel,
  updateTask = false,
  updatedData = {},
}) {
  const [taskData, setTaskData] = useState({
    title: updateTask ? updatedData.title ?? '' : '',
    priority: updateTask ? updatedData.priority ?? 'Medium' : 'Medium',
    status: updateTask ? updatedData.status ?? 'Todo' : 'Todo',
  })

  const addTask = (event) => {
    event.preventDefault()

    if (updateTask) {
      onUpdateTask(updatedData.id, taskData)
    } else {
      onAddTask(taskData)
    }
  }

  return (
    <section className="mx-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/[0.03] sm:p-8">
      <div className="mb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
          {updateTask ? 'Edit task' : 'New task'}
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {updateTask ? 'Update task' : 'Add a task'}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Give your task a title, priority, and status.
        </p>
      </div>

      <form onSubmit={addTask} className="space-y-5">
        <div>
          <label
            htmlFor="task-title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Title
          </label>
          <input
            id="task-title"
            type="text"
            value={taskData.title}
            onChange={(event) =>
              setTaskData({ ...taskData, title: event.target.value })
            }
            placeholder="e.g. Prepare project presentation"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="task-priority"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Priority
            </label>
            <select
              id="task-priority"
              value={taskData.priority}
              onChange={(event) =>
                setTaskData({ ...taskData, priority: event.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="task-status"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Status
            </label>
            <select
              id="task-status"
              value={taskData.status}
              onChange={(event) =>
                setTaskData({ ...taskData, status: event.target.value })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
            >
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-500/10"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
          >
            {updateTask ? 'Save changes' : 'Add task'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm
