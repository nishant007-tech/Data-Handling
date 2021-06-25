import React from 'react';

const AuthContext=React.createContext({
    leftCard:[]  ,
    rightCart:[],
    setLeftCard:() =>{},
    remove:(id)=>{},
})

export default AuthContext;