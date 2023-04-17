import {Button, Checkbox, Form, Input, InputNumber, message, Select, Space} from "antd";
import SiRNAFileUpload from "./SiRNAFileUpload";
import RunExampleModule from "./RunExampleModule";
import {throttle} from "../util";
import {useContext, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {Context} from "../LayoutCustom";
const { TextArea } = Input;
const { Option } = Select;

export const layout = {
    labelAlign: "left",
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 17,
    },
};
export const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 19,
    },
};

export default function RunModule(props) {
    const {
        validateMessages
    } = props
    const UPLOAD_URL = `/osha/run/`
    const context = useContext(Context);
    const [siRNAFileList, setSiRNAFileList] = useState([]);
    const [maxGap, setMaxGap] = useState(0);
    const [maxMismatch, setMaxMismatch] = useState('1nt');
    const [uploading, setUploading] = useState(false);
    const router = useRouter()
    const [form] = Form.useForm();

    const onChangeMaxMismatch = (value) => {
        setMaxMismatch(value);

    }
    const onChangeMaxGap = (value) => {
        setMaxGap(value);
    }

    // 手动上传表单
    const handleUpload = () => {
        const formData = new FormData();
        siRNAFileList.forEach((file) => {
            file.percent = 0
            file.status = 'uploading'
            setSiRNAFileList([file])
            formData.append('siRNAFile', file);
        });
        formData.append('user', context.username)
        formData.append('tool', 'osha')
        formData.append('fasta', form.getFieldValue('fasta'))
        formData.append('maxGap', maxGap)
        formData.append('maxMismatch', maxMismatch)
        formData.append("isDemo", false)
        setUploading(true);
        // You can use any AJAX library you like
        axios({
            method: 'post',
            url: UPLOAD_URL,
            data: formData,
            onUploadProgress: progressEvent => {
                siRNAFileList.forEach((file) => {
                    file.percent = (progressEvent.loaded / progressEvent.total * 100 | 0);
                    setSiRNAFileList([file])
                })
            },
        }).then(() => {
            siRNAFileList.forEach((file) => {
                file.status = 'done'
                setSiRNAFileList([file])
            });
            message.success({
                content: 'upload successfully!',
                style: {
                    marginTop: '12vh',
                },
            });
            //router.reload('/osha')
        }).catch(() => {
            siRNAFileList.forEach((file) => {
                file.status = 'error'
                setSiRNAFileList([file])
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
        setSiRNAFileList([]);
    };

    return (
        <Form {...layout} layout={'horizontal'} form={form}
              onFinish={throttle(1000, handleUpload)}
              name="control-hooks"
              validateMessages={validateMessages}
              style={{width: 800}}>

            <SiRNAFileUpload setFileList={setSiRNAFileList}
                             fileList={siRNAFileList}
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
                          placeholder="粘贴长核酸序列到此处"
                />
            </Form.Item>

            <Form.Item label="选项" valuePropName="checked">
                <Space size={"large"}>
                    Max gap:
                    <InputNumber
                        size="small"
                        style={{
                            width: 55,
                        }}
                        value={maxGap}
                        onChange={onChangeMaxGap}
                        controls={true}
                        precision={0}
                        min={0}
                        max={10}
                    />
                    Max mismatch:
                    <Select
                        style={{
                            width: "80px",
                        }}
                        value={maxMismatch}
                        onChange={onChangeMaxMismatch}
                    >
                        {['1nt','2nt','3nt'].map((option) => (
                            <Option key={option}>{option}</Option>
                        ))}
                    </Select>
                </Space>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit"
                        disabled={siRNAFileList.length === 0}
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