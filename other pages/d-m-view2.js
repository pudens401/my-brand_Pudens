const menuBtn = document.querySelector("#d-drop-left")
const dropMenu = document.querySelector(".drop-menu")
const menuBtnIcon = document.querySelector("#d-drop-left i")

menuBtn.onclick = function(){
    dropMenu.classList.toggle("open")
    const isOpen = dropMenu.contains("open")

    menuBtnIcon.classList = isOpen?"fa-solid fa-xmark":"fa-solid fa-bars"
}




let param = new URLSearchParams(window.location.search);

let msgIndex = parseInt(param.get('msgIndex'));

let receivedMessages = [];
loadMessages();
function loadMessages(){
    const savedMessages = localStorage.getItem('sentMessages');
    receivedMessages = savedMessages?JSON.parse(savedMessages):[];
}

displayOneMessage(msgIndex);

function displayOneMessage(i){

    let msg = receivedMessages[i];

    const msgCont  = document.querySelector('.single-message-cont');
    msgCont.innerHTML = '';

    const msgItem  =document.createElement('div');
    msgItem.classList.add('d-s-m-item');

    const msgHead  =document.createElement('div');
    msgHead.classList.add('s-m-head');
    const msgNav  =document.createElement('div');
    msgNav.classList.add('s-m-nav');
    const backIcon =document.createElement('i');
    backIcon.classList.add('fa-solid','fa-left-long');
    backIcon.addEventListener('click',()=>{
        window.history.back();
    });
    msgNav.appendChild(backIcon);

    const msgId = document.createElement('div');
    msgId.classList.add('s-m-id');
    const msgName = document.createElement('p');
    msgName.classList.add('s-m-name');
    msgName.innerText = msg.sender;
    const msgEmail = document.createElement('p');
    msgEmail.innerText = msg.email.slice(0,10);
    msgEmail.classList.add('s-m-email');
    const msgManage = document.createElement('div');
    msgManage.classList.add('s-m-manage');
    const readIcon = document.createElement('i');
    readIcon.classList.add('fa-solid','fa-envelope-open-text');
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid','fa-trash');
    deleteIcon.addEventListener('click',()=>{
        deleteMessage(i);
        saveMessage();
    })

    msgManage.appendChild(readIcon);
    msgManage.appendChild(deleteIcon);

    msgId.appendChild(msgName);
    msgId.appendChild(msgEmail);
    msgId.appendChild(msgManage);

    msgHead.appendChild(msgNav);
    msgHead.appendChild(msgId);

    const msgBody = document.createElement('div');
    msgBody.innerText = msg.message;

    msgItem.appendChild(msgHead);
    msgItem.appendChild(msgBody);

    msgCont.appendChild(msgItem);



}


function deleteMessage(i){
    receivedMessages.splice(i,1);
}

function saveMessage(){
    localStorage.setItem('sentMessages', JSON.stringify(receivedMessages));
}