import { nanoid } from "@reduxjs/toolkit";
//Enum for every tool available
export enum tool {
    MOVE,
    RECTANGLE,
    POLYGON,
    TEXT,
    // DOOR,
    // WINDOW,
    // SENSOR,
}

export type toolkitType = toolkitItem[]

export interface toolkitItem {
    tool : tool;
    name : string;
    icon : React.FC;
}

export interface toolKitItemBasics {
    id? : ReturnType<typeof nanoid>;
    color: string;
    border: string;
    locked : Boolean;
}

export interface coords {
    x: number;
    y: number;
}

export interface RectangleI extends toolKitItemBasics,coords{
    tool: tool.RECTANGLE;
    width: number;
    height: number;
    startingX: number;
    startingY: number;
}

export interface PolygonI extends toolKitItemBasics{
    tool: tool.POLYGON;
    points: coords[]
}

export interface TextI extends toolKitItemBasics,coords{
    tool: tool.TEXT;
    text: string;
}

export type acceptableObjects = RectangleI | PolygonI | TextI;