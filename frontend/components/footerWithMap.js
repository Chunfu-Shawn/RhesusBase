import {MailOutlined} from "@ant-design/icons";
import React, {useEffect, useRef} from "react";
import {Col, Row, Space} from "antd";
import Image from "next/image";

export default function FooterCustom(){
    const mapref = useRef(null)
    useEffect(()=>{
        const script = document.createElement('script')
        const footer = document.getElementsByTagName('footer')[0]
        const div = footer.childNodes[0].childNodes[0];
        script.type = "text/javascript"
        script.id = "clustrmaps"
        script.src = '//cdn.clustrmaps.com/map_v2.js?cl=c2c2c2&w=200&t=tt&d=pFWKfScorEsjTZudFya03NVJkcNZTbppy-wYO6mFlEw&cmn=19a500&co=254000&cmo=e21f1f'
        div.appendChild(script)
    },[])
    return(
        <footer className="modal-footer" style={{width:"100%",minWidth:1440,zIndex:1000}}>
            <Row justify="center" >
                <Col>
                </Col>
                <Col style={{textAlign:"left",margin:10}}>
                    <Row gutter={[0, 0]} style={{width:400}}>
                        <Col span={24}>
                            <Space>
                                <a href="https://english.pku.edu.cn" target="_blank" rel="noreferrer">
                                    <img src={"/images/index/logo-pku.png"} width={150} height={40} draggable="false" alt={'logo-pku.png'}/>
                                </a>
                                <a href="https://future.pku.edu.cn/en" target="_blank" rel="noreferrer">
                                    <img src={"/images/index/logo-cft.png"} width={110} height={40} draggable="false" alt={'logo-cft.png'}/>
                                </a>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <p>Copyright &copy; 2021-{String(new Date().getFullYear())}.
                                <a href="https://future.pku.edu.cn/en" target="_blank" rel="noreferrer"> College of Future Technology (CFT), </a>
                                <a href="https://english.pku.edu.cn" target="_blank" rel="noreferrer"> Peking University. </a>
                                All Rights Reserved.
                            </p>
                        </Col>
                        <Col span={24}>
                            E-mail:<span> </span>
                            <a target="_blank"  href="mailto:xiaochunfu@stu.pku.edu.cn" rel="noreferrer">
                                <MailOutlined />.
                            </a><span>  </span>
                            <a href="https://beian.miit.gov.cn/integrated/recordquery#/Integrated/recordQuery" target="_blank" id="beian" rel="noreferrer">
                                苏ICP备2021011214号-1</a>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </footer>
    )
}