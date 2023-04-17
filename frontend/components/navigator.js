import Link from "next/link";
import {useEffect, useState} from "react";
import {Button, Col, Drawer, Input, Row, Select, Space} from "antd";
import {useRouter} from "next/router";
const { Search } = Input;
const { Option } = Select;

export default function Navigator(){
    const [open, setOpen] = useState(false);
    const [searching, setSearching] = useState(false);
    const router = useRouter()
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const onSearch = (value) => {
        if (value !== ''){
            setSearching(true)
            router.push({
                pathname: `/search/results`,
                query: {
                    idType: idType,
                    species: species,
                    geneName: value
                },
            })
            setSearching(false)
        }
    }

    const navAction = ()=>{
        let url = document.location;
        let navUl = document.querySelector("nav ul");
        let navUlChildren = navUl.children;
        for (let i = 0; i < navUlChildren.length; i++)
        {
            if(String(url).split('/')[3] === navUlChildren[i].id){
                navUlChildren[i].className = "active";
            }else
                delete navUlChildren[i].className;
        }
    }

    useEffect(()=>{
        navAction();
    },[navAction])


    return(
        <nav className="navbar-default navbar-fixed-top">
            <div className="container">
                <div>
                    <Link href="/">
                        <a className="navbar-brand" >
                            RhesusBase
                        </a>
                    </Link>
                </div>
                <ul className={"nav navbar-nav"} >
                    <li id="stellaris" className="nav-item"><Link href="https://spatial.rhesusbase.com"><a className="nav-link">STellaris</a></Link></li>
                    <li id="browser" className="nav-item"><Link href="https://browser.rhesusbase.com"><a className="nav-link">Genome Browser</a></Link></li>
                    <li id="molEvo" className="nav-item"><Link href="/molEvo"><a className="nav-link">Molecular Evolution</a></Link></li>
                    <li id="popGateway" className="nav-item"><Link href="/popGateway"><a className="nav-link">Population Genetics</a></Link></li>
                    {//<li id="drugDis" className="nav-item"><Link href="/drugDis"><a className="nav-link">Drug Discovery</a></Link></li>
                    }
                    <li id="downloads" className="nav-item"><Link href="/downloads"><a className="nav-link">Downloads</a></Link></li>
                    <li id="help" className="nav-item"><Link href="/help"><a className="nav-link">Help</a></Link></li>
                    <li id="contact" className="nav-item"><Link href="/contact"><a className="nav-link" >Contact</a></Link></li>
                </ul>
                <div style={{float:"right",padding: '25px'}}>
                    {
                        open ?
                            <Button onClick={onClose} ghost>
                                Close
                            </Button>:
                            <Button onClick={showDrawer} ghost>
                                Search
                            </Button>
                        }
                    <Drawer
                        title="Basic Drawer" placement="top" onClose={onClose} open={open}
                        rootClassName={"search-drawer"}
                        height={250}
                        bodyStyle={{backgroundColor:"#2c4806",paddingTop:80}}
                    >
                        <Input.Group compact>
                            <Row style={{width:"100%",minWidth:1400,zIndex:1000,textAlign:"center"}}>
                                <Space>
                                    <Col>
                                        <Select defaultValue="All" style={{width:'200px'}} size={"large"}>
                                            <Option value="All">All</Option>
                                            <Option value="Human">Human</Option>
                                            <Option value="Mouse">Mouse</Option>
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Select defaultValue="Symbol" style={{width:'200px'}} size={"large"}>
                                            <Option value="Symbol">Symbol</Option>
                                            <Option value="Ensembl">Ensembl ID</Option>
                                            <Option value="Entrez">Entrez ID</Option>
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Search
                                            placeholder="Search for a gene of interest"
                                            enterButton="Search"
                                            allowClear
                                            onSearch={onSearch}
                                            size={"large"}
                                            style={{
                                                width: "900px",
                                            }}
                                            loading={searching}
                                        />
                                    </Col>
                                </Space>
                            </Row>
                        </Input.Group>
                    </Drawer>
                </div>
            </div>
        </nav>
    )
}