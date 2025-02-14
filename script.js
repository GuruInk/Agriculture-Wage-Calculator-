let startTime, endTime, breakStartTime, totalWorkTime = 0, totalBreakTime = 0, interval;
let isOnBreak = false;

document.getElementById("startBtn").addEventListener("click", function() {
    startTime = new Date();
    interval = setInterval(updateTime, 1000);
    this.disabled = true;
    document.getElementById("breakBtn").disabled = false;
    document.getElementById("stopBtn").disabled = false;
});

document.getElementById("breakBtn").addEventListener("click", function() {
    if (!isOnBreak) {
        breakStartTime = new Date();
        this.textContent = "Resume";
        isOnBreak = true;
    } else {
        totalBreakTime += Math.floor((new Date() - breakStartTime) / 1000);
        this.textContent = "Break";
        isOnBreak = false;
    }
});

document.getElementById("stopBtn").addEventListener("click", function() {
    clearInterval(interval);
    endTime = new Date();
    totalWorkTime += Math.floor((endTime - startTime) / 1000) - totalBreakTime;
    updateHistory();
    resetTimer();
});

document.getElementById("resetBtn").addEventListener("click", resetTimer);

function updateTime() {
    let currentTime = new Date();
    let elapsedTime = Math.floor((currentTime - startTime) / 1000);
    if (isOnBreak) {
        document.getElementById("breakTime").textContent = formatTime(elapsedTime - totalWorkTime);
    } else {
        document.getElementById("workTime").textContent = formatTime(elapsedTime - totalBreakTime);
        calculateWages(elapsedTime - totalBreakTime);
    }
}

function calculateWages(secondsWorked) {
    let wagePerMinute = parseFloat(document.getElementById("wagePerMinute").value) || 0;
    let totalWages = (secondsWorked / 60) * wagePerMinute;
    document.getElementById("totalWages").textContent = totalWages.toFixed(2);
}

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateHistory() {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${startTime.toLocaleTimeString()}</td>
        <td>${endTime.toLocaleTimeString()}</td>
        <td>${formatTime(totalWorkTime)}</td>
        <td>${formatTime(totalBreakTime)}</td>
        <td>₹${document.getElementById("totalWages").textContent}</td>
    `;
    document.getElementById("workHistory").appendChild(row);
}

function resetTimer() {
    clearInterval(interval);
    document.getElementById("workTime").textContent = "00:00:00";
    document.getElementById("breakTime").textContent = "00:00:00";
    document.getElementById("totalWages").textContent = "0.00";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("breakBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    totalWorkTime = 0;
    totalBreakTime = 0;
    isOnBreak = false;
}

document.getElementById('reset-btn').addEventListener('click', function() {
    // Reset the work timer
    workTime = 0;
    document.getElementById('work-time').textContent = '0:00';
    
    // Reset the break timer
    breakTime = 0;
    document.getElementById('break-time').textContent = '0:00';

    // Reset other elements (like wage, history, etc.)
    document.getElementById('total-wage').textContent = '₹0.00';
    document.getElementById('history').innerHTML = '';  // Clear history if needed
    
    // If you have form elements (like inputs), reset them too
    document.getElementById('wage-input').value = '';  // If you have input for wage rate
});
