import {PayloadAction,nanoid } from '@reduxjs/toolkit';
import { EditorState } from '../editor.slice';

export interface setObjectLockStatusActionCreatorParameters{
    id : ReturnType<typeof nanoid>;
    lockState : Boolean
}

export const setObjectLockStatusActionCreator = (state: EditorState,action : PayloadAction<setObjectLockStatusActionCreatorParameters> ) => {
        const indexOfObject = state.objectArray.findIndex(object => object.id === action.payload.id)
        if(indexOfObject === -1 )
            return 
        state.objectArray[indexOfObject].locked = action.payload.lockState;
    }
