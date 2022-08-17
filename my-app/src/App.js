import React, {useEffect, useState} from 'react';
import './App.css';
import DailyTransactions from './Components/DailyTransactions';

function App() {
  const [transactions, setTransactions] = useState([]); //Save all transactions here

  // Fetch one page transaction at a time 
  const fetchData = async (page) => {
    try{
      const res = await fetch(`https://resttest.bench.co/transactions/${page}.json`); 
      return res.json(); 
    } catch(e){
      //Here you can send logs to thrid party providers such as snowplow, raygun 
      console.log(e); 
    }
  }
  
  // Fetch all the transaction data 
  const fetchAllData = async () => {
    let endOfList = false;
    let items = [];
    let currentPage = 1;
    let totalCount = 1; 

    while(endOfList === false) {
        const result = await fetchData(currentPage);
        totalCount= result.totalCount;
        items = [...items, ...result.transactions];
        if(items.length === totalCount){
          break; 
        }
        currentPage += 1;
    }
    setTransactions(items); //Save the transactions using this function 
  }

  // Fetch transaction data at the first component load 
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="App">
      {transactions && transactions.length>0 && (<DailyTransactions transactions={transactions}/>)}
    </div>
  );
}

export default App;
