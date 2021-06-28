import { Container, Row, Col, Form } from "react-bootstrap";
import "./form.module.css";
import { useState } from "react";
import api from "../Api/index";

const FormFile = () => {
  const [movieName, setMovieName] = useState("");
  const [movieFile, setMovieFile] = useState("");
  const [responseStatus, setResponseStatus] = useState(false);
  const [error, setError] = useState(null)


  const moviNameHander = (value) => {
    if (value.length > 0) {
      setMovieName(value);
      document.getElementById("movieNameValidater").innerHTML = "";
    } else {
      setMovieName("");
      document.getElementById("movieNameValidater").innerHTML =
        "Please Enter a valid Movie Name";
    }
  };
  const videoHandler = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function () {
      var media = new Audio(reader.result);
      media.onloadedmetadata = function () {
        if (media.duration > 60) { // this would give duration of the video/audio file
          setMovieFile(null);
          setError("Please select less than 60 seconds File")
        }
        else {
          setError(null)
          setMovieFile(file)
        }

      };
    };
    reader.readAsDataURL(file);

  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('movie', movieFile);
    formData.append('movieName', movieName);
    const response = await api.uploadVideoandFileName(formData);
    if (response.code === 200) {
      setResponseStatus(true);
    }
    else if (response.code === 500) {
      setError(response.message);
    }
  }
  return (
    <div className="bg-light d-inline-block h-100 w-100">
      {!responseStatus &&

        <Container style={{ height: "75vh" }}>
          <br />
          <br />
          <Row>
            <Col md={{ span: 6, offset: 3 }} className="bg-white">
              <h2 className="mt-2 text-dark">Upload Movie</h2>
              <hr className="mb-4" />
              <Form >
                <Form.Group className="mb-3" controlId="movieName.ControlInput1">
                  <Form.Label>Movie Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="AVATAR"
                    name="movieName"
                    onChange={(e) => moviNameHander(e.target.value)}
                  />
                  <div
                    className="text-center text-danger"
                    id="movieNameValidater"
                  ></div>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Select Movie</Form.Label>
                  <br />

                  <div className="border rounded ml-1 mr-1">
                    <Row>
                      <Col md={{ offset: 3 }}>
                        <label>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => videoHandler(e)}
                            name="movie"
                          />
                          <img
                            src="/img.png"
                            width="300px"
                            style={{ display: "contain", cursor: "pointer" }}
                            alt="File Icon"
                            name="movieFile"
                          />
                        </label>
                      </Col>
                      {error && <p className="text-center text-danger">{error}</p>}
                    </Row>
                  </div>
                </Form.Group>
                <Form.Group>
                  <div className="d-inline-flex w-100 justify-content-center mb-4">
                    <button
                      type="submit"
                      className="btn btn-secondary btn-lg btn-block d-inline-block w-100"
                      disabled={movieFile && movieName ? false : true}
                      onClick={(e) => formSubmitHandler(e)}
                    >
                      Submit
                    </button>
                  </div>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>

      }
      {responseStatus && <h1 style={{
        position: "fixed",
        bottom: "0",
        right: "0",
        left: "0",
        top: "162px"
      }} className="text-center">Your Movie Will Be Uploaded Soon...</h1>}
    </div>
  );
};

export default FormFile;
