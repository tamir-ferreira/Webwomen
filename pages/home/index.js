const listMain = document.querySelector('.list-main')
const listAside = document.querySelector('.list-aside')
const emptyList = document.querySelector('.empty-list')


renderJobs(jobsData)
getJSON()


/* ------------- CARREGAR DADOS SALVOS ANTERIORMENTE NO LOCALSTORAGE -------------- */
function getJSON() {
    const dataJSON = localStorage.getItem('selectedJobs')

    if (dataJSON) {
        emptyList.style.display = 'none'
        selectedJobs = JSON.parse(dataJSON)
        renderSelectedJobs(selectedJobs)

        const listJobsSelected = document.querySelectorAll('[data-trash]')
        listJobsSelected.forEach(jobID => {
            const [...listJobs] = document.querySelectorAll('[data-jobs]')
            const indexJobs = listJobs.find(job => job.getAttribute('data-jobs') == jobID.getAttribute('data-trash'))
            indexJobs.textContent = 'Remover candidatura'
        })

    } else {
        emptyList.style.display = 'flex'
    }
}


/* --------------- ATUALIZAR VAGAS SELECIONADAS NO LOCALSTORAGE ------------- */
function updateJSON(selectedArray) {
    const dataJSON = JSON.stringify(selectedArray)
    localStorage.setItem('selectedJobs', dataJSON)
}


/* ----------- INSERIR VAGAS NA LISTA DE SELECIONADAS ------------ */
function insertJobs(sourceArray) {
    const listJobs = document.querySelectorAll('[data-jobs]')

    listJobs.forEach(buttonJob => {
        buttonJob.onclick = () => {
            const jobID = buttonJob.getAttribute('data-jobs')
            const index = selectedJobs.findIndex(buttonJob => buttonJob.id == jobID)

            if (buttonJob.textContent == 'Candidatar') {
                selectedJobs.push(
                    {
                        id: jobID,
                        title: sourceArray[jobID].title,
                        enterprise: sourceArray[jobID].enterprise,
                        location: sourceArray[jobID].location
                    }
                )

                updateJSON(selectedJobs)
                renderSelectedJobs(selectedJobs)
                buttonJob.textContent = 'Remover candidatura'
                emptyList.style.display = 'none'

            } else {
                selectedJobs.splice(index, 1);
                buttonJob.textContent = 'Candidatar'
                updateJSON(selectedJobs)
                renderSelectedJobs(selectedJobs)
                empty(selectedJobs)
            }
        }
    });
}


/* ------------ RENDERIZAR VAGAS DO ARRAY INICIAL ------------- */
function renderJobs(sourceArray) {
    listMain.innerHTML = "";

    sourceArray.forEach(job => {
        const {id, title, descrition, enterprise, modalities, location} = job
        const span = (modalities[1]) ? `<span>${modalities[1]}</span>` : ""

        listMain.insertAdjacentHTML('beforeend',
            `<li class="item-main"">
                <h2 class="title-4">${title}</h2>
                <div class="location">
                <span>${enterprise}</span>
                <span>${location}</span>
                </div>
                <p>${descrition}</p>
                <div class="footer-list">
                <div>
                    <span>${modalities[0]}</span>
                    ${span}
                </div>
                <button data-jobs="${id}" class="button-little">Candidatar</button>
                </div>
            </li>`
        )
    });
    insertJobs(sourceArray);
}


/* ------------ RENDERIZAR VAGAS DO ARRAY SELECIONADAS ------------- */
function renderSelectedJobs(selectedArray) {
    listAside.innerHTML = "";
    selectedArray.forEach(job => {
        const {id, title, enterprise, location} = job
        listAside.insertAdjacentHTML('beforeend',
            `<li class="item-aside" data-trash="${id}">
                <div class="container-job">
                <h2 class="title-5">${title}</h2>
                <button>
                    <img src="../../assets/img/trash.svg" alt="lixeira">
                </button>
                </div>
                <div class="location">
                <span>${enterprise}</span>
                <span>${location}</span>
                </div>
            </li>`
        )
    });
    mapSelectedJobs(selectedArray)
}


/* ----------------- MAPEAR BOTÕES EXCLUIR VAGAS (TRASH) ------------------*/
function mapSelectedJobs(selectedArray) {
    const jobTrash = document.querySelectorAll('[data-trash]')

    jobTrash.forEach(job => {
        job.children[0].lastElementChild.onclick = () => {
            removeJobs(selectedArray, job)
        }
    });
}


/* ----------------- REMOVER VAGAS SELECIONADAS DO ARRAY / LOCALSTORAGE ------------------*/
function removeJobs(selectedArray, job) {
    const jobID = job.getAttribute('data-trash')
    const index = selectedArray.findIndex(job => job.id == jobID)

    let listJobs = document.querySelectorAll('[data-jobs]')
    listJobs = [...listJobs]

    const indexJobs = listJobs.find(job => job.getAttribute('data-jobs') == jobID)
    indexJobs.textContent = 'Candidatar'
    selectedArray.splice(index, 1)
    updateJSON(selectedArray)
    empty(selectedArray)
    renderSelectedJobs(selectedArray)
}


/* ----------------- VERIFICAR SE O ARRAY DE VAGAS ESTÁ VAZIO ------------------*/
function empty(selectedArray) {
    if (selectedArray.length === 0) {
        emptyList.style.display = 'flex'
        localStorage.clear('selectedJobs')
    }
}