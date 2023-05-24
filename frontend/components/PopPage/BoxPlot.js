import React, {useContext, useEffect, useRef} from "react";
import * as echarts from "echarts";
import {GeneContext} from "../../pages/popGateway/popPage/[gene_id]";
//引入jquery
import {LoadingOutlined} from "@ant-design/icons";

export default function BoxPlot(){
    // use echarts
    const chartRef = useRef(null);
    let chartInstance = null;
    const geneContext = useContext(GeneContext);
    const RNAIds = geneContext.RNAIds
    const thetaPiRhesusBackGround
        = geneContext.thetaPiRhesusBackGround
    const xLabels = ["UTR","Exon","Intron","Intergenic","CDS","Synonmous","Npnsynonmous"]

    // 定义渲染函数
    function renderChart() {
        try {
            let sourceData = []
            thetaPiRhesusBackGround.thetaUtr.forEach(item => sourceData.push(["UTR",item]))
            thetaPiRhesusBackGround.thetaExon.forEach(item => sourceData.push(["Exon",item]))
            thetaPiRhesusBackGround.thetaIntron.forEach(item => sourceData.push(["Intron",item]))
            sourceData.unshift(["type","rate"])
            echarts.registerTransform(ecSimpleTransform.aggregate);
            let option = {
                dataset: [
                    {
                        id: 'raw',
                        source: sourceData
                    },
                    {
                        id: 'rate_aggregate',
                        fromDatasetId: 'raw',
                        transform: [
                            {
                                type: 'ecSimpleTransform:aggregate',
                                config: {
                                    resultDimensions: [
                                        {name: 'min', from: 'rank_score', method: 'min'},
                                        {name: 'Q1', from: 'rank_score', method: 'Q1'},
                                        {name: 'median', from: 'rank_score', method: 'median'},
                                        {name: 'Q3', from: 'rank_score', method: 'Q3'},
                                        {name: 'max', from: 'rank_score', method: 'max'},
                                        {name: 'organ_tissue', from: 'organ_tissue'}
                                    ],
                                    groupBy: 'type'
                                }
                            }
                        ]
                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    confine: true
                },
                yAxis: {
                    type: 'value',
                    name: 'Rate',
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
                    bottom: 120
                },
                legend: {
                    selected: {detail: true}
                },
                series: [
                    {
                        name: 'Boxplot',
                        type: 'boxplot',
                        datasetId: 'rate_aggregate',
                        boxWidth:"50%",
                        itemStyle: {
                            color: '#b8c5f2'
                        },
                        encode: {
                            y: ['min', 'Q1', 'median', 'Q3', 'max'],
                            x: 'type',
                            itemName: ['type'],
                            tooltip: ['min', 'Q1', 'median', 'Q3', 'max']
                        }
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
    },[thetaPiRhesusBackGround])

    return(
        <div ref={chartRef} style={{height:600,marginBottom:10,textAlign:"center"}}></div>
    )
}