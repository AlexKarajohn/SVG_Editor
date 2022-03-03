import ActiveObjectPicker from "./activeObjectPicker/ActiveObjectPicker";
import ActiveObject from "./activeObject/ActiveObject";

const Menu : React.FC = () => {
    return (
        <>
            <ActiveObjectPicker/>
            <br/>
            <br/>
            <ActiveObject/>
        </>
    )
}

export default Menu;