import {Button, Checkbox, Col, Form, Input, InputNumber, message, Radio, Row, Select, Space} from "antd";
import OligoSeqFileUpload from "./OligoSeqFileUpload";
import RunExampleModule from "./RunExampleModule";
import {throttle} from "../util";
import {useContext, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {Context} from "../LayoutCustom";
import {layout, tailLayout} from "../OSHA/RunModule";
const { Option } = Select;


export default function RunModule(props) {
    const {
        validateMessages
    } = props
    const UPLOAD_URL = `/otos/run/`
    const context = useContext(Context);
    const [oligoSeqFileList, setOligoSeqFileList] = useState([]);
    const [seqLengthType, setSeqLengthType] = useState("full");
    const [min, setMin] = useState(2);
    const [max, setMax] = useState(19);
    const [database, setDatabase] = useState("Homo sapiens");
    const [coding, setCoding] = useState(true);
    const [noncoding, setNoncoding] = useState(false);
    const [fullLength, setFullLength] = useState(true);
    const [onTargetGene, setOnTargetGene] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [form] = Form.useForm();

    const onChangeSeqLength = (e) => {
        setSeqLengthType(e.target.value);
    }
    const onChangeMin = (value) => {
        setMin(value)
    }
    const onChangeMax = (value) => {
        setMax(value)
    }
    const onChangeDatabase = (value) => {
        setDatabase(value);
    }
    const onChangeCoding = (e) => {
        setCoding(e.target.checked);
    }
    const onChangeNoncoding = (e) => {
        setNoncoding(e.target.checked);
    }
    const onChangeFullLength = (e) => {
        setFullLength(e.target.checked);
    }
    const onChangeOnTargetGene = (e) => {
        setOnTargetGene(e.target.checked);
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
        formData.append('tool', 'otos')
        formData.append('seqLengthType', seqLengthType)
        formData.append('min', min)
        formData.append('max', max)
        formData.append('database', database)
        formData.append('coding', coding)
        formData.append('noncoding', noncoding)
        formData.append('fullLength', fullLength)
        formData.append('onTargetGene', onTargetGene)
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

            <OligoSeqFileUpload setFileList={setOligoSeqFileList}
                                fileList={oligoSeqFileList}
                                uploading={uploading}
            />
            <Form.Item name="sequence length" label="比对序列长度">
                <Radio.Group onChange={onChangeSeqLength} value={seqLengthType}>
                    <Radio value={"full"}>全长</Radio>
                    <Radio value={"custom"}>自定义起始</Radio>
                </Radio.Group>
                <Space size={5}>
                    <InputNumber
                        size="small"
                        style={{
                            width: 60,
                        }}
                        controls={true}
                        value={min}
                        onChange={onChangeMin}
                        precision={0}
                        min={1}
                        max={max}
                    />-
                    <InputNumber
                        size="small"
                        style={{
                            width: 60,
                        }}
                        controls={true}
                        value={max}
                        onChange={onChangeMax}
                        precision={0}
                        min={min}
                        max={22}
                    />
                </Space>
            </Form.Item>
            <Form.Item label="待比对的数据库名称">
                <Select
                    style={{
                        width: "500px",
                    }}
                    value={database}
                    onChange={onChangeDatabase}
                >
                    {["Homo sapiens","Mus musculus","Both"].map((option) => (
                        <Option key={option}>{option}</Option>
                    ))}
                </Select><br/><br/>
                <Checkbox
                    checked={coding}
                    onChange={onChangeCoding}
                >
                    编码转录本
                </Checkbox>
                <Checkbox
                    checked={noncoding}
                    onChange={onChangeNoncoding}
                >
                    非编码转录本
                </Checkbox>
            </Form.Item>
            <Form.Item name="fasta" label="筛选完全匹配序列的长度">
                <Space size={30}>
                    <InputNumber
                        size="small"
                        style={{
                            width: 100,
                        }}
                        controls={false}
                        precision={0}
                        min={1} max={22} defaultValue={19}
                        addonAfter="nt"
                    />
                    <Checkbox
                        checked={fullLength}
                        onChange={onChangeFullLength}
                    >
                        强制全长匹配
                    </Checkbox>
                    <Checkbox
                        checked={onTargetGene}
                        onChange={onChangeOnTargetGene}
                    >
                        on-target基因除外
                    </Checkbox>
                </Space>
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