// src/App.js
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Resistor from './components/Resistor';
import Workspace from './components/Workspace';

const App = () => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{ padding: '20px' }}>
                <h1>Simple Circuit Emulator</h1>
                <div>
                    <h2>Available Components:</h2>
                    <Resistor />
                </div>
                <div>
                    <h2>Your Workspace:</h2>
                    <Workspace />
                </div>
            </div>
        </DndProvider>
    );
};

export default App;
