/**
 * Created by creditease on 2015/6/10.
 */
var isBoolean:boolean = false;
var num:number = 10;
var lists:any[] = [1,2,3,'xx']; // first method
var listss:Array<string> = ["iwen","ime"];
function call() {
    num = num + 1;
    alert(lists[1]);
    alert(num);
    alert(isBoolean);
}
call();