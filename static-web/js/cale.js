function $id(id) {
    return document.getElementById(id);
}

let today = new Date();
let yy = parseInt(today.getFullYear());
let mm = parseInt(today.getMonth());

function makeDays(yy,mm){
    var firstday=new Date(yy,mm,1)//第一天
    var firstdayBefore=parseInt(firstday.getDay());
    console.log(firstdayBefore);
    for(var i = 0;i<firstdayBefore;i++){
        dayObj=document.createElement("li");
        dayObj.className="days";
        $id("days").appendChild(dayObj);//日曆前空白天數
    }
    for(var i=1;i<=CountByYearAndMonth(yy,mm);i++){
        dayObj=document.createElement("li");
        dayObj.className="day";
        // dayObj.name=yy+"-"+(parseInt(mm)+1)+"-"+i;
        // console.log(dayObj.name);

        $id("days").appendChild(dayObj);
        dayObj.innerHTML=i;
        
        if(today.getFullYear()==yy && today.getMonth()==mm &&today.getDate()==i){
            dayObj.id="thisDay"
        }
    }
}
function CountByYearAndMonth(yy,mm){
    mm++;
    if(mm==4||mm==6||mm==9||mm==11)return 30;
    if(mm==2){
        if((yy%4==0)&&(yy%100!=0)||(yy%400==0))
        return 29;
    return 28;
    }return 31;//計算閏年閏月天數
}
function YearAndMonthOption(yyNum){
    for(var i =-yyNum;i<yyNum;i++){
        yyObj=document.createElement("option");
        yyObj.innerHTML=parseInt(today.getFullYear())+i;
        yyObj.value=parseInt(today.getFullYear())+i;
        $id("setYear").appendChild(yyObj);
    }
for(var i = 0;i<12;i++){
    mmObj=document.createElement("option");
    mmObj.innerHTML=i+1;
    mmObj.value=i;
    $id("setMonth").appendChild(mmObj);
}
$id("setYear").selectedIndex=yyNum;
$id("setMonth").selectedIndex=parseInt(today.getMonth());
makeDays(parseInt(yy),parseInt(mm));
}

YearAndMonthOption(10);
function chose(e)
    {
        if(e.id == "setYear"){
            yy = e.value;	
        }
        if(e.id == "setMonth"){
            mm = e.value;
        }
        $id("days").innerHTML="";
        makeDays(yy,mm);
    }
//chose=>makeDays=>CountByYearAndMonth=>
//YearAndMonthOption=>makeDays=>CountByYearAndMonth=>
