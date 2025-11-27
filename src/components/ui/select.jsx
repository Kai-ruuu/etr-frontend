export function Select({ children, ...props }) {
  return <select {...props}>{children}</select>
}

export function SelectItem({ value, children, ...props }) {
  return (
    <option value={value} {...props}>
      {children}
    </option>
  )
}
