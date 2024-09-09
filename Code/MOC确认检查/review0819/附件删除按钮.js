if (_this.getView() != 'launch') {
  debugger
  if (window.currentNode) {
    let type = window.mocType;
    if (type == 'TMOC' || type == 'LSMOC') {
      return true
    } else {
      if (window.currentNode == "020_Readiness Review") {
        return true;
      } else {
        return false;
      }
    }
  } else {
    _this.$request({
      url: 'user-service/api/formActivity/currentProcInst',
      method: 'post',
      data: {
        destInstId: _this.getUrlData('destInstId') || '',
        procInstId: _this.getUrlData('procInstId') || ''
      }
    }).then(response => {
      if (response.currentActivitys != null && response.currentActivitys.length > 0 && response.responseCode === '100') {
        window.currentNode = response.currentActivitys[0].displayName.zh_CN;
        let type = window.mocType;
        debugger
        if (type == 'TMOC' || type == 'LSMOC') {
          return true
        } else {
          if (window.currentNode == "020_Readiness Review") {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return true;
      }
    }).catch(error => {
      throw error;
    });
  }
} else {
  return true
}













debugger
if (_this.getView() == 'approval' || _this.getView() == 'fncCreateVoucherInsap') {
  var currentEmp = _this.getAccount().employee;

  //window.nodeId
  if (row.employeeId == currentEmp.id && window.nodeId == row.nodeId) {
    return true;
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



















debugger
if (_this.getView() == 'approval' || _this.getView() == 'fncCreateVoucherInsap') {
  var currentEmp = _this.getAccount().employee;

  //window.nodeId
  if (row.employeeId == currentEmp.id && window.nodeId == row.nodeId) {
    if (window.currentNode) {
      let type = window.mocType;
      if (type == 'TMOC' || type == 'LSMOC') {
        return true
      } else {
        if (window.currentNode == "020_Readiness Review") {
          return true;
        } else {
          return false;
        }
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
}




























