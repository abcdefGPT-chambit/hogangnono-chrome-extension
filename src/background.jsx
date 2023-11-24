chrome.runtime.onInstalled.addListener(() => {
    console.log('just installed')
})

chrome.tabs.onUpdated.addListener(
    function(tabId, changInfo, tab){
        if(changInfo.url){
            console.log("탭 url이 변경됨", changInfo.url);
            chrome.runtime.reload();
        }
    }
)