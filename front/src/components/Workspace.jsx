// src/components/Workspace.js
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import DraggableItem from "./DraggableItem";

const Workspace = () => {
    const [droppedItems, setDroppedItems] = useState([]);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'element',
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            if (offset) {
                //console.log("Dropped item:", item);
                setDroppedItems((prevItems) => [
                    ...prevItems,
                    { id: item.id, left: offset.x - 15, top: offset.y - 250 },
                ]);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    const moveItem = (index, left, top) => {
        //console.log("Moving item:", index, left, top);
        setDroppedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);
            const movedItem = { ...updatedItems[index], left, top };
            //console.log("Updated items:", updatedItems);
            return [...updatedItems, movedItem];
        });
    };

    const removeItem = (index) => {
        //console.log("Removing item at index:", index);
        setDroppedItems((prevItems) => {
            const updatedItems = [...prevItems];
            updatedItems.splice(index, 1);
            return updatedItems;
        });
    };

    return (
        <div
            ref={drop}
            style={{
                width: '500px',
                height: '500px',
                backgroundColor: canDrop ? 'lightgreen' : 'lightgray',
                border: '2px dashed black',
                position: 'relative',
            }}
        >
            {isOver && <p>Drop it here!</p>}
            {droppedItems.map((item, index) => (
                <DraggableItem
                    key={index}
                    index={index}
                    id={item.id}
                    left={item.left}
                    top={item.top}
                    moveItem={moveItem}
                    removeItem={removeItem}
                />
            ))}
        </div>
    );
};


export default Workspace;
