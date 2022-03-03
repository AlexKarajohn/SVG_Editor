import {PayloadAction,nanoid } from '@reduxjs/toolkit';
import { EditorState } from '../editor.slice';
import {tool} from 'src/assets/types/toolObjectTypes'
/**
 * 
 * @param state : defaultState passed automaticly.
 * @param action : the id of the object about to be filtered out of the object array.
 */
export const setActiveToolActionCreator = (state: EditorState,action : PayloadAction<tool> ) =>
{
    state.activeTool = action.payload
}