import React from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: makeData()
    };
    this.requestData = this.requestData.bind(this)
  }
  requestData(url) {
    var currentRequest = new XMLHttpRequest();
    currentRequest.open("GET", url);
    currentRequest.onload = function () {
        let data = JSON.parse(currentRequest.responseText);
        console.log(data)
        this.setState({daata: data})
    }.bind(this)
    currentRequest.send();
}
  componentDidMount(){
    this.requestData("https://whattomine.com/coins.json")
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[{
      Header: 'Mining Profitability',
      columns: [{
        Header: 'Algorithms',
        accessor: 'algorithm'
      }]
    }]}
    SubComponent={row=> console.log(row)}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

