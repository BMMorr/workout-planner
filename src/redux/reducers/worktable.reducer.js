const initialState = {
  tableData: [],
};

const workTableReducer = (state = initialState.tableData, action) => {
  switch (action.type) {
    case 'SET_TO_TABLE':
      return [...state, action.payload];
    case 'DELETE_FROM_TABLE':
      return state.filter((exercise, index) => index !== action.payload);
    case 'CLEAR_TABLE_DATA':
      return initialState.tableData;
    default:
      return state;
  }
};

export default workTableReducer;
