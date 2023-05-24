import {Button, Col, Collapse, Divider, Empty, Row} from "antd";
import {LoadingOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import React,{useContext} from "react";
import Link from "next/link";
import {exportToCsv} from "../util";
import {GeneContext} from "../../pages/popGateway/popPage/[gene_id]";

const { Panel } = Collapse;

export default function MacaquePopulationGenetics(){
    const geneContext = useContext(GeneContext);
    const data = geneContext.data
    return(
        <div name={"Macaque"}>
            <Divider orientation="left" orientationMargin="0">
                <b style={{fontSize:19}}>Macaque Population Genetics </b>
                <Link href={'/help/manual/search#annotation'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            <a id={"Macaque"} style={{position: 'relative', top: "-150px"}}></a>
        </div>
    )
}