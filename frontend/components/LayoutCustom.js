import Head from 'next/head'
import Navigator from "./navigator.js";
import FooterCustom from "./footer.js";
import FooterCustomWithMap from "./footerWithMap.js";
import {ConfigProvider, FloatButton} from "antd";
import React from "react";

export const siteTitle = "RhesusBase "

export default function LayoutCustom({ children }) {

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#3f6600',
                    colorLink: '#5b8c00',
                    colorLinkHover: '#3f6600',
                    colorLinkActive: '#3f6600',
                },
            }}
        >
            <Head>
                <link rel="shortcut icon" href="/images/favicon/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon/favicon-16x16.png"/>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=1440,height=1000,user-scalable=yes"/>
                <meta name="og:title" content='Welcome to RhesusBase!' />
            </Head>
            <FloatButton.BackTop duration={100} visibilityHeight={1000} style={{right:60}}></FloatButton.BackTop>
            <Navigator></Navigator>
            {children}
            <div style={{flexGrow:1}}></div>
            {
                children[1].props.id === "home" ?
                    <FooterCustomWithMap> </FooterCustomWithMap>
                    :<FooterCustom> </FooterCustom>
            }
        </ConfigProvider>
    )
}
