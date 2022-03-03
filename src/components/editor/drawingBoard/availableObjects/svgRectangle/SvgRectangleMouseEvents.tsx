import React from "react";
import { acceptableObjects, RectangleI, tool } from "src/assets/types/toolObjectTypes";
import { getMousePosition } from "src/components/editor/drawingBoard/drawingBoardFunctions/getMousePosition";
import { addObjectToArray } from "src/store/slices/editor.slice";

import { store } from "src/store/store";


const svgRectangleOnMouseDownUpHandler = (
    event : React.MouseEvent,
    mouseUpdate : React.MutableRefObject<Boolean>,
    temporaryObject: acceptableObjects | undefined,
    setTemporaryObject: React.Dispatch<React.SetStateAction<(acceptableObjects | undefined)>>
    ) => 
    {
    
        if (event.type === "mousedown") {
            mouseUpdate.current = true;
            if(!temporaryObject){

                const {positionXrelative,positionYrelative} = getMousePosition(event);
                const svgRectangleObject : RectangleI = {
                    x: positionXrelative,
                    startingX: positionXrelative,
                    width:0,
                    y: positionYrelative,
                    startingY: positionYrelative,
                    height:0,
                    tool : tool.RECTANGLE,
                    color : 'none',
                    border: 'black',
                    locked : false,
                }
                setTemporaryObject(svgRectangleObject)
               
            }
        }
        else if(event.type === "mouseup"){
            mouseUpdate.current = false;
            if(temporaryObject){
                store.dispatch(addObjectToArray(temporaryObject))
            }
        }
    }

const svgRectangleOnMouseMove = (
    event : React.MouseEvent,
    temporaryObject: acceptableObjects | undefined,
    setTemporaryObject: React.Dispatch<React.SetStateAction<(acceptableObjects | undefined)>>
    ) =>
    {   
        const {positionXrelative,positionYrelative} = getMousePosition(event);
        setTemporaryObject(prev=>{
            if(prev && prev.tool === tool.RECTANGLE){
                const nextValue = {...prev}
                if(positionXrelative > prev.startingX){
                    nextValue.width = positionXrelative - prev.startingX;
                }
                else{
                    nextValue.x = positionXrelative;
                    nextValue.width = prev.startingX - positionXrelative;
                }
                if(positionYrelative > prev.startingY){
                    nextValue.height = positionYrelative - prev.startingY;
                }
                else{
                    nextValue.y = positionYrelative;
                    nextValue.height = prev.startingY - positionYrelative;
                }
                return nextValue
            }else  
                return prev
        })  
    }

const svgRectangleOnMouseLeaveDrawingBoard = (
    event : React.MouseEvent,
    temporaryObject: acceptableObjects | undefined,
    setTemporaryObject: React.Dispatch<React.SetStateAction<(acceptableObjects | undefined)>>
    ) =>
    {
        if(temporaryObject){
            store.dispatch(addObjectToArray(temporaryObject))
        }
    }

export const svgRectangleFunction = {
    OnMouseDownUp : svgRectangleOnMouseDownUpHandler,
    OnMouseMove : svgRectangleOnMouseMove,
    OnMouseLeave : svgRectangleOnMouseLeaveDrawingBoard,
}