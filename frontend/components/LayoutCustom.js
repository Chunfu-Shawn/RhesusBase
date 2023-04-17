import Head from 'next/head'
import Navigator from "./navigator.js";
import FooterCustom from "./footer.js";
import FooterCustomWithMap from "./footerWithMap.js";
import {ConfigProvider, FloatButton} from "antd";
import React, {useEffect, useState} from "react";

export const siteTitle = "RhesusBase"
export const Context = React.createContext({});

export default function LayoutCustom({ children }) {
    const [username,setUsername] = useState(null)
    const fetchUser = async () => {
        fetch("/api/user/")
            .then(res => res.json())
            .then(json => setUsername(json.username))
    }
    useEffect( ()=>{
        fetchUser()
    },[])

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#3f6600',
                },
            }}
        >
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=1440,height=1000,user-scalable=yes"/>
                <meta name="og:title" content='Welcome to RhesusBase!' />
            </Head>
            <FloatButton.BackTop duration={100} visibilityHeight={1000} style={{right:60}}></FloatButton.BackTop>
            <Context.Provider
                value={
                    {
                        username: username,
                    }
                }
            >
                <Navigator></Navigator>
                {children}
            </Context.Provider>
            <div style={{flexGrow:1}}></div>
            {
                children[1].props.id === "home" ?
                    <FooterCustomWithMap> </FooterCustomWithMap>
                    :<FooterCustom> </FooterCustom>
            }
        </ConfigProvider>
    )
}
