const assignments = []; // To store assignment details
const doubts = []; // To store student doubts
const notifications = []; // To store notifications

// Handle login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    if ((role === "student" && username === "student" && password === "password") ||
        (role === "teacher" && username === "teacher" && password === "password")) {

        document.getElementById('login-container').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('user-name').innerText = username;

        // Show appropriate dashboard
        document.getElementById(role + '-dashboard').style.display = 'block';

        if (role === "teacher") {
            document.getElementById('view-assignments-section').classList.remove('hidden');
            document.getElementById('view-doubts-section').classList.remove('hidden');
            document.getElementById('send-notification-section').classList.remove('hidden');
        } else if (role === "student") {
            document.getElementById('submit-work-section').classList.remove('hidden');
            document.getElementById('ask-doubt-section').classList.remove('hidden');
        }
    } else {
        alert('Invalid credentials');
    }
});

// Handle logout
document.getElementById('logout-btn').addEventListener('click', function() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('submit-message').classList.add('hidden'); // Hide submit message
    document.getElementById('confirmation-popup').style.visibility = 'hidden'; // Hide confirmation popup
    document.getElementById('student-dashboard').style.display = 'none';
    document.getElementById('teacher-dashboard').style.display = 'none';
});

// Handle submit work
document.getElementById('submit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('confirmation-popup').style.visibility = 'visible';
    document.getElementById('submit-message').classList.remove('hidden');
});

// Handle close confirmation popup
document.getElementById('confirmation-close').addEventListener('click', function() {
    document.getElementById('confirmation-popup').style.visibility = 'hidden';
});

// Handle ask doubt
document.getElementById('doubt-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const doubtMessage = document.getElementById('doubt-message').value;
    doubts.push({ student: document.getElementById('user-name').innerText, message: doubtMessage });
    updateDoubtsList();
    document.getElementById('doubt-message').value = '';
});

// Handle view assignments
document.getElementById('view-assignments-btn').addEventListener('click', function() {
    const assignmentsList = document.getElementById('assignments-list');
    assignmentsList.innerHTML = assignments.map(a => `<li>${a}</li>`).join('');
    document.getElementById('view-assignments-section').classList.remove('hidden');
});

// Handle view doubts
document.getElementById('view-doubts-btn').addEventListener('click', function() {
    const doubtsListAdmin = document.getElementById('doubts-list-admin');
    doubtsListAdmin.innerHTML = doubts.map(d => `<li><strong>${d.student}:</strong> ${d.message}</li>`).join('');
    document.getElementById('view-doubts-section').classList.remove('hidden');
});

// Handle send notification
document.getElementById('notification-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const notificationMessage = document.getElementById('notification-message').value;
    notifications.push(notificationMessage);
    updateNotificationsList();
    document.getElementById('notification-message').value = '';
});

// Function to update doubts list
function updateDoubtsList() {
    const doubtsList = document.getElementById('doubts-list');
    doubtsList.innerHTML = doubts.map(d => `<li>${d.message}</li>`).join('');
}

// Function to update notifications list
function updateNotificationsList() {
    const notificationsList = document.getElementById('notifications-list');
    notificationsList.innerHTML = notifications.map(n => `<li>${n}</li>`).join('');
}

// Microphone access request
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
        console.log('Microphone access granted');
    })
    .catch(function(err) {
        console.log('Microphone access denied', err);
    });
