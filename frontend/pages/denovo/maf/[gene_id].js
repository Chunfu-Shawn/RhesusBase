import Head from 'next/head'
import LayoutCustom, {siteTitle} from '../../../components/LayoutCustom.js'
import {Col, Row, Space, Image} from 'antd';
import React, {useEffect, useRef, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";

export async function getServerSideProps(context) {
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3001")
        +"/api/denovo/gene_correspodinging_table"
    )
    const data = await res.json()
    let geneInfo
    data.forEach(item => {
        if (item.gene_id_hg38 === context.params.gene_id){
            geneInfo = item
        }
    })
    // Pass post data to the page via props
    return {
        props: {
            ...geneInfo
        }
    }
}


export default function DenovoMafPage(props) {
    const [denovoGeneTable, setDenovoGeneTable] = useState([]);
    const [geneInfo, setGeneInfo] = useState({});
    const [tableLoading, setTableLoading] = useState(true);


    const divContent = useRef(null)

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| PopPage | "+props.gene_id}</title>
            </Head>
            <div
                className={"modal-body-stw with-sider"}
            >
                <Row style={{width:"100%"}}>
                    <Col span={19}>
                        <div ref={divContent}>
                            <h3>Multiple Sequence Alignment Results of <i>de novo</i> Gene</h3>
                            <div key={"gene_name"}>
                                <Row align="bottom" style={{marginBottom:10}}>
                                    <Space>
                                        <span style={{fontSize:22,fontWeight:"bold",marginRight:10,color:"green"}}>{props.gene_id_hg38}</span>
                                        <span style={{fontSize:16,fontWeight:"bold",color:"gray"}}> {props.gene_name}</span>
                                        <span style={{fontSize:16,fontWeight:"bold",color:"gray"}}> {props.transcript_id_hg38}</span>
                                    </Space>
                                </Row>
                                <Row align="bottom" style={{marginBottom:10}}>
                                    <Image src={"/images/popGateway.jpg"} alt={'maf.jpg'} width={900} height={500}/>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </LayoutCustom>
    )
}