import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import React, {useEffect, useState} from "react";
import {Button, Space, Table} from 'antd';
import {Divider} from 'antd';
import {LoadingOutlined} from "@ant-design/icons";

export default function Denovo() {
    const [denovoGeneTable, setDenovoGeneTable] = useState([]);
    const [tableLoading, setTableLoading] = useState(true);
    const fetchData = async () => {
        // get denovo gene correspoding table
        fetch("https://resource.rhesusbase.com/files/74_denovo_genes.denovo_status.json")
            .then(res => res.json())
            .then(data => setDenovoGeneTable(data))
            .then(() => setTableLoading(false))
    };

    useEffect(() => {
        fetchData()
    }, []);

    const columns =[
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
            dataIndex: 'transcript_id_hg19',
            key: 'transcript_id_hg19',
            width: '13%',
            ellipsis: true,
            sorter: (a, b) => {
                if (a.transcript_id_hg19 > b.transcript_id_hg19) return 1
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
            dataIndex: 'transcript_id_hg38',
            key: 'transcript_id_hg38',
            width: '13%',
            sorter: (a, b) => {
                if (a.transcript_id_hg38 > b.transcript_id_hg38) return 1
                else return -1
            }
        },
        {
            title: 'Gene Age',
            dataIndex: 'protein_age',
            key: 'protein_age',
            width: '9%',
            sorter: (a, b) => {
                if (a.protein_age > b.protein_age) return 1
                else return -1
            }
        },
        {
            title: 'Multiple sequence alignment',
            dataIndex: 'ma',
            key: 'ma',
            width: '11%',
            render: (text,record) => <Space align={"center"}>
                <a href={`/denovo/maf/${record.gene_id_hg38}`} target={"_blank"} id={record.gene_id_hg38} rel={'noreferrer'}>
                    <Button style={{width:120}}>
                        View result
                    </Button>
                </a>
            </Space>
        }
    ]


    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| De novo genes"}</title>
            </Head>
            <div className="modal-body-stw" style={{textAlign: "left"}}>
                <header className="page-header">
                    <h1><i>De novo</i> genes</h1>
                </header>
                <Divider></Divider>
                {tableLoading === true ?
                    <div style={{textAlign:"center"}}>
                        <LoadingOutlined style={{margin:"auto",fontSize:30}}/>
                    </div>:
                    <Table
                        dataSource={
                            denovoGeneTable.map(item => {
                                return {key: item.gene_id_hg38, ...item}
                            })}
                        columns={columns}
                        size={"middle"}
                    />
                }
            </div>
        </LayoutCustom>
    )
}