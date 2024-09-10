// 初始化代码
var _this = this;
window.lang = this.getLocalStorageByKey("PAI-language")
//打印模版使用
window.customKey = { formTitle: { formTitleCn: "最终价格申请", formTitleEn: "Final Price Approval" } }
var empList = this.getAccount().employee;
var formInfo = this.$store.getters.nebulogyForm.nebulogyForm.finalPriceBaseInfo;
var form = this.$store.getters.nebulogyForm.nebulogyForm


if (this.getView() == 'launch' && (this.getUrlData('draftId') == null || this.getUrlData('draftId') === '')) {
  //获取当前年月日时分秒
  var d = new Date();
  var dateStr = (d.getFullYear()) + "/" + (d.getMonth() + 1) + "/" + d.getDate() + ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  this.$refs.requestDate.setValue(dateStr)
  this.$store.getters.nebulogyForm.nebulogyForm.emailContent.currentActivityName = { en: "ProcessStart", zh_CN: "流程开始" };
  //获取申请人信息
  var employeeName = empList.employeeName ? empList.employeeName : "";
  form.applicationEmail = empList.email;//申请人邮箱 
  this.$refs.requestor.setValue({ value: empList.id, label: employeeName });

  //根据人员id获取该人员的组织名称全路径
  this.$request({
    url: 'user-service/api/ObjectQuery',
    method: 'post',
    data: {
      sqlParam: { "@empId": empList.id },
      registryCenterId: "077e3756-f55f-416e-be82-a93d959d349a"
    }
  }).then(response => {
    if (response.result && response.result.length > 0 && response.responseCode === '100') {
      form.requestorDepartment = response.result[0].deptNamePath;
    } else {
      form.requestorDepartment = "";
    }
  }).catch(error => {
    throw error;
  });
} 