import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../../components/LayoutCustom.js'
import {Col, Input, Row, Select} from 'antd';
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
    if ( typeof keyword === 'undefined' || keyword || typeof idType === 'undefined' ||
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
    console.log(idType,keyword)
    const geneList = await getGeneList(idType,keyword)
    // The exact results always present firstly

    console.log(geneList)
    // Pass post data to the page via props
    return {
        props: {
            keyword: keyword,
            geneList:geneList.map(gene => {
                return { key:gene.entrezID, ...gene }
            }),
        }
    }
}

export default function geneList(props) {
    const {keyword, geneList} = props
    const [searching, setSearching] = useState(false);
    const [idType, setIdType] = useState('Symbol');
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
                        <Input.Group compact>
                            <Select defaultValue="symbol" style={{width:'15%'}} size={"large"} onChange={onIDTypeChange}>
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
                                    width: 850,
                                }}
                                loading={searching}
                            />
                        </Input.Group>
                    </Col>
                </Row>
                <div>
                    <SearchResultsTable data={geneList} />
                </div>
            </div>
        </LayoutCustom>
    )
}