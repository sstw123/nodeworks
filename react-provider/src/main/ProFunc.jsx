import React, { useContext } from 'react';
import MPro from "../provider/MessageProvider"

const ProFunc = () => {

    const msgContext = useContext(MPro)

    return (
        <div>
            <h3>나는 Insert 하위의 함수 컴포넌트 입니다</h3>
            <p>{msgContext.message}</p>
        </div>
    );
};

export default ProFunc;