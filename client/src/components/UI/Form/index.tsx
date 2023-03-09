import React, {FC} from 'react';
import styles from './style.module.scss';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactNode;
    title?: string;
}

const Form: FC<FormProps> = ({children, title,...props}) => {
    return (
        <div className={`${styles.wForm} ${props.className}`}>
            {!!title?.length && (<h1 className={styles.wFormTitle}>{title}</h1>)}
            <form>
                {children}
            </form>
        </div>
    );
};

export default Form;