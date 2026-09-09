module.exports=[88560,a=>{a.v({actionButtons:"DonationRecords-module__1lGNTG__actionButtons",address:"DonationRecords-module__1lGNTG__address",amount:"DonationRecords-module__1lGNTG__amount",bar:"DonationRecords-module__1lGNTG__bar",barAmount:"DonationRecords-module__1lGNTG__barAmount",barChart:"DonationRecords-module__1lGNTG__barChart",barCount:"DonationRecords-module__1lGNTG__barCount",barHighest:"DonationRecords-module__1lGNTG__barHighest",barItem:"DonationRecords-module__1lGNTG__barItem",barLabel:"DonationRecords-module__1lGNTG__barLabel",barLowest:"DonationRecords-module__1lGNTG__barLowest",barMid:"DonationRecords-module__1lGNTG__barMid",barWrapper:"DonationRecords-module__1lGNTG__barWrapper",cancelButton:"DonationRecords-module__1lGNTG__cancelButton",chartContainer:"DonationRecords-module__1lGNTG__chartContainer",chartSection:"DonationRecords-module__1lGNTG__chartSection",chartTitle:"DonationRecords-module__1lGNTG__chartTitle",clearFilterBtn:"DonationRecords-module__1lGNTG__clearFilterBtn",container:"DonationRecords-module__1lGNTG__container",dateInput:"DonationRecords-module__1lGNTG__dateInput",deleteButton:"DonationRecords-module__1lGNTG__deleteButton",description:"DonationRecords-module__1lGNTG__description",donorCard:"DonationRecords-module__1lGNTG__donorCard",donorInfo:"DonationRecords-module__1lGNTG__donorInfo",donorName:"DonationRecords-module__1lGNTG__donorName",donorRank:"DonationRecords-module__1lGNTG__donorRank",donorStats:"DonationRecords-module__1lGNTG__donorStats",editButton:"DonationRecords-module__1lGNTG__editButton",editForm:"DonationRecords-module__1lGNTG__editForm",filterGroup:"DonationRecords-module__1lGNTG__filterGroup",filterLabel:"DonationRecords-module__1lGNTG__filterLabel",filters:"DonationRecords-module__1lGNTG__filters",filtersActions:"DonationRecords-module__1lGNTG__filtersActions",filtersRow:"DonationRecords-module__1lGNTG__filtersRow",formGroup:"DonationRecords-module__1lGNTG__formGroup",formRow:"DonationRecords-module__1lGNTG__formRow",header:"DonationRecords-module__1lGNTG__header",input:"DonationRecords-module__1lGNTG__input",label:"DonationRecords-module__1lGNTG__label",loading:"DonationRecords-module__1lGNTG__loading",modalActions:"DonationRecords-module__1lGNTG__modalActions",modalCloseButton:"DonationRecords-module__1lGNTG__modalCloseButton",modalContent:"DonationRecords-module__1lGNTG__modalContent",modalHeader:"DonationRecords-module__1lGNTG__modalHeader",modalOverlay:"DonationRecords-module__1lGNTG__modalOverlay",modalTitle:"DonationRecords-module__1lGNTG__modalTitle",noData:"DonationRecords-module__1lGNTG__noData",pdfButton:"DonationRecords-module__1lGNTG__pdfButton",receiptNo:"DonationRecords-module__1lGNTG__receiptNo",refreshBtn:"DonationRecords-module__1lGNTG__refreshBtn",saveButton:"DonationRecords-module__1lGNTG__saveButton",searchInput:"DonationRecords-module__1lGNTG__searchInput",statCard:"DonationRecords-module__1lGNTG__statCard",statContent:"DonationRecords-module__1lGNTG__statContent",statIcon:"DonationRecords-module__1lGNTG__statIcon",statLabel:"DonationRecords-module__1lGNTG__statLabel",statValue:"DonationRecords-module__1lGNTG__statValue",statsGrid:"DonationRecords-module__1lGNTG__statsGrid",table:"DonationRecords-module__1lGNTG__table",tableContainer:"DonationRecords-module__1lGNTG__tableContainer",textarea:"DonationRecords-module__1lGNTG__textarea",title:"DonationRecords-module__1lGNTG__title",topDonorsList:"DonationRecords-module__1lGNTG__topDonorsList",topDonorsSection:"DonationRecords-module__1lGNTG__topDonorsSection",totalAmount:"DonationRecords-module__1lGNTG__totalAmount",totalLabel:"DonationRecords-module__1lGNTG__totalLabel",upiId:"DonationRecords-module__1lGNTG__upiId"})},78271,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(92376),e=a.i(88060),f=a.i(88560);a.s(["default",0,function(){let a,g,h,i=(0,d.useRouter)(),[j,k]=(0,c.useState)([]),[l,m]=(0,c.useState)(null),[n,o]=(0,c.useState)(!0),[p,q]=(0,c.useState)(""),[r,s]=(0,c.useState)(""),[t,u]=(0,c.useState)("all"),[v,w]=(0,c.useState)("all"),[x,y]=(0,c.useState)("none"),[z,A]=(0,c.useState)(null),[B,C]=(0,c.useState)({userUpiId:"",donatedBy:"",streetAddress:"",city:"",state:"",zip:"",dateOfDonation:"",donationValue:"",description:"",taxId:""});(0,c.useEffect)(()=>{let a=localStorage.getItem("adminRole"),b=localStorage.getItem("isRootAdmin");"ROOT"!==a&&"true"!==b?i.push("/admin/login"):D()},[i]);let D=async()=>{try{o(!0),console.log("Fetching donation records...");let a=await fetch("/api/admin/donation-records",{cache:"no-store",headers:{"Cache-Control":"no-cache"}});console.log("Response status:",a.status);let b=await a.json();console.log("Donation records data:",b),b.success?(console.log(`Received ${b.donations?.length||0} donations`),console.log("Sample donation:",b.donations?.[0]),console.log("Stats:",b.stats),k(b.donations||[]),m(b.stats||null)):(console.error("Failed to fetch donations:",b.error),console.error("Full response:",b),alert(`Failed to fetch donations: ${b.error||"Unknown error"}`),k([]),m(null))}catch(a){console.error("Error fetching donations:",a),alert(`Error fetching donations: ${a instanceof Error?a.message:"Unknown error"}`),k([]),m(null)}finally{o(!1)}},E=(()=>{let a=[...j];if(p.trim()){let b=p.toLowerCase();a=a.filter(a=>a.donated_by?.toLowerCase().includes(b)||a.receipt_no?.toLowerCase().includes(b)||a.user_upi_id?.toLowerCase().includes(b)||a.description?.toLowerCase().includes(b))}return r&&(a=a.filter(a=>a.date_of_donation===r)),"all"!==t&&(a=a.filter(a=>{if(!a.date_of_donation)return!1;let b=new Date(a.date_of_donation);return(b.getMonth()+1).toString().padStart(2,"0")===t||(b.getMonth()+1).toString()===t})),"all"!==v&&(a=a.filter(a=>!!a.date_of_donation&&new Date(a.date_of_donation).getFullYear().toString()===v)),"none"!==x&&(a=[...a].sort((a,b)=>{let c=a.receipt_no||"",d=b.receipt_no||"";return"asc"===x?c.localeCompare(d,void 0,{numeric:!0,sensitivity:"base"}):d.localeCompare(c,void 0,{numeric:!0,sensitivity:"base"})})),a})(),F=a=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(a),G=a=>new Date(a).toLocaleDateString("en-IN",{year:"numeric",month:"short",day:"numeric"}),H=async(a,b)=>{if(confirm(`Are you sure you want to delete donation record ${b}? This action cannot be undone.`))try{let b=await fetch(`/api/admin/donation-records/${a}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}),c=await b.json();b.ok&&c.success?(alert("Donation record deleted successfully"),D()):alert(`Failed to delete donation record: ${c.error||"Unknown error"}`)}catch(a){console.error("Error deleting donation record:",a),alert(`Error deleting donation record: ${a instanceof Error?a.message:"Unknown error"}`)}},I=a=>{let{name:b,value:c}=a.target;C(a=>({...a,[b]:c}))},J=async a=>{if(a.preventDefault(),z)try{let a=await fetch(`/api/admin/donation-records/${z.donation_id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(B)}),b=await a.json();a.ok&&b.success?(alert("Donation record updated successfully"),A(null),D()):alert(`Failed to update donation record: ${b.error||"Unknown error"}`)}catch(a){console.error("Error updating donation record:",a),alert(`Error updating donation record: ${a instanceof Error?a.message:"Unknown error"}`)}};return(0,b.jsxs)(e.default,{children:[(0,b.jsxs)("div",{className:f.default.container,children:[(0,b.jsxs)("div",{className:f.default.header,children:[(0,b.jsx)("h1",{className:f.default.title,children:"Donation Records"}),(0,b.jsx)("button",{onClick:D,className:f.default.refreshBtn,children:"Refresh"})]}),l&&(0,b.jsxs)("div",{className:f.default.statsGrid,children:[(0,b.jsxs)("div",{className:f.default.statCard,children:[(0,b.jsx)("div",{className:f.default.statIcon,children:"💰"}),(0,b.jsxs)("div",{className:f.default.statContent,children:[(0,b.jsx)("h3",{className:f.default.statLabel,children:"Total Donations"}),(0,b.jsx)("p",{className:f.default.statValue,children:l.totalDonations||0})]})]}),(0,b.jsxs)("div",{className:f.default.statCard,children:[(0,b.jsx)("div",{className:f.default.statIcon,children:"💵"}),(0,b.jsxs)("div",{className:f.default.statContent,children:[(0,b.jsx)("h3",{className:f.default.statLabel,children:"Total Amount"}),(0,b.jsx)("p",{className:f.default.statValue,children:F(l.totalAmount||0)})]})]}),(0,b.jsxs)("div",{className:f.default.statCard,children:[(0,b.jsx)("div",{className:f.default.statIcon,children:"📊"}),(0,b.jsxs)("div",{className:f.default.statContent,children:[(0,b.jsx)("h3",{className:f.default.statLabel,children:"Average Donation"}),(0,b.jsx)("p",{className:f.default.statValue,children:F(l.averageDonation||0)})]})]}),(0,b.jsxs)("div",{className:f.default.statCard,children:[(0,b.jsx)("div",{className:f.default.statIcon,children:"📅"}),(0,b.jsxs)("div",{className:f.default.statContent,children:[(0,b.jsx)("h3",{className:f.default.statLabel,children:"This Month"}),(0,b.jsxs)("p",{className:f.default.statValue,children:[l.donationsThisMonth||0," (",F(l.monthlyAmount||0),")"]})]})]})]}),(0,b.jsxs)("div",{className:f.default.filtersRow,children:[(0,b.jsxs)("div",{className:f.default.filterGroup,children:[(0,b.jsx)("label",{className:f.default.filterLabel,children:"Sort Receipt No"}),(0,b.jsxs)("select",{value:x,onChange:a=>y(a.target.value),className:f.default.searchInput,style:{width:"100%",padding:"10px 14px"},children:[(0,b.jsx)("option",{value:"none",children:"No Sort"}),(0,b.jsx)("option",{value:"asc",children:"Ascending (A-Z, 1-9)"}),(0,b.jsx)("option",{value:"desc",children:"Descending (Z-A, 9-1)"})]})]}),(0,b.jsxs)("div",{className:f.default.filterGroup,children:[(0,b.jsx)("label",{className:f.default.filterLabel,children:"Filter by Month"}),(0,b.jsxs)("select",{value:t,onChange:a=>u(a.target.value),className:f.default.searchInput,style:{width:"100%",padding:"10px 14px"},children:[(0,b.jsx)("option",{value:"all",children:"All Months"}),(0,b.jsx)("option",{value:"01",children:"January"}),(0,b.jsx)("option",{value:"02",children:"February"}),(0,b.jsx)("option",{value:"03",children:"March"}),(0,b.jsx)("option",{value:"04",children:"April"}),(0,b.jsx)("option",{value:"05",children:"May"}),(0,b.jsx)("option",{value:"06",children:"June"}),(0,b.jsx)("option",{value:"07",children:"July"}),(0,b.jsx)("option",{value:"08",children:"August"}),(0,b.jsx)("option",{value:"09",children:"September"}),(0,b.jsx)("option",{value:"10",children:"October"}),(0,b.jsx)("option",{value:"11",children:"November"}),(0,b.jsx)("option",{value:"12",children:"December"})]})]}),(0,b.jsxs)("div",{className:f.default.filterGroup,children:[(0,b.jsx)("label",{className:f.default.filterLabel,children:"Filter by Year"}),(0,b.jsxs)("select",{value:v,onChange:a=>w(a.target.value),className:f.default.searchInput,style:{width:"100%",padding:"10px 14px"},children:[(0,b.jsx)("option",{value:"all",children:"All Years"}),Array.from({length:6},(a,b)=>new Date().getFullYear()-b).map(a=>(0,b.jsx)("option",{value:a.toString(),children:a},a))]})]}),(0,b.jsxs)("div",{className:f.default.filterGroup,children:[(0,b.jsx)("label",{className:f.default.filterLabel,children:"Search"}),(0,b.jsx)("input",{type:"text",placeholder:"Search by donor name, receipt no, UPI ID...",value:p,onChange:a=>q(a.target.value),className:f.default.searchInput,style:{width:"100%",padding:"10px 14px"}})]}),(0,b.jsxs)("div",{className:f.default.filterGroup,children:[(0,b.jsx)("label",{className:f.default.filterLabel,children:"Specific Date"}),(0,b.jsx)("input",{type:"date",value:r,onChange:a=>s(a.target.value),className:f.default.dateInput,style:{width:"100%",padding:"10px 14px"}})]})]}),(0,b.jsxs)("div",{className:f.default.filtersActions,children:[("all"!==t||"all"!==v||p||r||"none"!==x)&&(0,b.jsx)("button",{onClick:()=>{u("all"),w("all"),q(""),s(""),y("none")},className:f.default.clearFilterBtn,children:"Clear All Filters"}),E.length>0&&(0,b.jsxs)("button",{onClick:()=>{let a=window.open("","_blank");if(!a)return;let b=`Total Records: ${E.length}`;"all"!==t&&(b+=` | Month: ${({"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June","07":"July","08":"August","09":"September",10:"October",11:"November",12:"December"})[t]||t}`),"all"!==v&&(b+=` | Year: ${v}`),"none"!==x&&(b+=` | Receipt No: ${"asc"===x?"Ascending":"Descending"}`),a.document.write(`<!DOCTYPE html><html><head><title>Donation Records Report</title><style>@media print{@page{margin:10mm;size:A4 landscape}body{margin:0}.no-print{display:none}}body{font-family:Arial;padding:10px;font-size:10px}h1{color:#800000;text-align:center}h2{text-align:center;font-size:14px}.filter-info{text-align:center;margin:10px 0;font-size:9px}table{width:100%;border-collapse:collapse;font-size:9px}th{background:#800000;color:white;padding:8px;text-align:left}td{padding:6px;border:1px solid #ddd}tr:nth-child(even){background:#f5f5f5}.amount{text-align:right;font-weight:bold}.no-print button{padding:10px 20px;background:#800000;color:white;border:none;border-radius:5px;cursor:pointer;margin:0 10px}</style></head><body><h1>Naad Dhyas Foundation</h1><h2>Donation Records Report</h2><div class="filter-info">${b}</div><table><thead><tr><th>Receipt No</th><th>Donated By</th><th>UPI ID</th><th>Date</th><th>Amount</th><th>Description</th></tr></thead><tbody>${E.map(a=>`<tr><td>${a.receipt_no||"-"}</td><td>${a.donated_by||"-"}</td><td>${a.user_upi_id||"-"}</td><td>${a.date_of_donation?new Date(a.date_of_donation).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"-"}</td><td class="amount">₹${(a.donation_value||0).toLocaleString("en-IN")}</td><td>${(a.description||"-").substring(0,50)}</td></tr>`).join("")}</tbody></table><div class="filter-info">Generated on ${new Date().toLocaleString("en-IN")}</div><div class="no-print"><button onclick="window.print()">🖨️ Print / Save as PDF</button><button onclick="window.close()">Close</button></div></body></html>`),a.document.close()},style:{padding:"10px 20px",background:"#10b981",color:"white",border:"none",borderRadius:"6px",fontWeight:"600",cursor:"pointer"},children:["📄 Download PDF (",E.length,")"]})]}),n?(0,b.jsx)("div",{className:f.default.loading,children:"Loading donation records..."}):0===j.length?(0,b.jsxs)("div",{className:f.default.noData,children:[(0,b.jsx)("p",{children:"No donation records found in the database."}),(0,b.jsx)("p",{style:{marginTop:"10px",fontSize:"14px",color:"#9ca3af"},children:"Donations will appear here once they are submitted through the donation form."})]}):0===E.length?(0,b.jsxs)("div",{className:f.default.noData,children:["No donation records match your search criteria.",(0,b.jsx)("button",{onClick:()=>{q(""),s(""),u("all"),w("all"),y("none")},className:f.default.clearFilterBtn,style:{marginLeft:"10px"},children:"Clear All Filters"})]}):(0,b.jsx)("div",{className:f.default.tableContainer,children:(0,b.jsxs)("table",{className:f.default.table,children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{children:"Receipt No"}),(0,b.jsx)("th",{children:"Donated By"}),(0,b.jsx)("th",{children:"UPI ID"}),(0,b.jsx)("th",{children:"Address"}),(0,b.jsx)("th",{children:"Date"}),(0,b.jsx)("th",{children:"Amount"}),(0,b.jsx)("th",{children:"Description"}),(0,b.jsx)("th",{children:"Created At"}),(0,b.jsx)("th",{children:"Actions"})]})}),(0,b.jsx)("tbody",{children:E.map(a=>(0,b.jsxs)("tr",{children:[(0,b.jsx)("td",{className:f.default.receiptNo,children:a.receipt_no||"N/A"}),(0,b.jsx)("td",{className:f.default.donorName,children:a.donated_by||"N/A"}),(0,b.jsx)("td",{className:f.default.upiId,children:a.user_upi_id||"N/A"}),(0,b.jsxs)("td",{className:f.default.address,children:[a.street_address||"",", ",a.city||"",", ",a.state||""," - ",a.zip||""]}),(0,b.jsx)("td",{children:a.date_of_donation?G(a.date_of_donation):"N/A"}),(0,b.jsx)("td",{className:f.default.amount,children:F(a.donation_value||0)}),(0,b.jsx)("td",{className:f.default.description,title:a.description||"",children:a.description&&a.description.length>50?`${a.description.substring(0,50)}...`:a.description||"N/A"}),(0,b.jsx)("td",{children:a.created_at?G(a.created_at):"N/A"}),(0,b.jsx)("td",{children:(0,b.jsxs)("div",{className:f.default.actionButtons,children:[(0,b.jsx)("button",{onClick:()=>(a=>{let b=window.open("","_blank");if(!b)return;let c=new Date(a.date_of_donation).toLocaleDateString("en-IN",{year:"numeric",month:"long",day:"numeric"});b.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Donation Receipt - ${a.receipt_no}</title>
                <style>
                    @media print {
                        @page { 
                            margin: 8mm;
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
                        font-size: 14px;
                        line-height: 1.6;
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        border-bottom: 2px solid #800000;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .header-left {
                        text-align: left;
                    }
                    .header-left h1 {
                        color: #800000;
                        margin: 0 0 8px 0;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .header-left p {
                        margin: 4px 0;
                        font-size: 14px;
                        color: #333;
                    }
                    .header-right {
                        text-align: right;
                    }
                    .header-right h2 {
                        color: #800000;
                        margin: 0 0 10px 0;
                        font-size: 24px;
                        font-weight: bold;
                    }
                    .header-right p {
                        margin: 5px 0;
                        font-size: 14px;
                        color: #333;
                    }
                    .info-section {
                        margin-bottom: 30px;
                    }
                    .info-section h3 {
                        color: #800000;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 8px;
                        margin-bottom: 15px;
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .info-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        margin-bottom: 20px;
                    }
                    .info-item {
                        margin-bottom: 10px;
                    }
                    .info-item label {
                        font-weight: bold;
                        color: #333;
                        display: block;
                        margin-bottom: 4px;
                    }
                    .info-item span {
                        color: #555;
                    }
                    .donation-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 30px 0;
                    }
                    .donation-table thead {
                        background: #800000;
                        color: white;
                    }
                    .donation-table th {
                        padding: 12px;
                        text-align: left;
                        font-weight: 600;
                    }
                    .donation-table td {
                        padding: 12px;
                        border-bottom: 1px solid #ddd;
                    }
                    .donation-table tfoot td {
                        font-weight: bold;
                        font-size: 18px;
                        padding: 15px 12px;
                        background: #f9f9f9;
                    }
                    .amount-cell {
                        text-align: right;
                        color: #800000;
                        font-weight: bold;
                        font-size: 18px;
                    }
                    .footer {
                        margin-top: 50px;
                        text-align: center;
                        color: #777;
                        font-size: 12px;
                        border-top: 1px solid #ddd;
                        padding-top: 20px;
                    }
                    .footer p {
                        margin: 5px 0;
                    }
                    .no-print {
                        text-align: center;
                        margin-top: 30px;
                    }
                    .no-print button {
                        padding: 12px 24px;
                        background: #800000;
                        color: white;
                        border: none;
                        border-radius: 5px;
                        font-size: 16px;
                        cursor: pointer;
                        margin: 0 10px;
                    }
                    .no-print button:hover {
                        background: #990000;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="header-left">
                        <h1>Naad Dhyas Foundation</h1>
                        <p>At post Deravan</p>
                        <p>Tal : Patan , Dist : Satara</p>
                    </div>
                    <div class="header-right">
                        <h2>Donation Receipt</h2>
                        <p><strong>Receipt No:</strong> ${a.receipt_no}</p>
                        <p><strong>Date:</strong> ${c}</p>
                    </div>
                </div>

                <div class="info-section">
                    <h3>Donor Information</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Donated By:</label>
                            <span>${a.donated_by||"N/A"}</span>
                        </div>
                        <div class="info-item">
                            <label>User UPI ID:</label>
                            <span>${a.user_upi_id||"N/A"}</span>
                        </div>
                        <div class="info-item">
                            <label>Street Address:</label>
                            <span>${a.street_address||"N/A"}</span>
                        </div>
                        <div class="info-item">
                            <label>City:</label>
                            <span>${a.city||"N/A"}</span>
                        </div>
                        <div class="info-item">
                            <label>State:</label>
                            <span>${a.state||"N/A"}</span>
                        </div>
                        <div class="info-item">
                            <label>Zip Code:</label>
                            <span>${a.zip||"N/A"}</span>
                        </div>
                    </div>
                </div>

                <table class="donation-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th style="text-align: right;">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div><strong>Donation</strong></div>
                                <div style="font-size: 13px; color: #666; margin-top: 5px;">
                                    ${a.description||"N/A"}
                                </div>
                            </td>
                            <td class="amount-cell">₹${(a.donation_value||0).toLocaleString("en-IN")}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td style="text-align: right;"><strong>Total Donation:</strong></td>
                            <td class="amount-cell">₹${(a.donation_value||0).toLocaleString("en-IN")}</td>
                        </tr>
                    </tfoot>
                </table>

                <div class="footer">
                    <p>Thank you for your generous donation to Naad Dhyas Foundation.</p>
                    <p>This is a computer generated receipt and does not require a signature.</p>
                </div>

                <div class="no-print">
                    <button onclick="window.print()">Print / Download PDF</button>
                    <button onclick="window.close()">Close</button>
                </div>

                <script>
                    window.onload = function() {
                        setTimeout(function() {
                            window.print();
                        }, 250);
                    };
                </script>
            </body>
            </html>
        `),b.document.close()})(a),className:f.default.pdfButton,title:"Download PDF receipt",children:"Read"}),(0,b.jsx)("button",{onClick:()=>{A(a),C({userUpiId:a.user_upi_id||"",donatedBy:a.donated_by||"",streetAddress:a.street_address||"",city:a.city||"",state:a.state||"",zip:a.zip||"",dateOfDonation:a.date_of_donation||"",donationValue:a.donation_value?.toString()||"",description:a.description||"",taxId:a.tax_id||""})},className:f.default.editButton,title:"Edit donation record",children:"Edit"}),(0,b.jsx)("button",{onClick:()=>H(a.donation_id,a.receipt_no),className:f.default.deleteButton,title:"Delete donation record",children:"Delete"})]})})]},a.donation_id))})]})}),l&&l.donationsByMonth.length>0&&(g=Math.max(...a=l.donationsByMonth.map(a=>a.amount),0),h=Math.min(...a.filter(a=>a>0),g),(0,b.jsxs)("div",{className:f.default.chartSection,children:[(0,b.jsx)("h2",{className:f.default.chartTitle,children:"Monthly Donations"}),(0,b.jsx)("div",{className:f.default.chartContainer,children:(0,b.jsx)("div",{className:f.default.barChart,children:l.donationsByMonth.map(a=>{let c=g>0?a.amount/g*100:0,d=a.amount===g&&g>0,e=a.amount===h&&h<g&&a.amount>0,i=!d&&!e&&a.amount>0,j=f.default.bar;return d?j+=` ${f.default.barHighest}`:e?j+=` ${f.default.barLowest}`:i&&(j+=` ${f.default.barMid}`),(0,b.jsxs)("div",{className:f.default.barItem,children:[(0,b.jsx)("div",{className:f.default.barWrapper,children:(0,b.jsx)("div",{className:j,style:{height:`${c}%`,minHeight:c>0?"20px":"0px"},children:(0,b.jsx)("span",{className:f.default.barAmount,children:F(a.amount)})})}),(0,b.jsx)("div",{className:f.default.barLabel,children:a.month}),(0,b.jsxs)("div",{className:f.default.barCount,children:[a.count," donation",1!==a.count?"s":""]})]},a.monthKey||a.month)})})})]})),l&&l.topDonors.length>0&&(0,b.jsxs)("div",{className:f.default.topDonorsSection,children:[(0,b.jsx)("h2",{className:f.default.chartTitle,children:"Top Donors"}),(0,b.jsx)("div",{className:f.default.topDonorsList,children:l.topDonors.map((a,c)=>(0,b.jsxs)("div",{className:f.default.donorCard,children:[(0,b.jsxs)("div",{className:f.default.donorRank,children:["#",c+1]}),(0,b.jsxs)("div",{className:f.default.donorInfo,children:[(0,b.jsx)("h3",{className:f.default.donorName,children:a.name}),(0,b.jsxs)("p",{className:f.default.donorStats,children:[a.count," donation",a.count>1?"s":""," • ",F(a.total)]})]})]},c))})]})]}),z&&(0,b.jsx)("div",{className:f.default.modalOverlay,onClick:()=>A(null),children:(0,b.jsxs)("div",{className:f.default.modalContent,onClick:a=>a.stopPropagation(),children:[(0,b.jsxs)("div",{className:f.default.modalHeader,children:[(0,b.jsx)("h2",{className:f.default.modalTitle,children:"Edit Donation Record"}),(0,b.jsx)("button",{className:f.default.modalCloseButton,onClick:()=>A(null),children:"×"})]}),(0,b.jsxs)("form",{onSubmit:J,className:f.default.editForm,children:[(0,b.jsxs)("div",{className:f.default.formGroup,children:[(0,b.jsx)("label",{className:f.default.label,children:"Receipt No:"}),(0,b.jsx)("input",{type:"text",value:z.receipt_no,className:f.default.input,disabled:!0})]}),(0,b.jsxs)("div",{className:f.default.formGroup,children:[(0,b.jsx)("label",{className:f.default.label,children:"User UPI ID: *"}),(0,b.jsx)("input",{type:"text",name:"userUpiId",value:B.userUpiId,onChange:I,className:f.default.input,required:!0})]}),(0,b.jsxs)("div",{className:f.default.formGroup,children:[(0,b.jsx)("label",{className:f.default.label,children:"Donated By: *"}),(0,b.jsx)("input",{type:"text",name:"donatedBy",value:B.donatedBy,onChange:I,className:f.default.input,required:!0})]}),(0,b.jsxs)("div",{className:f.default.formGroup,children:[(0,b.jsx)("label",{className:f.default.label,children:"Street Address: *"}),(0,b.jsx)("input",{type:"text",name:"streetAddress",value:B.streetAddress,onChange:I,className:f.default.input,required:!0})]}),(0,b.jsxs)("div",{className:f.default.formRow,children:[(0,b.jsxs)("div",{className:f.default.formGroup,children:[(0,b.jsx)("label",{className:f.default.label,children:"City: *"}),(0,b.jsx)("input",{type:"text",name:"city",value:B.city,onChange:I,className:f.default.input,required:!0})]}),(0,b.jsxs)("div",{className:f.default.formGroup,children:[(0,b.jsx)("label",{className:f.default.label,children:"State: *"}),(0,b.jsx)("input",{type:"text",name:"state",value:B.state,onChange:I,className:f.default.input,required:!0})]}),(0,b.jsxs)("div",{className:f.default.formGroup,children:[(0,b.jsx)("label",{className:f.default.label,children:"Zip: *"}),(0,b.jsx)("input",{type:"text",name:"zip",value:B.zip,onChange:I,className:f.default.input,required:!0,pattern:"[0-9]{6}",maxLength:6})]})]}),(0,b.jsxs)("div",{className:f.default.formGroup,children:[(0,b.jsx)("label",{className:f.default.label,children:"Date of Donation: *"}),(0,b.jsx)("input",{type:"date",name:"dateOfDonation",value:B.dateOfDonation,onChange:I,className:f.default.input,required:!0})]}),(0,b.jsxs)("div",{className:f.default.formGroup,children:[(0,b.jsx)("label",{className:f.default.label,children:"Donation Value: *"}),(0,b.jsx)("input",{type:"number",name:"donationValue",value:B.donationValue,onChange:I,className:f.default.input,required:!0,min:"1",step:"0.01"})]}),(0,b.jsxs)("div",{className:f.default.formGroup,children:[(0,b.jsx)("label",{className:f.default.label,children:"Description: *"}),(0,b.jsx)("textarea",{name:"description",value:B.description,onChange:I,className:f.default.textarea,required:!0,rows:4})]}),(0,b.jsxs)("div",{className:f.default.formGroup,children:[(0,b.jsx)("label",{className:f.default.label,children:"Tax ID:"}),(0,b.jsx)("input",{type:"text",name:"taxId",value:B.taxId,onChange:I,className:f.default.input})]}),(0,b.jsxs)("div",{className:f.default.modalActions,children:[(0,b.jsx)("button",{type:"submit",className:f.default.saveButton,children:"Save Changes"}),(0,b.jsx)("button",{type:"button",className:f.default.cancelButton,onClick:()=>A(null),children:"Cancel"})]})]})]})})]})}])}];

//# sourceMappingURL=app_admin_donation-records_0rcqck5._.js.map