import React, { useState, useEffect } from "react";
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import StockChart from './StockChart';

import { getStockWeeklyChart, getStockSeasonalChart } from '../routes/stock_api';

// const MyButton = styled(Button)({
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
// });

const CssTextField = withStyles({
    root: {
        '& .MuiInputBase-root': {
            color: 'white'
        },
        '& .MuiInput-underline:before': {
            borderBottom: '1px solid white'
        },
        '&:hover .MuiInput-underline:before': {
            borderBottom: '2px solid white'
        },
        '& .MuiInputLabel-root': {
            color: 'white'
        }
    },
})(TextField);

const LightButtonGroup = withStyles({
    root: {
        '& .MuiButton-label': {
            color: 'white',
        },
        '& .MuiButtonBase-root': {
            borderColor: 'white'
        },
    },
})(ButtonGroup);

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        marginTop: '1em',
        marginLeft: '0.5em'
    },
    title: {
        marginTop: '1em',
        textAlign: 'center'
    },
    rightAlign: {
        float: 'right',
        marginTop: '0.5em'
    }
}));

const chartColor = "#3f51b5"; // "#ff7300";

const chartSpecs = {
    seasonal: {
        name: 'seasonal',
        chartColor: chartColor,
        XLabel: 'Month',
        YLabel: 'Average Change in Price (%)',
        XKey: 'date',
        YKey: 'close',
        startIndex: 0
    },
    weekly: {
        name: 'weekly',
        chartColor: chartColor,
        XLabel: 'Date',
        YLabel: 'Price (USD)',
        XKey: 'date',
        YKey: 'close',
        startIndex: 0
    }
};

const Dashboard = () => {
    const [data, setData] = useState({});
    const [chartData, setChartData] = useState([]);
    const [chartSpec, setChartSpec] = useState(chartSpecs.weekly);
    const [stock, setStock] = useState("AMZN");
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    // useEffect(() => {
    //     setLoading(true);
    //     getStockWeeklyChart('AMZN')
    //         .then(function (response) {
    //             setData(response.data);
    //             setLoading(false);
    //             setChartData(response.chartData.slice(0, 1000).reverse());
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }, [])

    let fetchData = (() => {
        if (stock != "") {
            if (chartSpec.name === 'weekly') {
                console.log(chartSpec.name);
                setLoading(true);
                getStockWeeklyChart(stock)
                    .then(function (response) {
                        setData(response.data);
                        if (response.chartData) {
                            setChartData(response.chartData.slice(0, 1000).reverse());
                        }
                        setLoading(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                console.log(chartSpec.name);
                setLoading(true);
                getStockSeasonalChart(stock)
                    .then(function (response) {
                        setData(response.data);
                        if (response.chartData) {
                            setChartData(response.chartData); //.slice(0, 1000).reverse());
                        }
                        setLoading(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    });

    let setChartType = (name) => {
        for (let spec in chartSpecs) {
            if (spec === name)  setChartSpec(chartSpecs[spec]);
        }
    }

    // useEffect(fetchData, [chartSpec]); // runs after setChartType updates chart spec

    return (
        <div style={{ backgroundColor: "#1c2025" }}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                style={{ minHeight: '100vh', padding: '1em' }}
            >
                <Grid item>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        fetchData();
                    }}>
                        <CssTextField
                            label="Search for a stock"
                            id="custom-css-outlined-input"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                        <Button variant="contained" color="primary" size="small" className={classes.margin} onClick={fetchData}>Search</Button>
                    </form>
                </Grid>
                <Grid item>
                    {loading ?
                        <Box style={{ marginTop: '4em' }}>
                            <CircularProgress size={120} thickness={3} />
                        </Box>
                        :
                        <Box>
                            <Box style={{ backgroundColor: '#282C34', border: '1px solid #282C34', borderRadius: '8px' }} >
                                <p style={{ textAlign: 'center', marginTop: '1em', marginBottom: '-1.5em' }}>
                                    Stock: {data['Meta Data'] ? data['Meta Data']['2. Symbol'].toUpperCase() : ''}
                                </p>
                                <StockChart chartSpec={chartSpec} chartData={chartData} />
                            </Box>
                            <LightButtonGroup variant="text" color="primary" aria-label="text primary button group" className={classes.rightAlign}>
                                <Button onClick={() => setChartType('weekly')}>Weekly Chart</Button>
                                <Button onClick={() => setChartType('seasonal')}>Seasonal Chart</Button>
                            </LightButtonGroup>
                        </Box>
                    }
                </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard
