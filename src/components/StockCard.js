import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

// import { fundamentals } from './MockData';

const StockCard = (props) => {
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        card: {
            backgroundColor: props.color,
            color: 'white'
        },
        bull: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
    });

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const data = props.stockData;

    return (
        <Card className={classes.card} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    {data['Name']}
                    <Box component="span" style={{ float: 'right' }} color="#27af30">
                        &nbsp;&nbsp;{data['currPrice']}
                    </Box>
                </Typography>
                <Typography className={classes.pos}>
                    {data['AssetType']} {bull} {data['Exchange']}:{data['Symbol']}
                </Typography>
                <TableContainer>
                    <Table className={classes.table} aria-label="simple table">
                        <TableRow>
                            <TableCell>Sector</TableCell>
                            <TableCell align="right">{data['Sector']}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Industry</TableCell>
                            <TableCell align="right">{data['Industry']}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>EPS</TableCell>
                            <TableCell align="right">{data['EPS']}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Beta</TableCell>
                            <TableCell align="right">{data['Beta']}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>52-Week High</TableCell>
                            <TableCell align="right">{data['52WeekHigh']}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>52-Week Low</TableCell>
                            <TableCell align="right">{data['52WeekLow']}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Analyst Target Price</TableCell>
                            <TableCell align="right">{data['AnalystTargetPrice']}</TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
}

export default StockCard;