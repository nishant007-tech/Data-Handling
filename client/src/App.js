import "./App.css";
import Form from "./Components/Form";
import { Fragment,useState } from "react";
import Movie from "./Components/Movie";
import Navbar from "./Components/Nav";


const App = () => {
  const [active, setActive] = useState(true)
  return (
    <Fragment>
      <Navbar active={active} setActive={setActive}/>
        {active&&<Form/>}
        {!active&&<Movie/>}
    </Fragment>
  );
};

export default App;
