module.exports=[24612,a=>{a.v({admissionFormBody:"AdmissionForm-module__KDI9na__admissionFormBody",admissionFormCard:"AdmissionForm-module__KDI9na__admissionFormCard",admissionFormContainer:"AdmissionForm-module__KDI9na__admissionFormContainer",admissionFormFooter:"AdmissionForm-module__KDI9na__admissionFormFooter",admissionFormHeader:"AdmissionForm-module__KDI9na__admissionFormHeader",admissionFormInfo:"AdmissionForm-module__KDI9na__admissionFormInfo",admissionFormLabel:"AdmissionForm-module__KDI9na__admissionFormLabel",admissionFormRow:"AdmissionForm-module__KDI9na__admissionFormRow",admissionFormSubtitle:"AdmissionForm-module__KDI9na__admissionFormSubtitle",admissionFormTitle:"AdmissionForm-module__KDI9na__admissionFormTitle",admissionFormValue:"AdmissionForm-module__KDI9na__admissionFormValue",downloadButton:"AdmissionForm-module__KDI9na__downloadButton",errorContainer:"AdmissionForm-module__KDI9na__errorContainer",errorMessage:"AdmissionForm-module__KDI9na__errorMessage",errorTitle:"AdmissionForm-module__KDI9na__errorTitle",loadingContainer:"AdmissionForm-module__KDI9na__loadingContainer",loadingText:"AdmissionForm-module__KDI9na__loadingText",spin:"AdmissionForm-module__KDI9na__spin",spinner:"AdmissionForm-module__KDI9na__spinner"})},14892,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(92376),e=a.i(24612),f=a.i(65244);a.s(["default",0,function(){let[a,g]=(0,c.useState)(null),[h,i]=(0,c.useState)(!0),[j,k]=(0,c.useState)(""),l=(0,d.useRouter)();(0,c.useEffect)(()=>{let a=sessionStorage.getItem("studentId");a?m(a):l.push("/student/login")},[l]);let m=async a=>{try{let b=await fetch(`/api/student/${a}`),c=await b.json();b.ok?g(c):k(c.error||"Failed to fetch data")}catch(a){console.error("Error:",a),k("An error occurred")}finally{i(!1)}};return h?(0,b.jsxs)("div",{className:e.default.loadingContainer,children:[(0,b.jsx)("div",{className:e.default.spinner}),(0,b.jsx)("p",{className:e.default.loadingText,children:"Loading admission form..."})]}):j||!a?(0,b.jsxs)("div",{className:e.default.errorContainer,children:[(0,b.jsx)("h2",{className:e.default.errorTitle,children:"Error"}),(0,b.jsx)("p",{className:e.default.errorMessage,children:j||"No data"})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("header",{className:f.default.header,children:(0,b.jsx)("div",{className:f.default.headerLeft,children:(0,b.jsx)("h1",{className:f.default.headerTitle,children:"Admission Form"})})}),(0,b.jsx)("main",{className:f.default.contentArea,children:(0,b.jsx)("div",{className:e.default.admissionFormContainer,children:(0,b.jsxs)("div",{className:e.default.admissionFormCard,children:[(0,b.jsxs)("div",{className:e.default.admissionFormHeader,children:[(0,b.jsx)("h2",{className:e.default.admissionFormTitle,children:"📋 Admission Form"}),(0,b.jsx)("p",{className:e.default.admissionFormSubtitle,children:"Download your admission form in PDF format"})]}),(0,b.jsx)("div",{className:e.default.admissionFormBody,children:(0,b.jsxs)("div",{className:e.default.admissionFormInfo,children:[(0,b.jsxs)("div",{className:e.default.admissionFormRow,children:[(0,b.jsx)("span",{className:e.default.admissionFormLabel,children:"Form No:"}),(0,b.jsx)("span",{className:e.default.admissionFormValue,children:a.formNo||"N/A"})]}),(0,b.jsxs)("div",{className:e.default.admissionFormRow,children:[(0,b.jsx)("span",{className:e.default.admissionFormLabel,children:"Student Name:"}),(0,b.jsx)("span",{className:e.default.admissionFormValue,children:a.fullName})]}),(0,b.jsxs)("div",{className:e.default.admissionFormRow,children:[(0,b.jsx)("span",{className:e.default.admissionFormLabel,children:"Branch:"}),(0,b.jsx)("span",{className:e.default.admissionFormValue,children:a.branch})]}),(0,b.jsxs)("div",{className:e.default.admissionFormRow,children:[(0,b.jsx)("span",{className:e.default.admissionFormLabel,children:"Admission Date:"}),(0,b.jsx)("span",{className:e.default.admissionFormValue,children:a.admissionDate?new Date(a.admissionDate).toLocaleDateString("en-IN"):"N/A"})]})]})}),(0,b.jsx)("div",{className:e.default.admissionFormFooter,children:(0,b.jsx)("button",{onClick:()=>{if(!a)return;let b=window.open("","_blank");if(!b)return;let c=Array.isArray(a.phone)?a.phone.join(""):a.phone||"";b.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Admission Form - ${a.fullName}</title>
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
                        <p><strong>Form No:</strong> ${a.formNo||"N/A"}</p>
                        <p><strong>Admission ID:</strong> ${a.admissionId}</p>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Personal Information</h3>
                    <div class="form-container">
                        <div class="form-fields">
                            <div class="form-field">
                                <label>Name:</label>
                                <div class="line">${a.fullName||""}</div>
                            </div>
                            <div class="form-field">
                                <label>DOB:</label>
                                <div class="line">${a.dateOfBirth?new Date(a.dateOfBirth).toLocaleDateString("en-IN"):""}</div>
                            </div>
                            <div class="form-field">
                                <label>Aadhaar No:</label>
                                <div class="line">${a.aadharCard||""}</div>
                            </div>
                            <div class="form-field">
                                <label>Mobile:</label>
                                <div class="line">${c||""}</div>
                            </div>
                            <div class="form-field">
                                <label>Email:</label>
                                <div class="line">${a.email||""}</div>
                            </div>
                        </div>
                        <div class="photo-box">
                            ${a.photo?`<img src="${a.photo}" alt="Student Photo" />`:'<div class="photo-placeholder">PHOTO</div>'}
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Additional Information</h3>
                    <table class="info-table">
                        <tr>
                            <td>Form No:</td>
                            <td>${a.formNo||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>${a.address||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>PAN Card:</td>
                            <td>${a.panCard||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Branch:</td>
                            <td>${a.branch||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Admission Date:</td>
                            <td>${a.admissionDate?new Date(a.admissionDate).toLocaleDateString("en-IN"):"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Age:</td>
                            <td>${a.age||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Instrumental:</td>
                            <td>${a.instrumental||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Indian Classical Vocal:</td>
                            <td>${a.vocal||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Dance:</td>
                            <td>${a.dance||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Diploma Admission Year:</td>
                            <td>${a.diplomaAdmissionYear||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Joining Date:</td>
                            <td>${a.joiningDate?new Date(a.joiningDate).toLocaleDateString("en-IN"):"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Educational / Job Details:</td>
                            <td>${a.educationalActivities||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Amount Paid:</td>
                            <td>₹${a.amountPaid||0}</td>
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
        `),b.document.close()},className:e.default.downloadButton,children:"📥 Download Admission Form (PDF)"})})]})})})]})}])}];

//# sourceMappingURL=app_student_admission-form_15_53_4._.js.map