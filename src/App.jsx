import React from 'react';
import PropertyGrowthCalculator from './components/PropertyGrowthCalculator';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Property Growth Calculator</h1>
      <PropertyGrowthCalculator />
    </div>
  );
};

export default App;
