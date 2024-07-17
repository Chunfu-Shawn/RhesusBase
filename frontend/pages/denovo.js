import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import React, {useEffect, useState} from "react";
import {Button, Col, Pagination, Row, Space, Table} from 'antd';
import {Divider, Collapse, Image} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
const { Panel } = Collapse;

export default function Denovo() {
    const [denovoGeneTable, setDenovoGeneTable] = useState([]);
    const [ORFAnnotationDatasetTable, setORFAnnotationDatasetTable] = useState([]);
    const [reanalyzedDatasetTable, setReanalyzedDatasetTable] = useState([]);
    const [msDatasetTable, setMSDatasetTable] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);
    const fetchData = async () => {
        // get denovo gene correspoding table
        fetch("https://resource.rhesusbase.com/files/74_denovo_genes.hg19_hg38.denovo_status.json")
            .then(res => res.json())
            .then(data => setDenovoGeneTable(data))
            .then(() => setTableLoading(false))
        // get ORF annotation datasets
        fetch("https://resource.rhesusbase.com/files/ORF_annotations.datasets.json")
            .then(res => res.json())
            .then(data => setORFAnnotationDatasetTable(data))
            .then(() => setTableLoading(false))
        // get reannalyzed Ribo-seq datasets
        fetch("https://resource.rhesusbase.com/files/Reanalyzed_riboseq.datasets.json")
            .then(res => res.json())
            .then(data => setReanalyzedDatasetTable(data))
            .then(() => setTableLoading(false))
        // get MS datasets
        fetch("https://resource.rhesusbase.com/files/MS.datasets.json")
            .then(res => res.json())
            .then(data => setMSDatasetTable(data))
            .then(() => setTableLoading(false))
    };

    useEffect(() => {
        fetchData()
    }, []);

    const columnGene =[
        {
            title: 'Gene ID (hg19)',
            dataIndex: 'gene_id_hg19',
            key: 'gene_id_hg19',
            width: '11%',
            sorter: (a, b) => {
                if (a.gene_id_hg19 > b.gene_id_hg19) return 1
                else return -1
            }
        },
        {
            title: 'Transcript ID (hg19)',
            dataIndex: 'tx_id_hg19',
            key: 'tx_id_hg19',
            width: '13%',
            ellipsis: true,
            sorter: (a, b) => {
                if (a.tx_id_hg19 > b.tx_id_hg19) return 1
                else return -1
            }
        },
        {
            title: 'Gene ID (hg38)',
            dataIndex: 'gene_id_hg38',
            key: 'gene_id_hg38',
            width: '11%',
            sorter: (a, b) => {
                if (a.gene_id_hg38 > b.gene_id_hg38) return 1
                else return -1
            }
        },
        {
            title: 'Gene Name',
            dataIndex: 'gene_name',
            key: 'gene_name',
            width:'11%',
            sorter: (a, b) => {
                if(a.gene_name > b.gene_name) return 1
                else return -1
            },
        },
        {
            title: 'Transcript ID (hg38)',
            dataIndex: 'tx_id_hg38',
            key: 'tx_id_hg38',
            width: '13%',
            sorter: (a, b) => {
                if (a.tx_id_hg38 > b.tx_id_hg38) return 1
                else return -1
            }
        },
        {
            title: 'Gene Age',
            dataIndex: 'protein_age',
            key: 'protein_age',
            width: '6%',
            sorter: (a, b) => {
                if (a.protein_age > b.protein_age) return 1
                else return -1
            }
        },
        {
            title: 'Multiple sequence alignment',
            dataIndex: 'ma',
            key: 'ma',
            width: '13%',
            render: (text,record) => <Space align={"center"}>
                <a href={`/denovo/maf/${record.gene_id_hg19}`} target={"_blank"} id={record.gene_id_hg19} rel={'noreferrer'}>
                    <Button style={{width:200}}>
                        View result
                    </Button>
                </a>
            </Space>
        }
    ]
    const columnsDataset =[
        {
            title: 'Study',
            dataIndex: 'Study',
            key: 'Study',
            width: '9%',
            sorter: (a, b) => {
                if (a.Study > b.Study) return 1
                else return -1
            }
        },
        {
            title: 'Detection method',
            dataIndex: 'Detection_method',
            key: 'Detection_method',
            width: '7%',
            ellipsis: true,
            sorter: (a, b) => {
                if (a.Detection_method > b.Detection_method) return 1
                else return -1
            }
        },
        {
            title: 'Cells or tissue',
            dataIndex: 'Cells_or_tissue',
            key: 'Cells_or_tissue',
            width: '11%',
            sorter: (a, b) => {
                if (a.Cells_or_tissue > b.Cells_or_tissue) return 1
                else return -1
            },
            ellipsis: true
        },
        {
            title: 'Source',
            dataIndex: 'Source',
            key: 'Source',
            width:'15%',
            sorter: (a, b) => {
                if(a.Source > b.Source) return 1
                else return -1
            },
            ellipsis: true
        },
        {
            title: 'Publication',
            dataIndex: 'Publication',
            key: 'Publication',
            width: '13%',
            sorter: (a, b) => {
                if (a.Publication > b.Publication) return 1
                else return -1
            },
            ellipsis: true
        }
    ]
    const columnsMS =[
        {
            title: 'Study',
            dataIndex: 'Study',
            key: 'Study',
            width: '5%',
            sorter: (a, b) => {
                if (a.Study > b.Study) return 1
                else return -1
            }
        },
        {
            title: 'Source',
            dataIndex: 'Source',
            key: 'Source',
            width:'20%',
            sorter: (a, b) => {
                if(a.Source > b.Source) return 1
                else return -1
            },
            ellipsis: true
        },
        {
            title: 'Publication',
            dataIndex: 'Publication',
            key: 'Publication',
            width: '20%',
            sorter: (a, b) => {
                if (a.Publication > b.Publication) return 1
                else return -1
            },
            ellipsis: true
        }
    ]

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| De novo genes"}</title>
            </Head>
            <div className="modal-body-stw" style={{textAlign: "left"}}>
                <header className="page-header">
                    <h1>74 <i>de novo</i> genes from An <i>et al. Nat Ecol Evol</i> (2023)</h1>
                </header>
                <Divider></Divider>
                <Collapse defaultActiveKey={['1','2','3']}  size="large">
                    <Panel header={<b>Gene List</b>} key="1" >
                        {tableLoading === true ?
                        <div style={{textAlign:"center"}}>
                            <LoadingOutlined style={{margin:"auto",fontSize:30}}/>
                        </div>:
                        <Table
                            dataSource={
                                denovoGeneTable.map(item => {
                                    return {key: item.gene_id_hg19, ...item}
                                })}
                            columns={columnGene}
                            size={"middle"}
                        />}
                    </Panel>
                    <Panel header={<b>Translation Evidence</b>} key="2">
                        <div style={{
                            display:"flex",
                            justifyContent: "center", /* 水平居中 */
                            alignItems: "flex-start", /* 垂直置顶 */}}
                        >
                            <Image src="/images/denovo/translation_web.png" alt="translation_evidence"  width={1200} height={900}/>
                        </div>
                    </Panel>
                    <Panel header={<b>Dataset Table</b>} key="3">
                        <div style={{
                            display:"flex",
                            justifyContent: "center", /* 水平居中 */
                            alignItems: "flex-start", /* 垂直置顶 */}}
                        >
                            <Col>
                                <Row><h3>Re-analysed Ribo-seq datasets</h3></Row>
                                <Row>{tableLoading === true ?
                                    <div style={{textAlign:"center"}}>
                                        <LoadingOutlined style={{margin:"auto",fontSize:30}}/>
                                    </div>:
                                    <Table
                                        dataSource={
                                            reanalyzedDatasetTable.map(item => {
                                                return {key: item.Study, ...item}
                                            })}
                                        columns={columnsDataset}
                                        size={"small"}
                                        pagination={{pageSize: 50}}
                                    />}
                                </Row>
                                <Row><h3>Translated ORF annotation datasets</h3></Row>
                                <Row>{tableLoading === true ?
                                    <div style={{textAlign:"center"}}>
                                        <LoadingOutlined style={{margin:"auto",fontSize:30}}/>
                                    </div>:
                                    <Table
                                        dataSource={
                                            ORFAnnotationDatasetTable.map(item => {
                                                return {key: item.Study, ...item}
                                            })}
                                        columns={columnsDataset}
                                        size={"small"}
                                        pagination={{pageSize: 50}}
                                    />}
                                </Row>
                                <Row><h3>MS datasets</h3></Row>
                                <Row>
                                    <Table
                                        dataSource={
                                        msDatasetTable.map(item => {
                                            return {key: item.Study, ...item}
                                        })}
                                        columns={columnsMS}
                                        size={"small"}
                                    />
                                </Row>
                            </Col>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </LayoutCustom>
    )
}