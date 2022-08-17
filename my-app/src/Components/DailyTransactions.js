import "./DailyTransactions.css";

const Details = (props) => {
    const {transactions} = props;

    const getDailyBalances = () => {
        let dailyBalances = {}; 
        transactions.forEach((transaction) => {
            const toNumber = parseFloat(parseFloat(transaction.Amount).toFixed(2));

            if(dailyBalances.hasOwnProperty(transaction.Date)){
                dailyBalances[transaction.Date] = dailyBalances[transaction.Date] + toNumber;
            } else{
                dailyBalances[transaction.Date] = toNumber;
            }
            dailyBalances[transaction.Date] = parseFloat(dailyBalances[transaction.Date]).toFixed(2);
        });
        console.log(dailyBalances);
        return (
            <div className="dailyBalanceWrapper">
                <div className="dailyBalancesRowHeader">
                                <div className="dailyBalanceRowLeft">{'Date'}</div>
                                <div className="dailyBalanceRowRight">{'Total Amount'}</div>
                            </div>
                {
                    Object.keys(dailyBalances).map((key)  => {   
                        console.log(key, dailyBalances[key]);
                        return (
                            <div key={`dailyBalances-${key}-wrapper`} className="dailyBalancesRow">
                                <div className="dailyBalanceRowLeft">{key}</div>
                                <div className="dailyBalanceRowRight">{dailyBalances[key]}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <div key="daily-transactions" className='dailyTransactions'>
           <h2><center>{'Running daily balances'}</center></h2>
           {getDailyBalances()}
        </div>
    )
}

export default Details;