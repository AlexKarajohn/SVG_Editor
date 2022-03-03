import { tool } from "src/assets/types/toolObjectTypes";
import { useAppSelector,useAppDispatch } from "src/store/hooks/hooks";
import { selectActiveObjectId,setActiveId } from "src/store/slices/editor.slice";

const ActiveObject : React.FC= () =>{
    const dispatch = useAppDispatch();
    const activeObjectId = useAppSelector(selectActiveObjectId);
    const activeObject = useAppSelector(state=>{
        return state.editor.objectArray.find(item=> item.id === activeObjectId)
    })

    if(!activeObject){
        return <div>No Object Selected</div>
    }
    const deselectHandler = () =>{
        dispatch(setActiveId(''))
    }
    return (
        <div>
            <div>{activeObject.id}</div>
            <div>{activeObject.color}</div>
            <div>{activeObject.border}</div>
            <div>{activeObject.tool}</div>
            {activeObject.tool === tool.RECTANGLE && <>
                <div>x: {activeObject.x}</div>
                <div>y: {activeObject.y}</div>
                <div>width: {activeObject.width}</div>
                <div>height: {activeObject.height}</div>
            </>}
            {activeObject.tool === tool.POLYGON && <>
                <div>points: {JSON.stringify(activeObject.points)}</div>
            </>}
            {activeObject.tool === tool.TEXT && <>
                <div>x: {activeObject.x}</div>
                <div>y: {activeObject.y}</div>
                <div>text: {activeObject.text}</div>
            </>}
            <div>{activeObject.locked}</div>
            <button onClick={deselectHandler}>deselect</button>
        </div>
    )
}

export default ActiveObject;