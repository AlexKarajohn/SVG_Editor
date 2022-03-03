import { acceptableObjects, tool,coords } from "src/assets/types/toolObjectTypes"
import { getMousePosition } from "src/components/editor/drawingBoard/drawingBoardFunctions/getMousePosition";
import { updateObjectOfArray } from "src/store/slices/editor.slice";
import { store } from "src/store/store";



const getPolygonMatchingIndex = (coords: coords,arrayCoords : coords[]) => {
    return arrayCoords.findIndex(item=>{
        if(
            coords.x > item.x - 15 && 
            coords.x < item.x + 15 && 
            coords.y > item.y - 15 &&
            coords.y < item.y + 15
            )
            {
                return true;
            }
        return false;
    })
}
const getRectangleMatchingIndex = (coords:coords,x: number , y : number, width : number,height:number) => {
    const arrayCoords = [
        {x,y}, //top left
        {x:x+width,y}, //top right
        {x,y:y+height}, //bottom left
        {x:x+width,y:y+height} //bottom right
    ]
    return arrayCoords.findIndex(item=>{
        if(
            coords.x > item.x - 15 && 
            coords.x < item.x + 15 && 
            coords.y > item.y - 15 &&
            coords.y < item.y + 15
            )
            {
                return true;
            }
        return false;
    })
}


const OnMouseDownUp = (
    event : React.MouseEvent,
    mouseUpdate : React.MutableRefObject<Boolean>,
    temporaryObject: acceptableObjects | undefined,
    rectangleIndex :  React.MutableRefObject<number>
    ) =>{
        if(temporaryObject){
            if (event.type === "mousedown") {
                const {positionXrelative,positionYrelative} = getMousePosition(event);
                if(temporaryObject && temporaryObject.tool === tool.POLYGON){
                    rectangleIndex.current = getPolygonMatchingIndex({x:positionXrelative,y:positionYrelative},temporaryObject.points)
                    if(rectangleIndex.current!==-1)
                        mouseUpdate.current=true;
                }else if(temporaryObject && temporaryObject.tool === tool.RECTANGLE){
                        rectangleIndex.current = getRectangleMatchingIndex(
                            {x:positionXrelative,y:positionYrelative},
                            temporaryObject.x,
                            temporaryObject.y,
                            temporaryObject.width,
                            temporaryObject.height
                            )
                    if(rectangleIndex.current!==-1)
                        mouseUpdate.current=true;
                }
            }else{
                rectangleIndex.current = -1;
                store.dispatch(updateObjectOfArray(temporaryObject))
                mouseUpdate.current=false;
            }
        }   
    }

const OnMouseMove = (
    event : React.MouseEvent,
    mouseUpdate : React.MutableRefObject<Boolean>,
    temporaryObject: acceptableObjects | undefined,
    setTemporaryObject: React.Dispatch<React.SetStateAction<(acceptableObjects | undefined)>>,
    rectangleIndex :  React.MutableRefObject<number>
        ) => {
            console.log('moved');
        if(mouseUpdate.current === true)
        {
            const {positionXrelative,positionYrelative} = getMousePosition(event);
            if(temporaryObject && temporaryObject.tool === tool.POLYGON){
                if(rectangleIndex.current !== -1){
                    setTemporaryObject(prev=>{
                        if(prev && prev.tool === tool.POLYGON){
                            const svgPolygon = {...prev,points:[...prev.points]}
                            svgPolygon.points[rectangleIndex.current] = {x:positionXrelative,y:positionYrelative}
                            return svgPolygon;
                        }else
                            return prev;
                    })
                }
            }else if (temporaryObject && temporaryObject.tool === tool.RECTANGLE){
                console.log(rectangleIndex.current)
                if(rectangleIndex.current !== -1){
                    const {positionXrelative,positionYrelative} = getMousePosition(event);
                    setTemporaryObject(prev=>{
                        if(prev && prev.tool === tool.RECTANGLE){
                            const nextValue = {...prev}
                            const moveIndexNext = getRectangleMatchingIndex(
                                {x:positionXrelative,y:positionYrelative},
                                nextValue.x,
                                nextValue.y,
                                nextValue.width,
                                nextValue.height
                                )
                            if(moveIndexNext !== -1){
                                rectangleIndex.current = moveIndexNext
                            }
                            if(rectangleIndex.current === 0){
                                nextValue.startingX = nextValue.x + nextValue.width;
                                nextValue.startingY = nextValue.y + nextValue.height;
                            }
                            else if(rectangleIndex.current === 1){
                                nextValue.startingX = nextValue.x;
                                nextValue.startingY = nextValue.y + nextValue.height;
                            }
                            else if(rectangleIndex.current === 2){
                                nextValue.startingX = nextValue.x+ nextValue.width ;
                                nextValue.startingY = nextValue.y ;
                            }
                            else if(rectangleIndex.current === 3){
                                nextValue.startingX = nextValue.x;
                                nextValue.startingY = nextValue.y ;
                            }
                            if(positionXrelative > nextValue.startingX){
                                nextValue.width = positionXrelative - nextValue.startingX;
                            }
                            else{
                                nextValue.x = positionXrelative;
                                nextValue.width = nextValue.startingX - positionXrelative;
                            }
                            if(positionYrelative > nextValue.startingY){                        
                                nextValue.height = positionYrelative - nextValue.startingY;
                            }
                            else{
                                nextValue.y = positionYrelative;
                                nextValue.height = nextValue.startingY - positionYrelative;
                            }
                            
                            return nextValue
                        }else  
                            return prev
                    })  
                }
            }
        }
    }
const OnMouseLeave = (
    mouseUpdate : React.MutableRefObject<Boolean>,
    temporaryObject: acceptableObjects | undefined,
    rectangleIndex :  React.MutableRefObject<number>
    ) =>{
    if(temporaryObject){
        rectangleIndex.current = -1;
        store.dispatch(updateObjectOfArray(temporaryObject))
        mouseUpdate.current=false;
    }
}

export const connectionDotFunctions = {
    OnMouseDownUp,
    OnMouseMove,
    OnMouseLeave
}
