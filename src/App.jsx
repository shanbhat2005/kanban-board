import { useState } from 'react'
import Column from './components/Column'
import TaskForm from './components/TaskForm'

const statuses = ['Todo', 'In Progress', 'Completed']


function App() {


const [isFormVisible, setIsFormVisible] = useState(false)
const [cardData, setCardData] = useState([])
const [searchText, setSearchText] = useState('')
const [statusFilter, setStatusFilter] = useState('All')
const [isUpdatingTask, setIsUpdatingTask] = useState(false)
const [updatedData, setUpdatedData] = useState(null)

const visibleStatuses =
  statusFilter === 'All' ? statuses : [statusFilter]

const setDataByStatus = (status) => {
  const tasksForColumn = []
  const searchTextLowerCase = searchText.toLowerCase()

  for (let i = 0; i < cardData.length; i++) {
    const task = cardData[i]

    if (task.status === status) {
      const taskTitleLowerCase = task.title.toLowerCase()
      const titleMatchesSearch = taskTitleLowerCase.includes(searchTextLowerCase)

      if (titleMatchesSearch) {
        tasksForColumn.push(task)
      }
    }
  }

  return tasksForColumn
}

const deleteTask = (taskId) => {
  const remainingTasks = []

  for (let i = 0; i < cardData.length; i++) {
    if (cardData[i].id !== taskId) {
      remainingTasks.push(cardData[i])
    }
  }

  setCardData(remainingTasks)
}

const addTask = (taskValues) => {
  const newTask = {
    ...taskValues,
    id: crypto.randomUUID(),
  }

  setCardData([...cardData, newTask])
  setIsUpdatingTask(false)
  setUpdatedData(null)
  setIsFormVisible(false)
}

const updateTask = (taskId, updatedValues) => {
  const updatedTasks = []

  for (let i = 0; i < cardData.length; i++) {
    const task = cardData[i]

    if (task.id === taskId) {
      const updatedTask = {
        ...task,
        ...updatedValues,
      }
      updatedTasks.push(updatedTask)
    } else {
      updatedTasks.push(task)
    }
  }

  setCardData(updatedTasks)
  setIsUpdatingTask(false)
  setUpdatedData(null)
  setIsFormVisible(false)
}

const editTask = (taskId) => {
  let taskToEdit = null

  for (let i = 0; i < cardData.length; i++) {
    if (cardData[i].id === taskId) {
      taskToEdit = cardData[i]
    }
  }

  if (taskToEdit !== null) {
    setUpdatedData(taskToEdit)
    setIsUpdatingTask(true)
    setIsFormVisible(true)
  }
}

const showAddTaskForm = () => {
  setIsUpdatingTask(false)
  setUpdatedData(null)
  setIsFormVisible(true)
}

const cancelForm = () => {
  setIsUpdatingTask(false)
  setUpdatedData(null)
  setIsFormVisible(false)
}


  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
            Workspace
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Kanban Board
            </h1>
            {!isFormVisible && (
              <button
                type="button"
                onClick={showAddTaskForm}
                className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
              >
                + Add task
              </button>
            )}
          </div>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            A simple overview of what you’re working on.
          </p>
        </header>

        <div>
          {isFormVisible? (
            <TaskForm
              onAddTask={addTask}
              onUpdateTask={updateTask}
              onCancel={cancelForm}
              updateTask={isUpdatingTask}
              updatedData={updatedData || {}}
            />
          ) : (
            <>
              <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                <div className="flex-1">
                  <label
                    htmlFor="task-search"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Search tasks
                  </label>
                  <input
                    id="task-search"
                    type="search"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    placeholder="Search by task title"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                  />
                </div>
                <div className="sm:w-56">
                  <label
                    htmlFor="status-filter"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Filter by status
                  </label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
                  >
                    <option value="All">All statuses</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                className={
                  statusFilter === 'All'
                    ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid grid-cols-1 gap-4'
                }
              >
                {visibleStatuses.map((status) => (
                  <Column
                    key={status}
                    tasks={setDataByStatus(status)}
                    status={status}
                    searchText={searchText}
                    onDeleteTask={deleteTask}
                    onEditTask={editTask}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default App
