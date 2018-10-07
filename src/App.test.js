import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

const mockData = [{ "state": "VIC", "centre": "Altona Gate", "totalSales": 4535, "unit": "L0-95", "area": 239 }, { "state": "NSW", "centre": "Bathurst City Centre", "totalSales": 4157, "unit": "L2-24", "area": 229 }, { "state": "VIC", "centre": "Bentons Square", "totalSales": 4286, "unit": "L1-30", "area": 210 }, { "state": "VIC", "centre": "Box Hill Central", "totalSales": 4140, "unit": "L2-78", "area": 208 }, { "state": "NSW", "centre": "Carlingford Court", "totalSales": 4864, "unit": "L3-34", "area": 245 }, { "state": "VIC", "centre": "Chadstone", "totalSales": 6642, "unit": "L3-99", "area": 360 }, { "state": "VIC", "centre": "Corio Central", "totalSales": 4962, "unit": "L3-76", "area": 216 }, { "state": "NSW", "centre": "DFO Homebush", "totalSales": 4443, "unit": "L0-62", "area": 250 }, { "state": "QLD", "centre": "Northshore Village", "totalSales": 4131, "unit": "L3-52", "area": 200 }, { "state": "QLD", "centre": "Grand Plaza", "totalSales": 4537, "unit": "L0-9", "area": 218 }, { "state": "VIC", "centre": "Mornington Central", "totalSales": 4191, "unit": "L3-49", "area": 223 }, { "state": "VIC", "centre": "The Glen", "totalSales": 4843, "unit": "L0-85", "area": 223 }, { "state": "QLD", "centre": "The Myer Centre Brisbane", "totalSales": 4661, "unit": "L0-87", "area": 247 }, { "state": "WA", "centre": "Stirlings Central", "totalSales": 4133, "unit": "L1-6", "area": 208 }, { "state": "WA", "centre": "Livingston Marketplace", "totalSales": 4763, "unit": "L3-27", "area": 215 }, { "state": "WA", "centre": "Flinders Square", "totalSales": 4415, "unit": "L2-57", "area": 209 }];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Reports for Notepads n Things', () => {
  const wrapper = shallow(<App/>);
  it('Should find correct price for Chadstone', () => {
    expect(wrapper.instance().getChadstoneSales(mockData)).toBe(6642);
  });
  it('Should find store with most sales', () => {
    expect(wrapper.instance().getMostSales(mockData).centre).toBe('Chadstone');
  });
  it('Should find total sales in VIC', () => {
    expect(wrapper.instance().getVicSales(mockData)).toBe(33599);
  });
  it('Should find store with highest PSM', () => {
    expect(wrapper.instance().getBestPSM(mockData).topPSM).toBe('22.97');
  });
})
