chrome.runtime.onInstalled.addListener(() => {
    console.log('just installed')
})

chrome.bookmarks.onCreated.addListener(() => {
    console.log('just bookmarked')
})