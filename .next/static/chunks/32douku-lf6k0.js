(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,27277,e=>{e.v({actions:"Result-module__kNt68q__actions",card:"Result-module__kNt68q__card",error:"Result-module__kNt68q__error",examNotes:"Result-module__kNt68q__examNotes",gradeScale:"Result-module__kNt68q__gradeScale",gradeScaleList:"Result-module__kNt68q__gradeScaleList",gradeScaleTitle:"Result-module__kNt68q__gradeScaleTitle",headSolo:"Result-module__kNt68q__headSolo",headText:"Result-module__kNt68q__headText",hint:"Result-module__kNt68q__hint",institute:"Result-module__kNt68q__institute",logoLarge:"Result-module__kNt68q__logoLarge",logoTop:"Result-module__kNt68q__logoTop",meta:"Result-module__kNt68q__meta",metaGrid:"Result-module__kNt68q__metaGrid",printBtn:"Result-module__kNt68q__printBtn",session:"Result-module__kNt68q__session",sheet:"Result-module__kNt68q__sheet",table:"Result-module__kNt68q__table",tableWrap:"Result-module__kNt68q__tableWrap",tagline:"Result-module__kNt68q__tagline",title:"Result-module__kNt68q__title",totalRow:"Result-module__kNt68q__totalRow",wrapper:"Result-module__kNt68q__wrapper"})},38519,e=>{"use strict";var t=e.i(43476),a=e.i(71645),s=e.i(18566),l=e.i(74206),d=e.i(27277);function r(e){return null==e?"—":String(e)}function i(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function n(e){return null==e||Number.isNaN(e)?"—":e>=90?"A+ (Excellent / Outstanding)":e>=80?"A (Very Good)":e>=70?"B+ (Good)":e>=60?"B (Above Average)":e>=50?"C (Average / Pass)":e>=40?"D (Pass / Minimum)":"F (Fail)"}let o=`The student's academic performance is evaluated through Internal and End Semester examinations as follows:

ISE I (Internal Semester Examination I) – Conducted in Semester I
ISE II (Internal Semester Examination II) – Conducted in Semester II
ESE (End Semester Examination) – Conducted once at the end of the academic year`,c=["90% – 100% → A+ (Excellent / Outstanding)","80% – 89% → A (Very Good)","70% – 79% → B+ (Good)","60% – 69% → B (Above Average)","50% – 59% → C (Average / Pass)","40% – 49% → D (Pass / Minimum)","Below 40% → F (Fail)"];e.s(["default",0,function(){let e=(0,s.useRouter)(),[u,m]=(0,a.useState)(!0),[h,x]=(0,a.useState)(null),[p,g]=(0,a.useState)(null);return(0,a.useEffect)(()=>{let t=sessionStorage.getItem("studentId");t?(async()=>{try{let e=await fetch(`/api/examination/result?studentId=${encodeURIComponent(t)}`,{cache:"no-store"}),a=await e.json();e.ok&&a.success?g(a):x(a.error||"Failed to load result.")}catch{x("Failed to load result.")}finally{m(!1)}})():e.push("/student/login")},[e]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("header",{className:l.default.header,children:(0,t.jsx)("div",{className:l.default.headerLeft,children:(0,t.jsx)("h1",{className:l.default.headerTitle,children:"Result"})})}),(0,t.jsx)("main",{className:l.default.contentArea,children:(0,t.jsx)("div",{className:d.default.wrapper,children:(0,t.jsxs)("div",{className:d.default.card,children:[u&&(0,t.jsx)("p",{children:"Loading..."}),!u&&h&&(0,t.jsx)("p",{className:d.default.error,children:h}),!u&&!h&&p?.student&&p?.marks&&p?.maxMarks&&p?.total&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:d.default.sheet,children:[(0,t.jsx)("div",{className:d.default.logoTop,children:(0,t.jsx)("img",{src:"/letterhead-logo.png",alt:"Institute Logo",className:d.default.logoLarge})}),(0,t.jsx)("div",{className:d.default.headSolo,children:(0,t.jsxs)("div",{className:d.default.headText,children:[(0,t.jsx)("p",{className:d.default.institute,children:"Swargumphan Music Institute"}),(0,t.jsx)("p",{className:d.default.tagline,children:"Begin your musical journey with us"})]})}),(0,t.jsx)("h2",{className:d.default.title,children:"Student Result Sheet"}),(0,t.jsx)("p",{className:d.default.session,children:"Academic Session: April/May 2025-26"}),(0,t.jsxs)("div",{className:d.default.metaGrid,children:[(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Name:"})," ",p.student.fullName]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Admission ID:"})," ",p.student.admissionId]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Diploma Year:"})," ",p.student.diplomaYear||"—"]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Music Preference:"})," ",p.student.musicPreference||"—"]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Form No:"})," ",p.student.formNo||"—"]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Seat No:"})," ",p.student.seatNo||"—"]}),(0,t.jsxs)("p",{children:[(0,t.jsx)("strong",{children:"Branch:"})," ",p.student.branch||"—"]})]}),!p.resultReady&&(0,t.jsx)("p",{className:d.default.hint,children:"Result is not complete yet. ISE I, ISE II and ESE all must be submitted."}),(0,t.jsx)("div",{className:d.default.tableWrap,children:(0,t.jsxs)("table",{className:d.default.table,children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Exam"}),(0,t.jsx)("th",{children:"Obtained"}),(0,t.jsx)("th",{children:"Maximum"})]})}),(0,t.jsxs)("tbody",{children:[(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:"ISE I"}),(0,t.jsx)("td",{children:r(p.marks.ISE_I)}),(0,t.jsx)("td",{children:p.maxMarks.ISE_I})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:"ISE II"}),(0,t.jsx)("td",{children:r(p.marks.ISE_II)}),(0,t.jsx)("td",{children:p.maxMarks.ISE_II})]}),(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{children:"ESE"}),(0,t.jsx)("td",{children:r(p.marks.ESE)}),(0,t.jsx)("td",{children:p.maxMarks.ESE})]}),(0,t.jsxs)("tr",{className:d.default.totalRow,children:[(0,t.jsx)("td",{children:"Total (ISE I + ISE II + ESE)"}),(0,t.jsx)("td",{children:r(p.total.obtained)}),(0,t.jsx)("td",{children:p.total.max})]}),(0,t.jsxs)("tr",{className:d.default.totalRow,children:[(0,t.jsx)("td",{children:"Percentage"}),(0,t.jsx)("td",{colSpan:2,children:null==p.total.percentage?"—":`${p.total.percentage}%`})]}),(0,t.jsxs)("tr",{className:d.default.totalRow,children:[(0,t.jsx)("td",{children:"Grade"}),(0,t.jsx)("td",{colSpan:2,children:n(p.total.percentage)})]})]})]})}),(0,t.jsxs)("div",{className:d.default.gradeScale,children:[(0,t.jsx)("p",{className:d.default.gradeScaleTitle,children:"Grading scale (reference)"}),(0,t.jsx)("ul",{className:d.default.gradeScaleList,children:c.map(e=>(0,t.jsx)("li",{children:e},e))})]}),(0,t.jsx)("p",{className:d.default.examNotes,children:o})]}),(0,t.jsx)("div",{className:d.default.actions,children:(0,t.jsx)("button",{type:"button",className:d.default.printBtn,onClick:()=>{if(!p?.student||!p?.marks||!p?.maxMarks||!p?.total)return;let e=window.open("","_blank");if(!e)return;let t=`${window.location.origin}/letterhead-logo.png`,a=i(p.student.fullName||""),s=i(p.student.branch||"—"),l=i(String(p.student.admissionId||"")),d=i(p.student.diplomaYear||"—"),u=i(p.student.musicPreference||"—"),m=i(n(p.total.percentage)),h=c.map(e=>`<div>${i(e)}</div>`).join(""),x=i(o).replace(/\n/g,"<br/>");e.document.write(`
<!DOCTYPE html>
<html>
<head>
  <title>Result - ${p.student.fullName}</title>
  <style>
    body { font-family: 'Times New Roman', serif; margin: 20px; color: #111827; }
    .sheet { border: 2px solid #7f1d1d; padding: 16px; }
    .logoTop { text-align: center; margin-bottom: 12px; }
    .logoTop .logo { width: 132px; height: 132px; object-fit: contain; }
    .headSolo { display: flex; align-items: center; justify-content: center; border-bottom: 2px solid #7f1d1d; padding-bottom: 10px; }
    .headText { text-align: center; width: 100%; }
    .inst { font-size: 31px; font-weight: 700; color: #b91c1c; line-height: 1.05; }
    .tag { font-size: 16px; font-weight: 600; margin-top: 4px; }
    .title { margin: 14px 0 8px; text-align: center; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .sub { text-align: center; margin: 0 0 12px; font-size: 13px; font-weight: 600; color: #4b5563; }
    .meta { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
    .meta td { border: 1px solid #d1d5db; padding: 7px; font-size: 13px; }
    .meta .k { font-weight: 700; width: 18%; background: #f9fafb; }
    .result { width: 100%; border-collapse: collapse; margin-top: 6px; }
    .result th, .result td { border: 1px solid #9ca3af; padding: 8px; font-size: 14px; text-align: center; }
    .result th { background: #f3f4f6; font-weight: 700; }
    .result td:first-child, .result th:first-child { text-align: left; }
    .total { font-weight: 700; background: #fef3c7; }
    .gradeScale { margin-top: 12px; font-size: 11px; color: #4b5563; line-height: 1.4; }
    .gradeScaleTitle { font-weight: 700; margin-bottom: 4px; color: #374151; }
    .examNotes { margin-top: 12px; font-size: 12px; line-height: 1.45; color: #374151; }
    .footer { display: flex; justify-content: space-between; margin-top: 18px; font-size: 13px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="sheet">
  <div class="logoTop">
    <img class="logo" src="${t}" alt="Institute Logo" />
  </div>
  <div class="headSolo">
    <div class="headText">
      <div class="inst">Swargumphan Music Institute</div>
      <div class="tag">Begin your musical journey with us</div>
    </div>
  </div>
  <div class="title">STUDENT RESULT SHEET</div>
  <p class="sub">Academic Session: April/May 2025-26</p>
  <table class="meta">
    <tr>
      <td class="k">Name</td><td>${a}</td>
      <td class="k">Admission ID</td><td>${l}</td>
    </tr>
    <tr>
      <td class="k">Diploma Year</td><td>${d}</td>
      <td class="k">Music Preference</td><td>${u}</td>
    </tr>
    <tr>
      <td class="k">Form No</td><td>${i(p.student.formNo||"—")}</td>
      <td class="k">Seat No</td><td>${i(p.student.seatNo||"—")}</td>
    </tr>
    <tr>
      <td class="k">Branch</td><td colspan="3">${s}</td>
    </tr>
  </table>
  <table class="result">
    <thead>
      <tr><th>Exam</th><th>Obtained</th><th>Maximum</th></tr>
    </thead>
    <tbody>
      <tr><td>ISE I</td><td>${r(p.marks.ISE_I)}</td><td>${p.maxMarks.ISE_I}</td></tr>
      <tr><td>ISE II</td><td>${r(p.marks.ISE_II)}</td><td>${p.maxMarks.ISE_II}</td></tr>
      <tr><td>ESE</td><td>${r(p.marks.ESE)}</td><td>${p.maxMarks.ESE}</td></tr>
      <tr class="total">
        <td>Total (ISE I + ISE II + ESE)</td>
        <td>${r(p.total.obtained)}</td>
        <td>${p.total.max}</td>
      </tr>
      <tr class="total"><td>Percentage</td><td colspan="2">${null==p.total.percentage?"—":`${p.total.percentage}%`}</td></tr>
      <tr class="total"><td>Grade</td><td colspan="2">${m}</td></tr>
    </tbody>
  </table>
  <div class="gradeScale">
    <div class="gradeScaleTitle">Grading scale (reference)</div>
    ${h}
  </div>
  <div class="examNotes">${x}</div>
  <div class="footer">
    <span>Verified by Examination Cell</span>
    <span>Authorized Signature</span>
  </div>
  </div>
</body>
</html>`),e.document.close(),e.focus(),e.print()},children:"Print / Save PDF"})})]})]})})})]})}])}]);