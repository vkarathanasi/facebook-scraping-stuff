/*
Vanilla JS code for scrolling to the bottom of a Facebook Group members page (e.g., 
https://www.facebook.com/groups/<groupname-or-ID>/members/). 

Created a bookmarklet version as well, see comment at bottom.
*/

var numMembers = parseInt(document.querySelector("#groupsMemberBrowser > div > div > div > span").innerText);  // ^^^ fragile
var millisecondsBetweenScrolls = 2500; //you want the last set of results to fully load first

(function dgInfiniteScrollLoop(i) {
  setTimeout(function () {
    window.scrollTo(0,document.body.scrollHeight); if (--i) dgInfiniteScrollLoop(i);
  }, millisecondsBetweenScrolls)
})(numMembers/10);

/* Bookmarklet:

javascript:(function()%7Bvar numMembers %3D parseInt(document.querySelector("%23groupsMemberBrowser > div > div > div > span").innerText)%3Bvar millisecondsBetweenScrolls %3D 2500%3B(function dgInfiniteScrollLoop(i) %7BsetTimeout(function () %7Bwindow.scrollTo(0%2Cdocument.body.scrollHeight)%3B if (--i) dgInfiniteScrollLoop(i)%3B%7D%2C millisecondsBetweenScrolls)%7D)(numMembers%2F10)%7D)()

*/
