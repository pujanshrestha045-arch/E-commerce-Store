import React from 'react'

function Card({children, className = "", ...props}) {
  return (
    <div
      className={`rounded-lg border border-border bg-card text-foreground shadow-xs ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

function CardContent({ className = "", children, ...props }) {
  return (
    <div
      className={`p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export { Card, CardContent }
export default Card
