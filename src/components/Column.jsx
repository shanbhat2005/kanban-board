import TaskCard from './TaskCard'

const statusAccents = {
  Todo: 'bg-violet-500',
  'In Progress': 'bg-amber-400',
  Completed: 'bg-emerald-500',
}

function Column({ status, tasks, searchText, onDeleteTask, onEditTask }) {
  return (
    <section
      aria-label={`${status} tasks`}
      className="min-w-0 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-3 sm:p-4"
    >
      <header className="mb-4 flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <span
            className={`h-2.5 w-2.5 rounded-full ${statusAccents[status]}`}
            aria-hidden="true"
          />
          <h2 className="text-sm font-semibold text-slate-800">
            {status}
          </h2>
          <span className="rounded-md bg-white px-2 py-0.5 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
            {tasks.length}
          </span>
        </div>
        <span
          className="select-none px-1 text-lg leading-none text-slate-400"
          aria-hidden="true"
        >
          ···
        </span>
      </header>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-400">
            {searchText ? 'No tasks match your search' : 'No tasks yet'}
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => onDeleteTask(task.id)}
              onEdit={() => onEditTask(task.id)}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default Column
