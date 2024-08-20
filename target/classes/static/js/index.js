document.addEventListener("DOMContentLoaded", () => {
    // Load and display users when the page is ready
    loadAndDisplayUsers();

    // Attach event listeners
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", handleLogout);
    } else {
        console.error("Logout button not found.");
    }

    const newMeetingBtn = document.getElementById("newMeetingBtn");
    if (newMeetingBtn) {
        newMeetingBtn.addEventListener("click", handleNewMeeting);
    } else {
        console.error("New Meeting button not found.");
    }

    const newMeetingBtn1 = document.getElementById("newMeetingBtn1");
    if (newMeetingBtn1) {
        newMeetingBtn1.addEventListener("click", handleNewMeeting1);
    } else {
        console.error("New Meeting 1 button not found.");
    }

    const joinMeetingBtn = document.getElementById("joinMeetingBtn");
    if (joinMeetingBtn) {
        joinMeetingBtn.addEventListener("click", handleJoinMeeting);
    } else {
        console.error("Join Meeting button not found.");
    }
});

function loadAndDisplayUsers() {
    const connectedUser = localStorage.getItem('connectedUser');
    if (!connectedUser) {
        window.location = 'login.html';
        return;
    }

    const userListElement = document.getElementById("userList");
    if (userListElement) {
        userListElement.innerHTML = "Loading...";
        fetch('https://videochatting1-x.up.railway.app/api/v1/users')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayUsers(data, userListElement);
            })
            .catch(error => console.error('Error fetching user list:', error));
    } else {
        console.error("User list element not found.");
    }
}

function displayUsers(userList, userListElement) {
    userListElement.innerHTML = "";
    userList.forEach(user => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <div>
                <i class="fa fa-user-circle"></i>
                ${user.username} <i class="user-email">(${user.email})</i>
            </div>
            <i class="fa fa-lightbulb-o ${user.status === "online" ? "online" : "offline"}"></i>
        `;
        userListElement.appendChild(listItem);
    });
}
function handleLogout() {
    fetch('http://localhost:8080/api/v1/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: localStorage.getItem('connectedUser')
    })
        .then((response) => {
            return response;
        })
        .then((data) => {
            localStorage.removeItem('connectedUser');
            window.location.href = "login.html";
        });
}



function handleNewMeeting() {
    console.log("New Meeting button clicked");
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (connectedUser) {
        window.open(`videocall.html?username=${connectedUser.username}`, "_blank");
    } else {
        console.error("No connected user found.");
    }
}

function handleNewMeeting1() {
    console.log("New Meeting 1 button clicked");
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (connectedUser) {
        window.open(`videocall.html?username=${connectedUser.username}`, "_blank");
    } else {
        console.error("No connected user found.");
    }
}

function handleJoinMeeting() {
    const roomId = document.getElementById("meetingName").value;
    const connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (connectedUser) {
        const url = `videocall.html?roomID=${roomId}&username=${connectedUser.username}`;
        window.open(url, "_blank");
    } else {
        console.error("No connected user found.");
    }
}
