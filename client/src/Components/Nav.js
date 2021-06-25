import React from "react";
import classes from "./Nav.module.css";
import { Fragment } from "react";
import {
  Navbar,
  Nav,
} from "react-bootstrap";

const NavBar = ({active,setActive}) => {
  return (
    <Fragment>
            <div
              className="card p-5"
              style={{background: "#424f95" ,height:"50px"}}
            >
                  <Navbar className="justify-content-around h-100">
                    <Nav className={(!active?"text-white ":"text-info ")+classes.ui} onClick={()=>setActive(true)}>Form Movie</Nav>
                    <Nav className={(active?"text-white ":"text-info ")+classes.ui} onClick={()=>setActive(false)}>Movies</Nav>
                  </Navbar>
      </div>
    </Fragment>
  );
};
export default React.memo(NavBar);
