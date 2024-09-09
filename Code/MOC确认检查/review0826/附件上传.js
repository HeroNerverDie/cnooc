debugger
var fileInfo = this.$refs.fileInfo.getValue();
console.log(fileInfo);
var dgFileList = this.$refs.dgFileList.getValue();
console.log(dgFileList);
if (fileInfo != null && fileInfo.length > 0) {
    var info = {};
    if (this.getView() != 'launch') {
        this.$request({
            url: 'user-service/api/formActivity/currentProcInst',
            method: 'POST',
            data: {
                "destInstId": this.getUrlData('destInstId'),
                "procInstId": ""
            }
        }).then((json) => {
			    let fileName = fileInfo[0].fileName;  
				  let parts = fileName.split('.');  
				  let result = parts.shift();
            info.nodeId = json.currentActivitys[0].activityId;
            info.nodeName = json.currentActivitys[0].displayName;
            info.fileName = result;
		  		  info.fileType = fileInfo[0].type;
            info.fileId = fileInfo[0].id;
            info.uploadDate = fileInfo[0].date;
            info.employeeId =this.getAccount().employee.id;
            info.employeeName = fileInfo[0].name;
            info.remark = "";
            info.fileUrl = fileInfo[0].url;
            info.processCategory = "manualVoucherApproval"
            dgFileList.push(info);
            console.log(dgFileList);
            this.$refs.dgFileList.setValue(dgFileList);
            this.$refs.chooseFileWin.hide();

        }).catch((err) => {
            console.log(err)
        })
    } else {
        let fileName = fileInfo[0].fileName;  
        let parts = fileName.split('.');  
        let result = parts.shift(); // 获取并移除数组的第一个元素
        info.nodeId = "0000";
        info.nodeName = {en:'ProcessStart',zh_CN:"流程开始"};
        info.fileName = result;
	      info.fileType = fileInfo[0].type;
        info.fileId = fileInfo[0].id;
        info.uploadDate = fileInfo[0].date;
        info.employeeId =this.getAccount().employee.id;
        info.employeeName = fileInfo[0].name;
        info.remark = "";
        info.fileUrl = fileInfo[0].url;
        info.processCategory = "mocImplementationRequest"
        dgFileList.push(info);
        console.log(dgFileList);
        this.$refs.dgFileList.setValue(dgFileList);
        this.$refs.chooseFileWin.hide();
    }
}





    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    