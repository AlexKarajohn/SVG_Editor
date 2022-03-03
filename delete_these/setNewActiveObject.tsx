import {PayloadAction,nanoid } from '@reduxjs/toolkit';
import {polygon,rectangle,EditorState} from '../../editor.slice';

export const setNewActiveObjectReducer = {
    reducer: (state: EditorState,action : PayloadAction<rectangle|polygon|null> ) => {
        state.activeObject = action.payload;
    },
    prepare: (activeObjectToSet : rectangle|polygon|null )=>{
        if(activeObjectToSet===null)
            return { payload : null};
        return { payload : {
            ...activeObjectToSet,
            id: nanoid()
        }}
    }
}