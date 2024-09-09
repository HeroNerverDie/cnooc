debugger
if(action.actionName == "Accept" || action.actionName == 'reSubmit'){
   // 是否选择Moc流程
   var moc = this.$refs.textbox6.getValue();
   let message = window.lang == 'zh_CN' ? '请选择Moc审批流程' : 'Please select Moc approval process.'
   if (!moc) {
	 this.$message({
	   message: message,
	   type: 'warning'
	 });
	 return false
   }
  
//确认项目选项必填
if (this.$refs.isMOCConfirmItems.checkList.toString() == "") {
	checkResult = false;
	if (lang == 'zh_CN') {
		this.$message({
		  message: '请确认项目!',
		  type: 'warning'
		});
	   return false;
	} else {
	  this.$message({
		  message: 'Please confirm the project.',
		  type: 'warning'
		});
	   return false;
	}
}


if (window.currentNode == '020_Readiness Review') {
  let type = this.$refs.textbox6.getValue();
  if(type == 'LSMOC'){
	//	TMOC due date < Readiness done date + 180天，
	// 如超过，则不可提交，显示提示语： TMOC due date cannot be greater than 180
	// days of readiness done date./ TMOC到期日不可超过准备完成日期180天。 
	// 假设 getValue() 返回的是 ISO 8601 格式或其他可解析的日期字符串  
	var readinessDateStr = this.$refs.datetime1.getValue();  
	var tmocDateStr = this.$refs.datetime2.getValue();  

	// 将字符串转换为 Date 对象  
	var readinessDate = new Date(readinessDateStr);  
	var tmocDate = new Date(tmocDateStr); 
	if(tmocDate.getTime() < readinessDate.getTime()){
	  let message = window.lang == 'zh_CN' ? 'TMOC到期日必须大于就绪日期' : 'TMOC expiration date must be greater than the readiness date.'
	  this.$message({
		  message: message,
		  type: 'warning'
		});
	   return false; 
	}

	// 计算两个日期之间的天数差并直接进行条件判断  
	if ((tmocDate - readinessDate) / (1000 * 60 * 60 * 24) > 180) {  
		// 显示提示语并阻止进一步操作（如果有需要）  
	   let message = window.lang == 'zh_CN' ? 'TMOC到期日不可超过准备完成日期180天' : 'TMOC due date cannot be greater than 180 days of readiness done date.'
		this.$message({
		  message: message,
		  type: 'warning'
		});
	   return false; 
	}
  }
}

  
}
// 退回与拒绝时必填
if(action.actionName == 'Reject'){
  let content = this.$refs.textarea1.getValue();
  if(!content){
	let message = window.lang == 'zh_CN' ? '请在“评论”中输入退回原因！' : 'Please enter the reason for return in the "Comment" section!'
	this.$message({
	   message: message,
	   type: 'warning'
	 });
	return false;
  }
}
if(action.actionName == 'PA_JabilCancel'){
  let content = this.$refs.textarea1.getValue();
  if(!content){
	let message = window.lang == 'zh_CN' ? '请在“评论”中输入拒绝原因！' : 'Please enter the reject reason in the "comments"!'
	this.$message({
	   message: message,
	   type: 'warning'
	 });
	return false;
  }
}

if(action.displayName.zh_CN=="退回发起人" ||action.displayName.zh_CN=="拒绝"){
  this.$refs.form1.propertyAttr.notCheckForm = true;
}

    
    
    
    
    
    
    
    
    
    