import {PayloadAction,nanoid } from '@reduxjs/toolkit';
import { EditorState } from 'src/store/slices/editor.slice';
import { acceptableObjects } from 'src/assets/types/toolObjectTypes';



export const updateObjectOfArrayActionCreator = (state: EditorState,action : PayloadAction<acceptableObjects> ) => {
    const indexOfObject = state.objectArray.findIndex(object => object.id === action.payload.id)
    if(indexOfObject === -1 )
        return 
    state.objectArray[indexOfObject] = action.payload;
}
