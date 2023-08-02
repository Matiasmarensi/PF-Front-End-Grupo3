import { useState } from "react";
import { DashboardModifiers } from "./DashboardModifiers";
import Styles from "./Dashboard.module.css";

export const Sidebar = () => {
  const [productos, setProductos] = useState(true);
  const onProductChange = () => {
    setProductos(!productos);
  };

  if (productos) {
    return (
      <>
        <div className={Styles.sidebar}>
          <div className={Styles.user}>
            <h4 className="fs-3 pb-3">Administrador</h4>
          </div>

          <ul className={Styles.options}>
            <li className="pt-4">
              <button
                type="button"
                className={`btn btn-primary ${Styles.buttonDelete}`}>
                Pedidos
              </button>
            </li>
            <li className="pt-4">
              <button
                type="button"
                className={`btn btn-primary ${Styles.buttonDelete}`}
                onClick={onProductChange}>
                Productos
              </button>
            </li>
            <li className="pt-4">
              <button
                type="button"
                className={`btn btn-primary ${Styles.buttonDelete}`}>
                Usuarios
              </button>
            </li>
            <li className="pt-4">
              <button
                type="button"
                className={`btn btn-primary ${Styles.buttonDelete}`}>
                Metricas
              </button>
            </li>
            <li className="pt-4">
              <button
                type="button"
                className={`btn btn-primary ${Styles.buttonDelete}`}>
                Marketing
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  } else {
    return (
      <>
        <DashboardModifiers comeBack={onProductChange} />;
      </>
    );
  }
};