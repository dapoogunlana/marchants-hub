import React from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryContainer,
  VictoryLabel,
} from "victory";

interface barChartProps {
    data: Array<any>;
}
function BarChart(props: any) {
  return (
    <div >
      <VictoryChart
        domainPadding={{x: 15}}
        width={800}
        containerComponent={<VictoryContainer height={props.height} responsive={true} />}
      >
        <VictoryAxis dependentAxis={true}  
        // offsetX={100}
        style={{
          tickLabels: {fontSize: 11, fill: 'grey'},
        }} 
        />
        <VictoryAxis
          tickLabelComponent={
            <VictoryLabel angle={45} y={255} verticalAnchor={"middle"} textAnchor="start" />
          }
          style={{
            tickLabels: { fontSize: 11, padding: 10 , fill: 'grey'},
          }}
        />
        <VictoryBar
          domain={{ x: [ 0, 10] }}
          barWidth={50}
          barRatio={0.9}
          style={{ data: { fill: "#019a48" } }}
          data={props.data}
          x="x"
          y="y"
          labels={({ datum }) => `${datum.y}`}
        />
      </VictoryChart>
    </div>
  );
}

export default BarChart