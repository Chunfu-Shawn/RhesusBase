import rfs from "rotating-file-stream" // version 2.x

//add 0 before month
export const pad = num => (num > 9 ? "" : "0") + num;

//generate the file path depended on date
const generator = (nowTime) => {
    if (!nowTime || process.env.ID !== '1') return "analysis.log";
    let time = new Date(nowTime.getTime() - 1000*60*60*24);
    let yearMonth = time.getFullYear() + "" + pad(time.getMonth() + 1);
    let day = pad(time.getDate());

    return `${yearMonth}/${yearMonth}${day}.log`;
};

const annotationLogStream = rfs.createStream(generator, {
    interval: '1d', // rotate daily
    path: 'logs/analysis/'
})

// 创建注释功能的logger
export const annotationLogger = new console.Console(annotationLogStream);