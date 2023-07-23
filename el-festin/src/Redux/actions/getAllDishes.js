import { getAllDishes } from "../slices/platosSlice";
import axios from "axios";
// import { dataDish } from '../../utils/mock'

// export const getDishes = ( ) => (dispatch) =>{
//     const dishes = dataDish.map(a => a)
//     dispatch(getAllDishes(dishes))
// }


export const getDishes = () => async (dispatch) => {
    try {
      const { data } = await axios.get("http://pf-server-production.up.railway.app/dish");
      dispatch(getAllDishes(data));
    } catch (error) {
      console.log(error.message);
    }
  };
    