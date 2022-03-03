import {tool,toolkitType,toolKitItemBasics,RectangleI,PolygonI,TextI} from './types/toolObjectTypes';
import Crop32Icon from '@mui/icons-material/Crop32';
import StarIcon from '@mui/icons-material/Star';
import EditOffIcon from '@mui/icons-material/EditOff';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import PanToolIcon from '@mui/icons-material/PanTool';

export const toolkit : toolkitType = [  
    {
        tool : tool.MOVE,
        icon : PanToolIcon,
        name : 'Move',
    },
    {
        tool : tool.RECTANGLE,
        icon : Crop32Icon,
        name : 'Rectangle',
    },
    {
        tool : tool.POLYGON,
        icon : StarIcon,
        name : 'Polygon',
    },
    {
        tool : tool.TEXT,
        icon : TextFieldsIcon,
        name : 'Text',
    }
]