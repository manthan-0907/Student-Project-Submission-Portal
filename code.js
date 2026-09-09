/* -------------------------------------------------
   Simple validation & UI logic
   ------------------------------------------------- */

// ---------- File validation ----------
function validateFile() {
    const file = document.getElementById('file').files[0];
    const msg  = document.getElementById('fileMessage');

    if (!file) {
        msg.textContent = '';
        return;
    }

    // 20 MB limit
    if (file.size > 20 * 1024 * 1024) {
        msg.textContent = '❌ File too big (max 20 MB)';
        msg.style.color = 'red';
        return;
    }

    // Allowed extensions
    const allowed = ['pdf','zip','doc','docx','ppt','pptx'];
    const ext = file.name.split('.').pop().toLowerCase();

    if (!allowed.includes(ext)) {
        msg.textContent = '❌ Invalid file type';
        msg.style.color = 'red';
        return;
    }

    msg.textContent = `✅ ${file.name}`;
    msg.style.color = 'green';
}

// ---------- Link validation ----------
function validateLink() {
    const link = document.getElementById('link').value.trim();
    const msg  = document.getElementById('linkMessage');

    if (!link) {
        msg.textContent = '';
        return;
    }

    try {
        new URL(link);
        msg.textContent = '✅ Valid URL';
        msg.style.color = 'green';
    } catch {
        msg.textContent = '❌ Invalid URL';
        msg.style.color = 'red';
    }
}

// ---------- Submit handling ----------
function submitProject() {
    const name       = document.getElementById('name').value.trim();
    const roll       = document.getElementById('roll').value.trim();
    const title      = document.getElementById('title').value.trim();
    const department = document.getElementById('department').value;
    const semester   = document.getElementById('semester').value;
    const file       = document.getElementById('file').files[0];
    const link       = document.getElementById('link').value.trim();
    const agree      = document.getElementById('agree').checked;
    const msg        = document.getElementById('message');

    // 1️⃣ All required fields
    if (!name || !roll || !title || !department || !semester) {
        msg.textContent = '⚠️ Please fill in all student details.';
        msg.style.color = 'red';
        return;
    }

    // 2️⃣ Either a file or a link must be provided
    if (!file && !link) {
        msg.textContent = '📁 Upload a file OR 🔗 provide a project link.';
        msg.style.color = 'red';
        return;
    }

    // 3️⃣ Declaration must be accepted
    if (!agree) {
        msg.textContent = '☑️ Please accept the declaration.';
        msg.style.color = 'red';
        return;
    }

    // All good – show success popup
    document.getElementById('popup').classList.remove('hidden');
}

// ---------- Close popup & reset ----------
function closePopup() {
    document.getElementById('popup').classList.add('hidden');

    // Reset the form
    document.getElementById('name').value = '';
    document.getElementById('roll').value = '';
    document.getElementById('title').value = '';
    document.getElementById('department').value = '';
    document.getElementById('semester').value = '';
    document.getElementById('file').value = '';
    document.getElementById('link').value = '';
    document.getElementById('agree').checked = false;

    // Clear messages
    document.getElementById('fileMessage').textContent = '';
    document.getElementById('linkMessage').textContent = '';
    document.getElementById('message').textContent = '';
}