export default class CommonService {

    static host = 'http://www.atyorku.ca';

    /**
     * 翻译专业-入学时间-年级
     * @param value
     * @param suffix
     * @returns {*}
     */
    static pipeOfUserInfo(value, suffix) {
        if (value === null || value === "" || value === " ") {
            return '未知' + suffix;
        } else {
            return value;
        }
    }

    /**
     * 入学时间 - 翻译时间戳
     * @param value
     * @returns {*}
     */
    static pipeOfUserEnrolmentYear(value) {
        if (value === 0) {
            return "";
        } else {
            value *= 1000;
            let date = new Date(value);
            return date.getFullYear() + "级";
        }
    }

    /**
     * Gender translator
     * @param value
     * @returns {*}
     */
    static pipeOfUserGender(value) {
        switch (value) {
            case "0":
                return "女";
            case "1":
                return "男";
            default:
                return "不明";
        }
    }

    /**
     * upload file with optional data
     * @param url:string
     * @param filePostName:string  - file form name
     * @param imgData:string - img url
     * @param optionalData:any
     * @param progressCallback
     * @param resolveCallback
     * @param rejectCallback
     */
    static uploadFile(url, filePostName, imgData, optionalData, progressCallback, resolveCallback, rejectCallback) {

        let formData = new FormData();
        if((filePostName!==false && filePostName!==null) && (imgData!==false && imgData!==null)){
            let file = {uri: imgData, type: 'image/jpeg', name: 'image.jpg'};
            formData.append(filePostName, file);
        }

        if(optionalData!==false){
            for(let prop in optionalData){
                formData.append(prop, optionalData[prop]);
            }
        }

        let oReq = new XMLHttpRequest();

        if(progressCallback){
            oReq.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    progressCallback(Math.floor(e.loaded / e.total *100)+"%");
                } else {
                    console.log("无进度");
                }
            }
        }

        oReq.onreadystatechange = (e) => {
            if (oReq.readyState !== 4) {
                return;
            }

            if (oReq.status === 200) {
                try{
                    console.log(oReq.responseText);
                    resolveCallback(JSON.parse(oReq.responseText));
                }catch (e){
                    rejectCallback?rejectCallback():null;
                }
            } else {
                rejectCallback?rejectCallback():null;
            }
        };

        oReq.open("POST", url, true);
        oReq.send(formData);
    }

}

