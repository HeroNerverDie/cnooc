
debugger
var _this = this;
var emp = _this.getAccount().employee;
window.lang = localStorage.getItem('PAI-language') ? localStorage.getItem('PAI-language') : localStorage.getItem('lang');;
window.nodeId = "0000";

//根据人员id获取该人员的组织名称全路径
window.getDeptByEmployeeId = function (id) {

    _this.$request({
        url: 'user-service/api/ObjectQuery',
        method: 'post',
        data: {
            sqlParam: { "@empId": id },
            registryCenterId: "077e3756-f55f-416e-be82-a93d959d349a"
        }
    }).then(response => {
        if (response.result && response.result.length > 0 && response.responseCode === '100') {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.requestorDept = response.result[0].deptNamePath;
        } else {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.requestorDept = "";
        }
    }).catch(error => {
        throw error;
    });
}

//点击自定义选人控件
window.showCustomSelection = function () {
    var _plant = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.plant;

    if (_plant == "") {
        var message = "";
        if (lang == 'zh_CN') {
            message = "请选择装置!";
        } else {
            message = "Mesenter the Plant.";
        }

        _this.$message({
            showClose: true,
            message: message,
            type: "error"
        });
        return false;
    } else {
        _this.$refs['window1'].show();
    }
}

//切换“MOCType”  加载“变更类别”
window.loadMOCCategory = function (v) {
    var _mocType = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocType;

    //隐藏所有内容重新加载
    window.initialPage();

    if (_this.getView() == "launch") {
        //======== 开始清空========
        //清空已填写的内容

        //变更信息 相关的内容清空
        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.costEstimationRMB50 = "";
        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.processEngineerTechnologistMOCcInformation = "";

        //LSMOC 相关内容清空
        //清空“标准公用工程”模块选择的值
        var _mocStandardUtilityServices = _this.$store.getters.nebulogyForm.nebulogyForm.mocStandardUtilityServices;
        if (_mocStandardUtilityServices != null && _mocStandardUtilityServices.length > 0) {
            for (var i = 0; i < _mocStandardUtilityServices.length; i++) {
                _mocStandardUtilityServices[i].isYes = "";
            }
        }

        //加载“组成”模块
        window.loadMOCFluidComposition();

        //清空“技术评估”模块选择的值
        var _mocTechnicalAssessment = _this.$store.getters.nebulogyForm.nebulogyForm.mocTechnicalAssessment;
        if (_mocTechnicalAssessment != null && _mocTechnicalAssessment.length > 0) {
            for (var i = 0; i < _mocTechnicalAssessment.length; i++) {
                _mocTechnicalAssessment[i].yesOrNO = "";
            }
        }

        //加载“工程评估”模块数据 LSMOC 或者 PMOC 或者 TMOC
        window.loadMOCEngineeringAssessment(_mocType);

        //MSMRMOC 相关的内容清空
        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.authorizedTechnologist = "";
        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.authorizedTechnologistId = "";
        try {
            _this.$refs.authorizedTechnologist.setValue("");
        } catch (e) {

        }

        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.leadProcessControl = "";
        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.leadProcessControlId = "";
        try {
            _this.$refs.leadProcessControl.setValue("");
        } catch (e) {

        }

        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.systemGuardian = "";
        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.msmrWorkParty = "";

        //======== 结束清空========
    }

    _this.$refs.mocPrioritization.hide();
    _this.$refs.mocGrade.hide();

    //设置非必填 MSMRMOC时必填(技术审批者选择 维修主任授权代理工程师选择)
    _this.$refs.authorizedTechnologist.propertyAttr.required = false;
    _this.$refs.systemGuardian.propertyAttr.required = false;
    _this.$refs.leadProcessControl.propertyAttr.required = false;
    _this.$refs.msmrWorkParty.propertyAttr.required = false;

    if (_mocType == "PMOC") {
        _this.$refs.mocCategory.show();
        _this.$refs.costEstimationRMB50.show();
        _this.$refs.mocPrioritization.show();
        _this.$refs.mocGrade.show();
        _this.$refs.mocFocalPoint.show();
    }

    if (_mocType == "TMOC") {
        _this.$refs.mocCategory.show();
        _this.$refs.costEstimationRMB50.show();
        _this.$refs.mocFocalPoint.show();
    }

    if (_mocType == "LSMOC") {
        _this.$refs.mocFocalPoint.show();

        //标准公用工程
        _this.$refs.sectioncols6.setProperty("cls", "sectionShow");//_this.$refs.sectioncols6.show();
        _this.$refs.sectioncols6.setProperty("cls", "tableReadonly");

        //组成
        _this.$refs.sectioncols7.setProperty("cls", "sectionShow");//_this.$refs.sectioncols7.show();
        _this.$refs.sectioncols7.setProperty("cls", "tableReadonly");

        //技术评估
        _this.$refs.sectioncols8.setProperty("cls", "sectionShow");//_this.$refs.sectioncols8.show();
        _this.$refs.sectioncols8.setProperty("cls", "tableReadonly");

        //工程评估
        _this.$refs.sectioncols9.setProperty("cls", "sectionShow");//_this.$refs.sectioncols9.show();
        _this.$refs.sectioncols9.setProperty("cls", "tableReadonly");

    }

    if (_mocType == "MSMRMOC") {

        //逻辑隐藏
        _this.$refs.mocFocalPoint.hide();
        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocFocalPoint = "";
        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow._mocFocalPoint = "";

        //变更优先级
        _this.$refs.mocPrioritization.hide();
        _this.$refs.mocGrade.hide();

        _this.$refs.processEngineerTechnologistMOCcInformation.show();

        _this.$refs.sectioncols9.setProperty("cls", "sectionHide");//        _this.$refs.sectioncols9.hide();

        //“技术审批者选择”模块
        _this.$refs.sectioncols10.setProperty("cls", "sectionShow");//
        //_this.$refs.sectioncols10.show();

        //“维修主任授权代理工程师选择”模块
        _this.$refs.sectioncols11.setProperty("cls", "sectionShow");//
        //_this.$refs.sectioncols11.show();

        //MSMRMOC时必填(技术审批者选择 维修主任授权代理工程师选择)
        _this.$refs.authorizedTechnologist.propertyAttr.required = true;
        _this.$refs.systemGuardian.propertyAttr.required = true;
        _this.$refs.leadProcessControl.propertyAttr.required = true;
        _this.$refs.msmrWorkParty.propertyAttr.required = true;

    }

    //校验是否需要显示，且加载“单元”字段；
    if (_mocType == "LSMOC" || _mocType == "MSMRMOC") {
        _this.$refs.mocCategory.hide();
        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocCategory = "";

        _this.$refs.mocCategory.setValue("");
    }
    else if (_mocType != "") {
        _this.$refs.mocCategory.show();

        _this.$request({
            url: "pai-core-maindata/api/last/mocCategory/customQuery",
            method: "post",
            data: {
                fields: [
                    { name: "mocType" },
                    { name: "mocCategory" },
                ],
                filter: "mocType='" + _mocType + "'",
            },
        })
            .then((res) => {

                var data = [];
                //切换变更类型，清空变更类别
                if (v == 1) {
                    _this.$refs.mocCategory.setValue("");
                }
                const field = { displayField: 'label', valueField: 'value' };

                res.data.forEach(v => {
                    data.push({ label: v.mocCategory, value: v.mocCategory })
                })
                _this.$refs.mocCategory.setData(data, field);
            })
            .catch((err) => {
                throw err;
            });
    }
}

//加载单元
window.selectUnit = function (v) {
    var _mocType = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocType;

    if (_mocType == "MSMRMOC") {
        //切换装置，重新加载单元，同时重新加载MSMRMOC 
        if (v == 1) {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.authorizedTechnologist = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.authorizedTechnologistId = "";
            _this.$refs.authorizedTechnologist.setValue("");

            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.leadProcessControl = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.leadProcessControlId = "";
            _this.$refs.leadProcessControl.setValue("");
        }
    }

    var _plant = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.plant;
    _this.$request({
        url: "pai-core-maindata/api/last/mocPlantUnit/customQuery",
        method: "post",
        data: {
            fields: [
                { name: "unit" },
            ],
            filter: "plant='" + _plant + "'",
        },
    })
        .then((res) => {
            var _unitList = res.data[0].unit;
            const field = { displayField: 'label', valueField: 'value' };
            var data = [];

            //切换变更类型，清空变更类别
            if (v == 1) {
                _this.$refs.unit.setValue("");
            }

            if (_unitList != "") {
                if (_unitList.includes(",") == true) {
                    let arr = _unitList.split(",");

                    arr.forEach(v => {
                        data.push({ label: v, value: v })
                    })
                    _this.$refs.unit.setData(data, field);
                } else {
                    data.push({ label: _unitList, value: _unitList })
                    _this.$refs.unit.setData(data, field);
                }
            }
        })
        .catch((err) => {
            throw err;
        });
}

//初次加载“组成”模块数据
window.loadMOCFluidComposition = function () {

    var _mocFluidComposition = [];
    _mocFluidComposition[0] = new Object();
    _mocFluidComposition[0].parameters = "设计条件";
    _mocFluidComposition[0].maxBarG = "";
    _mocFluidComposition[0].minBarG = "";
    _mocFluidComposition[0].maxDegC = "";
    _mocFluidComposition[0].minDegC = "";
    _mocFluidComposition[0].pid = "";

    _mocFluidComposition[1] = new Object();
    _mocFluidComposition[1].parameters = "操作条件";
    _mocFluidComposition[1].maxBarG = "";
    _mocFluidComposition[1].minBarG = "";
    _mocFluidComposition[1].maxDegC = "";
    _mocFluidComposition[1].minDegC = "";
    _mocFluidComposition[1].pid = "";

    _this.$store.getters.nebulogyForm.nebulogyForm.mocFluidComposition = _mocFluidComposition;
}

//初次加载所有“评估”模块数据：技术评估、工程评估、工艺过程评估
window._mocTechnicalAssessmentList = [];
window.getMOCTechnicalAssessmentList = function () {
    var _mocType = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocType;

    _this.$request({
        url: "pai-core-maindata/api/last/mocAssessment/page",
        method: "post",
        data: {
            fields: [
                { name: "assessmentType" },
                { name: "orders" },
                { name: "mocType" },
                { name: "unit" },
                { name: "assessmentContent_en" },
                { name: "assessmentContent_zh" },
            ],
            filter: "",
        },
    })
        .then((res) => {

            _mocTechnicalAssessmentList = res.mocAssessmentList;

            //加载“技术评估”模块数据
            window.loadMOCTechnicalAssessment();

            //加载“工程评估”模块数据LSMOC或者PMOC
            window.loadMOCEngineeringAssessment(_mocType);

            //加载“工艺过程评估”模块数据
            window.loadMOCProcessAssessment();

            //加载“组成”模块
            window.loadMOCFluidComposition();

            //加载“标准公用工程”模块数据
            window.getMOCStandardUtilityServicesData();

            //加载“更新文档”模块数据
            window.loadMOCDocumentList();
        })
        .catch((err) => {
            throw err;
        });
}

//加载“技术评估”模块数据
window.loadMOCTechnicalAssessment = function () {
    //var _mocType=_this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocType;

    //“技术评估”模块
    var _mocTechnicalAssessment = _mocTechnicalAssessmentList.filter(p => p.assessmentType == "Technical Assessment" && p.mocType.indexOf("LSMOC") > -1);

    var _mocTechnicalAssessmentList2 = [];
    var i = 0;
    _mocTechnicalAssessment.forEach(v => {
        _mocTechnicalAssessmentList2[i] = new Object();
        _mocTechnicalAssessmentList2[i].yesOrNO = "";
        _mocTechnicalAssessmentList2[i].orders = v.orders;
        _mocTechnicalAssessmentList2[i].assessmentContent_zh = v.assessmentContent_zh;
        _mocTechnicalAssessmentList2[i].assessmentContent_en = v.assessmentContent_en;
        _mocTechnicalAssessmentList2[i].pid = "";

        i++;

    })
    _this.$store.getters.nebulogyForm.nebulogyForm.mocTechnicalAssessment = _mocTechnicalAssessmentList2;
}

//加载“工程评估”模块数据LSMOC或者MOC
window.loadMOCEngineeringAssessment = function (mocType) {
    if (mocType != "") {
        //“工程评估”模块
        var _mocEngineeringAssessmentList = _mocTechnicalAssessmentList.filter(p => p.assessmentType == "Engineering Assessment" && p.mocType.indexOf(mocType) > -1);

        var _mocEngineeringAssessment = [];
        var i = 0;
        _mocEngineeringAssessmentList.forEach(v => {
            _mocEngineeringAssessment[i] = new Object();
            _mocEngineeringAssessment[i].yesOrNO = "";
            _mocEngineeringAssessment[i].orders = v.orders;
            _mocEngineeringAssessment[i].assessmentContent_zh = v.assessmentContent_zh;
            _mocEngineeringAssessment[i].assessmentContent_en = v.assessmentContent_en;
            _mocEngineeringAssessment[i].pid = "";

            i++;
        })
        _this.$store.getters.nebulogyForm.nebulogyForm.mocEngineeringAssessment = _mocEngineeringAssessment;
    }
    else {
        _this.$store.getters.nebulogyForm.nebulogyForm.mocEngineeringAssessment = null;
    }
}

//加载“工艺过程评估”模块数据
window.loadMOCProcessAssessment = function () {

    //“工艺过程评估”模块
    var _mocProcessAssessment = _mocTechnicalAssessmentList.filter(p => p.assessmentType == "Process Assessment" && p.mocType.indexOf("PMOC") > -1);

    var _mocProcessAssessmentList = [];
    var i = 0;
    var _assessmentContent = "";
    _mocProcessAssessment.forEach(v => {
        _assessmentContent = "";
        _mocProcessAssessmentList[i] = new Object();
        _mocProcessAssessmentList[i].yesOrNO = "";
        _mocProcessAssessmentList[i].orders = v.orders;
        _mocProcessAssessmentList[i].assessmentContent_zh = v.assessmentContent_zh;
        _mocProcessAssessmentList[i].assessmentContent_en = v.assessmentContent_en;
        _mocProcessAssessmentList[i].pid = "";

        i++;
    })
    _this.$store.getters.nebulogyForm.nebulogyForm.mocProcessAssessment = _mocProcessAssessmentList;
}

//获取标准公用工程
window.getMOCStandardUtilityServicesData = function () {
    _this.$request({
        url: 'pai-core-maindata/api/last/mocStandardUtilityServicesData/page',
        method: 'post',
        data: {
            fields: [
                { name: "descriptions" },
                { name: "designPressBarG" },
                { name: "designTempDegC" },
                { name: "operPressBarG" },
                { name: "operTempDegC" },
                { name: "area" },
                { name: "orders" },
            ],
            filter: "",
        },
    }).then(response => {

        var _mocStandardUtilityServicesDataList = "";
        if (response.mocStandardUtilityServicesDataList.length > 0 && response.responseCode === '100') {

            _mocStandardUtilityServicesDataList = response.mocStandardUtilityServicesDataList.sort(function (a, b) { return a.orders - b.orders; });

            var _mocStandardUtilityServicesDataListData = [];
            var i = 0;
            _mocStandardUtilityServicesDataList.forEach(v => {

                _mocStandardUtilityServicesDataListData[i] = new Object();
                _mocStandardUtilityServicesDataListData[i].isYes = "";
                _mocStandardUtilityServicesDataListData[i].description = v.descriptions;
                _mocStandardUtilityServicesDataListData[i].designPressBarG = v.designPressBarG;
                _mocStandardUtilityServicesDataListData[i].designTempDegC = v.designTempDegC;
                _mocStandardUtilityServicesDataListData[i].operPressBarG = v.operPressBarG;
                _mocStandardUtilityServicesDataListData[i].operTempDegC = v.operTempDegC;
                _mocStandardUtilityServicesDataListData[i].area = v.area;
                _mocStandardUtilityServicesDataListData[i].orders = v.orders;
                _mocStandardUtilityServicesDataListData[i].pid = "";

                i++;
            })
            _this.$store.getters.nebulogyForm.nebulogyForm.mocStandardUtilityServices = _mocStandardUtilityServicesDataListData;
        }
    }).catch(error => {
        throw err;
    });
}

//加载“文档列表”模块数据
window.loadMOCDocumentList = function () {
    _this.$request({
        url: "object/api/last/dictItemObj/customQuery",
        method: "post",
        data: {
            fields: [
                { name: "id" },
                { name: "name" },
                { name: "code" },
                { name: "orderIndex" },
            ],
            filter: "t1.pId='dcfaba2a-422b-4c2f-be7b-b634ec78a16a'",
        },
    }).then((res) => {

        if (res && res.responseCode === "100" && res.data.length > 0) {
            var nowData = [];
            res.data.forEach((item, index) => {
                nowData.push(
                    {
                        "role": item.name,
                        "code": item.code,
                        "reviewer": "",
                        "reviewerId": "",
                        "startDate": "",
                        "documentUpdate": "0",
                        "reference": []
                    }
                );
            })
            //文档更新列表数据源赋值
            //_this.$refs.cusDocumentList.setTableData(nowData);		
            _this.$store.getters.nebulogyForm.nebulogyForm.mocDocumentList = nowData;
        }
    })
        .catch((err) => {
            throw err;
        });
}

window.len = 0;
//120节点六选一逻辑（维修主任授权代理工程师选择 模块的6个人，必选一个）
window.getProjectHeadOrHOMApproveAndAssignmentApproval = function () {
    var _hom = _this.$refs.hom.getValue();
    var _projectHead = _this.$refs.projectHead.getValue();
    var _emDelegatedEngineer = _this.$refs.emDelegatedEngineer.getValue();
    var _nomineeProjectEngineer = _this.$refs.nomineeProjectEngineer.getValue();
    var _msmrWorkParty = _this.$refs.msmrWorkParty.getValue();
    var _otherWorkParty = _this.$refs.otherWorkParty.getValue();
    var _operatingNominee = _this.$refs.operatingNominee.getValue();

    len = 0;
    if (_hom != "") { len += 1; }
    if (_projectHead != "") { len += 1; }
    if (_emDelegatedEngineer != "") { len += 1; }
    if (_nomineeProjectEngineer != "") { len += 1; }
    if (_msmrWorkParty != "") { len += 1; }
    if (_otherWorkParty != "") { len += 1; }
    if (_operatingNominee != "") { len += 1; }

    if (len > 1 || len == 0) {
        //选择了多人或一人
        return false;
    }
    return true;
}

//拼接090技术审批人
//记录当前 090 审批人
window._current090ApprovalList = _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.technicalAssessmentApproval;
window.getTechnicalAssessmentApproval = function () {

    var _mocType = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocType;

    var _technicalAssessmentApproval = "";

    //pmoc 多个选人控件
    if (_mocType == "PMOC" || _mocType == "TMOC") {
        var _authorizedInstrumentEngineer = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.authorizedInstrumentEngineerId;
        var _processSafetyPCRSpecialist = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.processSafetyPCRSpecialistId;
        var _inspectionCorrosionMetallurgyPCRspecialist = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.inspectionCorrosionMetallurgyPCRspecialistId;

        if (_this.$refs.processEngineerTechnologist.getValue() == "") {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.processEngineerTechnologist = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.processEngineerTechnologistDisplayName = "";
        }
        var _processEngineerTechnologist = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.processEngineerTechnologist;

        if (_this.$refs.qmiSpecialist.getValue() == "") {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.qmiSpecialist = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.qmiSpecialistId = "";
        }
        var _qmiSpecialist = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.qmiSpecialist;

        if (_this.$refs.processControl.getValue() == "") {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.processControl = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.processControlId = "";
        }
        var _processControl = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.processControl;

        if (_this.$refs.instrumentDCSOTSecurity.getValue() == "") {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.instrumentDCSOTSecurity = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.instrumentDCSOTSecurityId = "";
        }
        var _instrumentDCSOTSecurity = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.instrumentDCSOTSecurityId;

        if (_this.$refs.electrical.getValue() == "") {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.electrical = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.electricalId = "";
        }
        var _electrical = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.electrical;

        if (_this.$refs.civil.getValue() == "") {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.civil = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.civilId = "";
        }
        var _civil = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.civil;

        if (_this.$refs.rotatingEngineer.getValue() == "") {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.rotatingEngineerId = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.rotatingEngineerId = "";
        }
        var _rotatingEngineer = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.rotatingEngineerId;

        if (_this.$refs.fireFighting.getValue() == "") {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.fireFighting = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.fireFightingDisplayName = "";
        }
        var _fireFighting = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.fireFighting;

        if (_this.$refs.hse.getValue() == "") {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.hse = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.hseDisplayName = "";
        }
        var _hse = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.hse;

        if (_this.$refs.others.getValue() == "") {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.others = "";
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.othersDisplayName = "";
        }
        var _others = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.others;



        if (_authorizedInstrumentEngineer != "") { _technicalAssessmentApproval += _authorizedInstrumentEngineer + ","; }
        if (_processSafetyPCRSpecialist != "") { _technicalAssessmentApproval += _processSafetyPCRSpecialist + ","; }
        if (_inspectionCorrosionMetallurgyPCRspecialist != "") { _technicalAssessmentApproval += _inspectionCorrosionMetallurgyPCRspecialist + ","; }

        if (_processEngineerTechnologist != "") { _technicalAssessmentApproval += _processEngineerTechnologist + ","; }
        if (_qmiSpecialist != "") { _technicalAssessmentApproval += _qmiSpecialist + ","; }
        if (_processControl != "") { _technicalAssessmentApproval += _processControl + ","; }
        if (_instrumentDCSOTSecurity != "") { _technicalAssessmentApproval += _instrumentDCSOTSecurity + ","; }
        if (_electrical != "") { _technicalAssessmentApproval += _electrical + ","; }
        if (_civil != "") { _technicalAssessmentApproval += _civil + ","; }
        if (_rotatingEngineer != "") { _technicalAssessmentApproval += _rotatingEngineer + ","; }
        if (_fireFighting != "") { _technicalAssessmentApproval += _fireFighting + ","; }
        if (_hse != "") { _technicalAssessmentApproval += _hse + ","; }
        if (_others != "") { _technicalAssessmentApproval += _others + ","; }

        //LSMOC 时，不走070节点， 故这两个选人控件的人，需要放到090里审批， PMOC、TMOC时，这两个人放070里审批
        //if (_mocType == "LSMOC") {
        //    var _authorizedTechnologist = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.authorizedTechnologistId;
        //    var _nominatedEngineer = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.nominatedEngineerId;

        //    if (_authorizedTechnologist != "") { _technicalAssessmentApproval += _authorizedTechnologist + ","; }
        //    if (_nominatedEngineer != "") { _technicalAssessmentApproval += _nominatedEngineer + ","; }
        //}

        _technicalAssessmentApproval = _technicalAssessmentApproval.slice(0, -1);
    }

    //tmoc 三个选人控件 （全部）
    if (_mocType == "LSMOC") {
        var _processSafetyPCRSpecialist = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.processSafetyPCRSpecialistId;
        var _inspectionCorrosionMetallurgyPCRspecialist = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.inspectionCorrosionMetallurgyPCRspecialistId;
        var _authorizedTechnologist = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.authorizedTechnologistId;

        if (_processSafetyPCRSpecialist != "") { _technicalAssessmentApproval += _processSafetyPCRSpecialist + ","; }
        if (_inspectionCorrosionMetallurgyPCRspecialist != "") { _technicalAssessmentApproval += _inspectionCorrosionMetallurgyPCRspecialist + ","; }
        if (_authorizedTechnologist != "") { _technicalAssessmentApproval += _authorizedTechnologist + ","; }

        _technicalAssessmentApproval = _technicalAssessmentApproval.slice(0, -1);
    }

    //技术审批节点人是否一样： 赋值前 初始值一样(没变)：0, 变了：1
    _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.isIdenticalTechnicalAssessmentApproval = 0;

    //当前090审批人
    var _090ApprovalList = _current090ApprovalList.split(",");
    //页面上090审批人（新的审批人）
    var _090ApprovalListByPage = _technicalAssessmentApproval.split(",");

    //遍历审批人是否一样
    //1、人数不一样，则：审批人不一样
    if (_090ApprovalList.length != _090ApprovalListByPage.length) {
        _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.isIdenticalTechnicalAssessmentApproval = 1;
    } else {
        const arr1 = _090ApprovalList.sort(), arr2 = _090ApprovalListByPage.sort();
        //对比 一样
        if ((arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i]))) {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.isIdenticalTechnicalAssessmentApproval = 0;
        }
        else {
            //不一样
            _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.isIdenticalTechnicalAssessmentApproval = 1;
        }
    }

    //090 节点审批人 赋值
    _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.technicalAssessmentApproval = _technicalAssessmentApproval;

}

//获取当前节点信息
//当前节点名称
window._activitysDisplayName = "";
window.getCurrentProcInst = function () {
    _this.$request({
        url: 'user-service/api/formActivity/currentProcInst',
        method: 'post',
        data: {
            destInstId: _this.getUrlData('destInstId') || '',
            procInstId: _this.getUrlData('procInstId') || ''
        }
    }).then(response => {
        if (response.currentActivitys != null && response.currentActivitys.length > 0 && response.responseCode === '100') {

            _activitysDisplayName = response.currentActivitys[0].displayName.zh_CN;

            _this.$store.getters.nebulogyForm.nebulogyForm.currentActivityName = response.currentActivitys[0].displayName;

            window.nodeId = response.currentActivitys[0].activityId;
            //重新加载附件列表，为了显示按钮
            let data = _this.$refs.dgFileList.getValue();
            let dataGrid = JSON.parse(JSON.stringify(data));
            _this.$refs.dgFileList.setValue(dataGrid);

            //初始化页面
            window.loadPage();
        }
    }).catch(error => {
        throw err;
    });
}

//生成邮件相关内容
window.setEmailContent = function () {

    var _mocApprovalWorkflow = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow;

    //邮件主题
    _this.$store.getters.nebulogyForm.nebulogyForm.emailContent.subject = "[" + _mocApprovalWorkflow.plant + "]" + _mocApprovalWorkflow.mocTitle;

    //Cc显示名
    if (_mocApprovalWorkflow.cc != "") {
        _this.$store.getters.nebulogyForm.nebulogyForm.ccApprover = _this.$refs.cc.displayValue;
    }

}

//140取值逻辑，用于MOC检查确认流程发起人
window.Approver140 = "";
window.Approver140Id = "";
window.getApprover140 = function () {
    var _emDelegatedEngineer = _this.$refs.emDelegatedEngineer.getValue();
    var _nomineeProjectEngineer = _this.$refs.nomineeProjectEngineer.getValue();
    var _otherWorkParty = _this.$refs.otherWorkParty.getValue();
    var _operatingNominee = _this.$refs.operatingNominee.getValue();

    var _mocApprovalWorkflow = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow;

    //120节点取人赋值
    if (_emDelegatedEngineer != "") {
        window.Approver140 = _mocApprovalWorkflow._emDelegatedEngineer;
        window.Approver140Id = _mocApprovalWorkflow.emDelegatedEngineer;
        return true;
    }

    if (_nomineeProjectEngineer != "") {
        window.Approver140 = _mocApprovalWorkflow._nomineeProjectEngineer;
        window.Approver140Id = _mocApprovalWorkflow.nomineeProjectEngineer;
        return true;
    }

    if (_otherWorkParty != "") {
        window.Approver140 = _mocApprovalWorkflow._otherWorkParty;
        window.Approver140Id = _mocApprovalWorkflow.otherWorkParty;
        return true;
    }

    if (_operatingNominee != "") {
        window.Approver140 = _mocApprovalWorkflow._operatingNominee;
        window.Approver140Id = _mocApprovalWorkflow.operatingNominee;
        return true;
    }
}

//提交前事件校验
window.submitCheck = function (arguments) {
    var _mocType = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocType;
    //获取变更编号
    if (_this.getView() == "launch" || _this.getView() == "reSubmit") {

        //变更编码 如果等于空 生成
        //变更编码 如果不等于空， 前面内容不一样， 生成
        var getMocNumber = false;
        var _mocAW = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow;
        var _mocNum = "PC-" + _mocAW.plant + "-" + _mocAW.unit + "-";
        if (_mocAW.mocNumber != "") {
            if (_mocAW.mocNumber.indexOf(_mocNum) > -1) {
                //不需要生成
                getMocNumber = false;
            }
            else {
                getMocNumber = true;
            }
        } else {
            getMocNumber = true;
        }
        if (_this.getView() == "launch") {
            _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.procSetId = _this.getUrlData("procSetId");
        }

        if (getMocNumber == true) {

            //获取变更编码
            _this.$request({
                url: "zhqp-external-rest/api/getProcessNumberByProcSetId",
                method: "post",
                data: { procSetId: _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.procSetId, prefixFolio: "PC-" + _mocAW.plant + "-" + _mocAW.unit + "-" },
            }).then((res) => {
                if (res.responseCode === '100') {
                    _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocNumber = res.processNumber;
                }
            }).catch((err) => {
                throw err;
            });
        }

        if (_this.getView() == "launch") {
            //清空多余的子表数据，不被结构化
            if (_mocType == "PMOC" || _mocType == "TMOC") {
                //显示：工艺过程评估、工程评估、文档更新（2个）、

                //标准公用工程
                _this.$store.getters.nebulogyForm.nebulogyForm.mocStandardUtilityServices = null;

                //组成
                _this.$store.getters.nebulogyForm.nebulogyForm.mocFluidComposition = null;

                //技术评估
                _this.$store.getters.nebulogyForm.nebulogyForm.mocTechnicalAssessment = null;

                //工程评估
                //mocEngineeringAssessment

                //工艺过程评估
                //mocProcessAssessment

            }

            if (_mocType == "LSMOC") {
                //显示：标准公用工程、组成、技术评估  工程评估、不显示文档

                //标准公用工程
                //mocStandardUtilityServices

                //组成
                //mocFluidComposition

                //技术评估
                //mocTechnicalAssessment

                //工程评估
                //mocEngineeringAssessment

                //工艺过程评估
                _this.$store.getters.nebulogyForm.nebulogyForm.mocProcessAssessment = null;

            }

            if (_mocType == "MSMRMOC") {
                //显示：文档

                //标准公用工程
                _this.$store.getters.nebulogyForm.nebulogyForm.mocStandardUtilityServices = null;

                //组成
                _this.$store.getters.nebulogyForm.nebulogyForm.mocFluidComposition = null;

                //技术评估
                _this.$store.getters.nebulogyForm.nebulogyForm.mocTechnicalAssessment = null;

                //工程评估
                _this.$store.getters.nebulogyForm.nebulogyForm.mocEngineeringAssessment = null;

                //工艺过程评估
                _this.$store.getters.nebulogyForm.nebulogyForm.mocProcessAssessment = null;
            }
        }

        //选人控件，赋值显示值（用于结构化）
        window.setDisplayName();
    }
    //生成邮件所需内容
    window.setEmailContent();

}

//页面提交、审批校验
window.approvalCheck = function (actionName, arguments) {

    var _mocType = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocType;

    var checkResult = true;

    //抄送页面
    if (_this.getView() == "view" && _this.getUrlData('ccLogId') != "") {
        //已阅按钮
        if (actionName == "Review") {

            //标记已阅，按钮禁用
            window.getIfReview(1);
            return false;
        }
    }

    let msgList = [];
    let _index = 0;
    //050节点审批通过按钮
    if (_activitysDisplayName.includes("050") && actionName == "Accept") {
        //五选一逻辑
        checkResult = window.getProjectHeadOrHOMApproveAndAssignmentApproval();
        if (checkResult == false) {
            checkResult = false;
            if (window.len > 1) {
                _index++;
                if (lang == 'zh_CN') {
                    msgList.push(_index + "、工作组确认只能选择1项！");
                } else {
                    msgList.push(_index + "、Confrim Work Party selected Only one.");
                }
            }

            if (window.len == 0) {
                _index++;
                if (lang == 'zh_CN') {
                    msgList.push(_index + "、请选择工作组确认人！");
                } else {
                    msgList.push(_index + "、Confrim Work Party selected.");
                }
            }
        }

        //050操作代表值不能一样
        if (_this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.operatingNominee != "" && _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.operatingNominee2 != "") {
            if (_this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.operatingNominee == _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.operatingNominee2) {
                checkResult = false;
                _index++;
                if (lang == 'zh_CN') {
                    msgList.push(_index + "、维修主任模块下的操作代表，与操作代表一致，请重新选择。");
                } else {
                    msgList.push(_index + "、The operation representative under the maintenance director module is the same as the operation representative. Please select again.");
                }
            }
        }
    }

    //拒绝  ：重新提交节点 
    if (actionName == "PA_JabilCancel" && _this.getView() == "reSubmit") {
        //填了拒绝意见
        checkResult = true;
        if (lang == 'zh_CN') {
            _index++;
            msgList.push(_index + "、取消成功！");

            _confirmButtonText = "确认"
            _cancelButtonText = "取消";

            _message = "请确认是否执行拒绝操作！";
        } else {
            _index++;
            msgList.push(_index + "、Cancel successfully!");

            _confirmButtonText = "Confirm"
            _cancelButtonText = "Cancel";

            _message = "Please confirm whether to execute Reject operation.";
        }

        _this.$confirm(_message, "提示", {
            dangerouslyUseHTMLString: true,
            confirmButtonText: _confirmButtonText,
            cancelButtonText: _cancelButtonText,
            type: 'warning'
        }).then(() => {
            /////////确认的操作//////////
            //点击拒绝按钮
            var _arguments = arguments[0];

            message = `${msgList.join("<br/><br/>")}`;
            _this.$message({
                dangerouslyUseHTMLString: true,
                message: message,
                type: "warning",
            });

            setTimeout(function () {
                _this.$refs.header.onAction(_arguments);
            }, 100)

            return false;

        }).catch(function (action) {
            /////////取消的操作//////
            return false;
        })

        return false;
    }

    //拒绝 退回
    if ((actionName == "PA_JabilCancel" || actionName == "PA_ReturnOriginator" || actionName == "Reject" || actionName == "PA_ReturnPrevious") && _this.getView() != "reSubmit") {
        if (_this.$refs.comments.getValue().length <= 0) {
            checkResult = false;
            if (lang == 'zh_CN') {
                _index++;
                msgList.push(_index + "、请填写意见说明!");
            } else {
                _index++;
                msgList.push(_index + "、Please enter the reject reason in the comments.");
            }
        }
    }

    //退回
    if (actionName == "Reject") {
        /* 
            点击退回按钮，
            根据当前节点，跳转指定节点
            140 退回 050
            160 退回 060
            040、060、070、080、090、150、190 退回 ：030
         */
        //退回节点
        _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.returnNode = _activitysDisplayName.substring(0, 3);

        if (_activitysDisplayName.includes("140")) {
            window.getReturnNode = "050";
        }

        if (_activitysDisplayName.includes("160")) {
            window.getReturnNode = "060";
        }

        if (_activitysDisplayName.includes("040") || _activitysDisplayName.includes("060") || _activitysDisplayName.includes("070") ||
            _activitysDisplayName.includes("080") || _activitysDisplayName.includes("090") || _activitysDisplayName.includes("150") ||
            _activitysDisplayName.includes("190")) {
            window.getReturnNode = "030";
            //需要 退回到030节点;
            //第一次走030：first030  (默认为：""，退回到030，等于1)
            _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.first030 = 1;
        }

        window.getReturnNode = "";
    }

    //审核通过
    if (actionName == "Accept") {
        //附件可编辑的情况下，校验名字必填
        //if ((_mocType == "PMOC" && (_activitysDisplayName.includes("010") || _activitysDisplayName.includes("140") ||
        //    _activitysDisplayName.includes("180") || _activitysDisplayName.includes("190"))) ||
        //    (_mocType == "MSMRMOC" && !_activitysDisplayName.includes("170"))) {
        //    var _error = true;
        //    var _dgFileList = _this.$store.getters.nebulogyForm.nebulogyForm.fileInfo;
        //    if (_dgFileList != null) {
        //        _dgFileList.forEach(v => {
        //            if (v.fileName == "" || v.fileName == null) {
        //                _error = false;
        //            }
        //        })
        //        if (_error == false) {
        //            checkResult = _error;
        //            if (lang == 'zh_CN') {
        //                _index++;
        //                msgList.push(_index + "、附件名称必填!");
        //            } else {
        //                _index++;
        //                msgList.push(_index + "、To be fileName by is required!");
        //            }
        //        }
        //    }
        //}

        //001节点，校验 变更标题需要必填
        if (_activitysDisplayName.includes("001") && _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocTitle == "") {

            checkResult = false;
            if (lang == 'zh_CN') {
                _index++;
                msgList.push(_index + "、请输入变更标题!");
            } else {
                _index++;
                msgList.push(_index + "、Please enter the MOC title.");
            }
        }

        //确认项目选项必填
        if (_this.$refs.isMOCConfirmItems.checkList.toString() == "") {
            checkResult = false;
            if (lang == 'zh_CN') {
                _index++;
                msgList.push(_index + "、请确认项目!");
                document.getElementsByName('确认项目')[0].focus();
            } else {
                _index++;
                msgList.push(_index + "、Please confirm the project.");
                document.getElementsByName('Confirm Items')[0].focus();
            }
        }

        //文档更新列表校验||
        if (_mocType == "PMOC" ||
            (_mocType == "MSMRMOC" && (_activitysDisplayName.includes("100") || _activitysDisplayName.includes("110") ||
                _activitysDisplayName.includes("170")))) {
            if (_this.$refs.documentLIst.propertyAttr.editable == true) {
                var docList = _this.$refs.documentLIst.getValue();
                var _error = true; var _error2 = true;
                docList.forEach(v => {
                    if ((v.documentNO == "" || v.documentNO == null) &&
                        (v.documentTitle == "" || v.documentTitle == null)) {
                        _error = false;
                    }

                    if (v.toBeUpdatedBy == "" || v.toBeUpdatedBy == null) {
                        _error2 = false;
                    }

                })
                if (_error == false) {
                    checkResult = _error;
                    if (lang == 'zh_CN') {
                        _index++;
                        msgList.push(_index + "、文档号或文档标题请至少填写一项!");
                    } else {
                        _index++;
                        msgList.push(_index + "、Please fill in at least one of the following: Document No. or Document title.");
                    }
                }

                if (_error2 == false) {
                    checkResult = _error2;
                    if (lang == 'zh_CN') {
                        _index++;
                        msgList.push(_index + "、文档更新人必填!");
                    } else {
                        _index++;
                        msgList.push(_index + "、To be updated by is required!");
                    }
                }
            }

            if (checkResult == true) {
                if (_activitysDisplayName.includes("010") || _activitysDisplayName.includes("020") ||
                    _activitysDisplayName.includes("030") || _activitysDisplayName.includes("090") ||
                    _activitysDisplayName.includes("070") || _activitysDisplayName.includes("190") ||
                    _activitysDisplayName.includes("110") ||
                    _activitysDisplayName.includes("170") || _activitysDisplayName.includes("100")) {
                    //验证文档更新列表，选择是，参考项，确认必填
                    var _message = _this.$refs.cusDocumentList.allCheckData();
                    if (_message != "") {
                        //var _confirmButtonText = "";
                        //var _cancelButtonText = "";
                        //if (lang == 'zh_CN') {
                        //    _confirmButtonText = "确认"
                        //    _cancelButtonText = "取消";
                        //} else {
                        //    _confirmButtonText = "Confirm"
                        //    _cancelButtonText = "Cancel";
                        //}

                        //_this.$confirm(_message, "提示", {
                        //    dangerouslyUseHTMLString: true,
                        //    confirmButtonText: _confirmButtonText,
                        //    cancelButtonText: _cancelButtonText,
                        //    type: 'warning'
                        //}).then(() => {
                        //    /////////确认的操作//////////
                        //    //点击审批通过按钮
                        //    var _arguments = arguments[0];
                        //    _this.$refs.header.onAction(_arguments);
                        //    return false;

                        //}).catch(function (action) {
                        //    /////////取消的操作//////
                        //    return false;
                        //})

                        //return false;


                        var _mocDocumentList = _this.$store.getters.nebulogyForm.nebulogyForm.mocDocumentList;
                        _mocDocumentList.forEach(v => {
                            if (v.reference.length == 0 && v.documentUpdate == "1") {
                                v.documentUpdate = "0";
                            }
                        })

                    }
                }
            }
        }

        //MOC检查确认流程，发起人赋值(流程结束时，赋值)
        //LSMOC
        if (_activitysDisplayName.includes("160")) {
            //取060审批人（仅一人）
            _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.mocImplementationRequestName = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow._hom;
            _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.mocImplementationRequestNameId = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.hom;
        }

        //PMOC  TMOC
        if (_activitysDisplayName.includes("190")) {
            //取140审批人（仅一人）
            window.getApprover140();
            _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.mocImplementationRequestName = window.Approver140;
            _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.mocImplementationRequestNameId = window.Approver140Id;
        }

        //MSMRMOC
        if (_activitysDisplayName.includes("170")) {
            //取170审批人（仅一人）
            _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.mocImplementationRequestName = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow._msmrWorkParty;
            _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.mocImplementationRequestNameId = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.msmrWorkParty;
        }
    }

    if (checkResult == true) {
        if (_activitysDisplayName.includes("030") && actionName == "Accept") {
            //030拼接090技术审批人
            window.getTechnicalAssessmentApproval();

            //是否重新走090
            _this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.isTechnicalApprover = _this.$refs.isTechnicalApprover.checkList.toString() == "" ? 0 : 1;
        }

        //重新生成 变更编码、生成邮件内容、选人控件，赋值显示值（用于结构化）
        window.submitCheck(null);


        //if (_this.getView() == "reSubmit" || _activitysDisplayName.includes("001")) {
        //    //生成邮件内容
        //    window.setEmailContent();
        //}
        if (((_mocType == "PMOC" || _mocType == "TMOC") && _activitysDisplayName.includes("050") && actionName == "Accept") ||
            (_mocType == "LSMOC" && _activitysDisplayName.includes("030") && actionName == "Accept")) {
            //拼接操作代表名称
            _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.operatingNominee2Name = _this.$refs.operatingNominee2.displayValue;
        }

        //文档更新人赋值
        var dgList = _this.$store.getters.nebulogyForm.nebulogyForm.mocDocumentUpdateList;
        if (dgList.length > 0) {
            dgList.forEach(v => {
                v.toBeUpdatedByDisplayName = v._toBeUpdatedBy
            })
        }

        //选人控件，赋值显示值（用于结构化）
        //window.setDisplayName();
    }

    if (checkResult == false) {
        if (msgList.length > 0) {
            let message = "";
            if (lang == 'zh_CN') {
                message = `表单数据有误，请检查！<br/><br/>${msgList.join("<br/><br/>")}`;
            } else {
                message = `Please check the form!<br/><br/>${msgList.join("<br/><br/>")}`;
            }

            _this.$message({
                dangerouslyUseHTMLString: true,
                message: message,
                type: "warning",
            });
            return false;
        }
        return true;
    }
    return checkResult;
}

//隐藏变更文档的删除按钮
window.hideDelButton = function () {
    //var _icon = document.getElementsByClassName('tabactions-icon')

    //for (var i = 0; i < _icon.length; i++) {
    //    _icon[i].style.display = 'none';
    //}
}

//发起页面初始状态页面显示隐藏
window.initialPage = function () {

    //隐藏：标准公用工程、组成、技术评估、工程评估、技术审批者选择、维修主任授权代理工程师选择
    if (_this.getView() == "launch") {

        //技术审批者选择、维修主任授权代理工程师选择 模块下，非必填字段隐藏
        if (_this.$refs.processEngineerTechnologist != null) { _this.$refs.processEngineerTechnologist.setProperty("cls", "sectionHide"); }
        if (_this.$refs.qmiSpecialist != null) { _this.$refs.qmiSpecialist.setProperty("cls", "sectionHide"); }
        if (_this.$refs.processControl != null) { _this.$refs.processControl.setProperty("cls", "sectionHide"); }
        if (_this.$refs.instrumentDCSOTSecurity != null) { _this.$refs.instrumentDCSOTSecurity.setProperty("cls", "sectionHide"); }
        if (_this.$refs.electrical != null) { _this.$refs.electrical.setProperty("cls", "sectionHide"); }
        if (_this.$refs.civil != null) { _this.$refs.civil.setProperty("cls", "sectionHide"); }
        if (_this.$refs.rotatingEngineer != null) { _this.$refs.rotatingEngineer.setProperty("cls", "sectionHide"); }
        if (_this.$refs.fireFighting != null) { _this.$refs.fireFighting.setProperty("cls", "sectionHide"); }
        if (_this.$refs.hse != null) { _this.$refs.hse.setProperty("cls", "sectionHide"); }
        if (_this.$refs.others != null) { _this.$refs.others.setProperty("cls", "sectionHide"); }
        if (_this.$refs.hom != null) { _this.$refs.hom.setProperty("cls", "sectionHide"); }
        if (_this.$refs.operatingNominee != null) { _this.$refs.operatingNominee.setProperty("cls", "sectionHide"); }
        if (_this.$refs.projectHead != null) { _this.$refs.projectHead.setProperty("cls", "sectionHide"); }
        if (_this.$refs.nomineeProjectEngineer != null) { _this.$refs.nomineeProjectEngineer.setProperty("cls", "sectionHide"); }
        if (_this.$refs.otherWorkParty != null) { _this.$refs.otherWorkParty.setProperty("cls", "sectionHide"); }

        if (_this.$refs.label2 != null) { _this.$refs.label2.setProperty("cls", "sectionHide"); }
        if (_this.$refs.isTechnicalApprover != null) { _this.$refs.isTechnicalApprover.setProperty("cls", "sectionHide"); }

        //必填字段
        if (_this.$refs.authorizedInstrumentEngineer != null) { _this.$refs.authorizedInstrumentEngineer.setProperty("cls", "sectionHide"); }
        if (_this.$refs.processSafetyPCRSpecialist != null) { _this.$refs.processSafetyPCRSpecialist.setProperty("cls", "sectionHide"); }
        if (_this.$refs.inspectionCorrosionMetallurgyPCRspecialist != null) { _this.$refs.inspectionCorrosionMetallurgyPCRspecialist.setProperty("cls", "sectionHide"); }
        if (_this.$refs.nominatedEngineer != null) { _this.$refs.nominatedEngineer.setProperty("cls", "sectionHide"); }

        if (_this.$refs.emDelegatedEngineer != null) { _this.$refs.emDelegatedEngineer.setProperty("cls", "sectionHide"); }

        _this.$refs.sectioncols6.setProperty("cls", "sectionHide");//    
        _this.$refs.sectioncols7.setProperty("cls", "sectionHide");//    
        _this.$refs.sectioncols8.setProperty("cls", "sectionHide");//   
        _this.$refs.sectioncols9.setProperty("cls", "sectionHide");//   

        //设置非必填 MSMRMOC时必填(技术审批者选择 维修主任授权代理工程师选择)
        _this.$refs.authorizedTechnologist.propertyAttr.required = false;
        _this.$refs.systemGuardian.propertyAttr.required = false;
        _this.$refs.leadProcessControl.propertyAttr.required = false;
        _this.$refs.msmrWorkParty.propertyAttr.required = false;

        _this.$refs.sectioncols10.setProperty("cls", "sectionHide");//   
        _this.$refs.sectioncols11.setProperty("cls", "sectionHide");//   

    }
    else {
        _this.$refs.sectioncols6.hide();
        _this.$refs.sectioncols7.hide();
        _this.$refs.sectioncols8.hide();
        _this.$refs.sectioncols9.hide();

        _this.$refs.sectioncols10.hide();
        _this.$refs.sectioncols11.hide();
    }

    //隐藏：变更信息里的部分内容	
    _this.$refs.costEstimationRMB50.hide();
    _this.$refs.CostEstimationRMB10.hide();

    _this.$refs.processEngineerTechnologistMOCcInformation.hide();


}

//页面加载 初始化
window.loadPage = function () {

    var _mocType = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocType;

    //紧急变更审查  赋初始值
    if (_this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.emergencyMOCreviewAfterlmplementation == "") {
        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.emergencyMOCreviewAfterlmplementation = "no";
    }

    //发起、重新提交页面，显示逻辑
    if (_this.getView() == "launch" || _this.getView() == "reSubmit") {
        //页面显示隐藏
        window.initialPage();

        //工厂工程师
        if (_mocType == "") {
            _this.$refs.mocCategory.hide();
        }
    } else {
        //取消 sectionShow  sectionHide 样式
        _this.$refs.sectioncols10.setProperty("cls", "");//   
        _this.$refs.sectioncols11.setProperty("cls", "");//   

        if (_this.$refs.processEngineerTechnologist != null) { _this.$refs.processEngineerTechnologist.setProperty("cls", ""); }
        if (_this.$refs.qmiSpecialist != null) { _this.$refs.qmiSpecialist.setProperty("cls", ""); }
        if (_this.$refs.processControl != null) { _this.$refs.processControl.setProperty("cls", ""); }
        if (_this.$refs.instrumentDCSOTSecurity != null) { _this.$refs.instrumentDCSOTSecurity.setProperty("cls", ""); }
        if (_this.$refs.electrical != null) { _this.$refs.electrical.setProperty("cls", ""); }
        if (_this.$refs.civil != null) { _this.$refs.civil.setProperty("cls", ""); }
        if (_this.$refs.rotatingEngineer != null) { _this.$refs.rotatingEngineer.setProperty("cls", ""); }
        if (_this.$refs.fireFighting != null) { _this.$refs.fireFighting.setProperty("cls", ""); }
        if (_this.$refs.hse != null) { _this.$refs.hse.setProperty("cls", ""); }
        if (_this.$refs.others != null) { _this.$refs.others.setProperty("cls", ""); }
        if (_this.$refs.hom != null) { _this.$refs.hom.setProperty("cls", ""); }
        if (_this.$refs.operatingNominee != null) { _this.$refs.operatingNominee.setProperty("cls", ""); }
        if (_this.$refs.projectHead != null) { _this.$refs.projectHead.setProperty("cls", ""); }
        if (_this.$refs.nomineeProjectEngineer != null) { _this.$refs.nomineeProjectEngineer.setProperty("cls", ""); }
        if (_this.$refs.otherWorkParty != null) { _this.$refs.otherWorkParty.setProperty("cls", ""); }

        if (_this.$refs.label2 != null) { _this.$refs.label2.setProperty("cls", ""); }
        if (_this.$refs.isTechnicalApprover != null) { _this.$refs.isTechnicalApprover.setProperty("cls", ""); }

        //必填字段
        if (_this.$refs.authorizedInstrumentEngineer != null) { _this.$refs.authorizedInstrumentEngineer.setProperty("cls", ""); }
        if (_this.$refs.processSafetyPCRSpecialist != null) { _this.$refs.processSafetyPCRSpecialist.setProperty("cls", ""); }
        if (_this.$refs.inspectionCorrosionMetallurgyPCRspecialist != null) { _this.$refs.inspectionCorrosionMetallurgyPCRspecialist.setProperty("cls", ""); }
        if (_this.$refs.nominatedEngineer != null) { _this.$refs.nominatedEngineer.setProperty("cls", ""); }

        if (_this.$refs.emDelegatedEngineer != null) { _this.$refs.emDelegatedEngineer.setProperty("cls", ""); }

    }

    if (_this.getView() == "launch" && _this.getUrlData('draftId') == '') {
        //获取“评估”所有数据
        window.getMOCTechnicalAssessmentList();
    }

    _this.$refs.mocPrioritization.hide();
    _this.$refs.mocGrade.hide();

    //重新提交 和草稿页面一样
    if (_this.getView() == "reSubmit" ||
        (_this.getView() == "launch" && _this.getUrlData('draftId') != '')) {
        if (_mocType == "") {
            _this.$refs.mocCategory.hide();
        }
        else {

            _this.$refs.mocType.propertyAttr.editable = false;
        }

        //_this.$refs.sectioncols9.setProperty("cls", "sectionHide");//        
        _this.$refs.sectioncols9.hide();
        if (_mocType == "PMOC" || _mocType == "TMOC") {
            _this.$refs.sectioncols4.propertyAttr.editable = false;

            _this.$refs.sectioncols5.hide();
            _this.$refs.sectioncols12.hide();
            _this.$refs.sectioncols13.hide();
            //_this.$refs.sectioncols14.setProperty("cls", "sectionHide");//           
            _this.$refs.sectioncols14.hide();
            _this.$refs.sectioncols20.hide();
            _this.$refs.sectioncols16.hide();
            _this.$refs.sectioncols17.hide();
            _this.$refs.sectioncols18.hide();

            _this.$refs.mocCategory.show();

            _this.$refs.costEstimationRMB50.show();
            _this.$refs.CostEstimationRMB10.hide();

            if (_mocType == "PMOC") {
                _this.$refs.mocPrioritization.show();
                _this.$refs.mocGrade.show();

                //加载变更类别
                window.loadMOCCategory(0);
            }

            //加载单元
            window.selectUnit(0);

            //工艺工程师
            _this.$refs.processEngineerTechnologistMOCcInformation.hide();
        }

        if (_mocType == "LSMOC") {
            _this.$refs.sectioncols5.hide();
            _this.$refs.sectioncols12.hide();
            _this.$refs.sectioncols13.hide();
            //_this.$refs.sectioncols14.setProperty("cls", "sectionHide");//           
            _this.$refs.sectioncols14.hide();

            //标准公用工程
            //_this.$refs.sectioncols6.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols6.show();

            _this.$refs.mocStandardUtilityServices.propertyAttr.editable = false;

            //组成
            // _this.$refs.sectioncols7.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols7.show();
            _this.$refs.mocfluidComposition.propertyAttr.editable = false;

            //技术评估
            //_this.$refs.sectioncols8.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols8.show();
            _this.$refs.mocTechnicalAssessment.propertyAttr.editable = false;

            //工程评估
            //_this.$refs.sectioncols9.setProperty("cls", "sectionShow");
            //_this.$refs.sectioncols9.show();
            _this.$refs.mocEngineeringAssessment.propertyAttr.editable = false;

            _this.$refs.sectioncols16.hide();
            _this.$refs.sectioncols17.hide();
            _this.$refs.sectioncols18.hide();

            _this.$refs.mocCategory.hide();

            _this.$refs.costEstimationRMB50.hide();
            _this.$refs.CostEstimationRMB10.hide();

            //加载单元
            window.selectUnit(0);

        }

        if (_mocType == "MSMRMOC") {
            _this.$refs.sectioncols5.hide();
            //_this.$refs.sectioncols10.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols10.show();
            //_this.$refs.sectioncols11.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols11.show();
            _this.$refs.sectioncols12.hide();
            _this.$refs.sectioncols13.hide();
            //_this.$refs.sectioncols14.setProperty("cls", "sectionHide");//
            _this.$refs.sectioncols14.hide();
            _this.$refs.sectioncols20.hide();
            _this.$refs.sectioncols16.hide();
            _this.$refs.sectioncols17.hide();
            _this.$refs.sectioncols18.hide();

            _this.$refs.mocCategory.hide();
            _this.$refs.mocFocalPoint.hide();
            _this.$refs.costEstimationRMB50.hide();
            _this.$refs.CostEstimationRMB10.hide();
            _this.$refs.processEngineerTechnologistMOCcInformation.show();

            //技术评估
            _this.$refs.authorizedInstrumentEngineer.hide();
            _this.$refs.processEngineerTechnologist.hide();
            _this.$refs.processSafetyPCRSpecialist.hide();
            _this.$refs.qmiSpecialist.hide();
            _this.$refs.inspectionCorrosionMetallurgyPCRspecialist.hide();
            _this.$refs.processControl.hide();
            _this.$refs.instrumentDCSOTSecurity.hide();
            _this.$refs.nominatedEngineer.hide();
            _this.$refs.electrical.hide();
            _this.$refs.civil.hide();
            _this.$refs.rotatingEngineer.hide();
            _this.$refs.fireFighting.hide();
            _this.$refs.hse.hide();
            _this.$refs.others.hide();
            _this.$refs.label2.hide();
            _this.$refs.isTechnicalApprover.hide();

            //设置必填
            _this.$refs.systemGuardian.propertyAttr.required = true;
            _this.$refs.authorizedTechnologist.propertyAttr.required = true;
            _this.$refs.leadProcessControl.propertyAttr.required = true;

            //维修主任授权代理工程师选择
            _this.$refs.hom.hide();
            _this.$refs.projectHead.hide();
            _this.$refs.emDelegatedEngineer.hide();
            _this.$refs.nomineeProjectEngineer.hide();
            _this.$refs.otherWorkParty.hide();
            _this.$refs.operatingNominee.hide();

            //设置必填
            _this.$refs.msmrWorkParty.propertyAttr.required = true;

            //加载单元
            window.selectUnit(0);
        }
    }

    //审批页面显示逻辑
    if (_this.getView() == "approval") {

        _this.$refs.mocNumber.show();
        //装置经理后的提示
        _this.$refs.label4.hide();

        //清空是否技术重新审批
        _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.isTechnicalApprover = 0

        if (_mocType == "PMOC" || _mocType == "TMOC") {
            //申请人模块只读
            //变更信息模块，部分可编辑(设置所有不可以编辑，根据节点设置可编辑)
            //_this.$refs.mocNumber.propertyAttr.editable=false;
            _this.$refs.mocType.propertyAttr.editable = false;
            _this.$refs.mocCategory.propertyAttr.editable = false;
            _this.$refs.plantEngineer.propertyAttr.editable = false;
            _this.$refs.plant.propertyAttr.editable = false;
            _this.$refs.unit.propertyAttr.editable = false;
            _this.$refs.mocFocalPoint.propertyAttr.editable = false;
            _this.$refs.costEstimationRMB50.propertyAttr.editable = false;
            _this.$refs.emergencyMOCreviewAfterlmplementation.propertyAttr.editable = false;
            _this.$refs.processEngineerTechnologistMOCcInformation.propertyAttr.editable = false;
            _this.$refs.mocPrioritization.propertyAttr.editable = false;
            _this.$refs.mocGrade.propertyAttr.editable = false;
            _this.$refs.mocTitle.propertyAttr.editable = false;
            _this.$refs.CostEstimationRMB10.propertyAttr.editable = false;
            _this.$refs.mocDescription.propertyAttr.editable = false;
            _this.$refs.cc.propertyAttr.editable = false;
            _this.$refs.CostEstimationRMB10.hide();
            _this.$refs.costEstimationRMB50.show();

            //工艺工程师
            _this.$refs.processEngineerTechnologistMOCcInformation.hide();

            //变更优先级
            _this.$refs.mocPrioritization.propertyAttr.required = true;
            _this.$refs.mocGrade.propertyAttr.required = true;

            if (_activitysDisplayName.includes("001")) {
                _this.$refs.mocTitle.propertyAttr.editable = true;
                _this.$refs.mocDescription.propertyAttr.editable = true;
                _this.$refs.cc.propertyAttr.editable = false;
            }

            if (_activitysDisplayName.includes("030")) {
                _this.$refs.costEstimationRMB50.propertyAttr.editable = true;
            }

            //10%成本估算
            if (_activitysDisplayName.includes("050")) {
            }
            if (_activitysDisplayName.includes("050") || _activitysDisplayName.includes("140") || _activitysDisplayName.includes("180")) {
                _this.$refs.CostEstimationRMB10.show();
                _this.$refs.CostEstimationRMB10.propertyAttr.editable = true;
                _this.$refs.CostEstimationRMB10.propertyAttr.required = true;
            }

            if (_activitysDisplayName.includes("050") || _activitysDisplayName.includes("120") || _activitysDisplayName.includes("190")) {
                _this.$refs.CostEstimationRMB10.show();
                _this.$refs.CostEstimationRMB10.propertyAttr.editable = false;
                _this.$refs.CostEstimationRMB10.propertyAttr.required = true;
            }

            //装置经理选择模块	
            _this.$refs.sectioncols5.show();

            //设置必填
            _this.$refs.unitManager.propertyAttr.required = true;

            _this.$refs.unitManager.propertyAttr.editable = false;
            _this.$refs.otherUnitManagerifneed.propertyAttr.editable = false;

            if (_activitysDisplayName.includes("001")) {
                _this.$refs.unitManager.propertyAttr.required = false;
            }

            if (_activitysDisplayName.includes("010")) {
                _this.$refs.unitManager.propertyAttr.editable = true;
                _this.$refs.otherUnitManagerifneed.propertyAttr.editable = true;
            }

            if (_activitysDisplayName.includes("001")) {
                _this.$refs.unitManager.propertyAttr.editable = false;
                _this.$refs.otherUnitManagerifneed.propertyAttr.editable = false;
            }

            //标准公用工程模块
            //_this.$refs.sectioncols6.setProperty("cls", "sectionHide");//           
            _this.$refs.sectioncols6.hide();

            //组成
            //_this.$refs.sectioncols7.setProperty("cls", "sectionHide");//      
            _this.$refs.sectioncols7.hide();

            //技术评估_PMOCTMOC显示
            //_this.$refs.sectioncols8.setProperty("cls", "sectionHide");//       
            _this.$refs.sectioncols8.hide();

            //工程评估 
            //_this.$refs.sectioncols9.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols9.show();
            if (_activitysDisplayName.includes("080") || _activitysDisplayName.includes("050") ||
                _activitysDisplayName.includes("140") || _activitysDisplayName.includes("180") ||
                _activitysDisplayName.includes("001")) {
                //不可编辑
                _this.$refs.mocEngineeringAssessment.propertyAttr.editable = false;
            } else {
                _this.$refs.mocEngineeringAssessment.propertyAttr.editable = true;

            }

            if (_activitysDisplayName.includes("001")) {
                //工程评估 第一列不必填
                _this.$refs.mocEngineeringAssessment.columnData[0].required = false;
            }

            //技术审批者模块	
            //_this.$refs.sectioncols10.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols10.show();

            _this.$refs.authorizedInstrumentEngineer.propertyAttr.editable = false;
            _this.$refs.processEngineerTechnologist.propertyAttr.editable = false;
            _this.$refs.processSafetyPCRSpecialist.propertyAttr.editable = false;
            _this.$refs.qmiSpecialist.propertyAttr.editable = false;
            _this.$refs.inspectionCorrosionMetallurgyPCRspecialist.propertyAttr.editable = false;
            _this.$refs.processControl.propertyAttr.editable = false;
            _this.$refs.authorizedTechnologist.propertyAttr.editable = false;
            _this.$refs.instrumentDCSOTSecurity.propertyAttr.editable = false;
            _this.$refs.nominatedEngineer.propertyAttr.editable = false;
            _this.$refs.electrical.propertyAttr.editable = false;
            _this.$refs.systemGuardian.propertyAttr.editable = false;
            _this.$refs.civil.propertyAttr.editable = false;
            _this.$refs.leadProcessControl.propertyAttr.editable = false;
            _this.$refs.rotatingEngineer.propertyAttr.editable = false;
            _this.$refs.fireFighting.propertyAttr.editable = false;
            _this.$refs.hse.propertyAttr.editable = false;
            _this.$refs.others.propertyAttr.editable = false;
            _this.$refs.isTechnicalApprover.propertyAttr.editable = false;

            _this.$refs.systemGuardian.hide();
            _this.$refs.leadProcessControl.hide();

            if (_activitysDisplayName.includes("030")) {
                _this.$refs.authorizedInstrumentEngineer.propertyAttr.editable = true;
                _this.$refs.processEngineerTechnologist.propertyAttr.editable = true;
                _this.$refs.processSafetyPCRSpecialist.propertyAttr.editable = true;
                _this.$refs.qmiSpecialist.propertyAttr.editable = true;
                _this.$refs.inspectionCorrosionMetallurgyPCRspecialist.propertyAttr.editable = true;
                _this.$refs.processControl.propertyAttr.editable = true;
                _this.$refs.authorizedTechnologist.propertyAttr.editable = true;
                _this.$refs.instrumentDCSOTSecurity.propertyAttr.editable = true;
                _this.$refs.nominatedEngineer.propertyAttr.editable = true;
                _this.$refs.electrical.propertyAttr.editable = true;
                _this.$refs.systemGuardian.propertyAttr.editable = true;
                _this.$refs.civil.propertyAttr.editable = true;
                _this.$refs.leadProcessControl.propertyAttr.editable = true;
                _this.$refs.rotatingEngineer.propertyAttr.editable = true;
                _this.$refs.fireFighting.propertyAttr.editable = true;
                _this.$refs.hse.propertyAttr.editable = true;
                _this.$refs.others.propertyAttr.editable = true;

                //退回030，显示是否技术审批的选择
                if (_this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.returnNode != "") {
                    _this.$refs.isTechnicalApprover.propertyAttr.editable = true;
                }
            }

            //除010020其他必填
            if (!_activitysDisplayName.includes("010") && !_activitysDisplayName.includes("020") && !_activitysDisplayName.includes("001")) {
                //设置必填
                _this.$refs.authorizedInstrumentEngineer.propertyAttr.required = true;
                _this.$refs.processSafetyPCRSpecialist.propertyAttr.required = true;
                _this.$refs.inspectionCorrosionMetallurgyPCRspecialist.propertyAttr.required = true;
                _this.$refs.authorizedTechnologist.propertyAttr.required = true;
                _this.$refs.nominatedEngineer.propertyAttr.required = true;
            }

            //维修主任授权代理工程师选择模块
            //_this.$refs.sectioncols11.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols11.show();
            _this.$refs.hom.propertyAttr.editable = false;
            _this.$refs.projectHead.propertyAttr.editable = false;
            _this.$refs.emDelegatedEngineer.propertyAttr.editable = false;
            _this.$refs.nomineeProjectEngineer.propertyAttr.editable = false;
            _this.$refs.otherWorkParty.propertyAttr.editable = false;
            _this.$refs.operatingNominee.propertyAttr.editable = false;
            _this.$refs.msmrWorkParty.propertyAttr.editable = false;

            _this.$refs.msmrWorkParty.hide();

            if (_activitysDisplayName.includes("050")) {
                _this.$refs.hom.propertyAttr.editable = true;
                _this.$refs.projectHead.propertyAttr.editable = true;
                _this.$refs.emDelegatedEngineer.propertyAttr.editable = true;
                _this.$refs.nomineeProjectEngineer.propertyAttr.editable = true;
                _this.$refs.otherWorkParty.propertyAttr.editable = true;
                _this.$refs.operatingNominee.propertyAttr.editable = true;
                _this.$refs.msmrWorkParty.propertyAttr.editable = true;
            }

            if (_activitysDisplayName.includes("120")) {

                _this.$refs.hom.propertyAttr.editable = false;
                _this.$refs.projectHead.propertyAttr.editable = false;
                _this.$refs.emDelegatedEngineer.propertyAttr.editable = false;
                _this.$refs.nomineeProjectEngineer.propertyAttr.editable = false;
                _this.$refs.otherWorkParty.propertyAttr.editable = false;
                _this.$refs.operatingNominee.propertyAttr.editable = false;
                //_this.$refs.msmrWorkParty.propertyAttr.editable = false;

                //维修主任 不为空，EM委派工程师 必填
                if (_this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.hom != "") {
                    _this.$refs.emDelegatedEngineer.propertyAttr.required = true;
                    _this.$refs.emDelegatedEngineer.propertyAttr.editable = true;
                }
                //项目负责人 不为空，提名项目工程师 必填
                if (_this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.projectHead != "") {
                    _this.$refs.nomineeProjectEngineer.propertyAttr.required = true;
                    _this.$refs.nomineeProjectEngineer.propertyAttr.editable = true;
                }
            }

            //操作代表授权和就绪检查人选择
            _this.$refs.sectioncols12.show();
            _this.$refs.operatingNominee2.propertyAttr.editable = false;

            if (_activitysDisplayName.includes("050")) {
                _this.$refs.operatingNominee2.propertyAttr.editable = true;
            }

            //除 某些节点，其他必填
            if (!_activitysDisplayName.includes("010") && !_activitysDisplayName.includes("020") &&
                !_activitysDisplayName.includes("030") && !_activitysDisplayName.includes("090") &&
                !_activitysDisplayName.includes("070") && !_activitysDisplayName.includes("080") &&
                !_activitysDisplayName.includes("001")) {
                _this.$refs.operatingNominee2.propertyAttr.required = true;
            }
            else {
                _this.$refs.operatingNominee2.propertyAttr.required = false;
            }


            //预计完成日期模块
            _this.$refs.sectioncols13.show();
            _this.$refs.implementationTargetDate.propertyAttr.editable = false;

            if (_activitysDisplayName.includes("140")) {
                _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.implementationTargetDate = "";
                _this.$refs.implementationTargetDate.propertyAttr.editable = true;

                //设置完成时间，最小值为当天往后的值

                var date = new Date();
                var minDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);

                var minfDate = _this.$format(minDate, 'YYYY-MM-DD');
                _this.$refs.implementationTargetDate.setMinValue(minfDate);
            }

            if (_activitysDisplayName.includes("140") || _activitysDisplayName.includes("180") || _activitysDisplayName.includes("190")) {
                //设置必填
                _this.$refs.implementationTargetDate.propertyAttr.required = true;
            }

            //工艺过程评估模块
            //_this.$refs.sectioncols14.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols14.show();
            _this.$refs.mocProcessAssessment.propertyAttr.editable = false;

            if (_activitysDisplayName.includes("020") || _activitysDisplayName.includes("030") ||
                _activitysDisplayName.includes("090") || _activitysDisplayName.includes("070") ||
                _activitysDisplayName.includes("190") || _activitysDisplayName.includes("010")) {
                _this.$refs.mocProcessAssessment.propertyAttr.editable = true;
            }
            else {
                _this.$refs.mocProcessAssessment.propertyAttr.editable = false;
            }

            if (_activitysDisplayName.includes("001")) {
                //工艺工程评估 第一列不必填
                _this.$refs.mocProcessAssessment.columnData[0].required = false;
            }

            //文档更新列表

            _this.$refs.sectioncols16.show();
            _this.$refs.sectioncols17.show();

            if (_mocType == "TMOC") {
                //不显示文档更新列表（两个）
                _this.$refs.sectioncols16.hide();
                _this.$refs.sectioncols17.hide();
            }

            if (_mocType == "PMOC") {
                if (_activitysDisplayName.includes("010") || _activitysDisplayName.includes("020") ||
                    _activitysDisplayName.includes("030") || _activitysDisplayName.includes("090") ||
                    _activitysDisplayName.includes("070") || _activitysDisplayName.includes("190")) {
                    //文档更新列表可编辑
                    _this.$refs.cusDocumentList.setEditable(true);
                    _this.$refs.documentLIst.propertyAttr.editable = true;
                }
                else {
                    //文档更新列表不可编辑
                    _this.$refs.cusDocumentList.setEditable(false);
                    _this.$refs.documentLIst.propertyAttr.editable = false;
                    _this.$refs.documentLIst.propertyAttr.enableAdd = false;
                    //_this.$refs.documentLIst.columnData[4].pcDisplay=false;
                    //隐藏更新文档的删除按钮
                    window.hideDelButton();
                }
            }

            //附件模块		
            if (_activitysDisplayName.includes("140") || _activitysDisplayName.includes("180") ||
                _activitysDisplayName.includes("190")) {
                _this.$refs.dgFileList.propertyAttr.editable = false;
                _this.$refs.btnUpload.hide();
            }

        }

        if (_mocType == "LSMOC") {
            //申请人模块只读
            //变更信息模块，部分可编辑(设置所有不可以编辑，根据节点设置可编辑)
            //.$refs.mocNumber.propertyAttr.editable=false;
            _this.$refs.mocType.propertyAttr.editable = false;
            _this.$refs.plantEngineer.propertyAttr.editable = false;
            _this.$refs.plant.propertyAttr.editable = false;
            _this.$refs.unit.propertyAttr.editable = false;
            _this.$refs.mocFocalPoint.propertyAttr.editable = false;
            _this.$refs.costEstimationRMB50.propertyAttr.editable = false;
            _this.$refs.emergencyMOCreviewAfterlmplementation.propertyAttr.editable = false;
            _this.$refs.mocTitle.propertyAttr.editable = false;
            _this.$refs.mocDescription.propertyAttr.editable = false;
            _this.$refs.cc.propertyAttr.editable = false;

            _this.$refs.mocCategory.hide();
            //_this.$refs.mocPrioritization.hide();
            //_this.$refs.mocGrade.hide();
            //_this.$refs.costEstimationRMB50.show();
            _this.$refs.CostEstimationRMB10.hide();
            _this.$refs.processEngineerTechnologistMOCcInformation.hide();

            if (_activitysDisplayName.includes("001")) {
                _this.$refs.mocTitle.propertyAttr.editable = true;
                _this.$refs.mocDescription.propertyAttr.editable = true;
                _this.$refs.cc.propertyAttr.editable = false;
            }

            _this.$refs.costEstimationRMB50.hide();

            if (_activitysDisplayName.includes("050") || _activitysDisplayName.includes("140") || _activitysDisplayName.includes("180")) {
                _this.$refs.CostEstimationRMB10.show();
                _this.$refs.CostEstimationRMB10.propertyAttr.editable = true;
            }

            //装置经理选择模块	
            _this.$refs.sectioncols5.show();

            _this.$refs.unitManager.propertyAttr.editable = false;
            _this.$refs.otherUnitManagerifneed.propertyAttr.editable = false;

            _this.$refs.label4.show();

            //1）030_MOCFocalPointTechnicalSignnatorySelect节点第一次显示,可编辑，2）除060节点外，均不可修改
            if (_activitysDisplayName.includes("030") || _activitysDisplayName.includes("060")) {
                _this.$refs.unitManager.propertyAttr.editable = true;
                _this.$refs.unitManager.propertyAttr.required = false;

                _this.$refs.otherUnitManagerifneed.propertyAttr.editable = true;
            }

            //标准公用工程模块
            //_this.$refs.sectioncols6.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols6.show();

            _this.$refs.mocStandardUtilityServices.propertyAttr.editable = false;
            if (_activitysDisplayName.includes("150") || _activitysDisplayName.includes("040") ||
                _activitysDisplayName.includes("160") || _activitysDisplayName.includes("030") ||
                _activitysDisplayName.includes("080") || _activitysDisplayName.includes("060")) {
                _this.$refs.mocStandardUtilityServices.propertyAttr.editable = true;
            }
            //组成
            //_this.$refs.sectioncols7.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols7.show();
            _this.$refs.mocfluidComposition.propertyAttr.editable = false;
            if (_activitysDisplayName.includes("150") || _activitysDisplayName.includes("040") ||
                _activitysDisplayName.includes("160") || _activitysDisplayName.includes("030") ||
                _activitysDisplayName.includes("080") || _activitysDisplayName.includes("060")) {
                _this.$refs.mocfluidComposition.propertyAttr.editable = true;
            }

            //技术评估
            //_this.$refs.sectioncols8.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols8.show();

            //LSMOC 技术评估非必填
            _this.$refs.mocTechnicalAssessment.columnData[0].required = false;

            _this.$refs.mocTechnicalAssessment.propertyAttr.editable = false;
            if (_activitysDisplayName.includes("150") || _activitysDisplayName.includes("040") ||
                _activitysDisplayName.includes("160") || _activitysDisplayName.includes("030") ||
                _activitysDisplayName.includes("080") || _activitysDisplayName.includes("060")) {
                _this.$refs.mocTechnicalAssessment.propertyAttr.editable = true;
            }

            if (_activitysDisplayName.includes("001")) {
                //技术评估第一列不必填
                _this.$refs.mocTechnicalAssessment.columnData[0].required = false;
            }

            //工程评估
            //_this.$refs.sectioncols9.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols9.show();

            //LSMOC 工程评估非必填
            _this.$refs.mocEngineeringAssessment.columnData[0].required = false;

            if (_activitysDisplayName.includes("001")) {
                //工程评估 第一列不必填
                _this.$refs.mocEngineeringAssessment.columnData[0].required = false;
            }

            //技术审批者模块	
            //_this.$refs.sectioncols10.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols10.show();

            _this.$refs.processSafetyPCRSpecialist.propertyAttr.editable = false;
            _this.$refs.inspectionCorrosionMetallurgyPCRspecialist.propertyAttr.editable = false;
            _this.$refs.authorizedTechnologist.propertyAttr.editable = false;

            _this.$refs.authorizedInstrumentEngineer.hide();
            _this.$refs.processEngineerTechnologist.hide();
            _this.$refs.qmiSpecialist.hide();
            _this.$refs.processControl.hide();
            _this.$refs.instrumentDCSOTSecurity.hide();
            _this.$refs.nominatedEngineer.hide();
            _this.$refs.electrical.hide();
            _this.$refs.systemGuardian.hide();
            _this.$refs.civil.hide();
            _this.$refs.leadProcessControl.hide();
            _this.$refs.rotatingEngineer.hide();
            _this.$refs.fireFighting.hide();
            _this.$refs.hse.hide();
            _this.$refs.others.hide();
            _this.$refs.isTechnicalApprover.hide();
            _this.$refs.label2.hide();

            if (_activitysDisplayName.includes("030")) {
                _this.$refs.authorizedInstrumentEngineer.propertyAttr.editable = true;
                _this.$refs.processEngineerTechnologist.propertyAttr.editable = true;
                _this.$refs.processSafetyPCRSpecialist.propertyAttr.editable = true;
                _this.$refs.qmiSpecialist.propertyAttr.editable = true;
                _this.$refs.inspectionCorrosionMetallurgyPCRspecialist.propertyAttr.editable = true;
                _this.$refs.processControl.propertyAttr.editable = true;
                _this.$refs.authorizedTechnologist.propertyAttr.editable = true;
                _this.$refs.instrumentDCSOTSecurity.propertyAttr.editable = true;
                _this.$refs.nominatedEngineer.propertyAttr.editable = true;
                _this.$refs.electrical.propertyAttr.editable = true;
                _this.$refs.systemGuardian.propertyAttr.editable = true;
                _this.$refs.civil.propertyAttr.editable = true;
                _this.$refs.leadProcessControl.propertyAttr.editable = true;
                _this.$refs.rotatingEngineer.propertyAttr.editable = true;
                _this.$refs.fireFighting.propertyAttr.editable = true;
                _this.$refs.hse.propertyAttr.editable = true;
                _this.$refs.others.propertyAttr.editable = true;
                //090退回030逻辑
                _this.$refs.isTechnicalApprover.propertyAttr.editable = false;

                //清空是否技术重新审批
                _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.isTechnicalApprover = 0

                //退回030，显示是否技术审批的选择
                if (_this.$store.getters.nebulogyForm.nebulogyForm.mocLogic.returnNode != "") {
                    _this.$refs.isTechnicalApprover.show();
                    _this.$refs.isTechnicalApprover.propertyAttr.editable = true;
                }
            }

            //_this.$refs.processSafetyPCRSpecialist.propertyAttr.editable = true;
            if (_activitysDisplayName.includes("001")) {
                //设置非必填
                _this.$refs.processSafetyPCRSpecialist.propertyAttr.editable = false;
            } else {
                //设置必填
                _this.$refs.processSafetyPCRSpecialist.propertyAttr.required = true;
                _this.$refs.inspectionCorrosionMetallurgyPCRspecialist.propertyAttr.required = true;
                _this.$refs.authorizedTechnologist.propertyAttr.required = true;
            }

            //维修主任授权代理工程师选择模块
            //_this.$refs.sectioncols11.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols11.show();

            _this.$refs.hom.propertyAttr.editable = false;
            _this.$refs.hom.propertyAttr.required = true;

            _this.$refs.emDelegatedEngineer.propertyAttr.editable = false;

            _this.$refs.projectHead.hide();
            _this.$refs.nomineeProjectEngineer.hide();
            _this.$refs.otherWorkParty.hide();
            _this.$refs.operatingNominee.hide();
            _this.$refs.msmrWorkParty.hide();


            if (_activitysDisplayName.includes("030") || _activitysDisplayName.includes("060") || _activitysDisplayName.includes("040")) {
                _this.$refs.hom.propertyAttr.editable = true;
                _this.$refs.emDelegatedEngineer.propertyAttr.editable = true;
            }

            if (_activitysDisplayName.includes("030")) {
                _this.$refs.emDelegatedEngineer.propertyAttr.editable = false;
            }

            if (_activitysDisplayName.includes("060") ||
                _activitysDisplayName.includes("040")) {
                _this.$refs.emDelegatedEngineer.propertyAttr.required = true;
            }

            if (_activitysDisplayName.includes("060")) {

                _this.$refs.hom.propertyAttr.required = true;
            }

            if (_activitysDisplayName.includes("040")) {

                _this.$refs.hom.propertyAttr.editable = false;
            }

            if (_activitysDisplayName.includes("001")) {
                _this.$refs.hom.propertyAttr.required = false;
            }

            //操作代表授权和就绪检查人选择
            _this.$refs.sectioncols12.show();

            _this.$refs.operatingNominee2.propertyAttr.editable = false;

            if (_activitysDisplayName.includes("030")) {
                _this.$refs.operatingNominee2.propertyAttr.editable = true;
            }
            if (_activitysDisplayName.includes("001")) {
                //设置非必填
                //_this.$refs.operatingNominee2.propertyAttr.required = false;
            }
            else {
                //设置必填
                _this.$refs.operatingNominee2.propertyAttr.required = true;
            }

            //预计完成日期模块
            _this.$refs.sectioncols13.show();

            _this.$refs.implementationTargetDate.propertyAttr.editable = false;

            if (_activitysDisplayName.includes("160")) {
                _this.$refs.implementationTargetDate.propertyAttr.editable = true;

                //设置完成时间，最小值为当天往后的值
                var date = new Date();
                var minDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);

                var minfDate = _this.$format(minDate, 'YYYY-MM-DD');
                _this.$refs.implementationTargetDate.setMinValue(minfDate);

                //设置必填
                _this.$refs.implementationTargetDate.propertyAttr.required = true;
            }

            //工艺过程评估模块
            //_this.$refs.sectioncols14.setProperty("cls", "sectionHide");//
            _this.$refs.sectioncols14.hide();

            //工程评估模块

            if (_activitysDisplayName.includes("150") || _activitysDisplayName.includes("040") ||
                _activitysDisplayName.includes("160") ||
                _activitysDisplayName.includes("080") || _activitysDisplayName.includes("060")) {

                _this.$refs.mocEngineeringAssessment.propertyAttr.editable = true;
            }
            if (_activitysDisplayName.includes("001")) {

                _this.$refs.mocEngineeringAssessment.propertyAttr.editable = false;
            }

            //文档列表模块	
            _this.$refs.sectioncols16.hide();

            //文档更新列表模块		
            _this.$refs.sectioncols17.hide();

            //意见说明模块		
        }

        if (_mocType == "MSMRMOC") {
            //申请人模块只读
            //变更信息模块，部分可编辑(设置所有不可以编辑，根据节点设置可编辑)
            _this.$refs.mocType.propertyAttr.editable = false;
            _this.$refs.plantEngineer.propertyAttr.editable = false;
            _this.$refs.plant.propertyAttr.editable = false;
            _this.$refs.unit.propertyAttr.editable = false;
            _this.$refs.mocFocalPoint.propertyAttr.editable = false;
            _this.$refs.costEstimationRMB50.propertyAttr.editable = false;
            _this.$refs.emergencyMOCreviewAfterlmplementation.propertyAttr.editable = false;
            _this.$refs.mocTitle.propertyAttr.editable = false;
            _this.$refs.mocDescription.propertyAttr.editable = false;
            _this.$refs.cc.propertyAttr.editable = false;
            _this.$refs.processEngineerTechnologist.propertyAttr.editable = false;
            _this.$refs.processEngineerTechnologistMOCcInformation.propertyAttr.editable = false;

            _this.$refs.mocCategory.hide();
            _this.$refs.plantEngineer.show();
            _this.$refs.costEstimationRMB50.hide();
            _this.$refs.CostEstimationRMB10.hide();
            _this.$refs.processEngineerTechnologist.hide();
            _this.$refs.mocFocalPoint.hide();

            if (_activitysDisplayName.includes("130")) {
                _this.$refs.mocTitle.propertyAttr.editable = true;
                _this.$refs.mocDescription.propertyAttr.editable = true;
            }

            if (_activitysDisplayName.includes("001")) {
                _this.$refs.mocTitle.propertyAttr.editable = true;
                _this.$refs.mocDescription.propertyAttr.editable = true;
                _this.$refs.cc.propertyAttr.editable = false;
            }

            //装置经理选择模块	
            _this.$refs.sectioncols5.hide();

            //标准公用工程模块
            //_this.$refs.sectioncols6.setProperty("cls", "sectionHide");//         
            _this.$refs.sectioncols6.hide();

            //组成
            //_this.$refs.sectioncols7.setProperty("cls", "sectionHide");//        
            _this.$refs.sectioncols7.hide();

            //技术评估
            //_this.$refs.sectioncols8.setProperty("cls", "sectionHide");//        
            _this.$refs.sectioncols8.hide();

            //工程评估
            //_this.$refs.sectioncols9.setProperty("cls", "sectionHide");//         
            _this.$refs.sectioncols9.hide();


            //技术审批者模块	
            //_this.$refs.sectioncols10.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols10.show();

            _this.$refs.systemGuardian.propertyAttr.editable = false;
            _this.$refs.authorizedTechnologist.propertyAttr.editable = false;
            _this.$refs.leadProcessControl.propertyAttr.editable = false;

            _this.$refs.authorizedInstrumentEngineer.hide();
            _this.$refs.processEngineerTechnologist.hide();
            _this.$refs.processSafetyPCRSpecialist.hide();
            _this.$refs.qmiSpecialist.hide();
            _this.$refs.inspectionCorrosionMetallurgyPCRspecialist.hide();
            _this.$refs.processControl.hide();
            _this.$refs.instrumentDCSOTSecurity.hide();
            _this.$refs.nominatedEngineer.hide();
            _this.$refs.electrical.hide();
            _this.$refs.civil.hide();
            _this.$refs.rotatingEngineer.hide();
            _this.$refs.fireFighting.hide();
            _this.$refs.hse.hide();
            _this.$refs.others.hide();
            _this.$refs.label2.hide();
            _this.$refs.isTechnicalApprover.hide();

            if (!_activitysDisplayName.includes("001")) {
                //必填
                _this.$refs.authorizedTechnologist.propertyAttr.required = true;
                _this.$refs.systemGuardian.propertyAttr.required = true;
                _this.$refs.leadProcessControl.propertyAttr.required = true;
            }

            //维修主任授权代理工程师选择模块
            //_this.$refs.sectioncols11.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols11.show();

            //设置必填
            _this.$refs.msmrWorkParty.propertyAttr.required = true;
            _this.$refs.msmrWorkParty.propertyAttr.editable = false;

            if (_activitysDisplayName.includes("001")) {
                //必填
                _this.$refs.msmrWorkParty.propertyAttr.required = false;
            }


            _this.$refs.hom.hide();
            _this.$refs.projectHead.hide();
            _this.$refs.emDelegatedEngineer.hide();
            _this.$refs.nomineeProjectEngineer.hide();
            _this.$refs.otherWorkParty.hide();
            _this.$refs.operatingNominee.hide();

            //操作代表授权和就绪检查人选择
            _this.$refs.sectioncols12.hide();

            //预计完成日期模块
            _this.$refs.sectioncols13.show();

            _this.$refs.implementationTargetDate.propertyAttr.editable = false;

            if (_activitysDisplayName.includes("170")) {
                _this.$refs.implementationTargetDate.propertyAttr.editable = true;

                //设置完成时间，最小值为当天往后的值				
                var date = new Date();
                var minDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);

                var minfDate = _this.$format(minDate, 'YYYY-MM-DD');
                _this.$refs.implementationTargetDate.setMinValue(minfDate);

                //设置必填
                _this.$refs.implementationTargetDate.propertyAttr.required = true;
            }

            //工艺过程评估模块
            //_this.$refs.sectioncols14.setProperty("cls", "sectionHide");//
            _this.$refs.sectioncols14.hide();

            //工程评估模块

            //文档列表模块	
            _this.$refs.sectioncols16.show();
            _this.$refs.sectioncols17.show();
            if (_activitysDisplayName.includes("100") || _activitysDisplayName.includes("110")
                || _activitysDisplayName.includes("170")) {

                //文档更新列表可编辑
                _this.$refs.cusDocumentList.setEditable(true);
                _this.$refs.documentLIst.propertyAttr.editable = true;
            }
            else {
                _this.$refs.cusDocumentList.setEditable(false);
                _this.$refs.documentLIst.propertyAttr.editable = false;
                _this.$refs.documentLIst.propertyAttr.enableAdd = false;
            }

            // 附件模块
            if (_activitysDisplayName.includes("170")) {
                _this.$refs.dgFileList.propertyAttr.editable = false;
                _this.$refs.btnUpload.hide();
            }
        }

        //审批页面都需要获取展示提示语；
        window.getMOCConfirmItems();
    }

    //查看页面
    if (_this.getView() == "view") {
        //装置经理后的提示
        _this.$refs.label4.hide();

        //是否技术重新审批 选项
        _this.$refs.isTechnicalApprover.hide();

        if (_mocType == "PMOC" || _mocType == "TMOC") {

            //变更信息
            _this.$refs.costEstimationRMB50.show();
            _this.$refs.CostEstimationRMB10.show();

            if (_mocType == "PMOC") {
                _this.$refs.mocPrioritization.show();
                _this.$refs.mocGrade.show();
            }

            //工艺工程师
            _this.$refs.processEngineerTechnologistMOCcInformation.hide();

            //标准公用工程
            //_this.$refs.sectioncols6.setProperty("cls", "sectionHide");//         
            _this.$refs.sectioncols6.hide();


            //组成
            //_this.$refs.sectioncols7.setProperty("cls", "sectionHide");//       
            _this.$refs.sectioncols7.hide();

            //技术评估
            //_this.$refs.sectioncols8.setProperty("cls", "sectionHide");//        
            _this.$refs.sectioncols8.hide();

            //装置经理选择

            //技术审批者选择
            //_this.$refs.sectioncols10.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols10.show();

            _this.$refs.systemGuardian.hide();
            _this.$refs.leadProcessControl.hide();

            //维修主任授权代理工程师选择	
            //_this.$refs.sectioncols11.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols11.show();
            _this.$refs.msmrWorkParty.hide();

            //操作代表授权和就绪检查人选择

            //预计完成时间

            //工艺过程评估

            //工程评估
            //_this.$refs.sectioncols9.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols9.show();

            //操作选项

            if (_mocType == "TMOC") {
                //不显示文档更新列表（两个）
                _this.$refs.sectioncols16.hide();
                _this.$refs.sectioncols17.hide();
            }


            //文档列表
            if (_mocType == "PMOC") {
                //文档更新列表不可编辑
                _this.$refs.cusDocumentList.setEditable(false);
                _this.$refs.documentLIst.propertyAttr.editable = false;
                _this.$refs.documentLIst.propertyAttr.enableAdd = false;
                //_this.$refs.documentLIst.columnData[4].pcDisplay=false;
                //隐藏更新文档的删除按钮
                window.hideDelButton();
            }

            //标准公用工程

            //确认项目         

        }

        if (_mocType == "LSMOC") {
            //变更信息
            _this.$refs.mocCategory.hide();
            //_this.$refs.mocPrioritization.hide();
            //_this.$refs.mocGrade.hide();
            _this.$refs.costEstimationRMB50.hide();
            _this.$refs.CostEstimationRMB10.hide();
            _this.$refs.processEngineerTechnologistMOCcInformation.hide();

            //装置经理选择
            _this.$refs.sectioncols5.show();
            //装置经理后的提示
            _this.$refs.label4.show();

            //标准公用工程
            //_this.$refs.sectioncols6.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols6.show();


            //组成
            //_this.$refs.sectioncols7.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols7.show();

            //技术评估
            //_this.$refs.sectioncols8.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols8.show();

            //工程评估
            //_this.$refs.sectioncols9.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols9.show();

            //技术审批者选择
            //_this.$refs.sectioncols10.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols10.show();

            _this.$refs.authorizedInstrumentEngineer.hide();
            _this.$refs.nominatedEngineer.hide();
            _this.$refs.systemGuardian.hide();
            _this.$refs.leadProcessControl.hide();
            _this.$refs.processEngineerTechnologist.hide();
            _this.$refs.qmiSpecialist.hide();
            _this.$refs.processControl.hide();
            _this.$refs.instrumentDCSOTSecurity.hide();
            _this.$refs.electrical.hide();
            _this.$refs.civil.hide();
            _this.$refs.rotatingEngineer.hide();
            _this.$refs.fireFighting.hide();
            _this.$refs.hse.hide();
            _this.$refs.others.hide();
            _this.$refs.label2.hide();

            //维修主任授权代理工程师选择	
            //_this.$refs.sectioncols11.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols11.show();
            _this.$refs.projectHead.hide();
            _this.$refs.nomineeProjectEngineer.hide();
            _this.$refs.operatingNominee.hide();
            _this.$refs.msmrWorkParty.hide();
            _this.$refs.otherWorkParty.hide();

            //操作代表授权和就绪检查人选择

            //预计完成时间
            _this.$refs.sectioncols13.show();

            //工艺过程评估
            //_this.$refs.sectioncols14.setProperty("cls", "sectionHide");//     
            _this.$refs.sectioncols14.hide();

            //附件

            //操作选项

            //文档列表
            //文档更新列表不可编辑
            _this.$refs.sectioncols16.hide();
            _this.$refs.sectioncols17.hide();

            //确认项目            
        }

        if (_mocType == "MSMRMOC") {
            //变更信息
            _this.$refs.mocCategory.hide();
            _this.$refs.processEngineerTechnologistMOCcInformation.show();
            //_this.$refs.mocPrioritization.hide();
            //_this.$refs.mocGrade.hide();
            _this.$refs.costEstimationRMB50.hide();
            _this.$refs.CostEstimationRMB10.hide();
            _this.$refs.mocFocalPoint.hide();

            //装置经理选择
            _this.$refs.sectioncols5.hide();

            //技术审批者选择
            //_this.$refs.sectioncols10.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols10.show();

            _this.$refs.processSafetyPCRSpecialist.hide();
            _this.$refs.inspectionCorrosionMetallurgyPCRspecialist.hide();
            _this.$refs.nominatedEngineer.hide();
            _this.$refs.processEngineerTechnologist.hide();
            _this.$refs.qmiSpecialist.hide();
            _this.$refs.processControl.hide();
            _this.$refs.instrumentDCSOTSecurity.hide();
            _this.$refs.electrical.hide();
            _this.$refs.civil.hide();
            _this.$refs.rotatingEngineer.hide();
            _this.$refs.fireFighting.hide();
            _this.$refs.hse.hide();
            _this.$refs.others.hide();
            _this.$refs.label2.hide();
            _this.$refs.authorizedInstrumentEngineer.hide();

            //维修主任授权代理工程师选择	
            //_this.$refs.sectioncols11.setProperty("cls", "sectionShow");//
            _this.$refs.sectioncols11.show();

            _this.$refs.hom.hide();
            _this.$refs.emDelegatedEngineer.hide();
            _this.$refs.otherWorkParty.hide();
            _this.$refs.projectHead.hide();
            _this.$refs.nomineeProjectEngineer.hide();
            _this.$refs.operatingNominee.hide();

            _this.$refs.msmrWorkParty.show();

            //操作代表授权和就绪检查人选择
            _this.$refs.sectioncols12.hide();

            //预计完成时间
            _this.$refs.implementationTargetDate.propertyAttr.editable = false;

            //工艺过程评估
            //_this.$refs.sectioncols14.setProperty("cls", "sectionHide");//        
            _this.$refs.sectioncols14.hide();

            //工程评估
            //_this.$refs.sectioncols9.setProperty("cls", "sectionHide");//        
            _this.$refs.sectioncols9.hide();

            //标准公用工程
            //_this.$refs.sectioncols6.setProperty("cls", "sectionHide");//         
            _this.$refs.sectioncols6.hide();

            //组成
            //_this.$refs.sectioncols7.setProperty("cls", "sectionHide");//        
            _this.$refs.sectioncols7.hide();

            //技术评估
            //_this.$refs.sectioncols8.setProperty("cls", "sectionHide");//         
            _this.$refs.sectioncols8.hide();

            //文档列表
            //文档更新列表不可编辑
            _this.$refs.cusDocumentList.setEditable(false);
            _this.$refs.documentLIst.propertyAttr.editable = false;
            _this.$refs.documentLIst.propertyAttr.enableAdd = false;
            //_this.$refs.documentLIst.columnData[4].pcDisplay=false;
            //隐藏更新文档的删除按钮
            window.hideDelButton();

            //标准公用工程

            //确认项目
        }

        //附件模块		
        _this.$refs.dgFileList.propertyAttr.editable = false;
        _this.$refs.btnUpload.hide();
        //_this.$refs.btnDownload.hide();

    }
}

//获取当前“确认项目”
window.getMOCConfirmItems = function () {
    var _mocType = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocType;
    _this.$request({
        url: 'pai-core-maindata/api/last/mocConfirmItems/page',
        method: 'post',
        data: {
            fields: [
                { name: "information_en" },
                { name: "information_zh" },
            ],
            filter: "",
        },
    }).then(response => {
        var _mocConfirmItemsList = "";
        if (response.mocConfirmItemsList.length > 0 && response.responseCode === '100') {
            _mocConfirmItemsList = response.mocConfirmItemsList.filter(p => p.workflowType == "MOC Approval Workflow" &&
                p.mocType.indexOf(_mocType) > -1 &&
                p.activety.indexOf(_activitysDisplayName.substr(0, 3)) > -1);

            var _information="";
            if (_mocConfirmItemsList.length>0) {
                if (lang == 'zh_CN') {
                    _information = _mocConfirmItemsList[0].information_zh;
                } else {
                    _information = _mocConfirmItemsList[0].information_en;
                }

                if (_activitysDisplayName.includes("090") || _activitysDisplayName.includes("060") || _activitysDisplayName.includes("150")) {
                    _information = _information.replace("{MOC Number}", _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocNumber);
                }
            }
            _this.$refs.isMOCConfirmItems.propertyAttr.dataSource.options = [{ "label": _information, "value": "0" }];
            
        }
    }).catch(error => {
        throw err;
    });
}

//获取抄送是否被查看
window.getIfReview = function (flag) {
    //flag：0表示查询操作,1表示更新操作	必填
    _this.$request({
        url: "zhqp-external-rest/api/processReview",
        method: "post",
        data: {
            ccLogId: _this.getUrlData('ccLogId'),
            userId: _this.getUrlData('userId'),
            procInstId: _this.getUrlData('procInstId'),
            flag: flag,
        },
    }).then((res) => {
        if (res.responseCode === "100") {
            if (res.ifReview == false) {
                var aLIst = _this.$refs.header.actionList;
                aLIst.push({
                    actionColor: '',
                    actionName: 'Review',
                    actionType: 0,
                    displayName: { en: 'Review', zh_CN: '查看' },
                    ifApproveRequired: null,
                    orderIndex: null,
                });
                setTimeout(function () {
                    _this.$refs.header.actionList = aLIst;
                }, 100)
            }

            if (flag == 1) {
                _this.$refs.header.actionList = _this.$refs.header.actionList.filter(p => p.actionName != "Review")

                location.reload();
            }
        }
    }).catch((err) => {
        throw err;
    });
}

//附件控件--编辑行
window.editRow = function (val) {
    if (val.scope.column.property === 'fileName' && _this.getView() !== 'launch') {
        const contentJson = _this.$store.getters.nebulogyForm.nebulogyForm;
        const destInstId = _this.getUrlData('destInstId') || ''
        _this.loading = true;
        _this.$request({
            url: 'zhqp-componentservices/api/saveFormData',
            method: 'POST',
            data: {
                "destInstId": destInstId,
                "contentJson": contentJson
            }
        }).then(res => {
            if (res && res.responseCode === '100') {
                _this.loading = false;
            }
        }).catch(error => {
            _this.loading = false;
            throw error
        })
    }
}

//选人控件，赋值显示值（用于结构化）
window.setDisplayName = function () {

    var _mocApprovalWorkflow = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow;
    var _mocType = _this.$store.getters.nebulogyForm.nebulogyForm.mocApprovalWorkflow.mocType;

    //Cc显示名
    if (_mocApprovalWorkflow.cc != "") { _mocApprovalWorkflow.ccDisplayName = _this.$refs.cc.displayValue; } else { _mocApprovalWorkflow.ccDisplayName = ""; }

    //类别显示名
    if (_mocApprovalWorkflow.mocCategory != "") { _mocApprovalWorkflow.mocCategoryDisplayName = _mocApprovalWorkflow._mocCategory; } else { _mocApprovalWorkflow.mocCategoryDisplayName = ""; }

    //MOC类型显示名
    if (_mocApprovalWorkflow.mocType != "") { _mocApprovalWorkflow.mocTypeDisplayName = _mocApprovalWorkflow._mocType; } else { _mocApprovalWorkflow.mocTypeDisplayName = ""; }

    //装置显示名
    if (_mocApprovalWorkflow.plant != "") { _mocApprovalWorkflow.plantDisplayName = _mocApprovalWorkflow._plant; } else { _mocApprovalWorkflow.plantDisplayName = ""; }

    //工厂工程师显示名
    if (_mocApprovalWorkflow.plantEngineer != "") { _mocApprovalWorkflow.plantEngineerDisplayName = _this.$refs.plantEngineer.displayValue; } else { _mocApprovalWorkflow.plantEngineerDisplayName = ""; }

    //单元显示名
    if (_mocApprovalWorkflow.unit != "") { _mocApprovalWorkflow.unitDisplayName = _mocApprovalWorkflow._unit; } else { _mocApprovalWorkflow.unitDisplayName = ""; }

    if (_mocType == "PMOC" || _mocType == "TMOC" || _mocType == "LSMOC") {
        //变更程序主管显示名（PMOC  TMOC  LSMOC  发起、提交）
        if (_mocApprovalWorkflow.mocFocalPoint != "") { _mocApprovalWorkflow.mocFocalPointDisplayName = _mocApprovalWorkflow._mocFocalPoint; } else { _mocApprovalWorkflow.mocFocalPointDisplayName = ""; }

        if (_this.getView() == "approval") {
            //HOM显示名
            if (_mocApprovalWorkflow.hom != "") { _mocApprovalWorkflow.homDisplayName = _this.$refs.hom.displayValue; } else { _mocApprovalWorkflow.homDisplayName = ""; }

            //装置经理显示名
            if (_mocApprovalWorkflow.unitManager != "") { _mocApprovalWorkflow.unitManagerDisplayName = _this.$refs.unitManager.displayValue; } else { _mocApprovalWorkflow.unitManagerDisplayName = ""; }

            //其他装置经理-如有需要显示名
            if (_mocApprovalWorkflow.otherUnitManagerifneed != "") { _mocApprovalWorkflow.otherUnitManagerifneedDisplayName = _this.$refs.otherUnitManagerifneed.displayValue; } else { _mocApprovalWorkflow.otherUnitManagerifneedDisplayName = ""; }
        }
    }

    if (_mocType == "PMOC") {
        //变更优先级显示名
        if (_mocApprovalWorkflow.mocPrioritization != "") { _mocApprovalWorkflow.mocPrioritizationDisplayName = _mocApprovalWorkflow._mocPrioritization; } else { _mocApprovalWorkflow.mocPrioritizationDisplayName = ""; }

        //MOC等级显示名
        if (_mocApprovalWorkflow.mocGrade != "") { _mocApprovalWorkflow.mocGradeDisplayName = _mocApprovalWorkflow._mocGrade; } else { _mocApprovalWorkflow.mocGradeDisplayName = ""; }

        if (_this.getView() == "approval") {
            //工艺工程师（技术审批者选择 模块）显示名
            if (_mocApprovalWorkflow.processEngineerTechnologist != "") { _mocApprovalWorkflow.processEngineerTechnologistDisplayName = _this.$refs.processEngineerTechnologist.displayValue; } else { _mocApprovalWorkflow.processEngineerTechnologistDisplayName = ""; }

            //消防专家显示名
            if (_mocApprovalWorkflow.fireFighting != "") { _mocApprovalWorkflow.fireFightingDisplayName = _this.$refs.fireFighting.displayValue; } else { _mocApprovalWorkflow.fireFightingDisplayName = ""; }

            //HSE显示名
            if (_mocApprovalWorkflow.hse != "") { _mocApprovalWorkflow.hseDisplayName = _this.$refs.hse.displayValue; } else { _mocApprovalWorkflow.hseDisplayName = ""; }

            //其他显示名
            if (_mocApprovalWorkflow.others != "") { _mocApprovalWorkflow.othersDisplayName = _this.$refs.others.displayValue; } else { _mocApprovalWorkflow.othersDisplayName = ""; }

            //项目负责人显示名
            if (_mocApprovalWorkflow.projectHead != "") { _mocApprovalWorkflow.projectHeadDisplayName = _this.$refs.projectHead.displayValue; } else { _mocApprovalWorkflow.projectHeadDisplayName = ""; }
        }
    }

    //申请人显示名
    if (_mocApprovalWorkflow.requestor != "") { _mocApprovalWorkflow.requestorDisplayName = _mocApprovalWorkflow._requestor; } else { _mocApprovalWorkflow.requestorDisplayName = ""; }

    if (_mocType == "MSMRMOC") {
        //系统监护人显示名
        if (_mocApprovalWorkflow.systemGuardian != "") { _mocApprovalWorkflow.systemGuardianDisplayName = _mocApprovalWorkflow._systemGuardian; } else { _mocApprovalWorkflow.systemGuardianDisplayName = ""; }

        //工艺工程师（变更信息 模块）显示名
        if (_mocApprovalWorkflow.processEngineerTechnologistMOCcInformation != "") { _mocApprovalWorkflow.processEngineerTechnologistMOCcInformationDisplayName = _this.$refs.processEngineerTechnologistMOCcInformation.displayValue; } else { _mocApprovalWorkflow.processEngineerTechnologistMOCcInformationDisplayName = ""; }

        //MSMR 工作执行人显示名
        if (_mocApprovalWorkflow.msmrWorkParty != "") { _mocApprovalWorkflow.msmrWorkPartyDisplayName = _this.$refs.msmrWorkParty.displayValue; } else { _mocApprovalWorkflow.msmrWorkPartyDisplayName = ""; }
    }

    if (_mocType == "LSMOC" && _this.getView() == "approval") {
        //EM 委派工程师显示名
        if (_mocApprovalWorkflow.emDelegatedEngineer != "") { _mocApprovalWorkflow.emDelegatedEngineerDisplayName = _this.$refs.emDelegatedEngineer.displayValue; } else { _mocApprovalWorkflow.emDelegatedEngineerDisplayName = ""; }
    }

    if (_mocType == "PMOC" || _mocType == "TMOC") {
        if (_this.getView() == "approval") {
            //提名项目工程师显示名
            if (_mocApprovalWorkflow.nomineeProjectEngineer != "") { _mocApprovalWorkflow.nomineeProjectEngineerDisplayName = _this.$refs.nomineeProjectEngineer.displayValue; } else { _mocApprovalWorkflow.nomineeProjectEngineerDisplayName = ""; }

            //其他工作小组显示名
            if (_mocApprovalWorkflow.otherWorkParty != "") { _mocApprovalWorkflow.otherWorkPartyDisplayName = _this.$refs.otherWorkParty.displayValue; } else { _mocApprovalWorkflow.otherWorkPartyDisplayName = ""; }

            //操作人显示名
            if (_mocApprovalWorkflow.operatingNominee != "") { _mocApprovalWorkflow.operatingNomineeDisplayName = _this.$refs.operatingNominee.displayValue; } else { _mocApprovalWorkflow.operatingNomineeDisplayName = ""; }
        }
    }
}

//退回到任意节点的邮件通知，发送给申请人
window.emailToapplication = function (action) {
    //退回发起人，
    if (action.actionName == "PA_ReturnOriginator" || action.actionName == "PA_JabilCancel" || action.actionName == "PA_ReturnPrevious") {
        let nebulogyForm = _this.$store.getters.nebulogyForm.nebulogyForm;
        var _emailAccount = _this.$store.getters.nebulogyForm.nebulogyForm.emailContent.applicationEmail;

        let email = [{ receiveMailAccount: _emailAccount }]
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
                    approverDesc: _this.$refs.comments.getValue()
                },
            },
            headers: null,
        }).then(res => {

        }).catch(err => {

        });
    }
}

//发起页面、草稿页面，加载数据
if (_this.getView() == 'launch' && (_this.getUrlData('draftId') == null || _this.getUrlData('draftId') === '')) {

    //获取申请人信息
    var employeeName = emp.employeeName ? emp.employeeName : "";
    _this.$refs.requestor.setValue({ value: emp.id, label: employeeName });

    var d = new Date();
    var dateStr = (d.getFullYear()) + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    _this.$refs.requestDate.setValue(dateStr);

    //申请人邮箱
    _this.$store.getters.nebulogyForm.nebulogyForm.emailContent.applicationEmail = emp.email;

    //获取人员全路径
    window.getDeptByEmployeeId(emp.id);
}

//页面加载
if (_this.getView() != "launch" && _this.getView() != "view") {
    //获取当前节点信息
    window.getCurrentProcInst();
} else {
    window.loadPage();
    _this.$store.getters.nebulogyForm.nebulogyForm.currentActivityName = { en: "ProcessStart", zh_CN: "流程开始" };
}

//抄送页面
if (_this.getView() == "view" && _this.getUrlData('ccLogId') != "") {
    //校验是否需要抄送按钮
    window.getIfReview(0);
}

//打印模版使用
window.customKey = {
    formTitle: { formTitleCn: "MOC审批流程", formTitleEn: "MOC Approval Workflow" }
}

    