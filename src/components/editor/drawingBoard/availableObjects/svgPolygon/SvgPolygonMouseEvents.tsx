import React from "react";
import { acceptableObjects, PolygonI, tool } from "src/assets/types/toolObjectTypes";
import { getMousePosition } from "src/components/editor/drawingBoard/drawingBoardFunctions/getMousePosition";

import { addObjectToArray } from "src/store/slices/editor.slice";


import { store } from "src/store/store";

const svgPolygonOnMouseDownUpHandler = (
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
                    const svgPolygonObject : PolygonI = {
                        points: [{x:positionXrelative,y:positionYrelative},{x:positionXrelative+1,y:positionYrelative+1}],
                        tool : tool.POLYGON,
                        color : 'none',
                        border: 'black',
                        locked : false,
                    }
                    setTemporaryObject(svgPolygonObject)
            }else if(temporaryObject){
                const {positionXrelative,positionYrelative} = getMousePosition(event);
                if(
                    temporaryObject.tool === tool.POLYGON && 
                    temporaryObject.points[0].x -10 < positionXrelative && 
                    temporaryObject.points[0].x + 10 > positionXrelative && 
                    temporaryObject.points[0].y -10 < positionYrelative &&
                    temporaryObject.points[0].y +10 > positionYrelative 
                    ){
                        const temporaryObjectToAdd = {...temporaryObject,points:[...temporaryObject.points]}
                        temporaryObjectToAdd.points.pop();
                        setTemporaryObject(temporaryObjectToAdd)
                        store.dispatch(addObjectToArray(temporaryObjectToAdd))
                        return
                }
                setTemporaryObject(prev=>{
                    if(prev && prev.tool === tool.POLYGON){
                        const svgPolygonObject : PolygonI ={
                            ...prev,
                            points: [...prev.points]
                        }
                        svgPolygonObject.points.push({x:positionXrelative,y:positionYrelative})
                        return svgPolygonObject;
                    }else
                        return prev
                })
            }

        }
        else if(event.type === "mouseup"){
            mouseUpdate.current = false;
        }
    }

const svgPolygonOnMouseMove = (
    event : React.MouseEvent,
    temporaryObject: acceptableObjects | undefined,
    setTemporaryObject: React.Dispatch<React.SetStateAction<(acceptableObjects | undefined)>>
    ) =>
    {
        const {positionXrelative,positionYrelative} = getMousePosition(event);
        setTemporaryObject(prev=>{
            if(prev && prev.tool === tool.POLYGON){
                const nextValue = {...prev,points: [...prev.points]}
                nextValue.points[nextValue.points.length-1] = {x:positionXrelative,y:positionYrelative};
                return nextValue
            }else {
                return prev
            }
        })  
    }

const svgPolygonOnMouseLeaveDrawingBoard = (
    event : React.MouseEvent,
    temporaryObject: acceptableObjects | undefined,
    setTemporaryObject: React.Dispatch<React.SetStateAction<(acceptableObjects | undefined)>>
    ) =>
    {
        if(temporaryObject){
            store.dispatch(addObjectToArray(temporaryObject))
        }
    }

export const svgPolygonFunctions = {
    OnMouseDownUp : svgPolygonOnMouseDownUpHandler,
    OnMouseMove : svgPolygonOnMouseMove,
    OnMouseLeave : svgPolygonOnMouseLeaveDrawingBoard,
}