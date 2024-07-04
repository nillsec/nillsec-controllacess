document.addEventListener('DOMContentLoaded', () => {
    const userModal = document.getElementById('userModal');
    const addUserBtn = document.getElementById('addUserBtn');
    const saveUserBtn = document.getElementById('saveUserBtn');
    const userTableBody = document.getElementById('userTableBody');
    const logsTableBody = document.getElementById('logsTableBody');

    const users = [
        { id: 1, name: 'Jonas Santana', email: 'ti@systens.com' },
        { id: 2, name: 'charles lima', email: 'charles@systens.com' },
        // Adicione mais usuários conforme necessário
    ];

    const logs = [
        { date: '01/07/2024', user: 'Kaio darlan', action: 'Acessou a Sala de suporte' },
        { date: '01/07/2024', user: 'charles lima', action: 'Acessou a Sala de suporte' },
        { date: '01/07/2024', user: 'Jonas santana', action: 'Acessou a Sala de suporte' },
        { date: '01/07/2024', user: 'Flavia Silva', action: 'Acessou a Sala de suporte' }
        // Adicione mais logs conforme necessário
    ];

    function renderUsers() {
        userTableBody.innerHTML = '';
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="button is-warning is-small">Editar</button>
                    <button class="button is-danger is-small">Excluir</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });
    }

    function renderLogs() {
        logsTableBody.innerHTML = '';
        logs.forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${log.date}</td>
                <td>${log.user}</td>
                <td>${log.action}</td>
            `;
            logsTableBody.appendChild(row);
        });
    }

    addUserBtn.addEventListener('click', () => {
        userModal.classList.add('is-active');
    });

    document.querySelectorAll('.modal .delete, .modal-card-foot .button').forEach(el => {
        el.addEventListener('click', () => {
            userModal.classList.remove('is-active');
        });
    });

    saveUserBtn.addEventListener('click', () => {
        const userName = document.getElementById('userName').value;
        const userEmail = document.getElementById('userEmail').value;

        if (userName && userEmail) {
            users.push({ id: users.length + 1, name: userName, email: userEmail });
            renderUsers();
            userModal.classList.remove('is-active');
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    renderUsers();
    renderLogs();
});
