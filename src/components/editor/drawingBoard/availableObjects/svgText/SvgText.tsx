import { TextI } from "src/assets/types/toolObjectTypes";


interface props {
    data : TextI
}
const SvgText : React.FC <props>= (props) =>{
    return (
        <text 
            x={props.data.x}
            y={props.data.y}
            fill={props.data.color} 
            style={{stroke: props.data.border}}
        >
            {props.data.text}
        </text>
    )
}

export default SvgText;