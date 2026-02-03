import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const stateList = ["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh"];
const stateCities = [
  "", 
  "Alipur | Andaman Island | Anderson Island",
  "Achampet | Adilabad | Adoni",
  "Along | Anini | Anjaw",
  "Abhayapuri | Baithalangshu | Barama",
];

const MyComponent = () => {
  const [data, setData] = useState({});
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    setStateOptions(stateList.map(state => ({ value: state, label: state })));
  }, []);

  const handleStateChange = selectedOption => {
    const stateIndex = stateList.indexOf(selectedOption.value);
    const cities = stateCities[stateIndex].split('|').map(city => ({ value: city.trim(), label: city.trim() }));

    setCityOptions(cities);
    setData({
      ...data,
      state: selectedOption.value,
      city: ''
    });
  };

  const handleCityChange = selectedOption => {
    setData({
      ...data,
      city: selectedOption ? selectedOption.value : ''
    });
  };

  return (
    <div className='d-flex bg-dark'>
      <Select
        className='mb-3 w-50 me-2'
        placeholder='Select State'
        options={stateOptions}
        onChange={handleStateChange}
        isClearable
      />
      <Select
        className='mb-3 w-50'
        placeholder='Select City'
        options={cityOptions}
        onChange={handleCityChange}
        isClearable
        isDisabled={!data.state}
      />
    </div>
  );
};

export default MyComponent;
