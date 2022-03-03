import { nanoid } from "@reduxjs/toolkit";
import { tool } from "src/assets/types/toolObjectTypes";
import { useAppSelector,useAppDispatch } from "src/store/hooks/hooks";
import { selectActiveObjectId, selectObjectArray,updateObjectOfArray,setActiveId, setActiveTool} from "src/store/slices/editor.slice";

const ListOfObjects : React.FC = () =>{
    const dispatch = useAppDispatch();
    const objectArray = useAppSelector(selectObjectArray);
    const activeObjectId = useAppSelector(selectActiveObjectId);
    if(objectArray.length === 0)
        return <div>No objects in list</div>

    return (
        <div>
            {objectArray.map(item=>{
                return (
                    <div 
                    key={item.id || nanoid()}
                    style ={ item.id === activeObjectId ? {border:'solid 1px black'} : {}}
                    onClick={()=>{
                        if(item.id)
                            dispatch(setActiveId(item.id))
                            dispatch(setActiveTool(tool.MOVE))
                    }}
                    >
                            {item.tool}
                    </div>
                )
            })}
        </div>
    )
}

export default ListOfObjects;