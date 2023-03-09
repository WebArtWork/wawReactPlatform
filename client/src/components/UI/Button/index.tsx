import React, {FC} from 'react';
import styles from './style.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'second' | 'danger' | 'link';
    className?: string;
    onClick?: (e:React.MouseEvent) => void;
}

const Button: FC<ButtonProps> = ({children, variant = "primary", className,onClick, ...props}) => {
    const clickHandler = (e:React.MouseEvent) => {
        e.preventDefault();
        onClick && onClick(e);
    }
    
    return (
        <button onClick={clickHandler} className={`${styles.btn} ${styles[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;