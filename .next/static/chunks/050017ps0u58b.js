(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,37e3,i=>{i.v({admissionFormBody:"AdmissionForm-module__KDI9na__admissionFormBody",admissionFormCard:"AdmissionForm-module__KDI9na__admissionFormCard",admissionFormContainer:"AdmissionForm-module__KDI9na__admissionFormContainer",admissionFormFooter:"AdmissionForm-module__KDI9na__admissionFormFooter",admissionFormHeader:"AdmissionForm-module__KDI9na__admissionFormHeader",admissionFormInfo:"AdmissionForm-module__KDI9na__admissionFormInfo",admissionFormLabel:"AdmissionForm-module__KDI9na__admissionFormLabel",admissionFormRow:"AdmissionForm-module__KDI9na__admissionFormRow",admissionFormSubtitle:"AdmissionForm-module__KDI9na__admissionFormSubtitle",admissionFormTitle:"AdmissionForm-module__KDI9na__admissionFormTitle",admissionFormValue:"AdmissionForm-module__KDI9na__admissionFormValue",downloadButton:"AdmissionForm-module__KDI9na__downloadButton",errorContainer:"AdmissionForm-module__KDI9na__errorContainer",errorMessage:"AdmissionForm-module__KDI9na__errorMessage",errorTitle:"AdmissionForm-module__KDI9na__errorTitle",loadingContainer:"AdmissionForm-module__KDI9na__loadingContainer",loadingText:"AdmissionForm-module__KDI9na__loadingText",spin:"AdmissionForm-module__KDI9na__spin",spinner:"AdmissionForm-module__KDI9na__spinner"})},88327,i=>{"use strict";var o=i.i(43476),e=i.i(71645),a=i.i(18566),t=i.i(37e3),s=i.i(74206);i.s(["default",0,function(){let[i,d]=(0,e.useState)(null),[n,r]=(0,e.useState)(!0),[l,m]=(0,e.useState)(""),c=(0,a.useRouter)();(0,e.useEffect)(()=>{let i=sessionStorage.getItem("studentId");i?p(i):c.push("/student/login")},[c]);let p=async i=>{try{let o=await fetch(`/api/student/${i}`),e=await o.json();o.ok?d(e):m(e.error||"Failed to fetch data")}catch(i){console.error("Error:",i),m("An error occurred")}finally{r(!1)}};return n?(0,o.jsxs)("div",{className:t.default.loadingContainer,children:[(0,o.jsx)("div",{className:t.default.spinner}),(0,o.jsx)("p",{className:t.default.loadingText,children:"Loading admission form..."})]}):l||!i?(0,o.jsxs)("div",{className:t.default.errorContainer,children:[(0,o.jsx)("h2",{className:t.default.errorTitle,children:"Error"}),(0,o.jsx)("p",{className:t.default.errorMessage,children:l||"No data"})]}):(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("header",{className:s.default.header,children:(0,o.jsx)("div",{className:s.default.headerLeft,children:(0,o.jsx)("h1",{className:s.default.headerTitle,children:"Admission Form"})})}),(0,o.jsx)("main",{className:s.default.contentArea,children:(0,o.jsx)("div",{className:t.default.admissionFormContainer,children:(0,o.jsxs)("div",{className:t.default.admissionFormCard,children:[(0,o.jsxs)("div",{className:t.default.admissionFormHeader,children:[(0,o.jsx)("h2",{className:t.default.admissionFormTitle,children:"📋 Admission Form"}),(0,o.jsx)("p",{className:t.default.admissionFormSubtitle,children:"Download your admission form in PDF format"})]}),(0,o.jsx)("div",{className:t.default.admissionFormBody,children:(0,o.jsxs)("div",{className:t.default.admissionFormInfo,children:[(0,o.jsxs)("div",{className:t.default.admissionFormRow,children:[(0,o.jsx)("span",{className:t.default.admissionFormLabel,children:"Form No:"}),(0,o.jsx)("span",{className:t.default.admissionFormValue,children:i.formNo||"N/A"})]}),(0,o.jsxs)("div",{className:t.default.admissionFormRow,children:[(0,o.jsx)("span",{className:t.default.admissionFormLabel,children:"Student Name:"}),(0,o.jsx)("span",{className:t.default.admissionFormValue,children:i.fullName})]}),(0,o.jsxs)("div",{className:t.default.admissionFormRow,children:[(0,o.jsx)("span",{className:t.default.admissionFormLabel,children:"Branch:"}),(0,o.jsx)("span",{className:t.default.admissionFormValue,children:i.branch})]}),(0,o.jsxs)("div",{className:t.default.admissionFormRow,children:[(0,o.jsx)("span",{className:t.default.admissionFormLabel,children:"Admission Date:"}),(0,o.jsx)("span",{className:t.default.admissionFormValue,children:i.admissionDate?new Date(i.admissionDate).toLocaleDateString("en-IN"):"N/A"})]})]})}),(0,o.jsx)("div",{className:t.default.admissionFormFooter,children:(0,o.jsx)("button",{onClick:()=>{if(!i)return;let o=window.open("","_blank");if(!o)return;let e=Array.isArray(i.phone)?i.phone.join(""):i.phone||"";o.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Admission Form - ${i.fullName}</title>
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
                        padding: 8px;
                        color: #000;
                        background: white;
                        font-size: 10px;
                        line-height: 1.2;
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        border-bottom: 2px solid #8b0000;
                        padding-bottom: 8px;
                        margin-bottom: 10px;
                    }
                    .header-left {
                        text-align: left;
                    }
                    .header-left h1 {
                        color: #8b0000;
                        margin: 0 0 2px 0;
                        font-size: 16px;
                        font-weight: bold;
                        line-height: 1.1;
                    }
                    .header-left p {
                        margin: 1px 0;
                        font-size: 9px;
                        color: #333;
                        line-height: 1.1;
                    }
                    .header-right {
                        text-align: right;
                    }
                    .header-right h2 {
                        color: #8b0000;
                        margin: 0;
                        font-size: 16px;
                        font-weight: bold;
                        line-height: 1.1;
                    }
                    .header-right p {
                        margin: 3px 0 0 0;
                        font-size: 9px;
                        color: #333;
                    }
                    .form-section {
                        margin-bottom: 8px;
                        page-break-inside: avoid;
                    }
                    .form-section h3 {
                        color: #8b0000;
                        border-bottom: 1.5px solid #8b0000;
                        padding-bottom: 3px;
                        margin-bottom: 6px;
                        font-size: 11px;
                        font-weight: bold;
                    }
                    .form-container {
                        display: flex;
                        gap: 10px;
                        margin-bottom: 8px;
                    }
                    .form-fields {
                        flex: 1;
                        border: 1.5px solid #333;
                        padding: 8px;
                    }
                    .form-field {
                        display: flex;
                        align-items: center;
                        margin-bottom: 6px;
                        min-height: 18px;
                    }
                    .form-field label {
                        font-weight: bold;
                        min-width: 80px;
                        margin-right: 5px;
                        color: #000;
                        font-size: 9px;
                    }
                    .form-field .line {
                        flex: 1;
                        border-bottom: 1px solid #000;
                        min-height: 16px;
                        padding-left: 3px;
                        color: #000;
                        font-size: 9px;
                    }
                    .photo-box {
                        width: 90px;
                        height: 110px;
                        border: 1.5px solid #333;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #f9f9f9;
                        flex-shrink: 0;
                    }
                    .photo-box img {
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: cover;
                    }
                    .photo-box .photo-placeholder {
                        text-align: center;
                        color: #666;
                        font-size: 8px;
                        padding: 5px;
                    }
                    .info-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 5px;
                        font-size: 9px;
                    }
                    .info-table td {
                        padding: 4px 6px;
                        border: 1px solid #ddd;
                        line-height: 1.2;
                    }
                    .info-table td:first-child {
                        width: 28%;
                        font-weight: bold;
                    }
                    .terms-section {
                        margin-top: 8px;
                    }
                    .terms-section ul {
                        margin: 4px 0;
                        padding-left: 18px;
                        line-height: 1.3;
                        font-size: 8px;
                        color: #333;
                    }
                    .terms-section li {
                        margin-bottom: 2px;
                    }
                    .terms-section p {
                        margin-top: 6px;
                        font-weight: bold;
                        font-size: 9px;
                    }
                    .signature-section {
                        margin-top: 12px;
                        display: flex;
                        justify-content: space-around;
                        page-break-inside: avoid;
                    }
                    .signature-box {
                        text-align: center;
                        width: 150px;
                        border-top: 1.5px solid #333;
                        padding-top: 5px;
                        margin-top: 30px;
                        font-size: 8px;
                    }
                    .signature-box p {
                        margin: 0;
                        font-size: 8px;
                    }
                    .footer {
                        margin-top: 10px;
                        text-align: center;
                        font-size: 8px;
                        color: #666;
                        border-top: 1px solid #ddd;
                        padding-top: 5px;
                        line-height: 1.2;
                    }
                    .footer p {
                        margin: 2px 0;
                    }
                    .no-print {
                        text-align: center;
                        margin-top: 20px;
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
                    .no-print button:hover {
                        background: #a00000;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="header-left">
                        <h1>Swargumphan Sangeet Vidyalaya</h1>
                        <p>run by Naad dhyas Foundation</p>
                    </div>
                    <div class="header-right">
                        <h2>Admission Form</h2>
                        <p><strong>Form No:</strong> ${i.formNo||"N/A"}</p>
                        <p><strong>Admission ID:</strong> ${i.admissionId}</p>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Personal Information</h3>
                    <div class="form-container">
                        <div class="form-fields">
                            <div class="form-field">
                                <label>Name:</label>
                                <div class="line">${i.fullName||""}</div>
                            </div>
                            <div class="form-field">
                                <label>DOB:</label>
                                <div class="line">${i.dateOfBirth?new Date(i.dateOfBirth).toLocaleDateString("en-IN"):""}</div>
                            </div>
                            <div class="form-field">
                                <label>Aadhaar No:</label>
                                <div class="line">${i.aadharCard||""}</div>
                            </div>
                            <div class="form-field">
                                <label>Mobile:</label>
                                <div class="line">${e||""}</div>
                            </div>
                            <div class="form-field">
                                <label>Email:</label>
                                <div class="line">${i.email||""}</div>
                            </div>
                        </div>
                        <div class="photo-box">
                            ${i.photo?`<img src="${i.photo}" alt="Student Photo" />`:'<div class="photo-placeholder">PHOTO</div>'}
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Additional Information</h3>
                    <table class="info-table">
                        <tr>
                            <td>Form No:</td>
                            <td>${i.formNo||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>${i.address||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>PAN Card:</td>
                            <td>${i.panCard||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Branch:</td>
                            <td>${i.branch||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Admission Date:</td>
                            <td>${i.admissionDate?new Date(i.admissionDate).toLocaleDateString("en-IN"):"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Age:</td>
                            <td>${i.age||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Instrumental:</td>
                            <td>${i.instrumental||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Indian Classical Vocal:</td>
                            <td>${i.vocal||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Dance:</td>
                            <td>${i.dance||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Diploma Admission Year:</td>
                            <td>${i.diplomaAdmissionYear||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Joining Date:</td>
                            <td>${i.joiningDate?new Date(i.joiningDate).toLocaleDateString("en-IN"):"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Educational / Job Details:</td>
                            <td>${i.educationalActivities||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Amount Paid:</td>
                            <td>₹${i.amountPaid||0}</td>
                        </tr>
                    </table>
                </div>

                <div class="form-section terms-section">
                    <h3>Terms & Conditions</h3>
                    <ul>
                        <li>Admissions allowed above age 7.</li>
                        <li>Minimum 2 months' fee should be paid.</li>
                        <li>No concession for absents or discontinuation.</li>
                        <li>Discipline and timely presence are essential.</li>
                        <li>Practice daily for 45 to 60 minutes.</li>
                        <li>10% discount on annual payment.</li>
                    </ul>
                    <p>I understand all the rules and regulations. ✓</p>
                </div>

                <div class="signature-section">
                    <div class="signature-box">
                        <p><strong>Student Signature</strong></p>
                    </div>
                    <div class="signature-box">
                        <p><strong>Parent/Guardian Signature</strong></p>
                    </div>
                    <div class="signature-box">
                        <p><strong>Teacher Signature</strong></p>
                    </div>
                </div>

                <div class="footer">
                    <p>This is a computer generated admission form.</p>
                    <p>Generated on: ${new Date().toLocaleString()}</p>
                </div>

                <div class="no-print">
                    <button onclick="window.print()">🖨️ Print / Download PDF</button>
                    <button onclick="window.close()">Close</button>
                </div>

                <script>
                    window.onload = function() {
                        // Form is ready for printing/downloading as PDF
                    }
                </script>
            </body>
            </html>
        `),o.document.close()},className:t.default.downloadButton,children:"📥 Download Admission Form (PDF)"})})]})})})]})}])}]);