import {Button, Card, Table, Tag, Tooltip} from "antd";
import useSWR from "swr";
import {downloadFile} from "./util";
import {useContext} from "react";
import {Context} from "./LayoutCustom";

// 自定义hook，每次渲染后返回任务状态；
function useRecordsInfo(tool,user){
    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    const { data, error } = useSWR(`/api/history/${tool}/${user}`, fetcher,
        {
            revalidateIfStale: false,
            refreshInterval: 1000,
        })

    // 如果数据为空，为undefined，返回error为true
    return{
        history: data,
        error: error,
        isLoading: !error && !data,
    }
}

export default function History(props){
    const context = useContext(Context);
    let {history, error, isLoading} = useRecordsInfo(props.tool,context.username)

    const downloadResult = (rid) => function (){
        downloadFile(`/api/result/${rid}`)
    }
    const columns = [
        {
            title: 'RID',
            dataIndex: 'rid',
            key: 'rid',
            width:'12%',
            sorter: (a, b) => {
                if(a.rid > b.rid) return 1
                else return -1
            },
            ellipsis: true,
        },
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
            width:'9%',
            filters: Array.from(new Set((history?history:[]).map(
                value => value.user ))).map(
                item => {
                    return{
                        text: item,
                        value: item
                    }
                }
            ),
            onFilter: (value, record) => record.user.indexOf(value) === 0,
            filterSearch: true,
        },
        {
            title: 'Start Time',
            dataIndex: 'start_time',
            key: 'start_time',
            width:'15%',
            sorter: (a, b) => {
                if(a.start_time > b.start_time) return 1
                else return -1
            },
            defaultSortOrder: "descend",
            ellipsis: true,
        },
        {
            title: 'Finish Time',
            dataIndex: 'finish_time',
            key: 'finish_time',
            width:'15%',
            sorter: (a, b) => {
                if(a.finish_time > b.finish_time) return 1
                else return -1
            },
            ellipsis: true,
        },
        {
            title: 'Parameters',
            dataIndex: 'parameters',
            key: 'parameters',
            width:'20%',
            render: (parameters) => (
                <Tooltip placement="topLeft" title={parameters}>
                    {parameters}
                </Tooltip>
            ),
            sorter: (a, b) => {
                if(a.parameters > b.parameters) return 1
                else return -1
            },
            ellipsis: true,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width:'9%',
            render: (_,{status}) => {
                let color = ''
                switch(status)
                {
                    case 'running':
                        color = 'blue'
                        break;
                    case 'finished':
                        color = 'green'
                        break;
                    case 'error':
                        color = 'volcano'
                        break;
                    default:
                        color = 'default'
                }
                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Result',
            key: 'select',
            width:'10%',
            render: (_, record) =>
                <Button type={"primary"} ghost={true} size={"small"}
                        onClick={downloadResult(record.rid)}
                        disabled={!(record.status === "finished")}
                >
                    download
                </Button>,
        }
    ];
    if (props.manage){
        columns.splice(1,0,
            {
                title: 'Tool',
                dataIndex: 'tool',
                key: 'tool',
                width:'6%',
                filters: Array.from(new Set((history?history:[]).map(
                    value => value.tool ))).map(
                    item => {
                        return{
                            text: item,
                            value: item
                        }
                    }
                ),
                onFilter: (value, record) => record.tool.indexOf(value) === 0,
            })
    }


    return(
        <div style={{marginTop:30}}>
            <Card style={{padding: 10, textAlign:"left"}}>
                <Table
                    bordered
                    dataSource={ error||isLoading ? null
                        :history.map(
                            item => {
                                return { key:item.rid, ...item }
                            })}
                    columns={columns}
                />
            </Card>
        </div>

    )
}