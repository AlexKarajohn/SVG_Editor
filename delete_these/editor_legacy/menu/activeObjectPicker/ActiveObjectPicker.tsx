
import IconButton from '@mui/material/IconButton';
import {v4 as uuid } from 'uuid'

import {useAppSelector, useAppDispatch} from '../../../../store/hooks/hooks'

import {setNewActiveObject,selectActiveObject} from '../../../../store/slices/editor.slice'

import { toolkit,toolkitItem } from '../../../../assets/defaultToolObjects';
import React from 'react';

const ActiveObjectPicker : React.FC = () => {
    const activeObject = useAppSelector(selectActiveObject);
    const dispatch = useAppDispatch();
    return (
        <>
            {Object.values(toolkit).map((item : toolkitItem )=>{
                return (
                    <IconButton key={uuid()} color="primary" component="span" onClick={()=>{
                        dispatch(setNewActiveObject(item.default))
                    }}>
                        {React.createElement(item.icon)}
                </IconButton>
                )
            })}
            
        </>
    )
}

export default ActiveObjectPicker;