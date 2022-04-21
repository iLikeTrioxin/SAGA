function addTitleBar(){
    let titleBar = document.createElement('div');
    titleBar.style = 'z-index:11;position:fixed;top:0;width:100vw;height:25px;background-color:#20272c;';

    let titleBarStyle = document.createElement('style');
    //titleBarStyle.type = 'text/css';
    titleBarStyle.appendChild(document.createTextNode('#closeButton{position:absolute;right:0;top:0;z-index:12;float:right;border-radius:100%;width:13px;height:13px;margin:6px;background-color:rgb(100,35,35);}#closeButton:hover{background-color:rgb(200,70,70);}'));

    let closeButton = document.createElement('div');
    closeButton.addEventListener('click', () => { window.close(); });
    closeButton.id = 'closeButton';

    let dragBar = document.createElement('div');
    dragBar.style = 'position:absolute;width:100%;height:100%;right:25px;user-select:none;-webkit-user-select:none;-webkit-app-region:drag;';

    titleBar.append(titleBarStyle, dragBar, closeButton);

    document.querySelector('html').appendChild(titleBar);
}

addTitleBar();