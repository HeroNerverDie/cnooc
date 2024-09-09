debugger
var _this = this;
window.lang = localStorage.getItem('lang');
window.currentNode = 'Start';
var emp = this.getAccount().employee;
var mocImplementationRequestBasicInfo = this.$store.getters.nebulogyForm.nebulogyForm.mocImplementationRequestBasicInfo;
mocImplementationRequestBasicInfo.folio = this.$store.getters.nebulogyForm.nebulogyForm.formInfo.folio;
if (this.getView() == 'launch' && (this.getUrlData('draftId') == null || this.getUrlData('draftId') === '')) {
  // 申请人
    var empName = emp.employeeName ? emp.employeeName : "";
    this.$refs.applicantName.setValue({ value: emp.id, label: empName });
  mocImplementationRequestBasicInfo._applicantName = empName;
    //流水号
    this.$refs.folio.setValue(window.lang == 'zh-CN' ? '自动生成' : 'Auto Create');
}
//根据人员id获取该人员的组织名称全路径
window.getDeptByEmployeeId = function (id) {
    _this.$request({
        url: 'user-service/api/ObjectQuery',
        method: 'post',
        data: {
            sqlParam: { "@empId": id },
            registryCenterId: "077e3756-f55f-416e-be82-a93d959d349a"
        }
    }).then(response => {
        if (response.result && response.result.length > 0 && response.responseCode === '100') {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocImplementationRequestBasicInfo.applicantDeptName = response.result[0].deptNamePath;
        } else {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocImplementationRequestBasicInfo.applicantDeptName = "";
        }
    }).catch(error => {
        throw error;
    });
}
//选人控件，赋值显示值（用于结构化）
window.setDisplayName = function () {
  var _mocImplementationRequestBasicInfo = _this.$store.getters.nebulogyForm.nebulogyForm.mocImplementationRequestBasicInfo;
  debugger
  //Cc显示名
  if (_mocImplementationRequestBasicInfo.cc != "" && _this.$refs.choosebox3) { customKey.formInfo.ccDisplayName = _this.$refs.choosebox3.displayValue; }

  //操作代表显示名
  if (_mocImplementationRequestBasicInfo.operatingNominee != "" && _this.$refs.choosebox2) { customKey.formInfo.operatingNominee = _this.$refs.choosebox2.displayValue; }
  //实施确认显示名
  if (_mocImplementationRequestBasicInfo.implementationConfirm != "" && _this.$refs.choosebox1) { customKey.formInfo.implementationConfirm = _this.$refs.choosebox2.displayValue; }

  if (_this.$refs.applicantName) { customKey.formInfo.requestor = _this.$refs.applicantName.displayValue; }
}

//获取当前“确认项目”
window.getMOCConfirmItems = function () {
  _this.$request({
  url: 'pai-core-maindata/api/last/mocConfirmItems/page',
  method: 'post',
  data: {
      fields: [
          { name: "information_en" },
          { name: "information_zh" },
      ],
      filter: "",
  },
}).then(response => {
var _mocConfirmItemsList = "";
if (response.mocConfirmItemsList.length > 0 && response.responseCode === '100') {
  debugger
      //打印模版使用
      if (window.currentNode == '010_Applicant confirmation' || window.currentNode == 'Start') {
        _mocConfirmItemsList = response.mocConfirmItemsList.filter(p => p.workflowType == "MOC Implementation Workflow" &&
            p.mocType == 'Implementation' &&
            p.activety == 'Start');
      } else {
        _mocConfirmItemsList = response.mocConfirmItemsList.filter(p => p.workflowType == "MOC Implementation Workflow" &&
          p.mocType == 'Implementation' &&
          p.activety == window.currentNode);
      }

      var _information;
      if (lang == 'zh-CN') {
          _information = _mocConfirmItemsList[0].information_zh;
      } else {
          _information = _mocConfirmItemsList[0].information_en;
      }
      if (_this.getView() !== 'view') {
        _this.$refs.isMOCConfirmItems.propertyAttr.dataSource.options = [{ "label": _information, "value": "0" }];
      }
      window.customKey = { formTitle: { formTitleCn: "MOC确认检查流程", formTitleEn: "MOC Implementation Request"}, formInfo:{currentNode: window.currentNode, ccDisplayName:'', requestor:'', operatingNominee:'', implementationConfirm:''} }
      window.setDisplayName();
    }
  }).catch(error => {
    throw error;
  });
}



//页面都需要获取展示提示语；
window.getMOCConfirmItems();
// 获取跳转链接
window.setMocNumber = function (mocNumber,url) {
  var urlDiv ='';
  if (lang == 'zh-CN') {
    urlDiv = `<div>变更编号:<a href="${url}" target="_blank" style="color:blue;margin-left:46px;text-decoration: underline">${mocNumber}</a></div>`
  } else {
    urlDiv = `<div>Moc Number:<a href="${url}" target="_blank" style="color:blue;margin-left:46px;text-decoration: underline">${mocNumber}</a></div>`
  }
  _this.$refs.label1.setValue(urlDiv);
}


// 初始化获取申请人信息
if (this.getView() == 'launch') {
  //获取申请人信息
  var employeeName = emp.employeeName ? emp.employeeName : "";
  this.$refs.applicantName.setValue({ value: emp.id, label: employeeName });

  var d = new Date();
  var dateStr = (d.getFullYear()) + "/" + (d.getMonth() + 1) + "/" + d.getDate() + '' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  this.$refs.applyDate.setValue(dateStr);

  //获取人员全路径
  window.getDeptByEmployeeId(emp.id);
}


// 审批页面 获取表格数据
if (this.getView() !== "launch") {
  window.mocType = this.$store.getters.nebulogyForm.nebulogyForm.mocImplementationRequestBasicInfo.mocType
  if (this.$store.getters.nebulogyForm.nebulogyForm.mocReadinessReviewChecklist.length == 0) {
    var readinessReviewChecklist = [];
    this.$request({
        url: 'pai-core-maindata/api/last/mocAssessment/customQuery',
        method: 'POST',
        data: {
            fields: [{ name: 'assessmentContent_en' },{ name: 'assessmentContent_zh' },{ name: 'orders' }],
            filter: " assessmentType='Readiness Review Checklist'  and is_del=0 "
        }
    }).then((json) => {
        if (json.data.length > 0) {
            json.data.forEach(item => {
                var info={};
                info.content=item.assessmentContent_en+item.assessmentContent_zh;
                info.serialNumber=item.orders;
                info.selectResult="";
                readinessReviewChecklist.push(info);
            });
            this.$refs.datagrid2.setValue(readinessReviewChecklist);
        }
    }).catch((err) => {
        console.log(err)
    })
  }
  if (this.$store.getters.nebulogyForm.nebulogyForm.mocFieldVerificationChecklist.length == 0) { 
    var fieldVerificationChecklist = [];
    this.$request({
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
            this.$refs.datagrid1.setValue(fieldVerificationChecklist);
        }
    }).catch((err) => {
        console.log(err)
    })
  }
 }



// 控制页面不同节点显示隐藏
window.showComp = function () {
   debugger
  //MOC Type = MSMRMOC 与 MOC Type = PMOC Implementation Confirm：只读
  //MOC Type = TMOC || LSMOC  Implementation Confirm：隐藏
  //010节点：Readiness done date：隐藏
  //020节点 ：Readiness done date：带出值，可编辑
  //030、040节点：Readiness done date：只读
  var mocType = _this.$refs.textbox6.getValue();
  if (mocType == 'TMOC' || mocType == 'LSMOC') {
    _this.$refs.choosebox1.hide();
    // 010节点：可编辑
    if (window.currentNode == "010_Applicant confirmation") {
      _this.$refs.choosebox2.show();
      _this.$refs.choosebox2.setDisabled(false);
      //就绪日期
      _this.$refs.datetime1.hide();
      //到期日期
      _this.$refs.datetime2.hide();
      //投用日期
      _this.$refs.datetime3.hide();
      // TMOC恢复日期
      _this.$refs.datetime4.hide();
      // 附件上传
      _this.$refs.btnUpload.show();
    }
    if (window.currentNode == "020_Readiness Review") {
      // 操作代表
      _this.$refs.choosebox2.show();
      _this.$refs.choosebox2.setDisabled(true);
      //就绪日期
      _this.$refs.datetime1.show();
      _this.$refs.datetime1.setDisabled(false);
      _this.$refs.datetime1.pickerOptions.disabledDate = function(e) {
        let today = new Date();
       today.setDate(today.getDate() - 1); 
       return e < today;
     }
      //到期日期
      _this.$refs.datetime2.show();
      _this.$refs.datetime2.setDisabled(false);
      //投用日期
      _this.$refs.datetime3.setDisabled(false);
      // TMOC恢复日期
      _this.$refs.datetime4.hide();
      // 附件上传
      _this.$refs.btnUpload.show();
    }
    if (window.currentNode == "030_Work Party Reinstate") {
      // 操作代表
      _this.$refs.choosebox2.show();
      _this.$refs.choosebox2.setDisabled(true);
      //就绪日期
      _this.$refs.datetime1.show();
      _this.$refs.datetime1.setDisabled(true);
      //到期日期
      _this.$refs.datetime2.show();
      _this.$refs.datetime2.setDisabled(true);
      // 投用日期
      _this.$refs.datetime3.show();
      _this.$refs.datetime3.setDisabled(true);
      // TMOC恢复日期 必填
      _this.$refs.datetime4.show();
      _this.$refs.datetime4.setDisabled(false);
      // 现场验证检查表
      _this.$refs.sectioncols16.show();
      _this.$refs.datagrid1.setDisabled(true);
      // 准备就绪审查清单
      _this.$refs.sectioncols17.show();
      _this.$refs.datagrid2.setDisabled(true);
      // 附件上传
      _this.$refs.btnUpload.show();
    }
    if (window.currentNode == "040_Reinstate Confirm") {
      // 操作代表
      _this.$refs.choosebox2.show();
      _this.$refs.choosebox2.setDisabled(true);
      //就绪日期
      _this.$refs.datetime1.show();
      _this.$refs.datetime1.setDisabled(true);
      //到期日期
      _this.$refs.datetime2.show();
      _this.$refs.datetime2.setDisabled(true);
      // 投用日期
      _this.$refs.datetime3.show();
      _this.$refs.datetime3.setDisabled(true);
      // TMOC恢复日期
      _this.$refs.datetime4.show();
      _this.$refs.datetime4.setDisabled(true);
      // 现场验证检查表
      _this.$refs.sectioncols16.show();
      // 准备就绪审查清单
      _this.$refs.sectioncols17.show();
      // 附件上传
      _this.$refs.btnUpload.show();
    }
  }
  //MOC Type = MSMRMOC || PMOC
  //Operating Nominee：
  //010节点：可编辑
  //020节点：隐藏
  //Readiness done date： 
  //010节点：Readiness done date：隐藏
  //020节点：带出值，可编辑
  //TMOC due date：隐藏 datetime2
  if (mocType == 'MSMRMOC' || mocType == 'PMOC') {
	  // 实施确认
    _this.$refs.choosebox1.show();
	  _this.$refs.choosebox1.setDisabled(true);
    // 准备就绪审查清单
    _this.$refs.sectioncols17.hide();
    // 到期日期
    _this.$refs.datetime2.hide();
    // 010节点：可编辑
    if (window.currentNode == "010_Applicant confirmation") {
      // 操作代表
      _this.$refs.choosebox2.setDisabled(false);
      // 就绪日期
      _this.$refs.datetime1.hide();
      // 投用日期
      _this.$refs.datetime3.hide();
      // TMOC恢复日期
      _this.$refs.datetime4.hide();
    }
    if (window.currentNode == "020_Readiness Review") {
      // 操作代表
      _this.$refs.choosebox2.hide();
      // 就绪日期
      _this.$refs.datetime1.show();
      _this.$refs.datetime1.setDisabled(false);
      _this.$refs.datetime1.pickerOptions.disabledDate = function(e) {
        let today = new Date();
       today.setDate(today.getDate() - 1); 
       return e < today;
      }
      // 投用日期
      _this.$refs.datetime3.setDisabled(false);
      _this.$refs.sectioncols17.show();
      // 附件上传
      _this.$refs.btnUpload.show();
    }
  }
  if (mocType === 'TMOC' || mocType === 'LSMOC' || mocType === 'PMOC' || mocType === 'MSMRMOC') {
    // 抄送
    _this.$refs.choosebox3.setDisabled(true);
    if (window.currentNode == "010_Applicant confirmation") {
      // 抄送
      _this.$refs.choosebox3.setDisabled(false);
    }
  }
  if (mocType === 'MSMRMOC' || mocType === 'LSMOC') {
    // 现场验证检查表
    _this.$refs.sectioncols16.hide();
    // 准备就绪审查清单
    _this.$refs.sectioncols17.hide();
  }
  if (mocType === 'PMOC' || mocType === 'TMOC') {
    if (window.currentNode == "010_Applicant confirmation") {
      // 现场验证检查表
      _this.$refs.sectioncols16.hide();
      // 准备就绪审查清单
      _this.$refs.sectioncols17.hide();
    }
    if (window.currentNode == "020_Readiness Review") {
      // 现场验证检查表
      _this.$refs.sectioncols16.show();
      // 现场验证检查表 表格
      // _this.$refs.datagrid1.setDisabled(false);
      // 准备就绪审查清单
      _this.$refs.sectioncols17.show();
      // 准备就绪审查清单 表格
      // _this.$refs.datagrid2.setDisabled(false);
    }
  }
  if (mocType === 'TMOC' && (window.currentNode == '030_Work Party Reinstate' || window.currentNode == '040_Reinstate Confirm')) {
    debugger;
    _this.$refs.datagrid1.propertyAttr.editable = false;
    _this.$refs.datagrid2.propertyAttr.editable = false;
  }
};






  
 function getCurrentFormattedTime() {
     const now = new Date();
     const year = now.getFullYear();
     const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
     const day = String(now.getDate()).padStart(2, '0');
     const hours = String(now.getHours()).padStart(2, '0');
     const minutes = String(now.getMinutes()).padStart(2, '0');
     const seconds = String(now.getSeconds()).padStart(2, '0');
 
     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
 }




// 获取当前节点信息
if (this.getView() != 'launch') {
  // 给变更编号赋值
  let htm = this.$store.getters.nebulogyForm.nebulogyForm.mocImplementationRequestBasicInfo.mocNumber;
  let formUrl = this.$store.getters.nebulogyForm.nebulogyForm.mocImplementationRequestBasicInfo.resumeFormViewUrl;
  window.setMocNumber(htm,formUrl);
  this.$request({
    url: 'user-service/api/formActivity/currentProcInst',
    method: 'post',
    data: {
      destInstId: this.getUrlData('destInstId') || '',
      procInstId: this.getUrlData('procInstId') || ''
    }
  }).then(response => {
    if (response.currentActivitys != null && response.currentActivitys.length > 0 && response.responseCode === '100') {
      debugger
	  	window.nodeId=response.currentActivitys[0].activityId;
      window.currentNode = response.currentActivitys[0].displayName.zh_CN;
      //010节点可点击Select MOC for Implementation Review重选关联的MOC 其他节点：不显示此链接
      if (window.currentNode !== "010_Applicant confirmation" && window.currentNode !== '重新提交') {
        this.$refs.button1.hide();
      }
      // 根据需求隐藏组件
    }
    window.getMOCConfirmItems()
    window.showComp();
  }).catch(error => {
    throw error;
  });
}  
    
    
if(this.getView() == 'launch' || this.getView() =='resubmit'){
  this.$refs.applyDate.setValue(getCurrentFormattedTime());
  // 就绪日期加限制，不可填当前时间之前的日期；
  this.$refs.datetime1.pickerOptions.disabledDate = function(e) {
     let today = new Date();
	  today.setDate(today.getDate() - 1); 
	  return e < today;
  }
  // 发起视图下 初始化隐藏现场验证检查表 准备就绪审查清单
 	this.$refs.sectioncols16.hide();
   this.$refs.sectioncols17.hide();
  // 发起视图下 操作代表 实施确认默认隐藏 
  this.$refs.choosebox1.hide();
  this.$refs.choosebox2.hide();
  // 发起隐藏 就绪日期 TMOC到期日 MOC投用日期 TMOC恢复
  this.$refs.datetime1.hide();
  this.$refs.datetime2.hide();
  this.$refs.datetime3.hide();
  this.$refs.datetime4.hide();
} 


    
    
    
    
    
    
    
    
    
var _this = this;
//获取当前“确认项目”
  _this.$request({
  url: 'pai-core-maindata/api/last/mocConfirmItems/page',
  method: 'post',
  data: {
      fields: [
          { name: "information_en" },
          { name: "information_zh" },
      ],
      filter: "",
  },
}).then(response => {
var _mocConfirmItemsList = "";
if (response.mocConfirmItemsList.length > 0 && response.responseCode === '100') {
  debugger
  //打印模版使用
  if (window.currentNode == '010_Applicant confirmation' || window.currentNode == 'Start') {
    _mocConfirmItemsList = response.mocConfirmItemsList.filter(p => p.workflowType == "MOC Implementation Workflow" &&
        p.mocType == 'Implementation' &&
        p.activety == 'Start');
  } else {
    _mocConfirmItemsList = response.mocConfirmItemsList.filter(p => p.workflowType == "MOC Implementation Workflow" &&
      p.mocType == 'Implementation' &&
      p.activety == window.currentNode);
  }

      var _information;
      if (lang == 'zh-CN') {
          _information = _mocConfirmItemsList[0].information_zh;
      } else {
          _information = _mocConfirmItemsList[0].information_en;
      }
      console.log(_information, '_information_information_information')
      if (this.getView() != 'view') {
        _this.$refs.isMOCConfirmItems.propertyAttr.dataSource.options = [{ "label": _information, "value": "0" }];   
      }
    }
  }).catch(error => {
    throw error;
  });   