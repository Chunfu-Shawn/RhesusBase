import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import React from "react";
import {Button, Space, Table} from 'antd';
import {Divider} from 'antd';

export async function getServerSideProps() {
    const res = await fetch("https://resource.rhesusbase.com/files/gene_corresponding_table.json")
    // 取搜索结果数组中的第一个结果
    const data = await res.json()
    let key = 1

    return {
        props: {
            data:data.map(item => {
                return {
                    key: key++,
                    gene_id_hg19: item.gene_id_hg19,
                    transcript_id_hg19: item.transcript_id_hg19,
                    gene_id_hg38: item.gene_id_hg38,
                    gene_name: item.gene_name,
                    transcript_id_hg38: item.transcript_id_hg38,
                }
            }),
        }
    }
}
export default function Denovo(props) {
    const columns =[
        {
            title: 'Gene ID (hg19)',
            dataIndex: 'gene_id_hg19',
            key: 'gene_id_hg19',
            width: '15%',
            sorter: (a, b) => {
                if (a.gene_id_hg19 > b.gene_id_hg19) return 1
                else return -1
            }
        },
        {
            title: 'Transcript ID (hg19)',
            dataIndex: 'transcript_id_hg19',
            key: 'transcript_id_hg19',
            width: '15%',
            sorter: (a, b) => {
                if (a.transcript_id_hg19 > b.transcript_id_hg19) return 1
                else return -1
            }
        },
        {
            title: 'Gene ID (hg38)',
            dataIndex: 'gene_id_hg38',
            key: 'gene_id_hg38',
            width: '15%',
            sorter: (a, b) => {
                if (a.gene_id_hg38 > b.gene_id_hg38) return 1
                else return -1
            }
        },
        {
            title: 'Gene Name',
            dataIndex: 'gene_name',
            key: 'gene_name',
            width:'15%',
            sorter: (a, b) => {
                if(a.gene_name > b.gene_name) return 1
                else return -1
            },
        },
        {
            title: 'Transcript ID (hg38)',
            dataIndex: 'transcript_id_hg38',
            key: 'transcript_id_hg38',
            width: '15%',
            sorter: (a, b) => {
                if (a.transcript_id_hg38 > b.transcript_id_hg38) return 1
                else return -1
            }
        },
        {
            title: 'Multiple sequence alignment',
            dataIndex: 'ma',
            key: 'ma',
            width: '15%',
            render: (text,record) => <Space align={"center"}>
                <Button style={{width:200}}>
                    <a href={`/denovo/maf/${record.gene_id_hg38}`} target={"_blank"} id={record.gene_id_hg38} rel={'noreferrer'}>
                        View result
                    </a>
                </Button>
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
                <Table
                    dataSource={
                    props.data.map(data => {
                        return {key: data.gene_id_hg38, ...data}
                    })}
                    columns={columns}
                    size={"small"}
                />
            </div>
        </LayoutCustom>
    )
}