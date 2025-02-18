import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "ITEM";

const DraggableItem = ({ item, index, moveItem }) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    return (
        <div
            ref={(node) => drag(drop(node))}
            style={{
                padding: 10,
                margin: "5px 0",
                background: isDragging ? "lightblue" : "white",
                border: "1px solid #ddd",
                cursor: "grab",
            }}
        >
            {item.content}
        </div>
    );
};

const DragAndDropList = () => {
    const [items, setItems] = useState([
        { id: "1", content: "Элемент 1" },
        { id: "2", content: "Элемент 2" },
        { id: "3", content: "Элемент 3" },
    ]);

    const moveItem = (fromIndex, toIndex) => {
        const updatedItems = [...items];
        const [movedItem] = updatedItems.splice(fromIndex, 1);
        updatedItems.splice(toIndex, 0, movedItem);
        setItems(updatedItems);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ width: 300, padding: 20, border: "1px solid black" }}>
                {items.map((item, index) => (
                    <DraggableItem key={item.id} item={item} index={index} moveItem={moveItem} />
                ))}
            </div>
        </DndProvider>
    );
};

export default DragAndDropList;
