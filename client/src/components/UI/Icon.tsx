import React, {FC} from 'react';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement>{
    name: string;
}

const Icon: FC<IconProps> = ({name,...props}) => {
    return (
        <i {...props}>{name}</i>
    );
};

export default Icon;