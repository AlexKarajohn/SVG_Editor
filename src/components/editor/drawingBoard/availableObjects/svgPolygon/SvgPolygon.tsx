import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { PolygonI } from "src/assets/types/toolObjectTypes";

interface props {
    data : PolygonI
    activeObjectId : ReturnType<typeof nanoid>
    isTemporary : Boolean
}
const SvgPolygon : React.FC <props>= (props) =>{

    const connectionDots = <>
        {props.data.points.map((item,index)=>{ 
            return  <circle 
                        key={props.data.id+''+index} 
                        cx={item.x} 
                        cy={item.y} 
                        r={4} 
                        fill={
                            
                                index===0 && 
                                props.isTemporary &&
                                props.data.id !== props.activeObjectId
                            ? 'green' : ''}
                    />
        })}
    </>

    return (        
        <>
            <polygon 
                points={props.data.points.map(item=> `${item.x},${item.y}`).join(' ')}
                fill={props.data.color} 
                style={{stroke: props.data.border}}
            />
            {props.isTemporary && connectionDots}
        </>
        
    )
}

export default SvgPolygon;