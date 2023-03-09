import React, {FC, HTMLInputTypeAttribute} from "react";
import styles from "./style.module.scss";
import Icon from "@Components/UI/Icon";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: HTMLInputTypeAttribute;
}

const Input: FC<InputProps> = ({label, type = "text", ...props}) => {

    if (type === "password") {
        const [showPassword, setShowPassword] = React.useState(false);

        const togglePassword = () => {
            setShowPassword(!showPassword);
        }

        return (
            <div className={styles.wInput}>
                <span className={styles.wInputTitle}>{label}</span>
                <div className={styles.wInputFieldWrapper}>
                    <input className={styles.wInputField} type={showPassword ? "text" : "password"} id={label} {...props}/>
                    <Icon className={styles.togglePassword} name={!showPassword ? "visibility" : "visibility_off"}
                          onClick={togglePassword}/>
                </div>
            </div>
        );
    } else if (type === "checkbox") {
        return (
            <div className={styles.wInput}>
                <span className={styles.wInputTitle}>{label}</span>
                <input className={styles.wInputCheckbox} type={type} {...props}/>
            </div>
        );
    } else if (type === "hidden") {
        return (
            <input className={styles.wInputHidden} type={type} {...props}/>
        )
    }

    return (
        <div className={styles.wInput}>
            <span className={styles.wInputTitle}>{label}</span>
            <input className={styles.wInputField} type={type} {...props}/>
        </div>
    );
};

export default Input;