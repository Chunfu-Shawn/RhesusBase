import PlaceHolder from "./MainPage/PlaceHolder.js";
import {Button, Divider, Row} from "antd";
import React from "react";

export default function MainPage() {
    return(
        <>
            <div className="cover-container">
                <div className="inner cover" >
                    <h1 className="cover-heading">A knowledgebase for the monkey research community</h1>
                    <Button type="primary">About</Button>
                </div>
            </div>
            <div className="modal-body-stw" style={{paddingTop:0}}>
                <Divider style={{borderTop:"lightgray"}}>
                    <h2 className={"inner"} >Explore RhesusBase</h2>
                </Divider>
                <a id={"more"} style={{position: 'relative', top: "-200px"}}></a>
                <Row style={{margin:"20px 0px"}} gutter={[20,10]} justify="space-between" >
                    <PlaceHolder title={"Spatial Mapping"}
                                 context={"The key tool designed for accurate spatial mapping for scRNA-seq data " +
                                     "based on properly matched spatial transcriptomics data."}
                                 link={"/mapping"} pic={"placeholder.png"}/>
                    <PlaceHolder title={"Dataset Browser"}
                                 context={"Dataset browser comprises modules of meta information, basic visualization and " +
                                     "files download of curated ST datasets"}
                                 link={"/datasets"} pic={"placeholder.png"}/>
                    <PlaceHolder title={"Gene Search"}
                                 context={"An interface to search for spatially resolved gene expression heterogeneity " +
                                     "across all curated ST datasets."}
                                 link={"/search"} pic={"placeholder.png"}/>
                    <PlaceHolder title={"Gene Search"}
                                 context={"An interface to search for spatially resolved gene expression heterogeneity " +
                                     "across all curated ST datasets."}
                                 link={"/search"} pic={"placeholder.png"}/>
                </Row>
            </div>
        </>
    )


}