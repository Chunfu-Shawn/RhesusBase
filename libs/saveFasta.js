import fs from "fs"
import {annotationLogger} from "./logSave.js";

export function saveFasta(rid, fasta, resultPath) {
    try {
        const fastaFilePath = resultPath + `/subject.fasta`
        fs.writeFileSync(fastaFilePath, fasta,
            {flag: "w"},
        );
        return fastaFilePath
    } catch(err) {
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: Error of writing fasta file: ${err}`)
    }
}