export function Table({ children, className = "", ...props }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={`w-full border-collapse ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className = "", ...props }) {
  return (
    <thead className={`bg-gray-50 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className = "", ...props }) {
  return (
    <tbody className={className} {...props}>
      {children}
    </tbody>
  )
}

export function TableRow({ children, className = "", ...props }) {
  return (
    <tr className={`border-b border-gray-200 hover:bg-gray-50 ${className}`} {...props}>
      {children}
    </tr>
  )
}

export function TableHead({ children, className = "", ...props }) {
  return (
    <th className={`text-left px-4 py-3 font-semibold text-gray-900 text-sm ${className}`} {...props}>
      {children}
    </th>
  )
}

export function TableCell({ children, className = "", ...props }) {
  return (
    <td className={`px-4 py-3 text-sm text-gray-700 ${className}`} {...props}>
      {children}
    </td>
  )
}
