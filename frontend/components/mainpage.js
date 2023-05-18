import PlaceHolder from "./MainPage/PlaceHolder.js";
import {Divider, Input, Row, Select} from "antd";
const { Search } = Input;
const { Option } = Select;
import React, {useState} from "react";
import {useRouter} from "next/router";

export default function MainPage() {
    const [searching, setSearching] = useState(false);
    const [idType, setIdType] = useState('Symbol');
    const router = useRouter()
    const onIDTypeChange = (value) => {
        setIdType(value)
    }
    const onSearch = (value) => {
        if (value !== ''){
            setSearching(true)
            router.push({
                pathname: `/search/results`,
                query: {
                    idType: idType,
                    geneName: value
                },
            })
            setSearching(false)
        }
    }

    return(
        <>
            <div className="cover-container">
                <div className="cover">
                    <h1 className="cover-heading">A one-stop genomic information knowledge base for the monkey research community</h1>
                    <Select defaultValue="Symbol"
                            style={{width:'180px',marginRight:10}}
                            size={"large"}
                            onChange={onIDTypeChange}>
                        <Option value="Symbol">Gene Symbol</Option>
                        <Option value="Entrez">Entrez ID</Option>
                        <Option value="Ensembl">Ensembl ID</Option>
                        <Option value="Location">Location</Option>
                    </Select>
                    <Search
                        placeholder="input a gene of interest"
                        id={"search"}
                        allowClear
                        defaultValue={"ADARB1"}
                        onSearch={onSearch}
                        size={"large"}
                        style={{
                            width: "400px",
                        }}
                        loading={searching}
                    />
                </div>
            </div>
            <div className="modal-body-stw" style={{paddingTop:0}}>
                <Divider style={{borderTop:"lightgray"}}>
                    <h2 className={"inner"} >Introduction</h2>
                </Divider>
                <p className={"introduction"}>
                    Rhesus macaque, as a non-human primate model animal widely distributed in China, poses a unique model
                    to explore the law of human evolution with the advantages of controllable environmental factors,
                    convenient sampling and detection, and similar genome, physiological and pathological characteristics
                    to humans. Because key issues regarding this animal model remain poorly addressed -- the limited
                    genomic annotation and gene structure, lack of functional genomics data, and immature information
                    research platform, rhesus macaque only has been mainly used in preclinical drug research for a long
                    time, but not serve as a high-precision molecular medical model to support in-depth functional and
                    mechanism studies.
                </p>
                <p className={"introduction"}>
                    We defined the rhesus macaque reference genome and gene structure in detail, established a rhesus macaque
                    population genetics research platform, supplemented a large number of convincing transcripts missed
                    before (<b className={"highlight"}>72%</b> of rhesus macaque transcripts were missed by existing authoritative annotations), and
                    cleared the errors found in about <b className={"highlight"}>30%</b> rhesus gene structure annotations from genomics platforms
                    Ensembl and others. The self-produced and public data deeply integrated accounts for nearly 30%
                    of the international non-human primate omics data. The breadth and depth of annotations for some
                    regulatory levels are comparable to that of human genome annotations, which greatly enriches the
                    understanding of rhesus macaque functional modulation.
                </p>
                <p className={"introduction"}>
                    By further integrating 65 public databases and developing dozens of online interfaces, we built
                    <b className={"highlight"}> a one-stop genomic information knowledge base, RhesusBase</b>, which integrates
                    annotation information of genome, gene structure, population genetics, expression regulation, molecular
                    evolution, drug development, etc., totally with <b className={"highlight"}>7.6 billion functional
                    annotation records</b>. Especially, we developed <b className={"highlight"}>Molecular Evolution Gateway</b>,
                    an NGS-oriented genomic framework to access and visualize macaque annotations in reference to human
                    orthologous genes and the associated regulations, and <b className={"highlight"}>PopGateway</b>, the
                    first genome-wide effort to identify and visualize the population genetics profile in rhesus monkey.
                    Overall, RhesusBase provides a basis for precise functional and mechanism studies using rhesus macaque
                    as a characteristic model.
                </p>
                <Divider style={{borderTop:"lightgray"}}>
                    <h2 className={"inner"} >Explore RhesusBase</h2>
                </Divider>
                <a id={"more"} style={{position: 'relative', top: "-200px"}}></a>
                <Row style={{margin:"20px 0px"}} gutter={[20,20]} justify="space-between" >
                    <PlaceHolder title={"STellaris"}
                                 context={"The key tool designed for accurate spatial mapping for scRNA-seq data " +
                                     "based on properly matched spatial transcriptomics data."}
                                 link={"https://spatial.rhesusbase.com"}
                                 pic={"STellaris.png"}/>
                    <PlaceHolder title={"Gene Page"}
                                 context={"Dataset browser comprises modules of meta information, basic visualization and " +
                                     "files download of curated ST datasets"}
                                 link={"/datasets"}
                                 pic={"genePage.png"}/>
                    <PlaceHolder title={"UCSC-mode Browser"}
                                 context={"An interface to search for spatially resolved gene expression heterogeneity " +
                                     "across all curated ST datasets."}
                                 link={"https://browser.rhesusbase.com"}
                                 pic={"UCSC-mode.png"}/>
                    <PlaceHolder title={"Molecular Evolution"}
                                 context={"An interface to search for spatially resolved gene expression heterogeneity " +
                                     "across all curated ST datasets."}
                                 link={"/molEvo"}
                                 pic={"molEvo.png"}/>
                    <PlaceHolder title={"Population Genetics"}
                                 context={"The key tool designed for accurate spatial mapping for scRNA-seq data " +
                                     "based on properly matched spatial transcriptomics data."}
                                 link={"/popGateway"}
                                 pic={"popGateway.jpg"}/>
                    <PlaceHolder title={"Drug Discovery"}
                                 context={"Dataset browser comprises modules of meta information, basic visualization and " +
                                     "files download of curated ST datasets"}
                                 link={"/datasets"}
                                 pic={"drugDiscovery.png"}/>
                    <PlaceHolder title={"Downloads"}
                                 context={"An interface to search for spatially resolved gene expression heterogeneity " +
                                     "across all curated ST datasets."}
                                 link={"/downloads"}
                                 pic={"downloads.png"}/>
                    <PlaceHolder title={"RhesusBase quality score"}
                                 context={"An interface to search for spatially resolved gene expression heterogeneity " +
                                     "across all curated ST datasets."}
                                 link={"/search"}
                                 pic={"placeholder.png"}/>
                </Row>
            </div>
        </>
    )


}