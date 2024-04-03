import fs from "fs"

export async function getDenovoGeneCorrespondingTable(){
    return new Promise(async (resolve, reject) => {
        let denovoGeneCorrespondingTable

        try {
            denovoGeneCorrespondingTable = fs.readFileSync(
                '/home/user/data3/rbase/public_resource/data/files/gene_corresponding_table.json', 'utf8');
        } catch (e) {
            reject(e)
            denovoGeneCorrespondingTable=null
        }
        resolve(denovoGeneCorrespondingTable)
    })
}