import {removeFromCanvas,selectCanvas} from '../../../../store/slices/editor.slice'
import { useAppDispatch,useAppSelector } from '../../../../store/hooks/hooks';
const CanvasList : React.FC = () => {
    const dispatch = useAppDispatch();
    const canvas = useAppSelector(selectCanvas);

    return (
        <>
            {canvas.map(item=>{
                if(item.id)
                    return <div key={item.id}>
                        id : {item.id}
                        <button onClick={()=>{
                        
                            dispatch(removeFromCanvas(item.id!))
                        }}>REMOVE
                        </button>
                        <br/>
                    </div>
            })}
        </>
    )
}

export default CanvasList;

