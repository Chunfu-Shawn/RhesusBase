import Link from "next/link";
import {useEffect} from "react";

export default function Navigator(){

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
            </div>
        </nav>
    )
}