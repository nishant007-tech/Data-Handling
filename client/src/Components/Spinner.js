import React from "react";
const LoaddigSpenner=()=>{
    return(
        <div className="d-inline-flex w-100 h-100 justify-content-center p-2">
          <div className="spinner-border blue-text align-self-center" role="status">
          </div>
          <span className="my-auto ml-2 align-self-center">Uploading...</span>
        </div>
    )
}
export default React.memo(LoaddigSpenner);