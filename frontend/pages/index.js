import Head from 'next/head'
import LayoutCustom, {siteTitle} from '../components/LayoutCustom.js'
import MainPage from "../components/mainpage.js";
import {useContext} from "react";


export default function Home() {
    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+": A knowledge base for the monkey research community"}</title>
            </Head>
            <div id="home" className={"mainbody"}>
                <MainPage></MainPage>
            </div>
        </LayoutCustom>
    )
}