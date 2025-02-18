import { useDrag } from 'react-dnd';
const DraggableItem = ({ index, id, left, top, moveItem, removeItem }) => {
    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: 'element',
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const offset = monitor.getClientOffset();
            //console.log("Drag end:", item, offset);
            if (offset) {
                moveItem(index, offset.x - 25, offset.y - 10);
            } else {
                //console.error("Offset is null");
                removeItem(index);
            }
        },
    }));

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                width: '50px',
                height: '20px',
                backgroundColor: 'gray',
                border: '1px solid black',
                textAlign: 'center',
                lineHeight: '20px',
                position: 'absolute',
                left: left - 25,
                top: top - 10,
                cursor: 'move',
            }}
        >
            {id}
        </div>
    );
};

export default DraggableItem;