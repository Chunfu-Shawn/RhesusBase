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
            let option = {
                dataset: [
                    {
                        source: [
                            thetaPiRhesusBackGround.thetaUtr,
                            thetaPiRhesusBackGround.thetaExon,
                            thetaPiRhesusBackGround.thetaIntron,
                            thetaPiRhesusBackGround.thetaIntergenic,
                            thetaPiRhesusBackGround.thetaCds,
                            thetaPiRhesusBackGround.thetaSynonmous,
                            thetaPiRhesusBackGround.thetaNonsynonmous
                        ]
                    },
                    {
                        transform:
                            {
                                type: 'boxplot',
                                config:{
                                    itemNameFormatter: '{value}'
                                },
                                print: true
                            }
                    },
                    {
                        fromDatasetIndex: 1,
                        fromTransformResult: 1
                    }
                ],
                tooltip: {
                    trigger: 'item',
                    confine: true
                },
                yAxis: {
                    type: 'value',
                    name: 'Population Mutation Rate',
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
                        name: 'boxplot',
                        type: 'boxplot',
                        datasetIndex: 1,
                        boxWidth:"50%",
                        itemStyle: {
                            color: '#b9e3ba',
                            borderColor: '#254000',
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
    },[thetaPiRhesusBackGround])

    return(
        <div ref={chartRef} style={{height:600,marginBottom:10,textAlign:"center"}}></div>
    )
}