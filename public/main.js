function paintData({ data }) {
  const container = document.getElementById('app');
  for (let d of data) {
    container.innerHTML += `
      <h1>${d.first_name}</h1>
      <img src="${d.avatar}" alt="">    
      <hr/>    
    `
  }
}

async function InitApp(url, next) {
  try {
    let GetData = await fetch(url);
    let data = await GetData.json();
    next(data);
  } catch (error) {
    console.log(error);
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
    // Registration was successful
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function (err) {
    // registration failed :(
    console.log('ServiceWorker registration failed: ', err);
  });
}

InitApp('https://reqres.in/api/users?page=4', paintData)