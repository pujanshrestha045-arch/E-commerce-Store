import React from 'react'

const baseStyles = "inline-flex items-center rounded-md px-4 py-2 text-base font-medium"

const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "bg-transparent text-muted-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-primary/90",
    outline: "bg-accent border border-border text-muted-foreground hover:bg-accent/80",
    default: "bg-muted text-muted-foreground hover:bg-muted/90",
}

const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
    icon: "p-2",
}

const Button = ({
    children,
    variant = "primary",
    disabled = false,
    size = "md",
    onClick,
    className = ""
}) => {
    return(
        <button onClick={onClick} 
        disabled={disabled} 
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
            <span className='cursor-pointer'>{children}</span>
        </button>
    )
}

export default Button
