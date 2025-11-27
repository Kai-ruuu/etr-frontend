export function Checkbox({ id, checked, onChange, className = "" }) {
  return (
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-500 ${className}`}
    />
  )
}