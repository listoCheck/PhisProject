
import React from 'react';
import { useDrag } from 'react-dnd';

const Resistor = () => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'element',
        item: { id: 'Resistor' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                width: '60px',
                height: '20px',
                backgroundColor: 'gray',
                border: '1px solid black',
                textAlign: 'center',
                lineHeight: '20px',
                cursor: 'move',
            }}
        >
            Resistor
        </div>
    );
};

export default Resistor;
