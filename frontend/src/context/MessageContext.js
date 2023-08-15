import { createContext, useState} from "react";

const MessageContext = createContext();

export const MessageProvider = ({children}) =>{
    const [message, setMessage] = useState(false);

    const contextData = {
        message,
        setMessage,
    }
    
  return (
    <MessageContext.Provider value={contextData}>
      {children}
    </MessageContext.Provider>
  );
}

export default MessageContext