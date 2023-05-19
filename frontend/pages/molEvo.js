import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Button, Input, Row, Select, Space} from 'antd';
import {useRouter} from "next/router";
import {useState} from "react";
import Image from "next/image";
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
                pathname: `/genePage`,
                query: {
                    idType: idType,
                    id: value
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
                        width: 800,
                        margin: "60px auto",
                    }
                }>
                    <h1 style={{fontSize:40}}>Molecular Evolution Gateway</h1>
                    <Image src={"/images/molEvo.png"} width={600} height={200}/>
                    <p className={"notion"}>An NGS-oriented genomic framework to access
                        and visualize macaque annotations in reference to human orthologous genes and the associated
                        regulations</p>
                </div>
                <Space>
                    <Select defaultValue="Symbol" style={{width:'200px'}} size={"large"} onChange={onIDTypeChange}>
                        <Option value="Symbol">Gene Symbol</Option>
                        <Option value="Refseq">Refseq RNA ID</Option>
                        <Option value="Location">Location</Option>
                    </Select>
                    <Input
                        placeholder="input a gene of interest"
                        id={"search"}
                        allowClear
                        defaultValue={"SRGAP2"}
                        onSearch={onSearch}
                        size={"large"}
                        style={{
                            width: "600px",
                            textAlign:"left"
                        }}
                        loading={searching}
                    />
                </Space>
                <Row justify="center" style={{margin:"30px"}}>
                    <Space>
                        <p className={"notion"}>Search:</p>
                        <Button type="primary" size={"large"}>Gene Page</Button>
                        <Button type="primary" size={"large"}>Regulation Page</Button>
                    </Space>
                </Row>
            </div>
        </LayoutCustom>
    )
}