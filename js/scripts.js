window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function tranferKe() {
    alert("Transfer Ke Rekening :\nBRI 035401002691565 a/n ALVIN BANJARSARI SUDANA\nLalu kirim bukti ke WA 082218314733");
}

function generateUserId() {
    return "_" + Math.random().toString(36).substr(2, 9);
}
function getUserId() {
    let userId = sessionStorage.getItem("userId");
    if (!userId) {
        userId = generateUserId();
        sessionStorage.setItem("userId", userId);
    }
    return userId;
}
function getMessage() {
    const userId = getUserId();
    const messages = JSON.parse(localStorage.getItem(`message_${userId}`)) || [];
    return messages;
}

// Function to save messages to local storage
function saveMessage(messages) {
    const userId = getUserId();
    localStorage.setItem(`message_${userId}`, JSON.stringify(messages));
}

// Function to render messages
function renderMessage() {
    const messages = getMessage();
    const messageList = document.getElementById("messageList");
    messageList.innerHTML = "";

    messages.forEach((msg, index) => {
        const listItem = document.createElement("li");
        listItem.className =
            "list-group-item d-flex bd-highlight mb-3 align-items-center";
        listItem.innerHTML = `
                <div class="me-auto p-2 bd-highlight">
                  Email : ${msg.email} </br>
                  Message : "${msg.msg}"
                </div>
                <div class="p-2 bd-highlight">
                  <span class="badge bg-primary rounded-pill">${msg.like} Like </span>
                  <span class="badge bg-secondary rounded-pill">${msg.dislike} Dislike</span>
                </div>
                <div class="p-2 bd-highlight">
                  <button type="button" class="btn btn-primary btn-sm"  onclick="toggleLike(${index})">Like</button><br>
                  <button type="button" class="btn btn-secondary btn-sm" onclick="toggleDislike(${index})">Dislike</button>
                  </div>
                `;
        messageList.appendChild(listItem);
    });
}
function addMessage() {
    const messageInput = document.getElementById("messageInput");
    const emailInput = document.getElementById("emailInput");
    const msg = messageInput.value.trim();
    const email = emailInput.value.trim();

    if (msg !== "" & email !== "") {
        const messages = getMessage();
        messages.push({ msg, like: 0, dislike: 0, email });
        saveMessage(messages);
        messageInput.value = "";
        emailInput.value = "";
        renderMessage();
    } else {
        alert("Email dan Message Tidak boleh kosong");
    }
}
function toggleLike(index) {
    const messages = getMessage();
    messages[index].like++;
    saveMessage(messages);
    renderMessage();
}

function toggleDislike(index) {
    const messages = getMessage();
    messages[index].dislike++;
    saveMessage(messages);
    renderMessage();
}

function clearMessage() {
    const userId = getUserId();
    localStorage.removeItem(`message_${userId}`);
    renderMessage();
}
renderMessage();