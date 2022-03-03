import React from 'react';
import { toolkit } from "src/assets/defaultToolObjects";
import {tool} from "src/assets/types/toolObjectTypes";
import { useAppSelector,useAppDispatch } from 'src/store/hooks/hooks';
import {setActiveTool,selectActiveTool} from "src/store/slices/editor.slice"
import IconButton from '@mui/material/IconButton';
import {nanoid} from 'nanoid'
import { SvgIconProps } from '@mui/material';

const ToolPicker : React.FC = () =>{
    const dispatch = useAppDispatch();
    const activeTool = useAppSelector(selectActiveTool);
    return (
        <div style={{backgroundColor:'grey'}}>
            {toolkit.map((item)=>{
                const props : SvgIconProps = {
                    color: (activeTool === item.tool ? 'success' : 'primary')
                }
                return (
                <IconButton 
                    key={nanoid()} 
                    color="primary" 
                    component="span" 
                    onClick={()=>{
                        dispatch(setActiveTool(item.tool))
                    }}
                >
                    {React.createElement(item.icon,props)}
                </IconButton>)
            })}
        </div>
    )
}
export default ToolPicker;