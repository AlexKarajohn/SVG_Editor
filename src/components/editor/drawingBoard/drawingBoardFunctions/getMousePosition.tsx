
export const getMousePosition = (e:React.MouseEvent) =>{
    const {top , left } = e.currentTarget.getBoundingClientRect()
    const positionXrelative  :number = e.clientX - left;
    const positionYrelative  :number = e.clientY - top;
    return {positionXrelative,positionYrelative}
}