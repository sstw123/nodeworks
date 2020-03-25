import React, { createContext } from "react"

// Main에서 하위 컴포넌트에게 전달할 변수와 메소드를 포함하는 Provider를 선언
const MessageProvicer = createContext({
    message : "",
    changeMessage : (text) => {
        
    }
})

export default MessageProvider;
