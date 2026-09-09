(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,87647,e=>{e.v({actionBtn:"Expenses-module__azyqda__actionBtn",actionButtons:"Expenses-module__azyqda__actionButtons",actionsSection:"Expenses-module__azyqda__actionsSection",addButton:"Expenses-module__azyqda__addButton",amountCell:"Expenses-module__azyqda__amountCell",cancelButton:"Expenses-module__azyqda__cancelButton",cardAmount:"Expenses-module__azyqda__cardAmount",cardContent:"Expenses-module__azyqda__cardContent",cardIcon:"Expenses-module__azyqda__cardIcon",cardLabel:"Expenses-module__azyqda__cardLabel",cardSubtext:"Expenses-module__azyqda__cardSubtext",categoryTag:"Expenses-module__azyqda__categoryTag",clearFilters:"Expenses-module__azyqda__clearFilters",closeButton:"Expenses-module__azyqda__closeButton",descriptionCell:"Expenses-module__azyqda__descriptionCell",emptyState:"Expenses-module__azyqda__emptyState",expenseForm:"Expenses-module__azyqda__expenseForm",expensesContainer:"Expenses-module__azyqda__expensesContainer",expensesTable:"Expenses-module__azyqda__expensesTable",fileAttachment:"Expenses-module__azyqda__fileAttachment",fileInput:"Expenses-module__azyqda__fileInput",filterSelect:"Expenses-module__azyqda__filterSelect",filters:"Expenses-module__azyqda__filters",formActions:"Expenses-module__azyqda__formActions",formGroup:"Expenses-module__azyqda__formGroup",headerSection:"Expenses-module__azyqda__headerSection",imagePreview:"Expenses-module__azyqda__imagePreview",loading:"Expenses-module__azyqda__loading",modalContent:"Expenses-module__azyqda__modalContent",modalHeader:"Expenses-module__azyqda__modalHeader",modalOverlay:"Expenses-module__azyqda__modalOverlay",paid:"Expenses-module__azyqda__paid",pending:"Expenses-module__azyqda__pending",srNoCell:"Expenses-module__azyqda__srNoCell",statusTag:"Expenses-module__azyqda__statusTag",submitButton:"Expenses-module__azyqda__submitButton",summaryCard:"Expenses-module__azyqda__summaryCard",summaryCards:"Expenses-module__azyqda__summaryCards",tableHeader:"Expenses-module__azyqda__tableHeader",tableSection:"Expenses-module__azyqda__tableSection",tableWrapper:"Expenses-module__azyqda__tableWrapper"})},31571,e=>{"use strict";var t=e.i(43476),a=e.i(71645),n=e.i(24212),l=e.i(87647);function r({expense:e,onClose:n,onSuccess:s}){let[o,i]=(0,a.useState)({description:e?.description||"",amount:e?.amount||0,date:(e=>{if(!e)return new Date().toISOString().split("T")[0];try{let t=new Date(e);if(isNaN(t.getTime()))return new Date().toISOString().split("T")[0];let a=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),l=String(t.getDate()).padStart(2,"0");return`${a}-${n}-${l}`}catch(e){return console.error("Error formatting date:",e),new Date().toISOString().split("T")[0]}})(e?.date),category:e?.category||"Other",vendor:e?.vendor||"",status:e?.status||"pending",notes:e?.notes||"",billNo:e?.bill_no||"",image:null}),[d,c]=(0,a.useState)(()=>{if(!e?.image_url)return null;if(e.image_url.startsWith("http"))return e.image_url;let t=encodeURIComponent(e.image_url);return`/api/expenses/image?path=${t}`}),[u,p]=(0,a.useState)(null),[m,x]=(0,a.useState)(!1),[h,g]=(0,a.useState)(0),f=async t=>{if(t.preventDefault(),!o.description.trim())return void alert("Please enter a description");if(o.amount<=0)return void alert("Please enter a valid amount");if(!o.vendor.trim())return void alert("Please enter a vendor name");try{x(!0);let t=new FormData;t.append("description",o.description.trim());let a="number"!=typeof o.amount||isNaN(o.amount)?(o.amount||"0").toString():o.amount.toString();t.append("amount",a),t.append("date",o.date),t.append("category",o.category),t.append("vendor",o.vendor.trim()),t.append("status",o.status),t.append("notes",o.notes||""),t.append("billNo",o.billNo.trim()),o.image&&t.append("image",o.image);let n=e?`/api/expenses/${e.id}`:"/api/expenses",l=e?"PUT":"POST",r=await fetch(n,{method:l,body:t}),i=await r.json();if(i.success)p(null),s();else{let e=i.error||"Failed to save expense";p(e),alert(e)}}catch(t){let e=t instanceof Error?t.message:"Failed to save expense";console.error("Error saving expense:",t),p(e),alert(e)}finally{x(!1)}};return(0,t.jsx)("div",{className:l.default.modalOverlay,onClick:n,children:(0,t.jsxs)("div",{className:l.default.modalContent,onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:l.default.modalHeader,children:[(0,t.jsx)("h2",{children:e?"Edit Expense Bill":"Add New Expense Bill"}),(0,t.jsx)("button",{className:l.default.closeButton,onClick:n,children:"×"})]}),(0,t.jsxs)("form",{onSubmit:f,className:l.default.expenseForm,children:[u&&(0,t.jsx)("div",{className:l.default.errorMessage,style:{color:"red",padding:"10px",marginBottom:"15px",backgroundColor:"#ffe6e6",borderRadius:"4px"},children:u}),(0,t.jsx)("div",{className:l.default.formGroup,children:(0,t.jsxs)("label",{children:["Bill Image (Optional)",(0,t.jsx)("input",{type:"file",accept:"image/*",onChange:e=>{let t=e.target.files?.[0];if(t){i({...o,image:t});let e=new FileReader;e.onloadend=()=>{c(e.result)},e.readAsDataURL(t)}},className:l.default.fileInput},h),d&&(0,t.jsxs)("div",{className:l.default.imagePreview,children:[(0,t.jsx)("img",{src:d,alt:"Preview"}),(0,t.jsx)("button",{type:"button",onClick:()=>{c(null),i({...o,image:null}),g(e=>e+1)},children:"Remove"})]})]})}),(0,t.jsx)("div",{className:l.default.formGroup,children:(0,t.jsxs)("label",{children:["Description *",(0,t.jsx)("input",{type:"text",value:o.description,onChange:e=>i({...o,description:e.target.value}),placeholder:"Enter bill description",required:!0})]})}),(0,t.jsx)("div",{className:l.default.formGroup,children:(0,t.jsxs)("label",{children:["Amount *",(0,t.jsx)("input",{type:"number",step:"0.01",min:"0",value:o.amount||"",onChange:e=>{let t=e.target.value;if(""===t)i({...o,amount:0});else{let e=parseFloat(t);!isNaN(e)&&e>=0&&i({...o,amount:e})}},placeholder:"0.00",required:!0})]})}),(0,t.jsx)("div",{className:l.default.formGroup,children:(0,t.jsxs)("label",{children:["Date *",(0,t.jsx)("input",{type:"date",value:o.date,onChange:e=>i({...o,date:e.target.value}),required:!0})]})}),(0,t.jsx)("div",{className:l.default.formGroup,children:(0,t.jsxs)("label",{children:["Category",(0,t.jsx)("select",{value:o.category,onChange:e=>i({...o,category:e.target.value}),children:["Other","Utilities","Rent","Salary","Office Supplies","Marketing","Travel","Maintenance","Software","Hardware"].map(e=>(0,t.jsx)("option",{value:e,children:e},e))})]})}),(0,t.jsx)("div",{className:l.default.formGroup,children:(0,t.jsxs)("label",{children:["Vendor *",(0,t.jsx)("input",{type:"text",value:o.vendor,onChange:e=>i({...o,vendor:e.target.value}),placeholder:"Enter vendor name",required:!0})]})}),(0,t.jsx)("div",{className:l.default.formGroup,children:(0,t.jsxs)("label",{children:["Bill No",(0,t.jsx)("input",{type:"text",value:o.billNo,onChange:e=>i({...o,billNo:e.target.value}),placeholder:"Enter bill number"})]})}),(0,t.jsx)("div",{className:l.default.formGroup,children:(0,t.jsxs)("label",{children:["Status",(0,t.jsxs)("select",{value:o.status,onChange:e=>i({...o,status:e.target.value}),children:[(0,t.jsx)("option",{value:"pending",children:"Pending"}),(0,t.jsx)("option",{value:"paid",children:"Paid"})]})]})}),(0,t.jsx)("div",{className:l.default.formGroup,children:(0,t.jsxs)("label",{children:["Notes",(0,t.jsx)("textarea",{value:o.notes,onChange:e=>i({...o,notes:e.target.value}),placeholder:"Optional notes...",rows:3})]})}),(0,t.jsxs)("div",{className:l.default.formActions,children:[(0,t.jsx)("button",{type:"button",onClick:n,className:l.default.cancelButton,children:"Cancel"}),(0,t.jsx)("button",{type:"submit",className:l.default.submitButton,disabled:m,children:m?"Saving...":e?"Update Bill":"Create Bill"})]})]})]})})}e.s(["default",0,function(){let[e,s]=(0,a.useState)([]),[o,i]=(0,a.useState)([]),[d,c]=(0,a.useState)(!0),[u,p]=(0,a.useState)(!1),[m,x]=(0,a.useState)("all"),[h,g]=(0,a.useState)("all"),[f,b]=(0,a.useState)(""),[v,_]=(0,a.useState)("none"),[y,j]=(0,a.useState)(null),N=(0,a.useCallback)(async()=>{try{c(!0);let e=await fetch("/api/expenses");if(!e.ok)throw Error(`HTTP error! status: ${e.status}`);let t=await e.json();if(t.success){let e=(t.expenses||[]).map(e=>({...e,amount:"number"==typeof e.amount?e.amount:"string"==typeof e.amount&&parseFloat(e.amount)||0}));s(e)}else console.error("Failed to fetch expenses:",t.error),s([])}catch(e){console.error("Error fetching expenses:",e),s([])}finally{c(!1)}},[]),w=(0,a.useCallback)(()=>{try{if(!e||0===e.length)return void i([]);let t=[...e];if(f.trim()){let e=f.toLowerCase();t=t.filter(t=>t.description?.toLowerCase().includes(e)||t.vendor?.toLowerCase().includes(e)||t.bill_no?.toLowerCase().includes(e)||t.category?.toLowerCase().includes(e)||null!=t.sr_no&&String(t.sr_no).includes(e))}h&&"all"!==h&&(t=t.filter(e=>{if(!e||!e.date)return!1;try{let t=new Date(e.date);if(isNaN(t.getTime()))return!1;return t.getFullYear().toString()===h}catch(t){return console.error("Error parsing date for expense:",e?.id,t),!1}})),m&&"all"!==m&&(t=t.filter(e=>{if(!e||!e.date)return!1;try{let t=new Date(e.date);if(isNaN(t.getTime()))return!1;let a=(t.getMonth()+1).toString();return a===m||a===m.padStart(2,"0")}catch(t){return console.error("Error parsing date for expense:",e?.id,t),!1}})),"none"!==v&&t.sort((e,t)=>{let a=null!=e.sr_no?String(e.sr_no):e.bill_no||"",n=null!=t.sr_no?String(t.sr_no):t.bill_no||"";return"asc"===v?a.localeCompare(n,void 0,{numeric:!0,sensitivity:"base"}):n.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})}),i(t)}catch(t){console.error("Error in filterExpenses:",t),i(e||[])}},[e,m,h,f,v]);(0,a.useEffect)(()=>{N()},[N]),(0,a.useEffect)(()=>{w()},[w]);let S=async e=>{if(confirm("Are you sure you want to delete this expense bill?"))try{let t=await fetch(`/api/expenses/${e}`,{method:"DELETE"}),a=await t.json();a.success?N():alert(a.error||"Failed to delete expense")}catch(e){console.error("Error deleting expense:",e),alert("Failed to delete expense")}},C=async e=>{if(!e?.image_url)return void alert("No image available for this expense");try{let t=encodeURIComponent(e.image_url),a=`/api/expenses/image?path=${t}`;console.log("Downloading image via proxy:",a);let n=await fetch(a);if(!n.ok){let e=await n.json().catch(()=>({error:"Unknown error"}));throw Error(e.error||`HTTP error! status: ${n.status}`)}let l=await n.blob(),r=window.URL.createObjectURL(l),s=document.createElement("a");s.href=r,s.style.display="none";let o=e.image_url.split(".").pop()||"jpg";s.download=e.description?`${e.description.replace(/\s+/g,"_").replace(/[^a-zA-Z0-9_]/g,"")}.${o}`:`expense_${e.id||"image"}.${o}`,document.body.appendChild(s),s.click(),setTimeout(()=>{window.URL.revokeObjectURL(r),document.body.contains(s)&&document.body.removeChild(s)},100)}catch(t){console.error("Error downloading image:",t);let e=t instanceof Error?t.message:"Unknown error";alert(`Failed to download image: ${e}

Possible solutions:
1. Check if backend server is running
2. Verify BACKEND_URL in .env.local is correct
3. Ensure image file exists on server`)}},{total:E,paid:z,pending:A,paidCount:D,pendingCount:F}=(()=>{try{if(!o||!Array.isArray(o)||0===o.length)return{total:0,paid:0,pending:0,paidCount:0,pendingCount:0};let e=e=>{if(!e)return 0;let t=e.amount;if("number"==typeof t)return isNaN(t)?0:t;if("string"==typeof t){let e=parseFloat(t);return isNaN(e)?0:e}return 0},t=o.reduce((t,a)=>t+e(a),0),a=o.filter(e=>e&&"paid"===e.status).reduce((t,a)=>t+e(a),0),n=o.filter(e=>e&&"pending"===e.status).reduce((t,a)=>t+e(a),0);return{total:t,paid:a,pending:n,paidCount:o.filter(e=>e&&"paid"===e.status).length,pendingCount:o.filter(e=>e&&"pending"===e.status).length}}catch(e){return console.error("Error calculating totals:",e),{total:0,paid:0,pending:0,paidCount:0,pendingCount:0}}})(),$=new Date().getFullYear(),T=Array.from({length:6},(e,t)=>($-t).toString()),q={"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June","07":"July","08":"August","09":"September",10:"October",11:"November",12:"December"};return(0,t.jsxs)(n.default,{title:"Expense Bills Management",children:[(0,t.jsxs)("div",{className:l.default.expensesContainer,children:[(0,t.jsx)("div",{className:l.default.headerSection,children:(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{children:"Track and manage all your business expenses"}),(0,t.jsx)("p",{children:"Professional Data Center Services"})]})}),(0,t.jsxs)("div",{className:l.default.summaryCards,children:[(0,t.jsx)("div",{className:l.default.summaryCard,children:(0,t.jsxs)("div",{className:l.default.cardContent,children:[(0,t.jsx)("div",{className:l.default.cardLabel,children:"Total Expenses"}),(0,t.jsxs)("div",{className:l.default.cardAmount,children:["₹",E.toFixed(2)]}),(0,t.jsxs)("div",{className:l.default.cardSubtext,children:[o?.length||0," bills"]})]})}),(0,t.jsx)("div",{className:l.default.summaryCard,children:(0,t.jsxs)("div",{className:l.default.cardContent,children:[(0,t.jsx)("div",{className:l.default.cardLabel,children:"Paid Amount"}),(0,t.jsxs)("div",{className:`${l.default.cardAmount} ${l.default.paid}`,children:["₹",z.toFixed(2)]}),(0,t.jsxs)("div",{className:l.default.cardSubtext,children:[D," paid bills"]}),(0,t.jsx)("div",{className:l.default.cardIcon,children:"✓"})]})}),(0,t.jsx)("div",{className:l.default.summaryCard,children:(0,t.jsxs)("div",{className:l.default.cardContent,children:[(0,t.jsx)("div",{className:l.default.cardLabel,children:"Pending Amount"}),(0,t.jsxs)("div",{className:`${l.default.cardAmount} ${l.default.pending}`,children:["₹",A.toFixed(2)]}),(0,t.jsxs)("div",{className:l.default.cardSubtext,children:[F," pending bills"]}),(0,t.jsx)("div",{className:l.default.cardIcon,children:"⏰"})]})})]}),(0,t.jsxs)("div",{className:l.default.actionsSection,children:[(0,t.jsx)("button",{className:l.default.addButton,onClick:()=>{j(null),p(!0)},children:"+ Add New Bill"}),(0,t.jsxs)("div",{className:l.default.filters,style:{display:"flex",flexWrap:"wrap",gap:"12px",alignItems:"center"},children:[(0,t.jsx)("label",{children:"Filters:"}),(0,t.jsxs)("select",{value:v,onChange:e=>_(e.target.value),className:l.default.filterSelect,children:[(0,t.jsx)("option",{value:"none",children:"Sort Sr No: No Sort"}),(0,t.jsx)("option",{value:"asc",children:"Sort Sr No: Ascending"}),(0,t.jsx)("option",{value:"desc",children:"Sort Sr No: Descending"})]}),(0,t.jsxs)("select",{value:m,onChange:e=>x(e.target.value),className:l.default.filterSelect,children:[(0,t.jsx)("option",{value:"all",children:"All Months"}),[{value:"all",label:"All Months"},{value:"1",label:"January"},{value:"2",label:"February"},{value:"3",label:"March"},{value:"4",label:"April"},{value:"5",label:"May"},{value:"6",label:"June"},{value:"7",label:"July"},{value:"8",label:"August"},{value:"9",label:"September"},{value:"10",label:"October"},{value:"11",label:"November"},{value:"12",label:"December"}].map(e=>(0,t.jsx)("option",{value:e.value,children:e.label},e.value))]}),(0,t.jsxs)("select",{value:h,onChange:e=>g(e.target.value),className:l.default.filterSelect,children:[(0,t.jsx)("option",{value:"all",children:"All Years"}),T.map(e=>(0,t.jsx)("option",{value:e,children:e},e))]}),(0,t.jsx)("input",{type:"text",placeholder:"Search by description, vendor, bill no, category...",value:f,onChange:e=>b(e.target.value),className:l.default.filterSelect,style:{minWidth:"200px"}}),("all"!==m||"all"!==h||f||"none"!==v)&&(0,t.jsx)("button",{className:l.default.clearFilters,onClick:()=>{x("all"),g("all"),b(""),_("none")},children:"✕ Clear Filters"}),o.length>0&&(0,t.jsxs)("button",{onClick:()=>{if(0===o.length)return void alert("No expenses to download");let e=window.open("","_blank");if(!e)return void alert("Please allow popups to use print/PDF");let t=`Total Records: ${o.length}`;"all"!==m&&(t+=` | Month: ${q[m.padStart(2,"0")]||m}`),"all"!==h&&(t+=` | Year: ${h}`),"none"!==v&&(t+=` | Sr No: ${"asc"===v?"Ascending":"Descending"}`),e.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Expense Bills Report</title>
                <style>
                    @media print { @page { margin: 10mm; size: A4 landscape; } body { margin: 0; padding: 0; } .no-print { display: none; } }
                    body { font-family: Arial, sans-serif; padding: 10px; font-size: 10px; }
                    h1 { color: #8b0000; text-align: center; margin: 10px 0; font-size: 18px; }
                    h2 { text-align: center; margin: 5px 0; font-size: 14px; color: #333; }
                    .filter-info { text-align: center; margin: 10px 0; font-size: 9px; color: #666; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 9px; }
                    th { background: #8b0000; color: white; padding: 8px 4px; text-align: left; font-weight: bold; border: 1px solid #666; }
                    td { padding: 6px 4px; border: 1px solid #ddd; }
                    tr:nth-child(even) { background: #f5f5f5; }
                    .amount { text-align: right; font-weight: bold; color: #10b981; }
                    .footer { margin-top: 20px; text-align: center; font-size: 8px; color: #999; }
                    .no-print button { padding: 10px 20px; background: #8b0000; color: white; border: none; border-radius: 5px; cursor: pointer; margin: 0 10px; }
                </style>
            </head>
            <body>
                <h1>Swargumphan / Naad Dhyas Foundation</h1>
                <h2>Expense Bills Report</h2>
                <div class="filter-info">${t}</div>
                <table>
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Bill No</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Vendor</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${o.map(e=>`
                            <tr>
                                <td>${null!=e.sr_no?String(e.sr_no).padStart(3,"0"):"-"}</td>
                                <td>${e.description||"-"}</td>
                                <td class="amount">₹${("number"==typeof e.amount?e.amount:parseFloat(e.amount)||0).toFixed(2)}</td>
                                <td>${e.bill_no||"-"}</td>
                                <td>${e.date?new Date(e.date).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"-"}</td>
                                <td>${e.category||"-"}</td>
                                <td>${e.vendor||"-"}</td>
                                <td>${e.status||"-"}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div class="footer">Generated on ${new Date().toLocaleString("en-IN")}</div>
                <div class="no-print">
                    <button onclick="window.print()">🖨️ Print / Save as PDF</button>
                    <button onclick="window.close()">Close</button>
                </div>
            </body>
            </html>
        `),e.document.close()},style:{padding:"8px 16px",background:"#10b981",color:"white",border:"none",borderRadius:"6px",fontWeight:"600",cursor:"pointer"},children:["📄 Download PDF (",o.length,")"]})]})]}),(0,t.jsxs)("div",{className:l.default.tableSection,children:[(0,t.jsxs)("div",{className:l.default.tableHeader,children:[(0,t.jsx)("h3",{children:"📄 Expense Bills"}),(0,t.jsx)("p",{children:"Manage all your expense bills and receipts"})]}),d?(0,t.jsx)("div",{className:l.default.loading,children:"Loading expenses..."}):o&&0!==o.length?(0,t.jsx)("div",{className:l.default.tableWrapper,children:(0,t.jsxs)("table",{className:l.default.expensesTable,children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Sr. No."}),(0,t.jsx)("th",{children:"Description"}),(0,t.jsx)("th",{children:"Amount"}),(0,t.jsx)("th",{children:"Bill No"}),(0,t.jsx)("th",{children:"Date"}),(0,t.jsx)("th",{children:"Category"}),(0,t.jsx)("th",{children:"Vendor"}),(0,t.jsx)("th",{children:"Status"}),(0,t.jsx)("th",{children:"Actions"})]})}),(0,t.jsx)("tbody",{children:o&&o.length>0?o.map(e=>{if(!e||!e.id)return null;let a="number"==typeof e.amount?e.amount:"string"==typeof e.amount?parseFloat(e.amount):0,n=isNaN(a)?"0.00":a.toFixed(2),r=(()=>{if(!e.date)return"N/A";try{let t=new Date(e.date);if(isNaN(t.getTime()))return"N/A";return t.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}catch{return"N/A"}})(),s=e.status||"pending",o=null!=e.sr_no?String(e.sr_no).padStart(3,"0"):"—";return(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:l.default.srNoCell,children:o}),(0,t.jsx)("td",{children:(0,t.jsxs)("div",{className:l.default.descriptionCell,children:[(0,t.jsx)("span",{children:e.description||"-"}),e.image_url&&(0,t.jsxs)("span",{className:l.default.fileAttachment,children:["📎 ",e.image_url.split("/").pop()||"image"]})]})}),(0,t.jsxs)("td",{className:l.default.amountCell,children:["₹",n]}),(0,t.jsx)("td",{children:e.bill_no||"-"}),(0,t.jsx)("td",{children:r}),(0,t.jsx)("td",{children:(0,t.jsx)("span",{className:l.default.categoryTag,children:e.category||"Other"})}),(0,t.jsx)("td",{children:e.vendor||"-"}),(0,t.jsx)("td",{children:(0,t.jsx)("span",{className:`${l.default.statusTag} ${l.default[s]}`,children:"paid"===s?"✓ paid":"⏰ pending"})}),(0,t.jsx)("td",{children:(0,t.jsxs)("div",{className:l.default.actionButtons,children:[e.image_url&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("button",{className:l.default.actionBtn,onClick:()=>(e=>{if(!e?.image_url)return void alert("No image available for this expense");try{let t=encodeURIComponent(e.image_url),a=`/api/expenses/image?path=${t}`;window.open(a,"_blank")}catch(e){console.error("Error opening image:",e),alert("Failed to open image: "+(e instanceof Error?e.message:"Unknown error"))}})(e),title:"View",children:"👁️"}),(0,t.jsx)("button",{className:l.default.actionBtn,onClick:()=>C(e),title:"Download Image",children:"⬇️"})]}),(0,t.jsx)("button",{className:l.default.actionBtn,onClick:()=>(e=>{let t=window.open("","_blank");if(!t)return void alert("Please allow popups for this website to generate the PDF");let a=(e=>{if(0===e)return"Zero";let t=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"],a=["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"],n=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"],l=e=>e<10?t[e]:e<20?a[e-10]:e<100?n[Math.floor(e/10)]+(e%10?" "+t[e%10]:""):e<1e3?t[Math.floor(e/100)]+" Hundred"+(e%100?" "+l(e%100):""):e<1e5?l(Math.floor(e/1e3))+" Thousand"+(e%1e3?" "+l(e%1e3):""):e<1e7?l(Math.floor(e/1e5))+" Lakh"+(e%1e5?" "+l(e%1e5):""):l(Math.floor(e/1e7))+" Crore"+(e%1e7?" "+l(e%1e7):""),r=Math.floor(e),s=Math.round((e-r)*100),o=l(r)+" Rupees";return s>0&&(o+=" and "+l(s)+" Paise"),o+=" Only"})(e.amount);t.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Expense Voucher - ${e.description}</title>
                <style>
                    @media print {
                        @page { 
                            margin: 10mm;
                            size: A4;
                        }
                        body { 
                            margin: 0;
                            padding: 0;
                        }
                        .no-print { display: none; }
                        * {
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                    }
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        color: #000;
                        background: white;
                        font-size: 12px;
                        line-height: 1.4;
                    }
                    .voucher-container {
                        max-width: 800px;
                        margin: 0 auto;
                        border: 2px solid #000;
                        padding: 20px;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 2px solid #000;
                        padding-bottom: 15px;
                        margin-bottom: 20px;
                    }
                    .header h1 {
                        margin: 0 0 5px 0;
                        font-size: 24px;
                        font-weight: bold;
                        text-transform: uppercase;
                    }
                    .header h2 {
                        margin: 5px 0;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .header p {
                        margin: 3px 0;
                        font-size: 11px;
                    }
                    .date-section {
                        text-align: right;
                        margin-bottom: 20px;
                        font-size: 12px;
                    }
                    .info-section {
                        margin-bottom: 20px;
                    }
                    .info-row {
                        display: flex;
                        margin-bottom: 10px;
                    }
                    .info-label {
                        font-weight: bold;
                        min-width: 80px;
                    }
                    .info-value {
                        flex: 1;
                        border-bottom: 1px solid #000;
                        padding-left: 10px;
                    }
                    .expense-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    .expense-table th,
                    .expense-table td {
                        border: 1px solid #000;
                        padding: 8px;
                        text-align: left;
                    }
                    .expense-table th {
                        background-color: #f0f0f0;
                        font-weight: bold;
                        text-align: center;
                    }
                    .expense-table .sr-no {
                        width: 60px;
                        text-align: center;
                    }
                    .expense-table .bill-no {
                        width: 100px;
                        text-align: center;
                    }
                    .expense-table .total {
                        width: 100px;
                        text-align: right;
                    }
                    .total-row {
                        font-weight: bold;
                    }
                    .amount-words {
                        margin: 15px 0;
                        padding: 10px;
                        border: 1px solid #000;
                    }
                    .amount-words-label {
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .signature-section {
                        margin-top: 40px;
                        display: flex;
                        justify-content: space-between;
                    }
                    .signature-box {
                        text-align: center;
                        width: 200px;
                    }
                    .signature-line {
                        border-top: 1px solid #000;
                        margin-top: 60px;
                        padding-top: 5px;
                        font-weight: bold;
                    }
                    .no-print {
                        text-align: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 2px dashed #ccc;
                    }
                    .no-print button {
                        padding: 12px 30px;
                        background: var(--theme-maroon);
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 14px;
                        cursor: pointer;
                        margin: 0 10px;
                    }
                    .no-print button:hover {
                        background: #a01f1f;
                    }
                </style>
            </head>
            <body>
                <div class="voucher-container">
                    <div class="header">
                        <h1>EXPENSE VOUCHER</h1>
                        <h2>NAD DHYAS FOUNDATION</h2>
                        <p>At Post: Deravan, Tal: Patan, Dist.: Satara</p>
                        <p>Registration No : E-0002608 (STR)</p>
                        <p>Contact: 7721833346 | Email: nnaddhyass@gmail.com</p>
                    </div>

                    <div class="date-section">
                        <strong>Date:</strong> ${(e=>{try{let t=new Date(e),a=t.getDate().toString().padStart(2,"0"),n=(t.getMonth()+1).toString().padStart(2,"0"),l=t.getFullYear();return`${a}/${n}/${l}`}catch{return e}})(e.date)}
                    </div>

                    <div class="info-section">
                        <div class="info-row">
                            <span class="info-label">SR NO:</span>
                            <span class="info-value">${null!=e.sr_no?String(e.sr_no).padStart(3,"0"):e.id||"—"}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Name:</span>
                            <span class="info-value">${e.vendor||""}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-label">Address:</span>
                            <span class="info-value">${e.notes||""}</span>
                        </div>
                    </div>

                    <table class="expense-table">
                        <thead>
                            <tr>
                                <th class="sr-no">SR NO</th>
                                <th>DESCRIPTION</th>
                                <th class="bill-no">Bill No</th>
                                <th class="total">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="sr-no">${null!=e.sr_no?String(e.sr_no).padStart(3,"0"):"1"}</td>
                                <td>${e.description}</td>
                                <td class="bill-no">${e.bill_no||(null!=e.sr_no?String(e.sr_no).padStart(3,"0"):e.id)}</td>
                                <td class="total">₹${e.amount.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td class="sr-no">2</td>
                                <td></td>
                                <td class="bill-no"></td>
                                <td class="total"></td>
                            </tr>
                            <tr>
                                <td class="sr-no">3</td>
                                <td></td>
                                <td class="bill-no"></td>
                                <td class="total"></td>
                            </tr>
                            <tr>
                                <td class="sr-no">4</td>
                                <td></td>
                                <td class="bill-no"></td>
                                <td class="total"></td>
                            </tr>
                            <tr>
                                <td class="sr-no">5</td>
                                <td></td>
                                <td class="bill-no"></td>
                                <td class="total"></td>
                            </tr>
                            <tr>
                                <td class="sr-no">6</td>
                                <td></td>
                                <td class="bill-no"></td>
                                <td class="total"></td>
                            </tr>
                            <tr>
                                <td class="sr-no">7</td>
                                <td></td>
                                <td class="bill-no"></td>
                                <td class="total"></td>
                            </tr>
                            <tr>
                                <td class="sr-no">8</td>
                                <td></td>
                                <td class="bill-no"></td>
                                <td class="total"></td>
                            </tr>
                            <tr class="total-row">
                                <td colspan="3" style="text-align: right; padding-right: 10px;">Total</td>
                                <td class="total">₹${e.amount.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="amount-words">
                        <div class="amount-words-label">In Words:</div>
                        <div>${a}</div>
                    </div>

                    <div class="signature-section">
                        <div class="signature-box">
                            <div class="signature-line">Prepared By:</div>
                        </div>
                        <div class="signature-box">
                            <div class="signature-line">Approved By:</div>
                        </div>
                        <div class="signature-box">
                            <div class="signature-line">Received By:</div>
                        </div>
                    </div>
                </div>

                <div class="no-print">
                    <button onclick="window.print()">🖨️ Print / Save as PDF</button>
                    <button onclick="window.close()">✖️ Close</button>
                </div>

                <script>
                    // Auto-focus for better UX
                    window.onload = function() {
                        // Optional: Auto-print
                        // setTimeout(() => window.print(), 500);
                    };
                </script>
            </body>
            </html>
        `),t.document.close()})(e),title:"Download Voucher PDF",children:"📄"}),(0,t.jsx)("button",{className:l.default.actionBtn,onClick:()=>{j(e),p(!0)},title:"Edit",children:"✏️"}),(0,t.jsx)("button",{className:l.default.actionBtn,onClick:()=>S(e.id),title:"Delete",children:"🗑️"})]})})]},e.id)}):(0,t.jsx)("tr",{children:(0,t.jsx)("td",{colSpan:9,style:{textAlign:"center",padding:"40px",color:"#6b7280"},children:"No expense bills found"})})})]})}):(0,t.jsx)("div",{className:l.default.emptyState,children:"No expense bills found"})]})]}),u&&(0,t.jsx)(r,{expense:y,onClose:()=>{p(!1),j(null)},onSuccess:()=>{p(!1),j(null),N()}})]})}])}]);