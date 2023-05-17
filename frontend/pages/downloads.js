import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import React from "react";
import {Divider, Tree} from 'antd';
const { DirectoryTree } = Tree;


export default function Contact() {
    const treeFiles = [
        {
            title: 'parent 0',
            key: '0-0',
            children: [
                {
                    title: 'leaf 0-0',
                    key: '0-0-0',
                    isLeaf: true,
                },
                {
                    title: 'leaf 0-1',
                    key: '0-0-1',
                    isLeaf: true,
                },
            ],
        },
        {
            title: 'parent 1',
            key: '0-1',
            children: [
                {
                    title: 'leaf 1-0',
                    key: '0-1-0',
                    isLeaf: true,
                },
                {
                    title: 'leaf 1-1',
                    key: '0-1-1',
                    isLeaf: true,
                },
            ],
        },
    ];

    const onSelect = (keys, info) => {
        console.log('Trigger Select', keys, info);
    };
    const onExpand = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    return (
        <LayoutCustom>
            <Head>
                <title>{siteTitle+"| Contact"}</title>
            </Head>
            <div className="modal-body-stw" style={{textAlign: "left"}}>
                <header className="page-header">
                    <h1>File downloads</h1>
                </header>
                <Divider></Divider>
                <DirectoryTree
                    multiple
                    defaultExpandAll
                    onSelect={onSelect}
                    onExpand={onExpand}
                    treeData={treeFiles}
                />
            </div>
        </LayoutCustom>
    )
}