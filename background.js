chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(changeInfo.url){
        const url = new URL(changeInfo.url);
        const searchQuery = url.searchParams.get("q");

        if(searchQuery){
            console.log("User Searched for: " + searchQuery);
        }
    }


     });