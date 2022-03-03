import {createSlice } from '@reduxjs/toolkit'
import {addObjectToArrayActionCreator} from 'src/store/slices/actionCreators/addObjectToArrayActionCreator'
import {deleteObjectFromArrayActionCreator} from 'src/store/slices/actionCreators/deleteObjectFromArrayActionCreator'
import {setObjectLockStatusActionCreator} from 'src/store/slices/actionCreators/setObjectLockStatusActionCreator'
import {updateObjectOfArrayActionCreator} from 'src/store/slices/actionCreators/updateObjectOfArrayActionCreator'
import {setActiveIdActionCreator} from 'src/store/slices/actionCreators/setActiveIdActionCreator'
import {setActiveToolActionCreator} from 'src/store/slices/actionCreators/setActiveToolActionCreator'
import type { RootState } from 'src/store/store'
import { tool } from 'src/assets/types/toolObjectTypes'
import { acceptableObjects } from 'src/assets/types/toolObjectTypes'



//Type of the slice state
export interface EditorState {
    activeObjectId : string;
    activeTool: tool;
    objectArray : acceptableObjects[];
}

//define the initial state using that type
const initialState : EditorState = {
    activeObjectId: '',
    activeTool: tool.MOVE,
    objectArray: []
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        addObjectToArray : addObjectToArrayActionCreator,
        deleteObjectFromArray : deleteObjectFromArrayActionCreator,
        updateObjectOfArray : updateObjectOfArrayActionCreator,
        setObjectLockStatus : setObjectLockStatusActionCreator,
        setActiveTool : setActiveToolActionCreator,
        setActiveId : setActiveIdActionCreator,
    }
})

export const {
    addObjectToArray,
    deleteObjectFromArray,
    updateObjectOfArray,
    setObjectLockStatus,
    setActiveTool,
    setActiveId
} = editorSlice.actions;

export const selectActiveObjectId = (state: RootState) => state.editor.activeObjectId;
export const selectObjectArray= (state: RootState) => state.editor.objectArray;
export const selectActiveTool = (state: RootState) =>{
    return state.editor.activeTool
}

export default editorSlice.reducer;