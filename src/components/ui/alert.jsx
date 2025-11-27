export function Alert({ children, variant = "default", className = "", ...props }) {
  const variants = {
    default: "bg-blue-50 border border-blue-200 text-blue-900",
    destructive: "bg-red-50 border border-red-200 text-red-900",
    success: "bg-green-50 border border-green-200 text-green-900",
  }

  return (
    <div className={`rounded-md p-4 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}

export function AlertTitle({ children, className = "", ...props }) {
  return (
    <h5 className={`font-semibold mb-2 ${className}`} {...props}>
      {children}
    </h5>
  )
}

export function AlertDescription({ children, className = "", ...props }) {
  return (
    <p className={`text-sm ${className}`} {...props}>
      {children}
    </p>
  )
}
