import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../../components/LayoutCustom.js'
import {Col, Input, Row, Select, Space} from 'antd';
import {useRouter} from "next/router";
import {useState} from "react";
import SearchResultsTable from "../../components/PopGateway/SearchResultsTable.js";
import {getGeneList} from "../../../libs/mysql/getGeneList";
const { Search } = Input;
const { Option } = Select;

export async function getServerSideProps(context) {
    const idType = context.query.idType
    const keyword = context.query.keyword
    // if geneName is not provided, return 404 Page
    if ( typeof keyword === 'undefined' || typeof keyword === null || typeof idType === 'undefined' ||
        !( idType === "symbol" || idType === "ensemblID" || idType === "entrezID" || idType ==="location" )
    )
    {
        return {
            redirect: {
                destination: '/popGateway',
                permanent: false,
            }
        }
    }
    const geneList = await getGeneList(idType,keyword)

    // One result, redirect to genePage
    if( geneList.length === 1) {
        return {
            redirect: {
                destination: `/popGateway/popPage/${geneList[0].entrezID}`,
                permanent: false,
            }
        }
    }

    // The exact results always present firstly
    const geneListProcessed = []
    geneList.forEach((item)=>{
        if(item["symbol"].toUpperCase() === context.query.keyword.toUpperCase()){
            geneListProcessed.unshift(item)
        }else geneListProcessed.push(item)
    })

    // Pass post data to the page via props
    return {
        props: {
            keyword: keyword,
            geneList:geneListProcessed.map(gene => {
                return { key:gene.entrezID, ...gene }
            }),
        }
    }
}

export default function GeneList(props) {
    const {keyword, geneList} = props
    const [searching, setSearching] = useState(false);
    const [idType, setIdType] = useState('symbol');
    const router = useRouter()
    const onIDTypeChange = (value) => {
        setIdType(value)
    }
    const onSearch = (value) => {
        if (value === ''){
            router.push({
                pathname: `/popGateway/geneList`,
            })
        }else {
            setSearching(true)
            router.push({
                pathname: `/popGateway/geneList`,
                query: {
                    idType: idType,
                    keyword: value
                },
            })
            setSearching(false)
        }
    }
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Gene Search"}</title>
            </Head>
            <div className="modal-body-stw" style={{padding:"150px 30px",textAlign:"left"}}>
                <Row>
                    <Col xs={0} md={0} lg={4}>
                        <div style={
                            {
                                fontSize:"26px",
                            }
                        }>
                            Gene List
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={20}>
                        <Space>
                            <Select defaultValue="symbol" style={{width:'200px'}} size={"large"} onChange={onIDTypeChange}>
                                <Option value="symbol">Gene Symbol</Option>
                                <Option value="entrezID">Entrez ID</Option>
                                <Option value="ensemblID">Ensembl ID</Option>
                                <Option value="location">Location</Option>
                            </Select>
                            <Search
                                id={"search"}
                                allowClear
                                placeholder={keyword}
                                defaultValue={keyword}
                                onSearch={onSearch}
                                size={"large"}
                                style={{
                                    width: "850px",
                                }}
                                loading={searching}
                            />
                        </Space>
                    </Col>
                </Row>
                <div>
                    <SearchResultsTable data={geneList} />
                </div>
            </div>
        </LayoutCustom>
    )
}