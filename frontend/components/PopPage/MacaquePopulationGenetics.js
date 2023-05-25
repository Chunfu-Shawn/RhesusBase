import {Col, Divider, Row} from "antd";
import {LoadingOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import {GeneContext} from "../../pages/popGateway/popPage/[gene_id]";
import BoxPlot from "./BoxPlot";


export default function MacaquePopulationGenetics(){
    const geneContext = useContext(GeneContext);
    const RNAIds = geneContext.RNAIds
    const [thetaPiRhesusBackGround,setThetaPiRhesusBackGround] = useState([])
    const [thetaUtr,setThetaUtr] = useState([])
    const [thetaExon,setThetaExon] = useState([])
    const [thetaIntron,setThetaIntron] = useState([])
    const [thetaIntergenic,setThetaIntergenic] = useState([])
    const [thetaCds,setThetaCds] = useState([])
    const [thetaSynonmous,setThetaSynonmous] = useState([])
    const [thetaNonsynonmous,setThetaNonsynonmous] = useState([])
    const [piUtr,setPiUtr] = useState([])
    const [piExon,setPiExon] = useState([])
    const [piIntron,setPiIntron] = useState([])
    const [piIntergenic,setPiIntergenic] = useState([])
    const [piCds,setPiCds] = useState([])
    const [piSynonmous,setPiSynonmous] = useState([])
    const [piNonsynonmous,setPiNonsynonmous] = useState([])


    const fetchData = async () => {
        // load Theta Pi Rhesus Background
        fetch("/api/thetaPiRhesusBackground")
            .then(res => res.json())
            .then(data => {
                setThetaPiRhesusBackGround(data)
                let thetaUtr = []
                let thetaExon = []
                let thetaIntron = []
                let thetaIntergenic = []
                let thetaCds = []
                let thetaSynonmous = []
                let thetaNonsynonmous = []
                let piUtr = []
                let piExon = []
                let piIntron = []
                let piIntergenic = []
                let piCds = []
                let piSynonmous = []
                let piNonsynonmous = []
                data.forEach(item => { if(item.utrTheta !== "NA") return thetaUtr.push(item.utrTheta) })
                data.forEach(item => { if(item.exonTheta !== "NA") return thetaExon.push(item.exonTheta) })
                data.forEach(item => { if(item.intronTheta !== "NA") return thetaIntron.push(item.intronTheta) })
                data.forEach(item => { if(item.intergenicTheta !== "NA") return thetaIntergenic.push(item.intergenicTheta) })
                data.forEach(item => { if(item.cdsTheta !== "NA") return thetaCds.push(item.cdsTheta) })
                data.forEach(item => { if(item.synTheta !== "NA") return thetaSynonmous.push(item.synTheta) })
                data.forEach(item => { if(item.nsynTheta !== "NA") return thetaNonsynonmous.push(item.nsynTheta) })
                data.forEach(item => { if(item.utrPi !== "NA") return piUtr.push(item.utrPi) })
                data.forEach(item => { if(item.exonPi !== "NA") return piExon.push(item.exonPi) })
                data.forEach(item => { if(item.intronPi !== "NA") return piIntron.push(item.intronPi) })
                data.forEach(item => { if(item.intergenicPi !== "NA") return piIntergenic.push(item.intergenicPi) })
                data.forEach(item => { if(item.cdsPi !== "NA") return piCds.push(item.cdsPi) })
                data.forEach(item => { if(item.synPi !== "NA") return piSynonmous.push(item.synPi) })
                data.forEach(item => { if(item.nsynPi !== "NA") return piNonsynonmous.push(item.nsynPi) })
                setThetaUtr(thetaUtr)
                setThetaExon(thetaExon)
                setThetaIntron(thetaIntron)
                setThetaIntergenic(thetaIntergenic)
                setThetaCds(thetaCds)
                setThetaSynonmous(thetaSynonmous)
                setThetaNonsynonmous(thetaNonsynonmous)
                setPiUtr(piUtr)
                setPiExon(piExon)
                setPiIntron(piIntron)
                setPiIntergenic(piIntergenic)
                setPiCds(piCds)
                setPiSynonmous(piSynonmous)
                setPiNonsynonmous(piNonsynonmous)
            })
    };

    useEffect(() => {
        fetchData()
    }, []);

    return(
        <div name={"Macaque"}>
            <Divider orientation="left" orientationMargin="0">
                <b style={{fontSize:19}}>Macaque Population Genetics </b>
                <Link href={'/help/manual/search#annotation'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            <a id={"Macaque"} style={{position: 'relative', top: "-150px"}}></a>
            {   thetaPiRhesusBackGround.length === 0 ?
                <div style={{textAlign:"center"}}>
                    <LoadingOutlined style={{margin:"auto",fontSize:30}}/>
                </div>:
                RNAIds.map(item => {
                    return(
                        <>
                            <h3>{item}</h3>
                            <Row key={item}>
                                <Col>
                                    <BoxPlot
                                        background={[
                                            thetaSynonmous,
                                            thetaNonsynonmous,
                                            thetaCds,
                                            thetaUtr,
                                            thetaExon,
                                            thetaIntron,
                                            thetaIntergenic,
                                        ]}
                                        yName={"Population Mutation Rate"}
                                    />
                                </Col>
                                <Col>
                                    <BoxPlot
                                        background={[
                                            piSynonmous,
                                            piNonsynonmous,
                                            piCds,
                                            piUtr,
                                            piExon,
                                            piIntron,
                                            piIntergenic,
                                        ]}
                                        yName={"Nucleotide Diversity"}
                                    />
                                </Col>
                            </Row>
                        </>
                    )
                })
            }
        </div>
    )
}