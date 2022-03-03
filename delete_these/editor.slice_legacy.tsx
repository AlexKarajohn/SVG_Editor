// import {createSlice,PayloadAction } from '@reduxjs/toolkit'
// import { setNewActiveObjectReducer } from './reducers/editor/setNewActiveObject'
// import type { RootState } from '../store'


// export enum tool {
//     NONE,
//     RECTANGLE,
//     POLYGON,
// }

// export interface svgProps {

//     color: string;
//     border: string;
// }
// export interface rectangle extends svgProps{
//     id?: string;
//     tool : tool;
//     x : number ;
//     y : number ;
//     width : number ;
//     height : number ;
    
// }
// export interface polygon_coords {
//     x : number ;
//     y : number ;
// }

// export interface polygon extends svgProps{
//     id? : string;
//     tool : tool;
//     points : polygon_coords[]
// }


// //Type of the slice state
// export interface EditorState {
//     activeObject: rectangle | polygon | null;
//     canvas : (rectangle|polygon)[]
// }

// //define the initial state using that type
// const initialState : EditorState = {
//     activeObject: null,
//     canvas: []
// }

// export const editorSlice = createSlice({
//     name: 'editor',
//     initialState,
//     reducers: {
//         setNewActiveObject: setNewActiveObjectReducer,
//         updateActiveObject : (state,action : PayloadAction<polygon|rectangle>) => {
//             state.activeObject = action.payload;
//         },
//         addToCanvas : (state) =>{
//             console.log('wut')
//             if(state.activeObject !== null){
//                 state.canvas = [...state.canvas,state.activeObject]
//                 state.activeObject = null;
//             }
//         },
//         removeFromCanvas : (state,action : PayloadAction<string>) =>{
//             state.canvas = state.canvas.filter(item=> item.id !== action.payload)
//         },
//     }
// })

// export const {setNewActiveObject,updateActiveObject,addToCanvas,removeFromCanvas} = editorSlice.actions;

// export const selectActiveObject = (state: RootState) => state.editor.activeObject;
// export const selectCanvas = (state: RootState) => state.editor.canvas;

// export default editorSlice.reducer;