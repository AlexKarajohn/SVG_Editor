import ActiveObject from "src/components/editor/activeObject/ActiveObject";
import ToolPicker from "src/components/editor/toolPicker/ToolPicker";
import ListOfObjects from "src/components/editor/listOfObjects/ListOfObjects";
import DrawingBoard from "src/components/editor/drawingBoard/DrawingBoard"
const Editor = () => {

    return (
        <div>
            Editor<br/>
            <ToolPicker/>
            <ActiveObject/>
            <ListOfObjects/>
            <DrawingBoard/>
        </div>
    )
}

export default Editor;