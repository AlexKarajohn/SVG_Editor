import {PayloadAction,nanoid } from '@reduxjs/toolkit';
import { EditorState } from '../editor.slice';
import { acceptableObjects, tool } from '../../../assets/types/toolObjectTypes';

/**
 * Accepts any <acceptableObject> and adds it to the object array.
 * Adds: id property = nanoid()
 */
export const addObjectToArrayActionCreator = {
    reducer: (state: EditorState,action : PayloadAction<acceptableObjects> ) => {
        state.objectArray = [...state.objectArray,action.payload];
        const prevItem = state.objectArray.find(item=>item.id === state.activeObjectId)
        if(action.payload.id)
            state.activeObjectId = action.payload.id;
        state.activeTool = tool.MOVE;
    },
    prepare: (activeObjectToAdd : acceptableObjects )=>{
        activeObjectToAdd.id = nanoid();
        return {payload: activeObjectToAdd};
    }
}