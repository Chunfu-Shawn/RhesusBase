import {Button, Checkbox, Col, Form, Input, InputNumber, message, Radio, Row, Select, Space} from "antd";
import OligoSeqFileUpload from "./OligoSeqFileUpload";
import RunExampleModule from "./RunExampleModule";
import {throttle} from "../util";
import {useContext, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {Context} from "../LayoutCustom";
import {layout, tailLayout} from "../OSHA/RunModule";
const { TextArea } = Input;
const { Option } = Select;


export default function RunModule(props) {
    const {
        validateMessages
    } = props
    const UPLOAD_URL = `/milos/run/`
    const context = useContext(Context);
    const [oligoSeqFileList, setOligoSeqFileList] = useState([]);
    const [database, setDatabase] = useState("Homo sapiens");
    const [SSResults, setSSResults] = useState(true);
    const [seedRegion, setSeedRegion] = useState('1-9');
    const [maxMismatch, setMaxMismatch] = useState('none');
    const [uploading, setUploading] = useState(false);
    const router = useRouter()
    const [form] = Form.useForm();

    const onChangeDatabase = (value) => {
        setDatabase(value);
    }
    const onChangeSSResults = (e) => {
        setSSResults(e.target.checked);
    }
    const onChangeSeedRegion = (value) => {
        setSeedRegion(value);
    }
    const onChangeMaxMismatch = (value) => {
        setMaxMismatch(value);
    }

    // 手动上传表单
    const handleUpload = () => {
        const formData = new FormData();
        oligoSeqFileList.forEach((file) => {
            file.percent = 0
            file.status = 'uploading'
            setOligoSeqFileList([file])
            formData.append('oligoSeqFile', file);
        });
        formData.append('user', context.username)
        formData.append('tool', 'milos')
        formData.append('database', database)
        formData.append('SSResults', SSResults)
        formData.append('seedRegion', seedRegion)
        formData.append('maxMismatch', maxMismatch)
        formData.append('isDemo', "false")
        setUploading(true);
        // You can use any AJAX library you like
        axios({
            method: 'post',
            url: UPLOAD_URL,
            data: formData,
            onUploadProgress: progressEvent => {
                oligoSeqFileList.forEach((file) => {
                    file.percent = (progressEvent.loaded / progressEvent.total * 100 | 0);
                    setOligoSeqFileList([file])
                })
            },
        }).then(response => response.data)
            .then(json => json.rid)
            .then(() => {
                oligoSeqFileList.forEach((file) => {
                    file.status = 'done'
                    setOligoSeqFileList([file])
                });
                message.success({
                    content: 'upload successfully!',
                    style: {
                        marginTop: '12vh',
                    },
                });
                //nextjs路由跳转到结果页面
                //router.push('/mapping/resultPage/' + rid)
            })
            .catch(() => {
                oligoSeqFileList.forEach((file) => {
                    file.status = 'error'
                    setOligoSeqFileList([file])
                });
                message.error({
                        content: 'upload unsuccessfully.',
                        style: {
                            marginTop: '12vh',
                        },
                        duration: 3,
                    }
                );
                setUploading(false);
                //router.reload()
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const onReset = () => {
        form.resetFields();
        setOligoSeqFileList([]);
    };

    return (
        <Form {...layout} layout={'horizontal'} form={form}
              onFinish={throttle(1000, handleUpload)}
              name="control-hooks"
              validateMessages={validateMessages}
              style={{width: 800}}>


            <Form.Item label="数据库类型">
                <Select
                    style={{
                        width: "550px",
                    }}
                    value={database}
                    onChange={onChangeDatabase}
                >
                    {["Homo sapiens","Mus musculus","Rhesus"].map((option) => (
                        <Option key={option}>{option}</Option>
                    ))}
                </Select><br/><br/>
            </Form.Item>
            <OligoSeqFileUpload setFileList={setOligoSeqFileList}
                                fileList={oligoSeqFileList}
                                uploading={uploading}
            />
            <Form.Item label="选项">
                <Row>
                    <Checkbox
                        checked={SSResults}
                        onChange={onChangeSSResults}
                    >
                        包含正义链匹配结果
                    </Checkbox>
                </Row>
                <Row style={{height:80}}>
                    <Space size={30}>
                        <Col>
                            种子区定义：
                            <Select
                                style={{
                                    width: "80px",
                                }}
                                value={seedRegion}
                                onChange={onChangeSeedRegion}
                            >
                                {["1-9","2-9","1-8","2-8","1-7","2-7"].map((option) => (
                                    <Option key={option}>{option}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col>
                            最大错配数：
                            <Select
                                style={{
                                    width: "80px",
                                }}
                                value={maxMismatch}
                                onChange={onChangeMaxMismatch}
                            >
                                {["none","1nt","2nt","3nt"].map((option) => (
                                    <Option key={option}>{option}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Space>
                </Row>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" disabled={
                    oligoSeqFileList.length === 0
                }
                        loading={uploading} className={"btn-upload"}>
                    {uploading ? 'Start Running...' : 'Run'}
                </Button>
                <Button type="ghost" htmlType="button" onClick={onReset} className={"btn-upload"}>
                    Reset
                </Button>
                <RunExampleModule
                    setUploading={setUploading}
                />
            </Form.Item>
        </Form>
    )
}