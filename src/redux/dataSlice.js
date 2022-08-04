import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  list : [],
}

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    init : function(state,actions){
        state.list = actions.payload;
    },
    add : function(state,actions){
        state.list.push({
            jam : actions.payload.jam,
            tanggal : actions.payload.nama,
            nama : actions.payload.nama,
            pengeluaraan : actions.payload.harga    
        });
    }
  },
})

// Action creators are generated for each case reducer function
export const {init,add} = dataSlice.actions

export default dataSlice.reducer