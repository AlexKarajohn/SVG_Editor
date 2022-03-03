import React, { useRef, useState ,useEffect} from 'react';
import {useAppSelector, useAppDispatch} from '../../../../store/hooks/hooks'
import {tool,selectActiveObject,rectangle,polygon_coords, updateActiveObject, polygon} from '../../../../store/slices/editor.slice'
import Rectangle from './canvasItems/Rectangle'
import Polygon from './canvasItems/Polygon'

interface props {
    width : number;
    height : number;
}

const CanvasScreen : React.FC <props>= (props) => {
    const clicked = useRef(false);
    const dispatch = useAppDispatch();
  
    const [newObject,setNewObject] = useState<rectangle|polygon|null>(null);
    const [startingCoords, setStartingCoords] = useState<polygon_coords>({x:0,y:0})
    const activeObject = useAppSelector(selectActiveObject)
    const canvas = useAppSelector(state=>state.editor.canvas);
    useEffect(()=>{
        
        setNewObject(activeObject);
    },[activeObject])
    const canvasOnClickHandler = (e : React.MouseEvent) => {
        if(clicked.current===false || newObject === null)
            return;
        const {top , left } = e.currentTarget.getBoundingClientRect()
        const purePositionMouseX  :number = e.clientX - left;
        const purePositionMouseY  :number = e.clientY - top;
        if(activeObject && activeObject.tool === tool.RECTANGLE){
            setNewObject(currentNewObject=>{
                if(currentNewObject!==null){
                    const newObjectToReturn : rectangle= {
                        ...currentNewObject as rectangle,
                    }
                        if(purePositionMouseX > startingCoords.x ){
                            newObjectToReturn.width = purePositionMouseX - startingCoords.x;
                        }
                        else{
                            newObjectToReturn.x = purePositionMouseX;
                            newObjectToReturn.width = startingCoords.x - purePositionMouseX;
                        }
                        if(purePositionMouseY > startingCoords.y){
                            newObjectToReturn.height = purePositionMouseY - startingCoords.y;
                        }
                        else{
                            newObjectToReturn.y = purePositionMouseY;
                            newObjectToReturn.height = startingCoords.y - purePositionMouseY;
                        }
                    return newObjectToReturn
                }
                return null
            })
        }
        
    } 
    const handleMouseEvent = (event: React.MouseEvent) =>{
        if (event.type === "mousedown") {
            const {top , left } = event.currentTarget.getBoundingClientRect()
            const clickX = (event.clientX - left)
            const clickY = (event.clientY- top)
            clicked.current=true;
            if(activeObject && activeObject.tool===tool.RECTANGLE){
                const rectangle : rectangle = {
                    ...activeObject,
                    x: clickX,
                    y: clickY,
                    width: 0,
                    height: 0,
                }
                setStartingCoords({x: clickX,
                    y: clickY,})
                setNewObject(rectangle)
            }else if (activeObject && activeObject.tool===tool.POLYGON ){
                if((activeObject as polygon).points.length === 0){
                    const polygon : polygon = {
                        ...activeObject,
                        points : [{x:clickX,y:clickY}]
                    }
                    setStartingCoords({x: clickX,
                        y: clickY,})
                    setNewObject(polygon);
                }else{
                    const newPolygon : polygon = {
                        ...activeObject as polygon,
                        points: [...(activeObject as polygon).points,{x: clickX,
                            y: clickY,}]
                    };
                    setNewObject(newPolygon)
                }
            }
        } else {

            clicked.current=false;
            if(newObject !== null)
                dispatch(updateActiveObject(newObject))
        }
    }
    return (
        <>
            <svg 
                width={props.width} 
                height={props.height} 
                style={{border:'1px solid black'}} 
                onMouseDown={handleMouseEvent}
                onMouseUp={handleMouseEvent}
                onMouseMove={canvasOnClickHandler}
            >
                
                {canvas.map(item => {
                    if(item.tool === tool.RECTANGLE)
                        return <Rectangle rectangle={item as rectangle}/>
                    else if (item.tool === tool.POLYGON)
                        return <Polygon polygon={item as polygon}/>
                    else 
                        return <></>
                })}
                {newObject && newObject.tool === tool.RECTANGLE && <Rectangle rectangle={newObject as rectangle}/>}
                {newObject && newObject.tool === tool.POLYGON && <Polygon polygon={newObject as polygon}/>}
            </svg>
        </>
    )
}

export default CanvasScreen;