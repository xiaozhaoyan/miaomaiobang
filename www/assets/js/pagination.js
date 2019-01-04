/*
 * 分页插件
 * 使用：$.pagination.show(pageNum,pageSize,param,counts,url,dataId,toolId,position,toolId);
 * 参数说明：
 * pageNum:第几页
 * pageSize:页面显示数据大小
 * counts:数据总条数
 * url:加载数据url
 * param:查询条件
 * isLoadData:第一次是否加载数据
 * dataId:加载数据元素的id
 * positionId:此工具加载到id为positionId元素里面
 * */
jQuery.pagination = {

    flag:true,
    /*
	 * 不需要总条数
	 * */
    show: function (pageNum, pageSize, counts, url, param, isLoadData, dataId, positionId, toolId) {
        pageNum = Number(pageNum);
        pageSize = Number(pageSize);
        counts = Number(counts);
        var pageCounts = Math.ceil(counts / pageSize);
        var html = '<ul id="' + toolId + '_Pagination">'
            + '<li id="' + toolId + '_backPage"><a>上一页</a></li>'
            + '<li class="current"><input id="' + toolId + '_pageNum" type="text" value="' + pageNum + '" style=""></li>'
            + '<li>/</li>'
            + '<li><a>' + pageCounts + '</a></li>'
            + '<li id="' + toolId + '_nextPage"><a>下一页</a></li>'
            + '</ul>';

        var $div = $('#' + toolId + '_Pagination');
        if ($div.length) {//存在相同的分页控件，删除原来的
            $div.remove()
        }
        $('#' + positionId).html(html);//加在元素里面

        var $backPage = $('#' + toolId + '_backPage');
        var $nextPage = $('#' + toolId + '_nextPage');

        if (pageNum == 1) {//从第一页开始
            $backPage.addClass("no-use");
        }

        if (counts <= pageSize) {//只有一页
            $backPage.addClass("no-use");
            $nextPage.addClass("no-use");
        }

        if (pageCounts == pageNum) {//从最后一页开始
            $nextPage.addClass("no-use");
        }

        if (isLoadData) {
            this.loadData(pageNum, pageSize, counts, param, url, dataId, toolId);
        }

        $backPage.on('click', function () {
            if (pageNum > 1) {
                pageNum--;
                $nextPage.removeClass('no-use');

                if (pageNum > 1) {
                    $nextPage.removeClass('no-use');
                } else {
                    $backPage.addClass('no-use');
                }

                $.pagination.loadData(pageNum, pageSize, counts, param, url, dataId, toolId);
            }
        });

        $nextPage.on('click', function () {
            if (pageNum < pageCounts) {
                pageNum++;
                $backPage.removeClass('no-use');

                if (pageNum < pageCounts) {
                    $backPage.removeClass('no-use');
                } else {
                    $nextPage.addClass('no-use');
                }
                $.pagination.loadData(pageNum, pageSize, counts, param, url, dataId,toolId);
            }
        });

        var $pageNum = $('#' + toolId + '_pageNum');
        $pageNum.bind('keypress', function (event) {
            if (event.keyCode == "13") {
                pageNum =Number($pageNum.val());
                if (pageCounts <= 1) {
                    pageNum = 1;
                    $backPage.addClass('no-use');
                    $nextPage.addClass('no-use');
                } else {
                    if (pageNum >= pageCounts) {
                        pageNum = pageCounts;
                        $backPage.removeClass('no-use');
                        $nextPage.addClass('no-use');
                    } else if (pageNum <= 1) {
                        pageNum = 1;
                        $backPage.addClass('no-use');
                        $nextPage.removeClass('no-use');
                    }
                }
                $.pagination.loadData(pageNum, pageSize, counts, param, url, dataId, toolId);
            }
        });
    },

    loadData: function (pageNum, pageSize, counts, param, url, dataId, toolId) {
        $('#' + toolId + '_pageNum').val(pageNum);
        var params = { pageIndex: pageNum, pageSize: pageSize };
        for (var index in param) {
            params[index] = param[index];
        }
        if (layer != null) {
            var i = layer.load(2);
        }

        $('#' + dataId).load(url, params, function () {
            if (layer != null) {
                layer.close(i);
            }
        });
    },

    /*
     *总显示6页
     */
    showNotInput: function (pageSize, counts, url, param, isLoadData, dataId, positionId) {
        var $div = $('#' + positionId + '_Pagination');
        if ($div.length>0) {//存在相同的分页控件，删除原来的
            $div.remove();
        }
        var pageNum = 1;
        pageSize = Number(pageSize);
        counts = Number(counts);
        if (counts == 0) {
            return;
        }
        var pageCounts = Math.ceil(counts / pageSize);

        var showCount=6;

        var html = '<ul id="' + positionId + '_Pagination"><li id="' + positionId + '_backPage" k="-1"><a href="javascript:void(0);">上一页</a></li>';
        if (pageCounts <= showCount) {
            for (var i = 1; i <= pageCounts; i++) {
                if (i == 1) {
                    html += '<li class="current" k="' + i + '" id="' + positionId + '_li_' + i + '"><a href="javascript:void(0);">' + i + '</a></li>';
                } else {
                    html += '<li k="' + i + '" id="' + positionId + '_li_' + i + '"><a href="javascript:void(0);">' + i + '</a></li>';
                }
            }
        } else {
            var isMore = true;
            for (var i = 1; i <= pageCounts; i++) {
                if (i <= 3) {
                    if (i == 1) {
                        html += '<li class="current" k="' + i + '" id="' + positionId + '_li_' + i + '"><a href="javascript:void(0);">' + i + '</a></li>';
                    } else {
                        html += '<li k="' + i + '" id="' + positionId + '_li_' + i + '"><a href="javascript:void(0);">' + i + '</a></li>';
                    }
                } else if(i<pageCounts-1){
                    html += '<li k="' + i + '" id="' + positionId + '_li_' + i + '" style = "display:none;"><a href="javascript:void(0);">' + i + '</a></li>';
                } else {
                    if (isMore) {
                        html += '<li k="0" id="' + positionId + '_li_0">......</li>';
                        isMore = false;
                    }
                    html += '<li k="' + i + '" id="' + positionId + '_li_' + i + '"><a href="javascript:void(0);">' + i + '</a></li>';
                }
            }
        } 
        html += '<li id="' + positionId + '_nextPage" k="-1"><a href="javascript:void(0);">下一页</a></li></ul>';
          
        $('#' + positionId).html(html);//加在元素里面

        var $backPage = $('#' + positionId + '_backPage');
        var $nextPage = $('#' + positionId + '_nextPage');

        if (pageNum == 1) {//从第一页开始
            $backPage.addClass("no-use");
        }

        if (counts <= pageSize) {//只有一页
            $backPage.addClass("no-use");
            $nextPage.addClass("no-use");
        }

        if (pageCounts == pageNum) {//从最后一页开始
            $nextPage.addClass("no-use");
        }

        if (isLoadData) {
            this.loadDataNoInput(pageNum, pageSize, param, url, dataId);
        }

        $backPage.on('click', function () {
            var currNum = 1;
            var $currli;
            $('#' + positionId + '_Pagination').children().each(function () {
                $currli = $(this);
                if ($currli.hasClass("current")) {
                    currNum = Number($currli.attr("k"));
                }
            });

            if (currNum > 1) {
                currNum--;
                $nextPage.removeClass('no-use');

                if (currNum > 1) {
                    $nextPage.removeClass('no-use');
                } else {
                    $backPage.addClass('no-use');
                }

                $.pagination.liClick(currNum, showCount, pageCounts, pageSize, param, url, dataId,positionId, $backPage, $nextPage);
            }
        });

        $nextPage.on('click', function () {
            var currNum = 1;
            var $currli;
            $('#' + positionId + '_Pagination').children().each(function () {
                $currli = $(this);
                if ($currli.hasClass("current")) {
                    currNum = Number($currli.attr("k"));
                }
            });

            if (currNum < pageCounts) {
                currNum++;
                $backPage.removeClass('no-use');

                if (currNum < pageCounts) {
                    $backPage.removeClass('no-use');
                } else {
                    $nextPage.addClass('no-use');
                }
                $.pagination.liClick(currNum, showCount, pageCounts, pageSize, param, url, dataId,positionId, $backPage, $nextPage);
            }
        });

        $('#' + positionId + '_Pagination').on("click", "li", function () {
            var $this = $(this);
            var num = Number($this.attr("k"));
            if (num != -1 && num != 0) {
                $.pagination.liClick(num, showCount, pageCounts, pageSize, param, url, dataId,positionId, $backPage, $nextPage);
            }
        });
    },

    liClick: function (num, showCount, pageCounts, pageSize, param, url, dataId, positionId, back, next) {
        var $this = $('#' + positionId + '_li_' + num);
        if (num != 0 && !$this.hasClass("current")) {// ... 、当前页是自己 则不去刷新
            $this.addClass("current").siblings().removeClass("current");
            if (pageCounts > showCount) {
                if (pageCounts - num < showCount - 2) {//刚好在showCount个之内
                    //.... 隐藏
                    var $li0 = $('#' + positionId + '_li_0');
                    if ($li0.length > 0) {
                        $li0.hide();
                    }

                    //显示最后6页
                    for (var i = 1; i <= pageCounts; i++) {
                        if (i<=pageCounts - showCount) {
                            $('#' + positionId + '_li_' + i).hide();
                        } else {
                            $('#' + positionId + '_li_' + i).show();
                        }
                    }

                } else if (pageCounts - num == showCount - 2) {
                    //.... 隐藏
                    var $li0 = $('#' + positionId + '_li_0');
                    if ($li0.length > 0) {
                        $li0.hide();
                    }

                    //num-1 之前的页 隐藏  num-1 之后的都显示
                    for (var i = 1; i < pageCounts; i++) {
                        if (i < num - 1) {
                            $('#' + positionId + '_li_' + i).hide();
                        } else {
                            $('#' + positionId + '_li_' + i).show();
                        }
                    }
                } else {
                    //.... 显示
                    var $li0 = $('#' + positionId + '_li_0');
                    if ($li0.length > 0) {
                        $li0.show();
                    }

                    if (num == 1) {
                        // num+2 至 pageCounts-1 隐藏   num-1 num num+1 最后两页 显示
                        for (var i = 1; i <= pageCounts; i++) {
                            if (i > num - (-2) && i < pageCounts - 1) {
                                $('#' + positionId + '_li_' + i).hide();
                            } else {
                                $('#' + positionId + '_li_' + i).show();
                            }

                        }
                    }
                    else {
                        //num-1 之前的页 num+1 至 pageCounts-1 隐藏   num-1 num num+1 最后两页 显示 
                        for (var i = 1; i <= pageCounts; i++) {
                            if (i < num - 1 || (i > num - (-1) && i < pageCounts - 1)) {
                                $('#' + positionId + '_li_' + i).hide();
                            } else {
                                $('#' + positionId + '_li_' + i).show();
                            }

                        }
                    }
                }
            }
            //上下页按钮控制
            back.removeClass("no-use");
            next.removeClass("no-use");
            if (num == 1) {
                back.addClass("no-use");
            } else if (num == pageCounts) {
                next.addClass("no-use");
            }
        }
        $.pagination.loadDataNoInput(num, pageSize, param, url, dataId);
    },

    loadDataNoInput: function (pageNum, pageSize, param, url, dataId) {
        var params = { pageIndex: pageNum, pageSize: pageSize };
        for (var index in param) {
            params[index] = param[index];
        }
        if (layer != null) {
            var i = layer.load(2);
        }
        $('#' + dataId).load(url, params, function (data) {
            if (!isReLogin(data, params["callback"])) {
                if (layer != null) {
                    layer.close(i);
                }
            }
        });
    },

    showMobile: function (pageSize, counts, url, param, isLoadData, dataId) {
        pageSize = Number(pageSize);
        counts = Number(counts);
      
        if (counts == 0) {
            return;
        }
        var pageCounts = Number(Math.ceil(counts / pageSize));//总页数

        var pagenumid = dataId + "_curnum";

        $("#" + pagenumid).remove();
        
        var html = '<input id="' + pagenumid + '" type="hidden" value="1"/>';//用来存储当前的页数

        $('#' + dataId).after(html);

        if (isLoadData) {
            $.pagination.loadMoreData(pageCounts,pageSize, param, url, dataId, pagenumid);
        }

        if (pageCounts > 1) {
            if (!$.pagination.isHasScroll()) {
                $.pagination.isTouchEvent(dataId, function () {
                    if (!$.pagination.isHasScroll() && $.pagination.flag) {
                        this.flag = false;
                        $.pagination.loadMoreData(pageCounts, pageSize, param, url, dataId, pagenumid);
                    }
                });
            }
            
            //当滚动条到最底端时加载
            $(window).scroll(function () {
                if ($(document).scrollTop() >= $(document).height() - $(window).height() && $.pagination.flag) {
                    $.pagination.flag = false;
                    $.pagination.loadMoreData(pageCounts, pageSize, param, url, dataId, pagenumid);
                }
            });
        } 
    },
    loadMoreData: function (pageCounts, pageSize, param, url, dataId, pagenumid) {
       // console.log("pageCounts:" + pageCounts + "pageSize:" + pageSize);
        var pageNum =Number($('#' + pagenumid).val());
        pageNum++;
        //console.log(pageNum);
        //console.log(pageCounts);
        //console.log($.pagination.flag);
        if (pageNum <= pageCounts) {
            var params = { pageIndex: pageNum, pageSize: pageSize };
            for(var index in param) {
                params[index] = param[index];
            }
            if (layer != null) {
                var i = layer.load(2);
            }
            $.post(url, params, function (data) {
               // console.log("js:"+data);
                if (!isReLogin(data, params["callback"])) {
                    $('#' + dataId).append(data);
                    $('#' + pagenumid).val(pageNum);
                    if (layer != null) {
                        layer.close(i);
                    }
                    $.pagination.flag = true;
                }
            }, "html");
        }
    },
    isTouchEvent: function (id, up, down) {//id  up 上滑 down 下滑
        var startX = 0;
        var disY = 0;
        var startY = 0;
        var obj = document.getElementById(id);
        obj.addEventListener("touchstart", function (ev) {
            startY = ev.touches[0].pageY;
        }, false);
        obj.addEventListener("touchmove", function (ev) {
            event.preventDefault();
        }, false);
        obj.addEventListener("touchend", function (ev) {
            var endY = ev.changedTouches[0].pageY;
            disY = endY - startY;
            if (disY < -30) {
                up.apply(this);
                return;
            } else if (disY > 30) {
                //down.apply(this);
                return;
            }

        }, false);
    },
    isHasScroll: function () {//判断是否有滚动条
        var result = false;
        $("body").scrollTop(10);//控制滚动条下移10px  
        if ($("body").scrollTop() > 0) {//有滚动条
            result = true;
        } else {//没有滚动条
            result = false;
        }
        $("body").scrollTop(-10);//滚动条返回原位  
        return result;
    }
    ,
    isHasScroll2: function () {
        var doc = document,
        win = window,
        $ScrollBottom = $(doc).height() - $(win).height() - $(win).scrollTop();
        return $ScrollBottom > 0 ? true : false;
    }
};