import React from "react";

import {
    G2,
    Chart,
    Geom,
    Tooltip,
    Coord,
    Label,


} from 'bizcharts';

class MyPieSlice extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Chart
                data={this.props.sortData}
                forceFit
                // onIntervalClick={ev => {
                //     const data = ev.data;
                //     if (data) {
                //         const name = data._origin['name'];
                //         window.open('http://www.baidu.com/s?wd=' + name);
                //     }
                // }}
                height={500}>
                <Coord type="theta"/>
                <Tooltip showTitle={false}/>
                <Geom
                    type="intervalStack"
                    position="value"
                    color="name"
                >
                    <Label content="name"/>
                </Geom>
            </Chart>
        );
    }
}


export default MyPieSlice;
