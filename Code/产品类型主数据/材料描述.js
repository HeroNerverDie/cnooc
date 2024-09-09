window.saveData = function () { 
  debugger
  _this.$store.getters.nebulogyForm.nebulogyForm.isEdit="complete";
  _this.$store.getters.nebulogyForm.nebulogyForm.materialDesc=_this.$refs.materialDesc.getText();
  _this.$store.getters.nebulogyForm.nebulogyForm.material=_this.$refs.materialDesc.getText();

  _this.$refs['window1'].hide();
  
  setTimeout(function(){
	_this.$refs['customcomp1'].reLoad(); 
	},500)
}