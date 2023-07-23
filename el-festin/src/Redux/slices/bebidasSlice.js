import { createSlice } from "@reduxjs/toolkit";

export const drinkSlice = createSlice({
name: "drink",
initialState:{
    drinks: [],
    drinksFilter: [],
    drinksTypes: [],
    sortedDrinks: [],
    drinksF: []
},
reducers:{
    setDrinks: (state, action) => {
        state.drinks = action.payload
        state.drinksFilter = action.payload
        state.sortedDrinks = action.payload 
        state.drinksF = action.payload

    },getDrinksTypes: (state, action) => {
        state.drinksTypes = action.payload
     

    }, filterDrinksByType: (state, action) => {
        let drin = state.drinksF.filter(el => el.subtype.includes(action.payload))
        state.dishes = drin
        state.drinksFilter = drin
        state.sortedDrinks = drin

    }, sortDrinksByAlchol: (state, action) => {
        if(action.payload === 'all'){
            let drin = state.drinksFilter
            console.log(drin)
            state.drinks = drin
        }
        if(action.payload === 'alcohol'){
            let drin = [...state.drinks]
            let drk = drin.filter(el => el.alcohol === true)
            let drank = drk.length === 0 ? state.drinksFilter.filter(el => el.alcohol === true) : drk
            console.log(drank)
            state.drinks = drank
        }
        if(action.payload === 'noAlcohol'){
            let drin = [...state.drinks]
            let drk = drin.filter(el => el.alcohol === false)
            let drank = drk.length === 0 ? state.drinksFilter.filter(el => el.alcohol === false) : drk
        
            state.drinks = drank
    }
}, sortDrinksByVolume: (state, action) =>{
    let asc = [...state.drinks];
      let ascSort =
        action.payload === "asc"
          ? asc.sort((a, b) => b.volume - a.volume)
          : asc.sort((a, b) => a.volume - b.volume);
      state.drinks = ascSort;
}, sortDrinksByPrice: (state, action ) =>{
    let asc = [...state.drinks];
    let ascSort =
      action.payload === "asc"
        ? asc.sort((a, b) => b.price - a.price)
        : asc.sort((a, b) => a.price - b.price);
    state.drinks = ascSort;
}
}

});

export const { setDrinks,
    getDrinksTypes,
    sortDrinksByGas,
    sortDrinksByAlchol,
    filterDrinksByType,
    sortDrinksByPrice,
    sortDrinksByVolume
 } = drinkSlice.actions;

export default drinkSlice.reducer;
