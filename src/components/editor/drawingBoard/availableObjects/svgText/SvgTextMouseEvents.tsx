import React from "react";
import { acceptableObjects, TextI, tool } from "src/assets/types/toolObjectTypes";
import { getMousePosition } from "src/components/editor/drawingBoard/drawingBoardFunctions/getMousePosition";
import { useAppDispatch } from "src/store/hooks/hooks";
import { addObjectToArray } from "src/store/slices/editor.slice";
//const dispatch = useAppDispatch();

import { store } from "src/store/store";

const svgTextOnMouseDownUpHandler = (
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
                const svgTextObject : TextI = {
                    x: positionXrelative,
                    y: positionYrelative,
                    tool : tool.TEXT,
                    color : 'none',
                    border: 'black',
                    text: 'default',
                    locked : false,

                }
                store.dispatch(addObjectToArray(svgTextObject))
            }
        }
        else if(event.type === "mouseup"){
            mouseUpdate.current=false;
        }
    }

const svgTextOnMouseMove = (
    event : React.MouseEvent
    ) =>
    {
        
    }

const svgTextOnMouseLeaveDrawingBoard = (
    event : React.MouseEvent,
    ) =>
    {

    }

export const svgTextFunctions = {
    OnMouseDownUp : svgTextOnMouseDownUpHandler,
    OnMouseMove : svgTextOnMouseMove,
    OnMouseLeave : svgTextOnMouseLeaveDrawingBoard,
}