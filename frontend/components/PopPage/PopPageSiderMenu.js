import React from "react";
import {SiderMenu} from "../SiderMenu.js";


const itemsSV = [
    {
        label: <a href={'#Summary'}>Summary</a>,
        key: 'Summary'
    },
    {
        label: <a href={'#Macaque'}>Macaque population Genetics</a>,
        key: 'Macaque'
    },
    {
        label: <a href={'#Human'}>Human population Genetics</a>,
        key: 'Human'
    },
    {
        label: <a href={'#MK'}>McDonald-Kreitman Test</a>, key: 'Download'
    }
]


export default function PopPageSiderMenu(props){
    return(
        <SiderMenu items = {itemsSV}
                   width={200}
                   openKeys = {["Spatial Expression","Features"]}
                   defaultAcitiveNav={"Summary"}
                   divContent={props.divContent}
        />
    )
}