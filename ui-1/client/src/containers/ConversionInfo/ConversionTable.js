import React, { Component } from 'react';

const TABLE_FORMATS = ['PRICE', 'OPEN24HOUR', 'CHANGEPCT24HOUR', 'CHANGE24HOUR', 'HIGH24HOUR', 'LOW24HOUR', 'TOTALVOLUME24HTO']

const label = ['Price','24hr Open Price','24hr % Change','24hr Change','24hr High','24hr Low','Total 24hr Volume']

class MainBlock extends Component {
    constructor() {
        super()
        this.printConsole = this.printConsole.bind(this)
    }
    printConsole(ind){
        let value_ = this.props.state[this.props.from][this.props.to][TABLE_FORMATS[ind]]
        this.props.addToConsole({label: label[ind],value: value_, from: this.props.from, to: this.props.to})
    }

    render() {
        return (
            <table>
                <tbody>
                    {TABLE_FORMATS.map((ele,i) => (
                        <tr className="darker clickable" key={i} onClick={() => this.printConsole(i)}>
                            <th>{label[i]}</th>
                            <th className="value">
                                <b>{this.props.state && this.props.state[this.props.from] && this.props.state[this.props.from][this.props.to] ? this.props.state[this.props.from][this.props.to][ele]: ""}</b>
                            </th>
                        </tr>)
                    )}
                </tbody>
            </table>
        );
    }
}

export default MainBlock;
