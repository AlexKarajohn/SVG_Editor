import {polygon} from '../../../../../store/slices/editor.slice'
import {useAppDispatch} from '../../../../../store/hooks/hooks';
import {setNewActiveObject} from '../../../../../store/slices/editor.slice'
interface props {
    polygon : polygon;
}



const Polygon : React.FC<props>= (props) =>{
    const dispatch = useAppDispatch();

    const onClickHandler = ( ) =>{
        dispatch(setNewActiveObject(props.polygon))
    }

    return <polygon onClick={onClickHandler} points={props.polygon.points.map(item=> `${item.x},${item.y}`).join(' ')} fill={props.polygon.color} style={{stroke:props.polygon.border}}/>
}
export default Polygon;