export function Select({ children, className = "", size = "md", ...props }) {
  const baseStyles = "font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  
  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }
  
  return (
    <select
      {...props}
      className={`${baseStyles} ${sizes[size]} border border-gray-300 text-gray-900 hover:bg-gray-50`}
    >
      {children}
    </select>
  )
}

export function SelectItem({ value, children, ...props }) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  )
}
