const { weekly, fundamentals } = require('../components/MockData');
const axios = require('axios').default;

exports.getStockWeeklyChart = async (symbol) => {
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=6XL9OK8EMDLWZBWU`;
    let response = {};
    let resObject = await axios.get(url);

    // let resObject = { data: weekly };

    response.data = resObject.data;
    // console.log(response.data);
    if (resObject.data["Weekly Adjusted Time Series"]) {
        let weeklyData = [];
        let dataPoints = resObject.data["Weekly Adjusted Time Series"];
        for (let date in dataPoints) {
            weeklyData.push({
                "date": date,
                "close": parseInt(dataPoints[date]['4. close'])
            });
        }
        response.chartData = weeklyData;
        return response;
    }
}

exports.getStockInfo = async (symbol) => {
    let url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=6XL9OK8EMDLWZBWU`;
    let response = await axios.get(url);

    url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=6XL9OK8EMDLWZBWU`
    let response2 = await axios.get(url);

    console.log(response2);

    response.data['currPrice'] = parseFloat(response2.data['Global Quote']['05. price']).toFixed(2);
    response.data['Change'] = parseFloat(response2.data['Global Quote']["09. change"]).toFixed(2);
    response.data['ChangePercent'] = parseFloat(response2.data['Global Quote']['10. change percent']).toFixed(2);
    response.data['Volume'] = response2.data['Global Quote']['06. volume'];
    response.data['Note'] = response2.data['Note'];

    console.log(response.data['currPrice']);
    console.log(response.data);

    return response; // { data: fundamentals };
}

exports.getStockSeasonalChart = async (symbol) => {
    // TODO: use daily charts for more precision
    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&apikey=6XL9OK8EMDLWZBWU`;
    let response = {};
    let resObject = await axios.get(url);
    let years = 5; // number of years to take into account

    response.data = resObject.data;
    if (resObject.data["Monthly Adjusted Time Series"]) {
        let monthlyData = [];
        let dataPoints = resObject.data["Monthly Adjusted Time Series"];
        for (let date in dataPoints) {
            let month = new Date(date).toLocaleString('default', { month: 'long' });
            let year = new Date(date).getFullYear();
            monthlyData.push({
                "date": date,
                "month": month,
                "year": year,
                "close": parseInt(dataPoints[date]['4. close'])
            });
        }
        monthlyData = monthlyData.slice(0, years * 12).reverse();

        let monthlyDeltas = {};
        let i = 0;
        // find beginning of the year and start calculating seasonal deltas from there
        while (i < monthlyData.length && monthlyData[i]['month'] !== 'January') i++;

        let yearStartPrice = monthlyData[i]['close'];
        monthlyDeltas['January'] = [0]
        i++;

        while (i < monthlyData.length - 1) {
            // uncomment below to include change from Dec -> Jan
            // let month = monthlyData[i]['month'];
            // let delta = Math.round((monthlyData[i]['close'] - yearStartPrice) / yearStartPrice * 100);
            // if (monthlyDeltas[month]) {
            //     monthlyDeltas[month].push(delta);
            // } else {
            //     monthlyDeltas[month] = [delta];
            // }
            if (monthlyData[i]['month'] === 'January') { // reset baseline price every year
                yearStartPrice = monthlyData[i]['close'];
            } else {
                let month = monthlyData[i]['month'];
                let delta = Math.round((monthlyData[i]['close'] - yearStartPrice) / yearStartPrice * 100);
                if (monthlyDeltas[month]) {
                    monthlyDeltas[month].push(delta);
                } else {
                    monthlyDeltas[month] = [delta];
                }
            }
            i++;
        }

        console.log(monthlyDeltas);
        let chartData = [];

        for (let month in monthlyDeltas) {
            let deltas = monthlyDeltas[month];
            let avg = 0;
            for (let delta of deltas) {
                avg += delta;
            }
            avg = Math.round(avg / deltas.length);
            chartData.push({
                date: month.substring(0, 3),
                close: avg
            });
        }
        response.chartData = chartData.sort((a, b) => {
            let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months.indexOf(a.date) - months.indexOf(b.date);
        });
        console.log(response.chartData);
        return response;
    }
}