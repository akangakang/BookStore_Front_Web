// import React, {Component} from "react";
// import {
//     G2,
//     Chart,
//     Geom,
//     Axis,
//     Tooltip,
//     Coord,
//     Label,
//     Legend,
//     View,
//     Guide,
//
//     Facet,
//     Util,
// } from "bizcharts";
//
//
// class MySliderChart extends Component {
//     render() {
//         const data = [
//             {name: 'IE', value: 56.33},
//             {name: 'Chrome', value: 24.03},
//             {name: 'Firefox', value: 10.38},
//             {name: 'Safari', value: 4.77},
//             {name: 'Opera', value: 0.91},
//             {name: 'Unknown', value: 0.2},
//         ];
//         return (
//             <Chart
//                 data={data}
//                 forceFit
//                 onIntervalClick={ev => {
//                     const data = ev.data;
//                     if (data) {
//                         const name = data._origin['name'];
//                         window.open('http://www.baidu.com/s?wd=' + name);
//                     }
//                 }}
//             >
//                 <Coord type="theta"/>
//                 <Tooltip showTitle={false}/>
//                 <Geom
//                     type="intervalStack"
//                     position="value"
//                     color="name"
//                 >
//                     <Label content="name"/>
//                 </Geom>
//             </Chart>
//         );
//     }
// }
//
//
// export default MySliderChart;
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
    Util,

} from 'bizcharts';
//
// class MyPieSlice extends React.Component {
//     constructor(props) {
//         super(props);
//
//     }
//
//     render() {
//         console.log('chart');
//
//         console.log(this.props.sortData);
//         //
//         // this.setState({
//         //     data:this.props.sortData.slice(0,11)
//         // });
//         // console.log(this.data);
//         const data = [
//             // { name:  this.props.sortData[1].book, value: this.props.sortData[1].number},
//             // { name:  this.props.sortData[1].book, value: this.props.sortData[1].number},
//             // { name:  this.props.sortData[1].book, value: this.props.sortData[1].number},
//             // { name:  this.props.sortData[1].book, value: this.props.sortData[1].number},
//             // { name:  this.props.sortData[1].book, value: this.props.sortData[1].number},
//             // { name:  this.props.sortData[1].book, value: this.props.sortData[1].number},
//             // { name:  this.props.sortData[1].book, value: this.props.sortData[1].number},
//             // { name:  this.props.sortData[1].book, value: this.props.sortData[1].number},
//             // { name:  this.props.sortData[1].book, value: this.props.sortData[1].number},
//             // { name:  this.props.sortData[1].book, value: this.props.sortData[1].number},
//
//         ];

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

//         return (
//             <div>
//                 <SliderChart/>
//             </div>
//         );
//     }
// }

export default MyPieSlice;
