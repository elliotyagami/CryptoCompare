import React, { Component } from 'react';
import FromCurrency from './FromCurrency'
import ToCurrency from './ToCurrency'
import ConversionInfo from './ConversionInfo'
import AlgorithmTable from './AlgorithmTable'
class MainBlock extends Component {
    render() {
        return (
            <div className="highlyFlexible flexDisplay">
            <div className="flexDisplay" style={{'flex':'1.35'}}>
            <FromCurrency/>
            <ToCurrency/>
            </div>
            <ConversionInfo/>
            <div className="veryFlexible">
            <AlgorithmTable/>
            </div>
            </div>
        );
    }
}

export default MainBlock;
