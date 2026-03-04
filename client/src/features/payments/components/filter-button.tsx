function FilterButton({
  label,
  active = false,
}: {
  label: string
  active?: boolean
}) {
  return (
    <button
      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? 'bg-[#115e59] text-white'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {label}
    </button>
  )
}

export default FilterButton
