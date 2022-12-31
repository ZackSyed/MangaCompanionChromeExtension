previousButton = document.getElementById("previous").addEventListener("click", () => openNextLink("previous"));
nextButton = document.getElementById("next").addEventListener("click", () => openNextLink("next"));

function openNextLink(whichPointer) {
    console.log('grabbing url to manipulate...');
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let tab = tabs[0];

    // function to find url
    console.log(tab.url);
    let href = manipulateUrl(tab.url, whichPointer);
    chrome.tabs.update(tab.id, {url: href});
    });
}

function manipulateUrl(url, whichPointer) {
    console.log("We are moving "); 
    console.log(whichPointer);
    console.log("Url is " + url);
    let newUrl = url.toLowerCase();
    let chapterInterval = 1;
    let newChapter;
    
// example #1: https://w17.readbluelock.com/manga/blue-lock-chapter-47/?2022-12-31?2022-12-30

    if(newUrl.includes("chapter")) {
        urlSplit = newUrl.split("chapter-");

        if (whichPointer === "previous") {
            newChapter = parseInt(urlSplit[1].split("/")[0]) - chapterInterval;
        } else {
            newChapter = parseInt(urlSplit[1].split("/")[0]) + chapterInterval;
        };
        newUrl = urlSplit[0] + "chapter-" + newChapter;

        console.log(newUrl);
    } 


    return newUrl;
}