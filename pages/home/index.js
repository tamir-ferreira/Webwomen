const listMain = document.querySelector('.list-main')
const listAside = document.querySelector('.list-aside')
const emptyList = document.querySelector('.empty-list')


getJSON()

/* ------------- CARREGAR DADOS SALVOS ANTERIORMENTE NO LOCALSTORAGE -------------- */
function getJSON() {
    const dataJSON = localStorage.getItem('selectedJobs')

    if (dataJSON) {
        emptyList.style.display = 'none'
        selectedJobs = JSON.parse(dataJSON)
        renderSelectedJobs(selectedJobs)
        console.log('none')
    } else {
        emptyList.style.display = 'flex'
        // console.log('flex')
    }
}


/* --------------- ATUALIZAR VAGAS SELECIONADAS NO LOCALSTORAGE ------------- */
function updateJSON(selectedArray) {
    const dataJSON = JSON.stringify(selectedArray)
    localStorage.setItem('selectedJobs', dataJSON)
}


/* ----------- INSERIR VAGAS NA LISTA DE SELECIONADAS ------------ */
function insertJobs(sourceArray) {
    const insertJobs = document.querySelectorAll('[data-jobs]')

    insertJobs.forEach(job => {
        job.onclick = () => {
            const jobID = job.getAttribute('data-jobs')
            // const findID = selectedJobs.find(job => job.id == jobID)
            const index = selectedJobs.findIndex(job => job.id == jobID)
            // console.log(job)
            // if (!findID) {
            if (job.textContent == 'Candidatar') {
                selectedJobs.push(
                    {
                        id: jobID,
                        title: sourceArray[jobID].title,
                        enterprise: sourceArray[jobID].enterprise,
                        location: sourceArray[jobID].location
                    }
                )
                
                // job.setAttribute('data-trash',jobID)
                updateJSON(selectedJobs)
                renderSelectedJobs(selectedJobs)
                job.textContent = 'Remover candidatura'
                emptyList.style.display = 'none'
                
            } else{
                // console.log('remover')
                selectedJobs.splice(index, 1);
                job.textContent = 'Candidatar'
                updateJSON(selectedJobs)
                renderSelectedJobs(selectedJobs)
                // mapJobs()
                // removeJobs(selectedJobs, job)
                empty(selectedJobs)
            }  

        }
    });
}


renderJobs(jobsData)

/* ------------ RENDERIZAR VAGAS DO ARRAY INICIAL ------------- */
function renderJobs(sourceArray) {
    listMain.innerHTML = "";
    sourceArray.forEach(job => {
        listMain.insertAdjacentHTML('beforeend',
            `<li class="item-main"">
                <h2 class="title-4">${job.title}</h2>
                <div class="location">
                <span>${job.enterprise}</span>
                <span>${job.location}</span>
                </div>
                <p>${job.descrition}</p>
                <div class="footer-list">
                <div>
                    <span>${job.modalities[0]}</span>
                    <span>${job.modalities[1]}</span>
                </div>
                <button data-jobs="${job.id}" class="button-little">Candidatar</button>
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
        listAside.insertAdjacentHTML('beforeend',
            `<li class="item-aside" data-trash="${job.id}">
                <div class="container-job">
                <h2 class="title-5">${job.title}</h2>
                <button>
                    <img src="../../assets/img/trash.svg" alt="lixeira">
                </button>
                </div>
                <div class="location">
                <span>${job.enterprise}</span>
                <span>${job.location}</span>
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
            console.dir(job)
            removeJobs(selectedArray, job)
        }
    });
}


/* ----------------- REMOVER VAGAS SELECIONADAS DO ARRAY E TELA ------------------*/
function removeJobs(selectedArray, job) {
    const jobID = job.getAttribute('data-trash')
            const index = selectedArray.findIndex(job => job.id == jobID)

            selectedArray.splice(index, 1)
            updateJSON(selectedArray)
            // job.remove()
            empty(selectedArray)

            
            renderSelectedJobs(selectedArray)
}


function empty(selectedArray){
    if (selectedArray.length === 0) {
        emptyList.style.display = 'flex'
        localStorage.clear('selectedJobs')
    }
}

/* ----------------- MAPEAR BOTÕES EXCLUIR VAGAS (REMOVER CANDIDATURA) ------------------*/
/* function mapJobs(selectedArray) {
    const jobTrash = document.querySelectorAll('[data-trash]')

    jobTrash.forEach(job => {
        job.children[0].lastElementChild.onclick = () => {
            console.dir(job)
            removeJobs(selectedArray, job)
        }
    });
} */