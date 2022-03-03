import {PayloadAction,nanoid } from '@reduxjs/toolkit';
import { EditorState } from '../editor.slice';

 export const setActiveIdActionCreator = (state: EditorState,action : PayloadAction<ReturnType<typeof nanoid> | ''> ) => {
    const prevItem = state.objectArray.find(item=>item.id === state.activeObjectId)
    state.activeObjectId = action.payload;
    const nextItem = state.objectArray.find(item=>item.id === action.payload)

}
