//用于判断Ajax请求登录时返回的结果是否要重登录
function isReLogin(obj, rawUrl) {
    if (obj.relogin || obj == '{"relogin":true}' || obj.toString() === '{"relogin":"true"}' || obj == '{"relogin":"True"}') {
        window.location.href = "/Home/Index?callback=" + rawUrl;
        return true;
    }
    return false;
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

    return fmt;
}

//formatDate(dateStr,'yyyy-MM-dd');
formatDate = function (v, format) {
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
        if (v.indexOf("/Date(") > -1)
            d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
        else
            d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));//.split(".")[0] 用来处理出现毫秒的情况，截取掉.xxx，否则会出错
    }
    var o = {
        "M+": d.getMonth() + 1,  //month
        "d+": d.getDate(),       //day
        "h+": d.getHours(),      //hour
        "m+": d.getMinutes(),    //minute
        "s+": d.getSeconds(),    //second
        "q+": Math.floor((d.getMonth() + 3) / 3),  //quarter
        "S": d.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

function allNewDate(str) {
    str = str.split('-');
    var date = new Date();
    date.setUTCFullYear(str[0], str[1] - 1, str[2]);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}

//多实体传递
jQuery.myajax = {
    post: function (url, param, callback) {
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            //cache: true,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(param),
            success: function (data) {
                callback(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                //console.log(xhr.status);
                //console.log(thrownError);
            }
        });
    }
};

//单个文件上传
//大小限制10M
//eg:<input onchange="uploadSingFile(this,10)" type="file">
function uploadSingFile(obj, size) {
    var $this = $(obj);
    var $load = $this.parent().next();
    $load.html('');
    var n = [];
    var element = $this[0].files[0];
    var fileSize = Number(element.size / (1024 * 1024)).toFixed(2);
    if (size == null || size == "") {
        size = 10;
    }
    if (fileSize <= size) {
        n.push(element.name);
        var f = new FileReader();
        f.onload = function (e) {
            var exp = /doc|docx|txt|xlsx|xls|pdf|ppt|rar|zip/;
            if (exp.test(element.name)) {
                $load.attr('k', this.result);
                var image = "else.png";
                var exps = element.name.split('.');
                $load.attr('n', element.name);
                switch (exps[exps.length - 1]) {
                    case "doc":
                    case "docx":
                        image = "word.png";
                        break;
                    case "xls":
                    case "xlsx":
                        image = "excel.png";
                        break;
                    case "txt":
                        image = "txt.png";
                        break;
                    case "pdf":
                        image = "pdf.png";
                        break;
                    case "ppt":
                        image = "ppt.png";
                        break;
                    case "rar":
                    case "zip":
                        image = "rar.png";
                        break;
                }
                $load.html('<div class="pic-item"><img src="/Thems/images/format/' + image + '" alt="' + element.name + '"><a class="close2 fl" onclick="removeElement(this)"></a></div>');
            } else {
                layer.msg("文件格式为doc|docx|txt|xlsx|xls|pdf|ppt|rar|zip", { icon: 2 });
            }
        };
        f.readAsDataURL(element);
        $this.val('');
    } else {
        layer.msg("文件大小不能超过" + size + "M", { icon: 2 });
        return false;
    }
};

//单个图片上传
//大小限制1M
//eg:<input onchange="uploadSingImage(this,1)" type="file">
function uploadSingImage(obj, size) {
    var $this = $(obj);
    var $load = $this.parent().next();
    $load.html('');
    var n = [];
    var element = $this[0].files[0];
    var fileSize = Number(element.size / (1024 * 1024)).toFixed(2);
    if (size == null || size == "") {
        size = 1;
    }
    if (fileSize <= size) {
        n.push(element.name);
        var f = new FileReader();
        f.onload = function (e) {
            var exp = /png|gif|jpg/;
            if (exp.test(element.name)) {
                var exps = element.name.split('.');
                var html = '<div class="pic-item"><img src="' + this.result + '" alt="' + element.name + '" n="' + element.name + '"><a href="javascript:void(0);" class="close2 fl" onclick="removeElement(this)"></a></div>';
                $load.html(html);
            } else {
                layer.msg("文件格式为png|gif|jpg", { icon: 2 });
            }
        };
        f.readAsDataURL(element);
        $this.val('');
    } else {
        layer.msg("图片大小不能超过" + size + "M", { icon: 2 });
        return false;
    }
}

function AjaxUpload(url, formData) {
    var msg2;
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        async: false,
        data: formData,
        processData: false,
        contentType: false,
        success: function (msg) {
            msg2 = msg;
        }
    }).done(function (res) {
    }).fail(function (res) { });
    return msg2
}

// 删除上传文件
function removeElement(obj) {
    var file = $(obj).parent().parent().attr('k');
    if (isNull(file)) {
        file = $(obj).prev().attr("src");
        $(obj).parents('.pic-item').remove();
    } else {
        $(obj).parent().parent().attr('k', '').attr('n', '');
    }
}

//多个多文件上传
//大小限制10M
//eg: <input onchange="uplpadMulFile(this)" type="file" multiple="multiple">
function uplpadMulFile(obj, size) {
    var $this = $(obj);
    var f = [];
    var n = [];
    var j = 0;
    if (size == null || size == "") {
        size = 10;
    }
    for (i = 0; i < $this[0].files.length; i++) {
        var element = $this[0].files[i];
        var fileSize = Number(element.size / (1024 * 1024)).toFixed(2);
        if (fileSize <= size) {
            n.push(element.name);
            f[i] = new FileReader();
            f[i].onload = function (e) {
                var str = '';
                var exp = /doc|docx|txt|xlsx|xls|pdf|ppt|rar|zip/;
                if (exp.test(element.name)) {
                    var exps = element.name.split('.');
                    var image = "else.png";
                    switch (exps[exps.length - 1]) {
                        case "doc":
                        case "docx":
                            image = "word.png";
                            break;
                        case "xls":
                        case "xlsx":
                            image = "excel.png";
                            break;
                        case "txt":
                            image = "txt.png";
                            break;
                        case "pdf":
                            image = "pdf.png";
                            break;
                        case "ppt":
                            image = "ppt.png";
                            break;
                        case "rar":
                        case "zip":
                            image = "rar.png";
                            break;
                    }
                    str = '<div class="pic-item"><img src="/Thems/images/format/' + image + '" k="' + this.result + '" n="' + element.name + '"><a class="close2 fl" onclick="removeElement(this)"></a></div>';
                }
                $this.parent().next().append(str);
                j++;
            };
            f[i].readAsDataURL(element);
            $this.val('');
        } else {
            layer.msg("文件大小不能超过" + size + "M", { icon: 2 });
            continue;
        }

    }
}

//多个多图片上传
//大小限制10M
//eg: <input onchange="uplpadMulImage(this)" type="file" multiple="multiple">
function uplpadMulImage(obj, size) {
    var $this = $(obj);
    var f = [];
    var n = [];
    var j = 0;
    if (size == null || size == "") {
        size = 10;
    }
    for (i = 0; i < $this[0].files.length; i++) {
        var element = $this[0].files[i];
        var fileSize = Number(element.size / (1024 * 1024)).toFixed(2);
        if (fileSize <= size) {
            n.push(element.name);
            f[i] = new FileReader();
            f[i].onload = function (e) {
                var str = '';
                var exp = /png|gif|jpg/;
                if (exp.test(element.name)) {
                    var exps = element.name.split('.');
                    str = '<div class="pic-item"><img src="' + this.result + '" alt="' + element.name + '" n="' + element.name + '"><a href="javascript:void(0);" class="close2 fl" onclick="removeElement(this)"></a></div>';
                } else {
                    layer.msg("文件格式为png|gif|jpg", { icon: 2 });
                }
                $this.parent().next().append(str);
                j++;
            };
            f[i].readAsDataURL(element);
            $this.val('');
        } else {
            layer.msg("文件大小不能超过" + size + "M", { icon: 2 });
            continue;
        }

    }
}

//金额格式输入检测
//eg:onkeyup="isInputMoney(this);"
function isInputMoney(obj) {
    var $this = $(obj);
    var field = $this.attr("field");
    var n = $this.attr("n");
    var val = $this.val();
    if (val.length > 1) {
        if (val.substr(val.length - 1, 1) == '.' && val.split('.').length - 1 == 1) {

        } else {
            if (!isMoney(val)) {
                $this.val(val.substr(0, val.length - 1));
                return;
            }
        }
    } else {
        if (!isMoney(val)) {
            $this.val(val.substr(0, val.length - 1));
            return;
        }
    }
}

//金额格式输入检测
//eg:onkeyup="isInputNum(this);"
function isInputNum(obj) {
    var $this = $(obj);
    var val = $this.val();
    if (val.length > 1) {
        if (!isNum(val)) {
            $this.val(val.substr(0, val.length - 1));
            return;
        }
    } else {
        if (!isMoney(val)) {
            $this.val(val.substr(0, val.length - 1));
            return;
        }
    }
}

//正则过滤输入
function strInputScript(s) {
    var pattern = new RegExp("[%--`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")        //格式 RegExp("[在中间定义特殊过滤字符]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

//表单检测
function inputCheckData(obj) {
    var err = '';
    var $this = $('#' + obj);
    $this.find("[ck='1']").each(function () {
        var ckex = $(this).attr("ckex");
        if (!isNull(ckex)) {
            if (!eval(ckex)($(this).val())) {
                err = $(this).attr("err");
                layer.msg(err, {
                    icon: 2,
                    time: 2000
                });
                $(this).focus();
                return false;
            }
        }
    });
    if (err.length > 0) {
        return false;
    }
    return true;
}

function setImageSrc(id, filename) {
    $('#' + id).attr("src", filename);
}

//倒计时
var arry = new Array();
var arrInterval = new Array();
// startCountdown(class)
function startCountdown(obj) {
    $("." + obj).each(function (i, o) {
        var currentDate = new Date().getTime();
        var strEndTime = $(o).attr("time");
        var endTime = new Date(strEndTime.replace(/-/g, '/')).getTime();
        var days = endTime - currentDate;
        if (days > 0) {
            var h = parseInt(days / (1000 * 60 * 60));
            if (Math.floor(h) > 0) {
                arry[i] = parseInt(days / 1000); //精确到秒
                arrInterval[i] = setInterval("secondCountdown('" + obj + "'," + i + ")", 1000);

            } else {
                //走毫秒
                arry[i] = days;
                arrInterval[i] = setInterval("millisecondCountdown('" + obj + "'," + i + ")", 200);
            }
        }
    });
}


//秒走倒计时
function secondCountdown(obj, idx) {
    var $this = $('.' + obj);
    if (Number(arry.length) > 0) {
        var endTimeMsg = arry[idx];
        if (endTimeMsg > 0) {
            var h = endTimeMsg / 60 / 60;
            var m = endTimeMsg / 60 - (60 * Math.floor(h));
            var s = endTimeMsg - (60 * 60 * Math.floor(h)) - (60 * Math.floor(m));
            var html = "";
            if (parseInt(h) > 0) {
                for (var i = 0; i < parseInt(h).toString().length; i++) {
                    if (parseInt(h).toString().length == 1) {
                        html += "<span>0</span>";
                    }
                    html += "<span>" + h.toString().charAt(i) + "</span>";
                }
            } else {
                html += "<span>0</span><span>0</span>";
            }
            html += "<i>:</i>";
            if (parseInt(m) > 0) {
                for (var j = 0; j < parseInt(m).toString().length; j++) {
                    if (parseInt(m).toString().length === 1) {
                        html += "<span>0</span>";
                    }
                    html += "<span>" + parseInt(m).toString()[j] + "</span>";
                }
            } else {
                html += "<span>0</span><span>0</span>";
            }
            html += "<i>:</i>";
            if (parseInt(s) > 0) {
                for (var k = 0; k < parseInt(s).toString().length; k++) {
                    if (parseInt(s).toString().length === 1) {
                        html += "<span>0</span>";
                    }
                    html += "<span>" + parseInt(s).toString()[k] + "</span>";
                }
            } else {
                html += "<span>0</span><span>0</span>";
            }

            $this.eq(idx).html(html);
            endTimeMsg = endTimeMsg-1;
            arry[idx] = endTimeMsg;
           // console.log(arry[idx]);
        } else {
            clearInterval(arrInterval[idx]);
            $this.eq(idx).html("<p class='mt'>正在计算...</p>");
            //$(".sumdata").eq(idx).show();
        }

    } else {
        $this.eq(idx).html("<p class='mt'>正在计算...</p>");
        //$(".sumdata").eq(idx).show();
    }
}

//毫秒走倒计时
function millisecondCountdown(obj, idx) {
    var $this = $('.' + obj);
    if (arry.length > 0) {
        var endTimeMsg = arry[idx];
        if (endTimeMsg > 0) {
            var m = Math.floor(endTimeMsg / (1000 * 60)) % 60;
            var s = Math.floor(endTimeMsg / 1000) % 60;
            var nms = (Math.floor(endTimeMsg / 100) % 10);
            var nms2 = nms + 3;
            var html = "";
            if (parseInt(m) > 0) {
                for (var i = 0; i < parseInt(m).toString().length; i++) {
                    if (parseInt(m).toString().length === 1) {
                        html += "<span>0</span>";
                    }
                    html += "<span>" + parseInt(m).toString()[i] + "</span>";
                }
            } else {
                html += "<span>0</span><span>0</span>";
            }
            html += "<i>:</i>";
            if (parseInt(s) > 0) {
                for (var j = 0; j < parseInt(s).toString().length; j++) {
                    if (parseInt(s).toString().length === 1) {
                        html += "<span>0</span>";
                    }
                    html += "<span>" + parseInt(s).toString()[j] + "</span>";
                }
            } else {
                html += "<span>0</span><span>0</span>";
            }
            html += "<i>:</i>";
            if (parseInt(nms) > 0) {
                html += "<span>" + parseInt(nms2).toString()[0] + "</span>";
                html += "<span>" + parseInt(nms).toString()[0] + "</span>";
            } else {
                html += "<span>0</span><span>0</span>";
            }

            $this.eq(idx).html(html);
            endTimeMsg = endTimeMsg - 200;
            arry[idx] = endTimeMsg;
        } else {
            clearInterval(arrInterval[idx]);
            $this.eq(idx).html("<p class='mt'>正在计算...</p>");
            //$(".sumdata").eq(idx).show();
        }

    } else {
        $this.eq(idx).html("<p class='mt'>正在计算...</p>");
        //$(".sumdata").eq(idx).show();
    }
}

//更新购物车数量
function updateShopCartNum(obj) {
    var $this = $('#' + obj);
    $.post("/Common/GetShopCarCount", function (data) {
        if (data.success) {
            $this.html(data.Data);
            $this.show();
        }
    });
}

//单个图片上传
//大小限制1M
//eg:<input onchange="uploadSingImageForQD(this,1)" type="file">
function uploadSingImageForQD(obj, size) {
    var $this = $(obj);
    var $load = $this.next();
    $load.html('');
    var n = [];
    var element = $this[0].files[0];
    var fileSize = Number(element.size / (1024 * 1024)).toFixed(2);
    if (size == null || size == "") {
        size = 1;
    }
    if (fileSize <= size) {
        n.push(element.name);
        var f = new FileReader();
        f.onload = function (e) {
            var exp = /png|gif|jpg/;
            if (exp.test(element.name)) {
                var exps = element.name.split('.');
                //var html = '<div class="pic-item"><img src="' + this.result + '" alt="' + element.name + '" n="' + element.name + '"><a href="javascript:void(0);" class="close2 fl" onclick="removeElement(this)"></a></div>';
                //$load.html(html);
                $load.attr("src", this.result);
                $load.attr("n", element.name);
            } else {
                layer.msg("文件格式为png|gif|jpg", { icon: 2 });
            }
        };
        f.readAsDataURL(element);
        $this.val('');
    } else {
        layer.msg("图片大小不能超过" + size + "M", { icon: 2 });
        return false;
    }
}


//限制图片大小
//eg: <input type="file" name="file" id="FilePath_c" onchange="fileChange(this,1);">
function fileChange(target, val) {
    var fileSize = 0;
    if (!target.files) {
        var filePath = target.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        var file = fileSystem.GetFile(filePath);
        fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }
    var size = fileSize / 1024;
    if (size > val * 1000) {
        layer.msg("图片大小不能大于" + val + "M", { icon: 5 });
        target.value = "";
        return;
    }
}


//var username = document.cookie.split(";")[0].split("=")[1];
//JS操作cookies方法!
//写cookies
function setCookie(name, value,time) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + time*60*1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

//读cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//判断是否显示 
//optVal:单位rem
//optType:1(除全部商品页面)，2(全部商品页面)
function isShow(optVal,optType) {
    var isShow = getCookie("showTime");
    var top = parseFloat($(".d_bo").eq(0).css('padding-top'));
    var wrapper1 = parseFloat($("#wrapper1").css('top'));
    var sw_or = parseFloat($("#sw_or").css('top'));
    if (isNull(isShow)) {
        $("#download_div").show();
        $(".d_bo").css('padding-top', top + parseFloat(optVal) * parseFloat($("html").css("font-size")));

        if (optType) {
            $("#wrapper1").css('top', wrapper1 + parseFloat(optVal) * parseFloat($("html").css("font-size")));
            $("#sw_or").css('top', sw_or + parseFloat(optVal) * parseFloat($("html").css("font-size")));
        }
    } else {
        $("#download_div").hide();
        $(".d_bo").css('padding-top', top);

        if (optType) {
            $(".d_bo2").css('top', top);
            $("#wrapper1").css('top', wrapper1);
            $("#sw_or").css('top', sw_or);
        }

    }
}

//点击关闭
function download_close(optVal, optType) {
    setCookie("showTime", "5", 2);
    closeShow(optVal, optType);
}

//optVal:单位rem
function closeShow(optVal,optType) {
    $("#download_div").hide();
    var top = parseFloat($(".d_bo").eq(0).css('padding-top'));
    $(".d_bo").css('padding-top', top - parseFloat(optVal) * parseFloat($("html").css("font-size")));

    if (optType) {
        var wrapper1 = parseFloat($("#wrapper1").css('top'));
        var sw_or = parseFloat($("#sw_or").css('top'));
        $("#wrapper1").css('top', wrapper1 - parseFloat(optVal) * parseFloat($("html").css("font-size")));
        $("#sw_or").css('top', sw_or - parseFloat(optVal) * parseFloat($("html").css("font-size")));
    }
}

// var postData = $("#form1").GetWebControls(keyValue);
$.fn.GetWebControls = function (keyValue) {
    var reVal = "";
    $(this).find('input,select,textarea,.p').each(function (r) {
        var id = $(this).attr('id');
        var type = $(this).attr('type');
        switch (type) {
            case "checkbox":
                if ($("#" + id).is(":checked")) {
                    reVal += '"' + id + '"' + ':' + '"1",'
                } else {
                    reVal += '"' + id + '"' + ':' + '"0",'
                }
                break;
            case "select":
                var value = $("#" + id).val();
                if (value == "") {
                    value = "&nbsp;";
                }
                reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",'
                break;
            default:
                if ($("#" + id).hasClass("p")) {
                    var value = $("#" + id).attr('param');
                    if (value == "") {
                        value = "&nbsp;";
                    }
                    reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",'
                } else {
                    var value = $("#" + id).val();
                    if (value == "") {
                        value = "&nbsp;";
                    }
                    reVal += '"' + id + '"' + ':' + '"' + $.trim(value) + '",'
                }
                break;
        }
    });
    reVal = reVal.substr(0, reVal.length - 1);
    if (!keyValue) {
        reVal = reVal.replace(/&nbsp;/g, '');
    }
    reVal = reVal.replace(/\\/g, '\\\\');
    reVal = reVal.replace(/\n/g, '\\n');
    var postdata = jQuery.parseJSON('{' + reVal + '}');
   
    return postdata;
};

//  $("#form1").SetWebControls(data);
$.fn.SetWebControls = function (data) {
    var $id = $(this)
    for (var key in data) {
        var id = $id.find('#' + key);
        if (id.attr('id')) {
            var type = id.attr('type');
            if (id.hasClass("input-datepicker")) {
                type = "datepicker";
            }
            var value = $.trim(data[key]).replace(/&nbsp;/g, '');
            switch (type) {
                case "checkbox":
                    if (value == 1) {
                        id.attr("checked", 'checked');
                    } else {
                        id.removeAttr("checked");
                    }
                    break;
                case "select":
                    id.val(value);
                    break;
                case "datepicker":
                    id.val(formatDate(value, 'yyyy-MM-dd'));
                    break;
                default:
                    id.val(value);
                    break;
            }
        }
    }
}