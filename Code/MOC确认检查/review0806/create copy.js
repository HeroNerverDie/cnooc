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
      _mocConfirmItemsList = response.mocConfirmItemsList.filter(p => p.workflowType == "MOC Implementation Workflow" &&
          p.mocType == 'Implementation' &&
          p.activety == window.currentNode);

      var _information;
      if (lang == 'zh-CN') {
          _information = _mocConfirmItemsList[0].information_zh;
      } else {
          _information = _mocConfirmItemsList[0].information_en;
      }
      console.log(_information,'_information_information_information')
      _this.$refs.isMOCConfirmItems.propertyAttr.dataSource.options = [{ "label": _information, "value": "0" }];
      window.customKey = { formTitle: { formTitleCn: "MOC确认检查流程", formTitleEn: "MOC Implementation Request"}, formInfo:{currentNode: window.currentNode, requireProject: _information, ccDisplayName:'', requestor:'', operatingNominee:'', implementationConfirm:''} }
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



// 定义常量以避免硬编码
const NODES = {
  APPLICANT_CONFIRMATION: "010_Applicant confirmation",
  READINESS_REVIEW: "020_Readiness Review",
  WORK_PARTY_REINSTATE: "030_Work Party Reinstate",
  REINSTATE_CONFIRM: "040_Reinstate Confirm"
};

// 封装设置组件状态的函数
function setComponentStatus(refName, shouldShow, isDisabled) {
  if (shouldShow) {
    _this.$refs[refName].show();
  } else {
    _this.$refs[refName].hide();
  }
  _this.$refs[refName].setDisabled(isDisabled);
}

// 优化日期处理
function setDisabledDateForDatepicker(refName) {
  _this.$refs[refName].pickerOptions.disabledDate = function(e) {
    let today = new Date();
    today.setDate(today.getDate() - 1);
    return e < today;
  };
}

// 主要的代码逻辑
window.showComp = function controlUIComponents() {
  var mocType = _this.$refs.textbox6.getValue();
  // 根据window.currentNode和mocType控制UI组件的显示、隐藏、可用状态
  switch (mocType) {
    case 'MSMRMOC':
    case 'PMOC':
      // 实施确认
      setComponentStatus('choosebox1', true, true);
      // 准备就绪审查清单
      _this.$refs.sectioncols17.hide();
      // 到期日期
      _this.$refs.datetime2.hide();
      switch (window.currentNode) {
        case NODES.APPLICANT_CONFIRMATION:
          // 操作代表
          setComponentStatus('choosebox2', true, false);
          // 就绪日期
          setComponentStatus('datetime1', false, true);
          // 投用日期
          setComponentStatus('datetime3', false, true);
          // TMOC恢复日期
          setComponentStatus('datetime4', false, true);
          break;
        case NODES.READINESS_REVIEW:
          // 操作代表
          setComponentStatus('choosebox2', false, true);
          // 就绪日期
          setComponentStatus('datetime1', true, false);
          setDisabledDateForDatepicker('datetime1');
          // 投用日期
          setComponentStatus('datetime3', true, false);
          // 附件上传
          setComponentStatus('btnUpload', true, false);
          break;
      }
      break;

    case 'TMOC':
      switch (window.currentNode) {
        case NODES.WORK_PARTY_REINSTATE:
          // 操作代表
          setComponentStatus('choosebox2', true, true);
          // 就绪日期
          setComponentStatus('datetime1', true, true);
          // 到期日期
          setComponentStatus('datetime2', true, true);
          // 投用日期
          setComponentStatus('datetime3', true, true);
          // TMOC恢复日期 必填
          setComponentStatus('datetime4', true, false);
          // 现场验证检查表
          _this.$refs.sectioncols16.show();
          _this.$refs.datagrid1.setDisabled(true);
          // 准备就绪审查清单
          _this.$refs.sectioncols17.show();
          _this.$refs.datagrid2.setDisabled(true);
          // 附件上传
          setComponentStatus('btnUpload', true, false);
          break;
        case NODES.REINSTATE_CONFIRM:
          // 操作代表
          setComponentStatus('choosebox2', true, true);
          // 就绪日期
          setComponentStatus('datetime1', true, true);
          // 到期日期
          setComponentStatus('datetime2', true, true);
          // 投用日期
          setComponentStatus('datetime3', true, true);
          // TMOC恢复日期
          setComponentStatus('datetime4', true, true);
          // 现场验证检查表
          _this.$refs.sectioncols16.show();
          // 准备就绪审查清单
          _this.$refs.sectioncols17.show();
          // 附件上传
          setComponentStatus('btnUpload', true, false);
          break;
      }
      break;

    case 'LSMOC':
      // 现场验证检查表
      _this.$refs.sectioncols16.hide();
      // 准备就绪审查清单
      _this.$refs.sectioncols17.hide();
      break;

    case 'PMOC':
    case 'TMOC':
      switch (window.currentNode) {
        case NODES.APPLICANT_CONFIRMATION:
          // 现场验证检查表
          _this.$refs.sectioncols16.hide();
          // 准备就绪审查清单
          _this.$refs.sectioncols17.hide();
          break;
        case NODES.READINESS_REVIEW:
          // 现场验证检查表
          _this.$refs.sectioncols16.show();
          // 现场验证检查表 表格
          // _this.$refs.datagrid1.setDisabled(false);
          // 准备就绪审查清单
          _this.$refs.sectioncols17.show();
          // 准备就绪审查清单 表格
          // _this.$refs.datagrid2.setDisabled(false);
          break;
      }
      break;

    default:
      // 处理未知的mocType
      console.warn("Unknown MOC type:", mocType);
      break;
  }

  // 抄送逻辑
  if (['TMOC', 'LSMOC', 'PMOC', 'MSMRMOC'].includes(mocType)) {
    setComponentStatus('choosebox3', true, true);
    if (window.currentNode === NODES.APPLICANT_CONFIRMATION) {
      setComponentStatus('choosebox3', true, false);
    }
  }

  // 对于TMOC类型的030_Work Party Reinstate和040_Reinstate Confirm节点，设置datagrid的不可编辑属性
  if (mocType === 'TMOC' && (window.currentNode === NODES.WORK_PARTY_REINSTATE || window.currentNode === NODES.REINSTATE_CONFIRM)) {
    _this.$refs.datagrid1.propertyAttr.editable = false;
    _this.$refs.datagrid2.propertyAttr.editable = false;
  }
}






  
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
    if(this.getView() == 'view'){
      window.getMOCConfirmItems()
    }
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

