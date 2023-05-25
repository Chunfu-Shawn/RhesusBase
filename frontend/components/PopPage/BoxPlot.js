import React, {useEffect, useRef} from "react";
import * as echarts from "echarts";

export default function BoxPlot(props){
    const {background, target, yName} = props
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;
    const xLabels = ["Synonmous","Npnsynonmous","CDS","UTR","Exon","Intron","Intergenic"]

    // 定义渲染函数
    function renderChart() {
        try {
            let option
                = {
                dataset: [
                    {
                        id: 'raw',
                        source: background
                    },
                    {
                        transform: [
                            {
                                type: 'boxplot',
                                config: {
                                    itemNameFormatter: function (params) {
                                        return xLabels[params.value]
                                    }
                                }
                            }
                        ]
                    },
                    {
                        fromDatasetIndex: 1,
                        fromTransformResult: 1
                    }
                ],
                yAxis: {
                    type: 'value',
                    name: yName,
                    position: 'left',
                    nameGap: 50,
                    nameLocation: "middle",
                    nameTextStyle:{
                        fontSize: 14,
                        fontWeight: "bolder"
                    }
                },
                xAxis: {
                    type: 'category',
                    axisLabel:{
                        rotate:35,
                        fontSize:13
                    }
                },
                toolbox: {
                    itemSize:18,
                    feature: {
                        saveAsImage: {
                            type: "svg",
                        }
                    },
                    iconStyle: {
                        borderWidth:2
                    }
                },
                grid: {
                    containLabel: true,
                    left: 25,
                    bottom: 0
                },
                legend: {
                    selected: {detail: true}
                },
                series: [
                    {
                        name: 'Background',
                        type: 'boxplot',
                        datasetIndex: 1,
                        boxWidth:"50%",
                        silent: true, // 禁止鼠标事件，不会触发高亮效果
                        tooltip: {
                            show: false,
                            triggerOn: 'none',
                        },
                        itemStyle: {
                            color: '#a0b286',
                            borderColor: '#43690f'
                        },
                    }
                ]
            }
            // `echarts.getInstanceByDom` 可以从已经渲染成功的图表中获取实例，其目的就是在 option 发生改变的时候，不需要
            // 重新创建图表，而是复用该图表实例，提升性能
            chartInstance.setOption(option);
            chartInstance.off('click');
            chartInstance.hideLoading()
        } catch (error) {
            console.error("error", error.message);
            chartInstance && chartInstance.dispose();
        }
    }

    useEffect(() => {
        chartInstance = echarts.init(chartRef.current,null,{locale:"EN",renderer:"svg"});
        chartInstance.showLoading()
        renderChart();
        return () => {
            // 销毁图表实例，释放内存
            chartInstance && chartInstance.dispose()
        }
    },[background])

    return(
        <div ref={chartRef} style={{height:350,width:530,marginBottom:10,textAlign:"center"}}></div>
    )
}