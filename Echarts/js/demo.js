var myChart = echarts.init(document.getElementById('map-wrap'));
var name_title = "Regional distribution map of 2018 college entrance examination population in China"
var subname = 'The data comes from baidu'
var nameColor = " rgb(55, 75, 113)"
var name_fontFamily = '等线'
var subname_fontSize = 15
var name_fontSize = 18
var mapName = 'china'
var data = [
    {name:"北京",value:6.3},
    {name:"天津",value:5.5},
    {name:"河北",value:48.6},
    {name:"山西",value:30.5},
    {name:"内蒙古",value:19.5},
    {name:"辽宁",value:18.5},
    {name:"吉林",value:15},
    {name:"黑龙江",value:16.9},
    {name:"上海",value:5},
    {name:"江苏",value:33},
    {name:"浙江",value:30.6},
    {name:"安徽",value:49.9},
    {name:"福建",value:20},
    {name:"江西",value:38},
    {name:"山东",value:59.2},
    {name:"河南",value:98.3},
    {name:"湖北",value:37.4},
    {name:"湖南",value:45.2},
    {name:"重庆",value:25},
    {name:"四川",value:62},
    {name:"贵州",value:44.1},
    {name:"云南",value:30},
    {name:"西藏",value:2.5},
    {name:"陕西",value:31.9},
    {name:"甘肃",value:27.3},
    {name:"青海",value:4.2},
    {name:"宁夏",value:6.9},
    {name:"新疆",value:20.7},
    {name:"广东",value:75.8},
    {name:"广西",value:40},
    {name:"海南",value:5.8},
    ];
    
var geoCoordMap = {};
var toolTipData = [ 
    {name:"北京",value:[{name:"2018年",value:6.3},{name:"2017年",value:6}]},
    {name:"天津",value:[{name:"2018年",value:5.5},{name:"2017年",value:5.7}]},
    {name:"河北",value:[{name:"2018年",value:48.6},{name:"2017年",value:43.6}]},
    {name:"山西",value:[{name:"2018年",value:30.5},{name:"2017年",value:31.7}]},
    {name:"内蒙古",value:[{name:"2018年",value:19.5},{name:"2017年",value:19.8}]},
    {name:"辽宁",value:[{name:"2018年",value:18.5},{name:"2017年",value:20.8}]},
    {name:"吉林",value:[{name:"2018年",value:15},{name:"2017年",value:14.3}]},
    {name:"黑龙江",value:[{name:"2018年",value:16.9},{name:"2017年",value:18.8}]},
    {name:"上海",value:[{name:"2018年",value:5},{name:"2017年",value:5}]},
    {name:"江苏",value:[{name:"2018年",value:33},{name:"2017年",value:33}]},
    {name:"浙江",value:[{name:"2018年",value:30.6},{name:"2017年",value:29.1}]},
    {name:"安徽",value:[{name:"2018年",value:49.9},{name:"2017年",value:49.9}]},
    {name:"福建",value:[{name:"2018年",value:20},{name:"2017年",value:18.8}]},
    {name:"江西",value:[{name:"2018年",value:38},{name:"2017年",value:36.5}]},
    {name:"山东",value:[{name:"2018年",value:59.2},{name:"2017年",value:58.3}]},
    {name:"河南",value:[{name:"2018年",value:98.3},{name:"2017年",value:86.3}]},
    {name:"湖北",value:[{name:"2018年",value:37.4},{name:"2017年",value:36.2}]},
    {name:"湖南",value:[{name:"2018年",value:45.2},{name:"2017年",value:41.1}]},
    {name:"重庆",value:[{name:"2018年",value:25},{name:"2017年",value:24.7}]},
    {name:"四川",value:[{name:"2018年",value:62},{name:"2017年",value:58.3}]},
    {name:"贵州",value:[{name:"2018年",value:44.1},{name:"2017年",value:41.2}]},
    {name:"云南",value:[{name:"2018年",value:30},{name:"2017年",value:29.3}]},
    {name:"西藏",value:[{name:"2018年",value:2.5},{name:"2017年",value:2.8}]},
    {name:"陕西",value:[{name:"2018年",value:31.9},{name:"2017年",value:31.9}]},
    {name:"甘肃",value:[{name:"2018年",value:27.3},{name:"2017年",value:28.5}]},
    {name:"青海",value:[{name:"2018年",value:4.2},{name:"2017年",value:4.6}]},
    {name:"宁夏",value:[{name:"2018年",value:6.9},{name:"2017年",value:6.9}]},
    {name:"新疆",value:[{name:"2018年",value:20.7},{name:"2017年",value:18.4}]},
    {name:"广东",value:[{name:"2018年",value:75.8},{name:"2017年",value:75.7}]},
    {name:"广西",value:[{name:"2018年",value:40},{name:"2017年",value:36.5}]},
    {name:"海南",value:[{name:"2018年",value:5.8},{name:"2017年",value:5.7}]},
];

/*获取地图数据*/
myChart.showLoading();
var mapFeatures = echarts.getMap(mapName).geoJson.features;
myChart.hideLoading();
mapFeatures.forEach(function(v) {
    // 地区名称
    var name = v.properties.name;
    // 地区经纬度
    geoCoordMap[name] = v.properties.cp;

});
var max = 480,
    min = 9; // todo 
var maxSize4Pin = 100,
    minSize4Pin = 20;
var convertData = function(data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value),
            });
        }
    }
    return res;
};
option = {
    title: {
        text: name_title,
        subtext: subname,
        x: 'center',
        textStyle: {
            color: nameColor,
            fontFamily: name_fontFamily,
            fontSize: name_fontSize
        },
        subtextStyle:{
            fontSize:subname_fontSize,
            fontFamily:name_fontFamily
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            if (typeof(params.value)[2] == "undefined") {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                    if(params.name==toolTipData[i].name){
                        toolTiphtml += toolTipData[i].name+':<br>'
                        for(var j = 0;j<toolTipData[i].value.length;j++){
                            toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                        }
                    }
                }
                return toolTiphtml;
            } else {
                var toolTiphtml = ''
                for(var i = 0;i<toolTipData.length;i++){
                    if(params.name==toolTipData[i].name){
                        toolTiphtml += toolTipData[i].name+':<br>'
                        for(var j = 0;j<toolTipData[i].value.length;j++){
                            toolTiphtml+=toolTipData[i].value[j].name+':'+toolTipData[i].value[j].value+"<br>"
                        }
                    }
                }
                return toolTiphtml;
            }
        }
    },
    // legend: {
    //     orient: 'vertical',
    //     y: 'bottom',
    //     x: 'right',
    //     data: ['credit_pm2.5'],
    //     textStyle: {
    //         color: '#fff'
    //     }
    // },
    visualMap: {
        show: true,
        min: 0,
        max: 200,
        left: 'left',
        top: 'bottom',
        text: ['高', '低'], // 文本，默认为数值文本
        calculable: true,
        seriesIndex: [1],
        inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
        }
    },
    /*工具按钮组*/
    // toolbox: {
    //     show: true,
    //     orient: 'vertical',
    //     left: 'right',
    //     top: 'center',
    //     feature: {
    //         dataView: {
    //             readOnly: false
    //         },
    //         restore: {},
    //         saveAsImage: {}
    //     }
    // },
    geo: {
        show: true,
        map: mapName,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false,
            }
        },
        roam: true,
        itemStyle: {
            normal: {
                areaColor: '#031525',
                borderColor: '#3B5077',
            },
            emphasis: {
                areaColor: '#2B91B7',
            }
        }
    },
    series: [{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: function(val) {
                return val[2] / 10;
            },
            label: {
                normal: {
                     formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }  
            },
            itemStyle: {
                normal: {
                    color: '#05C3F9'
                }
            }
        },
        {
            type: 'map',
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
                normal: {
                    show: true
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7'
                }
            },
            animation: false,
            data: data
        },
        {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin', //气泡
            symbolSize: function(val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a * min;
                b = maxSize4Pin - a * max;
                return a * val[2] + b;
            },
            label: {
                normal: {
                    formatter: '{@[2]}',
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 9,
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#F62157', //标志颜色
                }
            },
            zlevel: 6,
            data: convertData(data),
        },
        {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data.sort(function(a, b) {
                return b.value - a.value;
            }).slice(0, 5)),
            symbolSize: function(val) {
                return val[2] / 10;
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: 'yellow',
                    shadowBlur: 10,
                    shadowColor: 'yellow'
                }
            },
            zlevel: 1
        },
    ]
};
myChart.setOption(option);