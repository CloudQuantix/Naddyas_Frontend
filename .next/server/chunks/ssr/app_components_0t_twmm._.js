module.exports=[49812,a=>{a.v({amountDisplay:"RegisterForm-module__6gsl6a__amountDisplay",checkbox:"RegisterForm-module__6gsl6a__checkbox",checkboxGroup:"RegisterForm-module__6gsl6a__checkboxGroup",checkboxLabel:"RegisterForm-module__6gsl6a__checkboxLabel",digitInput:"RegisterForm-module__6gsl6a__digitInput",formGroup:"RegisterForm-module__6gsl6a__formGroup",formSection:"RegisterForm-module__6gsl6a__formSection",formTitle:"RegisterForm-module__6gsl6a__formTitle",header:"RegisterForm-module__6gsl6a__header",imageOverlay:"RegisterForm-module__6gsl6a__imageOverlay",imageSection:"RegisterForm-module__6gsl6a__imageSection",input:"RegisterForm-module__6gsl6a__input",label:"RegisterForm-module__6gsl6a__label",mainContainer:"RegisterForm-module__6gsl6a__mainContainer",musicCategory:"RegisterForm-module__6gsl6a__musicCategory",musicGrid:"RegisterForm-module__6gsl6a__musicGrid",orgName:"RegisterForm-module__6gsl6a__orgName",pageWrapper:"RegisterForm-module__6gsl6a__pageWrapper",paymentOptionLabel:"RegisterForm-module__6gsl6a__paymentOptionLabel",paymentOptions:"RegisterForm-module__6gsl6a__paymentOptions",paymentSection:"RegisterForm-module__6gsl6a__paymentSection",paymentTitle:"RegisterForm-module__6gsl6a__paymentTitle",phoneInputs:"RegisterForm-module__6gsl6a__phoneInputs",pulse:"RegisterForm-module__6gsl6a__pulse",qrContainer:"RegisterForm-module__6gsl6a__qrContainer",qrImage:"RegisterForm-module__6gsl6a__qrImage",row:"RegisterForm-module__6gsl6a__row",scaleUp:"RegisterForm-module__6gsl6a__scaleUp",sectionTitle:"RegisterForm-module__6gsl6a__sectionTitle",selected:"RegisterForm-module__6gsl6a__selected",submitBtn:"RegisterForm-module__6gsl6a__submitBtn",successContent:"RegisterForm-module__6gsl6a__successContent",successIcon:"RegisterForm-module__6gsl6a__successIcon",successOverlay:"RegisterForm-module__6gsl6a__successOverlay",termsList:"RegisterForm-module__6gsl6a__termsList",termsSection:"RegisterForm-module__6gsl6a__termsSection",upiId:"RegisterForm-module__6gsl6a__upiId",videoBackground:"RegisterForm-module__6gsl6a__videoBackground",videoOverlay:"RegisterForm-module__6gsl6a__videoOverlay"})},34949,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(49812);a.s(["default",0,function(){let[a,e]=(0,c.useState)({Admissiondate:new Date().toISOString().split("T")[0],branch:"Karmaveer Nagar Society",formNo:"",name:"",address:"",phone:Array(10).fill(""),dob:"",age:"",email:"",panCard:"",aadharCard:"",photo:"",instrumentalSubject:"",danceSubject:"",vocalSubject:"",diplomaAdmissionYear:"",educationalActivities:"",joiningDate:"",signatures:{student:"",parent:"",teacher:""},termsAgreed:!1,paymentMode:"full",amountPaying:200,transactionId:"",isSubmitted:!1});(0,c.useEffect)(()=>{(async()=>{if(a.branch)try{let b=await fetch(`/api/getNextFormNo?branch=${encodeURIComponent(a.branch)}`),c=await b.json();c.formNo&&e(a=>({...a,formNo:c.formNo}))}catch(a){console.error("Failed to fetch form no",a)}})()},[a.branch]);let f=async b=>{if(b.preventDefault(),!a.termsAgreed)return void alert("Please agree to the terms and conditions");if(!a.name||""===a.name.trim())return void alert("Please enter Full Name");if(!a.address||""===a.address.trim())return void alert("Please enter Address");let c=a.phone.join("");if(!c||10!==c.length)return void alert("Please enter a valid 10-digit Mobile Number");if(!a.dob)return void alert("Please enter Date of Birth");if(!a.age||""===a.age.trim())return void alert("Please enter Age");if(!a.panCard||""===a.panCard.trim())return void alert("Please enter PAN Card Number");if(!a.aadharCard||""===a.aadharCard.trim())return void alert("Please enter Aadhar Card Number");if(!a.diplomaAdmissionYear||""===a.diplomaAdmissionYear.trim())return void alert("Please select Year");if(!a.joiningDate)return void alert("Please enter Joining Date");if(!a.transactionId||""===a.transactionId.trim())return void alert("Please enter UPI ID");let d=a.instrumentalSubject?[a.instrumentalSubject]:[],f=a.danceSubject?[a.danceSubject]:[];try{let b=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...a,instruments:d,mainStyles:f})}),c=await b.json();b.ok?(e(a=>({...a,isSubmitted:!0})),console.log("Form submitted:",c),localStorage.setItem("lastStudentId",c.studentId),localStorage.setItem("admissionFormData",JSON.stringify({...a,studentId:c.studentId,formNo:c.formNo}))):alert("Registration failed: "+c.error)}catch(a){console.error("Submission error:",a),alert("An error occurred during submission.")}},g=a=>{let{name:b,value:c}=a.target;"instrumentalSubject"===b?e(a=>({...a,instrumentalSubject:c,...c?{vocalSubject:"",danceSubject:""}:{}})):"vocalSubject"===b?e(a=>({...a,vocalSubject:c,...c?{instrumentalSubject:"",danceSubject:""}:{}})):"danceSubject"===b?e(a=>({...a,danceSubject:c,...c?{instrumentalSubject:"",vocalSubject:""}:{}})):e(a=>({...a,[b]:c}))};return(0,b.jsxs)("div",{className:d.default.pageWrapper,children:[(0,b.jsxs)("div",{className:d.default.mainContainer,children:[(0,b.jsx)("div",{className:d.default.imageSection,children:(0,b.jsxs)("div",{className:d.default.imageOverlay,children:[(0,b.jsx)("h2",{children:"Welcome to Swargumphan"}),(0,b.jsx)("p",{children:"Begin your musical journey with us"})]})}),(0,b.jsxs)("div",{className:d.default.formSection,children:[(0,b.jsxs)("div",{className:d.default.header,children:[(0,b.jsx)("h1",{className:d.default.orgName,children:"Swargumphan Classes"}),(0,b.jsx)("h2",{className:d.default.formTitle,children:"Admission Form"})]}),(0,b.jsxs)("form",{onSubmit:f,children:[(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsx)("label",{className:d.default.label,children:"Branch"}),(0,b.jsxs)("select",{name:"branch",value:a.branch,onChange:g,className:d.default.input,children:[(0,b.jsx)("option",{value:"Karmaveer Nagar Society",children:"Karmaveer Nagar"}),(0,b.jsx)("option",{value:"Godoli, Satara",children:"Godoli, Satara"}),(0,b.jsx)("option",{value:"Krantismruti, Satara",children:"Krantismruti, Satara"}),(0,b.jsx)("option",{value:"Karad",children:"Karad"})]})]}),(0,b.jsxs)("div",{className:d.default.row,children:[(0,b.jsx)("div",{className:d.default.col,children:(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsx)("label",{className:d.default.label,children:"Admission Date"}),(0,b.jsx)("input",{type:"date",name:"Admissiondate",value:a.Admissiondate,onChange:g,className:d.default.input})]})}),(0,b.jsx)("div",{className:d.default.col,children:(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsx)("label",{className:d.default.label,children:"Form No."}),(0,b.jsx)("input",{type:"text",value:a.formNo,readOnly:!0,className:d.default.input})]})})]}),(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsxs)("label",{className:d.default.label,children:["Full Name ",(0,b.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,b.jsx)("input",{type:"text",name:"name",value:a.name,onChange:g,className:d.default.input,required:!0})]}),(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsxs)("label",{className:d.default.label,children:["Address ",(0,b.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,b.jsx)("input",{type:"text",name:"address",value:a.address,onChange:g,className:d.default.input,required:!0})]}),(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsxs)("label",{className:d.default.label,children:["Mobile ",(0,b.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,b.jsx)("div",{className:d.default.phoneInputs,children:a.phone.map((c,f)=>(0,b.jsx)("input",{id:`phone-${f}`,type:"text",value:c,onChange:b=>((b,c)=>{if(c.length>1)return;let d=[...a.phone];if(d[b]=c,e(a=>({...a,phone:d})),c&&b<9){let a=document.getElementById(`phone-${b+1}`);a?.focus()}})(f,b.target.value),className:d.default.digitInput,maxLength:1},f))})]}),(0,b.jsxs)("div",{className:d.default.row,children:[(0,b.jsx)("div",{className:d.default.col,children:(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsxs)("label",{className:d.default.label,children:["Date of Birth ",(0,b.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,b.jsx)("input",{type:"date",name:"dob",value:a.dob,onChange:g,className:d.default.input,required:!0})]})}),(0,b.jsx)("div",{className:d.default.col,children:(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsxs)("label",{className:d.default.label,children:["Age ",(0,b.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,b.jsx)("input",{type:"number",name:"age",value:a.age,onChange:g,className:d.default.input,required:!0})]})})]}),(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsx)("label",{className:d.default.label,children:"Email ID"}),(0,b.jsx)("input",{type:"email",name:"email",value:a.email,onChange:g,className:d.default.input})]}),(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsxs)("label",{className:d.default.label,children:["PAN Card ",(0,b.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,b.jsx)("input",{type:"text",name:"panCard",value:a.panCard,onChange:g,className:d.default.input,placeholder:"Enter PAN Card Number",maxLength:10,style:{textTransform:"uppercase"},required:!0})]}),(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsxs)("label",{className:d.default.label,children:["Aadhar Card ",(0,b.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,b.jsx)("input",{type:"text",name:"aadharCard",value:a.aadharCard,onChange:g,className:d.default.input,placeholder:"Enter Aadhar Card Number",maxLength:12,required:!0})]}),(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsx)("label",{className:d.default.label,children:"Photo"}),(0,b.jsx)("input",{type:"file",accept:"image/png,image/jpeg,image/jpg",onChange:a=>{let b=a.target.files?.[0];if(!b)return;if(!["image/png","image/jpeg","image/jpg"].includes(b.type.toLowerCase())){alert("Please upload a photo in PNG, JPG, or JPEG format only"),a.target.value="";return}if(b.size>262144){alert("Photo size must be under 256 KB. Please compress the image and try again."),a.target.value="";return}let c=new FileReader;c.onloadend=()=>{let a=c.result;e(b=>({...b,photo:a}))},c.onerror=()=>{alert("Error reading the photo. Please try again."),a.target.value=""},c.readAsDataURL(b)},className:d.default.input,style:{padding:"8px"}}),(0,b.jsxs)("p",{style:{fontSize:"0.85rem",color:"#aaa",marginTop:"8px",marginBottom:0},children:[(0,b.jsx)("strong",{children:"Instructions:"})," Please upload a clear photo in ",(0,b.jsx)("strong",{children:"PNG, JPG, or JPEG format only"}),". Maximum file size: ",(0,b.jsx)("strong",{children:"256 KB"}),". The photo will be used for your admission record."]}),a.photo&&(0,b.jsxs)("div",{style:{marginTop:"10px"},children:[(0,b.jsx)("img",{src:a.photo,alt:"Preview",style:{maxWidth:"150px",maxHeight:"150px",borderRadius:"8px",border:"2px solid #ff3333",objectFit:"cover"}}),(0,b.jsx)("p",{style:{fontSize:"0.8rem",color:"#4CAF50",marginTop:"5px"},children:"✓ Photo uploaded successfully"})]})]}),(0,b.jsx)("h3",{className:d.default.sectionTitle,children:"Music Preferences"}),(0,b.jsxs)("div",{className:d.default.musicGrid,children:[(0,b.jsxs)("div",{className:d.default.musicCategory,children:[(0,b.jsx)("h4",{children:"Instrumental"}),(0,b.jsxs)("select",{name:"instrumentalSubject",value:a.instrumentalSubject,onChange:g,className:d.default.input,disabled:!!(a.vocalSubject||a.danceSubject),children:[(0,b.jsx)("option",{value:"",children:"Select Instrument"}),(0,b.jsx)("option",{value:"Tabla",children:"Tabla"}),(0,b.jsx)("option",{value:"Harmonium",children:"Harmonium"}),(0,b.jsx)("option",{value:"Satar",children:"Satar"}),(0,b.jsx)("option",{value:"Bansuri",children:"Bansuri"}),(0,b.jsx)("option",{value:"Guitar",children:"Guitar"}),(0,b.jsx)("option",{value:"Pakhawaj",children:"Pakhawaj"})]})]}),(0,b.jsxs)("div",{className:d.default.musicCategory,children:[(0,b.jsx)("h4",{children:"Indian classical vocal"}),(0,b.jsxs)("select",{name:"vocalSubject",value:a.vocalSubject,onChange:g,className:d.default.input,disabled:!!(a.instrumentalSubject||a.danceSubject),children:[(0,b.jsx)("option",{value:"",children:"Select Vocal Style"}),(0,b.jsx)("option",{value:"Hindustani Classical Vocal",children:"Hindustani Classical Vocal"}),(0,b.jsx)("option",{value:"Maharashtrian Bhajan",children:"Maharashtrian Bhajan"}),(0,b.jsx)("option",{value:"Light Music",children:"Light Music"})]})]}),(0,b.jsxs)("div",{className:d.default.musicCategory,children:[(0,b.jsx)("h4",{children:"Dance"}),(0,b.jsxs)("select",{name:"danceSubject",value:a.danceSubject,onChange:g,className:d.default.input,disabled:!!(a.instrumentalSubject||a.vocalSubject),children:[(0,b.jsx)("option",{value:"",children:"Select Dance Style"}),(0,b.jsx)("option",{value:"Bharatnatyam",children:"Bharatnatyam"}),(0,b.jsx)("option",{value:"Kathak",children:"Kathak"})]})]})]}),(0,b.jsx)("h3",{className:d.default.sectionTitle,children:"Diploma Admission Year"}),(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsxs)("label",{className:d.default.label,children:["Year ",(0,b.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,b.jsxs)("select",{name:"diplomaAdmissionYear",value:a.diplomaAdmissionYear,onChange:g,className:d.default.input,required:!0,children:[(0,b.jsx)("option",{value:"",disabled:!0,hidden:!0,children:"Select Year"}),(0,b.jsx)("option",{value:"First Year",children:"First Year"}),(0,b.jsx)("option",{value:"Second Year",children:"Second Year"}),(0,b.jsx)("option",{value:"Third Year",children:"Third Year"})]})]}),(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsx)("label",{className:d.default.label,children:"Educational  / Job Details"}),(0,b.jsx)("input",{type:"text",name:"educationalActivities",value:a.educationalActivities,onChange:g,className:d.default.input})]}),(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsxs)("label",{className:d.default.label,children:["Joining Date ",(0,b.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,b.jsx)("input",{type:"date",name:"joiningDate",value:a.joiningDate,onChange:g,className:d.default.input,required:!0})]}),(0,b.jsxs)("div",{className:d.default.paymentSection,children:[(0,b.jsx)("h3",{className:d.default.paymentTitle,children:"Fees"}),(0,b.jsx)("div",{className:d.default.amountDisplay,children:(0,b.jsx)("span",{children:"Total Amount to Pay: ₹200"})}),(0,b.jsxs)("div",{className:d.default.qrContainer,children:[(0,b.jsx)("img",{src:"/UPI.png",alt:"UPI QR Code",className:d.default.qrImage}),(0,b.jsx)("div",{className:d.default.upiId,children:"UPI ID: swargumphan@upi"}),(0,b.jsx)("p",{style:{color:"#666",fontSize:"0.9rem"},children:"Scan with PhonePe / GPay / Paytm"})]}),(0,b.jsxs)("div",{className:d.default.formGroup,children:[(0,b.jsxs)("label",{className:d.default.label,children:["UPI ID ",(0,b.jsx)("span",{style:{color:"#ff3333"},children:"*"})]}),(0,b.jsx)("input",{type:"text",name:"transactionId",value:a.transactionId,onChange:a=>e(b=>({...b,transactionId:a.target.value})),placeholder:"Enter UPI ID / UTR Number",className:d.default.input,required:!0})]})]}),(0,b.jsxs)("div",{className:d.default.termsSection,children:[(0,b.jsx)("h3",{className:d.default.sectionTitle,style:{marginTop:0},children:"Terms & Conditions"}),(0,b.jsxs)("ul",{className:d.default.termsList,children:[(0,b.jsx)("li",{children:"Admissions allowed above age 7."}),(0,b.jsx)("li",{children:"Minimum 2 months' fee should be paid."}),(0,b.jsx)("li",{children:"No concession for absents or discontinuation."}),(0,b.jsx)("li",{children:"Discipline and timely presence are essential."}),(0,b.jsx)("li",{children:"Practice daily for 45 to 60 minutes."}),(0,b.jsx)("li",{children:"5% discount on annual payment."})]}),(0,b.jsxs)("label",{className:d.default.checkboxLabel,children:[(0,b.jsx)("input",{type:"checkbox",checked:a.termsAgreed,onChange:a=>e(b=>({...b,termsAgreed:a.target.checked})),className:d.default.checkbox}),"I understand all the rules and regulations."]})]}),(0,b.jsx)("button",{type:"submit",className:d.default.submitBtn,children:"Submit Admission Form"})]})]})]}),a.isSubmitted&&(0,b.jsx)("div",{className:d.default.successOverlay,children:(0,b.jsxs)("div",{className:d.default.successContent,children:[(0,b.jsx)("div",{className:d.default.successIcon,children:"✓"}),(0,b.jsx)("h2",{children:"Admission Successful!"}),(0,b.jsxs)("p",{children:["Your admission form and payment of ₹",a.amountPaying," have been successfully received."]}),(0,b.jsxs)("div",{style:{marginTop:"30px",display:"flex",flexDirection:"column",gap:"15px"},children:[(0,b.jsx)("button",{onClick:()=>{let a=localStorage.getItem("admissionFormData");a&&(a=>{let b=window.open("","_blank");if(!b)return;let c=Array.isArray(a.phone)?a.phone.join(""):a.phone||"";a.instrumentalSubject||a.vocalSubject||a.danceSubject;let d=`SR-${a.studentId||Date.now()}-${Math.random().toString(36).substr(2,6).toUpperCase()}`;b.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Admission Form - ${a.name}</title>
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
                        <p><strong>Serial No:</strong> ${d}</p>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Personal Information</h3>
                    <div class="form-container">
                        <div class="form-fields">
                            <div class="form-field">
                                <label>Name:</label>
                                <div class="line">${a.name||""}</div>
                            </div>
                            <div class="form-field">
                                <label>DOB:</label>
                                <div class="line">${a.dob||""}</div>
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
                            <td>${a.Admissiondate||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Age:</td>
                            <td>${a.age||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Instrumental:</td>
                            <td>${a.instrumentalSubject||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Indian Classical Vocal:</td>
                            <td>${a.vocalSubject||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Dance:</td>
                            <td>${a.danceSubject||"Not Selected"}</td>
                        </tr>
                        <tr>
                            <td>Diploma Admission Year:</td>
                            <td>${a.diplomaAdmissionYear||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Joining Date:</td>
                            <td>${a.joiningDate||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Educational / Job Details:</td>
                            <td>${a.educationalActivities||"N/A"}</td>
                        </tr>
                        <tr>
                            <td>Amount Paid:</td>
                            <td>₹${a.amountPaying||200}</td>
                        </tr>
                        <tr>
                            <td>UPI ID / Transaction ID:</td>
                            <td>${a.transactionId||"N/A"}</td>
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
        `),b.document.close()})(JSON.parse(a))},className:d.default.submitBtn,style:{backgroundColor:"#ff3333"},children:"📄 Download Admission Form (PDF)"}),(0,b.jsx)("button",{onClick:()=>{let a=localStorage.getItem("lastStudentId");a?window.open(`/invoice/${a}`,"_blank"):alert("Invoice not available")},className:d.default.submitBtn,style:{backgroundColor:"#4CAF50"},children:"💰 Download Payment Invoice"}),(0,b.jsx)("button",{onClick:()=>window.location.href="/",className:d.default.submitBtn,style:{backgroundColor:"#666",marginTop:"10px"},children:"Back to Home"})]})]})})]})}])}];

//# sourceMappingURL=app_components_0t_twmm._.js.map