console.log('extension running')
// chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
//   if(request.message==='generate'){
//     sendResponse({message:'i got ur message'});
//     console.log('message recieved');
//   }
// })

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    if (request.message == "generate")
    {  
      console.log('message received')
      // var videourl="";
      // chrome.tabs.onActivated.addListener(tab=>{
      //   chrome.tabs.get(tab.tabId,current_tab_info=>{
      //     videourl=current_tab_info.url;
      //   })
      // });
      // chrome.tabs.query({active: true}, function(tabs) {
      //    videourl = tabs[0].url;
      //});
      console.log(request.url);
      fetch(`http://127.0.0.1:5000/api/summarize?youtube_url=${request.url}`)
      .then(res=>res.json())
      .then(result=>{
        //console.log('reached near message');
        console.log(result.message);
        sendResponse({message: result});
        //sendResponse({message:"hi there"});
      })
      .catch(err=>{
        console.log('error generated')
        sendResponse({message:err})
      });
      return true;
    }
  }
      
);