import React, { useState } from "react";

const PropertyGrowthCalculator = () => {
  const [properties, setProperties] = useState([]);
  const initialPropertyState = {
    purchasePrice: 0,
    rentalIncome: 0,
    insurance: 0,
    power: 0,
    water: 0,
    managementFees: 0,
    rates: 0,
    annualGrowth: [0],
  };

  const [newProperty, setNewProperty] = useState(initialPropertyState);

  const handleAddProperty = () => {
    setProperties([...properties, newProperty]);
    setNewProperty(initialPropertyState);
  };

  const calculatePropertyValue = React.useMemo(() => (property, years) => {
    let value = property.purchasePrice;
    for (let i = 0; i < years; i++) {
      const growth =
        property.annualGrowth[i] ||
        property.annualGrowth[property.annualGrowth.length - 1];
      value += value * (growth / 100);
    }
    return value;
  }, []);

  const calculateNetIncome = React.useMemo(() => (property) => {
    const annualRentalIncome = property.rentalIncome * 52;
    const annualExpenses =
      property.insurance +
      property.power +
      property.water +
      property.managementFees +
      property.rates;
    return annualRentalIncome - annualExpenses;
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ marginBottom: '1rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '0.5rem' }}>
        <h2>Add New Property</h2>
        <input type="number" placeholder="Purchase Price" onChange={(e) => setNewProperty({ ...newProperty, purchasePrice: (() => { const val = parseFloat(e.target.value); return isNaN(val) ? 0 : val; })() })} />
        <input type="number" placeholder="Weekly Rental Income" onChange={(e) => setNewProperty({ ...newProperty, rentalIncome: (() => { const val = parseFloat(e.target.value); return isNaN(val) ? 0 : val; })() })} />
        <input type="number" placeholder="Insurance" onChange={(e) => setNewProperty({ ...newProperty, insurance: (() => { const val = parseFloat(e.target.value); return isNaN(val) ? 0 : val; })() })} />
        <input type="number" placeholder="Power" onChange={(e) => setNewProperty({ ...newProperty, power: (() => { const val = parseFloat(e.target.value); return isNaN(val) ? 0 : val; })() })} />
        <input type="number" placeholder="Water" onChange={(e) => setNewProperty({ ...newProperty, water: (() => { const val = parseFloat(e.target.value); return isNaN(val) ? 0 : val; })() })} />
        <input type="number" placeholder="Management Fees" onChange={(e) => setNewProperty({ ...newProperty, managementFees: (() => { const val = parseFloat(e.target.value); return isNaN(val) ? 0 : val; })() })} />
        <input type="number" placeholder="Rates" onChange={(e) => setNewProperty({ ...newProperty, rates: (() => { const val = parseFloat(e.target.value); return isNaN(val) ? 0 : val; })() })} />
        <input type="text" placeholder="Annual Growth % (comma separated)" onChange={(e) => setNewProperty({ ...newProperty, annualGrowth: e.target.value.split(',').map(val => parseFloat(val.trim())) })} />
        <button onClick={handleAddProperty}>Add Property</button>
      </div>

      <div>
        {properties.map((property, index) => (
          <div key={`property-${index}`} style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
            <h3>Property {index + 1}</h3>
            <p>Current Value after 10 years: ${calculatePropertyValue(property, 10).toFixed(2)}</p>
            <p>Annual Net Income: ${calculateNetIncome(property).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyGrowthCalculator;
