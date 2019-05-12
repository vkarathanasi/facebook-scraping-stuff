/*
Vanilla JS to dump a tab-separated table (Name\tOther Displayed Info\tProfile URL) of group
members to the console, after scrolling to bring them all on screen.

I haven't bookmarkletized this yet.

There are often several lists of members for a group (Mods, Friends, etc), and this captures 
all of them, so you'll need ot deduplicate later.
*/

var people = [];
var containers = document.getElementsByClassName("fbProfileBrowserListContainer");

for (i = 0; i<containers.length; i++) {
  var contents = containers[i].getElementsByClassName("uiProfileBlockContent");
  for (j = 0; i<contents.length; j++) {
    var curPerson = contents[i];
    var cpSplitInnerText = curPerson.innerText.split("\n");
    var pushName = cpSplitInnerText[0];
    var pushOther = cpSplitInnerText.slice(1,cpSplitInnerText.length-2).join(" | ");
    var pushURL = "";
    var cpInnerHTML = curPerson.innerHTML;
    var urlStart = cpInnerHTML.search('href="')+6;
    var urlEnd = cpInnerHTML.search('fref')-1;
    if (urlStart > 5) {
      pushURL = cpInnerHTML.substring(urlStart,urlEnd);
    }
    people.push(pushName+"\t"+pushOther+"\t"+pushURL+"\n");
  }
}
console.log(people.join(""));
