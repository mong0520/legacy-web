//Author:linss<linss@ms1.url.com.tw> 	Release:2002/4/11
var Dest_Win,Page_Len,Page_Cnt,Part_Len,Show_Msg,Last_Str,Curr_Str,Temp_Res,NotFound

Dest_Win="main"	//�]�w�ؼе���
Page_Len=9		//�]�w��������
Part_Len=100		//�^����r����

function Query(v,p){
var j=0
Curr_Str=v.replace(/^[\s]+/g,"").replace(/[\s]+$/g,"")
qt=Curr_Str.replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/\?/g,"\\?").replace(/\*/g,"\\*").replace(/\|/g,"\\|").replace(/\$/g,"\\$").replace(/\+/g,"\\+").replace(/\[/g,"\\[").replace(/\]/g,"\\]").replace(/\^/g,"\\^").replace(/\//g,"\\/")
document.QF.QT.value=Curr_Str
if(Curr_Str){
if(Curr_Str!=Last_Str){
Temp_Res=new Array
var Part_Str,Pos_0,Pos_L,Pos_R,Pos_1,Pos_2
NotFound=true
for(i=0;i<Str_DB.length;i++){
var Found=Str_DB[i][2].search(eval("/"+qt+"/"))
if(Found>=0){
var Helf_Len=parseInt(Part_Len/2)
Pos_0=Found
Pos_L=(Pos_0-Helf_Len<1)?Math.abs(Pos_0-Helf_Len):0
Pos_R=(Str_DB[i][2].length-(Pos_0+Helf_Len)<1)?Math.abs(Str_DB[i][2].length-(Pos_0+Helf_Len)):0
Pos_1=Pos_0-Helf_Len-Pos_R
Pos_2=Pos_0+Helf_Len+Pos_L
Part_Str=Str_DB[i][2].substring(Pos_1,Pos_2)
if(Pos_2<Str_DB[i][2].length)Part_Str+="..."
Part_Str=Part_Str.replace(eval("/"+qt+"/g"),"<font color=red>"+Curr_Str+"</font>")
Temp_Res[j]=new Array
Temp_Res[j][0]=Str_DB[i][0]
Temp_Res[j][1]=Str_DB[i][1]
Temp_Res[j][2]=Part_Str
j++
NotFound=false
}
}
Page_Cnt=parseInt((j+Page_Len-1)/Page_Len)
Show_Msg=(NotFound)?"�䤣�������ơI":"�@�j�M�� <font color=\"#3377ee\">"+j+"</font> ����ơC"
Last_Str=Curr_Str
}
showResultPage(p)

}else{
alert("�z��������J����r�~��i��j�M�I")
document.QF.QT.focus()
}
}

function showResultPage(p){
if(Temp_Res){
p=(p>Page_Cnt)?Page_Cnt:p
var P_bof=(p-1)*Page_Len
var P_eof=(Page_Len*(p)>Temp_Res.length)?Temp_Res.length:Page_Len*p
var Page_Res=window.open("",Dest_Win)
with(Page_Res.document){
open()
writeln("<script>")
write("var ANSICode=\""+escape("<html>"))
write(escape("<head>"))
write(escape("<meta http-equiv=\"Content-Type\" content=\"text/html; CHARSET=utf-8\">"))
write(escape("<link rel=stylesheet type=\"text/css\" href=\"./query_demo.css\">"))
write(escape("</head>"))
write(escape("<body background=back.jpg marginwidth=0 margintop=0>"))
write(escape("<table width=100% border=0 cellpadding=0 cellspacing=0><tr>"))
write(escape("<td height=26 bgcolor=#4444FF class=\"result\"><table width=100% border=0 cellpadding=0 cellspacing=2><tr>"))
write(escape("<td>�z��J������r�u <font color=\"#3377ee\">"+Curr_Str+"</font> �v"+Show_Msg+"</td>"))
if(!NotFound){
write(escape("<form><td align=right><select class=\"pager\" onchange=\"parent."+this.window.name+".Query('"+Last_Str+"',this.options[this.selectedIndex].value)\">"))
for(i=1;i<=Page_Cnt;i++){
var s=(i==p)?" selected class=\"selection\">":">"
write(escape("<option value=\""+i+"\""+s+"&nbsp;�� "+i+" ��&nbsp;"))
}
write(escape("</select></td></form>"))
}
write(escape("</tr></table></td></tr>"))
if(!NotFound){
for(i=P_bof;i<P_eof;i++){
write(escape("<tr><td bgcolor=\"#4444FF\"><div class=\"topic\"></div></td></tr>"))
write(escape("<tr><td><div class=\"source\">"+Temp_Res[i][2]+"</div></td></tr>"))

}
}
if(!NotFound){
write(escape("<tr><td height=\"36\" align=\"center\">"))
write(escape("�����G<font face=\"verdana\"><b>"))
for(i=1;i<=Page_Cnt;i++){
if(i==p){write(escape("[<font color=\"#4444FF\">"+i+"</font>]&nbsp;"))}else{write(escape("<a href=\"javascript:parent."+this.window.name+".Query('"+Last_Str+"',"+i+")\" hidefocus=\"true\">"+i+"</a>&nbsp;"))}
}
write(escape("</b></font></td></tr>"))
}
write(escape("</table>"))
write(escape("</body>"))
writeln(escape("</html>")+"\"")
writeln("document.write(unescape(ANSICode))")
writeln("</script>")
close()
}
}
}

var isDOM=(document.getElementById?true:false)
var isIE4=((document.all&&!isDOM)?true:false)
var isNS4=(document.layers?true:false)
function canclekey(evt){
if(document.all)key=event.keyCode
  else if(isDOM)key=evt.charCode
  else if(isNS4)key=evt.which
if(key==92/*\*/)
return false
}
if(isNS4)document.captureEvents(Event.KEYPRESS)
document.onkeypress=canclekey