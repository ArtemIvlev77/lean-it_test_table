import Table from '../Table/Table';
import './App.css';
import { dataGenerator } from '../../utils/dataGenerator';
import { useMemo, useState } from 'react';

function App() {
  const data = useMemo(() => dataGenerator(10000), []);
  const [updateData, setUpdateData] = useState(data);
  const generateHandler = (e) => {
    e.preventDefault();
    setUpdateData(dataGenerator(1000001));
  };

  return (
    <div className='App'>
      <form name='reGenerate' onSubmit={(e) => generateHandler(e)}>
        <button type='submit'>Перегенерация данных</button>
      </form>
      <Table generatedData={updateData} />
    </div>
  );
}

export default App;
