const initialState = {
    tableData: [],
  };

const workTableReducer = (state = initialState.tableData, action) => {
    switch (action.type) {
      case 'SET_TO_TABLE':
        return [...state, action.payload];
      default:
        return state;
    }
  };

export default workTableReducer;