

export function Dialog({ open, onOpenChange, children }) {
  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => onOpenChange(false)} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">{children}</div>
    </>
  )
}

export function DialogContent({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-lg p-6 max-w-md w-full ${className}`}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  )
}

export function DialogHeader({ children, className = "", ...props }) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function DialogTitle({ children, className = "", ...props }) {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
      {children}
    </h2>
  )
}

export function DialogFooter({ children, className = "", ...props }) {
  return (
    <div className={`mt-6 flex gap-3 justify-end ${className}`} {...props}>
      {children}
    </div>
  )
}
