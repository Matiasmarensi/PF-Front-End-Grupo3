import style from "./CardsContainer.module.css";
import { getDishes } from "../../../Redux/actions/getAllDishes";
import {getDrinks} from '../../../Redux/actions/actionsDrinks/getAllDrinks'
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../images/default-image.jpg";
import Card from "../../Card/Card";
import { useEffect, useRef, useState } from "react";
import Pagination from "../../Pagination/Pagination";
import { scrollToTop } from "../../../Helpers/functions";
// import { sides } from "../../../utils/mock";

export const scrollToTopRef = (containerRef) => {
  if (containerRef.current) {
    containerRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

// {type, image, name, price, rating, description, id, addToCart}
const CardsContainer = (props) => {
  let {allThings} = props
  const [currentPage, setCurrentPage] = useState(0);
  
  const containerRef = useRef(null);

  const dispatch = useDispatch();

  const allDishes = useSelector((state) => state.dishes.dishes);
  const allDrinks = useSelector((state) => state.drinks.drinks);
  

  

  // const [dishes, setDishes] = useState([]);

  useEffect(() => {
    if (allDishes.length === 0) {
      dispatch(getDishes());
    }
    if(allDrinks.length === 0){
      dispatch(getDrinks());
    }}
    
  , [dispatch, allDishes]);

  // Constante de recetas por página
  const perPage = 6;

  //? ME GUARDO LOS VALORES PARA USAR EN EL SLICE QUE RENDERIZA LAS RECETAS QUE MUETRO POR PAGINA
  // El startIndex lo calculo con el valor alcual de la pagina mulriplicado por el maximo de recetas por página
  const startIdx = currentPage * perPage;
  // El end =Index lo calculo con el valor del Indice de inicio + el total de recetas por página
  const endIdx = startIdx + perPage;

  // SIEMPRE QUE EL NUMERO DE PAGINA ESTE ENTRE EL RAGO LIMITE
  // DESPACHO EL CAMBIO DE PAGINA
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
      scrollToTopRef(containerRef);
      setTimeout(() => scrollToTop(), 100); // Llamo a scrollToTop después de 100 milisegundos
    } // pasra esperar aue el estado se actualice correctamente
  };

  // Me guardo el total de las páginas a travez de la funcion getTotalPage(),
  // que recibe toda la informacion necesaria para calcularlo

  const totalPages = Math.ceil(allThings.length / perPage);

  const addToCart = (id) => {
    window.alert(`orden ${id} agregada al carrito`);
  };

  return (
    <div className={style.mainContainer} ref={containerRef}>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      <div className={style.cardsContainer}>
        {allThings.slice(startIdx, endIdx).map((dish, index) => {
          return (
            <div key={index}>
              <Card
                type={dish.type}
                image={dish.image}
                name={dish.name}
                price={dish.price}
                rating={dish.rating}
                volume={dish.volume}
                description={dish.description}
                id={dish.id}
                addToCart={addToCart}
                toggleCart={props.toggleCart}
              />
            </div>
          );
        })}
      </div>
      <div className={style.pagination}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default CardsContainer;
