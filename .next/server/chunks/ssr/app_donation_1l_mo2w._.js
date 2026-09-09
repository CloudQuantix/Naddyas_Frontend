module.exports=[97955,a=>{a.v({address:"Donation-module__aa0PXq__address",backButton:"Donation-module__aa0PXq__backButton",container:"Donation-module__aa0PXq__container",downloadButton:"Donation-module__aa0PXq__downloadButton",form:"Donation-module__aa0PXq__form",formActions:"Donation-module__aa0PXq__formActions",formCard:"Donation-module__aa0PXq__formCard",formGroup:"Donation-module__aa0PXq__formGroup",formRow:"Donation-module__aa0PXq__formRow",formSection:"Donation-module__aa0PXq__formSection",header:"Donation-module__aa0PXq__header",headerLeft:"Donation-module__aa0PXq__headerLeft",headerRight:"Donation-module__aa0PXq__headerRight",helpText:"Donation-module__aa0PXq__helpText",homeButton:"Donation-module__aa0PXq__homeButton",input:"Donation-module__aa0PXq__input",label:"Donation-module__aa0PXq__label",main:"Donation-module__aa0PXq__main",receiptInfo:"Donation-module__aa0PXq__receiptInfo",receiptLabel:"Donation-module__aa0PXq__receiptLabel",receiptNo:"Donation-module__aa0PXq__receiptNo",receiptTitle:"Donation-module__aa0PXq__receiptTitle",receiptValue:"Donation-module__aa0PXq__receiptValue",resetButton:"Donation-module__aa0PXq__resetButton",sectionTitle:"Donation-module__aa0PXq__sectionTitle",submitButton:"Donation-module__aa0PXq__submitButton",successActions:"Donation-module__aa0PXq__successActions",successCard:"Donation-module__aa0PXq__successCard",successIcon:"Donation-module__aa0PXq__successIcon",successMessage:"Donation-module__aa0PXq__successMessage",successNote:"Donation-module__aa0PXq__successNote",successTitle:"Donation-module__aa0PXq__successTitle",textarea:"Donation-module__aa0PXq__textarea",title:"Donation-module__aa0PXq__title",upiContainer:"Donation-module__aa0PXq__upiContainer",upiId:"Donation-module__aa0PXq__upiId",upiIdContainer:"Donation-module__aa0PXq__upiIdContainer",upiIdLabel:"Donation-module__aa0PXq__upiIdLabel",upiImage:"Donation-module__aa0PXq__upiImage",upiText:"Donation-module__aa0PXq__upiText"})},38248,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(71987),e=a.i(38246),f=a.i(64690),g=a.i(97955);a.s(["default",0,function(){let[a,h]=(0,c.useState)("ND-001"),[i,j]=(0,c.useState)(!1),[k,l]=(0,c.useState)(""),[m,n]=(0,c.useState)(null),[o,p]=(0,c.useState)({userUpiId:"",donatedBy:"",streetAddress:"",city:"",state:"",zip:"",dateOfDonation:"",donationValue:"",description:"",taxId:""});(0,c.useEffect)(()=>{(async()=>{try{let a=await fetch("/api/donation/receipt-no");if(a.ok){let b=await a.json();h(b.receiptNo||"ND-001")}else h("ND-001")}catch(a){console.error("Error fetching receipt number:",a),h("ND-001")}})()},[]);let q=a=>{let{name:b,value:c}=a.target;p(a=>({...a,[b]:c}))},r=async b=>{b.preventDefault();try{let b=await fetch("/api/donate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({receiptNo:a,...o})}),c=await b.json();if(b.ok&&c.success){let b={receiptNo:c.receiptNo||a,...o};n(b),l(c.receiptNo||a),j(!0),p({userUpiId:"",donatedBy:"",streetAddress:"",city:"",state:"",zip:"",dateOfDonation:"",donationValue:"",description:"",taxId:""})}else alert(`Donation submission failed: ${c.error||"Unknown error"}`)}catch(b){console.error("Error submitting donation:",b);let a=b instanceof Error?b.message:"Unknown error";a.includes("fetch failed")||a.includes("ECONNREFUSED")?alert("Cannot connect to server. Please ensure the backend server is running on http://localhost:3001"):alert(`An error occurred while submitting the donation: ${a}. Please try again.`)}};return i?(0,b.jsxs)("main",{className:g.default.main,children:[(0,b.jsx)(f.default,{}),(0,b.jsx)("div",{className:g.default.container,children:(0,b.jsxs)("div",{className:g.default.successCard,children:[(0,b.jsx)("div",{className:g.default.successIcon,children:"✓"}),(0,b.jsx)("h1",{className:g.default.successTitle,children:"Donation Successful!"}),(0,b.jsx)("p",{className:g.default.successMessage,children:"Thank you for your generous donation to Naad Dhyas Foundation."}),(0,b.jsxs)("div",{className:g.default.receiptInfo,children:[(0,b.jsx)("p",{className:g.default.receiptLabel,children:"Receipt Number:"}),(0,b.jsx)("p",{className:g.default.receiptValue,children:k})]}),(0,b.jsx)("p",{className:g.default.successNote,children:"Your donation has been recorded successfully. A receipt has been generated for your records."}),(0,b.jsxs)("div",{className:g.default.successActions,children:[(0,b.jsx)("button",{onClick:()=>{if(!m)return;let a=window.open("","_blank");if(!a)return;let b=new Date(m.dateOfDonation).toLocaleDateString("en-IN",{year:"numeric",month:"long",day:"numeric"});a.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Donation Receipt - ${m.receiptNo}</title>
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
                        <p><strong>Receipt No:</strong> ${m.receiptNo}</p>
                        <p><strong>Date:</strong> ${b}</p>
                    </div>
                </div>

                <div class="info-section">
                    <h3>Donor Information</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Donated By:</label>
                            <span>${m.donatedBy}</span>
                        </div>
                        <div class="info-item">
                            <label>User UPI ID:</label>
                            <span>${m.userUpiId}</span>
                        </div>
                        <div class="info-item">
                            <label>Street Address:</label>
                            <span>${m.streetAddress}</span>
                        </div>
                        <div class="info-item">
                            <label>City:</label>
                            <span>${m.city}</span>
                        </div>
                        <div class="info-item">
                            <label>State:</label>
                            <span>${m.state}</span>
                        </div>
                        <div class="info-item">
                            <label>Zip Code:</label>
                            <span>${m.zip}</span>
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
                                    ${m.description}
                                </div>
                            </td>
                            <td class="amount-cell">₹${parseFloat(m.donationValue).toLocaleString("en-IN")}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td style="text-align: right;"><strong>Total Donation:</strong></td>
                            <td class="amount-cell">₹${parseFloat(m.donationValue).toLocaleString("en-IN")}</td>
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
        `),a.document.close()},className:g.default.downloadButton,children:"📄 Download Receipt"}),(0,b.jsx)("button",{onClick:()=>{j(!1),fetch("/api/donation/receipt-no").then(a=>a.json()).then(a=>h(a.receiptNo||"ND-001")).catch(()=>h("ND-001"))},className:g.default.backButton,children:"Back to Donation"}),(0,b.jsx)(e.default,{href:"/",className:g.default.homeButton,children:"Visit Home Page"})]})]})})]}):(0,b.jsxs)("main",{className:g.default.main,children:[(0,b.jsx)(f.default,{}),(0,b.jsx)("div",{className:g.default.container,children:(0,b.jsxs)("div",{className:g.default.formCard,children:[(0,b.jsxs)("div",{className:g.default.header,children:[(0,b.jsxs)("div",{className:g.default.headerLeft,children:[(0,b.jsx)("h1",{className:g.default.title,children:"Naad Dhyas Foundation"}),(0,b.jsx)("p",{className:g.default.address,children:"At post Deravan"}),(0,b.jsx)("p",{className:g.default.address,children:"Tal : Patan , Dist : Satara"})]}),(0,b.jsx)("div",{className:g.default.headerRight,children:(0,b.jsx)("h2",{className:g.default.receiptTitle,children:"Donation Receipt"})})]}),(0,b.jsxs)("form",{onSubmit:r,className:g.default.form,children:[(0,b.jsxs)("div",{className:g.default.formSection,children:[(0,b.jsx)("h3",{className:g.default.sectionTitle,children:"Donor Information"}),(0,b.jsxs)("div",{className:g.default.upiContainer,children:[(0,b.jsx)(d.default,{src:"/UPI.png",alt:"UPI Payment QR Code",width:250,height:250,className:g.default.upiImage,priority:!0}),(0,b.jsxs)("div",{className:g.default.upiIdContainer,children:[(0,b.jsx)("p",{className:g.default.upiIdLabel,children:"UPI ID:"}),(0,b.jsx)("p",{className:g.default.upiId,children:"krdmr011246011@yesbank"})]}),(0,b.jsx)("p",{className:g.default.upiText,children:"Scan to make payment via UPI"})]}),(0,b.jsxs)("div",{className:g.default.formGroup,children:[(0,b.jsx)("label",{className:g.default.label,children:"User UPI ID: *"}),(0,b.jsx)("input",{type:"text",name:"userUpiId",value:o.userUpiId,onChange:q,className:g.default.input,required:!0,placeholder:"Enter your UPI ID (e.g., yourname@paytm)"})]}),(0,b.jsxs)("div",{className:g.default.formGroup,children:[(0,b.jsx)("label",{className:g.default.label,children:"Donated By: *"}),(0,b.jsx)("input",{type:"text",name:"donatedBy",value:o.donatedBy,onChange:q,className:g.default.input,required:!0,placeholder:"Enter donor name"})]}),(0,b.jsxs)("div",{className:g.default.formGroup,children:[(0,b.jsx)("label",{className:g.default.label,children:"Street Address: *"}),(0,b.jsx)("input",{type:"text",name:"streetAddress",value:o.streetAddress,onChange:q,className:g.default.input,required:!0,placeholder:"Enter street address"})]}),(0,b.jsxs)("div",{className:g.default.formRow,children:[(0,b.jsxs)("div",{className:g.default.formGroup,children:[(0,b.jsx)("label",{className:g.default.label,children:"City: *"}),(0,b.jsx)("input",{type:"text",name:"city",value:o.city,onChange:q,className:g.default.input,required:!0,placeholder:"Enter city"})]}),(0,b.jsxs)("div",{className:g.default.formGroup,children:[(0,b.jsx)("label",{className:g.default.label,children:"State: *"}),(0,b.jsx)("input",{type:"text",name:"state",value:o.state,onChange:q,className:g.default.input,required:!0,placeholder:"Enter state"})]}),(0,b.jsxs)("div",{className:g.default.formGroup,children:[(0,b.jsx)("label",{className:g.default.label,children:"Zip: *"}),(0,b.jsx)("input",{type:"text",name:"zip",value:o.zip,onChange:q,className:g.default.input,required:!0,placeholder:"Enter zip code",pattern:"[0-9]{6}",maxLength:6})]})]}),(0,b.jsxs)("div",{className:g.default.formGroup,children:[(0,b.jsx)("label",{className:g.default.label,children:"Date of Donation: *"}),(0,b.jsx)("input",{type:"date",name:"dateOfDonation",value:o.dateOfDonation,onChange:q,className:g.default.input,required:!0})]}),(0,b.jsxs)("div",{className:g.default.formGroup,children:[(0,b.jsx)("label",{className:g.default.label,children:"Donation Value: *"}),(0,b.jsx)("input",{type:"number",name:"donationValue",value:o.donationValue,onChange:q,className:g.default.input,required:!0,placeholder:"Enter donation amount (₹)",min:"1",step:"0.01"})]}),(0,b.jsxs)("div",{className:g.default.formGroup,children:[(0,b.jsx)("label",{className:g.default.label,children:"Description of Donation: *"}),(0,b.jsx)("textarea",{name:"description",value:o.description,onChange:q,className:g.default.textarea,required:!0,placeholder:"Enter description of donation",rows:4})]}),(0,b.jsxs)("div",{className:g.default.formGroup,children:[(0,b.jsx)("label",{className:g.default.label,children:"Tax ID Field:"}),(0,b.jsx)("input",{type:"text",name:"taxId",value:o.taxId,onChange:q,className:g.default.input,disabled:!0,placeholder:"Tax ID (will be enabled later)"}),(0,b.jsx)("p",{className:g.default.helpText,children:"This field is currently disabled and will be enabled later"})]})]}),(0,b.jsxs)("div",{className:g.default.formActions,children:[(0,b.jsx)("button",{type:"submit",className:g.default.submitButton,children:"Submit Donation"}),(0,b.jsx)("button",{type:"button",className:g.default.resetButton,onClick:()=>{p({userUpiId:"",donatedBy:"",streetAddress:"",city:"",state:"",zip:"",dateOfDonation:"",donationValue:"",description:"",taxId:""})},children:"Reset Form"})]})]})]})})]})}])}];

//# sourceMappingURL=app_donation_1l_mo2w._.js.map