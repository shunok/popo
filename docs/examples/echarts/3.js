var echartsOptions3 = {
    color: ["#108ee9","#7ec2f3","#3dbd7d","#ffce3d","#76cdd3"],
    textStyle: {
        color: "#fff"
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['B','C'],
        textStyle: {
            color: "#fff"
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : ['1M','2M','3M','4M','5M','6M','7M','8M','9M','10M','11M','12M']
        }
    ],
    yAxis : [
        {
            type : 'value',
            splitLine: {
                // show: false,
                lineStyle: {
                    opacity: 0.1,
                }
            },
            axisLabel: {
                textStyle: {
                    color: "white"
                }
            }
        }
    ],
    series : [
        {
            name:'B',
            type:'bar',
            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            markPoint : {
                data : [
                    {type : 'max', name: 'Max'},
                    {type : 'min', name: 'Min'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: 'AVG'}
                ]
            }
        },
        {
            name:'C',
            type:'bar',
            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint : {
                data : [
                    {name : 'Max Year', value : 182.2, xAxis: 7, yAxis: 183},
                    {name : 'Min Year', value : 2.3, xAxis: 11, yAxis: 3}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : 'AVG'}
                ]
            }
        }
    ]
};
