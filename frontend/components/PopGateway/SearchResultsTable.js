import {Divider, Space, Table, Tag} from "antd";
import {useState} from "react";
import {QuestionCircleFilled} from "@ant-design/icons";
import Link from "next/link.js";

export function setFilter(data){
    let filter = new Set()
    let filterJSON = []
    data.forEach( (item) => {
        filter.add(item.biotype)
    })
    for (let item of filter.values())
        filterJSON.push({text:item,value:item})
    return filterJSON
}

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
                <a href={`/search/genePage/${record.entrezID}`} target={"_blank"} id={record.entrezID} rel={'noreferrer'}>
                    {text}
                </a>:"-",
        },
        /*{
            title: 'Ensembl ID',
            dataIndex: 'ensembl_id',
            key: 'ensembl_id',
            width:'15%',
            render: (text) => <a href={'/search/genePage/'+text} target={"_blank"} rel={'noreferrer'}>{text}</a>,
            sorter: (a, b) => {
                if(a.ensembl_id > b.ensembl_id) return 1
                else return -1
            },
            sortOrder: sortedInfo.columnKey === 'ensembl_id' ? sortedInfo.order : null,
        },*/
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
            filters: setFilter(props.data),
            onFilter: (value, record) => record.geneType.indexOf(value) === 0,
            render: (_,{geneType}) => {
                let color = ''
                switch(geneType)
                {
                    case 'protein_coding':
                        color = 'volcano'
                        break;
                    case 'lncRNA':
                        color = 'green'
                        break;
                    case 'processed_pseudogene':
                        color = 'cyan'
                        break;
                    case 'unprocessed_pseudogene':
                        color = 'purple'
                        break;
                    case 'miRNA':
                        color = 'geekblue'
                        break;
                    case 'TEC':
                        color = 'blue'
                        break;
                    case 'snRNA':
                        color = 'lime'
                        break;
                    case 'misc_RNA':
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
            width: '20%',
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
                                           </span> : <></>}
                                   {record.chr ?
                                       <span
                                           style={{
                                               margin: 20,
                                           }}
                                       >
                                           <b>Chromosome </b>  {`${record.chr}: ${record.start}-${record.end}`}
                                       </span> : <></>}
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
                <QuestionCircleFilled style={{fontSize:"25px",color:"#3f6600"}}/>
            </div>
        )
}