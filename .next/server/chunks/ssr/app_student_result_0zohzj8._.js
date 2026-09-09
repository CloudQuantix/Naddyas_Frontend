module.exports=[19743,a=>{a.v({actions:"Result-module__kNt68q__actions",card:"Result-module__kNt68q__card",error:"Result-module__kNt68q__error",examNotes:"Result-module__kNt68q__examNotes",gradeScale:"Result-module__kNt68q__gradeScale",gradeScaleList:"Result-module__kNt68q__gradeScaleList",gradeScaleTitle:"Result-module__kNt68q__gradeScaleTitle",headSolo:"Result-module__kNt68q__headSolo",headText:"Result-module__kNt68q__headText",hint:"Result-module__kNt68q__hint",institute:"Result-module__kNt68q__institute",logoLarge:"Result-module__kNt68q__logoLarge",logoTop:"Result-module__kNt68q__logoTop",meta:"Result-module__kNt68q__meta",metaGrid:"Result-module__kNt68q__metaGrid",printBtn:"Result-module__kNt68q__printBtn",session:"Result-module__kNt68q__session",sheet:"Result-module__kNt68q__sheet",table:"Result-module__kNt68q__table",tableWrap:"Result-module__kNt68q__tableWrap",tagline:"Result-module__kNt68q__tagline",title:"Result-module__kNt68q__title",totalRow:"Result-module__kNt68q__totalRow",wrapper:"Result-module__kNt68q__wrapper"})},61238,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(92376),e=a.i(65244),f=a.i(19743);function g(a){return null==a?"—":String(a)}function h(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function i(a){return null==a||Number.isNaN(a)?"—":a>=90?"A+ (Excellent / Outstanding)":a>=80?"A (Very Good)":a>=70?"B+ (Good)":a>=60?"B (Above Average)":a>=50?"C (Average / Pass)":a>=40?"D (Pass / Minimum)":"F (Fail)"}let j=`The student's academic performance is evaluated through Internal and End Semester examinations as follows:

ISE I (Internal Semester Examination I) – Conducted in Semester I
ISE II (Internal Semester Examination II) – Conducted in Semester II
ESE (End Semester Examination) – Conducted once at the end of the academic year`,k=["90% – 100% → A+ (Excellent / Outstanding)","80% – 89% → A (Very Good)","70% – 79% → B+ (Good)","60% – 69% → B (Above Average)","50% – 59% → C (Average / Pass)","40% – 49% → D (Pass / Minimum)","Below 40% → F (Fail)"];a.s(["default",0,function(){let a=(0,d.useRouter)(),[l,m]=(0,c.useState)(!0),[n,o]=(0,c.useState)(null),[p,q]=(0,c.useState)(null);return(0,c.useEffect)(()=>{let b=sessionStorage.getItem("studentId");b?(async()=>{try{let a=await fetch(`/api/examination/result?studentId=${encodeURIComponent(b)}`,{cache:"no-store"}),c=await a.json();a.ok&&c.success?q(c):o(c.error||"Failed to load result.")}catch{o("Failed to load result.")}finally{m(!1)}})():a.push("/student/login")},[a]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("header",{className:e.default.header,children:(0,b.jsx)("div",{className:e.default.headerLeft,children:(0,b.jsx)("h1",{className:e.default.headerTitle,children:"Result"})})}),(0,b.jsx)("main",{className:e.default.contentArea,children:(0,b.jsx)("div",{className:f.default.wrapper,children:(0,b.jsxs)("div",{className:f.default.card,children:[l&&(0,b.jsx)("p",{children:"Loading..."}),!l&&n&&(0,b.jsx)("p",{className:f.default.error,children:n}),!l&&!n&&p?.student&&p?.marks&&p?.maxMarks&&p?.total&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("div",{className:f.default.sheet,children:[(0,b.jsx)("div",{className:f.default.logoTop,children:(0,b.jsx)("img",{src:"/letterhead-logo.png",alt:"Institute Logo",className:f.default.logoLarge})}),(0,b.jsx)("div",{className:f.default.headSolo,children:(0,b.jsxs)("div",{className:f.default.headText,children:[(0,b.jsx)("p",{className:f.default.institute,children:"Swargumphan Music Institute"}),(0,b.jsx)("p",{className:f.default.tagline,children:"Begin your musical journey with us"})]})}),(0,b.jsx)("h2",{className:f.default.title,children:"Student Result Sheet"}),(0,b.jsx)("p",{className:f.default.session,children:"Academic Session: April/May 2025-26"}),(0,b.jsxs)("div",{className:f.default.metaGrid,children:[(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Name:"})," ",p.student.fullName]}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Admission ID:"})," ",p.student.admissionId]}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Diploma Year:"})," ",p.student.diplomaYear||"—"]}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Music Preference:"})," ",p.student.musicPreference||"—"]}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Form No:"})," ",p.student.formNo||"—"]}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Seat No:"})," ",p.student.seatNo||"—"]}),(0,b.jsxs)("p",{children:[(0,b.jsx)("strong",{children:"Branch:"})," ",p.student.branch||"—"]})]}),!p.resultReady&&(0,b.jsx)("p",{className:f.default.hint,children:"Result is not complete yet. ISE I, ISE II and ESE all must be submitted."}),(0,b.jsx)("div",{className:f.default.tableWrap,children:(0,b.jsxs)("table",{className:f.default.table,children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{children:"Exam"}),(0,b.jsx)("th",{children:"Obtained"}),(0,b.jsx)("th",{children:"Maximum"})]})}),(0,b.jsxs)("tbody",{children:[(0,b.jsxs)("tr",{children:[(0,b.jsx)("td",{children:"ISE I"}),(0,b.jsx)("td",{children:g(p.marks.ISE_I)}),(0,b.jsx)("td",{children:p.maxMarks.ISE_I})]}),(0,b.jsxs)("tr",{children:[(0,b.jsx)("td",{children:"ISE II"}),(0,b.jsx)("td",{children:g(p.marks.ISE_II)}),(0,b.jsx)("td",{children:p.maxMarks.ISE_II})]}),(0,b.jsxs)("tr",{children:[(0,b.jsx)("td",{children:"ESE"}),(0,b.jsx)("td",{children:g(p.marks.ESE)}),(0,b.jsx)("td",{children:p.maxMarks.ESE})]}),(0,b.jsxs)("tr",{className:f.default.totalRow,children:[(0,b.jsx)("td",{children:"Total (ISE I + ISE II + ESE)"}),(0,b.jsx)("td",{children:g(p.total.obtained)}),(0,b.jsx)("td",{children:p.total.max})]}),(0,b.jsxs)("tr",{className:f.default.totalRow,children:[(0,b.jsx)("td",{children:"Percentage"}),(0,b.jsx)("td",{colSpan:2,children:null==p.total.percentage?"—":`${p.total.percentage}%`})]}),(0,b.jsxs)("tr",{className:f.default.totalRow,children:[(0,b.jsx)("td",{children:"Grade"}),(0,b.jsx)("td",{colSpan:2,children:i(p.total.percentage)})]})]})]})}),(0,b.jsxs)("div",{className:f.default.gradeScale,children:[(0,b.jsx)("p",{className:f.default.gradeScaleTitle,children:"Grading scale (reference)"}),(0,b.jsx)("ul",{className:f.default.gradeScaleList,children:k.map(a=>(0,b.jsx)("li",{children:a},a))})]}),(0,b.jsx)("p",{className:f.default.examNotes,children:j})]}),(0,b.jsx)("div",{className:f.default.actions,children:(0,b.jsx)("button",{type:"button",className:f.default.printBtn,onClick:()=>{if(!p?.student||!p?.marks||!p?.maxMarks||!p?.total)return;let a=window.open("","_blank");if(!a)return;let b=`${window.location.origin}/letterhead-logo.png`,c=h(p.student.fullName||""),d=h(p.student.branch||"—"),e=h(String(p.student.admissionId||"")),f=h(p.student.diplomaYear||"—"),l=h(p.student.musicPreference||"—"),m=h(i(p.total.percentage)),n=k.map(a=>`<div>${h(a)}</div>`).join(""),o=h(j).replace(/\n/g,"<br/>");a.document.write(`
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
    <img class="logo" src="${b}" alt="Institute Logo" />
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
      <td class="k">Name</td><td>${c}</td>
      <td class="k">Admission ID</td><td>${e}</td>
    </tr>
    <tr>
      <td class="k">Diploma Year</td><td>${f}</td>
      <td class="k">Music Preference</td><td>${l}</td>
    </tr>
    <tr>
      <td class="k">Form No</td><td>${h(p.student.formNo||"—")}</td>
      <td class="k">Seat No</td><td>${h(p.student.seatNo||"—")}</td>
    </tr>
    <tr>
      <td class="k">Branch</td><td colspan="3">${d}</td>
    </tr>
  </table>
  <table class="result">
    <thead>
      <tr><th>Exam</th><th>Obtained</th><th>Maximum</th></tr>
    </thead>
    <tbody>
      <tr><td>ISE I</td><td>${g(p.marks.ISE_I)}</td><td>${p.maxMarks.ISE_I}</td></tr>
      <tr><td>ISE II</td><td>${g(p.marks.ISE_II)}</td><td>${p.maxMarks.ISE_II}</td></tr>
      <tr><td>ESE</td><td>${g(p.marks.ESE)}</td><td>${p.maxMarks.ESE}</td></tr>
      <tr class="total">
        <td>Total (ISE I + ISE II + ESE)</td>
        <td>${g(p.total.obtained)}</td>
        <td>${p.total.max}</td>
      </tr>
      <tr class="total"><td>Percentage</td><td colspan="2">${null==p.total.percentage?"—":`${p.total.percentage}%`}</td></tr>
      <tr class="total"><td>Grade</td><td colspan="2">${m}</td></tr>
    </tbody>
  </table>
  <div class="gradeScale">
    <div class="gradeScaleTitle">Grading scale (reference)</div>
    ${n}
  </div>
  <div class="examNotes">${o}</div>
  <div class="footer">
    <span>Verified by Examination Cell</span>
    <span>Authorized Signature</span>
  </div>
  </div>
</body>
</html>`),a.document.close(),a.focus(),a.print()},children:"Print / Save PDF"})})]})]})})})]})}])}];

//# sourceMappingURL=app_student_result_0zohzj8._.js.map