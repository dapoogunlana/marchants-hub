import React from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryGroup,
} from "victory";

interface groupChartProps {
    data: Array<any>;
}
function GroupChart() {
  return (
    <div >
      <VictoryChart 
        width={1000}
        containerComponent={<VictoryContainer height={350} responsive={true} />} >
        <VictoryGroup offset={50}
          colorScale={["#398844", "#EFCA0B", "#BBDACD"]}
        >
          <VictoryBar
            data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]}
          />
          <VictoryBar
            data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]}
          />
          <VictoryBar
            data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]}
          />
        </VictoryGroup>
      </VictoryChart>
    </div>
  );
}

export default GroupChart