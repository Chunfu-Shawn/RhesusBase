import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Input, Select} from 'antd';
import {useRouter} from "next/router";
import {useState} from "react";
import Image from "next/image";
const { Search } = Input;
const { Option } = Select;

export default function SearchPage() {
    const [geneSearching, setGeneSearching] = useState(false);
    const [locationSearching, setLocationSearching] = useState(false);
    const [idType, setIdType] = useState('symbol');
    const router = useRouter()
    const onIDTypeChange = (value) => {
        setIdType(value)
    }
    const onSearch = (value) => {
        if (value !== ''){
            setGeneSearching(true)
            router.push({
                pathname: `/popGateway/geneList`,
                query: {
                    idType: idType,
                    keyword: value
                },
            })
        }
    }
    const onBroswerSearch = (value) =>{
        if (value !== '') {
            setLocationSearching(true)
            top.location = 'https://browser.rhesusbase.com/cgi-bin/hgTracks?db=rheMac2&position=' + value;
        }
    }
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Gene Search"}</title>
            </Head>
            <div className="modal-body-stw">
                <div style={
                    {
                        width: 700,
                        margin: "60px auto",
                    }
                }>
                    <h1 style={{fontSize:40}}>Population Genetics Gateway</h1>
                    <Image src={"/images/popGateway.jpg"} width={400} height={280}/>
                    <p style={{color:"gray",fontSize:"18px"}}>An interface to access comprehensive population genetics
                        parameters for each gene in rhesus macaque</p>
                </div>
                <Input.Group compact>
                    <Select defaultValue="symbol" style={{width:'15%'}} size={"large"} onChange={onIDTypeChange}>
                        <Option value="symbol">Gene Symbol</Option>
                        <Option value="entrezID">Entrez ID</Option>
                        <Option value="ensemblID">Ensembl ID</Option>
                        <Option value="location">Location</Option>
                    </Select>
                    <Search
                        placeholder="input a gene of interest"
                        enterButton="PopGateway Page"
                        id={"search"}
                        allowClear
                        defaultValue={"ADARB1"}
                        onSearch={onSearch}
                        size={"large"}
                        style={{
                            width: "60%",
                        }}
                        loading={geneSearching}
                    />
                </Input.Group><br/>
                <Input.Group compact>
                    <Select defaultValue="location" style={{width:'15%'}} size={"large"} onChange={onIDTypeChange}>
                        <Option value="location">Location</Option>
                    </Select>
                    <Search
                        placeholder="input a location of interest"
                        enterButton="Genome Browser"
                        id={"search"}
                        allowClear
                        defaultValue={"chr3:1487782-1572486"}
                        onSearch={onBroswerSearch}
                        size={"large"}
                        style={{
                            width: "60%",
                        }}
                        loading={locationSearching}
                    />
                </Input.Group>
            </div>
        </LayoutCustom>
    )
}