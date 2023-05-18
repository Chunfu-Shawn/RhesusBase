import Head from 'next/head'
import LayoutCustom, { siteTitle } from '../components/LayoutCustom.js'
import React from "react";
import { Collapse } from 'antd';
const { Panel } = Collapse;
import {Divider} from 'antd';
import {CaretRightOutlined} from "@ant-design/icons";

const panelStyle = {
    marginBottom: 24,
    border: 'none',
};

export default function Downloads() {
    const text = (
        <p
            style={{
                paddingLeft: 24,
            }}
        >
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
            as a welcome guest in many households across the world.
        </p>
    );

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
                <Collapse
                    size={"large"}
                    bordered={false}
                    defaultActiveKey={['1']}
                    expandIcon={({ isActive }) =>
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                    style={{}}
                >
                    <Panel header={<span style={{fontSize:20, fontWeight:"450"}}>1K Monkey Genomes Files:</span>} key="1" style={panelStyle}>
                        <ol>
                            <li><a href="/download/1kmg/population_duplication_2383.rheMac10.txt" download>population_duplication_2383.rheMac10.txt</a></li>
                            <li><a href="/download/1kmg/population_deletion_17267.rheMac10.txt" download>population_deletion_17267.rheMac10.txt</a></li>
                            <li><a href="/download/1kmg/population_inversion_1335.rheMac10.txt" download>population_inversion_1335.rheMac10.txt</a></li>
                            <li><a href="/download/1kmg/population_duplication_2383.rheMac10Plus.txt" download>population_duplication_2383.rheMac10Plus.txt</a></li>
                            <li><a href="/download/1kmg/population_deletion_17267.rheMac10Plus.txt" download>population_deletion_17267.rheMac10Plus.txt</a></li>
                            <li><a href="/download/1kmg/population_inversion_1335.rheMac10Plus.txt" download>population_inversion_1335.rheMac10Plus.txt</a></li>
                            <li><a href="/download/1kmg/rheMac10_572rhe_remove254,401SNVs.vcf.gz" download>
                                rheMac10_572rhe_remove254,401SNVs.vcf.gz</a></li>
                            <li><a href="/download/1kmg/rheMac10_572rhe.vcf.gz" download>
                                rheMac10_572rhe.vcf.gz</a></li>
                            <li><a href="/download/1kmg/rheMac10Plus_572rhe_remove254,401SNVs.vcf.gz" download>
                                rheMac10Plus_572rhe_remove254,401SNVs.vcf.gz</a></li>
                            <li><a href="/download/1kmg/rheMac10Plus_572rhe.vcf.gz" download>
                                rheMac10Plus_572rhe.vcf.gz</a></li>
                            <li><a href="/download/1kmg/rheMac10Plus.fa" download>rheMac10Plus.fa</a></li>
                        </ol>
                    </Panel>
                    <Panel header={<span style={{fontSize:20, fontWeight:"450"}}>Others Files:</span>} key="2" style={panelStyle}>
                        <ol>
                            <li><a href="/download/basicInfo/rb2Gene.gpe">RB2 Gene Models</a> in <a href="http://rhesusbase.com/FAQ/FAQformat.html#format9">gpe format</a></li>
                            <li><a href="/download/basicInfo/rb2NTR.bed12">RB2 NTRs</a> in <a href="http://rhesusbase.com/FAQ/FAQformat.html#format1">bed format</a></li>
                            <li>RB1 Gene Models (<a href="/download/basicInfo/rb1Gene.gpe">gpe</a>,
                                <a href="/download/basicInfo/rb1Gene.bed">bed</a>,
                                <a href="/download/basicInfo/rb1Gene.gtf">gtf</a> and
                                <a href="/download/basicInfo/rb1Gene.gff3">gff3</a>)
                            </li>
                            <li><a href="/download/basicInfo/rb1Trans2ensTrans.tsv">Transcript ID Mapping between RB1 and Ensembl</a></li>
                            <li><a href="/download/basicInfo/entrezID2ensID.tsv">ID Mapping between Entrez and Ensembl</a></li>
                            <li><a href="/download/basicInfo/rb2GeneInfo.tsv">RB2 Gene (Gene Page) Information</a></li>
                            <li><a href="/download/basicInfo/entrezR2H.tsv">Entrez ID mapping between Rhesus Macaque and Human</a></li>
                            <li><a href="/download/basicInfo/refSeqRNASeq.fa">RefSeq RNA Sequences</a></li>
                            <li><a href="/download/basicInfo/refSeqProteinSeq.fa">RefSeq Protein Sequences</a></li>
                            <li>RNA Sequences based <a href="/download/basicInfo/rb2GeneSeq.fa">RB2 Genes</a>, <a href="/download/basicInfo/rb1Gene.fa">RB1 Genes</a> and
                                <a href="/download/basicInfo/ensGeneSeq.fa">Ensembl Genes</a>
                            </li>
                            <li><a href="/download/variation/0605151.bed6+">SNPs identified by RhesusBase Genome-seq data (version 1)</a></li>
                            <li><a href="/download/gateway/GPCR/GPCR.tsv">GPCR list</a></li>
                            <li><a href="/download/gateway/CAM/CAM.tsv">Cell Adhesion Molecules (CAMs)</a> and
                                <a href="/download/gateway/CAM/CAMO.tsv">Ontology</a></li>
                            <li><a href="/download/gateway/SP/SP.tsv">Secretory Proteins list</a></li>
                            <li><a href="/download/expression/human.tsv">Expression of Human Gene</a></li>
                            <li><a href="/download/expression/monkey.tsv">Expression of Rhesus Macaque Gene</a></li>
                            <li><a href="/download/expression/mouse.tsv">Expression of Mouse Gene</a></li>
                            <li><a href="/download/popGateway/thetaPi_human.tsv">Population Genetics Parameters of Human Transcripts</a></li>
                            <li><a href="/download/popGateway/thetaPi_rhesus.tsv">Population Genetics Parameters of Rhesus Macaque Transcripts</a></li>
                            <li><a href="/download/popGateway/thetaPi_rhesus.noncoding.tsv">Population Genetics Parameters of Rhesus Macaque Codon-based Transcripts</a></li>
                            <li><a href="/download/popGateway/mktest.tsv">The McDonald–Kreitman test of Human Transcripts</a></li>
                            <li><a href="/download/popGateway/popSRA.jsp">Whole genome sequencing data</a></li>
                            <li><a href="/download/popGateway/RBCoverage.wig">The coverage of whole genome sequencing data</a></li>
                            <li><a href="/download/popGateway/RBSNP.vcf.gz">SNPs identified by RhesusBase Genome-seq data (version 2)</a></li>
                            <li><a href="/download/isoseq_human.fq">Iso-seq sequence of human</a></li>
                            <li><a href="/download/isoseq_macaque1.fq">Iso-seq sequence rhesus macaque 1</a></li>
                            <li><a href="/download/isoseq_macaque2.fq">Iso-seq sequence rhesus macaque 2</a></li>
                            <li><a href="/download/monkeyGene/monkeyGene.allGeneModels.addNonCoverageEnsembl.rheMac8.gpe">All newly-defined macaque gene models and Ensembl genes not covered by our Iso-seq data</a></li>
                            <li><a href="/download/monkeyGene/monkeyGene.allGeneModels.rheMac8.gpe">All newly-defined macaque gene models</a></li>
                            <li><a href="/download/monkeyGene/monkeyGene.HighQualityGeneModels.rheMac8.gpe">High-quality (The whole isoform is supported by both Iso-seq reads and RNA-seq spliced reads) newly-defined macaque gene models</a></li>
                        </ol>
                    </Panel>
                </Collapse>
            </div>
        </LayoutCustom>
    )
}