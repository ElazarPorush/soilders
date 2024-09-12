
const GetAllSoldiers = () => {
    const soldiers = JSON.parse(localStorage.getItem("soldiers"))
    return soldiers
}

const SaveSoldiers = (soldiers) => {
    localStorage.setItem("soldiers", JSON.stringify(soldiers));
}

const AddSoldier = () => {
    const [fullName, rank, position, platoon, missionTime] = document.querySelectorAll("input")
    const status = document.querySelector("#status")

    const soldier = {
        fullName: fullName.value,
        missionLength: missionTime.value,
        platoon: platoon.value,
        position: position.value,
        rank: rank.value,
        status: status.value,
    }

    if (localStorage.getItem("soldiers")) {
        const soldiers = GetAllSoldiers()
        soldiers.push(soldier)
        SaveSoldiers(soldiers)
    }
    else {
        const soldiers = [soldier];
        SaveSoldiers(soldiers)
    }
}

const CreateSoldier = (soldier) => {
    const row = document.createElement("tr")

    const name = document.createElement("td")
    const rank = document.createElement("td")
    const position = document.createElement("td")
    const platoon = document.createElement("td")
    const status = document.createElement("td")
    const actions = document.createElement("td")

    name.textContent = soldier.fullName
    rank.textContent = soldier.rank
    position.textContent = soldier.position
    platoon.textContent = soldier.platoon
    status.textContent = soldier.status

    const actionsDiv = document.createElement("div")
    actionsDiv.className = "actions"

    const remove = document.createElement("div")
    remove.className = "action"
    remove.textContent = "Remove"
    remove.addEventListener("click", () => {
        DeleteSoldier(soldier)
        PrintSoldiers()
    })

    
    const edit = document.createElement("div")
    edit.className = "action"
    edit.textContent = "Edit"
    edit.addEventListener("click", () => {
        GoToEditSection(soldier)
    })
    
    actionsDiv.appendChild(remove)
    if (soldier.status !== "Retired"){
        const mission = document.createElement("div")
        mission.className = "action"
        mission.textContent = "Mission"
        mission.addEventListener("click", () => {
            ActivateMission(mission, soldier.missionLength)
        })
        actionsDiv.appendChild(mission)
    }
    actionsDiv.appendChild(edit)
    actions.appendChild(actionsDiv)

    row.appendChild(name)
    row.appendChild(rank)
    row.appendChild(position)
    row.appendChild(platoon)
    row.appendChild(status)
    row.appendChild(actions)

    return row
}

const PrintSoldiers = () => {
    const table = document.querySelector("table")
    table.innerHTML = ""
    const title = document.createElement("tr")

    const tit1 = document.createElement("th")
    const tit2 = document.createElement("th")
    const tit3 = document.createElement("th")
    const tit4 = document.createElement("th")
    const tit5 = document.createElement("th")
    const tit6 = document.createElement("th")

    const name = document.createElement("div")
    name.className = "action"
    name.textContent = "Full Name ↓"
    tit1.appendChild(name)
    tit2.textContent = "RANK"
    tit3.textContent = "POSITION"
    tit4.textContent = "PLATON"
    tit5.textContent = "STATUS"
    tit6.textContent = "ACTIONS"
    
    title.appendChild(tit1)
    title.appendChild(tit2)
    title.appendChild(tit3)
    title.appendChild(tit4)
    title.appendChild(tit5)
    title.appendChild(tit6)
    table.appendChild(title)

    const soldiers = GetAllSoldiers()
    for (const soldier of soldiers){
        const row = CreateSoldier(soldier)
        table.appendChild(row)
    }
}

PrintSoldiers()

const DeleteSoldier = (soldier) => {
    const soldiers = GetAllSoldiers()
    const newSoldiers = soldiers.filter(sold => sold.fullName !== soldier.fullName)
    SaveSoldiers(newSoldiers)
}

const ActivateMission = (missionBtn, time) => {
    missionBtn.textContent = time
}

const GoToEditSection = (soldier) => {
    const main = document.querySelector(".main")
    const update = document.querySelector(".update")
    main.style.display = "none"
    update.style.display = "block"
    const [fullName, rank, position, platoon, missionTime] = document.querySelectorAll("input")
    const status = document.querySelector("#statusUpdate")
    fullName.value = soldier.fullName
    rank.value = soldier.rank
    position.value = soldier.position
    platoon.value = soldier.platoon
    missionTime.value = soldier.missionLength
    status.value = soldier.status
}