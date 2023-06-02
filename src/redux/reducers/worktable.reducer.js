const initialState = {
    tableData: [],
  };

  const workTableReducer = (state = initialState.tableData, action) => {
    switch (action.type) {
      case 'SET_TO_TABLE':
        return [...state, action.payload];
      case 'DELETE_FROM_TABLE':
        return state.filter((exercise, index) => index !== action.payload);
      default:
        return state;
    }
  };
  
  export default workTableReducer;
  