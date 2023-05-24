import Head from 'next/head'
import LayoutCustom, {siteTitle} from '../../../components/LayoutCustom.js'
import {Affix, Col, Row, Tag, Space} from 'antd';
import React, {useRef, useEffect, useState} from "react";
import GenePageSiderMenu from "../../../components/GenePage/GenePageSiderMenu.js";
import Summary from "../../../components/GenePage/Summary.js";
import Features from "../../../components/GenePage/Features.js";
import SpatialExpression from "../../../components/GenePage/SpatialExpression.js";
import Download from "../../../components/GenePage/Download.js";
import {getGeneList} from "../../../../libs/mysql/getGeneList";

export async function getServerSideProps(context) {
    const entrezID= context.params.gene_id
    if ( typeof entrezID === undefined ) {
        return {
            notFound: true,
        }
    }

    const geneInfo = await getGeneList("entrezID",entrezID)

    if ( geneInfo.length === 0 ) {
        return {
            notFound: true,
        }
    }

    // Pass post data to the page via props
    return {
        props: {
            data: geneInfo[0]
        }
    }
}

export const GeneContext = React.createContext({});

export default function PopPage(props) {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| PopPage | "+props.data.entrezID}</title>
            </Head>
            <GeneContext.Provider value={
                {
                    ...props,
                }
            }>
                <div
                    className={"modal-body-stw with-sider"}
                >
                    <Row style={{width:"100%"}}>
                        <Col span={5}>
                            <Affix offsetTop={120}>
                                <GenePageSiderMenu divContent={divContent}/>
                            </Affix>
                        </Col>
                        <Col span={19}>
                            <div ref={divContent}>
                                <h4>Gene</h4>
                                <div key={"gene_name"}>
                                    <Row align="bottom" style={{marginBottom:10}}>
                                        <Space>
                                            <span style={{fontSize:"22px",fontWeight:"bold",marginRight:10}}>{props.data.symbol}</span>
                                            <span style={{fontSize:"16px",fontWeight:"bold",color:"gray"}}> {props.data.entrezID}</span>
                                        </Space>
                                    </Row>
                                </div>
                                <Summary/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </GeneContext.Provider>
        </LayoutCustom>
    )
}