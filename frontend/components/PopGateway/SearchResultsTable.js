import {Divider, Space, Table, Tag} from "antd";
import {useState} from "react";
import {QuestionCircleFilled} from "@ant-design/icons";
import Link from "next/link.js";


export default function SearchResultsTable(props){
    const [sortedInfo, setSortedInfo] = useState({});
    const columns =[
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
            width:'10%',
            sorter: (a, b) => {
                if(a.symbol > b.symbol) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'symbol' ? sortedInfo.order : null,
            render: (text,record) => text!=="-" ?
                <a href={`/popGateway/popPage/${record.entrezID}`} target={"_blank"} id={record.entrezID} rel={'noreferrer'}>
                    {text}
                </a>:"-",
        },
        {
            title: 'Entrez ID',
            dataIndex: 'entrezID',
            key: 'entrezID',
            width:'12%',
            sorter: (a, b) => {
                if(Number(a.entrezID) > Number(b.entrezID)) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'entrezID' ? sortedInfo.order : null,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width:'30%',
        },
        {
            title: () => {
                return <Space>
                    <span>Gene type</span>
                    <Link href={'/help/manual/search#gene_list'}>
                        <a target={'_blank'}>
                            <QuestionCircleFilled  style={{fontSize:"15px",color:"#3f6600"}}/>
                        </a>
                    </Link>
                </Space>
            },
            dataIndex: 'geneType',
            key: 'geneType',
            width:'18%',
            sortOrder: sortedInfo.columnKey === 'geneType' ? sortedInfo.order : null,
            filters: Array.from(new Set(props.data.map(item=>item.geneType))).map(item =>
            {
                return{
                    text: item,
                    value: item
                }
            }),
            onFilter: (value, record) => record.geneType === value,
            render: (_,{geneType}) => {
                let color = ''
                switch(geneType)
                {
                    case 'protein-coding':
                        color = 'volcano'
                        break;
                    case 'ncRNA':
                        color = 'green'
                        break;
                    case 'pseudo':
                        color = 'cyan'
                        break;
                    case 'rRNA':
                        color = 'purple'
                        break;
                    case 'scRNA':
                        color = 'geekblue'
                        break;
                    case 'tRNA':
                        color = 'blue'
                        break;
                    case 'snRNA':
                        color = 'lime'
                        break;
                    case 'miscRNA':
                        color = 'gold'
                        break;
                    case 'snoRNA':
                        color = 'orange'
                        break;
                    default:
                        color = 'default'
                }
                return (
                    <Tag color={color} key={geneType}>
                        {geneType.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Taxonomy ID',
            dataIndex: 'taxID',
            key: 'taxID',
            width: '10%',
            filters: Array.from(new Set(props.data.map(item=>item.taxID))).map(item =>
            {
                return{
                    text: item,
                    value: item
                }
            }),
            onFilter: (value, record) => record.taxID === value,
        },
        {
            title: 'Human Entrez ID',
            dataIndex: 'humanEntrez',
            key: 'humanEntrez',
            width: '12%',
            render: (text) => text===null ? "-":text,
        },
        {
            title: 'Human Symbol',
            dataIndex: 'humanSymbol',
            key: 'humanSymbol',
            width: '10%',
            render: (text) => text==='' ? "-":text,
        },
        ]
        // column sort
        const handleChange = (pagination,filter,sorter) => {
            console.log('Various parameters', pagination, filter, sorter);
            setSortedInfo(sorter);
        };

        return(
        props.data.length !== 0 ?
            <>
                <div>
                    <span style={{fontSize:"15px"}}> {props.data.length} Results Found </span>
                </div>
                <Divider />
                <Table dataSource={props.data} columns={columns}
                       onChange={handleChange}
                       expandable={{
                           expandedRowRender: (record) => (
                               <Space size={"large"}>
                                   {
                                       record.alias ?
                                           <span
                                               style={{
                                                   margin: 20,
                                               }}
                                           >
                                                   <b>Aliases: </b> {record.alias}
                                           </span> : <></>
                                   }
                                   {
                                       record.chr ?
                                           <span
                                               style={{
                                                   margin: 20,
                                               }}
                                           >
                                               <b>Chromosome </b>  {`${record.chr}: ${record.start}-${record.end}`}
                                           </span> : <></>
                                   }
                                   {
                                       record.strand ?
                                           <span
                                               style={{
                                                   margin: 20,
                                               }}
                                           >
                                               <b>Strand:</b> {record.strand}
                                           </span> : <></>
                                   }
                                   <span
                                       style={{
                                           margin: 20,
                                       }}
                                   >
                                       <b>Mouse Entrez ID:</b> {record.mouseEntrez}
                                   </span>
                                   <span
                                       style={{
                                           margin: 20,
                                       }}
                                   >
                                       <b>Mouse Symbol:</b> {record.mouseSymbol}
                                   </span>
                               </Space>
                           ),
                           rowExpandable: (record) => record.name !== 'Not Expandable',

                       }}
                />
            </>
            :
            <div style={{height:"45vh"}}>
                <Divider />
                <span style={{fontSize:"25px",fontWeight:"bold"}}> 0 Results Found </span>
            </div>
        )
}