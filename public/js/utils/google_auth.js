function getGoogleCredential(){
    return {
        API_KEY : "AIzaSyAZ_pcTF3WQnBqc9LNR8QeBTc3Xgpm9",
        CLIENT_ID : "570720008754-8crhg72apva9utkvkpv5lb7logd8nqqn.apps.googleusercontent.com"
    }
}
function googleInit(){
    if(window.gapi) window.gapi.load("client:auth2", function() {
        window.gapi.auth2.init({client_id: getGoogleCredential().CLIENT_ID});
    });
}
function authenticate(callback) {
    return window.gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"});
}
function loadClient() {
    window.gapi.client.setApiKey(getGoogleCredential().API_KEY);
    return window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { 
            console.log("GAPI client loaded for API"); 
            execute();
        },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute(pageToken) {
    const filter = {
        "part": [
            "snippet,contentDetails"
        ],
        "mine": true
    };
    if(pageToken) filter.pageToken = pageToken;
    return window?.gapi?.client?.youtube?.subscriptions?.list(
        filter
    )
    // .then(function(response) {
    //         // Handle the results here (response.result has the parsed body).
    //         console.log("Response", response);
    //         // while(getChannel(response, testChannel, null)){
                
    //         // }
    //     },
    //     function(err) { console.error("Execute error", err); }
    // );
}
function findChannel(channelId) {
    return window.gapi.client.youtube.channels.list({
      "part": [
        "snippet"
      ],
      "id": [
        channelId //"UCW5YeuERMmlnqo4oq8vwUpg"
      ]
    });
}
function getChannel (response, channelId, _nextPageToken) {
    const {result} = response || {};
    const {items, nextPageToken} = result || {};
    const channel = items && items.find(item=>item?.snippet?.resourceId?.channelId === channelId)
    if(channel) {
        _nextPageToken = null;
    } else _nextPageToken = nextPageToken;
    return {nextPageToken : _nextPageToken, channel};
}
const channelInfo = async (channelId) => {
    const response = await findChannel(channelId);
    const {result} = response;
    const {items} = result || {};
    const channel = items && items.find(item=>item?.snippet?.resourceId?.channelId === channelId)
    return channel; //channel.snippet?.title;
}
async function youtubeVerifyFollow(channelId){
    let nextPageToken = null, channel;
    do{
        const response = await execute(nextPageToken);
        const result = getChannel(response, channelId, null);
        const {nextPageToken : _nextPageToken, channel : _channel} = result || {};
        nextPageToken = _nextPageToken;
        channel = _channel;
    }while(nextPageToken)
    return channel
}
const verifyYoutube = async (channelId) => {
    await authenticate();
    await loadClient();
    let nextPageToken = null, channel;

    do{
        const response = await execute(nextPageToken);
        const result = getChannel(response, channelId, null);
        const {nextPageToken : _nextPageToken, channel : _channel} = result || {};
        nextPageToken = _nextPageToken;
        channel = _channel;
    }while(nextPageToken)
    return channel
}