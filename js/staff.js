
// ── Session ──
const staffId   = sessionStorage.getItem("staffId") || "STAFF001";
const staffName = "Prof. " + staffId.replace("STAFF","Guruprasath");
document.getElementById("staffIdChip").textContent   = "ID: " + staffId;
document.getElementById("staffGreet").textContent    = staffId === "STAFF001" ? "Guruprasath" : "Staff Member";
document.getElementById("sidebarName").textContent   = staffId === "STAFF001" ? "Guruprasath D" : staffId;
document.getElementById("sidebarAvatar").textContent = staffId.slice(-2);

// Greeting
const hr = new Date().getHours();
document.getElementById("greeting").textContent = hr < 12 ? "Morning" : hr < 17 ? "Afternoon" : "Evening";

// Today
const today = new Date();
const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
document.getElementById("todaySub").textContent  = dayNames[today.getDay()] + " · " +
    today.toLocaleDateString("en-IN", {day:"numeric", month:"long", year:"numeric"});
document.getElementById("attDate").textContent   = today.toLocaleDateString("en-IN", {day:"numeric", month:"short"});

// ── Classes ──
const classes = [
    { code:"CS301", name:"Data Structures",   section:"A", time:"9:20 AM",  students:48 },
    { code:"CS302", name:"Computer Networks", section:"B", time:"10:30 AM", students:45 },
    { code:"MA401", name:"Mathematics IV",    section:"A", time:"1:00 PM",  students:52 },
];

let activeClassIdx = 0;
const tabsEl = document.getElementById("classTabs");
classes.forEach((cls, i) => {
    const t = document.createElement("div");
    t.className = "tab" + (i === 0 ? " active" : "");
    t.textContent = cls.code;
    t.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
        t.classList.add("active");
        activeClassIdx = i;
        renderStudents(i);
    });
    tabsEl.appendChild(t);
});

// ── Students ──
const studentNames = [
    "Aadhi Raj J","Abishek R","Dharanishwar S","Guruprasath D",
    "Kavya M","Lokesh P","Meera S","Nithish K",
];
const attendance = {};

function renderStudents(classIdx) {
    const cls = classes[classIdx];
    document.getElementById("activeClassName").textContent = cls.code + " – " + cls.name;
    document.getElementById("activeClassInfo").textContent = "Section " + cls.section + " · " + cls.students + " Students · " + cls.time;

    const list = document.getElementById("studentList");
    list.innerHTML = "";
    studentNames.forEach((name, i) => {
        const key = classIdx + "_" + i;
        if (!attendance[key]) attendance[key] = "none";
        list.innerHTML += `
        <div class="student-row">
            <div class="s-num">${String(i+1).padStart(2,"0")}</div>
            <div class="s-name">${name}</div>
            <div class="s-enroll">${12340 + i + classIdx * 10}</div>
            <div class="att-toggle">
                <button class="att-btn ${attendance[key]==='present'?'present':''}" id="p_${key}" onclick="setAtt('${key}','present')">✔</button>
                <button class="att-btn ${attendance[key]==='absent'?'absent':''}"  id="a_${key}" onclick="setAtt('${key}','absent')">✗</button>
            </div>
        </div>`;
    });
}
renderStudents(0);

function setAtt(key, status) {
    attendance[key] = status;
    const ci = parseInt(key.split("_")[0]);
    renderStudents(ci);
    console.log(attendance);
}
function markAll(status) {
    studentNames.forEach((_, i) => {
        const key = activeClassIdx + "_" + i;
        attendance[key] = status;
    });
    renderStudents(activeClassIdx);
}
// Keep track of the file handle so we can overwrite it later
let fileHandle;

async function submitAttendance(event) {
    const btn = event.target;
    const jsonString = JSON.stringify(attendance, null, 2);

    try {
        // If we haven't picked a file yet, ask the user where to save it
        if (!fileHandle) {
            fileHandle = await window.showSaveFilePicker({
                suggestedName: 'attendance_master.json',
                types: [{
                    description: 'JSON Files',
                    accept: { 'application/json': ['.json'] },
                }],
            });
        }

        // Create a writable stream to the file and write the data
        const writable = await fileHandle.createWritable();
        await writable.write(jsonString);
        await writable.close();

        btn.textContent = "✔ Saved to Disk!";
        btn.style.background = "var(--green)";
        btn.style.color = "var(--bg)";

    } catch (error) {
        console.error("Save aborted or failed:", error);
        btn.textContent = "❌ Failed";
    }

    setTimeout(() => { btn.textContent = "Submit"; btn.style.background = ""; btn.style.color = ""; }, 2500);
}

// ── Schedule ──
const schedule = [
    { time:"8:30–9:20",  subj:"Free Period",        room:"Staff Room",  cls:"—",       done:true,    color:"var(--muted2)" },
    { time:"9:20–10:10", subj:"Data Structures",    room:"Room 203",    cls:"II-CSE-A", current:true, color:"var(--blue)" },
    { time:"10:30–11:20",subj:"Computer Networks",  room:"Room 205",    cls:"II-CSE-B", done:false,   color:"var(--teal)" },
    { time:"11:20–12:10",subj:"Mathematics IV",     room:"Room 204",    cls:"II-CSE-A", done:false,   color:"var(--amber)" },
    { time:"1:00–3:00",  subj:"Lab Supervision",    room:"CS Lab 2",    cls:"II-CSE-A", done:false,   color:"var(--purple)" },
];
const schedEl = document.getElementById("scheduleList");
schedule.forEach(p => {
    schedEl.innerHTML += `
    <div class="period-item">
        <div class="period-time-col">${p.time}</div>
        <div class="period-dot" style="background:${p.color}"></div>
        <div class="period-detail">
            <div class="pd-name" style="color:${p.current ? p.color : ''}">${p.subj}</div>
            <div class="pd-room">${p.room} · ${p.cls}</div>
        </div>
        ${p.current ? '<div class="now-tag">NOW</div>' : p.done ? '<div class="done-tag">DONE</div>' : ''}
    </div>`;
});

// ── Performance Table ──
const perfData = [
    { name:"Aadhi Raj J",    att:92, quiz:88, grade:"A" },
    { name:"Abishek R",      att:88, quiz:82, grade:"B+" },
    { name:"Dharanishwar S", att:75, quiz:76, grade:"B" },
    { name:"Guruprasath D",  att:95, quiz:91, grade:"A+" },
    { name:"Kavya M",        att:80, quiz:70, grade:"B" },
    { name:"Lokesh P",       att:68, quiz:65, grade:"C+" },
    { name:"Meera S",        att:84, quiz:79, grade:"B+" },
    { name:"Nithish K",      att:90, quiz:85, grade:"A" },
];
const perfBody = document.getElementById("perfBody");
perfData.forEach((s, i) => {
    const attColor = s.att >= 75 ? "var(--green)" : "var(--red)";
    const gradeColor = { "A+":"var(--teal)","A":"var(--green)","B+":"var(--blue)","B":"var(--blue)","C+":"var(--amber)","C":"var(--red)" }[s.grade] || "var(--muted)";
    const gradeBg = { "A+":"rgba(79,209,197,0.12)","A":"rgba(104,211,145,0.12)","B+":"rgba(99,179,237,0.12)","B":"rgba(99,179,237,0.1)","C+":"rgba(246,173,85,0.12)","C":"rgba(252,129,129,0.12)" }[s.grade] || "var(--surface)";
    perfBody.innerHTML += `
    <tr>
        <td style="color:var(--muted);font-family:'JetBrains Mono',monospace">${String(i+1).padStart(2,"0")}</td>
        <td style="font-weight:500">${s.name}</td>
        <td><span class="att-pct" style="color:${attColor}">${s.att}%</span></td>
        <td style="font-family:'JetBrains Mono',monospace">${s.quiz}%</td>
        <td><span class="grade-badge" style="background:${gradeBg};color:${gradeColor}">${s.grade}</span></td>
    </tr>`;
});

// ── Subject Attendance Bars ──
const subBars = [
    { name:"Data Structures CS301",  pct:87, color:"var(--blue)" },
    { name:"Computer Networks CS302",pct:82, color:"var(--teal)" },
    { name:"Mathematics IV MA401",   pct:91, color:"var(--amber)" },
];
const subEl = document.getElementById("subjectBars");
subBars.forEach(s => {
    subEl.innerHTML += `
    <div style="margin-bottom:18px;">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;">
            <span style="font-weight:600">${s.name.split(" ").slice(0,-1).join(" ")}</span>
            <span style="font-family:'JetBrains Mono',monospace;font-weight:700;color:${s.color}">${s.pct}%</span>
        </div>
        <div style="height:8px;background:var(--border);border-radius:8px;overflow:hidden;">
            <div style="width:${s.pct}%;height:100%;background:${s.color};border-radius:8px;transition:width 1s ease;"></div>
        </div>
        <div style="font-size:11px;color:var(--muted);margin-top:4px;">${Math.round(s.pct*50/100)} / 50 classes marked</div>
    </div>`;
});

// ── Quiz Results ──
const quizRes = [
    { title:"Unit 2 – DS",      subj:"CS301", avg:78, high:95, low:52, students:46 },
    { title:"Mid-Sem – Networks",subj:"CS302", avg:71, high:90, low:43, students:44 },
    { title:"Unit 1 – Maths",   subj:"MA401", avg:82, high:98, low:60, students:50 },
];
const qrEl = document.getElementById("quizResults");
quizRes.forEach(q => {
    const c = q.avg >= 75 ? "var(--green)" : q.avg >= 60 ? "var(--amber)" : "var(--red)";
    qrEl.innerHTML += `
    <div style="padding:14px;background:var(--bg2);border:1px solid var(--border);border-radius:12px;margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <div>
                <div style="font-size:13px;font-weight:700">${q.title}</div>
                <div style="font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace">${q.subj} · ${q.students} students</div>
            </div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:800;color:${c}">${q.avg}%</div>
        </div>
        <div style="display:flex;gap:12px;">
            <div style="font-size:11px;color:var(--green)">▲ High: ${q.high}%</div>
            <div style="font-size:11px;color:var(--red)">▼ Low: ${q.low}%</div>
        </div>
        <div style="height:4px;background:var(--border);border-radius:4px;margin-top:10px;overflow:hidden;">
            <div style="width:${q.avg}%;height:100%;background:${c};border-radius:4px;"></div>
        </div>
    </div>`;
});

// ── Notifications ──
const notifs = [
    { icon:"📢", bg:"rgba(99,179,237,0.12)", title:"Attendance portal synced", desc:"Biometric data updated for today. Cross-check if needed.", time:"9:02 AM" },
    { icon:"⚠️", bg:"rgba(252,129,129,0.12)", title:"Low attendance alert",     desc:"3 students in CS301 below 75% threshold.", time:"8:45 AM" },
    { icon:"📝", bg:"rgba(246,173,85,0.12)",  title:"Quiz evaluation pending",  desc:"Unit 2 DS quiz has 2 ungraded submissions.", time:"Yesterday" },
    { icon:"🎓", bg:"rgba(104,211,145,0.12)", title:"NEXATHON 2.0 results out", desc:"Team Sparrow secured a top position. Congratulations!", time:"Mar 20" },
];
const nEl = document.getElementById("notifList");
notifs.forEach(n => {
    nEl.innerHTML += `
    <div class="notif-item">
        <div class="notif-icon" style="background:${n.bg}">${n.icon}</div>
        <div class="notif-text">
            <div class="nt-title">${n.title}</div>
            <div class="nt-desc">${n.desc}</div>
            <div class="nt-time">${n.time}</div>
        </div>
    </div>`;
});

// ── Create Quiz ── 
function createQuiz() {
    const title = document.getElementById("qTitle").value.trim();
    const msg   = document.getElementById("quizMsg");
    if (!title) { msg.style.color = "var(--red)"; msg.textContent = "⚠ Please enter a quiz title."; return; }
    msg.style.color = "var(--green)";
    msg.textContent = "✔ Quiz \"" + title + "\" published successfully!";
    document.getElementById("qTitle").value = "";
    document.getElementById("qCount").value = "";
    document.getElementById("qDuration").value = "";
    document.getElementById("qInstructions").value = "";
    setTimeout(() => msg.textContent = "", 4000);
}