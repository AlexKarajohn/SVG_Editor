import { nanoid } from "@reduxjs/toolkit";
import { RectangleI } from "src/assets/types/toolObjectTypes";

interface props {
    data : RectangleI
    activeObjectId : ReturnType<typeof nanoid>
    isTemporary : Boolean
}
const SvgRectangle : React.FC<props> = (props) =>{
    const connectionDots = <>
        <circle 
            key={nanoid()} 
            cx={props.data.x} 
            cy={props.data.y} 
            r={4}
        />
        <circle 
            key={nanoid()} 
            cx={props.data.x} 
            cy={props.data.y+props.data.height} 
            r={4}
        />
        <circle 
            key={nanoid()} 
            cx={props.data.x+props.data.width} 
            cy={props.data.y} 
            r={4}
        />
        <circle 
            key={nanoid()} 
            cx={props.data.x+props.data.width} 
            cy={props.data.y+props.data.height} 
            r={4}
        />
    </>
 
    return (
    <>
        <rect 
            x={props.data.x} 
            y={props.data.y} 
            width={props.data.width} 
            height={props.data.height} 
            fill={props.data.color} 
            style={{stroke: props.data.border}}
        />
        {(props.isTemporary) && connectionDots}
    </>
       
    )
}

export default SvgRectangle;