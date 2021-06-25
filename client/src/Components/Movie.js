import AuthContextProvider from "../store/auth-provider";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'


const Movie = ()=>{
  return (
    <AuthContextProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="d-inline-flex w-100" style={{height:"88vh"}}>
          <LeftMenu />
          <RightMenu />
        </div>
      </DndProvider>
    </AuthContextProvider>
  )
}
export default Movie;

