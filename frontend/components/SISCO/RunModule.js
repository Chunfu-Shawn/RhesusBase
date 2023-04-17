import {Button, Col, Form, Input, InputNumber, message, Row, Select, Space} from "antd";
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
    const UPLOAD_URL = `/sisco/run/`
    const context = useContext(Context);
    const [oligoSeqFileList, setOligoSeqFileList] = useState([]);
    const [lengthSS, setLengthSS] = useState(19);
    const [lengthAS, setLengthAS] = useState(20);
    const [lengthSS3, setLengthSS3] = useState(1);
    const [lengthAS3, setLengthAS3] = useState(2);
    const [overhang, setOverhang] = useState("SS 3'");
    const [end, setEnd] = useState("NN");
    const [uploading, setUploading] = useState(false);
    const router = useRouter()
    const [form] = Form.useForm();

    const onChangeLengthSS = (value) => {
        setLengthSS(value)
    }

    const onChangeLengthAS = (value) => {
        setLengthAS(value)
    }

    const onChangeLengthSS3 = (value) => {
        setLengthSS3(value)
    }

    const onChangeLengthAS3 = (value) => {
        setLengthAS3(value)
    }

    const onChangeOverhang = (value) => {
        setOverhang(value);
    }
    const onChangeEnd = (value) => {
        setEnd(value);
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
        formData.append('tool', 'sisco')
        formData.append('fasta', form.getFieldValue('fasta'))
        formData.append('lengthSS', lengthSS)
        formData.append('lengthAS', lengthAS)
        formData.append('overhang', overhang)
        formData.append('lengthSS3', lengthSS3)
        formData.append('lengthAS3', lengthAS3)
        formData.append('end', end)
        formData.append("isDemo", false)
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
        }).then(() => {
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
            //router.reload('/sisco')
        }).catch(() => {
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
        }).finally(() => {
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

            <OligoSeqFileUpload setFileList={setOligoSeqFileList}
                                fileList={oligoSeqFileList}
                                uploading={uploading}
            />

            <Form.Item name="fasta" label="fasta序列"
                       rules={[
                           {
                               required: true,
                           },
                       ]}
            >
                <TextArea rows={6}
                          autoSize={{
                              minRows: 4,
                              maxRows: 6,
                          }}
                          placeholder="粘贴fasta序列到此处"/>
            </Form.Item>

            <Form.Item label="选项" valuePropName="checked">
                <Row>
                    <Space size={20}>
                        <span>Length ( SS / AS ):</span>
                        <Space size={10}>
                            <InputNumber
                                size="small"
                                style={{
                                    width: 55,
                                }}
                                value={lengthSS}
                                onChange={onChangeLengthSS}
                                controls={true}
                                precision={0}
                                min={0}
                                max={100}
                            />/
                            <InputNumber
                                size="small"
                                style={{
                                    width: 55,
                                }}
                                value={lengthAS}
                                onChange={onChangeLengthAS}
                                controls={true}
                                precision={0}
                                min={0}
                                max={100}
                            />
                        </Space>
                    </Space>
                </Row><br/>
                <Row style={{height:80}}>
                    <Space size={50}>
                        <Col>
                            <span>Overhang: </span>
                            <Select
                                style={{
                                    width: "80px",
                                }}
                                value={overhang}
                                onChange={onChangeOverhang}
                            >
                                {["SS 3'","AS 3'","Both"].map((option) => (
                                    <Option key={option}>{option}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col>
                            <Row style={{height:40}}>
                                <Space>
                                    <span>SS 3&apos;</span>
                                    <InputNumber
                                        size="small"
                                        style={{
                                            width: 50,
                                        }}
                                        controls={true}
                                        disabled={overhang==="AS 3'"}
                                        value={lengthSS3}
                                        onChange={onChangeLengthSS3}
                                        precision={0}
                                        min={0} max={10}
                                    />
                                </Space>
                            </Row>
                            <Row>
                                <Space>
                                    <span>AS 3&apos;</span>
                                    <InputNumber
                                        size="small"
                                        style={{
                                            width: 50,
                                        }}
                                        controls={true}
                                        disabled={overhang==="SS 3'"}
                                        value={lengthAS3}
                                        onChange={onChangeLengthAS3}
                                        precision={0}
                                        min={0} max={10}
                                    />
                                </Space>
                            </Row>
                        </Col>
                        <Col>
                            <span>End with: </span>
                            <Select
                                style={{
                                    width: "80px",
                                }}
                                value={end}
                                onChange={onChangeEnd}
                            >
                                {["NN","UU","TT"].map((option) => (
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