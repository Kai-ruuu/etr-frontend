export function FileUploadButton({ fileUploadId, children, className = "", variant = "default", size = "md", accept="", ...props }) {
  const baseStyles = "font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  }

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <label htmlFor={fileUploadId} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} cursor-pointer`} {...props}>
      {children}
      <input id={fileUploadId} accept={accept} type="file" className="hidden"/>
    </label>
  )
}


export function Button({ children, className = "", variant = "default", size = "md", ...props }) {
  const baseStyles = "font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  }

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} cursor-pointer`} {...props}>
      {children}
    </button>
  )
}
