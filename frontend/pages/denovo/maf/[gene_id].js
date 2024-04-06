import Head from 'next/head'
import LayoutCustom, {siteTitle} from '../../../components/LayoutCustom.js'
import {Col, Row, Space, Image, Divider} from 'antd';
import React from "react";

export async function getServerSideProps(context) {
    const res = await fetch((process.env.NODE_ENV==="production"?
            process.env.PRODUCTION_URL:"http://localhost:3001")
        +"/api/denovo/74_denovo_genes.hg19_hg38.denovo_status"
    )
    const data = await res.json()
    let geneInfo
    data.forEach(item => {
        if (item.gene_id_hg19 === context.params.gene_id){
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
    const gene_id = props.gene_id_hg38 === "-" ? props.gene_id_hg19 : props.gene_id_hg38
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| PopPage | " + props.gene_id_hg19 }</title>
            </Head>
            <div className={"modal-body-stw with-sider"}>
                <h3>Multiple sequence alignment result</h3>
                <Row align="bottom" style={{marginBottom:10}}>
                    <Space>
                        <span style={{fontSize:22,fontWeight:"bold",marginRight:10,color:"green"}}>{props.gene_id_hg19}</span>
                        <span style={{fontSize:16,fontWeight:"bold",color:"gray"}}> {props.gene_name}</span>
                        <span style={{fontSize:16,fontWeight:"bold",color:"gray"}}> {props.protein_age}-specific gene</span>
                    </Space>
                </Row>
                <Divider/>
                <Row align="top" style={{marginBottom:10}}>
                    <Col span={14}>
                        <Image
                            src={`/images/MSA_93_denovo/${gene_id}/${gene_id}.png`}
                            alt={'msa.png'} width={"100%"} height={"100%"}
                        />
                    </Col>
                    <Col span={10}>
                        <Image
                            src={`/images/MSA_93_denovo/${gene_id}/${gene_id}_pep.png`}
                            alt={'pep_msa.png'} width={"100%"} height={"100%"}
                        />
                    </Col>
                </Row>
            </div>
        </LayoutCustom>
    )
}