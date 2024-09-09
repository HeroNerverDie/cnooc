var _this = this;





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


window.clickAdd = function () {
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
  _this.$store.getters.nebulogyForm.nebulogyForm.productTypeName = "";
  _this.$store.getters.nebulogyForm.nebulogyForm.productAttributesName = "";
  _this.$store.getters.nebulogyForm.nebulogyForm.processName = "";
  _this.$refs.dropdown3.setValue('');
  _this.$refs.dropdown4.setValue('');
  _this.$refs.dropdown5.setValue('');
}


window.saveData = function () { 
  _this.$store.getters.nebulogyForm.nebulogyForm.isEdit="complete";
  _this.$store.getters.nebulogyForm.nebulogyForm.id="";
  _this.$store.getters.nebulogyForm.nebulogyForm.productName="";
  _this.$store.getters.nebulogyForm.nebulogyForm.productManager="";
  _this.$store.getters.nebulogyForm.nebulogyForm.productType="";
  _this.$store.getters.nebulogyForm.nebulogyForm.ba="";
  _this.$store.getters.nebulogyForm.nebulogyForm.productAttributes="";
  _this.$store.getters.nebulogyForm.nebulogyForm.marketingManager="";
  _this.$store.getters.nebulogyForm.nebulogyForm.salesManager="";
  _this.$store.getters.nebulogyForm.nebulogyForm.legalAdvisor="";
  _this.$store.getters.nebulogyForm.nebulogyForm.process="";
  _this.$store.getters.nebulogyForm.nebulogyForm.productTypeName = "";
  _this.$store.getters.nebulogyForm.nebulogyForm.productAttributesName = "";
  _this.$store.getters.nebulogyForm.nebulogyForm.processName = "";
  
  _this.$refs['window1'].hide();
  _this.$refs['customcomp1'].reLoad();  
}
    
    
    
    
    
    
  
this.$store.getters.nebulogyForm.nebulogyForm.isEdit="edit";
debugger




this.$store.getters.nebulogyForm.nebulogyForm.id=row.id;
this.$refs.textbox4.setValue(row.productName)
//this.$refs.choosebox6.setValue(row.productManager)
this.$refs.dropdown3.setValue({label:row.productTypeName,value:row.productType})
//this.$refs.choosebox7.setValue(row.ba)
this.$refs.dropdown4.setValue({label:row.productAttributesName,value:row.productAttributes})
//this.$refs.choosebox8.setValue(row.marketingManager)
//this.$refs.choosebox9.setValue(row.salesManager)
//this.$refs.choosebox10.setValue(row.legalAdvisor)
this.$refs.dropdown5.setValue({label:row.processName,value:row.process})






this.$store.getters.nebulogyForm.nebulogyForm.isEdit="edit";
this.$store.getters.nebulogyForm.nebulogyForm.id=row.id;
this.$store.getters.nebulogyForm.nebulogyForm.productName=row.productName;
this.$store.getters.nebulogyForm.nebulogyForm.productManager=row.productManager;
this.$store.getters.nebulogyForm.nebulogyForm.productType= row.productType;
this.$store.getters.nebulogyForm.nebulogyForm.ba=row.ba;;
this.$store.getters.nebulogyForm.nebulogyForm.productAttributes=row.productAttributes;
this.$store.getters.nebulogyForm.nebulogyForm.marketingManager= row.marketingManager;
this.$store.getters.nebulogyForm.nebulogyForm.salesManager= row.salesManager;
this.$store.getters.nebulogyForm.nebulogyForm.legalAdvisor= row.legalAdvisor;
this.$store.getters.nebulogyForm.nebulogyForm.process= row.process;
this.$store.getters.nebulogyForm.nebulogyForm.productTypeName = row.productTypeName;
this.$store.getters.nebulogyForm.nebulogyForm.productAttributesName = row.productAttributesName;
this.$store.getters.nebulogyForm.nebulogyForm.processName = row.processName;










