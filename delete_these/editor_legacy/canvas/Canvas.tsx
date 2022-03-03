import CanvasList from './canvasList/CanvasList';
import CanvasScreen from './canvasScreen/CanvasScreen';
const Canvas : React.FC = () => {
    return (
        <>
            <CanvasList/>
            <CanvasScreen width={600} height={450}/>
        </>
    )
}

export default Canvas;