var echartsOptions7 = {
    color: ["#108ee9","#7ec2f3","#3dbd7d","#ffce3d","#76cdd3"],
    animation: true,
    textStyle: {
        color: '#fff'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {

    },
    legend: {
        // orient: 'vertical',
        left: 'left',
        data: ['E','D','C','B','A'],
        textStyle: {
            color: '#fff'
        }
    },
    calculable: true,
    series: [
        {
            name: 'A',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '5%',
            top: '50%',
            data:[
                {value: 60, name:'C'},
                {value: 30, name:'B'},
                {value: 10, name:'A'},
                {value: 80, name:'D'},
                {value: 100, name:'E'}
            ]
        },
        {
            name: 'B',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '5%',
            top: '5%',
            sort: 'ascending',
            data:[
                {value: 60, name:'C'},
                {value: 30, name:'B'},
                {value: 10, name:'A'},
                {value: 80, name:'D'},
                {value: 100, name:'E'}
            ]
        },
        {
            name: 'A',
            type:'funnel',
            width: '40%',
            height: '45%',
            left: '55%',
            top: '5%',
            label: {
                normal: {
                    position: 'left'
                }
            },
            data:[
                {value: 60, name: 'C'},
                {value: 30, name: 'B'},
                {value: 10, name: 'A'},
                {value: 80, name: 'D'},
                {value: 100, name: 'E'}
            ]
        },
        {
            name: 'B',
            type:'funnel',
            width: '40%',
            height: '45%',
            left: '55%',
            top: '50%',
            sort: 'ascending',
            label: {
                normal: {
                    position: 'left'
                }
            },
            data:[
                {value: 60, name: 'C'},
                {value: 30, name: 'B'},
                {value: 10, name: 'A'},
                {value: 80, name: 'D'},
                {value: 100, name: 'E'}
            ]
        }
    ]
};