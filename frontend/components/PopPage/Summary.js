import {Divider} from "antd";
import {LinkOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import React,{useContext} from "react";
import AttributeLayout from "./AttributeLayout";
import Link from "next/link";
import {GeneContext} from "../../pages/popGateway/popPage/[gene_id]";

export default function Summary(){
    const geneContext = useContext(GeneContext);
    const data = geneContext.data
    let HGNC = ""

    return(
        <div name={"Summary"}>
            <a id={"Summary"} style={{position: 'relative', top: "-150px"}}></a>
            <Divider orientation="left" orientationMargin="0">
                <b style={{fontSize:19}}>Summary </b>
                <Link href={'/help/manual/search#annotation'}>
                    <a target={"_blank"}><QuestionCircleOutlined/></a>
                </Link>
            </Divider>
            {
                data.symbol!=="-"?
                <AttributeLayout attribute={"Symbol"}>
                        {data.symbol}
                </AttributeLayout>
                    :<></>
            }
            <AttributeLayout attribute={"Entrez ID"}>
                <a href={`https://www.ncbi.nlm.nih.gov/gene/${data.entrezID}`} target={"_blank"} rel="noreferrer">
                    {` ${data.entrezID}`}<LinkOutlined />
                </a>
            </AttributeLayout>
            <AttributeLayout attribute={"Description"}>{data.description}</AttributeLayout>
            <AttributeLayout attribute={"Gene Type"}>{data.geneType}</AttributeLayout>
            <AttributeLayout attribute={"Organism"}>{data.taxID}</AttributeLayout>
            {
                data.alias?
                    <AttributeLayout attribute={"Gene Synonyms"}>{data.alias}</AttributeLayout>
                    :<></>
            }
            <AttributeLayout attribute={"Location"}>
                <>
                    Chromosome  {`${data.chr}: ${data.start}-${data.end}`}
                    <span>{data.strand}</span>
                </>
            </AttributeLayout>
            <AttributeLayout attribute={"Human Symbol"}>{data.humanSymbol}</AttributeLayout>
            <AttributeLayout attribute={"Human Entrez"}>{data.humanEntrez}</AttributeLayout>
        </div>
    )
}