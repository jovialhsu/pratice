var avaliable = [];
var vcode = [];
function discountMap(data) {
    var types = [],
        coupons = [];
    data.forEach(function (value, index, array) {
        if (types.indexOf(value.discountCode) === -1) {//ç•¶typesä¸­æ²’æœ‰é€™å¼µæŠ˜æ‰£ç¢¼çš„æ™‚å€™push
            types.push(value.discountCode);
        }
    });
    types.forEach(function (value, index, array) {
        data.forEach(function (val, i, a) {
            if (val.discountCode === value) {
                coupons.push({
                    "discountCode": val.discountCode,
                    "favourablePrice": val.favourablePrice,
                    "price": val.price,
                    "prodSeqno": val.prodSeqno,
                    "projNo": val.projNo,
                    "projName": val.projName,
                    "discountType": val.discountType,
                    "discountValue": val.discountValue,
                    "minOrderPrice": val.minOrderPrice,
                    "orderDtBegins": val.orderDtBegins,
                    "orderDtExpires": val.orderDtExpires,
                    "channel": val.channel,
                    "projRemark": val.projRemark,
                    "claimDt": val.claimDt
                });
            }
        });
        avaliable.push(value)
        array[index] = {
            "code": value,
            "coupons": coupons
        };
        coupons = [];
    });
    return { types: types };
}
var data = [
    {
        "projNo": "P000000000777",
        "discountType": "CASH",
        "discountValue": "300",
        "prodNo": "GRT0000004724",
        "prodSeqno": 1,
        "price": 1000,
        "favourablePrice": 950,
        "projName": "TEST-joe 測試折扣碼 -300",
        "projRemark": "joe 測試用專案",
        "orderDtBegins": "2016-06-15 00:00:00+0800",
        "orderDtExpires": "2050-12-31 00:00:00+0800",
        "discountCode": "fcd1683f74d2d",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 2000,
        "channel": "ALL",
        "claimDt": "2020-07-17 15:42:44+0800"
    },
    {
        "projNo": "P000000000777",
        "discountType": "CASH",
        "discountValue": "300",
        "prodNo": "GRT0000004724",
        "prodSeqno": 2,
        "price": 2000,
        "favourablePrice": 1900,
        "projName": "TEST-joe 測試折扣碼 -300",
        "projRemark": "joe 測試用專案",
        "orderDtBegins": "2016-06-15 00:00:00+0800",
        "orderDtExpires": "2050-12-31 00:00:00+0800",
        "discountCode": "fcd1683f74d2d",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 2000,
        "channel": "ALL",
        "claimDt": "2020-07-17 15:42:44+0800"
    },
    {
        "projNo": "P000000000777",
        "discountType": "CASH",
        "discountValue": "300",
        "prodNo": "GRT0000004724",
        "prodSeqno": 3,
        "price": 3000,
        "favourablePrice": 2850,
        "projName": "TEST-joe 測試折扣碼 -300",
        "projRemark": "joe 測試用專案",
        "orderDtBegins": "2016-06-15 00:00:00+0800",
        "orderDtExpires": "2050-12-31 00:00:00+0800",
        "discountCode": "fcd1683f74d2d",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 2000,
        "channel": "ALL",
        "claimDt": "2020-07-17 15:42:44+0800"
    },
    {
        "projNo": "P000000001906",
        "discountType": "CASH",
        "discountValue": "168",
        "prodNo": "GRT0000004724",
        "prodSeqno": 1,
        "price": 1000,
        "favourablePrice": 972,
        "projName": "APP折168",
        "projRemark": "APP折168",
        "discountCode": "4251223b6a076",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 0,
        "channel": "APP",
        "claimDt": "2020-07-17 15:43:31+0800"
    },
    {
        "projNo": "P000000001906",
        "discountType": "CASH",
        "discountValue": "168",
        "prodNo": "GRT0000004724",
        "prodSeqno": 2,
        "price": 2000,
        "favourablePrice": 1944,
        "projName": "APP折168",
        "projRemark": "APP折168",
        "discountCode": "4251223b6a076",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 0,
        "channel": "APP",
        "claimDt": "2020-07-17 15:43:31+0800"
    },
    {
        "projNo": "P000000001906",
        "discountType": "CASH",
        "discountValue": "168",
        "prodNo": "GRT0000004724",
        "prodSeqno": 3,
        "price": 3000,
        "favourablePrice": 2916,
        "projName": "APP折168",
        "projRemark": "APP折168",
        "discountCode": "4251223b6a076",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 0,
        "channel": "APP",
        "claimDt": "2020-07-17 15:43:31+0800"
    },
    {
        "projNo": "P000000001932",
        "discountType": "CASH",
        "discountValue": "100",
        "prodNo": "GRT0000004724",
        "prodSeqno": 1,
        "price": 1000,
        "favourablePrice": 984,
        "projName": "全不限",
        "projRemark": "全不限條件",
        "discountCode": "ecd858fdfa3da",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 0,
        "channel": "ALL",
        "claimDt": "2020-07-17 15:43:04+0800"
    },
    {
        "projNo": "P000000001932",
        "discountType": "CASH",
        "discountValue": "100",
        "prodNo": "GRT0000004724",
        "prodSeqno": 2,
        "price": 2000,
        "favourablePrice": 1966,
        "projName": "全不限",
        "projRemark": "全不限條件",
        "discountCode": "ecd858fdfa3da",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 0,
        "channel": "ALL",
        "claimDt": "2020-07-17 15:43:04+0800"
    },
    {
        "projNo": "P000000001932",
        "discountType": "CASH",
        "discountValue": "100",
        "prodNo": "GRT0000004724",
        "prodSeqno": 3,
        "price": 3000,
        "favourablePrice": 2950,
        "projName": "全不限",
        "projRemark": "全不限條件",
        "discountCode": "ecd858fdfa3da",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 0,
        "channel": "ALL",
        "claimDt": "2020-07-17 15:43:04+0800"
    },
    {
        "projNo": "P000000001958",
        "discountType": "CASH",
        "discountValue": "10",
        "prodNo": "GRT0000004724",
        "prodSeqno": 1,
        "price": 1000,
        "favourablePrice": 999,
        "projName": "銀行折扣碼國泰世華測試專案",
        "projRemark": "銀行折扣碼測試專案, 只限400001, 400361, 424242開頭之國泰世華卡號, 折扣50元",
        "discountCode": "e3e269fa42646",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 0,
        "channel": "ALL",
        "claimDt": "2020-07-17 15:43:19+0800"
    },
    {
        "projNo": "P000000001958",
        "discountType": "CASH",
        "discountValue": "10",
        "prodNo": "GRT0000004724",
        "prodSeqno": 2,
        "price": 2000,
        "favourablePrice": 1996,
        "projName": "銀行折扣碼國泰世華測試專案",
        "projRemark": "銀行折扣碼測試專案, 只限400001, 400361, 424242開頭之國泰世華卡號, 折扣50元",
        "discountCode": "e3e269fa42646",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 0,
        "channel": "ALL",
        "claimDt": "2020-07-17 15:43:19+0800"
    },
    {
        "projNo": "P000000001958",
        "discountType": "CASH",
        "discountValue": "10",
        "prodNo": "GRT0000004724",
        "prodSeqno": 3,
        "price": 3000,
        "favourablePrice": 2995,
        "projName": "銀行折扣碼國泰世華測試專案",
        "projRemark": "銀行折扣碼測試專案, 只限400001, 400361, 424242開頭之國泰世華卡號, 折扣50元",
        "discountCode": "e3e269fa42646",
        "prodNm": "IT Joe test - 欲更動商品設定、撥補數量，請告知 Joe 謝謝 - 清境佛羅倫斯山莊綿羊草原",
        "minOrderPrice": 0,
        "channel": "ALL",
        "claimDt": "2020-07-17 15:43:19+0800"
    }
];
var valid = [
    {
        "id": 1,
        "projNo": null,
        "projCode": "TKTXFTK",
        "projName": "買機票送上網商品折扣碼50元",
        "projRemark": "恭喜您獲得50元購物金！凡購買WIFI網卡商品，單筆訂單滿3百即可折抵。購物金歸戶後7天有效，一旦使用，訂單取消亦不可返還。",
        "orderDtBegins": "2020-07-17 17:23:50+0800",
        "orderDtExpires": "2020-07-24 17:23:50+0800",
        "fromDtBegins": null,
        "fromDtExpires": null,
        "endDtBegins": null,
        "endDtExpires": null,
        "minOrderPrice": 0,
        "discountType": "CASH",
        "discountValue": "50",
        "discountCode": "e88a609d58cc2",
        "exposeLimit": "ALL",
        "discountState": null,
        "custNo": null,
        "delete": null,
        "createDt": null,
        "modifyDt": null,
        "orderNo": null,
        "orderDtCreated": null,
        "claimDt": "2020-07-17 17:23:50+0800",
        "infoPage": "https://activity.eztravel.com.tw/global/promoPage/wifi-sim",
        "details": [],
        "isShowInfoPage": true,
        "claimExpireDay": 7,
        "channel": null
    },
    {
        "id": 2,
        "projNo": null,
        "projCode": "app2019168",
        "projName": "APP折168",
        "projRemark": "APP折168",
        "orderDtBegins": null,
        "orderDtExpires": null,
        "fromDtBegins": null,
        "fromDtExpires": null,
        "endDtBegins": null,
        "endDtExpires": null,
        "minOrderPrice": 0,
        "discountType": "CASH",
        "discountValue": "168",
        "discountCode": "4251223b6a076",
        "exposeLimit": "APP",
        "discountState": null,
        "custNo": null,
        "delete": null,
        "createDt": null,
        "modifyDt": null,
        "orderNo": null,
        "orderDtCreated": null,
        "claimDt": "2020-07-17 15:43:31+0800",
        "infoPage": null,
        "details": [],
        "isShowInfoPage": false,
        "claimExpireDay": null,
        "channel": null
    },
    {
        "id": 3,
        "projNo": null,
        "projCode": "bankcubtest",
        "projName": "銀行折扣碼國泰世華測試專案",
        "projRemark": "銀行折扣碼測試專案, 只限400001, 400361, 424242開頭之國泰世華卡號, 折扣50元",
        "orderDtBegins": null,
        "orderDtExpires": null,
        "fromDtBegins": null,
        "fromDtExpires": null,
        "endDtBegins": null,
        "endDtExpires": null,
        "minOrderPrice": 0,
        "discountType": "CASH",
        "discountValue": "10",
        "discountCode": "e3e269fa42646",
        "exposeLimit": "ALL",
        "discountState": null,
        "custNo": null,
        "delete": null,
        "createDt": null,
        "modifyDt": null,
        "orderNo": null,
        "orderDtCreated": null,
        "claimDt": "2020-07-17 15:43:19+0800",
        "infoPage": null,
        "details": [],
        "isShowInfoPage": false,
        "claimExpireDay": null,
        "channel": null
    },
    {
        "id": 4,
        "projNo": null,
        "projCode": "alluser",
        "projName": "全不限",
        "projRemark": "全不限條件",
        "orderDtBegins": null,
        "orderDtExpires": null,
        "fromDtBegins": null,
        "fromDtExpires": null,
        "endDtBegins": null,
        "endDtExpires": null,
        "minOrderPrice": 0,
        "discountType": "CASH",
        "discountValue": "100",
        "discountCode": "ecd858fdfa3da",
        "exposeLimit": "ALL",
        "discountState": null,
        "custNo": null,
        "delete": null,
        "createDt": null,
        "modifyDt": null,
        "orderNo": null,
        "orderDtCreated": null,
        "claimDt": "2020-07-17 15:43:04+0800",
        "infoPage": null,
        "details": [],
        "isShowInfoPage": false,
        "claimExpireDay": null,
        "channel": null
    },
    {
        "id": 5,
        "projNo": null,
        "projCode": "test777",
        "projName": "TEST-joe 測試折扣碼 -300",
        "projRemark": "joe 測試用專案",
        "orderDtBegins": "2016-06-15 00:00:00+0800",
        "orderDtExpires": "2050-12-31 00:00:00+0800",
        "fromDtBegins": null,
        "fromDtExpires": null,
        "endDtBegins": null,
        "endDtExpires": null,
        "minOrderPrice": 2000,
        "discountType": "CASH",
        "discountValue": "300",
        "discountCode": "fcd1683f74d2d",
        "exposeLimit": "ALL",
        "discountState": null,
        "custNo": null,
        "delete": null,
        "createDt": null,
        "modifyDt": null,
        "orderNo": null,
        "orderDtCreated": null,
        "claimDt": "2020-07-17 15:42:44+0800",
        "infoPage": null,
        "details": [],
        "isShowInfoPage": false,
        "claimExpireDay": null,
        "channel": null
    },
    {
        "id": 6,
        "projNo": null,
        "projCode": "Cruises3000",
        "projName": "遊輪折3000-2",
        "projRemark": "遊輪商品FRN0000013936(10/2出發)折3000",
        "orderDtBegins": null,
        "orderDtExpires": null,
        "fromDtBegins": "2016-10-02 00:00:00+0800",
        "fromDtExpires": "2016-10-02 23:59:59+0800",
        "endDtBegins": null,
        "endDtExpires": null,
        "minOrderPrice": 0,
        "discountType": "CASH",
        "discountValue": "3000",
        "discountCode": "fe2fb776ae37d",
        "exposeLimit": "ALL",
        "discountState": null,
        "custNo": null,
        "delete": null,
        "createDt": null,
        "modifyDt": null,
        "orderNo": null,
        "orderDtCreated": null,
        "claimDt": "2020-07-17 15:42:28+0800",
        "infoPage": null,
        "details": [],
        "isShowInfoPage": false,
        "claimExpireDay": null,
        "channel": null
    }
];

function validcode(data) {
    var code = [];
    data.forEach(function (v, index, array) {
        code.push(v.discountCode)
    })
    return code;
}
function filll(arr1, arr2) {
    //var arr = [0, 1, 2, 3, 4, 'age', 6, 7, 8, 9];
    //var array2 = [0, 1, 'age', 6, 7, 8, 9];
    var result = [];
    for (key in arr1) {
        var stra = arr1[key];
        var count = 0;
        for (var j = 0; j < arr2.length; j++) {
            var strb = arr2[j];
            if (stra == strb) {
                count++;
            }
        } if (count === 0) {//表示陣列1的這個值沒有重複的,放到arr3列表中  
            result.push(stra);
        }
    } return result
}

var list = validcode(valid);
// var notApplyOfList = filll(list, avaliable);
//console.log(notApplyOfList)
console.log(discountMap(data))
console.log(avaliable)
console.log(validcode(valid))
console.log(filll(list, avaliable))
function filterValid(code, allList) {
    console.log(code)
return allList.filter(function (item, index, array) {
    for(var i = 0;i<code.length;i++){
        console.log(code[0])
       if( item.discountCode === code[i]){
           return item
       } 
    }
    
})
    // allList.filter(function (item, index, array) {
    //     // code.forEach(function (value, index, a) {
    //       console.log(item.discountCode)
    //       for(var i = 0; i<code.length;i++){
    //           return item.discountCode === code[i]
    //       //}
    //     //}) 
    // })
}
console.log(filterValid(filll(list, avaliable),valid))