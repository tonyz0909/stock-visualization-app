import React, { useState, useEffect, useRef } from "react";
import { makeStyles, withStyles, styled } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import StockChart from './StockChart';
import ChartJS from './ChartJS';
import StockCard from './StockCard';
import FinancialsCard from './FinancialsCard';

import { getStockWeeklyChart, getStockSeasonalChart, getStockInfo } from '../routes/stock_api';
import OwnershipChart from "./OwnershipChart";
import { Typography } from "@material-ui/core";

// const MyButton = styled(Button)({
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     border: 0,
//     borderRadius: 3,
//     boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
//     height: 48,
//     padding: '0 30px',
// });


const chartColor = "#3f51b5"; // "#ff7300";
const fillColor = "rgba(63, 81, 181, 0.3)"

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

const useStyles = makeStyles((theme) => ({
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
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '1.5em',
        marginBottom: '0.5em'
    },
    checkbox: {
        color: chartColor,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    text: {
        color: 'white'
    }
}));

const chartSpecs = {
    seasonal: {
        name: 'seasonal',
        chartColor: chartColor,
        fillColor: fillColor,
        XLabel: 'Month',
        YLabel: 'Average Change in Price (%)',
        XKey: 'date',
        YKey: 'close',
    },
    weekly: {
        name: 'weekly',
        chartColor: chartColor,
        fillColor: fillColor,
        XLabel: 'Date',
        YLabel: 'Price (USD)',
        XKey: 'date',
        YKey: 'close',
    }
};

let cardColor = '#282C34';

const Dashboard = () => {
    const [data, setData] = useState({});
    const [chartData, setChartData] = useState([]);
    const [chartSpec, setChartSpec] = useState(chartSpecs.weekly);
    const [OwnershipData, setOwnershipData] = useState([]);
    const [stock, setStock] = useState("AMZN");
    const [stockData, setStockData] = useState({});
    const [loading, setLoading] = useState(false);
    const [chartLoading, setchartLoading] = useState(false);

    // stockChart state
    const [TargetReference, setTargetReference] = useState(false);
    const [SMAReference, setSMAReference] = useState(false);

    const classes = useStyles();

    useEffect(() => {
        // getStockWeeklyChart('AMZN')
        //     .then(function (response) {
        //         setData(response.data);
        //         setLoading(false);
        //         setChartData(response.chartData.slice(0, 1000).reverse());
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        fetchStockDataOnly(); // needed to prevent fetchChartData's useEffect from firing redundantly upon first render
    }, [])

    let fetchStockData = (() => {
        fetchStockDataOnly();
        fetchChartData();
    });

    let fetchStockDataOnly = (() => {
        if (stock != "") {
            setLoading(true);
            getStockInfo(stock)
                .then((response) => {
                    console.log(response.data);
                    setStockData(response.data);
                    setOwnershipData([
                        {
                            name: 'Percent Insiders',
                            value: +parseFloat(response.data['PercentInsiders']).toFixed(2)
                        },
                        {
                            name: 'Percent Institutions',
                            value: +parseFloat(response.data['PercentInstitutions']).toFixed(2)
                        },
                        {
                            name: 'Other',
                            value: +(100 - parseFloat(response.data['PercentInsiders']) - parseFloat(response.data['PercentInstitutions'])).toFixed(2)
                        }
                    ]);
                })
                .catch((err) => {
                    alert("API limit has been reached. Wait 1 minute before trying again.");
                    console.log(err);
                });
        }
    });

    let fetchChartData = (() => {
        if (stock != "") {
            if (chartSpec.name === 'weekly') {
                console.log(chartSpec.name);
                setchartLoading(true);
                getStockWeeklyChart(stock)
                    .then(function (response) {
                        console.log(response.data);
                        setData(response.data);
                        if (response.chartData) {
                            setChartData(response.chartData.slice(0, 1000).reverse());
                        }
                        setchartLoading(false);
                        setLoading(false);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                console.log(chartSpec.name);
                setchartLoading(true);
                getStockSeasonalChart(stock)
                    .then(function (response) {
                        setData(response.data);
                        if (response.chartData) {
                            setChartData(response.chartData); //.slice(0, 1000).reverse());
                        }
                        setchartLoading(false);
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
            if (spec === name) setChartSpec(chartSpecs[spec]);
        }
    }

    let handleTargetCheck = (event) => {
        setTargetReference(event.target.checked);
    }

    let handleSMACheck = (event) => {
        setSMAReference(event.target.checked);
    }

    useEffect(fetchChartData, [chartSpec]); // runs after setChartType updates chart spec and upon first render

    return (
        <div style={{ backgroundColor: "#1c2025" }}>
            <Grid container direction="column" style={{ padding: '1em' }}>
                <Grid container direction="row">
                    <Grid item lg={6}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            fetchStockData();
                        }}>
                            <CssTextField
                                label="Search for a stock"
                                id="custom-css-outlined-input"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                            <Button variant="contained" color="primary" size="small" className={classes.margin} onClick={fetchStockData}>Search</Button>
                        </form>
                    </Grid>
                    <Grid item lg={6} style={{ marginBottom: '0.2em', marginTop: '2.3em', display: 'flex', justifyContent: 'flex-end', color: 'white' }}>
                        {/* <Box className={classes.rightAlign}> */}
                        <LightButtonGroup variant="text" color="primary" aria-label="text primary button group" >
                            <Button size="small" onClick={() => setChartType('weekly')}>Weekly Chart</Button>
                            <Button size="small" onClick={() => setChartType('seasonal')}>Seasonal Chart</Button>
                        </LightButtonGroup>
                        {/* </Box> */}
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                >
                    <Grid id="searchContainer" item lg={5}>
                        <StockCard stock={stock} color={cardColor} stockData={stockData} />
                    </Grid>
                    <Grid id="chartContainer" item lg={7} >
                        {(chartLoading && !loading) ?
                            <Box style={{ marginTop: '4em', textAlign: 'center' }}>
                                <CircularProgress size={120} thickness={3} />
                            </Box>
                            :
                            <Box>
                                <Box style={{ backgroundColor: cardColor, border: '1px solid #282C34', borderRadius: '8px' }} >
                                    <Typography style={{ textAlign: 'center', marginTop: '1em', marginBottom: '-1.5em' }} className={classes.text}>
                                        {chartSpec.name.charAt(0).toUpperCase() + chartSpec.name.substring(1)} chart for {data['Meta Data'] ? data['Meta Data']['2. Symbol'].toUpperCase() : ''}
                                    </Typography>
                                    <StockChart chartSpec={chartSpec} chartData={chartData} stockData={stockData} TargetReference={TargetReference} SMAReference={SMAReference} startIndex={chartData.length - 40} />
                                    <Grid container spacing={2} justify="center" style={{ display: 'flex', marginTop: '-10px' }}>
                                        <Grid item>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={TargetReference}
                                                    onChange={handleTargetCheck}
                                                    color="primary"
                                                    size="small"
                                                    className={classes.checkbox}
                                                />}
                                                label="Analyst Target Price"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel
                                                control={<Checkbox
                                                    checked={SMAReference}
                                                    onChange={handleSMACheck}
                                                    color="primary"
                                                    size="small"
                                                    className={classes.checkbox}
                                                />}
                                                label="Simple Moving Averages"
                                            />
                                        </Grid>
                                    </Grid>
                                    {/* <ChartJS chartData={chartData} /> */}
                                </Box>
                            </Box>
                        }
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    style={{ marginTop: '1em' }}
                >
                    <Grid item lg={12}>
                        <FinancialsCard stock={stock} color={cardColor} stockData={stockData} chartSpec={chartSpec} OwnershipData={OwnershipData} />
                    </Grid>
                </Grid>
            </Grid>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress size={120} thickness={3} />
            </Backdrop>
        </div>
    );
}

export default Dashboard
