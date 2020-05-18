function closeModal() {
    let ectsModal = document.getElementById('ectsModal');
    if (ectsModal) {
        ectsModal.classList.add("hidden");
    }
}

function showModal() {
    let ectsModal = document.getElementById('ectsModal');
    if (ectsModal) {
        ectsModal.classList.remove("hidden");
    }
    calculateEcts();
}

function calculateEcts() {
    let ectsNumbers = 0;
    let firstMonth = 0;

    let ectsElements = document.getElementsByName('ects');
    let dateAchievedElements = document.getElementsByName('dateAchieved');

    for (let i = 0; i < ectsElements.length; i++) {
        if (dateAchievedElements[i].value != null && new Date(dateAchievedElements[i].value).getTime() < (new Date()).getTime()) {
            if (firstMonth > (new Date(dateAchievedElements[i].value)).getTime() / 1000 || firstMonth === 0) {
                firstMonth = (new Date(dateAchievedElements[i].value)).getTime() / 1000;
            }
            ectsNumbers += parseInt(ectsElements[i].value);
        }

    }

    let secondsFromFirstMonth = Math.round(new Date().getTime() / 1000)  - firstMonth;
    let monthsTillStart = Math.ceil(secondsFromFirstMonth / ((3600 * 24) * 30));
    let ectsPerMonth = ectsNumbers / monthsTillStart;

    if (document.getElementById('ectsTotal')) {
        document.getElementById('ectsTotal').innerText = ectsNumbers;
    }
    if (document.getElementById('ectsPerMonth')) {
        document.getElementById('ectsPerMonth').innerText = ectsPerMonth;
    }


    if (document.getElementById('ectsMonths')) {
        document.getElementById('ectsMonths').innerText = (60 - ectsNumbers) / ectsPerMonth;
    }
}