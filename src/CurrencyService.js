<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>

const CurrencyService = () => {

    const getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    const getSelectedCurrencies = async () => {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json');
        const data = await response.json();
        const currencyUSD = data.filter(item => item.cc==="USD");
        const currencyEUR = data.filter(item => item.cc==="EUR");
        const currencyPLN = data.filter(item => item.cc==="PLN");
        const currencyRUB = data.filter(item => item.cc==="RUB");
        return response.data.results.map(_transformCurrency);
    }

    const getCurrency = async (selected) => {
        const response = await getResource(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json`);
        const currency = response.filter(item => item.cc===selected);
        return currency[0].rate;
    }

    const _transformCurrency = (cur) => {
        return {rate: cur.rate}
    }

    return {getSelectedCurrencies, getCurrency};
}

export default CurrencyService;