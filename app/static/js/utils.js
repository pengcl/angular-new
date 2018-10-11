var utils = {
    regStr:{
        mobile: /^1\d{10}$/,
        phone: /(^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^((0\d{2,3}))(\d{7,8})(-(\d{3,}))?$)/,
        email: /^([a-zA-Z0-9]+[-|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[-|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    }
};

//获取对象或数组中选中对象的index
function getIndex(jsonArray, keyName, value) {
    for (var i = 0; i < jsonArray.length; i++) {
        if (jsonArray[i][keyName] == value) {
            return i;
        }
    }
};