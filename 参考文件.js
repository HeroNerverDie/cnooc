
window.lang = this.getLocalStorageByKey("PAI-language")
//打印模版使用
window.customKey={formTitle:{formTitleCn:"项目后评价审批流程",formTitleEn:"AFC PIR Workflow"}
				 }
var empList = this.getAccount().employee;
var _this = this;
var form = this.$store.getters.nebulogyForm.nebulogyForm.aFCPIRWorkflowMain;
var formStr = this.$store.getters.nebulogyForm.nebulogyForm

//初始化默认隐藏
this.$refs.economicEvaluationReview.hide()
this.$refs.initiator.hide()  
this.$refs.projectEngineer.hide()  
this.$refs.initiatorHead.hide()  
this.$refs.projectManager.hide()
if(form.isMF=="MF"){
  	this.$refs.initiator.show()  
	this.$refs.projectEngineer.show()  
	this.$refs.initiatorHead.show()  
	this.$refs.projectManager.show()
}else{
  	this.$refs.initiator.hide()  
	this.$refs.projectEngineer.hide()  
	this.$refs.initiatorHead.hide()  
	this.$refs.projectManager.hide()
  	
  	
}
//sectioncols10
if(form.isMF=="MF"){
  	this.$refs.datagrid4.show()  
}else{
  	this.$refs.datagrid4.hide()  
}


var lang = this.getLocalStorageByKey("PAI-language")

//设置html afc的值
window.inter =function(isAFCNumber,_this){
  var ZN="<div><span style='width:227px;display: inline-block;'>Project Title:</span><a style='color: #409EFF;' onclick=window.openUrlAFCView()>"+isAFCNumber+"</a></div>";
_this.$refs.htmlfield1.setValue(ZN);
}
//点击afc单号跳转对应的表单去
window.openUrlAFCView = function (){
	var procInstId =form.aFCNumber;//
	var employeeObjId = JSON.parse(localStorage.getItem('PAI-account')).id; 
	const data = {
		procInstId:procInstId,
		userId:employeeObjId
	};
	//点击单号跳转表单
	_this.$request({
		url: 'user-service/api/form/endpoint',
		method: 'post',
		headers: {},
		data: data
  	}).then(res => {
		if (res && res.responseCode === '100') {
  			if (res.selectedTranModel && res.selectedTranModel === 'vue') {
	  			window.open(`/PAI/newui/index.html?cls=${res.url}&procInstId=${procInstId}&userId=${employeeObjId}`,'_blank');

			}
	  	}

  	}).catch(err => {
		throw err;
		});
}
//初始化调用
window.inter(form.projectTitle,_this)

//是否需要显示isEconomic  022节点
if(form.isEconomic=="Y"){
	this.$refs.economicEvaluationReview.show()
}else{
	this.$refs.economicEvaluationReview.hide()
}

if(this.getView()=="launch"){
  		
	this.$store.getters.nebulogyForm.nebulogyForm.launchEmpId = empList.id
  	
}else{
  	
this.$store.getters.nebulogyForm.nebulogyForm.aFCPIRWorkflowMain.processNo = this.$store.getters.nebulogyForm.nebulogyForm.formInfo.folio;
	
}
if(this.getView() =='launch' && (this.getUrlData('draftId') == null || this.getUrlData('draftId') === '')) {
  	//获取当前年月日时分秒
	var d = new Date();
	var dateStr = (d.getFullYear())+"/"+(d.getMonth()+1)+"/"+d.getDate()+' '+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
	this.$refs.requestDate.setValue(dateStr)
  this.$store.getters.nebulogyForm.nebulogyForm.emailContent.currentActivityName = { en: "ProcessStart", zh_CN: "流程开始" };
  	//获取申请人信息
  	let that = this
  	var employeeName = empList.employeeName ? empList.employeeName :"";
  formStr.applicationEmail=empList.email;//申请人邮箱 
	this.$refs.requestor.setValue({value:empList.id,label:employeeName});

  	//根据人员id获取该人员的组织名称全路径
	this.$request({
		url: 'user-service/api/ObjectQuery',
    	method: 'post',	
  		data: {
			sqlParam:{"@empId":empList.id},
			registryCenterId:"077e3756-f55f-416e-be82-a93d959d349a"
		}
	}).then(response => {
		if (response.result && response.result.length>0 && response.responseCode === '100') {
	  		form.requestorDepartment = response.result[0].deptNamePath;
		}else{
		  	form.requestorDepartment = "";
		}
		}).catch(error => {
        	throw error;
		});
}   

var aa=[
  {
          type: 'Project Execution Review',
          category: 'HSE',
          measurement: "Any HSE recordable Incident",
          comments: ''
          
        }, {
          type: 'Project Execution Review',
          category: 'HSE',
          measurement: "Any unit trip and operation upset caused by project implementation",
          comments: ''
         
        }, {
          type: 'Project Execution Review',
          category: 'Lesson Learnt',
          measurement: "Positive",
          comments: ''
          
        }, {
          type: 'Project Execution Review',
          category: 'Lesson Learnt',
          measurement: "Negative",
          comments: ''
        
        }, {
          type: 'Project Execution Review',
          category: 'Scope',
          measurement:"Any major scope changes (clarification required for major changes)",
          comments: ''
         
        }, {
          type: 'Project Execution Review',
          category: 'Cost',
          measurement: "Any budget over-run v.s original approved budget (clarification required forbudget overrun)",
          comments: ''
         
        }
        , {
          type: 'Project Execution Review',
          category: 'Other',
          measurement: "",
          comments: ''
          
        }
]
if(this.getView() =='launch' && (this.getUrlData('draftId') == null || this.getUrlData('draftId') === '')) {
  this.$refs.datagrid3.setValue(aa);
}
var bb=[
   {
          type: 'Facility Performance Review',
          goal: 'Goal',
          title: "Has the proiect obiective been fully meet at the proiect completion",
	        commentOrPlan:"",
	        actual:""
          
        },
       {
          type: 'Facility Performance Review',
          goal: 'HSE',
          title: "Any unanticipated process risk",
	        commentOrPlan:"",
	        actual:""
          
        }, {
          type: 'Facility Performance Review',
          goal: 'Quality',
          title: "Any quality issue for the new facility",
	        commentOrPlan:"",
	        actual:""
         
        }, {
          type: 'Facility Performance Review',
          goal: 'Quality',
          title: "Any non-compliance result re-work",
	        commentOrPlan:"",
	        actual:""
          
        }, {
          type: 'Facility Performance Review',
          goal: 'Economics',
          title: "Economics analysis",
	        commentOrPlan:"Plan",
	        actual:"Actual"
        
        }, {
          type: 'Facility Performance Review',
          goal: 'Economics',
          title:"Pay back months",
          
	        commentOrPlan:"",
	        actual:""
         
        }, {
          type: 'Facility Performance Review',
          goal: 'Economics',
          title: "NPV(7%)mln",
        
	        commentOrPlan:"",
	        actual:""
         
        }
        , {
          type: 'Facility Performance Review',
          goal: 'Economics',
          title: "VIR(7%)",
	        commentOrPlan:"",
	        actual:""
          
        } ,{
          type: 'Facility Performance Review',
          goal: 'Economics',
          title: "RTEP(%)",
			   commentOrPlan:"",
			   actual:""
          
        }
		  , {
				  type: 'Facility Performance Review',
				  goal: 'Economics',
				  title: "Value Uplifting",
				  commentOrPlan:"",
				  actual:""

		 },{
				  type: 'Facility Performance Review',
				  goal: 'Economics Lesson',
				  title: "Positive",
				  commentOrPlan:"",
				  actual:""

			},{
				  type: 'Facility Performance Review',
				  goal: 'Learnt',
				  title: "Negative",
				  commentOrPlan:"",
				  actual:""

				}
		]

if(this.getView() =='launch' && (this.getUrlData('draftId') == null || this.getUrlData('draftId') === '')) {
 this.$refs.datagrid4.setValue(bb);  
}

   
window.nodeId="0000";
//根据当前节点信息
window.getCurrentPorcInst=function()
{
  var destInstId=_this.getUrlData('destInstId');
  var procInstId=_this.getUrlData('procInstId');
  if(destInstId!="")
  _this.$request({
            url: 'user-service/api/formActivity/currentProcInst',
            method: 'POST',
            data: {
                "destInstId": destInstId,
                "procInstId": procInstId
            }
        }).then((json) => {
	debugger
	//_this.$store.getters.nebulogyForm.nebulogyForm.emailContent.currentActivityName = json.currentActivitys[0].displayName;
             	window.nodeId=json.currentActivitys[0].activityId;
			 	let data=_this.$refs.dgFileList.getValue();
				let dataGrid=JSON.parse(JSON.stringify(data));
	          	_this.$refs.dgFileList.setValue(dataGrid);

        }).catch((err) => {
            console.log(err)
        })
  
  }    
    
window.getCurrentPorcInst()    
    
 //流程摘要
if(window.lang=="en"){
  formStr.emailContent.subject='AFC PIR Workflow'
}else{
  formStr.emailContent.subject='项目后评价审批流程'
}   
    
    
    
    
    
    
    
    
    
    
    
    
    
    