import ItemTypes from "../utils/items";
import {useDrag} from "react-dnd";
import React from "react";
const Eliment = ({ props }) => {
    const [{isDragging},drag]=useDrag({
        type:ItemTypes.CARD,
        item:{
            id:props._id
        },
        collect:moniter=>({
            isDragging:!!moniter.isDragging()
        })
    })
  return (
    <div className="d-inline-flex flex-column border rounded border-dark mt-1 " ref={drag} opacity={isDragging?"0.7":"1"}>
        <div className="d-inline-flex w-100 rounded m-1 justify-content-center btn " >
      <h6 className="p-2  text-secondary text-center ml-1">{props.movieName}</h6>
                      </div>
                      <div className="d-inline-flex w-100 rounded m-1 justify-content-center btn " >

                    <video width="160" height="80" controls>
                    <source
                      src={props.videoFIle}
                      type="video/mp4"
                      />
                    <source
                      src={props.videoFIle}
                      type="video/ogg"
                      />
                    Your browser does not support the video tag.
                  </video>
                  </div>
    </div>
  );
};
export default React.memo(Eliment);
