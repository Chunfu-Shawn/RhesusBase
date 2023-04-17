import Head from 'next/head'
import LayoutCustom, {Context, siteTitle} from '../components/LayoutCustom.js'
import MainPage from "../components/mainpage.js";
import {useContext} from "react";


export default function Home() {
    const context = useContext(Context);
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+": A knowledgebase for the monkey research community"}</title>
            </Head>
            <div id="home" className={"mainbody"}>
                <MainPage></MainPage>
            </div>
        </LayoutCustom>
    )
}