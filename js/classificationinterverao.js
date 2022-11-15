window.onload = async function () {
    //PDFS
    PDFObject.embed("regulamentos/Regulamento_CSGO.pdf", "#modalCsinterBody");
    PDFObject.embed("regulamentos/Regulamento_LoL.pdf", "#modalLolinterBody");
    PDFObject.embed("regulamentos/Regulamento_RL.pdf", "#modalRocketinterBody");

    //Variáveis Interescolas
    const leaderboardi = await getLeaderboardByGroups()
    fillCsi(leaderboardi.CS)
    fillLoli(leaderboardi.LOL)
    fillRli(leaderboardi.RL)
}

//Interescolas
async function getLeaderboardByGroups() {
    const responsei = await fetch("https://dot-gaming-d7618.firebaseio.com/Interescolas.json")
    const responseLeaderboardi = await responsei.json()
    //Buscar os grupos
    const leaderboardi = {
        CS: [{
            Grupo1: [],
            Grupo2: [],
            Grupo3: [],
            Grupo4: []
        }],
        LOL: [{
            Grupo1: [],
            Grupo2: [],
            Grupo3: [],
            Grupo4: []
        }],
        RL: [{
            Grupo1: [],
            Grupo2: [],
            Grupo3: [],
            Grupo4: []
        }]
    }

    //Definir estatistica
    for (const ldb in responseLeaderboardi) {
        let groupNumber = 1
        let counter = 1
        //Definir estatistica CS
        if (ldb == "CS") {
            for (const group in responseLeaderboardi[ldb]) {
                for (const team in responseLeaderboardi[ldb][group]) {
                    const { Nome, Vitórias, Derrotas, Imagem, RondasG, RondasP, Vantagem } = responseLeaderboardi[ldb][group][team]
                    const diffRounds = RondasG - RondasP
                    if (counter > Object.keys(responseLeaderboardi[ldb]["Grupo1"]).length) groupNumber = 2
                    //if (counter > Object.keys(responseLeaderboardi[ldb]["Grupo2"]).length + Object.keys(responseLeaderboardi[ldb]["Grupo1"]).length) groupNumber = 3
                    //if (counter > Object.keys(responseLeaderboardi[ldb]["Grupo3"]).length + Object.keys(responseLeaderboardi[ldb]["Grupo2"]).length + Object.keys(responseLeaderboardi[ldb]["Grupo1"]).length) groupNumber = 4
                    leaderboardi.CS[0][`Grupo` + groupNumber].push({
                        Nome,
                        Vitórias,
                        Derrotas,
                        Imagem,
                        RondasG,
                        RondasP,
                        diffRounds,
                        Vantagem
                    })
                    counter++
                }
            }
        }
        //Definir estatistica LOL
        if (ldb == "LOL") {
            for (const group in responseLeaderboardi[ldb]) {
                for (const team in responseLeaderboardi[ldb][group]) {
                    const { Nome, Vitórias, Derrotas, Imagem, Vantagem } = responseLeaderboardi[ldb][group][team]
                    //if (counter > Object.keys(responseLeaderboardi[ldb]["Grupo1"]).length) groupNumber = 2
                    //if (counter > Object.keys(responseLeaderboardi[ldb]["Grupo2"]).length + Object.keys(responseLeaderboardi[ldb]["Grupo1"]).length) groupNumber = 3
                    //if (counter > Object.keys(responseLeaderboardi[ldb]["Grupo3"]).length + Object.keys(responseLeaderboardi[ldb]["Grupo2"]).length + Object.keys(responseLeaderboardi[ldb]["Grupo1"]).length) groupNumber = 4
                    leaderboardi.LOL[0][`Grupo` + groupNumber].push({
                        Nome,
                        Vitórias,
                        Derrotas,
                        Imagem,
                        Vantagem
                    })
                    counter++
                }
            }
        }
        //Definir estatistica RL
        if (ldb == "RL") {
            for (const group in responseLeaderboardi[ldb]) {
                for (const team in responseLeaderboardi[ldb][group]) {
                    const { Nome, Vitórias, Derrotas, Imagem, Vantagem, GolosM, GolosS } = responseLeaderboardi[ldb][group][team]
                    const diffGolos = GolosM - GolosS
                    if (counter > Object.keys(responseLeaderboardi[ldb]["Grupo1"]).length) groupNumber = 2
                    if (counter > Object.keys(responseLeaderboardi[ldb]["Grupo2"]).length + Object.keys(responseLeaderboardi[ldb]["Grupo1"]).length) groupNumber = 3
                    if (counter > Object.keys(responseLeaderboardi[ldb]["Grupo3"]).length + Object.keys(responseLeaderboardi[ldb]["Grupo2"]).length + Object.keys(responseLeaderboardi[ldb]["Grupo1"]).length) groupNumber = 4
                    leaderboardi.RL[0][`Grupo` + groupNumber].push({
                        Nome,
                        Vitórias,
                        Derrotas,
                        Imagem,
                        Vantagem,
                        GolosM,
                        GolosS,
                        diffGolos
                    })
                    counter++
                }
            }
        }
    }
    return leaderboardi
}
//Counter Strike: Global Offensive
function fillCsi(csLeaderboardi) {
    csLeaderboardi[0].Grupo1.sort((a, b) => {
        return a.Vitórias - b.Vitórias || a.Vantagem - b.Vantagem || a.diffRounds - b.diffRounds || a.RondasG - b.RondasG || a.RondasP - b.RondasP
    })
    csLeaderboardi[0].Grupo2.sort((a, b) => {
        return a.Vitórias - b.Vitórias || a.Vantagem - b.Vantagem || a.diffRounds - b.diffRounds || a.RondasG - b.RondasG || a.RondasP - b.RondasP
    })

    csLeaderboardi[0].Grupo1.reverse()
    csLeaderboardi[0].Grupo2.reverse()

    const genTable = (group, groupN) => {
        let gCS = `
    <thead class="thead">
        <tr class="text-center">         
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col" class="text-left" >Equipa</th>
            <th scope="col">Vitórias</th>
            <th scope="col">Derrotas</th>            
            <th scope="col" data-toggle="tooltip" title="Rondas Ganhas">RG</th>
            <th scope="col" data-toggle="tooltip" title="Rondas Perdidas">RP</th>
            <th scope="col" data-toggle="tooltip" title="Diferença de Rondas">D/R</th>
        </tr>
    </thead>
    <tbody>
    `

        group.forEach((team, index) => {
            gCS += `
        <tr class="text-center">          
            <td>${index + 1}</td>
            <td><img class="imgTable text-right" src="${team.Imagem}" width="40px"></td>
            <td class="tableTd text-left">${team.Nome}</td>
            <td class="tableTd">${team.Vitórias}</td>
            <td class="tableTd">${team.Derrotas}</td>         
            <td class="tableTd">${team.RondasG}</td>
            <td class="tableTd">${team.RondasP}</td>
            <td class="tableTd">${team.diffRounds}</td>
        </tr>
        `
        })
        gCS += "</tbody>"

        let tableGroupCS = `<h1 style="margin-top: 1em;">Grupo ${groupN}</h1><br>
    <table class="table" id="tableGroupCS">
    ${gCS}
    
    </table>
    `
        {/* METER A CIMA DA TABLE DA LINHA DE CIMA <tbody>
        <tr>
            <td colspan="5" class="text-center">
                <div class="spinner-grow text-light mt-3"
                    style="width: 5rem; height: 5rem;"
                    role="status">
                    <span
                        class="sr-only">Loading...</span>
                    </div>
                </td>
            </tr>
        </tbody> */}
        return tableGroupCS
    }

    let Tabelas = document.getElementById("tabelacs")

    Tabelas.innerHTML = Tabelas.innerHTML + genTable(csLeaderboardi[0].Grupo1, 1) + genTable(csLeaderboardi[0].Grupo2, 2)

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
}
//League Of Legends
function fillLoli(lolLeaderboardi) {
    lolLeaderboardi[0].Grupo1.sort((a, b) => {
        return a.Vitórias - b.Vitórias || a.Vantagem - b.Vantagem
    })

    lolLeaderboardi[0].Grupo1.reverse()

    const genTable = (group, groupN) => {
        let gLOL = `
    <thead class="thead">
        <tr class="text-center">         
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col" class="text-left" >Equipa</th>
            <th scope="col">Vitórias</th>
            <th scope="col">Derrotas</th>            
        </tr>
    </thead>
    <tbody>
    `

        group.forEach((team, index) => {
            gLOL += `
        <tr class="text-center">          
            <td>${index + 1}</td>
            <td><img class="imgTable text-right" src="${team.Imagem}" width="40px"></td>
            <td class="tableTd text-left">${team.Nome}</td>
            <td class="tableTd">${team.Vitórias}</td>
            <td class="tableTd">${team.Derrotas}</td>         
        </tr>
        `
        })
        gLOL += "</tbody>"

        let tableGroupLOL = `<h1 style="margin-top: 1em;">Grupo ${groupN}</h1><br>
    <table class="table" id="tableGroupLOL">
    ${gLOL}
    
    </table>
    `
        {/* METER A CIMA DA TABLE DA LINHA DE CIMA <tbody>
        <tr>
            <td colspan="5" class="text-center">
                <div class="spinner-grow text-light mt-3"
                    style="width: 5rem; height: 5rem;"
                    role="status">
                    <span
                        class="sr-only">Loading...</span>
                    </div>
                </td>
            </tr>
        </tbody> */}
        return tableGroupLOL
    }

    let Tabelas = document.getElementById("tabelalol")
    
    Tabelas.innerHTML = Tabelas.innerHTML + genTable(lolLeaderboardi[0].Grupo1, 1)

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
}
//Rocket League
function fillRli(rlLeaderboardi) {
    rlLeaderboardi[0].Grupo1.sort((a, b) => {
        return a.Vitórias - b.Vitórias || a.Vantagem - b.Vantagem || a.diffGolos - b.diffGolos || a.GolosM - b.GolosM || a.GolosS - b.GolosS
    })
    rlLeaderboardi[0].Grupo2.sort((a, b) => {
        return a.Vitórias - b.Vitórias || a.Vantagem - b.Vantagem || a.diffGolos - b.diffGolos || a.GolosM - b.GolosM || a.GolosS - b.GolosS
    })
    rlLeaderboardi[0].Grupo3.sort((a, b) => {
        return a.Vitórias - b.Vitórias || a.Vantagem - b.Vantagem || a.diffGolos - b.diffGolos || a.GolosM - b.GolosM || a.GolosS - b.GolosS
    })
    rlLeaderboardi[0].Grupo4.sort((a, b) => {
        return a.Vitórias - b.Vitórias || a.Vantagem - b.Vantagem || a.diffGolos - b.diffGolos || a.GolosM - b.GolosM || a.GolosS - b.GolosS
    })

    rlLeaderboardi[0].Grupo1.reverse()
    rlLeaderboardi[0].Grupo2.reverse()
    rlLeaderboardi[0].Grupo3.reverse()
    rlLeaderboardi[0].Grupo4.reverse()

    const genTable = (group, groupN) => {
        let gRL = `
    <thead class="thead">
        <tr class="text-center">         
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col" class="text-left" >Equipa</th>
            <th scope="col">Vitórias</th>
            <th scope="col">Derrotas</th>            
            <th scope="col" data-toggle="tooltip" title="Jogos Ganhos">JG</th>
            <th scope="col" data-toggle="tooltip" title="Jogos Perdidos">JP</th>
            <th scope="col" data-toggle="tooltip" title="Diferença de Golos">D/J</th>
        </tr>
    </thead>
    <tbody>
    `

        group.forEach((team, index) => {
            gRL += `
        <tr class="text-center">          
            <td>${index + 1}</td>
            <td><img class="imgTable text-right" src="${team.Imagem}" width="40px"></td>
            <td class="tableTd text-left">${team.Nome}</td>
            <td class="tableTd">${team.Vitórias}</td>
            <td class="tableTd">${team.Derrotas}</td>         
            <td class="tableTd">${team.GolosM}</td>
            <td class="tableTd">${team.GolosS}</td>
            <td class="tableTd">${team.diffGolos}</td>
        </tr>
        `
        })
        gRL += "</tbody>"

        let tableGroupRL = `<h1 style="margin-top: 1em;">Grupo ${groupN}</h1><br>
    <table class="table" id="tableGroupRL">
    ${gRL}
    
    </table>
    `
        {/* METER A CIMA DA TABLE DA LINHA DE CIMA <tbody>
        <tr>
            <td colspan="5" class="text-center">
                <div class="spinner-grow text-light mt-3"
                    style="width: 5rem; height: 5rem;"
                    role="status">
                    <span
                        class="sr-only">Loading...</span>
                    </div>
                </td>
            </tr>
        </tbody> */}
        return tableGroupRL
    }

    let Tabelas = document.getElementById("tabelarl")

    Tabelas.innerHTML = Tabelas.innerHTML + genTable(rlLeaderboardi[0].Grupo1, 1) + genTable(rlLeaderboardi[0].Grupo2, 2) + genTable(rlLeaderboardi[0].Grupo3, 3) + genTable(rlLeaderboardi[0].Grupo4, "Extra")

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
}