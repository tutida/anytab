/* extensionのボタンクリックで新規タブを開く */
chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.create({});
});
