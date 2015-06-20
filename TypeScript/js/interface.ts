interface SearchFuc {
    (soruce:string, subString:string):boolean;
}
var mySearch:SearchFuc;
mySearch = function (src:string, sub:string) {
    var result = src.search(sub);
    if (result != -1) {
        return true;
    }
    else
        return false;
};

interface  ArrayTest {
    [index:number]:string;
}
var myArray:ArrayTest;
myArray =["",""];
alert(myArray[1]);

interface ClockInterface{
    currentTime:Date;
}