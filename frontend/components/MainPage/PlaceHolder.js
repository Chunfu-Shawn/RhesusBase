import Link from "next/link.js";
import {Card, Col} from "antd";
import Image from "next/image";

export default function PlaceHolder(props){
    return(
        <Col span={6}>
            <a href={props.link}>
                <Card
                    cover={<img alt="example" src={`/images/index/${props.pic}`} />}
                    style={{textAlign:"left",height:430}}
                    bodyStyle={{padding:"0px 20px"}}
                >
                    <h3>{props.title}</h3>
                    <p style={{color:"gray"}}>{props.context}</p>
                </Card>
            </a>
        </Col>
    )
}