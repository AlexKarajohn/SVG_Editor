import React, {useState,useRef,useEffect} from 'react';

import { tool ,acceptableObjects} from "src/assets/types/toolObjectTypes";
import { useAppSelector } from "src/store/hooks/hooks";
import { selectObjectArray,selectActiveTool , selectActiveObjectId} from "src/store/slices/editor.slice";
import { createRenderObject } from 'src/components/editor/drawingBoard/drawingBoardFunctions/createRenderObject';

import { connectionDotFunctions } from 'src/components/editor/drawingBoard/drawingBoardFunctions/moveObjectProperties';
import {svgRectangleFunction} from 'src/components/editor/drawingBoard/availableObjects/svgRectangle/SvgRectangleMouseEvents'
import {svgPolygonFunctions } from 'src/components/editor/drawingBoard/availableObjects/svgPolygon/SvgPolygonMouseEvents';
import {svgTextFunctions} from 'src/components/editor/drawingBoard/availableObjects/svgText/SvgTextMouseEvents';

const DrawingBoard : React.FC = () =>{

    //Redux State Selectors
    const objectArray = useAppSelector(selectObjectArray);
    const activeObjectId = useAppSelector(selectActiveObjectId)
    const activeTool = useAppSelector(selectActiveTool);

    //Local State 
    const mouseState = useRef<Boolean>(false);
    const rectangleIndex = useRef<number>(-1);

    //Local useState
    const [temporaryObject,setTemportaryObject] = useState<acceptableObjects | undefined>()


    useEffect(()=>{
        setTemportaryObject(objectArray.find(item=>item.id === activeObjectId))
    },[setTemportaryObject,activeObjectId,objectArray])    

    useEffect(()=>{
        if(activeTool !== tool.MOVE)
            setTemportaryObject(undefined)
    },[activeTool])    

    const drawingBoardOnMouseDownUpHandler = (event : React.MouseEvent) => {
        if(activeTool === tool.MOVE){
            connectionDotFunctions.OnMouseDownUp(event,mouseState,temporaryObject,rectangleIndex)}
        else if(activeTool === tool.RECTANGLE)
            svgRectangleFunction.OnMouseDownUp(event,mouseState,temporaryObject,setTemportaryObject);
        else if(activeTool === tool.POLYGON)
            svgPolygonFunctions.OnMouseDownUp(event,mouseState,temporaryObject,setTemportaryObject);
        else if(activeTool === tool.TEXT)
            svgTextFunctions.OnMouseDownUp(event,mouseState,temporaryObject,setTemportaryObject);
    }
    const drawingBoardOnMouseMoveHandler = (event : React.MouseEvent) => {
        if(activeTool === tool.MOVE)
            connectionDotFunctions.OnMouseMove(event,mouseState,temporaryObject,setTemportaryObject,rectangleIndex)
        else if(activeTool === tool.RECTANGLE)
            svgRectangleFunction.OnMouseMove(event,temporaryObject,setTemportaryObject);
        else if(activeTool === tool.POLYGON)
            svgPolygonFunctions.OnMouseMove(event,temporaryObject,setTemportaryObject);
        else if(activeTool === tool.TEXT)
            svgTextFunctions.OnMouseMove(event);
    }
    const drawingBoardOnMouseLeaveHandler = (event :React.MouseEvent) =>{
        if(activeTool === tool.MOVE)
            connectionDotFunctions.OnMouseLeave(mouseState,temporaryObject,rectangleIndex)
        else if(activeTool === tool.RECTANGLE)
            svgRectangleFunction.OnMouseLeave(event,temporaryObject,setTemportaryObject);
        else if(activeTool === tool.POLYGON)
            svgPolygonFunctions.OnMouseLeave(event,temporaryObject,setTemportaryObject);
        else if(activeTool === tool.TEXT)
            svgTextFunctions.OnMouseLeave(event);
    }
    return (
        <div>
            <svg 
                width={300} 
                height={300} 
                style={{border:'solid 1px black'}} 
                onMouseDown={drawingBoardOnMouseDownUpHandler}
                onMouseUp={drawingBoardOnMouseDownUpHandler}
                onMouseMove={drawingBoardOnMouseMoveHandler}
                onMouseLeave={drawingBoardOnMouseLeaveHandler}
            >
                {objectArray.map(object=>{
                    if(object.id === temporaryObject?.id)
                        return <></>
                    return createRenderObject(object,activeObjectId,false)
                })}
                {temporaryObject && createRenderObject(temporaryObject,activeObjectId,true)}
            </svg>
        </div>
    )
}
export default DrawingBoard;