import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import Link from '@material-ui/core/Link';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import OwnershipChart from './OwnershipChart';
// import StackedBar from './StackedBar';
// import { fundamentals } from './MockData';

const FinancialsCard = (props) => {
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        card: {
            backgroundColor: props.color,
            color: 'white'
        },
    });

    const classes = useStyles();
    const data = props.stockData;

    const formatMarketCap = (val) => {
            // Nine Zeroes for Billions
            let converted =  Math.abs(Number(val)) >= 1.0e+9
        
            ? Math.abs(Number(val)).toFixed(2) / 1.0e+9 + "B"
            // Six Zeroes for Millions 
            : Math.abs(Number(val)) >= 1.0e+6
        
            ? Math.abs(Number(val)).toFixed(2) / 1.0e+6 + "M"
            // Three Zeroes for Thousands
            : Math.abs(Number(val)) >= 1.0e+3
        
            ? Math.abs(Number(val)).toFixed(2) / 1.0e+3 + "K"
        
            : Math.abs(Number(val)).toFixed(2);
            return converted;
    }

    const { chartSpec, OwnershipData } = props;

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Grid container
                    spacing={2}
                    direction="row">
                    <Grid item sm={4}>
                        <Typography variant="h5" component="h2">
                            Analysis
                        </Typography>
                        <TableContainer>
                            <Table className={classes.table} aria-label="simple table">
                                <TableRow>
                                    <TableCell>50-Day Moving Average</TableCell>
                                    <TableCell align="right">{data['50DayMovingAverage']} ({data['currPrice'] > data['50DayMovingAverage'] ? <span style={{ color: 'rgba(46, 238, 102)' }}>&uarr;</span> : <span style={{ color: 'rgb(254, 61, 87)' }}>&darr;</span>} {Math.round((Math.abs(data['currPrice'] - data['50DayMovingAverage']) / data['50DayMovingAverage']) * 100)}%)</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>200-Day Moving Average</TableCell>
                                    <TableCell align="right">{data['200DayMovingAverage']} ({data['currPrice'] > data['200DayMovingAverage'] ? <span style={{ color: 'rgba(46, 238, 102)' }}>&uarr;</span> : <span style={{ color: 'rgb(254, 61, 87)' }}>&darr;</span>} {Math.round(Math.abs(data['currPrice'] - data['200DayMovingAverage'])  / data['200DayMovingAverage'] * 100)}%)</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Percent Insiders</TableCell>
                                    <TableCell align="right">{data['PercentInsiders']}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Percent Institutions</TableCell>
                                    <TableCell align="right">{data['PercentInstitutions']}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Market Capitalization</TableCell>
                                    <TableCell align="right">{formatMarketCap(data['MarketCapitalization'])}</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography variant="h5" component="h2" style={{ marginBottom: '0.5em' }} >
                            Stock Ownership
                        </Typography>
                        <OwnershipChart chartSpec={chartSpec} chartData={OwnershipData} />
                    </Grid>
                    <Grid item sm={4}>
                        <Typography variant="h5" component="h2">
                            Description
                        </Typography>
                        <Typography variant="body2" component="p" style={{ textAlign: 'justify' }}> 
                            {data['Description'] && data['Description'].substring(0, 600)}... 
                            <Link href="#" onClick={e => e.preventDefault()}>See More</Link>
                        </Typography>
                    </Grid>
                    {/* <Grid item sm={4}>
                        <Typography variant="h5" component="h2" style={{ marginBottom: '0.5em' }} >
                            Current Price
                        </Typography>
                        <StackedBar chartSpec={chartSpec} chartData={data} />
                    </Grid> */}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default FinancialsCard;