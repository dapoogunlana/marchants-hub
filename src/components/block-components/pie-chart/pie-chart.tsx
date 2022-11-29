import React from 'react'
import {
  VictoryPie,
  VictoryContainer,
} from "victory";

interface pieChartProps {
    data: Array<any>;
    color: Array<any>;
}

function PieChart(props: any) {
  return (
    <div>
      <VictoryPie
        data={props.data}
        colorScale={props.color}
        startAngle={100}
        endAngle={600}
        containerComponent={
          <VictoryContainer width={500} responsive={true} />
        }
      />
    </div>
  );
}

export default PieChart