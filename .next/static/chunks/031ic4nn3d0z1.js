(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33354,e=>{e.v({amountDisplay:"RegisterForm-module__6gsl6a__amountDisplay",checkbox:"RegisterForm-module__6gsl6a__checkbox",checkboxGroup:"RegisterForm-module__6gsl6a__checkboxGroup",checkboxLabel:"RegisterForm-module__6gsl6a__checkboxLabel",digitInput:"RegisterForm-module__6gsl6a__digitInput",formGroup:"RegisterForm-module__6gsl6a__formGroup",formSection:"RegisterForm-module__6gsl6a__formSection",formTitle:"RegisterForm-module__6gsl6a__formTitle",header:"RegisterForm-module__6gsl6a__header",imageOverlay:"RegisterForm-module__6gsl6a__imageOverlay",imageSection:"RegisterForm-module__6gsl6a__imageSection",input:"RegisterForm-module__6gsl6a__input",label:"RegisterForm-module__6gsl6a__label",mainContainer:"RegisterForm-module__6gsl6a__mainContainer",musicCategory:"RegisterForm-module__6gsl6a__musicCategory",musicGrid:"RegisterForm-module__6gsl6a__musicGrid",orgName:"RegisterForm-module__6gsl6a__orgName",pageWrapper:"RegisterForm-module__6gsl6a__pageWrapper",paymentOptionLabel:"RegisterForm-module__6gsl6a__paymentOptionLabel",paymentOptions:"RegisterForm-module__6gsl6a__paymentOptions",paymentSection:"RegisterForm-module__6gsl6a__paymentSection",paymentTitle:"RegisterForm-module__6gsl6a__paymentTitle",phoneInputs:"RegisterForm-module__6gsl6a__phoneInputs",pulse:"RegisterForm-module__6gsl6a__pulse",qrContainer:"RegisterForm-module__6gsl6a__qrContainer",qrImage:"RegisterForm-module__6gsl6a__qrImage",row:"RegisterForm-module__6gsl6a__row",scaleUp:"RegisterForm-module__6gsl6a__scaleUp",sectionTitle:"RegisterForm-module__6gsl6a__sectionTitle",selected:"RegisterForm-module__6gsl6a__selected",submitBtn:"RegisterForm-module__6gsl6a__submitBtn",successContent:"RegisterForm-module__6gsl6a__successContent",successIcon:"RegisterForm-module__6gsl6a__successIcon",successOverlay:"RegisterForm-module__6gsl6a__successOverlay",termsList:"RegisterForm-module__6gsl6a__termsList",termsSection:"RegisterForm-module__6gsl6a__termsSection",upiId:"RegisterForm-module__6gsl6a__upiId",videoBackground:"RegisterForm-module__6gsl6a__videoBackground",videoOverlay:"RegisterForm-module__6gsl6a__videoOverlay"})},82780,e=>{"use strict";var a=e.i(43476),t=e.i(71645),i=e.i(33354);e.s(["default",0,function(){let[e,l]=(0,t.useState)({Admissiondate:new Date().toISOString().split("T")[0],branch:"Karmaveer Nagar Society",formNo:"",name:"",address:"",phone:Array(10).fill(""),dob:"",age:"",email:"",panCard:"",aadharCard:"",photo:"",instrumentalSubject:"",danceSubject:"",vocalSubject:"",diplomaAdmissionYear:"",educationalActivities:"",joiningDate:"",signatures:{student:"",parent:"",teacher:""},termsAgreed:!1,paymentMode:"full",amountPaying:200,transactionId:"",isSubmitted:!1});(0,t.useEffect)(()=>{(async()=>{if(e.branch)try{let a=await fetch(`/api/getNextFormNo?branch=${encodeURIComponent(e.branch)}`),t=await a.json();t.formNo&&l(e=>({...e,formNo:t.formNo}))}catch(e){console.error("Failed to fetch form no",e)}})()},[e.branch]);let s=async a=>{if(a.preventDefault(),!e.termsAgreed)return void alert("Please agree to the terms and conditions");if(!e.name||""===e.name.trim())return void alert("Please enter Full Name");if(!e.address||""===e.address.trim())return void alert("Please enter Address");let t=e.phone.join("");if(!t||10!==t.length)return void alert("Please enter a valid 10-digit Mobile Number");if(!e.dob)return void alert("Please enter Date of Birth");if(!e.age||""===e.age.trim())return void alert("Please enter Age");if(!e.panCard||""===e.panCard.trim())return void alert("Please enter PAN Card Number");if(!e.aadharCard||""===e.aadharCard.trim())return void alert("Please enter Aadhar Card Number");if(!e.diplomaAdmissionYear||""===e.diplomaAdmissionYear.trim())return void alert("Please select Year");if(!e.joiningDate)return void alert("Please enter Joining Date");if(!e.transactionId||""===e.transactionId.trim())return void alert("Please enter UPI ID");let i=e.instrumentalSubject?[e.instrumentalSubject]:[],s=e.danceSubject?[e.danceSubject]:[];try{let a=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...e,instruments:i,mainStyles:s})}),t=await a.json();a.ok?(l(e=>({...e,isSubmitted:!0})),console.log("Form submitted:",t),localStorage.setItem("lastStudentId",t.studentId),localStorage.setItem("admissionFormData",JSON.stringify({...e,studentId:t.studentId,formNo:t.formNo}))):alert("Registration failed: "+t.error)}catch(e){console.error("Submission error:",e),alert("An error occurred during submission.")}},r=e=>{let{name:a,value:t}=e.target;"instrumentalSubject"===a?l(e=>({...e,instrumentalSubject:t,...t?{vocalSubject:"",danceSubject:""}:{}})):"vocalSubject"===a?l(e=>({...e,vocalSubject:t,...t?{instrumentalSubject:"",danceSubject:""}:{}})):"danceSubject"===a?l(e=>({...e,danceSubject:t,...t?{instrumentalSubject:"",vocalSubject:""}:{}})):l(e=>({...e,[a]:t}))};return(0,a.jsxs)("div",{className:i.default.pageWrapper,children:[(0,a.jsxs)("div",{className:i.default.mainContainer,children:[(0,a.jsx)("div",{className:i.default.imageSection,children:(0,a.jsxs)("div",{className:i.default.imageOverlay,children:[(0,a.jsx)("h2",{children:"Welcome to Swargumphan"}),(0,a.jsx)("p",{children:"Begin your musical journey with us"})]})}),(0,a.jsxs)("div",{className:i.default.formSection,children:[(0,a.jsxs)("div",{className:i.default.header,children:[(0,a.jsx)("h1",{className:i.default.orgName,children:"Swargumphan Classes"}),(0,a.jsx)("h2",{className:i.default.formTitle,children:"Admission Form"})]}),(0,a.jsxs)("form",{onSubmit:s,children:[(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsx)("label",{className:i.default.label,children:"Branch"}),(0,a.jsxs)("select",{name:"branch",value:e.branch,onChange:r,className:i.default.input,children:[(0,a.jsx)("option",{value:"Karmaveer Nagar Society",children:"Karmaveer Nagar"}),(0,a.jsx)("option",{value:"Godoli, Satara",children:"Godoli, Satara"}),(0,a.jsx)("option",{value:"Krantismruti, Satara",children:"Krantismruti, Satara"}),(0,a.jsx)("option",{value:"Karad",children:"Karad"})]})]}),(0,a.jsxs)("div",{className:i.default.row,children:[(0,a.jsx)("div",{className:i.default.col,children:(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsx)("label",{className:i.default.label,children:"Admission Date"}),(0,a.jsx)("input",{type:"date",name:"Admissiondate",value:e.Admissiondate,onChange:r,className:i.default.input})]})}),(0,a.jsx)("div",{className:i.default.col,children:(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsx)("label",{className:i.default.label,children:"Form No."}),(0,a.jsx)("input",{type:"text",value:e.formNo,readOnly:!0,className:i.default.input})]})})]}),(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsxs)("label",{className:i.default.label,children:["Full Name ",(0,a.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,a.jsx)("input",{type:"text",name:"name",value:e.name,onChange:r,className:i.default.input,required:!0})]}),(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsxs)("label",{className:i.default.label,children:["Address ",(0,a.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,a.jsx)("input",{type:"text",name:"address",value:e.address,onChange:r,className:i.default.input,required:!0})]}),(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsxs)("label",{className:i.default.label,children:["Mobile ",(0,a.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,a.jsx)("div",{className:i.default.phoneInputs,children:e.phone.map((t,s)=>(0,a.jsx)("input",{id:`phone-${s}`,type:"text",value:t,onChange:a=>((a,t)=>{if(t.length>1)return;let i=[...e.phone];if(i[a]=t,l(e=>({...e,phone:i})),t&&a<9){let e=document.getElementById(`phone-${a+1}`);e?.focus()}})(s,a.target.value),className:i.default.digitInput,maxLength:1},s))})]}),(0,a.jsxs)("div",{className:i.default.row,children:[(0,a.jsx)("div",{className:i.default.col,children:(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsxs)("label",{className:i.default.label,children:["Date of Birth ",(0,a.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,a.jsx)("input",{type:"date",name:"dob",value:e.dob,onChange:r,className:i.default.input,required:!0})]})}),(0,a.jsx)("div",{className:i.default.col,children:(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsxs)("label",{className:i.default.label,children:["Age ",(0,a.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,a.jsx)("input",{type:"number",name:"age",value:e.age,onChange:r,className:i.default.input,required:!0})]})})]}),(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsx)("label",{className:i.default.label,children:"Email ID"}),(0,a.jsx)("input",{type:"email",name:"email",value:e.email,onChange:r,className:i.default.input})]}),(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsxs)("label",{className:i.default.label,children:["PAN Card ",(0,a.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,a.jsx)("input",{type:"text",name:"panCard",value:e.panCard,onChange:r,className:i.default.input,placeholder:"Enter PAN Card Number",maxLength:10,style:{textTransform:"uppercase"},required:!0})]}),(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsxs)("label",{className:i.default.label,children:["Aadhar Card ",(0,a.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,a.jsx)("input",{type:"text",name:"aadharCard",value:e.aadharCard,onChange:r,className:i.default.input,placeholder:"Enter Aadhar Card Number",maxLength:12,required:!0})]}),(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsx)("label",{className:i.default.label,children:"Photo"}),(0,a.jsx)("input",{type:"file",accept:"image/png,image/jpeg,image/jpg",onChange:e=>{let a=e.target.files?.[0];if(!a)return;if(!["image/png","image/jpeg","image/jpg"].includes(a.type.toLowerCase())){alert("Please upload a photo in PNG, JPG, or JPEG format only"),e.target.value="";return}if(a.size>262144){alert("Photo size must be under 256 KB. Please compress the image and try again."),e.target.value="";return}let t=new FileReader;t.onloadend=()=>{let e=t.result;l(a=>({...a,photo:e}))},t.onerror=()=>{alert("Error reading the photo. Please try again."),e.target.value=""},t.readAsDataURL(a)},className:i.default.input,style:{padding:"8px"}}),(0,a.jsxs)("p",{style:{fontSize:"0.85rem",color:"#aaa",marginTop:"8px",marginBottom:0},children:[(0,a.jsx)("strong",{children:"Instructions:"})," Please upload a clear photo in ",(0,a.jsx)("strong",{children:"PNG, JPG, or JPEG format only"}),". Maximum file size: ",(0,a.jsx)("strong",{children:"256 KB"}),". The photo will be used for your admission record."]}),e.photo&&(0,a.jsxs)("div",{style:{marginTop:"10px"},children:[(0,a.jsx)("img",{src:e.photo,alt:"Preview",style:{maxWidth:"150px",maxHeight:"150px",borderRadius:"8px",border:"2px solid #ff3333",objectFit:"cover"}}),(0,a.jsx)("p",{style:{fontSize:"0.8rem",color:"#4CAF50",marginTop:"5px"},children:"✓ Photo uploaded successfully"})]})]}),(0,a.jsx)("h3",{className:i.default.sectionTitle,children:"Music Preferences"}),(0,a.jsxs)("div",{className:i.default.musicGrid,children:[(0,a.jsxs)("div",{className:i.default.musicCategory,children:[(0,a.jsx)("h4",{children:"Instrumental"}),(0,a.jsxs)("select",{name:"instrumentalSubject",value:e.instrumentalSubject,onChange:r,className:i.default.input,disabled:!!(e.vocalSubject||e.danceSubject),children:[(0,a.jsx)("option",{value:"",children:"Select Instrument"}),(0,a.jsx)("option",{value:"Tabla",children:"Tabla"}),(0,a.jsx)("option",{value:"Harmonium",children:"Harmonium"}),(0,a.jsx)("option",{value:"Satar",children:"Satar"}),(0,a.jsx)("option",{value:"Bansuri",children:"Bansuri"}),(0,a.jsx)("option",{value:"Guitar",children:"Guitar"}),(0,a.jsx)("option",{value:"Pakhawaj",children:"Pakhawaj"})]})]}),(0,a.jsxs)("div",{className:i.default.musicCategory,children:[(0,a.jsx)("h4",{children:"Indian classical vocal"}),(0,a.jsxs)("select",{name:"vocalSubject",value:e.vocalSubject,onChange:r,className:i.default.input,disabled:!!(e.instrumentalSubject||e.danceSubject),children:[(0,a.jsx)("option",{value:"",children:"Select Vocal Style"}),(0,a.jsx)("option",{value:"Hindustani Classical Vocal",children:"Hindustani Classical Vocal"}),(0,a.jsx)("option",{value:"Maharashtrian Bhajan",children:"Maharashtrian Bhajan"}),(0,a.jsx)("option",{value:"Light Music",children:"Light Music"})]})]}),(0,a.jsxs)("div",{className:i.default.musicCategory,children:[(0,a.jsx)("h4",{children:"Dance"}),(0,a.jsxs)("select",{name:"danceSubject",value:e.danceSubject,onChange:r,className:i.default.input,disabled:!!(e.instrumentalSubject||e.vocalSubject),children:[(0,a.jsx)("option",{value:"",children:"Select Dance Style"}),(0,a.jsx)("option",{value:"Bharatnatyam",children:"Bharatnatyam"}),(0,a.jsx)("option",{value:"Kathak",children:"Kathak"})]})]})]}),(0,a.jsx)("h3",{className:i.default.sectionTitle,children:"Diploma Admission Year"}),(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsxs)("label",{className:i.default.label,children:["Year ",(0,a.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,a.jsxs)("select",{name:"diplomaAdmissionYear",value:e.diplomaAdmissionYear,onChange:r,className:i.default.input,required:!0,children:[(0,a.jsx)("option",{value:"",disabled:!0,hidden:!0,children:"Select Year"}),(0,a.jsx)("option",{value:"First Year",children:"First Year"}),(0,a.jsx)("option",{value:"Second Year",children:"Second Year"}),(0,a.jsx)("option",{value:"Third Year",children:"Third Year"})]})]}),(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsx)("label",{className:i.default.label,children:"Educational  / Job Details"}),(0,a.jsx)("input",{type:"text",name:"educationalActivities",value:e.educationalActivities,onChange:r,className:i.default.input})]}),(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsxs)("label",{className:i.default.label,children:["Joining Date ",(0,a.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,a.jsx)("input",{type:"date",name:"joiningDate",value:e.joiningDate,onChange:r,className:i.default.input,required:!0})]}),(0,a.jsxs)("div",{className:i.default.paymentSection,children:[(0,a.jsx)("h3",{className:i.default.paymentTitle,children:"Fees"}),(0,a.jsx)("div",{className:i.default.amountDisplay,children:(0,a.jsx)("span",{children:"Total Amount to Pay: ₹200"})}),(0,a.jsxs)("div",{className:i.default.qrContainer,children:[(0,a.jsx)("img",{src:"/UPI.png",alt:"UPI QR Code",className:i.default.qrImage}),(0,a.jsx)("div",{className:i.default.upiId,children:"UPI ID: swargumphan@upi"}),(0,a.jsx)("p",{style:{color:"#666",fontSize:"0.9rem"},children:"Scan with PhonePe / GPay / Paytm"})]}),(0,a.jsxs)("div",{className:i.default.formGroup,children:[(0,a.jsxs)("label",{className:i.default.label,children:["UPI ID ",(0,a.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,a.jsx)("input",{type:"text",name:"transactionId",value:e.transactionId,onChange:e=>l(a=>({...a,transactionId:e.target.value})),placeholder:"Enter UPI ID / UTR Number",className:i.default.input,required:!0})]})]}),(0,a.jsxs)("div",{className:i.default.termsSection,children:[(0,a.jsx)("h3",{className:i.default.sectionTitle,style:{marginTop:0},children:"Terms & Conditions"}),(0,a.jsxs)("ul",{className:i.default.termsList,children:[(0,a.jsx)("li",{children:"Admissions allowed above age 7."}),(0,a.jsx)("li",{children:"Minimum 2 months' fee should be paid."}),(0,a.jsx)("li",{children:"No concession for absents or discontinuation."}),(0,a.jsx)("li",{children:"Discipline and timely presence are essential."}),(0,a.jsx)("li",{children:"Practice daily for 45 to 60 minutes."}),(0,a.jsx)("li",{children:"5% discount on annual payment."})]}),(0,a.jsxs)("label",{className:i.default.checkboxLabel,children:[(0,a.jsx)("input",{type:"checkbox",checked:e.termsAgreed,onChange:e=>l(a=>({...a,termsAgreed:e.target.checked})),className:i.default.checkbox}),"I understand all the rules and regulations."]})]}),(0,a.jsx)("button",{type:"submit",className:i.default.submitBtn,children:"Submit Admission Form"})]})]})]}),e.isSubmitted&&(0,a.jsx)("div",{className:i.default.successOverlay,children:(0,a.jsxs)("div",{className:i.default.successContent,children:[(0,a.jsx)("div",{className:i.default.successIcon,children:"✓"}),(0,a.jsx)("h2",{children:"Admission Successful!"}),(0,a.jsxs)("p",{children:["Your admission form and payment of ₹",e.amountPaying," have been successfully received."]}),(0,a.jsxs)("div",{style:{marginTop:"30px",display:"flex",flexDirection:"column",gap:"15px"},children:[(0,a.jsx)("button",{onClick:()=>{let e=localStorage.getItem("admissionFormData");e&&(e=>{let a=window.open("","_blank");if(!a)return;let t=Array.isArray(e.phone)?e.phone.join(""):e.phone||"";e.instrumentalSubject||e.vocalSubject||e.danceSubject;let i=`SR-${e.studentId||Date.now()}-${Math.random().toString(36).substr(2,6).toUpperCase()}`;a.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Admission Form - ${e.name}</title>
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
                        <p><strong>Serial No:</strong> ${i}</p>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Personal Information</h3>
                    <div class="form-container">
                        <div class="form-fields">
                            <div class="form-field">
                                <label>Name:</label>
                                <div class="line">${e.name||""}</div>
                            </div>
                            <div class="form-field">
                                <label>DOB:</label>
                                <div class="line">${e.dob||""}</div>
                            </div>
                            <div class="form-field">
                                <label>Aadhaar No:</label>
                                <div class="line">${e.aadharCard||""}</div>
                            </div>
                            <div class="form-field">
                                <label>Mobile:</label>
                                <div class="line">${t||""}</div>
                            </div>
                            <div class="form-field">
                                <label>Email:</label>
                                <div class="line">${e.email||""}</div>
                            </div>
                        </div>
                        <div class="photo-box">
                            ${e.photo?`<img src="${e.photo}" alt="Student Photo" />`:'<div class="photo-placeholder">PHOTO</div>'}
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Additional Information</h3>
                    <table class="info-table">
                        <tr>
                            <td>Form No:</td>
                            <td>${e.formNo||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>${e.address||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>PAN Card:</td>
                            <td>${e.panCard||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Branch:</td>
                            <td>${e.branch||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Admission Date:</td>
                            <td>${e.Admissiondate||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Age:</td>
                            <td>${e.age||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Instrumental:</td>
                            <td>${e.instrumentalSubject||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Indian Classical Vocal:</td>
                            <td>${e.vocalSubject||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Dance:</td>
                            <td>${e.danceSubject||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Diploma Admission Year:</td>
                            <td>${e.diplomaAdmissionYear||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Joining Date:</td>
                            <td>${e.joiningDate||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Educational / Job Details:</td>
                            <td>${e.educationalActivities||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Amount Paid:</td>
                            <td>₹${e.amountPaying||200}</td>
                        </tr>
                        <tr>
                            <td>UPI ID / Transaction ID:</td>
                            <td>${e.transactionId||"N/A"}</td>
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
                        // Auto-print option (commented out - user can click print button)
                        // setTimeout(() => window.print(), 500);
                    }
                </script>
            </body>
            </html>
        `),a.document.close()})(JSON.parse(e))},className:i.default.submitBtn,style:{backgroundColor:"#ff3333"},children:"📄 Download Admission Form (PDF)"}),(0,a.jsx)("button",{onClick:()=>{let e=localStorage.getItem("lastStudentId");e?window.open(`/invoice/${e}`,"_blank"):alert("Invoice not available")},className:i.default.submitBtn,style:{backgroundColor:"#4CAF50"},children:"💰 Download Payment Invoice"}),(0,a.jsx)("button",{onClick:()=>window.location.href="/",className:i.default.submitBtn,style:{backgroundColor:"#666",marginTop:"10px"},children:"Back to Home"})]})]})})]})}])}]);