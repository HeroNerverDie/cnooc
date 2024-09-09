debugger;
if (_this.getView() == 'approval' || _this.getView() == 'fncCreateVoucherInsap') {
  var currentEmp = _this.getAccount().employee;

  //window.nodeId
  if (row.employeeId == currentEmp.id && window.nodeId == row.nodeId) {
    if (window.currentNode) {
      let type = window.mocType;
      if (type == 'TMOC' || type == 'LSMOC') {
        return true
      } else if(type == 'MSMRMOC' || type == 'PMOC'){
        if (window.currentNode == "020_Readiness Review") {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  } else if (_this.getView() == 'launch') {
    return true;
  } else if (_this.getView() == 'reSubmit') {
    if (row.nodeId == "0000" || row.nodeId == undefined || window.nodeId == row.nodeId) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}else{
  return true;
}
    