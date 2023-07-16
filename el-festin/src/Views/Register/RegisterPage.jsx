import React from "react";
import Register from "../../Auth/Register";
import loginPhoto from "../../Assets/loginPhoto.jpg";

export const RegisterPage = () => {
  return (
    <div className="row w-100 m-0 bg-color-blue">
      <div className="col-6 position-relative">
        <img
          src={loginPhoto}
          alt="imagenlogin"
          className="img-fluid img-cover vh-100 w-100"
        />
        <p className="position-absolute top-0 start-50 translate-middle-x pt-5 mt-5 text-white fs-3">
          "Si te estás preguntando cuál es el amor más sincero… <br /> Entra y
          encontrarás la respuesta"
        </p>
      </div>
      <div className="col-6 bg-color-blue">
        <Register />
      </div>
    </div>
  );
};