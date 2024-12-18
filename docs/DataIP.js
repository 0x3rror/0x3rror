let pageViews = 0;
if (localStorage.getItem('pageViews')) {
  pageViews = parseInt(localStorage.getItem('pageViews'));
}
pageViews++;
localStorage.setItem('pageViews', pageViews);

fetch('https://script.google.com/macros/s/AKfycbx4ihOHAHeDnP7i6yYyHVh_WPgVFkmr1U7e0KKa6LeBjfy2MeKXPcoRGIABAxU_CkYk/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ pageViews })
})
.then(response => response.json())
.then(data => {
  if (data.success) {
    console.log('Page view logged successfully!');
  } else {
    console.error('Error logging page view:', data.error);
  }
})
.catch(error => {
  console.error('Error logging page view:', error);
});

