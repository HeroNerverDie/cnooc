var _this = this;
window.lang = localStorage.getItem('PAI-language') ? localStorage.getItem('PAI-language') : localStorage.getItem('lang');
window.clearInput = function(){
  _this.$refs.textbox1.setValue('');
  _this.$refs.choosebox1.setValue('');
  _this.$refs.dropdown1.setValue('');
  _this.$refs.choosebox2.setValue('');
  _this.$refs.choosebox3.setValue('');
  _this.$refs.choosebox4.setValue('');
  _this.$refs.dropdown2.setValue('');
  _this.$refs.choosebox5.setValue('');
  _this.$refs.dropdown6.setValue('');
}

window.findPerson = function (userName, compList) {
    debugger
    if (userName && userName.length) {
        let userList = []
        let comp = []
        userName.forEach((item,index)=>{
            if(item){
                userList.push(item)
                comp.push(compList[index])
            }
        })
        let quotedUserList = userList.map(user => `'${user}'`);  
        let userparm = quotedUserList.join(',')
        _this.$request({
            url: 'user-service/api/ObjectQuery',
            method: 'post',
            data: {
                sqlParam: { "@employeeNoList": userparm },
                registryCenterId: "72f32450-093a-4b26-b93b-aa00e386567d"
            },
        }).then(response2 => {
            if(response2.result && response2.result.length){
                debugger
                userList.forEach((it,index) => {
                    let findData = response2.result.find(item => item.employeeName == it);
                    console.log(comp[index],'comp[index]')
                    console.log(findData,'findData')
                    _this.$refs[comp[index]].setValue({ label: findData.employeeName, value: findData.id });
                })
            }

        }).catch(error2 => {
            throw error2;
        });
    }
}

window.clickAdd = function () {
  debugger
    _this.$store.getters.nebulogyForm.nebulogyForm.isEdit="add";
	  _this.$store.getters.nebulogyForm.nebulogyForm.id="";
	  _this.$store.getters.nebulogyForm.nebulogyForm.productName="";
	  _this.$store.getters.nebulogyForm.nebulogyForm.productManager="";
	  _this.$store.getters.nebulogyForm.nebulogyForm.productType="";
	  _this.$store.getters.nebulogyForm.nebulogyForm.ba="";
	  _this.$store.getters.nebulogyForm.nebulogyForm.productAttributes="";
	  _this.$store.getters.nebulogyForm.nebulogyForm.marketingManager="";
	  _this.$store.getters.nebulogyForm.nebulogyForm.salesManager="";
	  _this.$store.getters.nebulogyForm.nebulogyForm.legalAdvisor="";
	  _this.$store.getters.nebulogyForm.nebulogyForm.process = "";
	  _this.$store.getters.nebulogyForm.nebulogyForm.productManagerName = '';
	  _this.$store.getters.nebulogyForm.nebulogyForm.baName = '';
	  _this.$store.getters.nebulogyForm.nebulogyForm.marketingManagerName = '';
	  _this.$store.getters.nebulogyForm.nebulogyForm.salesManagerName = '';
	  _this.$store.getters.nebulogyForm.nebulogyForm.legalAdvisorName = '';
  	  _this.$store.getters.nebulogyForm.nebulogyForm.processName = '';
     _this.$store.getters.nebulogyForm.nebulogyForm.productTypeName = '';
     _this.$store.getters.nebulogyForm.nebulogyForm.productAttributesName = '';
  
  // _this.$refs.dropdown3.setValue('');
  // _this.$refs.dropdown4.setValue('');
  // _this.$refs.dropdown5.setValue('');
}


window.saveData = function () { 
  debugger
  _this.$store.getters.nebulogyForm.nebulogyForm.isEdit="complete";
  _this.$store.getters.nebulogyForm.nebulogyForm.productManagerName=_this.$refs.choosebox6.getText();
  _this.$store.getters.nebulogyForm.nebulogyForm.baName=_this.$refs.choosebox7.getText();
  _this.$store.getters.nebulogyForm.nebulogyForm.marketingManagerName=_this.$refs.choosebox8.getText();
  _this.$store.getters.nebulogyForm.nebulogyForm.salesManagerName=_this.$refs.choosebox9.getText();
  _this.$store.getters.nebulogyForm.nebulogyForm.legalAdvisorName=_this.$refs.choosebox10.getText();


 _this.$store.getters.nebulogyForm.nebulogyForm.processName=_this.$store.getters.nebulogyForm.nebulogyForm._process;
 _this.$store.getters.nebulogyForm.nebulogyForm.productTypeName=_this.$store.getters.nebulogyForm.nebulogyForm._productType[window.lang];
 _this.$store.getters.nebulogyForm.nebulogyForm.productAttributesName=_this.$store.getters.nebulogyForm.nebulogyForm._productAttributes[window.lang];
  /*
  _nebulogyForm.isEdit="complete";
  _nebulogyForm.Id="";
  _nebulogyForm.productName="";
  _nebulogyForm.productManager="";
  _nebulogyForm.productType="";
  _nebulogyForm.ba="";
  _nebulogyForm.productAttributes="";
  _nebulogyForm.marketingManager="";
  _nebulogyForm.salesManager="";
  _nebulogyForm.legalAdvisor="";
  _nebulogyForm.process="";
  
  */
  _this.$refs['window1'].hide();
  
  setTimeout(function(){
	_this.$refs['customcomp1'].reLoad(); 
	},500)
}
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
this.setSmartDsValue("NebulogyForm.productName",this,
    row.productName,"","");

      this.setSmartDsValue("NebulogyForm.productManager",this,
    row.productManager,"","");

      this.setSmartDsValue("NebulogyForm.productType",this,
    row.productType,"","");

      this.setSmartDsValue("NebulogyForm.ba",this,
    row.ba,"","");

      this.setSmartDsValue("NebulogyForm.productAttributes",this,
    row.productAttributes,"","");

      this.setSmartDsValue("NebulogyForm.marketingManager",this,
    row.marketingManager,"","");

      this.setSmartDsValue("NebulogyForm.salesManager",this,
    row.salesManager,"","");

      this.setSmartDsValue("NebulogyForm.legalAdvisor",this,
    row.legalAdvisor,"","");

      this.setSmartDsValue("NebulogyForm.process",this,
    row.process,"","");

      this.setSmartDsValue("NebulogyForm.id",this,
    row.id,"","");

      this.setSmartDsValue("NebulogyForm.productTypeName",this,
    row.productTypeName,"","");

      this.setSmartDsValue("NebulogyForm.productAttributesName",this,
    row.productAttributesName,"","");

      this.setSmartDsValue("NebulogyForm.processName",this,
    row.processName,"","");

      this.setSmartDsValue("NebulogyForm.productManagerName",this,
    row.productManagerName,"","");

      this.setSmartDsValue("NebulogyForm.baName",this,
    row.baName,"","");

      this.setSmartDsValue("NebulogyForm.marketingManagerName",this,
    row.marketingManagerName,"","");

      this.setSmartDsValue("NebulogyForm.salesManagerName",this,
    row.salesManagerName,"","");

      this.setSmartDsValue("NebulogyForm.legalAdvisorName",this,
    row.legalAdvisorName,"","");
    
    
    
    
    
this.$store.getters.nebulogyForm.nebulogyForm.id=row.id;
this.$store.getters.nebulogyForm.nebulogyForm.productName=row.productName;
this.$store.getters.nebulogyForm.nebulogyForm.productManager=row.productManager;
this.$store.getters.nebulogyForm.nebulogyForm.productType=row.productType;
this.$store.getters.nebulogyForm.nebulogyForm.ba=row.ba;
this.$store.getters.nebulogyForm.nebulogyForm.productAttributes=row.productAttributes;
this.$store.getters.nebulogyForm.nebulogyForm.marketingManager=row.marketingManager;
this.$store.getters.nebulogyForm.nebulogyForm.salesManager=row.salesManager;
this.$store.getters.nebulogyForm.nebulogyForm.legalAdvisor=row.legalAdvisor;
this.$store.getters.nebulogyForm.nebulogyForm.process = row.process;
this.$store.getters.nebulogyForm.nebulogyForm.productManagerName = row.productManagerName;
this.$store.getters.nebulogyForm.nebulogyForm.baName = row.baName;
this.$store.getters.nebulogyForm.nebulogyForm.marketingManagerName = row.marketingManagerName;
this.$store.getters.nebulogyForm.nebulogyForm.salesManagerName = row.salesManagerName;
this.$store.getters.nebulogyForm.nebulogyForm.legalAdvisorName = row.legalAdvisorName;
this.$store.getters.nebulogyForm.nebulogyForm.processName = row.processName;
this.$store.getters.nebulogyForm.nebulogyForm.productTypeName = row.productTypeName;
this.$store.getters.nebulogyForm.nebulogyForm.productAttributesName = row.productAttributesName;
this.$refs.choosebox6.setValue({ label: _productManagerName, value: productManager });
this.$refs.choosebox7.setValue({ label: _baName, value: ba });
this.$refs.choosebox8.setValue({ label: _marketingManagerName, value: marketingManager });
this.$refs.choosebox9.setValue({ label: _salesManagerName, value: salesManager });
this.$refs.choosebox10.setValue({ label: _legalAdvisorName, value: legalAdvisor });













debugger
var _nebulogyForm = this.$store.getters.nebulogyForm.nebulogyForm;
if (this.$store.getters.nebulogyForm.nebulogyForm.isEdit == "add") {
    this.$refs.window1.propertyAttr.title = "新增"
    this.$refs.button6.hide();
  	  this.$refs.choosebox6.setValue({ label: '', value: '' });
    this.$refs.choosebox7.setValue({ label: '', value: '' });
    this.$refs.choosebox8.setValue({ label: '', value: '' });
    this.$refs.choosebox9.setValue({ label: '', value: '' });
    this.$refs.choosebox10.setValue({ label: '', value: '' });
    this.$refs.dropdown3.setValue('');
    this.$refs.dropdown4.setValue('');
    this.$refs.dropdown5.setValue('');
}

if (this.$store.getters.nebulogyForm.nebulogyForm.isEdit == "edit") {
  debugger
    this.$refs.window1.propertyAttr.title = "编辑"
    this.$refs.button5.hide();
    //选人控件初始化赋值
    this.$store.getters.nebulogyForm.nebulogyForm.isEdit = "complete";
    var productManager = this.$store.getters.nebulogyForm.nebulogyForm.productManager
    var _productManagerName = this.$store.getters.nebulogyForm.nebulogyForm.productManagerName
    var ba = this.$store.getters.nebulogyForm.nebulogyForm.ba
    var _baName = this.$store.getters.nebulogyForm.nebulogyForm.baName
    var marketingManager = this.$store.getters.nebulogyForm.nebulogyForm.marketingManager
    var _marketingManagerName = this.$store.getters.nebulogyForm.nebulogyForm.marketingManagerName
    var salesManager = this.$store.getters.nebulogyForm.nebulogyForm.salesManager
    var _salesManagerName = this.$store.getters.nebulogyForm.nebulogyForm.salesManagerName
    var legalAdvisor = this.$store.getters.nebulogyForm.nebulogyForm.legalAdvisor
    var _legalAdvisorName = this.$store.getters.nebulogyForm.nebulogyForm.legalAdvisorName
	  this.$refs.choosebox6.setValue({ label: _productManagerName, value: productManager });
	  this.$refs.choosebox7.setValue({ label: _baName, value: ba });
	  this.$refs.choosebox8.setValue({ label: _marketingManagerName, value: marketingManager });
	  this.$refs.choosebox9.setValue({ label: _salesManagerName, value: salesManager });
    this.$refs.choosebox10.setValue({ label: _legalAdvisorName, value: legalAdvisor });
  
    this.$refs.dropdown3.setValue(this.$store.getters.nebulogyForm.nebulogyForm.productType);
    this.$refs.dropdown4.setValue(this.$store.getters.nebulogyForm.nebulogyForm.productAttributes);
    this.$refs.dropdown5.setValue(this.$store.getters.nebulogyForm.nebulogyForm.process);
    /*if(productManager && _productManagerName){
        this.$refs.choosebox6.setValue({ label: _productManagerName, value: productManager });
    }
    if(ba && _baName){
        this.$refs.choosebox7.setValue({ label: _baName, value: ba });
    }
    if(marketingManager && _marketingManagerName){
        this.$refs.choosebox8.setValue({ label: _marketingManagerName, value: marketingManager });
    }
    if(salesManager && _salesManagerName){
        this.$refs.choosebox9.setValue({ label: _salesManagerName, value: salesManager });
    }
    if(legalAdvisor && _legalAdvisorName){
        this.$refs.choosebox10.setValue({ label: _legalAdvisorName, value: legalAdvisor });
    }
	*/
    // var userList = [_productManagerName,_baName,_marketingManagerName,_salesManagerName,_legalAdvisorName]
    // var compList = ['choosebox6','choosebox7','choosebox8','choosebox9','choosebox10']
    // window.findPerson(userList,compList)
}
    
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    