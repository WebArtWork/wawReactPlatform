const PWDRequire = ({
                        props,
                        capsLetterFlag,
                        numberFlag,
                        pwdLengthFlag,
                        specialCharFlag
                    }) => {
    console.log(props)
    return (
        <div className="message">
            <p className={capsLetterFlag}>Capital letter</p>
            <p className={numberFlag}>Contain number</p>
            <p className={pwdLengthFlag}>8 Chars long</p>
            <p className={specialCharFlag}>Special character</p>
        </div>
    );
};

export default PWDRequire;