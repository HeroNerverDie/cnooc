let _this = this
window.clickRowFunc = function(data){
  var userId = JSON.parse(localStorage.getItem('PAI-account')).userId;
  var procInstId = data.procInstId;
  var urlDiv = '<div>变更编号:</div>'
  var url = ''
	_this.$request({
	  url: 'user-service/api/form/endpoint',
	  method: 'POST',
	  data: {
			procInstId: procInstId,
			userId: userId
	  }
	}).then(res => {
	  if (res && res.responseCode === '100') {
			if (res.selectedTranModel && res.selectedTranModel === 'vue') {
			  url = "/PAI/newui/index.html?cls=" + res.url + "&procInstId=" + procInstId + "&userId=" + userId;
			} else {
			  url = "/form/index.html?procInstId=" + procInstId;
			}
			urlDiv = `<div>变更编号:<a href="${url}" target="_blank" style="color:blue;margin-left:46px;text-decoration: underline">${data.mocNumber}</a></div>`
			debugger
		  _this.$refs.label1.setValue(urlDiv);
		  _this.$refs.textbox6.setValue(data.mocType);
		  _this.$refs.textbox7.setValue(data.implementationTargetDate);
		  _this.$refs.choosebox1.setValue({label:data.authorizedTechnologist,value:data.authorizedTechnologistId});
      // 赋值url
      _this.$store.getters.nebulogyForm.nebulogyForm.mocImplementationRequestBasicInfo.resumeFormViewUrl = url;
      // 赋值是否自动发起
      _this.$store.getters.nebulogyForm.nebulogyForm.mocImplementationRequestBasicInfo.isMocAutoLaunch = false;
      _this.$store.getters.nebulogyForm.nebulogyForm.isMocAutoLaunch = false;
  		_this.$refs.window1.hide();
      // 根据需求隐藏组件
      if (_this.getView() == 'launch') {
        let value = data.mocType;
        if(value == "MSMRMOC" || value == "LSMOC"){
          //操作代表
          _this.$refs.choosebox2.hide();
          //实施确认字段
          _this.$refs.choosebox1.show();
          _this.$refs.choosebox1.setDisabled(false);
          //现场验证检查表
          _this.$refs.sectioncols16.hide();
        }
        if(value == "TMOC" || value == "PMOC"){
          _this.$refs.choosebox2.show();
          _this.$refs.choosebox1.hide();
          // 现场验证检查表 查询表数据
          _this.$refs.sectioncols16.show();
          var fieldVerificationChecklist = [];
           _this.$request({
              url: 'pai-core-maindata/api/last/mocAssessment/customQuery',
              method: 'POST',
              data: {
                  fields: [{ name: 'assessmentContent_en' },{ name: 'assessmentContent_zh' },{ name: 'orders' }],
                  filter: " assessmentType='Field Verification Checklist'  and is_del=0 "
              }
          }).then((json) => {
              if (json.data.length > 0) {
                  json.data.forEach(item => {
                      var info={};
                      info.content=item.assessmentContent_en+item.assessmentContent_zh;
                      info.serialNumber=item.orders;
                      info.selectResult="";
                      fieldVerificationChecklist.push(info);
                  });
                  _this.$refs.datagrid1.setValue(fieldVerificationChecklist);
              }
          }).catch((err) => {
              console.log(err)
          })
        }
      }else{
        window.showComp();
      }
		  
	  }
	}).catch(err => {
	  console.log(err)
	})
}

// 当弹出框表格没有数据隐藏确认取消按钮
this.$refs.window1.loading = true;
let currentDate = new Date();
let year = currentDate.getFullYear();  
let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以要加1  
let day = String(currentDate.getDate()).padStart(2, '0');  
let targetDate = `${year}-${month}-${day}`; 
this.$request({
    url: 'zhqp-external-rest/api/MOCProcessReviewQuery',
    method: 'post',
    data: {
      search: '',
      targetDate: targetDate
    }
  }).then(res => {
  this.$refs.window1.loading = false;
  this.$refs.datagrid3.setValue(res.queryList)
}).catch(err => {
  this.$refs.window1.loading = false;
  throw err;
})
    
    
    
    
    
<div style="color:red;">I confirm that the field verification check list is complete in accordance with the scope of work and standards specified in this plant change. lt can be handed over to operating team.</div>
    
    
    
    <div style="color:red;">I receive the MOC from executive party and l confirm that the checklist for readiness review of this MOC is complete it is ready to be put into service.</div>   
    
    






// 现场确认表
_this.$request({
  url: 'user-service/api/formActivity/currentProcInst',
  method: 'post',
  data: {
    destInstId: _this.getUrlData('destInstId') || '',
    procInstId: _this.getUrlData('procInstId') || ''
  }
}).then(response => {
  if (response.currentActivitys != null && response.currentActivitys.length > 0 && response.responseCode === '100') {
    window.currentNode = response.currentActivitys[0].displayName.zh_CN;
    if((window.currentNode == "030_Work Party Reinstate" || window.currentNode == '040_Reinstate Confirm') && mocType == 'TMOC'){
      return false;
    }
}  
}).catch(error => {
  throw error;
});