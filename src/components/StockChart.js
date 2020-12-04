import React, { PureComponent, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList
} from 'recharts';

const AxisLabel = ({ axisType, x = 20, y = 40, width = 60, height = 270, stroke = "#f5f5f5", children }) => {
    const isVert = axisType === 'yAxis';
    const cx = isVert ? x : x + (width / 2);
    const cy = isVert ? (height / 2) + y : y + height + 10;
    const rot = isVert ? `270 ${cx} ${cy}` : 0;
    return (
        <text x={20} y={175} transform={`rotate(${rot})`} textAnchor="middle" fill={stroke} style={{fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"}}>
            <tspan x={-20} dy="0.355em">{children}</tspan>
        </text>
    );
};

class AxisTick extends PureComponent {
    render() {
      const {
        x, y, stroke, payload,
      } = this.props;
  
      return (
        <g transform={`translate(${x},${y})`}>
          <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
        </g>
      );
    }
  }

const StockChart = (props) => {
    const { name, chartColor, fillColor, XLabel, YLabel, XKey, YKey } = props.chartSpec;
    const { TargetReference, SMAReference } = props;

    const useStyles = makeStyles({
        checkbox: {
            color: chartColor
        }
    });

    const classes = useStyles();

    let startIndex = name == 'weekly' ? props.startIndex : 0;

    let calcDomain = (dataMax) => {
        if (TargetReference && name === 'weekly') {
            return Math.max(dataMax, parseInt(props.stockData['AnalystTargetPrice']) * 1.02);
        }
        return dataMax;
    }

    return (
        <AreaChart
            width={750}
            height={460}
            data={props.chartData}
            margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
        >
            <CartesianGrid stroke="#f5f5f5" vertical={false} />
            <XAxis dataKey={XKey} stroke="#f5f5f5" > {/*tick={<AxisTick/>}>*/}
                <Label value={XLabel} position="bottom" fill="white" />
            </XAxis>
            <YAxis domain={['auto', dataMax => calcDomain(dataMax)]} stroke="#f5f5f5" label={<AxisLabel axisType='yAxis'>{YLabel}</AxisLabel>} />
            <Tooltip
                wrapperStyle={{
                    borderColor: 'white',
                    boxShadow: '1px 1px 2px 0px rgb(204, 204, 204)',
                }}
                contentStyle={{ backgroundColor: 'transparent' }} // 'rgba(255, 255, 255, 0.8)' }}
                labelStyle={{ fontWeight: 'bold', color: '#666666' }}
            />

            {(TargetReference && (name === 'weekly')) &&
                <ReferenceLine y={props.stockData['AnalystTargetPrice']} stroke={chartColor} strokeDasharray="3 3">
                    <Label value="Analyst Target Price" position="top" fill="#e6e6e6" />
                </ReferenceLine>
            }

            {(SMAReference && (name === 'weekly')) &&
                <ReferenceLine y={props.stockData['50DayMovingAverage']} stroke={chartColor} strokeDasharray="3 3">
                    <Label value="50 Day Moving Average" position="top" fill="#e6e6e6" />
                </ReferenceLine>
            }

            {(SMAReference && (name === 'weekly')) &&
                <ReferenceLine y={props.stockData['200DayMovingAverage']} stroke={chartColor} strokeDasharray="3 3">
                    <Label value="200 Day Moving Average" position="top" fill="#e6e6e6" />
                </ReferenceLine>
            }

            <Area dot={false} dataKey={YKey} stroke={chartColor} fill={fillColor} strokeWidth={1.2} yAxisId={0} />
            <Brush dataKey={XKey} startIndex={startIndex} >
                <AreaChart>
                    <CartesianGrid />
                    <YAxis hide domain={['auto', 'auto']} stroke="#f5f5f5" />
                    <Area dataKey={YKey} stroke={chartColor} fill={chartColor} dot={false} />
                </AreaChart>
            </Brush>
        </AreaChart>
    )
}

export default StockChart;