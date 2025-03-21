
let nbr_etudiants = document.querySelector("#nbr_etu");

nbr_etudiants.addEventListener('input', ()=> {
    let rows_num = parseInt(nbr_etudiants.value);
    const tab = document.querySelector('#tab');
    tab.innerHTML = '';

    const table = document.createElement('table');
    table.id = '_render';
    const tbody = document.createElement('tbody');
    const tfoot = document.createElement('tfoot');
    table.classList = 'table table-hover align-middle'
    const head_tr = document.createElement('tr');
    head_tr.classList = 'text-center table-primary';

    const id_th = document.createElement('th');
    const code_masar_th = document.createElement('th');
    const prenom_th = document.createElement('th');
    const nom_th = document.createElement('th');
    const note_th = document.createElement('th');
    const appreciation_th = document.createElement('th');
    const action_th = document.createElement('th');

    id_th.textContent = "Id";
    code_masar_th.textContent = "Code Massar";
    prenom_th.textContent = "Prenom";
    nom_th.textContent = "Nom";
    note_th.textContent = "Note";
    appreciation_th.textContent = "Appreciation";
    action_th.textContent = "Action";

    head_tr.append(id_th,code_masar_th,prenom_th,nom_th,note_th,appreciation_th,action_th);
    table.appendChild(head_tr);

    // tbody

    for(let i = 1; i <= rows_num ;i++){
        const row = document.createElement('tr');

        const id_td = document.createElement('td');
        id_td.classList = 'text-center'
        const code_masar_td = document.createElement('td');
        const prenom_td = document.createElement('td');
        const nom_td = document.createElement('td');
        const note_td = document.createElement('td');
        const appreciation_td = document.createElement('td');
        const action_td = document.createElement('td');

        id_td.textContent = i;
        
        let code_massar = document.createElement('input');
        code_massar.type = 'text';
        code_massar.classList = 'massar form-control';
        code_masar_td.appendChild(code_massar);

        let Prenom = document.createElement('input');
        Prenom.type = 'text';
        Prenom.classList = 'form-control';
        prenom_td.appendChild(Prenom);

        let Nom = document.createElement('input');
        Nom.type = 'text';
        Nom.classList = 'form-control';
        nom_td.appendChild(Nom);

        let Note = document.createElement('input');
        Note.type = 'number';
        Note.classList = 'note_m form-control';
        note_td.appendChild(Note);

        appreciation_td.innerHTML = `<select class='form-select'>
                                        <option value='nv'>N.V</option>
                                        <option value='tresbien'>trés bien</option>
                                        <option value='bien'>bien</option>
                                        <option value='assezbien'>Assez bien</option>
                                        <option value='passable'>Passable</option>
                                        <option value='nonvalider'>Non valider</option>
                                    </select>`;

        delIcon = document.createElement('button');
        delIcon.classList = 'btn';
        delIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        action_td.appendChild(delIcon);

        delIcon.addEventListener('click', () => {
            row.remove();
            updateAverage();
            Note_max();
            Note_min();
        });

        row.append(id_td, code_masar_td, prenom_td, nom_td, note_td, appreciation_td, action_td);
        tbody.appendChild(row);
    }

    table.appendChild(tbody);


    // tfoot
    const rowfoot = document.createElement('tr');
    rowfoot.classList = 'text-center'
    const note_min_text = document.createElement('td');
    const note_min = document.createElement('td');
    const note_max_text = document.createElement('td');
    const note_max = document.createElement('td');
    const moyenne_text = document.createElement('td');
    const moyenne = document.createElement('td');

    note_min_text.textContent = "Note Min";
    note_min.textContent = "0/20";
    note_min.classList = 'note_min';

    note_max_text.textContent = "Note Max";
    note_max.textContent = "0/20";
    note_max.classList = 'note_max';

    moyenne_text.textContent = "Moyenne de la classe";
    moyenne.textContent = "0/20";
    moyenne.classList = 'moyenne';

    rowfoot.append(note_min_text,note_min,note_max_text,note_max,moyenne_text,moyenne);
    tfoot.appendChild(rowfoot);
    table.appendChild(tfoot);

    tab.appendChild(table);
    let generate_pdf = document.createElement('button');
    generate_pdf.textContent = 'Generate PDF';
    generate_pdf.id = 'gen'
    generate_pdf.classList = 'btn btn-primary';
    tab.appendChild(generate_pdf);


    generate_pdf.addEventListener('click', ()=> {
        let element = document.querySelector('#tab'); 
        let options = {
            margin: 10,
            filename: 'Classe.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }

        };
        html2pdf().set(options).from(element).save();
    });
    
    document.querySelectorAll(".massar").forEach((val) => {
        val.addEventListener("input", validation_massar);
    });
    document.querySelectorAll(".note_m").forEach((val) => {
        val.addEventListener("input",updateAverage);
        val.addEventListener("input",Note_max);
        val.addEventListener("input",Note_min);
        val.addEventListener("input",Appreciation);
    });
    
});



function validation_massar() {
    let valid_massars = document.querySelectorAll(".massar");

    valid_massars.forEach((val) => {
        let message = val.nextElementSibling;

        if (!message || !message.classList.contains("validation-msg")) {
            message = document.createElement("span");
            message.classList = "validation-msg";
            val.parentNode.appendChild(message);
        }


        if (val.value.match(/^[A-Z][0-9]{8}$/)) {
            message.textContent = "✅ Valide";
            message.style.color = "green";
        } else {
            message.textContent = "❌ Invalide";
            message.style.color = "red";
        }
    });
}
function updateAverage() {
    let sum = 0;
    let count = 0;
    document.querySelectorAll('.note_m').forEach((note) => {
        let noteValue = parseFloat(note.value);
        if (!isNaN(noteValue)) {
            sum += noteValue;
            count++;
        }
    });
    let moyenne_note = count > 0 ? (sum / count).toFixed(2) : 0;
    let moyenne_ = document.querySelector('.moyenne');
    moyenne_.textContent = `${moyenne_note}/20`;
}
function Note_max() {
    let max = parseFloat(document.querySelector('.note_m').value);
    document.querySelectorAll('.note_m').forEach((note) => {
        let noteValue = parseFloat(note.value);
        if(max < noteValue){
            max = noteValue;
        }
    });
    let max_ = document.querySelector('.note_max');
    max_.textContent = `${max}/20`;
}
function Note_min(){
    let min = parseFloat(document.querySelector('.note_m').value);
    document.querySelectorAll('.note_m').forEach((note) => {
        let noteValue = parseFloat(note.value);
        if(min > noteValue){
            min = noteValue;
        }
    });
    let min_ = document.querySelector('.note_min');
    min_.textContent = `${min}/20`;
}
function Appreciation() {
    document.querySelectorAll('.note_m').forEach((note) => {
    let noteValue = parseFloat(note.value);
    if (isNaN(noteValue) || noteValue < 0 || noteValue > 20) {
        note.value = '';
        return;
    }
    let row = note.closest('tr');
    let appreciation = row.querySelector('.form-select');
    if (noteValue >= 16) {
        appreciation.value = 'tresbien';
    } else if (noteValue >= 13) {
        appreciation.value = 'bien';
    } else if (noteValue >= 11) {
        appreciation.value = 'assezbien';
    } else if (noteValue == 10) {
        appreciation.value = 'passable';
    } else {
        appreciation.value = 'nonvalider';
    }
});
}