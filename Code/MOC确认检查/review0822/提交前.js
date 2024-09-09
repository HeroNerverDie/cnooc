debugger
// 提交前
// 是否选择Moc流程
var moc = this.$refs.textbox6.getValue();
if (!moc) {
  if (lang == 'zh_CN') {
		this.$message({
		  message: '请选择Moc审批流程!',
		  type: 'warning'
		});
	   return false;
	} else {
	  this.$message({
		  message: 'Please select Moc approval process.',
		  type: 'warning'
		});
	   return false;
	}
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
//	TMOC due date < Readiness done date + 180天，
// 如超过，则不可提交，显示提示语： TMOC due date cannot be greater than 180
// days of readiness done date./ TMOC到期日不可超过准备完成日期180天。 
// 假设 getValue() 返回的是 ISO 8601 格式或其他可解析的日期字符串  
var readinessDateStr = this.$refs.datetime1.getValue();  
var tmocDateStr = this.$refs.datetime2.getValue();  
  
// 将字符串转换为 Date 对象  
var readinessDate = new Date(readinessDateStr);  
var tmocDate = new Date(tmocDateStr); 
if (tmocDate.getTime() < readinessDate.getTime()) {
  if (lang == 'zh_CN') {
		this.$message({
		  message: 'TMOC到期日必须大于就绪日期!',
		  type: 'warning'
		});
	   return false;
	} else {
	  this.$message({
		  message: 'TMOC expiration date must be greater than the readiness date!',
		  type: 'warning'
		});
	   return false;
	}
}

// 计算两个日期之间的天数差并直接进行条件判断  
if ((tmocDate - readinessDate) / (1000 * 60 * 60 * 24) > 180) {  
    // 显示提示语并阻止进一步操作（如果有需要）
  if (lang == 'zh_CN') {
		this.$message({
		  message: 'TMOC到期日不可超过准备完成日期180天!',
		  type: 'warning'
		});
	   return false;
	} else {
	  this.$message({
		  message: 'TMOC due date cannot be greater than 180 days of readiness done date.',
		  type: 'warning'
		});
	   return false;
	}
}
    