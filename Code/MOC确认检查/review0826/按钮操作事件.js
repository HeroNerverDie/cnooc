var _this=this;
let nebulogyForm = _this.$store.getters.nebulogyForm.nebulogyForm;
window.approvalDesc=nebulogyForm.approvalDesc;

//退回到任意节点的邮件通知，发送给申请人
if (action.actionName == 'PA_GoToAnyActivityAllEx') {
   let email = [{ receiveMailAccount: nebulogyForm.manualVoucherBasicInfo.applicationEmail}] 
  _this.$request({
          url: 'user-service/api/email/send',
          method: 'POST',
          data: {
                            sign: "html",
            k2ProcInstId: _this.getUrlData('sn').split('_')[0],
            templateId: 'public_return_email', //退回邮件模版
            receive: email,
            formData: {
                                                           ...nebulogyForm,
                           approverDesc: window.approvalDesc
                                                        },
          },
          headers: null,
        }) .then(res => {
                          }).catch(err => {
                          });
}

















