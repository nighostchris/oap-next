import React from 'react';

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  flavor: string
  size?: string
  outline?: boolean
}

const Button : React.SFC<ButtonProps> = ({
  onClick, flavor, size, outline,
}) => (
  <>
    <button className={`btn btn${outline ? '-outline' : ''}-${flavor} ${size ? `btn-${size === 'large' ? 'lg' : 'sm'}` : ''}`} type="button" onClick={onClick}>Testing</button>
  </>
);

export default Button;
