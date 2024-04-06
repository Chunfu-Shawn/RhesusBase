import fs from "fs"

export async function getDenovoGeneCorrespondingTable(){
    return new Promise(async (resolve, reject) => {
        let denovoGeneCorrespondingTable

        try {
            denovoGeneCorrespondingTable = fs.readFileSync(
                './frontend/public/denovo/74_denovo_genes.hg19_hg38.denovo_status.json', 'utf8');
        } catch (e) {
            reject(e)
            denovoGeneCorrespondingTable=null
        }
        resolve(denovoGeneCorrespondingTable)
    })
}