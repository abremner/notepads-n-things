import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      storeData: [],
      chadstoneSales: 0,
      mostSales: {},
      vicSales: 0,
      bestPSM: {},
    }
    this.generateReport = this.generateReport.bind(this);
    this.getData = this.getData.bind(this);
    this.getChadstoneSales = this.getChadstoneSales.bind(this);
  }
  getChadstoneSales() {
    const data = this.state.storeData;
    const chadstone = data.find((store) => store.centre === 'Chadstone');
    return chadstone.totalSales;
  }
  getMostSales() {
    const data = this.state.storeData;
    let totalSales = 0;
    let mostSalesStore = {};
    data.forEach((store) => {
      if (store.totalSales > totalSales) {
        totalSales = store.totalSales;
        mostSalesStore = store;
      }
    })
    return mostSalesStore;
  }
  getVicSales() {
    const data = this.state.storeData;
    const vicStores = data.filter(store => store.state === 'VIC');
    let vicSales = 0;
    vicStores.forEach(store => vicSales += store.totalSales);
    return vicSales;
  }
  getBestPSM() {
    const data = this.state.storeData;
    let topPSM = 0;
    let bestPSMStore = {};
    data.forEach((store) => {
      const psm = (store.totalSales / store.area).toFixed(2);
      if (psm > topPSM) {
        topPSM = psm;
        bestPSMStore = store;
      }
    })
    return {topPSM, ...bestPSMStore};
  }
  async getData() {
    let response = await fetch('./sales_data.json');
    let data = await response.json();
    return data;
  }
  async generateReport() {
    await this.getData().then(data => this.setState({storeData: data}));
    const chadstoneSales = this.getChadstoneSales();
    const mostSales = this.getMostSales();
    const vicSales = this.getVicSales();
    const bestPSM = this.getBestPSM();
    this.setState({
      chadstoneSales,
      mostSales,
      vicSales,
      bestPSM
    })
  }
  render() {
    const {storeData, chadstoneSales, mostSales, vicSales, bestPSM} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Notepads 'n' Things <span>🗒️</span></h1>
          <h2>Report Generator</h2>
        </header>
        <section>
          <button type="button" onClick={this.generateReport}>Generate Report</button>
          {storeData.length > 0 && <ul>
            <li>The total sales reported by the flagship store Chadstone is {`$${chadstoneSales}`}</li>
            <li>The centre where we took the most sales is {mostSales.centre} with {`$${mostSales.totalSales}`} in sales</li>
            <li>The total sales reported by stores in Victoria is {`$${vicSales}`}</li>
            <li>The store with the highest sales PSM is {bestPSM.centre} with {`$${bestPSM.topPSM}`}</li>
          </ul>}
        </section>
      </div>
    );
  }
}

export default App;
