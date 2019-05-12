An unimaginitively named and loosely organized collection of JS code snippets I may or may not have been using to capture data from Facebook, which may or may not comply with their TOS.

#My Steps for scraping an FB Group Member List with vanilla Javascript in Chrome:

1. Navigate to Group Members page (/groups/<groupname>/members/).  
2. Open Chrome Dev Tools (CTRL+SHIFT+I, or use the menus).
3. Under the Console tab, paste the following code (see also ?.js) at the cursor and hit enter:

```javascript
var numMembers = parseInt(document.querySelector("#groupsMemberBrowser > div > div > div > span").innerText); 
// ^^^ fragile
var millisecondsBetweenScrolls = 2500; 
//you want the last set of results to fully load first

(function dgInfiniteScrollLoop(i) {
  setTimeout(function () {
    window.scrollTo(0,document.body.scrollHeight); if (--i) dgInfiniteScrollLoop(i);
  }, millisecondsBetweenScrolls)
})(numMembers/10);
```

4. When the page stops changing (no more scrolls/loads), which can take a while if the group is large, go back to the Dev Tools console, and at the cursor, paste the following code block:

```javascript
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
```

5. The resulting output should be easily copy/pastable to excel. You will probably need to do some deduplication and cleaning after, however.
