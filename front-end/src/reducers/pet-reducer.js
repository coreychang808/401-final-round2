export default (state = {}, {type, payload}) => {
  switch(type){
    case 'PET_LOAD':
      return payload;
    case 'PET_ADD':
      return [...state, payload];
    case 'PET_UPDATE':
      state = state.map(pets=>{
        if( pets.id === payload.id ){
          return payload;  
        }
        return pets;
      });
      return state;
    case 'PET_DELETE':
      state = state.filter(pets => pets.id !== payload);
      return state;
    default:
      return state;
  }
};