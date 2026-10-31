function TaskCard({ task, onDelete, onEdit }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/[0.03]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold leading-5 text-slate-800">
            {task.title}
          </h3>
          <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
            {task.priority}
          </span>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${task.title}`}
            className="rounded-lg px-2 py-1 text-xs font-medium text-violet-600 transition hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${task.title}`}
            className="rounded-lg px-2 py-1 text-xs font-medium text-rose-600 transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500/30"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default TaskCard
