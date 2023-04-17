import child_process from 'child_process';
import {setJobStatus} from "./record/setJobStatus.js";
import {annotationLogger} from "./logSave.js";
import {setJobTime} from "./record/setJobTime.js";

export async function execScripts(rid, script, resultPath) {

    let runScript = "source /home/user/BGM/uplee/anaconda3/bin/activate siRNA_webserver;" +
        script +
        " >"+ resultPath + "/log/analysis.log"+
        " 2>&1"
    console.log(runScript)

    // 执行注释脚本
    try {
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: analysis running...`)
        // 改变任务状态为running，设置任务开始时间
        await setJobStatus(rid,"running")
        await setJobTime(rid, "start_time")
        let process = child_process.exec(runScript)
        // 监听annoProcess任务的exit事件，如果发生则调用listener
        process.on('exit', function (code) {
            annotationLogger.log(`${rid} [${new Date().toLocaleString()}]: child process has exited，exit code: ${code}`)
            if (code === 0) {
                setJobStatus(rid, "finished")
            }
            else {
                setJobStatus(rid,"error")
            }
            setJobTime(rid, "finish_time")
        });
    } catch (err) {
        annotationLogger.log(`${rid} [${new Date().toLocaleString()}] Error: failed to execute the script: ${err}`)
    }
}