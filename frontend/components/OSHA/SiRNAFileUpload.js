import {Form, message, Upload} from "antd";
import {FileExcelOutlined} from "@ant-design/icons";
const { Dragger } = Upload;

export const settingSiRNAFile = function (props) {
    return {
        name: 'siRNAFile',
        required: true,
        beforeUpload: (file) => {
            let filenameArr = file.name.split('.');
            props.setFileList([file]);
            let limitM = 50; //MB
            let isXlsx = filenameArr[filenameArr.length - 1] === 'xlsx' ||
                filenameArr[filenameArr.length - 1] === 'csv' ||
                filenameArr[filenameArr.length - 1] === 'tsv' ||
                filenameArr[filenameArr.length - 1] === 'txt';
            let isLimit = file.size / 1024 / 1024 <= limitM;
            if (!isXlsx) {
                props.setFileList([])
                message.error({
                    content: `File: ${file.name} is not a readable file`,
                    style: {
                        marginTop: '12vh',
                    },
                    duration: 3,
                });
            }
            if (!isLimit) {
                props.setFileList([])
                message.error({
                    content: `File: ${file.name} exceeds the limit: 50 MB`,
                    style: {
                        marginTop: '12vh',
                    },
                    duration: 3,
                });
            }
            return false
        },
        onRemove: (file) => {
            const index = props.fileList.indexOf(file);
            const newFileList = props.fileList.slice();
            newFileList.splice(index, 1);
            props.setFileList(newFileList);
        },
        fileList: props.fileList.slice(-1),//保留最后一个文件
    };
}

export default function SiRNAFileUpload(props){

    return(
        <Form.Item name="siRNAFile" label="siRNA文件"
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
                <p className="ant-upload-text">点击或者拖拽siRNA文件到此区域来进行上传</p>
                <small style={{color:"gray"}}> (只能 .xlsx/.csv 文件)</small>
            </Dragger>
        </Form.Item>
    )
}