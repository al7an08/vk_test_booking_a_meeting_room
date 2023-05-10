import { useState } from 'react'
import Dropdown from './components/Dropdown';
import MenuItem from './components/MenuItem';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import dayjs from 'dayjs';

import 'dayjs/locale/ru';

import styled from "styled-components";



type Item = {
  label: string;
  value: any;
}

const towers: Item[] = [
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
const floors: Item[] = createItems('Этаж', 3, 37);

const meetingRooms: Item[] = createItems('Переговорная - номер ', 1, 10);


const App = () => {

  const [towerLabel, setTowerLabel] = useState('');
  const [floorLabel, setFloorLabel] = useState('');
  const [meetingRoomLabel, setMeetingRoomLabel] = useState('');

  const [date, setDate] = useState(dayjs(''));

  const [startTime, setStartTime] = useState(dayjs(''));
  const [endTime, setEndTime] = useState(dayjs(''));

  const [comment, setComment] = useState('');

  function storageAndShowData(): void {
    if (towerLabel && floorLabel && meetingRoomLabel && date) {
      if (endTime.diff(startTime) > 0) {
        let data = {
          tower: '',
          floor: '',
          meetingRoom: '',
          comment: '',
          date: '',
          startTime: '',
          endTime: ''
        }
        data.tower = towerLabel;
        data.floor = floorLabel;
        data.meetingRoom = meetingRoomLabel;
        data.startTime = startTime?.add(3, 'hours').toJSON().slice(11, 19);
        data.endTime = endTime?.add(3, 'hours').toJSON().slice(11, 19);
        data.comment = comment ? comment : 'Нет комментария'
        data.date = date?.toJSON().slice(0, 10);
        console.log(JSON.stringify(data));
        alert('Отправлено! Данные выведены в консоль в виде JSON');
      }
      else {
        alert('Время начала и/или завершения введено неверно! Пожалуйста, проверьте правильность введённых данных');
      }
    }
    else {
      alert('Какое-то из полей не заполнено! Пожалуйста, проверьте правильность введённых данных');
    }
  }
  const handleClear = (e: any) => {
    e.preventDefault()
    setTowerLabel('');
    setFloorLabel('');
    setMeetingRoomLabel('');
    setComment('');
    setDate(dayjs(''));
    setStartTime(dayjs(''));
    setEndTime(dayjs(''));
  }


  return (
    <div className='App'>
      <Header> Выбор Переговорной</Header>
      <Dropdown label={towerLabel ? towerLabel : 'Выберите башню'} onChange={(item) => setTowerLabel(item.label)}>
        {
          towers.map(item => (
            <MenuItem key={item.value} value={item}>
              {item.label}
            </MenuItem>
          ))
        }
      </Dropdown>
      <Dropdown label={floorLabel ? floorLabel : 'Выберите этаж'} onChange={(item) => setFloorLabel(item.label)}>
        {
          floors.map(item => (
            <MenuItem key={item.value} value={item}>
              {item.label}
            </MenuItem>
          ))
        }
      </Dropdown>
      <Dropdown label={meetingRoomLabel ? meetingRoomLabel : 'Выберите переговорную'} onChange={(item) => setMeetingRoomLabel(item.label)}>
        {
          meetingRooms.map(item => (
            <MenuItem key={item.value} value={item}>
              {item.label}
            </MenuItem>
          ))
        }
      </Dropdown>
      <LocalizationProvider className='LocalizationProvider' dateAdapter={AdapterDayjs} adapterLocale="ru">
        <div className="timeStuff">
          <DatePicker sx={{ margin: '10px' }} className='datePicker' value={date} onChange={(value) => setDate(value ? value : date)} />
          <TimePicker sx={{ margin: '10px' }} className='timePicker'
            label="Время начала"
            defaultValue={startTime}
            value={startTime}
            onChange={(value) => setStartTime(value ? value : startTime)}
          />
          <TimePicker sx={{ margin: '10px' }} className='timePicker' label="Время завершения"
            defaultValue={endTime}
            value={endTime}
            onChange={(value) => setEndTime(value ? value : endTime)} />
        </div>
      </LocalizationProvider>
      <TextArea value={comment} placeholder='Введите комментарий' onChange={(e) => { setComment(e.target.value) }}></TextArea>
      <Button onClick={storageAndShowData}>Отправить</Button>
      <Button onClick={handleClear}>Очистить</Button>
    </div>
  )
}

const StyledDatePicker = styled(DatePicker);

const TextArea = styled.textarea`
  align-self: center;
  width: 50%;
  height: 100px;
`
const Header = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0;
  font-weight: 500;
`;

const Button = styled.button`
  height: 100px;
  width: 150px;
  align-self: center;
  margin: 1%;
  border-radius: 10px;
  background-color: #abd5d5;
  font-size: large;
`



export default App