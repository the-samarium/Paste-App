import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const notify = (message) => toast(message);
const initialState = {
  pastes: localStorage.getItem('pastes')
    ? JSON.parse(localStorage.getItem('pastes'))
    : [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    createPaste:(state,action)=>{
        const paste=action.payload;
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify([...state.pastes]));
        console.log('created pastes',state.pastes)
        notify('Paste created successfully!');
    },
    removePaste:(state,action)=>{
        const pasteID = action.payload
        console.log(pasteID)
        const index = state.pastes.findIndex((item)=>item.id==pasteID);
        if(index>=0){
          state.pastes.splice(index,1)
          localStorage.setItem('pastes',JSON.stringify(state.pastes))
          toast.success("Paste deleted")
        }
    },
    updatePaste:(state,action)=>{
        const updatedPaste = action.payload;
        const index = state.pastes.findIndex(paste => paste.id === updatedPaste.id);
        if (index !== -1) {
            state.pastes[index] = updatedPaste;
            localStorage.setItem("pastes", JSON.stringify([...state.pastes]));
            console.log('updated pastes')
            notify('Paste updated successfully!');
        }
    },
    resetPaste:(state,action)=>{
        state.pastes=[];
        localStorage.removeItem("pastes") // remove items with key paste'
        notify('Paste reseted successfully!');
    },
  },
})

// Action creators are generated for each case reducer function
export const { createPaste, updatePaste, resetPaste, removePaste } = appSlice.actions

export default appSlice.reducer