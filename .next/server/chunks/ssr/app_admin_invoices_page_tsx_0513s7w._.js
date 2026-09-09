module.exports=[78337,a=>{"use strict";var b=a.i(87924),c=a.i(31626),d=a.i(72131),e=a.i(92376),f=a.i(88060),g=a.i(1374);function h(a){if(!a)return null;let b=String(a).trim(),c=/^(\d{4})-(\d{2})-(\d{2})/.exec(b);if(c)return{y:Number(c[1]),m:Number(c[2]),d:Number(c[3])};let d=new Date(b);return Number.isNaN(d.getTime())?null:{y:d.getFullYear(),m:d.getMonth()+1,d:d.getDate()}}function i(a){let b=h(a);return b?new Date(b.y,b.m-1,b.d).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"-"}a.s(["default",0,function(){let j=(0,e.useRouter)(),[k,l]=(0,d.useState)([]),[m,n]=(0,d.useState)([]),[o,p]=(0,d.useState)(!1),[q,r]=(0,d.useState)(!1),[s,t]=(0,d.useState)(!1),[u,v]=(0,d.useState)("all"),[w,x]=(0,d.useState)(""),[y,z]=(0,d.useState)("none"),[A,B]=(0,d.useState)("all"),[C,D]=(0,d.useState)("all");(0,d.useEffect)(()=>{let a=localStorage.getItem("adminRole"),b=localStorage.getItem("isRootAdmin"),c=localStorage.getItem("isBranchAdmin");"ROOT"===a||"true"===b?(r(!0),E("ROOT")):"BRANCH"===a||"true"===c?(t(!0),E("BRANCH",localStorage.getItem("adminBranch")||"")):j.push("/admin/login")},[j]);let E=async(a,b)=>{p(!0);try{let c=localStorage.getItem("adminId"),d=localStorage.getItem("adminUsername"),e=localStorage.getItem("adminBranch");console.log("[ADMIN INVOICES PAGE] Fetching invoices:",{role:a,branch:b||e,adminId:c,adminUsername:d});let f=await fetch("/api/admin/invoices",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({adminRole:a,adminBranch:b||e,adminId:c,adminUsername:d})});console.log("[ADMIN INVOICES PAGE] Response status:",f.status);let g=await f.json();console.log("[ADMIN INVOICES PAGE] Response data:",{success:g.success,count:g.data?.length||0,error:g.error}),g.success&&Array.isArray(g.data)?(console.log(`[ADMIN INVOICES PAGE] Successfully loaded ${g.data.length} invoices`),l(g.data),n(g.data)):(console.warn("[ADMIN INVOICES PAGE] No invoices found or invalid response:",g),g.error&&alert(`Failed to load invoices: ${g.error}`),l([]),n([]))}catch(a){console.error("[ADMIN INVOICES PAGE] Error fetching invoices:",a),alert(`Error loading invoices: ${a instanceof Error?a.message:"Unknown error"}`),l([]),n([])}finally{p(!1)}};(0,d.useEffect)(()=>{let a=[...k];if(q&&"all"!==u&&(a=a.filter(a=>a.branch===u)),w.trim()){let b=w.toLowerCase();a=a.filter(a=>a.fullName?.toLowerCase().includes(b)||a.transactionId?.toLowerCase().includes(b)||a.formNo?.toLowerCase().includes(b)||a.doNo?.toLowerCase().includes(b))}if("all"!==A&&(a=a.filter(a=>{let b=h(a.paidDate);return!!b&&String(b.m).padStart(2,"0")===A})),"all"!==C&&(a=a.filter(a=>{let b=h(a.paidDate);return!!b&&String(b.y)===C})),"none"!==y){let b={};a.forEach(a=>{let c=a.branch||"Unknown";b[c]||(b[c]=[]),b[c].push(a)}),Object.keys(b).forEach(a=>{b[a].sort((a,b)=>{let c=a.formNo||"",d=b.formNo||"";return"asc"===y?c.localeCompare(d,void 0,{numeric:!0,sensitivity:"base"}):d.localeCompare(c,void 0,{numeric:!0,sensitivity:"base"})})}),a=Object.values(b).flat()}n(a)},[u,w,k,q,y,A,C]);let F=async(a,b)=>{if(window.confirm(`Delete this invoice (₹ payment) for ${b}? This cannot be undone.`))try{let b=localStorage.getItem("adminId"),c=localStorage.getItem("adminUsername"),d=localStorage.getItem("adminRole"),e=localStorage.getItem("adminBranch"),f=await fetch(`/api/admin/invoices/${a}`,{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({adminId:b,adminUsername:c,adminRole:d||"ROOT",adminBranch:e})}),g=await f.json();f.ok&&g.success?(l(b=>b.filter(b=>b.donationId!==a)),n(b=>b.filter(b=>b.donationId!==a))):alert(g.error||"Failed to delete invoice")}catch(a){console.error("Error deleting invoice:",a),alert("Failed to delete invoice")}},G=async()=>{if(0===m.length)return void alert("No invoices to download");try{let b;try{let c=await a.A(52143);b=c.default||c,"function"!=typeof b&&c.default&&(b=c.default)}catch(a){console.error("Failed to import jsPDF:",a),alert("PDF library not found. Please run: npm install jspdf");return}if(!b||"function"!=typeof b){console.error("jsPDF is not a constructor:",b),alert("PDF library initialization failed. Please ensure jspdf is installed.");return}let c=new b("landscape","mm","a4"),d=c.internal.pageSize.getWidth(),e=c.internal.pageSize.getHeight(),f=30,g=[25,25,30,45,25,30,50,30,25],h=g.reduce((a,b)=>a+b,0),j=(d-h)/2;c.setFontSize(18),c.setTextColor(139,0,0),c.text("Swargumphan Sangeet Vidyalaya",d/2,15,{align:"center"}),c.setFontSize(12),c.setTextColor(0,0,0),c.text("Student Invoices Report",d/2,22,{align:"center"});let k=`Total Records: ${m.length}`;"all"!==u&&(k+=` | Branch: ${u}`),"all"!==A&&(k+=` | Month: ${M[A]}`),"all"!==C&&(k+=` | Year: ${C}`),"none"!==y&&(k+=` | Form No: ${"asc"===y?"Ascending":"Descending"}`),c.setFontSize(9),c.text(k,d/2,27,{align:"center"}),c.setFontSize(8),c.setFont(void 0,"bold"),c.setTextColor(255,255,255),c.setFillColor(139,0,0);let l=j,n=["Form No","DO No","Branch","Student Name","Amount","Date","Transaction ID","Payment Type","ID"];n.forEach((a,b)=>{c.rect(l,f-5,g[b],8,"F"),c.text(a,l+g[b]/2,f-1,{align:"center"}),l+=g[b]}),f+=8,c.setFont(void 0,"normal"),c.setTextColor(0,0,0);let o=0;m.forEach((a,b)=>{f+8>e-10&&(c.addPage(),f=30,c.setFont(void 0,"bold"),c.setTextColor(255,255,255),c.setFillColor(139,0,0),l=j,n.forEach((a,b)=>{c.rect(l,f-5,g[b],8,"F"),c.text(a,l+g[b]/2,f-1,{align:"center"}),l+=g[b]}),f+=8,c.setFont(void 0,"normal"),c.setTextColor(0,0,0)),o%2==0&&(c.setFillColor(245,245,245),c.rect(j,f-5,h,8,"F")),l=j,c.setFontSize(7),c.text(a.formNo||"-",l+2,f-1),l+=g[0],c.text(a.doNo||"-",l+2,f-1),l+=g[1],c.text(a.branch||"-",l+2,f-1),l+=g[2];let d=a.fullName||"-";c.text(d.length>20?d.substring(0,17)+"...":d,l+2,f-1),l+=g[3],c.text(`₹${a.amountPaid?.toLocaleString()||"0"}`,l+2,f-1),l+=g[4];let k=i(a.paidDate);c.text(k,l+2,f-1),l+=g[5];let m=a.transactionId||"-";c.text(m.length>15?m.substring(0,12)+"...":m,l+2,f-1),l+=g[6],c.text(a.paymentType||"-",l+2,f-1),l+=g[7],c.text(a.donationId.toString(),l+2,f-1),l+=g[8],f+=8,o++});let p=c.internal.pages.length-1;for(let a=1;a<=p;a++)c.setPage(a),c.setFontSize(8),c.setTextColor(128,128,128),c.text(`Page ${a} of ${p} | Generated on ${new Date().toLocaleString("en-IN")}`,d/2,e-5,{align:"center"});let q="Student_Invoices";"all"!==u&&(q+=`_${u.replace(/\s+/g,"_")}`),"all"!==A&&(q+=`_${M[A]}`),"all"!==C&&(q+=`_${C}`),q+=`_${new Date().toISOString().split("T")[0]}.pdf`,c.save(q)}catch(b){if(console.error("Error generating PDF:",b),console.error("Error details:",{message:b?.message,stack:b?.stack,name:b?.name}),(b?.message?.includes("jspdf")||b?.message?.includes("Cannot find module"))&&window.confirm("PDF library not installed. Would you like to use browser print instead?\n\nTo enable PDF download, please run: npm install jspdf\n\nClick OK to print the filtered invoices, or Cancel to dismiss."))return void H();let a=b?.message||"Unknown error";alert(`Failed to generate PDF: ${a}

Please check:
1. Run: npm install jspdf
2. Check browser console (F12) for details`)}},H=()=>{let a=window.open("","_blank");if(!a)return void alert("Please allow popups to use print functionality");let b=`Total Records: ${m.length}`;"all"!==u&&(b+=` | Branch: ${u}`),"all"!==A&&(b+=` | Month: ${({"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June","07":"July","08":"August","09":"September",10:"October",11:"November",12:"December"})[A]}`),"all"!==C&&(b+=` | Year: ${C}`),"none"!==y&&(b+=` | Form No: ${"asc"===y?"Ascending":"Descending"}`),a.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Student Invoices Report</title>
                <style>
                    @media print {
                        @page { margin: 10mm; size: A4 landscape; }
                        body { margin: 0; padding: 0; }
                        .no-print { display: none; }
                    }
                    body {
                        font-family: Arial, sans-serif;
                        padding: 10px;
                        font-size: 10px;
                    }
                    h1 {
                        color: #8b0000;
                        text-align: center;
                        margin: 10px 0;
                        font-size: 18px;
                    }
                    h2 {
                        text-align: center;
                        margin: 5px 0;
                        font-size: 14px;
                        color: #333;
                    }
                    .filter-info {
                        text-align: center;
                        margin: 10px 0;
                        font-size: 9px;
                        color: #666;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                        font-size: 9px;
                    }
                    th {
                        background: #8b0000;
                        color: white;
                        padding: 8px 4px;
                        text-align: left;
                        font-weight: bold;
                        border: 1px solid #666;
                    }
                    td {
                        padding: 6px 4px;
                        border: 1px solid #ddd;
                    }
                    tr:nth-child(even) {
                        background: #f5f5f5;
                    }
                    .amount {
                        text-align: right;
                        font-weight: bold;
                        color: #10b981;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                        font-size: 8px;
                        color: #999;
                        border-top: 1px solid #ddd;
                        padding-top: 10px;
                    }
                    .no-print {
                        text-align: center;
                        margin: 20px;
                    }
                    .no-print button {
                        padding: 10px 20px;
                        background: #8b0000;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 14px;
                        cursor: pointer;
                        margin: 0 10px;
                    }
                </style>
            </head>
            <body>
                <h1>Swargumphan Sangeet Vidyalaya</h1>
                <h2>Student Invoices Report</h2>
                <div class="filter-info">${b}</div>
                <table>
                    <thead>
                        <tr>
                            <th>Form No</th>
                            <th>DO No</th>
                            <th>Branch</th>
                            <th>Student Name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Transaction ID</th>
                            <th>Payment Type</th>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${m.map(a=>`
                            <tr>
                                <td>${a.formNo||"-"}</td>
                                <td>${a.doNo||"-"}</td>
                                <td>${a.branch||"-"}</td>
                                <td>${a.fullName||"-"}</td>
                                <td class="amount">₹${a.amountPaid?.toLocaleString()||"0"}</td>
                                <td>${i(a.paidDate)}</td>
                                <td>${a.transactionId||"-"}</td>
                                <td>${a.paymentType||"-"}</td>
                                <td>${a.donationId}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div class="footer">
                    Generated on ${new Date().toLocaleString("en-IN")}
                </div>
                <div class="no-print">
                    <button onclick="window.print()">🖨️ Print / Save as PDF</button>
                    <button onclick="window.close()">Close</button>
                </div>
                <script>
                    window.onload = function() {
                        // Auto-print after a short delay
                        setTimeout(() => {
                            window.print();
                        }, 500);
                    }
                </script>
            </body>
            </html>
        `),a.document.close()},I=q?Array.from(new Set(k.map(a=>a.branch))).sort():[],J=s?localStorage.getItem("adminBranch"):null,K=Array.from(new Set(k.filter(a=>a.paidDate).map(a=>{let b=h(a.paidDate);return b?String(b.m).padStart(2,"0"):""}).filter(Boolean))).sort(),L=Array.from(new Set(k.filter(a=>a.paidDate).map(a=>{let b=h(a.paidDate);return b?String(b.y):""}).filter(Boolean))).sort((a,b)=>parseInt(b,10)-parseInt(a,10)),M={"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June","07":"July","08":"August","09":"September",10:"October",11:"November",12:"December"},N=(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("a",{href:"/admin/dashboard",className:g.default.headerButton,children:"Dashboard"}),(0,b.jsx)("button",{onClick:()=>{localStorage.removeItem("isAdminLoggedIn"),localStorage.removeItem("isHeadAdminLoggedIn"),localStorage.removeItem("isBranchAdmin"),localStorage.removeItem("isRootAdmin"),localStorage.removeItem("adminRole"),localStorage.removeItem("adminId"),localStorage.removeItem("adminUsername"),localStorage.removeItem("adminBranch"),localStorage.removeItem("rootAdminUsername"),localStorage.removeItem("loggedInBranchId"),j.push("/admin/login")},className:g.default.logoutButton,children:"Logout"})]});return(0,b.jsxs)(f.default,{title:q?"Student Invoices":`${J} – Invoices`,headerActions:N,children:[(0,b.jsxs)("div",{style:{marginBottom:"30px"},className:"jsx-e5423b9474db0c26 "+(g.default.sectionCard||""),children:[(0,b.jsxs)("div",{className:"jsx-e5423b9474db0c26 "+(g.default.sectionHeader||""),children:[(0,b.jsx)("h2",{className:"jsx-e5423b9474db0c26",children:"Filters, Sort & Search"}),(0,b.jsx)("p",{className:"jsx-e5423b9474db0c26",children:"Filter, sort and search invoice records"})]}),(0,b.jsxs)("div",{className:"jsx-e5423b9474db0c26 "+(g.default.sectionBody||""),children:[(0,b.jsxs)("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"20px",alignItems:"end"},className:"jsx-e5423b9474db0c26",children:[q&&(0,b.jsxs)("div",{className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#374151",fontSize:"14px"},className:"jsx-e5423b9474db0c26",children:"Filter by Branch:"}),(0,b.jsxs)("select",{value:u,onChange:a=>v(a.target.value),style:{width:"100%",padding:"10px 14px",borderRadius:"6px",border:"1px solid #d1d5db",backgroundColor:"#fff",fontSize:"14px",color:"#111827",cursor:"pointer"},className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("option",{value:"all",className:"jsx-e5423b9474db0c26",children:"All Branches"}),I.map(a=>(0,b.jsx)("option",{value:a,className:"jsx-e5423b9474db0c26",children:a},a))]})]}),(0,b.jsxs)("div",{className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#374151",fontSize:"14px"},className:"jsx-e5423b9474db0c26",children:"Sort Form No:"}),(0,b.jsxs)("select",{value:y,onChange:a=>z(a.target.value),style:{width:"100%",padding:"10px 14px",borderRadius:"6px",border:"1px solid #d1d5db",backgroundColor:"#fff",fontSize:"14px",color:"#111827",cursor:"pointer"},className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("option",{value:"none",className:"jsx-e5423b9474db0c26",children:"No Sort"}),(0,b.jsx)("option",{value:"asc",className:"jsx-e5423b9474db0c26",children:"Ascending (A-Z, 1-9)"}),(0,b.jsx)("option",{value:"desc",className:"jsx-e5423b9474db0c26",children:"Descending (Z-A, 9-1)"})]})]}),(0,b.jsxs)("div",{className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#374151",fontSize:"14px"},className:"jsx-e5423b9474db0c26",children:"Filter by Month:"}),(0,b.jsxs)("select",{value:A,onChange:a=>B(a.target.value),style:{width:"100%",padding:"10px 14px",borderRadius:"6px",border:"1px solid #d1d5db",backgroundColor:"#fff",fontSize:"14px",color:"#111827",cursor:"pointer"},className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("option",{value:"all",className:"jsx-e5423b9474db0c26",children:"All Months"}),K.map(a=>(0,b.jsx)("option",{value:a,className:"jsx-e5423b9474db0c26",children:M[a]||a},a))]})]}),(0,b.jsxs)("div",{className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#374151",fontSize:"14px"},className:"jsx-e5423b9474db0c26",children:"Filter by Year:"}),(0,b.jsxs)("select",{value:C,onChange:a=>D(a.target.value),style:{width:"100%",padding:"10px 14px",borderRadius:"6px",border:"1px solid #d1d5db",backgroundColor:"#fff",fontSize:"14px",color:"#111827",cursor:"pointer"},className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("option",{value:"all",className:"jsx-e5423b9474db0c26",children:"All Years"}),L.map(a=>(0,b.jsx)("option",{value:a,className:"jsx-e5423b9474db0c26",children:a},a))]})]}),(0,b.jsxs)("div",{className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("label",{style:{display:"block",marginBottom:"8px",fontWeight:"500",color:"#374151",fontSize:"14px"},className:"jsx-e5423b9474db0c26",children:"Search:"}),(0,b.jsx)("input",{type:"text",placeholder:"Search by name, form no, or transaction ID",value:w,onChange:a=>x(a.target.value),style:{width:"100%",padding:"10px 14px",borderRadius:"6px",border:"1px solid #d1d5db",fontSize:"14px",color:"#111827"},className:"jsx-e5423b9474db0c26"})]})]}),(0,b.jsxs)("div",{style:{marginTop:"20px",display:"flex",gap:"12px",flexWrap:"wrap",alignItems:"center"},className:"jsx-e5423b9474db0c26",children:[m.length>0&&(0,b.jsxs)("button",{onClick:G,style:{padding:"10px 20px",background:"#10b981",color:"white",border:"none",borderRadius:"6px",fontSize:"14px",fontWeight:"600",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",boxShadow:"0 2px 4px rgba(0,0,0,0.1)"},title:"Download filtered invoices as PDF",className:"jsx-e5423b9474db0c26",children:["📄 Download PDF (",m.length," records)"]}),("none"!==y||"all"!==A||"all"!==C||"all"!==u||w)&&(0,b.jsx)("button",{onClick:()=>{z("none"),B("all"),D("all"),v("all"),x("")},style:{padding:"10px 20px",background:"#3b82f6",color:"white",border:"none",borderRadius:"6px",fontSize:"14px",fontWeight:"500",cursor:"pointer"},className:"jsx-e5423b9474db0c26",children:"Clear All Filters"})]})]})]}),(0,b.jsxs)("div",{className:"jsx-e5423b9474db0c26 "+(g.default.sectionCard||""),children:[(0,b.jsx)("div",{className:"jsx-e5423b9474db0c26 "+(g.default.sectionHeader||""),children:(0,b.jsx)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%"},className:"jsx-e5423b9474db0c26",children:(0,b.jsxs)("div",{className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("h2",{className:"jsx-e5423b9474db0c26",children:"All Student Invoices"}),(0,b.jsxs)("p",{className:"jsx-e5423b9474db0c26",children:["Fee payment records with Read and Delete (",m.length," records)"]})]})})}),(0,b.jsx)("div",{className:"jsx-e5423b9474db0c26 "+(g.default.sectionBody||""),children:o?(0,b.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6b7280"},className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("div",{style:{display:"inline-block",width:"40px",height:"40px",border:"4px solid #e5e7eb",borderTopColor:"#3b82f6",borderRadius:"50%",animation:"spin 1s linear infinite",marginBottom:"16px"},className:"jsx-e5423b9474db0c26"}),(0,b.jsx)("p",{style:{fontSize:"16px",fontWeight:"500"},className:"jsx-e5423b9474db0c26",children:"Loading invoices..."})]}):0===m.length?(0,b.jsxs)("div",{style:{textAlign:"center",padding:"60px 20px",color:"#6b7280"},className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("p",{style:{fontSize:"18px",marginBottom:"10px",fontWeight:"600"},className:"jsx-e5423b9474db0c26",children:"No invoice records found"}),(0,b.jsx)("p",{style:{marginBottom:"20px"},className:"jsx-e5423b9474db0c26",children:"Try adjusting filters or search"})]}):(0,b.jsx)("div",{className:"jsx-e5423b9474db0c26 "+(g.default.tableWrapper||""),children:(0,b.jsxs)("table",{className:"jsx-e5423b9474db0c26 "+(g.default.dataTable||""),children:[(0,b.jsx)("thead",{className:"jsx-e5423b9474db0c26",children:(0,b.jsxs)("tr",{className:"jsx-e5423b9474db0c26",children:[(0,b.jsxs)("th",{className:"jsx-e5423b9474db0c26",children:["Form No","none"!==y&&(0,b.jsx)("span",{style:{marginLeft:"5px",fontSize:"12px"},className:"jsx-e5423b9474db0c26",children:"asc"===y?"↑":"↓"})]}),(0,b.jsx)("th",{className:"jsx-e5423b9474db0c26",children:"DO No"}),(0,b.jsx)("th",{className:"jsx-e5423b9474db0c26",children:"Branch"}),(0,b.jsx)("th",{className:"jsx-e5423b9474db0c26",children:"Student Name"}),(0,b.jsx)("th",{className:"jsx-e5423b9474db0c26",children:"Amount"}),(0,b.jsx)("th",{className:"jsx-e5423b9474db0c26",children:"Date"}),(0,b.jsx)("th",{className:"jsx-e5423b9474db0c26",children:"Transaction ID"}),(0,b.jsx)("th",{className:"jsx-e5423b9474db0c26",children:"Payment Type"}),(0,b.jsx)("th",{className:"jsx-e5423b9474db0c26",children:"Actions"})]})}),(0,b.jsx)("tbody",{className:"jsx-e5423b9474db0c26",children:m.map(a=>(0,b.jsxs)("tr",{className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("td",{className:"jsx-e5423b9474db0c26",children:a.formNo||"-"}),(0,b.jsx)("td",{className:"jsx-e5423b9474db0c26",children:a.doNo||"-"}),(0,b.jsx)("td",{className:"jsx-e5423b9474db0c26",children:a.branch}),(0,b.jsx)("td",{style:{fontWeight:"600"},className:"jsx-e5423b9474db0c26",children:a.fullName}),(0,b.jsxs)("td",{style:{fontWeight:"600",color:"#10b981"},className:"jsx-e5423b9474db0c26",children:["₹",a.amountPaid?.toLocaleString()??"0"]}),(0,b.jsx)("td",{className:"jsx-e5423b9474db0c26",children:function(a){let b=h(a);if(!b)return"-";let c=String(b.d).padStart(2,"0"),d=String(b.m).padStart(2,"0"),e=b.y;return`${c}/${d}/${e}`}(a.paidDate)}),(0,b.jsx)("td",{style:{fontFamily:"monospace",fontSize:"0.85rem",color:"#6b7280"},className:"jsx-e5423b9474db0c26",children:a.transactionId||"-"}),(0,b.jsx)("td",{className:"jsx-e5423b9474db0c26",children:(0,b.jsx)("span",{className:"jsx-e5423b9474db0c26 "+(g.default.statusBadge||""),children:a.paymentType||"-"})}),(0,b.jsxs)("td",{className:"jsx-e5423b9474db0c26",children:[(0,b.jsx)("button",{type:"button",onClick:()=>{var b;return b=a.donationId,void window.open(`/invoice/transaction/${b}`,"_blank")},title:"View / Download Invoice",className:`jsx-e5423b9474db0c26 ${g.default.actionBtn} ${g.default.edit}`,children:"Read"}),(0,b.jsx)("button",{type:"button",onClick:()=>F(a.donationId,a.fullName),title:"Delete this payment record",className:`jsx-e5423b9474db0c26 ${g.default.actionBtn} ${g.default.delete}`,children:"Delete"})]})]},a.donationId))})]})})})]}),(0,b.jsx)(c.default,{id:"e5423b9474db0c26",children:"@keyframes spin{to{transform:rotate(360deg)}}"})]})}])}];

//# sourceMappingURL=app_admin_invoices_page_tsx_0513s7w._.js.map