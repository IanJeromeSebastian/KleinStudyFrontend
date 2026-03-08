/* eslint-disable no-unused-vars */
import React from 'react'

const Button = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    className = "",
    variant = "primary",
    size = "md",
}) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 whitespace-nowrap'

    const variantStyles = {
        primary: 'bg-linear-to-br from-[#ffd700] to-[#ffae00] text-black shadow-lg shadow-[#ffd700]/25 hover:from-[#ffd700] hover:to-[#ffae00] hover:shadow-xl hover:shadow-[#ffd700]/30',
        secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
        outline: 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300',
    };

    const sizeStyles = {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-5 text sm',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={[
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                className
            ].join(' ')}
        >
            {children}
        </button>
    );
};

export default Button
