import React, { useState } from 'react'
import styles from './Profile.module.css';
import styleReservation from './Reservation.module.css';

import { AiFillCheckCircle, AiOutlineStar } from 'react-icons/ai'
import { PiCookingPotFill } from 'react-icons/pi'
import Swal from 'sweetalert2';
import axios from 'axios';
import { server } from '../../Helpers/EndPoint';
import Modal from './Modales/Modal';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/actions/actionOrders/actionOrders';
import MiniSpinner from '../Spinner/MiniSpinner';
import Spinner from '../Spinner/Spinner';

function RightSide({
  loadingDetails,
  myOrders,
  myReservations,
  toggleCart
}) {

  const dispatch = useDispatch()

  const [activeTab, setActiveTab] = useState("orders");

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [loadingResale, setLoadingResale] = useState(false);

  const [loadingButtons, setLoadingButtons] = useState({});


  const getDetailTicket = async (id) => {
    const { data } = await axios.get(`${server}/ticket/${id}`)
    return data;
  }

  const handleShowOrders = () => {
    setActiveTab("orders");
  };

  const handleShowReservations = () => {
    setActiveTab("reservations");
  };

  const handleReview = (id) => {
    const reviewDetail = getDetailTicket(id);
    setSelectedItem(reviewDetail); // Actualizar selectedItem con el detalle del item seleccionado
    setShowModal(true); // Abrir el modal
  }

  const handleGetDetail = async (id) => {
    try {
      setLoadingButtons((prevLoadingButtons) => ({
        ...prevLoadingButtons,
        [id]: true, // Establecer el estado de carga del botón correspondiente a 'true'
      }));
  
      const ticketDetail = await getDetailTicket(id);
      console.log("TICKET DETAIL: ", ticketDetail);
      setSelectedItem(ticketDetail);
      setShowModal(true);
  
      setLoadingButtons((prevLoadingButtons) => ({
        ...prevLoadingButtons,
        [id]: false, // Establecer el estado de carga del botón correspondiente a 'false'
      }));
    } catch (error) {
      console.error("Error al obtener el detalle:", error);
      setLoadingButtons((prevLoadingButtons) => ({
        ...prevLoadingButtons,
        [id]: false, // Establecer el estado de carga del botón correspondiente a 'false' en caso de error
      }));
    }
  };
  


  // const handleGetDetail = async (id) => {
  //   const ticketDetail = await getDetailTicket(id);
  //   console.log("TICKET DETAIL: ", ticketDetail);
  //   setSelectedItem(ticketDetail); // Actualizar selectedItem con el detalle del item seleccionado
  //   setShowModal(true); // Abrir el modal
  // }

  const handleReSale = async (id) => {
    try {
      setLoadingResale((prevLoadingButtons) => ({
        ...prevLoadingButtons,
        [id]: true, // Establecer el estado de carga del botón correspondiente a 'true'
      }));
  
      const stateCart = await getDetailTicket(id);
      if (!stateCart || stateCart.length === 0) {
        console.log("El carrito está vacío o no existe.");
        return;
      }
  
      const orderItems = stateCart.slice(1); // Detalles de los items de la orden
  
      const transformedOrderItems = orderItems.map((item) => {
        const transformedDrinks = item.drinks?.map((drink) => drink.drink);
        const transformedDesserts = item.desserts?.map((dessert) => dessert.dessert);
  
        return {
          ...item,
          drinks: transformedDrinks,
          desserts: transformedDesserts,
        };
      });
  
      const cartWithoutTotalPrice = transformedOrderItems.slice(0, transformedOrderItems.length - 1);
  
      cartWithoutTotalPrice.forEach(async (item) => {
        await dispatch(addToCart(item)); // Esperar a que el dispatch se complete
        setLoadingResale((prevLoadingButtons) => ({
          ...prevLoadingButtons,
          [id]: false, // Establecer el estado de carga del botón correspondiente a 'false'
        }));
      });
      toggleCart();
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
      setLoadingResale((prevLoadingButtons) => ({
        ...prevLoadingButtons,
        [id]: false, // Establecer el estado de carga del botón correspondiente a 'false' en caso de error
      }));
    }
  };
  


  const handleCancelReservation = () => {
    Swal.fire({
      title: "¿Estás segura/o de querer cancelar la reservación?",
      text: "Se ruega canclear con 3 horas de anticipación. Una vez cancelado, no podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "var(--negative)",
    })
    console.log("Has Cancelado Tu Reserva");
  }

  console.log(selectedItem);

  return (
    <>
      <div className={styles.tabsContainer}>
        <button
          className={activeTab === "orders" ? styles.activeTab : styles.tab}
          onClick={handleShowOrders}
        >
          Mis pedidos
        </button>
        <button
          className={activeTab === "reservations" ? styles.activeTab : styles.tab}
          onClick={handleShowReservations}
        >
          Mis reservaciones
        </button>
      </div>
      {showModal && selectedItem && (
        <Modal
          setShowModal={setShowModal}
          selectedItem={selectedItem} />
      )}

      {/* <h1 className={styles.title}>Mis pedidos</h1> */}
      {/* Renderizar el contenido según la pestaña activa */}
      {activeTab === "orders" ? (
        loadingDetails ? (
          <p className={styles.loading}><Spinner /> <span className={styles.loadingText}>Estamos cargando sus órdenes. Por favor espere...</span></p>
        ) : myOrders.length === 0 ? (
          <div>
            <h2 className={styles.notOrder}>Aún no tienes pedidos</h2>
          </div>
        ) : myOrders.map((order, index) => (
          <div key={index} className={styles.orderContainer}>
            <div className={styles.orderHeader}>
              <div className={styles.dataOrder}>
                <span>Pedido: <b>{order.idPedido}</b></span>
                <span>Hora: <b>{order.createdAt}</b></span>
              </div>
              <div className={styles.dataOrderRigth}>
                <div className={styles.status}>
                  <p className={styles.statusTitle}>ESTADO: <b>{order.status}</b></p>
                  {order.status === "Aprobado"
                    ? <AiFillCheckCircle className={styles.checkAproved} />
                    : order.status === "En proceso"
                      ? <PiCookingPotFill className={styles.cookingIcon} />
                      : <AiFillCheckCircle className={styles.checkComplete} />}
                </div>
                <span className={styles.totalPrice}>Pagaste: <b>${order.totalPrice || 3000}</b></span>
              </div>


            </div>


            <div className={styles.buttonsActionsContainer}>
              <button
                className={styles.buttonReview}
                onClick={() => handleReview(order.idPedido)}>
                Opinar <AiOutlineStar className={styles.starIcon} />
              </button>
              <button
                className={styles.buttonsActions}
                onClick={() => handleReSale(order.idPedido)}>
                {loadingResale[order.idPedido] ? <p className={styles.loadingButton}><MiniSpinner /> <span className={styles.loadingText}>Cargando...</span></p> : <p className={styles.button}>Repetir orden</p>}

              </button>
              <button
                className={styles.buttonsActions}
                onClick={() => handleGetDetail(order.idPedido)}>
                {loadingButtons[order.idPedido] ? <p className={styles.loadingButton}><MiniSpinner /> <span className={styles.loadingText}>Cargando...</span></p> : <p className={styles.button}>Ver detalle</p>}
              </button>
            </div>

            {/* Detalles del ticket */}
          </div>
        ))
      ) : (
        //aca debo crear un nuevo estado cuando tenga el get a /resevar
        loadingDetails ? (
          <p>Estamos cargando sus reservaciones. Por favor espere...</p>
        ) : myReservations.length === 0 ? (
          <div>
            <h2 className={styles.notOrder}>Aún no tienes reservaciones</h2>
          </div>
        ) : (
          myReservations.map((reservation, index) => (
            <div key={index} className={styleReservation.reservationContainer}>
              <div className={styleReservation.dataReservationHeader}>
                <div className={styleReservation.dataReservationLeft}>
                  <span>Fecha: <b>{reservation.date}</b></span>
                  <span>Hora: <b>{reservation.time}</b></span>
                  <span>Zona: <b>{reservation.zone}</b></span>
                </div>
                <div className={styleReservation.dataReservationCenter}>
                  <span>A nombre de: <b>{reservation.lastName
                    ? `${reservation.name} ${reservation.lastName}`
                    : `${reservation.name}`}</b></span>
                  <span>Homenaje a: <b>{reservation.honoree}</b></span>
                </div>
                <div className={styleReservation.dataReservationRight}>
                  <div className={styleReservation.statusContainer}>
                    <span>Estado: <b>{reservation.status}</b></span>
                    <span
                      style={reservation.status === "Pendiente"
                        ? { backgroundColor: "var(--main-color)" }
                        : reservation.status === "Confirmado"
                          ? { backgroundColor: "var(--positive)" }
                          : { backgroundColor: "var(--negative)" }}
                      className={styleReservation.spanCircle}></span>
                  </div>
                  <span>Catidad de personas: <b>{reservation.quantity}</b></span>
                </div>
              </div>
              <div className={styleReservation.dataReservationBottom}>
                <button className={styleReservation.buttonsActions} onClick={handleCancelReservation}>Cancelar Reserva</button>
              </div>

            </div>
          ))
        )
      )}

    </>
  )
}

export default RightSide