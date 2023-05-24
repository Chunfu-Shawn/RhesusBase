import Head from 'next/head'
import LayoutCustom, {siteTitle} from '../../../components/LayoutCustom.js'
import {Affix, Col, Row, Tag, Space} from 'antd';
import React, {useRef, useEffect, useState} from "react";
import PopPageSiderMenu from "../../../components/PopPage/PopPageSiderMenu.js";
import Summary from "../../../components/PopPage/Summary.js";
import {getGeneList} from "../../../../libs/mysql/getGeneList";
import MacaquePopulationGenetics from "../../../components/PopPage/MacaquePopulationGenetics";
import HumanPopulationGenetics from "../../../components/PopPage/HumanPopulationGenetics";
import McDonaldKreitmanTest from "../../../components/PopPage/McDonaldKreitmanTest";
import {getEnsRNAID} from "../../../../libs/mysql/getEnsRNAID";
import {getThetaPiRhesus} from "../../../../libs/mysql/getThetaPiRhesus";
import {getThetaPiRhesusBackGround} from "../../../../libs/mysql/getThetaPiRhesusBackGround";

export async function getServerSideProps(context) {
    const entrezID= context.params.gene_id
    if ( typeof entrezID === undefined ) {
        return {
            notFound: true,
        }
    }

    // get gene information
    const geneInfo = await getGeneList("entrezID",entrezID)
    if ( geneInfo.length === 0 ) {
        return {
            notFound: true,
        }
    }

    const RNAIds = await getEnsRNAID(entrezID)
    const thetaPiRhesus = await getThetaPiRhesus(RNAIds.map(item=>"'"+item+"'").join(','))
    const thetaPiRhesusBackGround = await getThetaPiRhesusBackGround()

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
    const [thetaPiRhesusBackGround,setThetaPiRhesusBackGround] = useState([])
    const thetaUtr = []
    const thetaExon = []
    const thetaIntron = []
    const thetaIntergenic = []
    const thetaCds = []
    const thetaSynonmous = []
    const thetaNonsynonmous = []

    const fetchData = async () => {
        // load Theta Pi Rhesus Background
        fetch("/api/thetaPiRhesusBackground")
            .then(res => res.json())
            .then(data => {
                setThetaPiRhesusBackGround(data)
                data.forEach(item => {
                    if(item.utrTheta !== "NA") return thetaUtr.push(item.utrTheta)
                })
                data.forEach(item => {
                    if(item.exonTheta !== "NA") return thetaExon.push(item.exonTheta)
                })
                data.forEach(item => {
                    if(item.intronTheta !== "NA") return thetaIntron.push(item.intronTheta)
                })
                data.forEach(item => {
                    if(item.intergenicTheta !== "NA") return thetaIntergenic.push(item.intergenicTheta)
                })
                data.forEach(item => {
                    if(item.cdsTheta !== "NA") return thetaCds.push(item.cdsTheta)
                })
                data.forEach(item => {
                    if(item.synTheta !== "NA") return thetaSynonmous.push(item.synTheta)
                })
                data.forEach(item => {
                    if(item.nsynTheta !== "NA") return thetaNonsynonmous.push(item.nsynTheta)
                })
            })
    };

    useEffect(() => {
        fetchData()
    }, []);
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| PopPage | "+props.data.entrezID}</title>
            </Head>
            <GeneContext.Provider value={
                {
                    ...props,
                    thetaPiRhesusBackGround: {
                        thetaUtr: thetaUtr,
                        thetaExon: thetaExon,
                        thetaIntron: thetaIntron,
                        thetaIntergenic: thetaIntergenic,
                        thetaCds: thetaCds,
                        thetaSynonmous: thetaSynonmous,
                        thetaNonsynonmous: thetaNonsynonmous
                    }
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