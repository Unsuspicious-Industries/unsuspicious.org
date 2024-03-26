import React from 'react';
import { twMerge } from 'tailwind-merge';

const Button = ({
  variant = 'secondary',
  target = null,
  children,
  icon = null, // change this to null
  className = '',
  type = "button",
  ...rest
}) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    tertiary: 'btn btn-terinary',
    link: 'cursor-pointer hover:text-primary',
  };

  const ButtonOrLink = type === 'button' || type === 'submit' || type === 'reset' ? 'button' : 'a';
  const rel = target ? { target: target, rel: 'noopener noreferrer' } : {};

  return (
    <ButtonOrLink
      type={type as "button" | "submit" | "reset" | undefined}
      className={twMerge(variants[variant], className)}
      {...rel}
      {...rest}
    >
      {children}
      {icon && <span className="w-5 h-5 ml-1 -mr-1.5 rtl:mr-1 rtl:-ml-1.5 inline-block">{icon}</span>}
    </ButtonOrLink>
  );
};

export default Button;