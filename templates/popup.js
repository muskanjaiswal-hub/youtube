const button=document.querySelector('.btn');
const summary=document.querySelector('.summary');
//console.log('here');
button.addEventListener('click',()=>{
    //console.log('here');
    button.classList.add('activebtn');
    summary.classList.add('active');
    summary.classList.add('loading');
    //chrome.runtime.sendMessage({message:'generate'},res=>summary.innerHTML=res);
    //console.log("message sent from popup");
    var videourl="https://cors-anywhere.herokuapp.com/";
      // chrome.tabs.onActivated.addListener(tab=>{
      //   chrome.tabs.get(tab.tabId,current_tab_info=>{
      //     videourl=current_tab_info.url;
      //   })
      // });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      videourl+=tabs[0].url;
      chrome.tabs.sendMessage(tabs[0].id, {message: "generate", url:videourl}, function(response) {
        //console.log(message.message[0]);
        //summary.innerHTML=response.message.message[0];
        //console.log(response);
        //var msg="";
        // await function getResponse(){
        //     msg=response.message.message[0];
        // }
        //summary.innerHTML="value2";
        summary.classList.remove('loading');
        summary.innerHTML=response.message.message[0];
        //return response.message[0];
      });
      // .then(value=>{
      //   console.log(value);
      //   summary.innerHTML="value";
      // })
      // .catch(err=>{
      //   console.log(err);
      //   summary.innerHTML="value";
      // })

    });
})