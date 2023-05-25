import Head from 'next/head'
import LayoutCustom, {siteTitle} from '../../../components/LayoutCustom.js'
import {Affix, Col, Row, Tag, Space} from 'antd';
import React, {useRef, useEffect, useState} from "react";
import PopPageSiderMenu from "../../../components/PopPage/PopPageSiderMenu.js";
import Summary from "../../../components/PopPage/Summary.js";
import {getGeneInfo} from "../../../../libs/mysql/getGeneInfo";
import MacaquePopulationGenetics from "../../../components/PopPage/MacaquePopulationGenetics";
import HumanPopulationGenetics from "../../../components/PopPage/HumanPopulationGenetics";
import McDonaldKreitmanTest from "../../../components/PopPage/McDonaldKreitmanTest";
import {getEnsRNAID} from "../../../../libs/mysql/getEnsRNAID";
import {getThetaPiRhesus} from "../../../../libs/mysql/getThetaPiRhesus";


export async function getServerSideProps(context) {
    const entrezID= context.params.gene_id
    if ( typeof entrezID === undefined ) {
        return {
            notFound: true,
        }
    }

    // get gene information
    const geneInfo = await getGeneInfo(entrezID)
    if ( geneInfo.length === 0 ) {
        return {
            notFound: true,
        }
    }

    const RNAIds = await getEnsRNAID(entrezID)
    const thetaPiRhesus = await getThetaPiRhesus(RNAIds.map(item=>"'"+item+"'").join(','))

    // Pass post data to the page via props
    return {
        props: {
            data: geneInfo[0],
            RNAIds:RNAIds,
        }
    }
}

export const GeneContext = React.createContext({});

export default function PopPage(props) {
    const divContent = useRef(null)

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
                                <PopPageSiderMenu divContent={divContent}/>
                            </Affix>
                        </Col>
                        <Col span={19}>
                            <div ref={divContent}>
                                <h4>Gene</h4>
                                <div key={"gene_name"}>
                                    <Row align="bottom" style={{marginBottom:10}}>
                                        <Space>
                                            <span style={{fontSize:22,fontWeight:"bold",marginRight:10,color:"green"}}>{props.data.symbol}</span>
                                            <span style={{fontSize:16,fontWeight:"bold",color:"gray"}}> {props.data.entrezID}</span>
                                        </Space>
                                    </Row>
                                </div>
                                <Summary/>
                                <MacaquePopulationGenetics/>
                                <HumanPopulationGenetics/>
                                <McDonaldKreitmanTest/>
                            </div>
                        </Col>
                    </Row>
                </div>
            </GeneContext.Provider>
        </LayoutCustom>
    )
}