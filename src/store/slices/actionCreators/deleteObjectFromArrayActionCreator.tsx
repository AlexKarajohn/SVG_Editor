import {PayloadAction,nanoid } from '@reduxjs/toolkit';
import { EditorState } from '../editor.slice';

/**
 * 
 * @param state : defaultState passed automaticly.
 * @param action : the id of the object about to be filtered out of the object array.
 */
export const deleteObjectFromArrayActionCreator = (state: EditorState,action : PayloadAction<ReturnType<typeof nanoid>> ) =>
{
    state.objectArray = state.objectArray.filter(object => object.id !== action.payload)
}