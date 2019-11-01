USETEXTLINKS = 1
foldersTree=gFld("<font size=2 color=#6666FF>主 選 單</font>","")
  aux1 = insFld(foldersTree, gFld("<font size=2'>同學回憶</font>", "left.htm#"))
  insDoc(aux1, gLnk(2,"男生", "306boy.htm"))
  insDoc(aux1, gLnk(2,"女生", "306girl.htm"))

                                                          //檔案位置要正確
 aux1 = insFld(foldersTree, gFld("<font size=2>老師一覽</font>", "left.htm#"))
  insDoc(aux1, gLnk(2,"國文", "ch.htm"))
  insDoc(aux1, gLnk(2,"英文", "en.htm"))
  insDoc(aux1, gLnk(2,"數學", "math.htm"))
  insDoc(aux1, gLnk(2,"理化", "na.htm"))
  insDoc(aux1, gLnk(2,"歷史", "his.htm"))
  insDoc(aux1, gLnk(2,"地理", "ear.htm"))
  insDoc(aux1, gLnk(2,"生物", "bio.htm"))
  insDoc(aux1, gLnk(2,"公民", "peo.htm"))
  
 aux1 = insFld(foldersTree, gFld("<font size=2>睹圖思人</font>", "left.htm#"))
  insDoc(aux1, gLnk(2,"生活照片", "pic/index.htm"))
  insDoc(aux1, gLnk(2,"看圖說話", "story.htm")) 
 aux1 = insFld(foldersTree, gFld("<font size=2>尋人服務</font>", "left.htm#"))
	      aux2 = insFld(aux1, gFld("<font size=2>現況</Font>", "left.htm#"))
 			insDoc(aux2, gLnk(2, "男生", "where.htm"))
	                insDoc(aux2, gLnk(2, "女生", "where2.htm"))
  insDoc(aux1, gLnk(2,"電話", "tel.htm"))
  insDoc(aux1, gLnk(2,"地址", "add.htm"))
  aux1 = insFld(foldersTree, gFld("<font size=2>特別活動</font>", "left.htm#"))
  insDoc(aux1, gLnk(2,"跨 年","year_left.htm" ))
  insDoc(aux1, gLnk(2,"同 學 會","classmate.htm" ))
  
 aux1 = insFld(foldersTree, gFld("<font size=2>聯   絡   簿</font>", "left.htm#"))
insDoc(aux1, gLnk(2,"留 言 板","http://web.im.tku.edu.tw/gbook/view.php?id=V00096" ))
insDoc(aux1, gLnk(2,"e-mail給我", "mailto:wei1984@ms39.hinet.net"))
  
   aux1 = insFld(foldersTree, gFld("<font size=2>網網相連</font>", "left.htm#"))
  insDoc(aux1, gLnk(2,"學校類", "link01.htm"))
  insDoc(aux1, gLnk(2,"個人類", "link02.htm"))
  
 aux1 = insFld(foldersTree, gFld("<font size=2><a href=mainpage2.htm target=main>回   首   頁</a></font>", "left.htm#"))

