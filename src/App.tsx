import { useState } from 'react'
import Dropdown from './components/Dropdown';
import MenuItem from './components/MenuItem';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import dayjs from 'dayjs';

import 'dayjs/locale/ru';

import styled from "styled-components";

import { TimeValidationProps } from '@mui/x-date-pickers/internals';

import { DateTimeValidationProps } from '@mui/x-date-pickers/internals';

type Item = {
  label: string;
  value: any;
}

const items: Item[] = [
  { label: 'Tower A', value: 'A' },
  { label: 'Tower B', value: 'B' },
];

function createItems(text: string, a: number, b: number): Item[] {
  let array: Item[] = [];
  for (let index = a; index <= b; index++) {
    array.push({ label: `${text} ${index}`, value: index })
  }
  return array;
}
const items1: Item[] = createItems('Этаж', 3, 37);

const items2: Item[] = createItems('Переговорная - номер ', 1, 10);

const App = () => {

  const [label1, setLabel1] = useState('');
  const [label2, setLabel2] = useState('');
  const [label3, setLabel3] = useState('');

  const [date, setDate] = useState<Date>();

  return (
    <div className='App'>
      <Header> Выбор Переговорной</Header>
      <Dropdown label={label1 ? label1 : 'Выберите башню'} onChange={(item) => setLabel1(item.label)}>
        {
          items.map(item => (
            <MenuItem key={item.value} value={item}>
              {item.label}
            </MenuItem>
          ))
        }
      </Dropdown>
      <Dropdown label={label2 ? label2 : 'Выберите этаж'} onChange={(item) => setLabel2(item.label)}>
        {
          items1.map(item => (
            <MenuItem key={item.value} value={item}>
              {item.label}
            </MenuItem>
          ))
        }
      </Dropdown>
      <Dropdown label={label3 ? label3 : 'Выберите переговорную'} onChange={(item) => setLabel3(item.label)}>
        {
          items2.map(item => (
            <MenuItem key={item.value} value={item}>
              {item.label}
            </MenuItem>
          ))
        }
      </Dropdown>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <DatePicker className='datePicker' onChange={(value: Date | null) => setDate(value ? value : date)} />
        <TimePicker className='timePicker' label="Время начала"
          defaultValue={dayjs('2022-04-17T15:30')} />
        <TimePicker className='timePicker' label="Время завершения"
          defaultValue={dayjs('2022-04-17T15:30')} />
      </LocalizationProvider>
      <button onClick={() => { console.log(date?.toJSON().slice(0, 10)) }}>dsadad</button>
      <footer style={{ display: 'flex', alignSelf: 'flex-end' }}>Суянов Алтан</footer>
    </div>
  )
}


const Header = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2%;
  padding: 0;
`;
export default App