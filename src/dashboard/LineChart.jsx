import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

class LineChart extends React.Component {
  render() {
      var data = this.props.acctusages;
      if (!data) {
          data = [
              { acctId: 101, acctIdStr: "101", byteUpLink: 0, byteDownLink: 0 },
              { acctId: 102, acctIdStr: "102", byteUpLink: 0, byteDownLink: 0 },
              { acctId: 103, acctIdStr: "103", byteUpLink: 0, byteDownLink: 0 },
              { acctId: 104, acctIdStr: "104", byteUpLink: 0, byteDownLink: 0 },
              { acctId: 105, acctIdStr: "105", byteUpLink: 0, byteDownLink: 0 },
              { acctId: 106, acctIdStr: "106", byteUpLink: 0, byteDownLink: 0 },
              { acctId: 107, acctIdStr: "107", byteUpLink: 0, byteDownLink: 0 },
              { acctId: 108, acctIdStr: "108", byteUpLink: 0, byteDownLink: 0 },
              { acctId: 109, acctIdStr: "109", byteUpLink: 0, byteDownLink: 0 },
              { acctId: 110, acctIdStr: "110", byteUpLink: 0, byteDownLink: 0 }
          ];
      }

    return (
      <div>
        <Chart height={400} data={data}  padding={[60, 80, 60, 60]} forceFit>
          <Axis name="acctIdStr"  />
          <Axis name="byteUpLink" />
          <Tooltip
            crosshairs={{
              type: "y"
            }}
          />
          <Geom
            type="interval"
            position="acctIdStr*byteUpLink"
            color={"byteUpLink"}
            />
        </Chart>
      </div>
    );
  }
}

export default LineChart;