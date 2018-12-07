import React, { Component } from 'react';
import ControlPanel from './ControlPanel'
import Console from './Console'

class MainBlock extends Component {
    render() {
        return (
            <div className="flexible col">
                <ControlPanel />
                <Console />
            </div>
        );
    }
}

export default MainBlock;
