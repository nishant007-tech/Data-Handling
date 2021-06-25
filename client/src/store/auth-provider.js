import { useState } from "react";
import AuthContext from "./auth-context"



const AuthContextProvider=(props)=>{
    const [rightCart,SetRightCart] = useState([])
    const [leftCard,setLeftCard] = useState([]);

    const remove=(id)=>setLeftCard((prevCard)=>{
        const right=prevCard.find(card=>card._id===id);
        SetRightCart([...rightCart,right]);
        const newCard = prevCard.filter(card => card._id !== id);
        return newCard;
    });
    const contextValue={
        leftCard,
        setLeftCard,
        remove,
        rightCart
    };
    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;