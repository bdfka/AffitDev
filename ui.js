// --- УВЕДОМЛЕНИЯ (TOASTS) ---
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

window.alert = function(msg) { showToast(msg, 'info'); };

function showConfirm(message, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';
    overlay.style.zIndex = '10000';
    overlay.innerHTML = `
        <div class="modal-content" style="max-width: 400px; padding: 30px; text-align: center;">
            <h3 style="font-size: 20px; margin-bottom: 15px;">Подтверждение</h3>
            <p style="color: var(--muted); margin-bottom: 25px;">${message}</p>
            <div style="display: flex; gap: 10px;">
                <button id="confirm-yes" class="btn btn-main" style="flex:1; padding: 12px;">Да</button>
                <button id="confirm-no" class="btn btn-outline" style="flex:1; padding: 12px;">Отмена</button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('confirm-yes').onclick = () => { overlay.remove(); if (onConfirm) onConfirm(true); };
    document.getElementById('confirm-no').onclick = () => { overlay.remove(); if (onConfirm) onConfirm(false); };
}

// --- КАСТОМНЫЕ СЕЛЕКТЫ ---
function initCustomSelects() {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        if (select.parentElement.classList.contains('custom-select-wrapper')) return;
        select.style.display = 'none';
        const wrapper = document.createElement('div');
        wrapper.className = 'custom-select-wrapper';
        select.parentNode.insertBefore(wrapper, select);
        wrapper.appendChild(select);
        
        const trigger = document.createElement('div');
        trigger.className = 'custom-select-trigger';
        trigger.textContent = select.options[select.selectedIndex]?.text || 'Выбрать...';
        wrapper.appendChild(trigger);
        
        const optionsList = document.createElement('div');
        optionsList.className = 'custom-options';
        
        Array.from(select.options).forEach((opt, index) => {
            const option = document.createElement('div');
            option.className = 'custom-option';
            if (opt.selected) option.classList.add('selected');
            option.textContent = opt.text;
            option.addEventListener('click', () => {
                select.selectedIndex = index;
                select.dispatchEvent(new Event('change'));
                trigger.textContent = opt.text;
                wrapper.classList.remove('open');
                wrapper.querySelectorAll('.custom-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
            });
            optionsList.appendChild(option);
        });
        wrapper.appendChild(optionsList);
        
        trigger.addEventListener('click', () => {
            document.querySelectorAll('.custom-select-wrapper.open').forEach(w => { if (w !== wrapper) w.classList.remove('open'); });
            wrapper.classList.toggle('open');
        });
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.custom-select-wrapper')) {
            document.querySelectorAll('.custom-select-wrapper.open').forEach(w => w.classList.remove('open'));
        }
    });
}
document.addEventListener('DOMContentLoaded', initCustomSelects);