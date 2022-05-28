import {useState, useEffect} from 'react';
import { useCallback } from 'react/cjs/react.development';

import './App.css';

import CurrencyService from './CurrencyService';


function App() {

    const [currencies, setCurrencies] = useState();
    const [cryptoCurrencies, setCryptoCurrencies] = useState();
    const [typed, setTyped] = useState(undefined);


    const getCurrencies = async () => {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json');
        const data = await response.json();

        const usd = (data.filter(item => item.cc==="USD"))[0].rate;

        const eur = (data.filter(item => item.cc==="EUR")[0].rate);

        const pln = (data.filter(item => item.cc==="PLN")[0].rate);

        const rub = (data.filter(item => item.cc==="RUB")[0].rate);

        setCurrencies([usd.toFixed(2), eur.toFixed(2), pln.toFixed(2), rub.toFixed(2)]);
    }

    const getCryptoCurrencies = async () => {
        const response = await fetch('https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd');
        const results = await response.json();

        const btc = (results.data.filter(item => item.symbol==="BTC")[0].metrics.market_data.price_usd);

        const eth = (results.data.filter(item => item.symbol==="ETH")[0].metrics.market_data.price_usd);

        const doge = (results.data.filter(item => item.symbol==="DOGE")[0].metrics.market_data.price_usd);


        setCryptoCurrencies([btc.toFixed(2), eth.toFixed(2), doge.toFixed(2)]);
    }



    useEffect(() => {

        getCurrencies();
        getCryptoCurrencies();

    }, []);

    const currenciesReady = (currencies) => {
        if (currencies === undefined) {return 0}
        else {return currencies}
    }

    const onValueChange = (e) => {
        setTyped (e.target.value);
    }

    let dollar = (currenciesReady(currencies)[0]);
    
    
    return (
        <div className="App">
            <header className="App-header">
            </header>

            <form className="form">
                <input type="number"
                    placeholder="Type value here..."
                    name="value"
                    value={typed}
                    onChange={onValueChange}/> 
            </form>

            <section className="currencies">

                <div className="btn-wrapper">

                    <div className="btn-item">
                        <div className="currency-info">{(typed/(currenciesReady(currencies)[0])).toFixed(2)}</div>
                        <div className="btn">USD</div>
                        <div className="currency-rate">{currenciesReady(currencies)[0]}</div>
                    </div>

                    <div className="btn-item">
                        <div className="currency-info">{(typed/(currenciesReady(currencies)[1])).toFixed(2)}</div>
                        <div className="btn">EUR</div>
                        <div className="currency-rate">{currenciesReady(currencies)[1]}</div>
                    </div>

                    <div className="btn-item">
                        <div className="currency-info">{(typed/(currenciesReady(currencies)[2])).toFixed(2)}</div>
                        <div className="btn">PLN</div>
                        <div className="currency-rate">{currenciesReady(currencies)[2]}</div>
                    </div>

                    <div className="btn-item">
                        <div className="currency-info">{(typed/(currenciesReady(currencies)[3])).toFixed(2)}</div>
                        <div className="btn">RUB</div>
                        <div className="currency-rate">{currenciesReady(currencies)[3]}</div>
                    </div>
                </div>

                <div className="btn-wrapper">

                    <div className="btn-item">
                        <div className="currency-info">{((typed/dollar)/currenciesReady(cryptoCurrencies)[0]).toFixed(3)}</div>
                        <div className="btn">BTC</div>
                        <div className="currency-rate">{currenciesReady(cryptoCurrencies)[0]}<br/>USD</div>
                    </div>

                    <div className="btn-item">
                        <div className="currency-info">{((typed/dollar)/currenciesReady(cryptoCurrencies)[1]).toFixed(3)}</div>
                        <div className="btn">ETH</div>
                        <div className="currency-rate">{currenciesReady(cryptoCurrencies)[1]}<br/>USD</div>
                    </div>

                    <div className="btn-item">
                        <div className="currency-info">{((typed/dollar)/currenciesReady(cryptoCurrencies)[2]).toFixed(3)}</div>
                        <div className="btn">DOGE</div>
                        <div className="currency-rate">{currenciesReady(cryptoCurrencies)[2]}<br/>USD</div>
                    </div>

                </div>

            </section>
        </div>
    );
}

export default App;
