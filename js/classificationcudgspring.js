window.onload = async function () {
    //PDFS
    PDFObject.embed("regulamentos/Regulamento CSGO V1.2.pdf", "#modalCsBody");
    PDFObject.embed("regulamentos/Regulamento LOL V1.1.pdf", "#modalLolBody");
    PDFObject.embed("regulamentos/Regulamento FIFA21 V1.4.pdf", "#modalFifaBody");

    //Variáveis Universitário
    const leaderboard = await getLeaderboard()
    fillCs(leaderboard.csgo)
    fillLol(leaderboard.lol)
    fillFifa(leaderboard.fifa)
}

//Campeonato Universitário
async function getLeaderboard() {
    const response = await fetch("https://dot-gaming-d7618.firebaseio.com/leaderboard.json")
    const responseLeaderboard = await response.json()
    const leaderboard = {
        csgo: [],
        lol: [],
        fifa: []
    }

    for (const ldb in responseLeaderboard) {
        if (ldb == "csgo") {
            for (const team in responseLeaderboard[ldb]) {
                const { name, wins, losses, img, roundW, roundL, advantage } = responseLeaderboard[ldb][team]
                const diffRounds = roundW - roundL
                const diffgames = wins + losses

                leaderboard.csgo.push({
                    name,
                    diffgames,
                    wins,
                    losses,
                    img,
                    roundW,
                    roundL,
                    diffRounds,
                    advantage
                })
            }
        }
        if (ldb == "lol") {
            for (const team in responseLeaderboard[ldb]) {
                const { name, wins, losses, img, advantage } = responseLeaderboard[ldb][team]
                const diffgames = wins + losses

                leaderboard.lol.push({
                    name,
                    diffgames,
                    wins,
                    losses,
                    img,
                    advantage
                })
            }
        }
        if (ldb == "fifa") {
            for (const team in responseLeaderboard[ldb]) {
                const { name, wins, losses, img, advantage, draws, marcados, sofridos } = responseLeaderboard[ldb][team]
                const diffGolos = marcados - sofridos
                const diffgames = wins + losses + draws
                const points = wins * 3 + draws

                leaderboard.fifa.push({
                    name,
                    diffgames,
                    wins,
                    losses,
                    img,
                    advantage,
                    points,
                    draws,
                    marcados,
                    sofridos,
                    diffGolos
                })
            }
        }
    }
    return leaderboard
}
//Counter Strike: Global Offensive
function fillCs(csLeaderboard) {
    const csTable = document.getElementById("csLeaderboard")
    csLeaderboard.sort((a, b) => {
        return a.wins - b.wins || a.advantage - b.advantage || a.diffRounds - b.diffRounds || a.roundW - b.roundW || a.roundL - b.roundL
    })
    csLeaderboard.reverse()

    let str = `
    <thead class="thead">
        <tr class="text-center">         
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col" class="text-left" >Equipa</th>
            <th scope="col">Nº Jogos</th>
            <th scope="col">Vitórias</th>
            <th scope="col">Derrotas</th>            
            <th scope="col" data-toggle="tooltip" title="Rondas Ganhas">R/W</th>
            <th scope="col" data-toggle="tooltip" title="Rondas Perdidas">R/L</th>
            <th scope="col" data-toggle="tooltip" title="Diferença de Rondas">D/R</th>
        </tr>
    </thead>
    <tbody>
    `

    csLeaderboard.forEach((team, index) => {
        str += `
        <tr class="text-center">          
            <td>${index + 1}</td>
            <td><img class="imgTable text-right" src="${team.img}" width="40px"></td>
            <td class="tableTd text-left">${team.name}</td>
            <td class="tableTd">${team.diffgames}</td>
            <td class="tableTd">${team.wins}</td>
            <td class="tableTd">${team.losses}</td>         
            <td class="tableTd">${team.roundW}</td>
            <td class="tableTd">${team.roundL}</td>
            <td class="tableTd">${team.diffRounds}</td>
        </tr>
        `
    })
    str += "</tbody>"

    csTable.innerHTML = str

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
}
//League Of Legends
function fillLol(lolLeaderboard) {
    const lolTable = document.getElementById("lolLeaderboard")
    lolLeaderboard.sort((a, b) => {
        return a.wins - b.wins || a.advantage - b.advantage
    })
    lolLeaderboard.reverse()

    let str = `
    <thead class="thead">
        <tr class="text-center">
        <th scope="col">#</th>
        <th scope="col"></th>
        <th scope="col" class="text-left">Equipa</th>
        <th scope="col">Nº Jogos</th>
        <th scope="col">Vitórias</th>
        <th scope="col">Derrotas</th>
        </tr>
    </thead>
    <tbody>
    `

    lolLeaderboard.forEach((team, index) => {
        str += `
        <tr class="text-center">
        <td>${index + 1}</td>
        <td><img class="imgTable text-right" src="${team.img}" width="40px"></td>
        <td class="tableTd text-left">${team.name}</td>
        <td class="tableTd">${team.diffgames}</td>
        <td class="tableTd">${team.wins}</td>
        <td class="tableTd">${team.losses}</td> 
        </tr>        `
    })
    str += "</tbody>"

    lolTable.innerHTML = str
}
//FIFA21
function fillFifa(fifaLeaderboard) {
    const fifaTable = document.getElementById("fifaLeaderboard")
    fifaLeaderboard.sort((a, b) => {
        return a.points - b.points || a.advantage - b.advantage || a.diffGolos - b.diffGolos || a.marcados - b.marcados || a.sofridos - a.sofridos
    })
    fifaLeaderboard.reverse()

    let str = `
    <thead class="thead">
        <tr class="text-center">         
            <th scope="col">#</th>
            <th scope="col"></th>
            <th scope="col" class="text-left" >Jogador</th>
            <th scope="col">Nº Jogos</th>
            <th scope="col">Vitórias</th>
            <th scope="col">Empates</th>
            <th scope="col">Derrotas</th>
            <th scope="col" data-toggle="tooltip" title="Golos Marcados">GM</th>
            <th scope="col" data-toggle="tooltip" title="Golos Sofridos">GS</th>
            <th scope="col" data-toggle="tooltip" title="Diferença de Golos">DG</th>
            <th scope="col">Pontos</th>
        </tr>
    </thead>
    <tbody>
    `

    fifaLeaderboard.forEach((player, index) => {
        str += `
        <tr class="text-center">          
            <td>${index + 1}</td>
            <td><img class="imgTable text-right" src="${player.img}" width="40px"></td>
            <td class="tableTd text-left">${player.name}</td>
            <td class="tableTd">${player.diffgames}</td>
            <td class="tableTd">${player.wins}</td>
            <td class="tableTd">${player.draws}</td>
            <td class="tableTd">${player.losses}</td>
            <td class="tableTd">${player.marcados}</td>
            <td class="tableTd">${player.sofridos}</td>
            <td class="tableTd">${player.diffGolos}</td>
            <td class="tableTd">${player.points}</td>
        </tr>
        `
    })
    str += "</tbody>"

    fifaTable.innerHTML = str

    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

}