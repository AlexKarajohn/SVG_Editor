import React, { useMemo ,memo} from 'react';
import {useAppSelector,useAppDispatch} from '../../../../store/hooks/hooks';
import { selectCanvas,selectActiveObject,tool ,rectangle, polygon, updateActiveObject, addToCanvas} from '../../../../store/slices/editor.slice';
import debounce from 'lodash.debounce';
const ActiveObject : React.FC = () => {
    const activeObject = useAppSelector(selectActiveObject);
    const dispatch = useAppDispatch();
    console.log(activeObject);
    const rectangleProperties = (rectangle :rectangle ) => <>
        X: {rectangle.x}<br/>
        Y: {rectangle.y}<br/>
        width : {rectangle.width}<br/>
        height : {rectangle.height}
    </>
    const polygonProperties = (polygon :polygon ) => <>
    points : {JSON.stringify(polygon.points)}
    </>

    type genericTool = {
        genericTool : rectangle | polygon
    }

    const addToCanvasHandler = () =>{
        dispatch(addToCanvas())
    }

    const GeneralProperties :React.FC <genericTool>= memo(({genericTool}) => {
            const colorChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
                if(activeObject !== null)
                dispatch(updateActiveObject({
                    ...activeObject,
                    color: e.target.value
                }))
            }    
            const debounceColorChangeHanlder = useMemo(()=>debounce(colorChangeHandler,250),[]);
            const borderChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
                if(activeObject !== null)
                dispatch(updateActiveObject({
                    ...activeObject,
                    border: e.target.value
                }))
            }
            const debounceBorderChangeHanlder = useMemo(()=>debounce(borderChangeHandler,250),[]);
        return(
        <>
            Color : <input type="color" name="objectColor" defaultValue={genericTool.color} onInput={debounceColorChangeHanlder}/> <br/>
            Border : <input type="color" name="objectBorder" defaultValue={genericTool.border} onChange={debounceBorderChangeHanlder}/>
        </>)})
    console.log('rerendered!')
    if(activeObject===null)
        return <>Please Select a tool</>

    return (
        <>
            Active Object : {activeObject.id} <br/>
            Tool: {activeObject.tool}<br/>
            {activeObject.tool === tool.RECTANGLE && rectangleProperties(activeObject as rectangle)}<br/>
            {activeObject.tool === tool.POLYGON && polygonProperties(activeObject as polygon)}<br/>
            <GeneralProperties genericTool={activeObject}/><br/>
            <br/>

        </>
    )
}

export default memo(ActiveObject);