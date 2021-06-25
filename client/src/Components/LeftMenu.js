import { Fragment } from "react";
import Eliment from "./LeftMenuElement";
import React, { useEffect, useContext,useCallback } from "react";
import api from "../Api/index";
import AuthContext from "../store/auth-context";

const LeftMenu = () => {
  const ctx = useContext(AuthContext);

  useEffect(useCallback(() => {
    const getData = async () => {
      const response = await api.getMoviesandMoviesNames();
      ctx.setLeftCard(response);
      console.log(response);
    }
    getData();
  }) ,[]);
  return (
    <Fragment>
      {!ctx && <h1>No Movie Here</h1>}
      {ctx.leftCard.length === 0 && (
        <div className="d-inline-flex w-25 flex-column border border-dark rounded p-4 m-3">
          <p>No Movie Here</p>
        </div>
      )}
      {ctx.leftCard.length > 0 && (
        <div className="d-inline-flex w-25 flex-column p-4 pt-1 m-3 mt-1">
          {ctx.leftCard.map((card) => {
            return (
              <Fragment key={card._id}>
                <Eliment props={card} />
              </Fragment>
            );
          })}
        </div>
      )}
    </Fragment>
  );
};
export default React.memo(LeftMenu);
