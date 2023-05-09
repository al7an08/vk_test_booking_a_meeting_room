import React from 'react'
import Dropdown from './components/Dropdown';
import MenuItem from './components/MenuItem';

type Item = {
  label: string;
  value: any;
}

const items: Item[] = [
  { label: 'Tower A', value: 'A' },
  { label: 'Tower B', value: 'B' },
];

const App = () => {
  return (
    <Dropdown label={'Choose tower'} onChange={item => (console.log(item))}>
      {
        items.map(item => (
          <MenuItem key={item.value} value={item}>
            {item.label}
          </MenuItem>
        ))
      }
    </Dropdown>
  )
}

export default App