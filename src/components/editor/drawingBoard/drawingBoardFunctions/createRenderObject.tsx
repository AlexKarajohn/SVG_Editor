import { nanoid } from "@reduxjs/toolkit";

import { tool ,acceptableObjects} from "src/assets/types/toolObjectTypes";
import SvgRectangle from "src/components/editor/drawingBoard/availableObjects/svgRectangle/SvgRectangle";
import SvgPolygon from "src/components/editor/drawingBoard/availableObjects/svgPolygon/SvgPolygon";
import SvgText from "src/components/editor/drawingBoard/availableObjects/svgText/SvgText";


export const createRenderObject = (object : acceptableObjects,activeObjectId: ReturnType<typeof nanoid>,isTemporary : Boolean) :JSX.Element=>{
    if(object.tool === tool.RECTANGLE)
        return <SvgRectangle key={object.id} data={object} activeObjectId={activeObjectId} isTemporary={isTemporary} />
    else if (object.tool === tool.POLYGON)
        return <SvgPolygon key={object.id} data={object} activeObjectId={activeObjectId} isTemporary={isTemporary}/>
    else if (object.tool === tool.TEXT)
        return <SvgText key={object.id } data={object}/>
    else 
        return <></>
}