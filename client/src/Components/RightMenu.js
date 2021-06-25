import { useDrop } from "react-dnd";
import ItemTypes from "../utils/items";
import Fragment, { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import api from "../Api/index";
const RightMenu = () => {
  const ctx = useContext(AuthContext);
  const [loadiing, setLoading] = useState(false);
  const [finalImgaeUrl, setFinalImgaeUrl] = useState(null);
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, moniter) => {
      ctx.remove(item.id);
    },
    collect: (moniter) => ({
      isOver: !!moniter.isOver(),
    }),
  });
  const mergeSubmitHandler = async () => {
    setLoading(true);
    const response = await api.mergeVideos({ data: ctx.rightCart });
    setLoading(false);
    setFinalImgaeUrl(response);
    console.log(response);
  };
  return (
    <>
    {finalImgaeUrl &&<video width="480" height="400" controls className="mt-1">
                    <source src={finalImgaeUrl} type="video/mp4" />
                    <source src={finalImgaeUrl} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>}
      {!loadiing&&!finalImgaeUrl&&<><div
        className=" d-inline-flex w-100 justify-content-center"
        style={{ height: "100%" }}
      >
        <div
          className={"d-inline-flex w-100"}
          ref={drop}
          style={{ height: "100%" }}
          opacity={isOver ? "0.7" : "1"}
        >
          <div className="d-inline-flex w-25">
            {ctx.rightCart.map((cart) => {
              return (
                <div
                  className="border border-dark rounded m-3"
                  style={{ height: "34.3%" }}
                  key={cart._id}
                >
                  <h3 className="p-2 text-secondary ml-1 text-center">
                    {cart.movieName}
                  </h3>
                  <br />
                  <video width="240" height="160" controls className="mt-1">
                    <source src={cart.videoFIle} type="video/mp4" />
                    <source src={cart.videoFIle} type="video/ogg" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        style={{
          height: "10%",
          width: "13%",
          position: "fixed",
          top: "80%",
          left: "80%",
        }}
        className="btn btn-danger"
        onClick={mergeSubmitHandler}
      >
        Merge videos
      </button></>}
      {loadiing&&<p className="text-center">Please Wait While the Requst is being Processed</p>}
    </>
  );
};

export default RightMenu;
