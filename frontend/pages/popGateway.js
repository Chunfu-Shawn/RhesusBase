import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Input, Select} from 'antd';
import {useRouter} from "next/router";
import {useState} from "react";
import Link from "next/link.js";
import {QuestionCircleOutlined} from "@ant-design/icons";
import Image from "next/image";
const { Search } = Input;
const { Option } = Select;

export default function SearchPage() {
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
                    <Select defaultValue="Symbol" style={{width:'15%'}} size={"large"} onChange={onIDTypeChange}>
                        <Option value="Symbol">Gene Symbol</Option>
                        <Option value="Entrez">Entrez ID</Option>
                        <Option value="Ensembl">Ensembl ID</Option>
                        <Option value="Location">Location</Option>
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
                        loading={searching}
                    />
                </Input.Group><br/>
                <Input.Group compact>
                    <Select defaultValue="Location" style={{width:'15%'}} size={"large"} onChange={onIDTypeChange}>
                        <Option value="Location">Location</Option>
                    </Select>
                    <Search
                        placeholder="input a location of interest"
                        enterButton="Genome Browser"
                        id={"search"}
                        allowClear
                        defaultValue={"chr3:1487782-1572486"}
                        onSearch={onSearch}
                        size={"large"}
                        style={{
                            width: "60%",
                        }}
                        loading={searching}
                    />
                </Input.Group>
            </div>
        </LayoutCustom>
    )
}