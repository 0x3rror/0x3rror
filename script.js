document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.querySelector('.matrix-background').appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const letters = Array(256).join("1").split("");
    const fontSize = 10;
    const columns = canvas.width / fontSize;

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#800080";
        ctx.font = fontSize + "px arial";

        letters.map((y_pos, index) => {
            const text = String.fromCharCode(3e4 + Math.random() * 33);
            const x_pos = index * fontSize;
            ctx.fillText(text, x_pos, y_pos);
            letters[index] = (y_pos > canvas.height + Math.random() * 1e4) ? 0 : y_pos + fontSize;
        });
    }

    setInterval(draw, 33);

    // Fetch user's IP address and geolocation
    fetch('https://ipinfo.io/json?token=4ef2b9fc337b3b')
        .then(response => response.json())
        .then(data => {
            // Send data to Google Apps Script web app
            fetch('https://script.google.com/macros/s/AKfycbzI0cHlr-fdLPE9YIxNm1fhZEv_9GefBDtscMSJ-LIn4jR12ear-BWPix3nJEukD5Nm/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => console.log('Success:', result))
            .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error fetching IP info:', error));
});
