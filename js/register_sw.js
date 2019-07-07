if(navigator.serviceWorker){
    navigator.serviceWorker.register('/sw.js')
    .then(function(registration){
        console.log(`Registration successful, scope is ${registration}`);
    })
    .catch(function(error){
        console.log(`Service worker registration failed, error: ${error}`);
    });
}