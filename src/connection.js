function errorCanNotConnect() {
    console.log("can not connect.")
}

function tryToConnect(){
    let ip      = document.getElementById("espIp").value;
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState !=   4) return;
        if (this.status     != 200) return errorCanNotConnect();
        
        let res = JSON.parse(this.responseText);
        
        if (res['exitCode'] == 0 && res['project'] == "SAG") {
            localStorage.setItem('ip', ip);
            window.location.href = "./graph.html";
        }
    };

    xmlhttp.open("GET", `http://${ip}/serial.php?msg=hs`, true);
    xmlhttp.send();
}

document.getElementById("connect").addEventListener("click", tryToConnect);