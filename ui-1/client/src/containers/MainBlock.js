import React, { Component } from 'react';
import ControlPanel from './ControlPanel'
import Console from './Console'

class MainBlock extends Component {
    render() {
        return (
            <div className="flexible col">
                <ControlPanel />
                <div className="flexible flexDisplay">
                <Console />
                <div className="veryFlexible"></div>
                </div>
            </div>
        );
    }
}

export default MainBlock;
