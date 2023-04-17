import {Form, Upload} from "antd";
import {FileExcelOutlined} from "@ant-design/icons";
import {settingSiRNAFile} from "../OSHA/SiRNAFileUpload";
const { Dragger } = Upload;

export default function OligoSeqFileUpload(props){

    return(
        <Form.Item name="oligoSeqFile" label="Oligo seq文件"
                   rules={[
                       {
                           required: true,
                       },
                   ]}
        >
            <Dragger {...settingSiRNAFile(props)} maxCount={1}>
                <p className="ant-upload-drag-icon">
                    <FileExcelOutlined />
                </p>
                <p className="ant-upload-text">点击或者拖拽Oligo序列文件到此区域来进行上传</p>
                <small style={{color:"gray"}}> (只能 .xlsx/.csv 文件)</small>
            </Dragger>
        </Form.Item>
    )
}