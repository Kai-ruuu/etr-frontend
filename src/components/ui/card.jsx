export function Card({ children, className = "", ...props }) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`border-b border-gray-200 px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
      {children}
    </h2>
  )
}

export function CardDescription({ children, className = "", ...props }) {
  return (
    <p className={`text-sm text-gray-500 ${className}`} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = "", ...props }) {
  return (
    <div className={`border-t border-gray-200 px-6 py-4 flex gap-3 ${className}`} {...props}>
      {children}
    </div>
  )
}
