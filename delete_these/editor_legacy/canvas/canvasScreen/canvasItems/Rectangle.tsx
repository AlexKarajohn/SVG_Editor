import {rectangle} from '../../../../../store/slices/editor.slice'

interface props {
    rectangle : rectangle;
}

const Rectangle : React.FC<props>= (props) =>{
    // console.log(props.rectangle);
    return <rect onClick={()=>console.log('clicked')} x={props.rectangle.x?.toString()} y={props.rectangle.y?.toString()} width={props.rectangle.width?.toString()} height={props.rectangle.height?.toString()} fill={props.rectangle.color} style={{stroke:props.rectangle.border}}/>
}
export default Rectangle;