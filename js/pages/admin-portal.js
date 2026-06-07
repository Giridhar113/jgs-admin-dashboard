/* Shared page runtime for the JGS Admin Portal */
(function () {
  const pages = {
    "admin-dashboard": {
      title: "Principal Dashboard",
      description: "Institution-level command center for JGS Group of Institutes.",
      roles: ["Principal"],
      render: renderPrincipalDashboard
    },
    "hod-dashboard": {
      title: "HOD Dashboard",
      description: "Department operations, approvals, and academic progress.",
      roles: ["Principal", "HOD"],
      render: renderHodDashboard
    },
    "registrar-dashboard": {
      title: "Registrar Dashboard",
      description: "Admissions, records, certificates, and university submissions.",
      roles: ["Principal", "Registrar"],
      render: renderRegistrarDashboard
    },
    "accounts-dashboard": {
      title: "Accounts Dashboard",
      description: "Fee collection, reminders, receipts, and concessions.",
      roles: ["Principal", "Accounts"],
      render: renderAccountsDashboard
    },
    "student-registry": {
      title: "Student Registry",
      description: "Search, filter, export, and manage enrolled students.",
      roles: ["Principal", "HOD", "Registrar"],
      render: renderStudentRegistry
    },
    "bulk-student-import": {
      title: "Bulk Student Import",
      description: "Create student, user, and parent records from one CSV import.",
      roles: ["Principal", "Registrar"],
      render: renderBulkStudentImport
    },
    "student-profile": {
      title: "Student Profile",
      description: "Academic, attendance, fee, and document lifecycle.",
      roles: ["Principal", "HOD", "Registrar", "Accounts"],
      render: renderStudentProfile
    },
    "fee-management": {
      title: "Fee Management",
      description: "Payment status, overdue follow-up, receipts, and reports.",
      roles: ["Principal", "Accounts"],
      render: renderFeeManagement
    },
    "fee-structure": {
      title: "Fee Structure Builder",
      description: "Build course-wise fee structures and apply them to students.",
      roles: ["Principal", "Accounts"],
      render: renderFeeStructureBuilder
    },
    "timetable-builder": {
      title: "Timetable Builder",
      description: "Drag subjects and teachers into a visual weekly grid.",
      roles: ["Principal", "HOD", "Registrar"],
      render: renderTimetableBuilder
    },
    "exam-management": {
      title: "Exam Management",
      description: "Create exams, build exam timetables, and publish schedules.",
      roles: ["Principal", "HOD", "Registrar"],
      render: renderExamManagement
    },
    "reports-center": {
      title: "Reports Center",
      description: "Attendance, marks, fees, and enrollment analytics with exports.",
      roles: ["Principal", "HOD", "Registrar", "Accounts"],
      render: renderReportsCenter
    },
    "payroll": {
      title: "Staff Payroll",
      description: "Generate teacher payslips and track salary status.",
      roles: ["Principal", "Accounts"],
      render: renderPayroll
    },
    "library-management": {
      title: "Library Management",
      description: "Manage books, issues, returns, and late fines.",
      roles: ["Principal", "Registrar"],
      render: renderLibraryManagement
    },
    "hostel-management": {
      title: "Hostel Management",
      description: "Manage rooms, student assignments, and hostel fee links.",
      roles: ["Principal", "Registrar", "Accounts"],
      render: renderHostelManagement
    },
    "event-calendar": {
      title: "Event Calendar",
      description: "Publish public, student, and staff events from one calendar.",
      roles: ["Principal", "HOD", "Registrar"],
      render: renderEventCalendar
    },
    "audit-log": {
      title: "Audit Log",
      description: "Review login, student, marks, fees, notices, and timetable actions.",
      roles: ["Principal"],
      render: renderAuditLog
    },
    "approval-queue": {
      title: "Approval Queue",
      description: "Review requests across leave, certificates, fee waivers, and marks.",
      roles: ["Principal", "HOD", "Registrar", "Accounts"],
      render: renderApprovalQueue
    },
    "notice-board": {
      title: "Notice Board",
      description: "Publish and manage targeted institutional notices.",
      roles: ["Principal", "HOD", "Registrar"],
      render: renderNoticeBoard
    },
    analytics: {
      title: "Analytics",
      description: "Attendance, finance, admissions, and placement trends.",
      roles: ["Principal", "HOD", "Registrar", "Accounts"],
      render: renderAnalytics
    },
    settings: {
      title: "Settings",
      description: "Portal preferences, role access, backend connection, and audit policy.",
      roles: ["Principal"],
      render: renderSettings
    }
  };

  const navItems = [
    ["admin-dashboard.html", "Dashboard", "Principal", "Dashboard"],
    ["student-registry.html", "Students", "Registrar", "Students"],
    ["bulk-student-import.html", "Bulk Import", "Registrar", "Students"],
    ["student-registry.html?view=attendance", "Attendance", "HOD", "Attendance"],
    ["approval-queue.html?tab=Marks%20Approval", "Marks", "HOD", "Marks"],
    ["fee-management.html", "Fee Management", "Accounts", "Fees"],
    ["fee-structure.html", "Fee Structure", "Accounts", "Fees"],
    ["timetable-builder.html", "Timetable", "HOD", "Timetable"],
    ["exam-management.html", "Exams", "Registrar", "Exams"],
    ["reports-center.html", "Reports", "Principal", "Reports"],
    ["payroll.html", "Payroll", "Accounts", "Payroll"],
    ["library-management.html", "Library", "Registrar", "Library"],
    ["hostel-management.html", "Hostel", "Registrar", "Hostel"],
    ["event-calendar.html", "Events", "Registrar", "Events"],
    ["audit-log.html", "Audit Log", "Principal", "Audit"],
    ["notice-board.html", "Notices", "Registrar", "Notices"],
    ["approval-queue.html", "Approvals", "Principal", "Approvals"],
    ["hod-dashboard.html?view=faculty", "Faculty HR", "HOD", "Faculty"],
    ["analytics.html", "Analytics", "Principal", "Analytics"],
    ["settings.html", "Settings", "Principal", "Settings"]
  ];

  const students = [
    ["Aarav Mehta", "JGS25CSE014", "CSE", "Sem 4", 88, "Paid", "Active", "9876501201", "aarav.mehta@jgs.edu"],
    ["Diya Shah", "JGS25AIML021", "AI&ML", "Sem 4", 82, "Pending", "Active", "9876501202", "diya.shah@jgs.edu"],
    ["Kabir Khan", "JGS25ECE033", "ECE", "Sem 6", 76, "Overdue", "Active", "9876501203", "kabir.khan@jgs.edu"],
    ["Nisha Rao", "JGS25EEE041", "EEE", "Sem 2", 79, "Paid", "Active", "9876501204", "nisha.rao@jgs.edu"],
    ["Rohan Iyer", "JGS25ME052", "Mechanical", "Sem 8", 71, "Pending", "Exam", "9876501205", "rohan.iyer@jgs.edu"],
    ["Sara Ansari", "JGS25CV063", "Civil", "Sem 4", 68, "Overdue", "Active", "9876501206", "sara.ansari@jgs.edu"],
    ["Vivaan Patil", "JGS25CSE077", "CSE", "Sem 2", 91, "Paid", "Active", "9876501207", "vivaan.patil@jgs.edu"],
    ["Mira D'Souza", "JGS25AIML088", "AI&ML", "Sem 6", 85, "Paid", "Active", "9876501208", "mira.dsouza@jgs.edu"]
  ].map(([name, roll, branch, semester, attendance, feeStatus, status, mobile, email], index) => ({
    id: index + 1,
    name,
    roll,
    branch,
    semester,
    attendance,
    feeStatus,
    status,
    mobile,
    email
  }));

  const feeRows = students.map((student, index) => ({
    student: student.name,
    roll: student.roll,
    branch: student.branch,
    sem: student.semester.replace("Sem ", ""),
    amount: index % 3 === 0 ? "Rs 74,000" : index % 3 === 1 ? "Rs 42,500" : "Rs 18,000",
    dueDate: index % 2 === 0 ? "10 Jun 2026" : "25 May 2026",
    paidOn: student.feeStatus === "Paid" ? "18 May 2026" : "-",
    status: student.feeStatus
  }));

  const approvals = [
    ["Aarav Mehta", "Student", "Bonafide", "1 Jun 2026", "Submitted > HOD > Registrar", "info"],
    ["Prof. Neha Kulkarni", "Faculty", "Leave Requests", "31 May 2026", "Submitted > HOD", "warning"],
    ["Kabir Khan", "Student", "Transfer Certificate", "30 May 2026", "Submitted > Registrar > Principal", "danger"],
    ["Diya Shah", "Student", "Fee Waiver", "29 May 2026", "Submitted > Accounts", "warning"],
    ["Prof. Sameer Rao", "Faculty", "Marks Approval", "28 May 2026", "Uploaded > HOD", "info"]
  ].map(([requester, role, type, submitted, trail, tone]) => ({ requester, role, type, submitted, trail, tone }));

  function init() {
    const pageKey = document.body.dataset.page;
    const page = pages[pageKey];
    if (!page) return;
    guard(page);
    mountShell(pageKey, page);
    page.render(document.querySelector("[data-page-content]"));
    bindGlobalActions();
  }

  function guard(page) {
    const isAdmin = localStorage.getItem("jgs_role") === "admin";
    const role = localStorage.getItem("jgs_admin_role");
    if (!isAdmin) {
      window.location.replace("admin-login.html");
      return;
    }
    if (role && !page.roles.includes(role)) {
      const fallback = role === "HOD" ? "hod-dashboard.html" : role === "Registrar" ? "registrar-dashboard.html" : role === "Accounts" ? "accounts-dashboard.html" : "admin-dashboard.html";
      window.location.replace(fallback);
    }
  }

  function mountShell(pageKey, page) {
    const name = localStorage.getItem("jgs_admin_name") || "JGS Admin";
    const role = localStorage.getItem("jgs_admin_role") || "Principal";
    document.querySelector("[data-app]").innerHTML = `
      <header class="topbar">
        <div class="brand-lockup">
          <div class="logo-mark">JGS</div>
          <div>
            <strong>JGS Group of Institutes</strong>
            <div class="muted">${config("campus")} <span class="badge">${config("academicYear")}</span></div>
          </div>
        </div>
        <div class="top-actions">
          <a class="button secondary" href="${config("publicWebsiteUrl")}">Visit JGS Website</a>
          <button class="bell" type="button" aria-label="Notifications">!<span class="bell-count">7</span></button>
          <div class="admin-pill"><strong>${escapeHtml(name)}</strong><span class="muted">${escapeHtml(role)}</span></div>
          <button class="secondary" type="button" data-logout>Logout</button>
        </div>
      </header>
      <aside class="sidebar"><nav>${navItems.map((item) => navLink(item, pageKey, role)).join("")}<button class="nav-link" type="button" data-logout><span>Logout</span></button></nav></aside>
      <main class="main">
        <section class="page-header">
          <div><h1>${page.title}</h1><p class="muted">${page.description}</p></div>
          <span class="badge">AICTE Approved | University of Mumbai</span>
        </section>
        <section data-page-content></section>
      </main>
      <nav class="bottom-nav">
        <a href="${dashboardForRole(role)}">Home</a>
        <a href="student-registry.html">Students</a>
        <a href="approval-queue.html">Approvals</a>
        <a href="settings.html">Settings</a>
      </nav>
      <div class="modal" data-modal><div class="modal-card" data-modal-card></div></div>
    `;
    loadEnhancements();
  }

  function loadEnhancements() {
    if (window.JGSPortalEnhancements) return window.JGSPortalEnhancements.init("admin");
    const script = document.createElement("script");
    script.src = "js/portal-enhancements.js";
    script.onload = () => window.JGSPortalEnhancements?.init("admin");
    document.head.append(script);
  }

  function navLink(item, pageKey, role) {
    const [href, label] = item;
    const target = label === "Dashboard" ? dashboardForRole(role) : href;
    const active = target.split("?")[0].replace(".html", "") === pageKey ? " active" : "";
    return `<a class="nav-link${active}" href="${target}"><span>${label}</span></a>`;
  }

  function dashboardForRole(role) {
    return role === "HOD" ? "hod-dashboard.html" : role === "Registrar" ? "registrar-dashboard.html" : role === "Accounts" ? "accounts-dashboard.html" : "admin-dashboard.html";
  }

  function renderPrincipalDashboard(root) {
    root.innerHTML = `
      ${kpiGrid([["Total Students", "1,248"], ["Average Attendance", "84.2%"], ["Fees Collected", "Rs 1.4 Cr"], ["Pending Approvals", "17"]])}
      <div class="grid two-col" style="margin-top:16px">
        <section class="panel"><h2>Alerts</h2><div class="alerts">
          <div class="alert danger">Exam timetable not published - B.Tech Sem 4</div>
          <div class="alert warning">42 fee defaulters - reminder due today</div>
          <div class="alert info">Hall ticket window opens 3 Jun 2026</div>
          <div class="alert success">Payroll processed - May 2026</div>
        </div></section>
        <section class="panel"><h2>Quick Actions</h2><div class="actions-grid">${["Add Student", "Mark Attendance", "Upload Marks", "Send Fee Reminder", "Post Notice", "Generate Hall Tickets"].map((a) => `<button type="button" data-action="${a}">${a}</button>`).join("")}</div></section>
      </div>
      <div class="grid two-col" style="margin-top:16px">
        <section class="panel"><h2>Recent Activity</h2><div class="activity-list">${recentActivity()}</div></section>
        <section class="panel"><h2>Branch-wise Attendance</h2>${progressList([["CSE", 88], ["AI&ML", 82], ["ECE", 76], ["EEE", 79], ["Mechanical", 71], ["Civil", 68]])}</section>
      </div>`;
  }

  function renderHodDashboard(root) {
    root.innerHTML = `
      <section class="panel"><div class="toolbar"><div class="field"><label for="dept">Department selector</label><select id="dept"><option>CSE</option><option>AI&ML</option><option>ECE</option><option>EEE</option><option>Mechanical</option><option>Civil</option></select></div></div></section>
      ${kpiGrid([["Students", "214"], ["Faculty", "18"], ["Low attendance", "23"], ["Marks pending approval", "9"]])}
      <div class="grid three-col" style="margin-top:16px">${panelList("Faculty performance overview", ["Prof. S. Rao - 94% completion", "Prof. N. Kulkarni - 88% feedback", "Prof. A. Fernandes - 91% attendance"])}${panelList("Marks approval queue", ["DBMS IA-2", "OS Lab practical", "Maths-IV revaluation"])}${panelList("Bonafide / TC approval queue", ["3 bonafide requests", "1 TC request", "2 faculty leave requests"])}</div>
      <div class="grid two-col" style="margin-top:16px">${panelList("Department notices", ["Sem 4 timetable draft due", "Lab audit on 6 Jun 2026", "Mentor meeting Friday"])}<section class="panel"><h2>Subject completion tracker</h2>${progressList([["DBMS", 82], ["OS", 74], ["CN", 69], ["Maths-IV", 88]])}</section></div>
      <section class="panel" style="margin-top:16px"><h2>Department analytics</h2>${progressList([["Attendance", 84], ["Marks uploaded", 76], ["Syllabus progress", 79]])}</section>`;
  }

  function renderRegistrarDashboard(root) {
    root.innerHTML = `${kpiGrid([["Admissions summary", "386"], ["New applications", "48"], ["Verification queue", "31"], ["University submissions", "92%"]])}
      <div class="grid three-col" style="margin-top:16px">${panelList("Student registry updates", ["14 profile edits pending", "8 branch transfers", "22 ID card requests"])}${panelList("Certificate requests", ["Bonafide: 17", "Migration: 4", "Transcript: 6"])}${panelList("Transfer certificate requests", ["2 ready for principal", "1 document mismatch", "4 in progress"])}</div>
      <div class="grid two-col" style="margin-top:16px">${panelList("Enrollment status", ["Active: 1,248", "Admission confirmed: 386", "Document hold: 29"])}${panelList("University submission status", ["Sem 8 forms sent", "Sem 4 hall ticket data pending", "Mumbai University portal sync: 92%"])}</div>`;
  }

  function renderAccountsDashboard(root) {
    root.innerHTML = `${kpiGrid([["Fee collected", "Rs 1.4 Cr"], ["Pending fees", "Rs 38.2 L"], ["Overdue fees", "Rs 12.7 L"], ["Defaulters", "42"]])}
      <div class="grid three-col" style="margin-top:16px">${panelList("Receipt generation", ["18 receipts today", "3 receipts pending print", "GST summary ready"])}${panelList("Payment history", ["UPI: Rs 8.4 L", "Bank transfer: Rs 11.2 L", "Cash counter: Rs 1.1 L"])}${panelList("Reminder queue", ["42 fee defaulters", "12 final notices", "6 parent calls due"])}</div>
      <section class="panel" style="margin-top:16px"><h2>Scholarship / waiver requests</h2>${approvalCards(approvals.filter((a) => a.type === "Fee Waiver"))}</section>`;
  }

  function renderStudentRegistry(root) {
    root.innerHTML = tableSection({
      id: "students",
      filters: [["Academic year", ["AY 2025-26", "AY 2024-25"]], ["Branch", ["All", "CSE", "AI&ML", "ECE", "EEE", "Mechanical", "Civil"]], ["Semester", ["All", "Sem 2", "Sem 4", "Sem 6", "Sem 8"]], ["Status", ["All", "Active", "Exam"]], ["Fee status", ["All", "Paid", "Pending", "Overdue"]]],
      search: "Search by name/roll/mobile/email",
      columns: ["#", "Student", "Roll no", "Branch", "Semester", "Attendance %", "Fee status", "Status", "Actions"],
      rows: students.map((s) => [s.id, `${avatar(s.name)} ${s.name}`, s.roll, s.branch, s.semester, `${s.attendance}%`, tag(s.feeStatus), tag(s.status, "info"), rowActions(["View", "Edit", "Message Parent", "Send Reminder"])]),
      empty: "No students found. Adjust filters or add a new student."
    }) + `<div class="pagination"><button class="secondary">Previous</button>${[1,2,3,4,5].map((n) => `<button class="${n === 1 ? "" : "secondary"}">${n}</button>`).join("")}<button class="secondary">Next</button></div>`;
    wireTables(root);
  }

  function renderStudentProfile(root) {
    root.innerHTML = `
      <section class="panel"><div class="activity-row"><div class="avatar">AM</div><div><h2>Aarav Mehta</h2><p class="muted">JGS25CSE014 | CSE | Sem 4 | Active</p></div><span class="tag success">Fee Paid</span></div>
      <div class="pipeline">${["Applied", "Admitted", "Enrolled", "Active", "Exam", "Graduated", "Alumni"].map((p, i) => `<span class="${i < 4 ? "done" : ""}">${p}</span>`).join("")}</div></section>
      <section class="panel" style="margin-top:16px"><div class="tabs">${["Academic", "Attendance", "Fee", "Documents"].map((t, i) => `<button class="tab-button ${i === 0 ? "active" : ""}" data-tab="${t}">${t}</button>`).join("")}</div>
      <div data-tab-panel>${studentTab("Academic")}</div></section>`;
    root.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => {
      root.querySelectorAll("[data-tab]").forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      root.querySelector("[data-tab-panel]").innerHTML = studentTab(button.dataset.tab);
    }));
  }

  function renderFeeManagement(root) {
    root.innerHTML = `${kpiGrid([["Total Collected", "Rs 1.4 Cr"], ["Pending", "Rs 38.2 L"], ["Defaulters", "42"], ["Overdue", "Rs 12.7 L"]])}
      <section class="panel" style="margin-top:16px"><div class="table-tools"><h2>Fee Register</h2><div class="row-actions"><button data-action="Bulk reminder">Bulk reminder</button><button data-export-table="fees">Export report</button></div></div>
      ${tableSection({ id: "fees", filters: [["Branch", ["All", "CSE", "AI&ML", "ECE", "EEE", "Mechanical", "Civil"]], ["Semester", ["All", "2", "4", "6", "8"]], ["Status", ["All", "Paid", "Pending", "Overdue"]]], search: "Search", columns: ["Student", "Roll", "Branch", "Sem", "Amount", "Due Date", "Paid On", "Status", "Actions"], rows: feeRows.map((f) => [f.student, f.roll, f.branch, f.sem, f.amount, f.dueDate, f.paidOn, tag(f.status), rowActions(["Record Payment", "Receipt", "Reminder"])]), empty: "No fee records found. Adjust filters or search again." })}</section>`;
    wireTables(root);
  }

  function renderApprovalQueue(root) {
    const tabs = ["All", "Leave Requests", "Bonafide", "Transfer Certificate", "Fee Waiver", "Marks Approval"];
    root.innerHTML = `<section class="panel"><div class="tabs">${tabs.map((tab, i) => `<button class="tab-button ${i === 0 ? "active" : ""}" data-approval-tab="${tab}">${tab}</button>`).join("")}</div><div data-approval-list>${approvalCards(approvals)}</div></section>`;
    root.querySelectorAll("[data-approval-tab]").forEach((button) => button.addEventListener("click", () => {
      root.querySelectorAll("[data-approval-tab]").forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      const rows = button.dataset.approvalTab === "All" ? approvals : approvals.filter((item) => item.type === button.dataset.approvalTab);
      root.querySelector("[data-approval-list]").innerHTML = approvalCards(rows);
    }));
  }

  function renderNoticeBoard(root) {
    root.innerHTML = `<div class="grid two-col"><section class="panel"><h2>Post notice</h2><form class="notice-form" data-notice-form>
      ${field("Title", "noticeTitle", "input", true)}${field("Target audience", "audience", "select", true, ["All", "Students", "Parents", "Faculty", "Specific Branch"])}
      ${field("Priority", "priority", "select", true, ["Normal", "Important", "Urgent"])}${field("Expiry date", "expiry", "input", true, null, "date")}
      ${field("Message", "message", "textarea", true, null, null, "wide")}
      <button type="submit">Post Notice</button><p class="error" data-notice-error></p></form></section>
      <section class="panel"><h2>Pinned notices</h2>${noticeCards(["Hall ticket window opens 3 Jun 2026", "Exam form correction closes Friday"], "info")}</section></div>
      <div class="grid two-col" style="margin-top:16px"><section class="panel"><h2>Active notices</h2>${noticeCards(["Fee reminder sent to Sem 4", "Lab audit schedule published", "Seminar hall booking rules updated"], "warning")}</section><section class="panel"><h2>Archived notices</h2>${noticeCards(["Payroll processed - May 2026", "Admissions helpdesk roster"], "success")}</section></div>`;
    root.querySelector("[data-notice-form]").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const error = root.querySelector("[data-notice-error]");
      error.textContent = "";
      if (!form.noticeTitle.value.trim() || !form.message.value.trim()) {
        error.textContent = "Title and message are required.";
        return;
      }
      openModal("Notice queued", `<p>The notice is ready for publishing to ${escapeHtml(form.audience.value)}.</p><button data-close-modal>Close</button>`);
      form.reset();
    });
  }

  function renderAnalytics(root) {
    root.innerHTML = `<div class="grid three-col">${kpiCards([["Eligible", "412"], ["Placed", "286"], ["Average package", "Rs 5.8 LPA"], ["Top package", "Rs 18 LPA"], ["Companies", "74"]])}</div><div class="grid two-col" style="margin-top:16px">${["Attendance by branch", "Monthly attendance trend", "Fee status doughnut", "Monthly fee collection", "Applications trend", "Applications by branch"].map((title, i) => `<section class="panel"><h2>${title}</h2><canvas data-chart="${i}" height="170"></canvas></section>`).join("")}</div>`;
    loadChartJs().then(() => drawCharts(root)).catch(() => drawChartFallback(root));
  }

  function renderSettings(root) {
    root.innerHTML = `<div class="grid two-col"><section class="panel"><h2>Backend connection</h2><p class="muted">Configured API base URL</p><code>${config("backendUrl") || "Not configured - using static demo data"}</code><div class="alerts" style="margin-top:14px"><div class="alert info">Uses POST /api/auth/login and admin module APIs when backendUrl is set.</div><div class="alert danger">Never expose password hashes in frontend code or responses.</div></div></section>
      <section class="panel"><h2>Role access</h2>${progressList([["Principal modules", 100], ["HOD department-only", 68], ["Registrar records", 72], ["Accounts fees", 58]])}</section></div>
      <section class="panel" style="margin-top:16px"><h2>Portal controls</h2><div class="actions-grid"><button data-action="Run audit">Run audit</button><button data-action="Export settings">Export settings</button><button class="danger" data-destructive="Reset demo data">Reset demo data</button></div></section>`;
  }

  function renderBulkStudentImport(root) {
    root.innerHTML = `<div class="grid two-col"><section class="panel"><div class="table-tools"><h2>CSV import</h2><button class="secondary" data-download-student-template>Download CSV template</button></div>
      <div class="field"><label for="studentCsv">Upload CSV</label><input id="studentCsv" type="file" accept=".csv" data-student-csv></div>
      <div class="alerts" style="margin-top:12px"><div class="alert info">Required columns: Name, Roll, Course, Semester, Email, Phone, ParentEmail.</div></div>
      <div class="row-actions" style="margin-top:14px"><button type="button" data-import-students disabled>Submit Import</button><span class="muted" data-import-status></span></div></section>
      <section class="panel"><h2>Import result</h2><div class="kpi-grid grid">${kpiCards([["Ready rows", "0"], ["Success", "0"], ["Failed", "0"], ["Parents linked", "0"]])}</div></section></div>
      <section class="panel" style="margin-top:16px"><h2>Preview</h2><div data-import-preview class="empty-state" style="display:block">Upload a CSV to preview student records before importing.</div></section>`;
    let parsedRows = [];
    root.querySelector("[data-download-student-template]").addEventListener("click", () => downloadText("jgs-student-import-template.csv", "Name,Roll,Course,Semester,Email,Phone,ParentEmail\nPriya Sharma,JGS25CSE101,CSE,4,priya.sharma@jgs.edu,9876501111,parent.priya@example.com"));
    root.querySelector("[data-student-csv]").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      await loadScriptOnce(config("papaParseUrl"), "Papa");
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          parsedRows = result.data;
          root.querySelector("[data-import-preview]").innerHTML = previewTable(["Name", "Roll", "Course", "Semester", "Email", "Phone", "ParentEmail"], parsedRows);
          root.querySelector("[data-import-students]").disabled = !parsedRows.length;
          root.querySelectorAll(".kpi strong")[0].textContent = parsedRows.length;
        }
      });
    });
    root.querySelector("[data-import-students]").addEventListener("click", async () => {
      const status = root.querySelector("[data-import-status]");
      status.textContent = "Importing...";
      const response = await apiPost("/api/admin/students/bulk", { students: parsedRows });
      root.querySelectorAll(".kpi strong")[1].textContent = response.successCount || 0;
      root.querySelectorAll(".kpi strong")[2].textContent = response.failedCount || 0;
      root.querySelectorAll(".kpi strong")[3].textContent = response.successCount || 0;
      status.textContent = `Imported ${response.successCount || 0}, failed ${response.failedCount || 0}.`;
    });
  }

  function renderFeeStructureBuilder(root) {
    const feeTypes = ["Tuition Fee", "Exam Fee", "Library Fee", "Hostel Fee", "Transport Fee"];
    root.innerHTML = `<section class="panel"><h2>Create fee structure</h2><form class="module-form" data-fee-structure-form>
      ${field("Course", "course", "select", true, ["CSE", "AI&ML", "ECE", "EEE", "Mechanical", "Civil"])}
      ${field("Semester", "semester", "select", true, ["1", "2", "3", "4", "5", "6", "7", "8"])}
      <div class="fee-items wide">${feeTypes.map((type) => `<div class="fee-builder-row"><strong>${type}</strong><input name="${type}Amount" type="number" min="0" placeholder="Amount"><input name="${type}Due" type="date"><label><input name="${type}Optional" type="checkbox" ${type.includes("Hostel") || type.includes("Transport") ? "checked" : ""}> Optional</label></div>`).join("")}</div>
      <label class="check wide"><input name="sendReminders" type="checkbox"> Send bulk payment reminder emails/SMS</label>
      <button type="submit">Apply Structure</button><span class="muted" data-fee-structure-status></span></form></section>
      <section class="panel" style="margin-top:16px"><h2>Preview</h2><div data-fee-preview>${previewTable(["Type", "Amount", "Due Date", "Optional"], feeTypes.map((type) => ({ Type: type, Amount: "-", "Due Date": "-", Optional: type.includes("Hostel") || type.includes("Transport") ? "Yes" : "No" })))}</div></section>`;
    root.querySelector("[data-fee-structure-form]").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const items = feeTypes.map((type) => ({ type, amount: Number(form[`${type}Amount`].value || 0), dueDate: form[`${type}Due`].value, optional: form[`${type}Optional`].checked })).filter((item) => item.amount > 0);
      const result = await apiPost("/api/admin/fee-structure", { course: form.course.value, semester: form.semester.value, items, sendReminders: form.sendReminders.checked });
      root.querySelector("[data-fee-structure-status]").textContent = `Applied to ${result.appliedCount || 0} students. Reminders: ${result.remindersSent || 0}.`;
    });
  }

  function renderTimetableBuilder(root) {
    const cards = [["DBMS", "Prof. Sameer Rao", "CSE", "#2563eb"], ["AI", "Prof. Neha Kulkarni", "AI&ML", "#14804a"], ["Maths", "Prof. Amit Kale", "Common", "#996a00"], ["CN", "Prof. Riya Shah", "CSE", "#c73737"]];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    root.innerHTML = `<div class="grid two-col"><section class="panel"><h2>Subject + teacher cards</h2><div class="drag-card-list">${cards.map(([subject, teacher, course, color]) => `<div class="drag-card" draggable="true" data-subject="${subject}" data-teacher="${teacher}" data-course="${course}" data-color="${color}" style="border-left-color:${color}"><strong>${subject}</strong><span>${teacher}</span><small>${course}</small></div>`).join("")}</div></section>
      <section class="panel"><h2>Class view</h2><div class="toolbar" style="grid-template-columns:repeat(2,minmax(0,1fr))">${field("Course", "ttCourse", "select", true, ["CSE", "AI&ML", "ECE"])}${field("Semester", "ttSemester", "select", true, ["2", "4", "6"])}</div><button data-save-timetable>Save Timetable</button><p class="error" data-timetable-error></p></section></div>
      <section class="panel" style="margin-top:16px"><h2>Weekly grid</h2><div class="timetable-grid" data-timetable-grid><div></div>${days.map((day) => `<strong>${day}</strong>`).join("")}${Array.from({ length: 8 }, (_, period) => `<strong>Period ${period + 1}</strong>${days.map((day) => `<div class="tt-cell" data-day="${day}" data-period="${period + 1}"></div>`).join("")}`).join("")}</div></section>`;
    let dragged = null;
    root.querySelectorAll(".drag-card").forEach((card) => card.addEventListener("dragstart", () => { dragged = card.dataset; }));
    root.querySelectorAll(".tt-cell").forEach((cell) => {
      cell.addEventListener("dragover", (event) => event.preventDefault());
      cell.addEventListener("drop", () => {
        if (!dragged) return;
        cell.innerHTML = `<div class="tt-assignment" style="background:${dragged.color}" data-subject="${dragged.subject}" data-teacher="${dragged.teacher}"><strong>${dragged.subject}</strong><span>${dragged.teacher}</span></div>`;
        showTimetableConflicts(root);
      });
    });
    root.querySelector("[data-save-timetable]").addEventListener("click", async () => {
      const cells = [...root.querySelectorAll(".tt-cell")].filter((cell) => cell.querySelector(".tt-assignment")).map((cell) => ({ day: cell.dataset.day, period: Number(cell.dataset.period), subject: cell.querySelector(".tt-assignment").dataset.subject, teacher: cell.querySelector(".tt-assignment").dataset.teacher, classId: `${root.querySelector("#ttCourse").value}-Sem-${root.querySelector("#ttSemester").value}` }));
      const conflicts = detectTimetableConflicts(cells);
      if (conflicts.length) return root.querySelector("[data-timetable-error]").textContent = `Conflict: ${conflicts[0]} is already assigned in that period.`;
      const result = await apiPost("/api/admin/timetable", { cells, conflicts });
      root.querySelector("[data-timetable-error]").textContent = "";
      openModal("Timetable saved", `<p>${result.savedCount || cells.length} periods saved.</p><button data-close-modal>Close</button>`);
    });
  }

  function renderExamManagement(root) {
    root.innerHTML = `<div class="grid two-col"><section class="panel"><h2>Create exam</h2><form class="module-form" data-exam-form>
      ${field("Exam Name", "name", "select", true, ["Mid Term", "Final", "Unit Test"])}${field("Start Date", "startDate", "input", true, null, "date")}${field("End Date", "endDate", "input", true, null, "date")}${field("Courses covered", "courses", "input", true)}
      <button type="submit">Create Exam</button><span class="muted" data-exam-status></span></form></section>
      <section class="panel"><h2>Build timetable</h2><div class="row-actions"><button data-add-exam-row>Add Row</button><button data-publish-exam>Publish Timetable</button></div></section></div>
      <section class="panel" style="margin-top:16px"><h2>Exam timetable</h2><div class="table-wrap"><table data-exam-table><thead><tr><th>Date</th><th>Subject</th><th>Time</th><th>Room</th><th>Invigilator</th></tr></thead><tbody>${examRow()}</tbody></table></div></section>`;
    let examId = "demo-exam-1";
    root.querySelector("[data-exam-form]").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const result = await apiPost("/api/admin/exams", { name: form.name.value, startDate: form.startDate.value, endDate: form.endDate.value, courses: form.courses.value.split(",").map((v) => v.trim()) });
      examId = result.exam?.id || result._id || examId;
      root.querySelector("[data-exam-status]").textContent = "Exam created.";
    });
    root.querySelector("[data-add-exam-row]").addEventListener("click", () => root.querySelector("[data-exam-table] tbody").insertAdjacentHTML("beforeend", examRow()));
    root.querySelector("[data-publish-exam]").addEventListener("click", async () => {
      const timetable = [...root.querySelectorAll("[data-exam-table] tbody tr")].map((row) => {
        const [date, subject, time, room, invigilator] = [...row.querySelectorAll("input")].map((input) => input.value);
        return { date, subject, time, room, invigilator };
      });
      await apiPost(`/api/admin/exams/${examId}/timetable`, { timetable, publish: true });
      openModal("Exam published", `<p>The timetable is now visible to students and parents.</p><button data-close-modal>Close</button>`);
    });
  }

  function renderReportsCenter(root) {
    root.innerHTML = `${kpiGrid([["Collected", "Rs 1.42 Cr"], ["Outstanding", "Rs 38.2 L"], ["Class Average", "78.4%"], ["Defaulters", "42"]])}
      <section class="panel" style="margin-top:16px"><div class="tabs">${["Attendance", "Marks", "Fee Collection", "Enrollment"].map((tab, i) => `<button class="tab-button ${i === 0 ? "active" : ""}" data-report-tab="${tab}">${tab}</button>`).join("")}</div><div data-report-panel></div></section>`;
    const render = (tab) => {
      const table = tab === "Attendance" ? previewTable(["Class", "Date Range", "Subject", "Present %"], [{ Class: "CSE Sem 4", "Date Range": "May 2026", Subject: "DBMS", "Present %": "88%" }])
        : tab === "Marks" ? previewTable(["Exam", "Course", "Topper", "Average"], [{ Exam: "Mid Term", Course: "CSE", Topper: "Vivaan Patil", Average: "82%" }])
        : tab === "Fee Collection" ? previewTable(["Month", "Collected", "Outstanding", "Defaulters"], [{ Month: "May", Collected: "Rs 18.4 L", Outstanding: "Rs 3.2 L", Defaulters: 42 }])
        : previewTable(["Course", "Semester", "Students", "YoY"], [{ Course: "CSE", Semester: 4, Students: 214, YoY: "+8%" }]);
      root.querySelector("[data-report-panel]").innerHTML = `<div class="toolbar" style="grid-template-columns:repeat(3,minmax(0,1fr))">${field("Class/Course", "class", "select", false, ["All", "CSE", "AI&ML", "ECE"])}${field("Date/Exam", "date", "input", false)}${field("Subject/Semester", "subject", "input", false)}</div><canvas data-report-chart height="160"></canvas><div class="row-actions" style="margin:12px 0"><button data-export-report="${tab}">Export CSV</button><button class="secondary" data-pdf-report="${tab}">Export PDF</button></div>${table}`;
      loadChartJs().then(() => new Chart(root.querySelector("[data-report-chart]"), { type: "bar", data: { labels: ["CSE", "AI&ML", "ECE", "EEE"], datasets: [{ label: tab, data: [88, 82, 76, 71], backgroundColor: ["#2563eb", "#14804a", "#996a00", "#c73737"] }] }, options: { responsive: true, plugins: { legend: { display: false } } } })).catch(() => {});
    };
    render("Attendance");
    root.querySelectorAll("[data-report-tab]").forEach((button) => button.addEventListener("click", () => {
      root.querySelectorAll("[data-report-tab]").forEach((b) => b.classList.remove("active"));
      button.classList.add("active");
      render(button.dataset.reportTab);
    }));
    root.addEventListener("click", (event) => {
      const csv = event.target.closest("[data-export-report]");
      const pdf = event.target.closest("[data-pdf-report]");
      if (csv) exportVisibleTable(`jgs-${csv.dataset.exportReport.toLowerCase().replace(/\s+/g, "-")}.csv`);
      if (pdf) downloadSimplePdf(`${pdf.dataset.pdfReport} Report`, "Generated by JGS Reports Center.");
    });
  }

  function renderPayroll(root) {
    root.innerHTML = `<div class="grid two-col"><section class="panel"><h2>Generate payslip</h2><form class="module-form" data-payroll-form>
      ${field("Teacher", "teacherName", "select", true, ["Prof. Sameer Rao", "Prof. Neha Kulkarni", "Prof. Amit Kale"])}${field("Month", "month", "input", true, null, "month")}${field("Base Salary", "baseSalary", "input", true, null, "number")}${field("Allowances", "allowances", "input", false, null, "number")}${field("Deductions", "deductions", "input", false, null, "number")}${field("Status", "status", "select", true, ["Pending", "Paid"])}
      <button type="submit">Save Payroll</button><button class="secondary" type="button" data-payslip-pdf>Download Payslip PDF</button></form></section><section class="panel"><h2>Payroll register</h2><div data-payroll-register>${previewTable(["Teacher", "Month", "Net Salary", "Status"], [{ Teacher: "Prof. Sameer Rao", Month: "May 2026", "Net Salary": "Rs 72,000", Status: "Paid" }])}</div></section></div>`;
    let latest = null;
    root.querySelector("[data-payroll-form]").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      latest = Object.fromEntries(new FormData(form).entries());
      latest.teacherId = latest.teacherName.replace(/\W+/g, "-").toLowerCase();
      latest.netSalary = Number(latest.baseSalary || 0) + Number(latest.allowances || 0) - Number(latest.deductions || 0);
      await apiPost("/api/admin/payroll", latest);
      root.querySelector("[data-payroll-register]").innerHTML = previewTable(["Teacher", "Month", "Net Salary", "Status"], [{ Teacher: latest.teacherName, Month: latest.month, "Net Salary": `Rs ${latest.netSalary.toLocaleString("en-IN")}`, Status: latest.status }]);
    });
    root.querySelector("[data-payslip-pdf]").addEventListener("click", () => downloadPayslipPdf(latest || { teacherName: "Prof. Sameer Rao", month: "May 2026", netSalary: 72000, status: "Paid" }));
  }

  function renderLibraryManagement(root) {
    root.innerHTML = `<div class="grid three-col"><section class="panel"><h2>Add book</h2><form class="module-form" data-book-form>${field("Title", "title", "input", true)}${field("Author", "author", "input", true)}${field("ISBN", "isbn", "input", true)}${field("Copies", "copies", "input", true, null, "number")}${field("Shelf", "shelf", "input", true)}<button type="submit">Add Book</button></form></section>
      <section class="panel"><h2>Issue book</h2><form class="module-form" data-issue-form>${field("Book ID / ISBN", "bookId", "input", true)}${field("Roll number", "rollNumber", "input", true)}${field("Due Date", "dueDate", "input", true, null, "date")}<button type="submit">Issue Book</button></form></section>
      <section class="panel"><h2>Return book</h2><form class="module-form" data-return-form>${field("Issue ID", "issueId", "input", true)}${field("Days Late", "daysLate", "input", false, null, "number")}<button type="submit">Return Book</button></form></section></div>
      <section class="panel" style="margin-top:16px"><h2>Library register</h2><div data-library-register>${previewTable(["Title", "ISBN", "Copies", "Shelf", "Status"], [{ Title: "Database Systems", ISBN: "978-93-0001", Copies: 8, Shelf: "CSE-A2", Status: "Available" }])}</div></section>`;
    root.querySelector("[data-book-form]").addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget).entries());
      await apiPost("/api/admin/library/books", data);
      root.querySelector("[data-library-register]").innerHTML = previewTable(["Title", "ISBN", "Copies", "Shelf", "Status"], [{ Title: data.title, ISBN: data.isbn, Copies: data.copies, Shelf: data.shelf, Status: "Available" }]);
    });
    root.querySelector("[data-issue-form]").addEventListener("submit", async (event) => { event.preventDefault(); await apiPost("/api/admin/library/issue", Object.fromEntries(new FormData(event.currentTarget).entries())); openModal("Book issued", `<p>The student library record is updated.</p><button data-close-modal>Close</button>`); });
    root.querySelector("[data-return-form]").addEventListener("submit", async (event) => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.currentTarget).entries()); const result = await apiPut(`/api/admin/library/return/${data.issueId}`, data); openModal("Book returned", `<p>Fine calculated: Rs ${result.fine || 0}.</p><button data-close-modal>Close</button>`); });
  }

  function renderHostelManagement(root) {
    root.innerHTML = `<div class="grid two-col"><section class="panel"><h2>Add room</h2><form class="module-form" data-room-form>${field("Room No", "roomNo", "input", true)}${field("Floor", "floor", "input", true)}${field("Capacity", "capacity", "input", true, null, "number")}${field("Type", "type", "select", true, ["Boys", "Girls", "Guest"])}<button type="submit">Add Room</button></form></section>
      <section class="panel"><h2>Assign student</h2><form class="module-form" data-hostel-assign-form>${field("Room ID / No", "roomId", "input", true)}${field("Roll number", "rollNumber", "input", true)}<label class="check"><input name="feeLinked" type="checkbox" checked> Link hostel fee to fee structure</label><button type="submit">Assign Room</button></form></section></div>
      <section class="panel" style="margin-top:16px"><h2>Room register</h2><div data-hostel-register>${previewTable(["Room", "Floor", "Capacity", "Type", "Occupied"], [{ Room: "B-204", Floor: "2", Capacity: 3, Type: "Boys", Occupied: 2 }])}</div></section>`;
    root.querySelector("[data-room-form]").addEventListener("submit", async (event) => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.currentTarget).entries());
      await apiPost("/api/admin/hostel/rooms", data);
      root.querySelector("[data-hostel-register]").innerHTML = previewTable(["Room", "Floor", "Capacity", "Type", "Occupied"], [{ Room: data.roomNo, Floor: data.floor, Capacity: data.capacity, Type: data.type, Occupied: 0 }]);
    });
    root.querySelector("[data-hostel-assign-form]").addEventListener("submit", async (event) => { event.preventDefault(); await apiPost("/api/admin/hostel/assign", Object.fromEntries(new FormData(event.currentTarget).entries())); openModal("Room assigned", `<p>The student can now see hostel room details in the student portal when that page is connected.</p><button data-close-modal>Close</button>`); });
  }

  function renderEventCalendar(root) {
    root.innerHTML = `<div class="grid two-col"><section class="panel"><h2>Create event</h2><form class="module-form" data-event-form>${field("Name", "name", "input", true)}${field("Date", "date", "input", true, null, "date")}${field("Time", "time", "input", true, null, "time")}${field("Venue", "venue", "input", true)}${field("Target", "target", "select", true, ["all", "students", "staff", "public"])}${field("Description", "description", "textarea", false, null, null, "wide")}<button type="submit">Create Event</button></form></section><section class="panel"><h2>Visibility</h2>${panelList("Published surfaces", ["Public events: Landing page", "Student events: Student dashboard", "Staff events: Teacher dashboard"])}</section></div>
      <section class="panel" style="margin-top:16px"><h2>Calendar</h2><div data-calendar class="calendar-shell"></div></section>`;
    const events = [{ title: "Orientation Day", start: "2026-06-12" }, { title: "Tech Fest", start: "2026-06-18" }];
    loadScriptOnce(config("fullCalendarUrl"), "FullCalendar").then(() => {
      const calendar = new FullCalendar.Calendar(root.querySelector("[data-calendar]"), { initialView: "dayGridMonth", height: 520, events });
      calendar.render();
      root.querySelector("[data-event-form]").addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget).entries());
        await apiPost("/api/admin/events", data);
        calendar.addEvent({ title: data.name, start: data.date });
        event.currentTarget.reset();
      });
    }).catch(() => {
      root.querySelector("[data-calendar]").innerHTML = previewTable(["Name", "Date", "Target"], [{ Name: "Orientation Day", Date: "12 Jun 2026", Target: "All" }]);
    });
  }

  async function renderAuditLog(root) {
    root.innerHTML = `<section class="panel"><div class="toolbar" style="grid-template-columns:repeat(4,minmax(0,1fr))">${field("Date", "auditDate", "input", false, null, "date")}${field("Role", "auditRole", "select", false, ["All", "admin", "teacher", "student", "parent"])}${field("Action", "auditAction", "input", false)}<button data-export-table="auditLog">Export CSV</button></div><div data-audit-log>Loading audit log...</div></section>`;
    let rows = [];
    try {
      rows = await api("/api/admin/audit-logs", { method: "GET" });
    } catch {
      rows = [
        { role: "admin", action: "Student created", targetId: "demo", ipAddress: "127.0.0.1", createdAt: new Date().toISOString() },
        { role: "admin", action: "Notice posted", targetId: "demo", ipAddress: "127.0.0.1", createdAt: new Date().toISOString() }
      ];
    }
    const renderRows = () => {
      const role = root.querySelector("#auditRole").value;
      const action = root.querySelector("#auditAction").value.toLowerCase();
      const date = root.querySelector("#auditDate").value;
      const filtered = rows.filter((item) => (role === "All" || item.role === role) && (!action || String(item.action).toLowerCase().includes(action)) && (!date || String(item.createdAt || "").startsWith(date)));
      root.querySelector("[data-audit-log]").innerHTML = `<div class="table-wrap"><table data-table="auditLog"><thead><tr><th>Time</th><th>Role</th><th>Action</th><th>Target</th><th>IP Address</th></tr></thead><tbody>${filtered.map((item) => `<tr><td>${new Date(item.createdAt).toLocaleString("en-IN")}</td><td>${escapeHtml(item.role || "")}</td><td>${escapeHtml(item.action || "")}</td><td>${escapeHtml(item.targetId || "")}</td><td>${escapeHtml(item.ipAddress || "")}</td></tr>`).join("")}</tbody></table></div>`;
      wireTables(root);
    };
    root.querySelectorAll("#auditDate,#auditRole,#auditAction").forEach((input) => input.addEventListener("input", renderRows));
    renderRows();
  }

  async function apiPost(path, payload) {
    return api(path, { method: "POST", body: JSON.stringify(payload) });
  }

  async function apiPut(path, payload) {
    return api(path, { method: "PUT", body: JSON.stringify(payload) });
  }

  async function api(path, options) {
    const backendUrl = config("backendUrl").replace(/\/$/, "");
    if (!backendUrl) return { demo: true };
    const headers = { "Content-Type": "application/json" };
    const token = localStorage.getItem("jgs_token");
    if (token) headers.Authorization = `Bearer ${token}`;
    try {
      const response = await fetch(`${backendUrl}${path}`, { ...options, headers });
      if (!response.ok) throw new Error(`API ${response.status}`);
      return response.json();
    } catch (error) {
      console.warn("Admin API unavailable; using demo response.", path, error);
      return { demo: true, successCount: 0, failedCount: 0, appliedCount: 0, remindersSent: 0, savedCount: 0, fine: 0 };
    }
  }

  function loadScriptOnce(src, globalName) {
    if (globalName && window[globalName]) return Promise.resolve();
    const existing = [...document.scripts].find((script) => script.src === src);
    if (existing) return new Promise((resolve) => existing.addEventListener("load", resolve, { once: true }));
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function previewTable(columns, rows) {
    const normalized = rows.length ? rows : [];
    return `<div class="table-wrap"><table><thead><tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr></thead><tbody>${normalized.map((row) => `<tr>${columns.map((column) => `<td>${escapeHtml(row[column] ?? row[column.replace(/\s+/g, "")] ?? row[column.toLowerCase()] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }

  function downloadText(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportVisibleTable(filename) {
    const table = document.querySelector("[data-report-panel] table") || document.querySelector("table");
    if (!table) return;
    const csv = [...table.querySelectorAll("tr")].map((row) => [...row.children].map((cell) => `"${cell.textContent.trim().replace(/"/g, '""')}"`).join(",")).join("\n");
    downloadText(filename, csv);
  }

  async function downloadSimplePdf(title, body) {
    await loadScriptOnce(config("jsPdfUrl"), "jspdf");
    const doc = new window.jspdf.jsPDF();
    doc.setFontSize(16);
    doc.text("JGS Group of Institutes", 18, 18);
    doc.setFontSize(13);
    doc.text(title, 18, 32);
    doc.setFontSize(11);
    doc.text(body, 18, 46);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 18, 58);
    doc.save(`jgs-${title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  }

  async function downloadPayslipPdf(payroll) {
    await loadScriptOnce(config("jsPdfUrl"), "jspdf");
    const doc = new window.jspdf.jsPDF();
    doc.setFontSize(18);
    doc.text("JGS Group of Institutes", 18, 20);
    doc.setFontSize(14);
    doc.text("Teacher Payslip", 18, 34);
    doc.setFontSize(11);
    doc.text(`Teacher: ${payroll.teacherName}`, 18, 52);
    doc.text(`Month: ${payroll.month}`, 18, 64);
    doc.text(`Net Salary: Rs ${Number(payroll.netSalary || 0).toLocaleString("en-IN")}`, 18, 76);
    doc.text(`Status: ${payroll.status}`, 18, 88);
    doc.setTextColor(20, 128, 74);
    doc.setFontSize(32);
    doc.text(String(payroll.status || "PENDING").toUpperCase(), 120, 82, { angle: -20 });
    doc.save(`jgs-payslip-${String(payroll.teacherName || "teacher").toLowerCase().replace(/\W+/g, "-")}.pdf`);
  }

  function examRow() {
    return `<tr><td><input type="date"></td><td><input placeholder="Subject"></td><td><input placeholder="10:00 AM - 12:00 PM"></td><td><input placeholder="Room"></td><td><input placeholder="Invigilator"></td></tr>`;
  }

  function detectTimetableConflicts(cells) {
    const seen = new Set();
    const conflicts = [];
    cells.forEach((cell) => {
      const key = `${cell.day}-${cell.period}-${cell.teacher}`;
      if (seen.has(key)) conflicts.push(cell.teacher);
      seen.add(key);
    });
    return conflicts;
  }

  function showTimetableConflicts(root) {
    const cells = [...root.querySelectorAll(".tt-cell")].filter((cell) => cell.querySelector(".tt-assignment")).map((cell) => ({ day: cell.dataset.day, period: Number(cell.dataset.period), teacher: cell.querySelector(".tt-assignment").dataset.teacher }));
    const conflicts = detectTimetableConflicts(cells);
    root.querySelector("[data-timetable-error]").textContent = conflicts.length ? `Conflict: ${conflicts[0]} has two classes at the same time.` : "";
  }

  function kpiGrid(items) {
    return `<div class="grid kpi-grid">${kpiCards(items)}</div>`;
  }

  function kpiCards(items) {
    return items.map(([label, value]) => `<section class="panel kpi"><span>${label}</span><strong>${value}</strong></section>`).join("");
  }

  function panelList(title, items) {
    return `<section class="panel"><h2>${title}</h2><div class="card-list">${items.map((item) => `<div class="notice-card">${item}</div>`).join("")}</div></section>`;
  }

  function recentActivity() {
    return [["NP", "Nisha Patil", "approved Sem 4 attendance lock", "10 min ago"], ["AK", "Amit Kale", "posted a department notice", "28 min ago"], ["RS", "Riya Shah", "generated 18 receipts", "1 hr ago"], ["MK", "Mohan K", "verified admission documents", "2 hr ago"], ["TD", "Tanvi Desai", "uploaded marks for ECE", "Today"]].map(([initials, name, action, time]) => `<div class="activity-row"><div class="avatar">${initials}</div><div><strong>${name}</strong><div class="muted">${action}</div></div><time class="muted">${time}</time></div>`).join("");
  }

  function progressList(items) {
    return items.map(([label, value]) => `<div class="progress-row"><strong>${label}</strong><div class="bar"><span style="width:${value}%"></span></div><span>${value}%</span></div>`).join("");
  }

  function tableSection(options) {
    const filters = options.filters.map(([label, values]) => `<div class="field"><label>${label}</label><select data-table-filter><option>${values.join("</option><option>")}</option></select></div>`).join("");
    return `<div class="toolbar">${filters}<div class="field"><label>Search</label><input data-table-search="${options.id}" placeholder="${options.search}"></div></div>
      <div class="table-tools"><strong data-row-count="${options.id}">${options.rows.length} rows</strong><button class="secondary" data-export-table="${options.id}">Export CSV</button><button class="secondary" type="button" onclick="window.print()">Print</button></div>
      <div class="table-wrap"><table data-table="${options.id}"><thead><tr>${options.columns.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${options.rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table><div class="empty-state" data-empty="${options.id}">${options.empty}</div></div>`;
  }

  function wireTables(root) {
    root.querySelectorAll("[data-table-search]").forEach((input) => {
      input.addEventListener("input", () => filterTable(input.dataset.tableSearch));
    });
    root.querySelectorAll("[data-table-filter]").forEach((select) => {
      select.addEventListener("change", () => {
        const table = root.querySelector("[data-table]");
        if (table) filterTable(table.dataset.table);
      });
    });
    root.querySelectorAll("[data-export-table]").forEach((button) => {
      button.addEventListener("click", () => exportTable(button.dataset.exportTable));
    });
  }

  function filterTable(id) {
    const table = document.querySelector(`[data-table="${id}"]`);
    const search = (document.querySelector(`[data-table-search="${id}"]`)?.value || "").toLowerCase();
    let visible = 0;
    table.querySelectorAll("tbody tr").forEach((row) => {
      const match = row.textContent.toLowerCase().includes(search);
      row.style.display = match ? "" : "none";
      if (match) visible += 1;
    });
    document.querySelector(`[data-row-count="${id}"]`).textContent = `${visible} rows`;
    document.querySelector(`[data-empty="${id}"]`).style.display = visible ? "none" : "block";
  }

  function exportTable(id) {
    const table = document.querySelector(`[data-table="${id}"]`);
    if (!table) return;
    const rows = [...table.querySelectorAll("tr")].filter((row) => row.style.display !== "none").map((row) => [...row.children].map((cell) => `"${cell.textContent.trim().replace(/"/g, '""')}"`).join(","));
    const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `jgs-${id}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function rowActions(labels) {
    return `<div class="row-actions">${labels.map((label) => `<button class="secondary" type="button" data-action="${label}">${label}</button>`).join("")}</div>`;
  }

  function approvalCards(rows) {
    if (!rows.length) return `<div class="empty-state" style="display:block">No approvals found for this tab.</div>`;
    return `<div class="card-list">${rows.map((item) => `<article class="approval-card"><div class="table-tools"><div><strong>${item.requester}</strong><div class="muted">${item.role} | ${item.type} | ${item.submitted}</div></div>${tag(item.type, item.tone)}</div><div class="muted">Step trail: ${item.trail}</div><div class="row-actions">${["Approve", "Reject", "Request Info", "Forward"].map((action) => `<button class="${action === "Reject" ? "danger" : "secondary"}" data-action="${action}">${action}</button>`).join("")}</div></article>`).join("")}</div>`;
  }

  function noticeCards(items, tone) {
    return `<div class="card-list">${items.map((item, i) => `<article class="notice-card"><div class="table-tools"><strong>${item}</strong>${tag(i === 0 ? "Pinned" : "Active", tone)}</div><span class="muted">Read count: ${118 + i * 37}</span></article>`).join("")}</div>`;
  }

  function studentTab(tab) {
    const content = {
      Academic: panelList("Academic info", ["Branch: CSE", "Semester: 4", "Mentor: Prof. S. Rao", "University enrollment: MU-25-4472"]),
      Attendance: `<h3>Attendance bars</h3>${progressList([["DBMS", 92], ["OS", 81], ["CN", 88], ["Maths-IV", 84]])}`,
      Fee: tableSection({ id: "profile-fee", filters: [], search: "Search fee", columns: ["Term", "Amount", "Due Date", "Paid On", "Status"], rows: [["Sem 3", "Rs 74,000", "10 Dec 2025", "8 Dec 2025", tag("Paid")], ["Sem 4", "Rs 74,000", "10 Jun 2026", "18 May 2026", tag("Paid")]], empty: "No fee history found." }),
      Documents: panelList("Documents", ["Hall Ticket", "Bonafide", "ID Card", "Transfer Certificate"])
    };
    return content[tab];
  }

  function field(label, name, type, required, options, inputType, className) {
    if (type === "select") return `<div class="field ${className || ""}"><label class="${required ? "required" : ""}" for="${name}">${label}</label><select id="${name}" name="${name}" ${required ? "required" : ""}>${options.map((o) => `<option>${o}</option>`).join("")}</select><div class="error"></div></div>`;
    if (type === "textarea") return `<div class="field ${className || ""}"><label class="${required ? "required" : ""}" for="${name}">${label}</label><textarea id="${name}" name="${name}" rows="5" ${required ? "required" : ""}></textarea><div class="error"></div></div>`;
    return `<div class="field ${className || ""}"><label class="${required ? "required" : ""}" for="${name}">${label}</label><input id="${name}" name="${name}" type="${inputType || "text"}" ${required ? "required" : ""}><div class="error"></div></div>`;
  }

  function loadChartJs() {
    if (window.Chart) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = config("chartJsUrl");
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function drawCharts(root) {
    const labels = ["CSE", "AI&ML", "ECE", "EEE", "Mechanical", "Civil"];
    root.querySelectorAll("[data-chart]").forEach((canvas, index) => {
      const doughnut = index === 2;
      new Chart(canvas, {
        type: doughnut ? "doughnut" : index % 2 ? "line" : "bar",
        data: { labels, datasets: [{ label: "JGS", data: [88, 82, 76, 79, 71, 68].map((v) => v - index * 3), backgroundColor: ["#2563eb", "#14804a", "#996a00", "#c73737", "#153a5f", "#64748b"], borderColor: "#2563eb", tension: 0.35 }] },
        options: { responsive: true, plugins: { legend: { display: doughnut } }, scales: doughnut ? {} : { y: { beginAtZero: true } } }
      });
    });
  }

  function drawChartFallback(root) {
    root.querySelectorAll("canvas").forEach((canvas) => {
      canvas.replaceWith(htmlToNode(`<div class="alert info">Chart.js could not be loaded. Static data is available in reports export.</div>`));
    });
  }

  function bindGlobalActions() {
    document.addEventListener("click", (event) => {
      const logout = event.target.closest("[data-logout]");
      const action = event.target.closest("[data-action]");
      const destructive = event.target.closest("[data-destructive]");
      const close = event.target.closest("[data-close-modal]");
      if (logout) doLogout();
      if (action) openModal(action.dataset.action, `<p>${escapeHtml(action.dataset.action)} is queued in demo mode. Configure backendUrl to call the matching admin API.</p><button data-close-modal>Close</button>`);
      if (destructive && confirm(`Confirm ${destructive.dataset.destructive}?`)) openModal("Confirmed", `<p>${destructive.dataset.destructive} completed in demo mode.</p><button data-close-modal>Close</button>`);
      if (close) closeModal();
    });
  }

  function doLogout() {
    Object.keys(localStorage).filter((key) => key.startsWith("jgs_")).forEach((key) => localStorage.removeItem(key));
    window.location.href = "admin-login.html";
  }

  function openModal(title, body) {
    const modal = document.querySelector("[data-modal]");
    const card = document.querySelector("[data-modal-card]");
    card.innerHTML = `<h2>${escapeHtml(title)}</h2>${body}`;
    modal.classList.add("open");
  }

  function closeModal() {
    document.querySelector("[data-modal]")?.classList.remove("open");
  }

  function avatar(name) {
    return `<span class="avatar" aria-hidden="true">${name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>`;
  }

  function tag(value, forcedTone) {
    const tone = forcedTone || (value === "Paid" || value === "Active" ? "success" : value === "Pending" ? "warning" : value === "Overdue" ? "danger" : "info");
    return `<span class="tag ${tone}">${value}</span>`;
  }

  function config(key) {
    return window.JGS_CONFIG?.[key] || "";
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
  }

  function htmlToNode(html) {
    const template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
