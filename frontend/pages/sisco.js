import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import {Card} from "antd";
import RunModule from "../components/SISCO/RunModule";
import {validateMessages} from "./login";
import History from "../components/History";

export default function SISCO() {

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+" | SISCO"}</title>
            </Head>
            <div className="modal-body-stw" >
                <div style={{margin:80}}>
                    <h2>siRNA序列转换器<br/>siRNA sequence converter (SISCO)</h2>
                </div>
                <Card style={{padding: "20px 150px"}}>
                    <RunModule validateMessages={validateMessages}/>
                </Card>
                <h3>History</h3>
                <History tool={'sisco'}/>
            </div>
        </LayoutCustom>
    )
}