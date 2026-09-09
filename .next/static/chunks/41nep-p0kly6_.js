(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,3246,e=>{"use strict";var t=e.i(43476),a=e.i(71645);let o=(0,a.createContext)({isCollapsed:!1,setIsCollapsed:()=>{}});e.s(["SidebarProvider",0,function({children:e}){let[n,l]=(0,a.useState)(()=>"true"===localStorage.getItem("sidebarCollapsed"));return(0,a.useEffect)(()=>{localStorage.setItem("sidebarCollapsed",String(n))},[n]),(0,t.jsx)(o.Provider,{value:{isCollapsed:n,setIsCollapsed:l},children:e})},"useSidebar",0,()=>(0,a.useContext)(o)])},31277,e=>{e.v({active:"AdminSidebar-module__qLl11q__active",collapsed:"AdminSidebar-module__qLl11q__collapsed",groupLabel:"AdminSidebar-module__qLl11q__groupLabel",logo:"AdminSidebar-module__qLl11q__logo",logoIcon:"AdminSidebar-module__qLl11q__logoIcon",logoText:"AdminSidebar-module__qLl11q__logoText",logoutBtn:"AdminSidebar-module__qLl11q__logoutBtn",nav:"AdminSidebar-module__qLl11q__nav",navGroup:"AdminSidebar-module__qLl11q__navGroup",navIcon:"AdminSidebar-module__qLl11q__navIcon",navItem:"AdminSidebar-module__qLl11q__navItem",navList:"AdminSidebar-module__qLl11q__navList",sidebar:"AdminSidebar-module__qLl11q__sidebar",sidebarFooter:"AdminSidebar-module__qLl11q__sidebarFooter",sidebarHeader:"AdminSidebar-module__qLl11q__sidebarHeader",toggleBtn:"AdminSidebar-module__qLl11q__toggleBtn",userAvatar:"AdminSidebar-module__qLl11q__userAvatar",userInfo:"AdminSidebar-module__qLl11q__userInfo",userName:"AdminSidebar-module__qLl11q__userName",userProfile:"AdminSidebar-module__qLl11q__userProfile",userRole:"AdminSidebar-module__qLl11q__userRole"})},42847,e=>{e.v({actionBtn:"AdminLayout-module__y9mk6G__actionBtn",actionButton:"AdminLayout-module__y9mk6G__actionButton",actionButtons:"AdminLayout-module__y9mk6G__actionButtons",active:"AdminLayout-module__y9mk6G__active",adminHeader:"AdminLayout-module__y9mk6G__adminHeader",adminLayout:"AdminLayout-module__y9mk6G__adminLayout",contentArea:"AdminLayout-module__y9mk6G__contentArea",danger:"AdminLayout-module__y9mk6G__danger",dataTable:"AdminLayout-module__y9mk6G__dataTable",delete:"AdminLayout-module__y9mk6G__delete",edit:"AdminLayout-module__y9mk6G__edit",headerButton:"AdminLayout-module__y9mk6G__headerButton",headerLeft:"AdminLayout-module__y9mk6G__headerLeft",headerRight:"AdminLayout-module__y9mk6G__headerRight",headerTitle:"AdminLayout-module__y9mk6G__headerTitle",inactive:"AdminLayout-module__y9mk6G__inactive",info:"AdminLayout-module__y9mk6G__info",logoutButton:"AdminLayout-module__y9mk6G__logoutButton",mainContent:"AdminLayout-module__y9mk6G__mainContent",pending:"AdminLayout-module__y9mk6G__pending",primary:"AdminLayout-module__y9mk6G__primary",sectionBody:"AdminLayout-module__y9mk6G__sectionBody",sectionCard:"AdminLayout-module__y9mk6G__sectionCard",sectionHeader:"AdminLayout-module__y9mk6G__sectionHeader",sidebarCollapsed:"AdminLayout-module__y9mk6G__sidebarCollapsed",statCard:"AdminLayout-module__y9mk6G__statCard",statContent:"AdminLayout-module__y9mk6G__statContent",statIcon:"AdminLayout-module__y9mk6G__statIcon",statSubtext:"AdminLayout-module__y9mk6G__statSubtext",statValue:"AdminLayout-module__y9mk6G__statValue",statsGrid:"AdminLayout-module__y9mk6G__statsGrid",statusBadge:"AdminLayout-module__y9mk6G__statusBadge",success:"AdminLayout-module__y9mk6G__success",tableWrapper:"AdminLayout-module__y9mk6G__tableWrapper",warning:"AdminLayout-module__y9mk6G__warning",welcomeActions:"AdminLayout-module__y9mk6G__welcomeActions",welcomeContent:"AdminLayout-module__y9mk6G__welcomeContent",welcomeSection:"AdminLayout-module__y9mk6G__welcomeSection"})},24212,e=>{"use strict";var t=e.i(43476),a=e.i(71645),o=e.i(18566),n=e.i(3246),l=e.i(31277);function d(){let e=(0,o.useRouter)(),d=(0,o.usePathname)(),{isCollapsed:s,setIsCollapsed:i}=(0,n.useSidebar)(),[r,c]=(0,a.useState)(!s),[u,m]=(0,a.useState)(null);return(0,a.useEffect)(()=>{let e,t,a,o;e=localStorage.getItem("adminRole"),t=localStorage.getItem("isRootAdmin"),a=localStorage.getItem("isHeadAdminLoggedIn"),o=localStorage.getItem("isBranchAdmin"),"ROOT"===e||"true"===t?m("root"):"true"===a?m("head"):"true"===o&&m("branch")},[]),(0,a.useEffect)(()=>{c(!s)},[s,i]),(0,t.jsxs)("div",{className:`${l.default.sidebar} ${!r?l.default.collapsed:""}`,children:[(0,t.jsxs)("div",{className:l.default.sidebarHeader,children:[(0,t.jsxs)("div",{className:l.default.logo,children:[(0,t.jsx)("img",{src:"/Logo.png",alt:"Logo",className:l.default.logoIcon}),(0,t.jsxs)("div",{className:l.default.logoText,children:[(0,t.jsx)("h2",{children:"Swargumphan"}),(0,t.jsx)("p",{children:"Music Institute"})]})]}),(0,t.jsx)("button",{className:l.default.toggleBtn,onClick:()=>{let e=!r;c(e),i(!e)},children:r?"◄":"►"})]}),(0,t.jsx)("nav",{className:l.default.nav,children:(0,t.jsxs)("ul",{className:l.default.navList,children:[(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:"/admin/dashboard",className:`${l.default.navItem} ${"/admin/dashboard"===d?l.default.active:""}`,children:[(0,t.jsx)("span",{className:l.default.navIcon}),r&&(0,t.jsx)("span",{children:"Dashboard"})]})}),("root"===u||"branch"===u)&&(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:"/admin/students",className:`${l.default.navItem} ${"/admin/students"===d?l.default.active:""}`,children:[(0,t.jsx)("span",{className:l.default.navIcon}),r&&(0,t.jsx)("span",{children:"Student Records"})]})}),"branch"===u&&(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:"/admin/invoices",className:`${l.default.navItem} ${"/admin/invoices"===d?l.default.active:""}`,children:[(0,t.jsx)("span",{className:l.default.navIcon}),r&&(0,t.jsx)("span",{children:"Invoices"})]})}),"root"===u&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:"/admin/expenses",className:`${l.default.navItem} ${"/admin/expenses"===d?l.default.active:""}`,children:[(0,t.jsx)("span",{className:l.default.navIcon}),r&&(0,t.jsx)("span",{children:"Expenses"})]})}),(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:"/admin/letterhead/draft",className:`${l.default.navItem} ${"/admin/letterhead/draft"===d?l.default.active:""}`,children:[(0,t.jsx)("span",{className:l.default.navIcon}),r&&(0,t.jsx)("span",{children:"Letter Head Draft"})]})}),(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:"/admin/branch-managers",className:`${l.default.navItem} ${"/admin/branch-managers"===d?l.default.active:""}`,children:[(0,t.jsx)("span",{className:l.default.navIcon}),r&&(0,t.jsx)("span",{children:"Branch Managers"})]})}),(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:"/admin/donation-records",className:`${l.default.navItem} ${"/admin/donation-records"===d?l.default.active:""}`,children:[(0,t.jsx)("span",{className:l.default.navIcon}),r&&(0,t.jsx)("span",{children:"Donation Records"})]})}),(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:"/admin/performance-slider",className:`${l.default.navItem} ${"/admin/performance-slider"===d?l.default.active:""}`,children:[(0,t.jsx)("span",{className:l.default.navIcon}),r&&(0,t.jsx)("span",{children:"Performance Slider"})]})}),(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:"/admin/reels",className:`${l.default.navItem} ${"/admin/reels"===d?l.default.active:""}`,children:[(0,t.jsx)("span",{className:l.default.navIcon}),r&&(0,t.jsx)("span",{children:"Reels"})]})}),(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:"/admin/about",className:`${l.default.navItem} ${"/admin/about"===d?l.default.active:""}`,children:[(0,t.jsx)("span",{className:l.default.navIcon}),r&&(0,t.jsx)("span",{children:"About"})]})}),(0,t.jsx)("li",{children:(0,t.jsxs)("a",{href:"/admin/invoices",className:`${l.default.navItem} ${"/admin/invoices"===d?l.default.active:""}`,children:[(0,t.jsx)("span",{className:l.default.navIcon}),r&&(0,t.jsx)("span",{children:"Invoices"})]})})]})]})}),(0,t.jsxs)("div",{className:l.default.sidebarFooter,children:[(0,t.jsxs)("div",{className:l.default.userProfile,children:[(0,t.jsx)("div",{className:l.default.userAvatar,children:"A"}),r&&(0,t.jsxs)("div",{className:l.default.userInfo,children:[(0,t.jsx)("div",{className:l.default.userName,children:"Welcome, Admin"}),(0,t.jsx)("div",{className:l.default.userRole,children:"System Administrator"})]})]}),(0,t.jsx)("button",{onClick:()=>{localStorage.removeItem("isAdminLoggedIn"),localStorage.removeItem("isHeadAdminLoggedIn"),localStorage.removeItem("isBranchAdmin"),localStorage.removeItem("isRootAdmin"),localStorage.removeItem("adminRole"),localStorage.removeItem("adminId"),localStorage.removeItem("adminUsername"),localStorage.removeItem("adminBranch"),localStorage.removeItem("rootAdminUsername"),localStorage.removeItem("loggedInBranchId"),e.push("/admin/login")},className:l.default.logoutBtn,children:r?"Logout":"🚪"})]})]})}var s=e.i(42847);function i({children:e,title:a="Dashboard",headerActions:o}){let{isCollapsed:l}=(0,n.useSidebar)();return(0,t.jsxs)("div",{className:s.default.adminLayout,children:[(0,t.jsx)(d,{}),(0,t.jsxs)("div",{className:`${s.default.mainContent} ${l?s.default.sidebarCollapsed:""}`,children:[(0,t.jsxs)("header",{className:s.default.adminHeader,children:[(0,t.jsx)("div",{className:s.default.headerLeft,children:(0,t.jsx)("h1",{className:s.default.headerTitle,children:a})}),(0,t.jsx)("div",{className:s.default.headerRight,children:o})]}),(0,t.jsx)("div",{className:s.default.contentArea,children:e})]})]})}e.s(["default",0,function(e){return(0,t.jsx)(n.SidebarProvider,{children:(0,t.jsx)(i,{...e})})}],24212)},98416,e=>{e.v({actionButtons:"DonationRecords-module__1lGNTG__actionButtons",address:"DonationRecords-module__1lGNTG__address",amount:"DonationRecords-module__1lGNTG__amount",bar:"DonationRecords-module__1lGNTG__bar",barAmount:"DonationRecords-module__1lGNTG__barAmount",barChart:"DonationRecords-module__1lGNTG__barChart",barCount:"DonationRecords-module__1lGNTG__barCount",barHighest:"DonationRecords-module__1lGNTG__barHighest",barItem:"DonationRecords-module__1lGNTG__barItem",barLabel:"DonationRecords-module__1lGNTG__barLabel",barLowest:"DonationRecords-module__1lGNTG__barLowest",barMid:"DonationRecords-module__1lGNTG__barMid",barWrapper:"DonationRecords-module__1lGNTG__barWrapper",cancelButton:"DonationRecords-module__1lGNTG__cancelButton",chartContainer:"DonationRecords-module__1lGNTG__chartContainer",chartSection:"DonationRecords-module__1lGNTG__chartSection",chartTitle:"DonationRecords-module__1lGNTG__chartTitle",clearFilterBtn:"DonationRecords-module__1lGNTG__clearFilterBtn",container:"DonationRecords-module__1lGNTG__container",dateInput:"DonationRecords-module__1lGNTG__dateInput",deleteButton:"DonationRecords-module__1lGNTG__deleteButton",description:"DonationRecords-module__1lGNTG__description",donorCard:"DonationRecords-module__1lGNTG__donorCard",donorInfo:"DonationRecords-module__1lGNTG__donorInfo",donorName:"DonationRecords-module__1lGNTG__donorName",donorRank:"DonationRecords-module__1lGNTG__donorRank",donorStats:"DonationRecords-module__1lGNTG__donorStats",editButton:"DonationRecords-module__1lGNTG__editButton",editForm:"DonationRecords-module__1lGNTG__editForm",filterGroup:"DonationRecords-module__1lGNTG__filterGroup",filterLabel:"DonationRecords-module__1lGNTG__filterLabel",filters:"DonationRecords-module__1lGNTG__filters",filtersActions:"DonationRecords-module__1lGNTG__filtersActions",filtersRow:"DonationRecords-module__1lGNTG__filtersRow",formGroup:"DonationRecords-module__1lGNTG__formGroup",formRow:"DonationRecords-module__1lGNTG__formRow",header:"DonationRecords-module__1lGNTG__header",input:"DonationRecords-module__1lGNTG__input",label:"DonationRecords-module__1lGNTG__label",loading:"DonationRecords-module__1lGNTG__loading",modalActions:"DonationRecords-module__1lGNTG__modalActions",modalCloseButton:"DonationRecords-module__1lGNTG__modalCloseButton",modalContent:"DonationRecords-module__1lGNTG__modalContent",modalHeader:"DonationRecords-module__1lGNTG__modalHeader",modalOverlay:"DonationRecords-module__1lGNTG__modalOverlay",modalTitle:"DonationRecords-module__1lGNTG__modalTitle",noData:"DonationRecords-module__1lGNTG__noData",pdfButton:"DonationRecords-module__1lGNTG__pdfButton",receiptNo:"DonationRecords-module__1lGNTG__receiptNo",refreshBtn:"DonationRecords-module__1lGNTG__refreshBtn",saveButton:"DonationRecords-module__1lGNTG__saveButton",searchInput:"DonationRecords-module__1lGNTG__searchInput",statCard:"DonationRecords-module__1lGNTG__statCard",statContent:"DonationRecords-module__1lGNTG__statContent",statIcon:"DonationRecords-module__1lGNTG__statIcon",statLabel:"DonationRecords-module__1lGNTG__statLabel",statValue:"DonationRecords-module__1lGNTG__statValue",statsGrid:"DonationRecords-module__1lGNTG__statsGrid",table:"DonationRecords-module__1lGNTG__table",tableContainer:"DonationRecords-module__1lGNTG__tableContainer",textarea:"DonationRecords-module__1lGNTG__textarea",title:"DonationRecords-module__1lGNTG__title",topDonorsList:"DonationRecords-module__1lGNTG__topDonorsList",topDonorsSection:"DonationRecords-module__1lGNTG__topDonorsSection",totalAmount:"DonationRecords-module__1lGNTG__totalAmount",totalLabel:"DonationRecords-module__1lGNTG__totalLabel",upiId:"DonationRecords-module__1lGNTG__upiId"})},53837,e=>{"use strict";var t=e.i(43476),a=e.i(71645),o=e.i(18566),n=e.i(24212),l=e.i(98416);e.s(["default",0,function(){let e,d,s,i=(0,o.useRouter)(),[r,c]=(0,a.useState)([]),[u,m]=(0,a.useState)(null),[_,h]=(0,a.useState)(!0),[p,f]=(0,a.useState)(""),[x,b]=(0,a.useState)(""),[N,g]=(0,a.useState)("all"),[v,j]=(0,a.useState)("all"),[y,G]=(0,a.useState)("none"),[D,A]=(0,a.useState)(null),[R,L]=(0,a.useState)({userUpiId:"",donatedBy:"",streetAddress:"",city:"",state:"",zip:"",dateOfDonation:"",donationValue:"",description:"",taxId:""});(0,a.useEffect)(()=>{let e=localStorage.getItem("adminRole"),t=localStorage.getItem("isRootAdmin");"ROOT"!==e&&"true"!==t?i.push("/admin/login"):I()},[i]);let I=async()=>{try{h(!0),console.log("Fetching donation records...");let e=await fetch("/api/admin/donation-records",{cache:"no-store",headers:{"Cache-Control":"no-cache"}});console.log("Response status:",e.status);let t=await e.json();console.log("Donation records data:",t),t.success?(console.log(`Received ${t.donations?.length||0} donations`),console.log("Sample donation:",t.donations?.[0]),console.log("Stats:",t.stats),c(t.donations||[]),m(t.stats||null)):(console.error("Failed to fetch donations:",t.error),console.error("Full response:",t),alert(`Failed to fetch donations: ${t.error||"Unknown error"}`),c([]),m(null))}catch(e){console.error("Error fetching donations:",e),alert(`Error fetching donations: ${e instanceof Error?e.message:"Unknown error"}`),c([]),m(null)}finally{h(!1)}},S=(()=>{let e=[...r];if(p.trim()){let t=p.toLowerCase();e=e.filter(e=>e.donated_by?.toLowerCase().includes(t)||e.receipt_no?.toLowerCase().includes(t)||e.user_upi_id?.toLowerCase().includes(t)||e.description?.toLowerCase().includes(t))}return x&&(e=e.filter(e=>e.date_of_donation===x)),"all"!==N&&(e=e.filter(e=>{if(!e.date_of_donation)return!1;let t=new Date(e.date_of_donation);return(t.getMonth()+1).toString().padStart(2,"0")===N||(t.getMonth()+1).toString()===N})),"all"!==v&&(e=e.filter(e=>!!e.date_of_donation&&new Date(e.date_of_donation).getFullYear().toString()===v)),"none"!==y&&(e=[...e].sort((e,t)=>{let a=e.receipt_no||"",o=t.receipt_no||"";return"asc"===y?a.localeCompare(o,void 0,{numeric:!0,sensitivity:"base"}):o.localeCompare(a,void 0,{numeric:!0,sensitivity:"base"})})),e})(),T=e=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(e),C=e=>new Date(e).toLocaleDateString("en-IN",{year:"numeric",month:"short",day:"numeric"}),w=async(e,t)=>{if(confirm(`Are you sure you want to delete donation record ${t}? This action cannot be undone.`))try{let t=await fetch(`/api/admin/donation-records/${e}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}),a=await t.json();t.ok&&a.success?(alert("Donation record deleted successfully"),I()):alert(`Failed to delete donation record: ${a.error||"Unknown error"}`)}catch(e){console.error("Error deleting donation record:",e),alert(`Error deleting donation record: ${e instanceof Error?e.message:"Unknown error"}`)}},k=e=>{let{name:t,value:a}=e.target;L(e=>({...e,[t]:a}))},B=async e=>{if(e.preventDefault(),D)try{let e=await fetch(`/api/admin/donation-records/${D.donation_id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(R)}),t=await e.json();e.ok&&t.success?(alert("Donation record updated successfully"),A(null),I()):alert(`Failed to update donation record: ${t.error||"Unknown error"}`)}catch(e){console.error("Error updating donation record:",e),alert(`Error updating donation record: ${e instanceof Error?e.message:"Unknown error"}`)}};return(0,t.jsxs)(n.default,{children:[(0,t.jsxs)("div",{className:l.default.container,children:[(0,t.jsxs)("div",{className:l.default.header,children:[(0,t.jsx)("h1",{className:l.default.title,children:"Donation Records"}),(0,t.jsx)("button",{onClick:I,className:l.default.refreshBtn,children:"Refresh"})]}),u&&(0,t.jsxs)("div",{className:l.default.statsGrid,children:[(0,t.jsxs)("div",{className:l.default.statCard,children:[(0,t.jsx)("div",{className:l.default.statIcon,children:"💰"}),(0,t.jsxs)("div",{className:l.default.statContent,children:[(0,t.jsx)("h3",{className:l.default.statLabel,children:"Total Donations"}),(0,t.jsx)("p",{className:l.default.statValue,children:u.totalDonations||0})]})]}),(0,t.jsxs)("div",{className:l.default.statCard,children:[(0,t.jsx)("div",{className:l.default.statIcon,children:"💵"}),(0,t.jsxs)("div",{className:l.default.statContent,children:[(0,t.jsx)("h3",{className:l.default.statLabel,children:"Total Amount"}),(0,t.jsx)("p",{className:l.default.statValue,children:T(u.totalAmount||0)})]})]}),(0,t.jsxs)("div",{className:l.default.statCard,children:[(0,t.jsx)("div",{className:l.default.statIcon,children:"📊"}),(0,t.jsxs)("div",{className:l.default.statContent,children:[(0,t.jsx)("h3",{className:l.default.statLabel,children:"Average Donation"}),(0,t.jsx)("p",{className:l.default.statValue,children:T(u.averageDonation||0)})]})]}),(0,t.jsxs)("div",{className:l.default.statCard,children:[(0,t.jsx)("div",{className:l.default.statIcon,children:"📅"}),(0,t.jsxs)("div",{className:l.default.statContent,children:[(0,t.jsx)("h3",{className:l.default.statLabel,children:"This Month"}),(0,t.jsxs)("p",{className:l.default.statValue,children:[u.donationsThisMonth||0," (",T(u.monthlyAmount||0),")"]})]})]})]}),(0,t.jsxs)("div",{className:l.default.filtersRow,children:[(0,t.jsxs)("div",{className:l.default.filterGroup,children:[(0,t.jsx)("label",{className:l.default.filterLabel,children:"Sort Receipt No"}),(0,t.jsxs)("select",{value:y,onChange:e=>G(e.target.value),className:l.default.searchInput,style:{width:"100%",padding:"10px 14px"},children:[(0,t.jsx)("option",{value:"none",children:"No Sort"}),(0,t.jsx)("option",{value:"asc",children:"Ascending (A-Z, 1-9)"}),(0,t.jsx)("option",{value:"desc",children:"Descending (Z-A, 9-1)"})]})]}),(0,t.jsxs)("div",{className:l.default.filterGroup,children:[(0,t.jsx)("label",{className:l.default.filterLabel,children:"Filter by Month"}),(0,t.jsxs)("select",{value:N,onChange:e=>g(e.target.value),className:l.default.searchInput,style:{width:"100%",padding:"10px 14px"},children:[(0,t.jsx)("option",{value:"all",children:"All Months"}),(0,t.jsx)("option",{value:"01",children:"January"}),(0,t.jsx)("option",{value:"02",children:"February"}),(0,t.jsx)("option",{value:"03",children:"March"}),(0,t.jsx)("option",{value:"04",children:"April"}),(0,t.jsx)("option",{value:"05",children:"May"}),(0,t.jsx)("option",{value:"06",children:"June"}),(0,t.jsx)("option",{value:"07",children:"July"}),(0,t.jsx)("option",{value:"08",children:"August"}),(0,t.jsx)("option",{value:"09",children:"September"}),(0,t.jsx)("option",{value:"10",children:"October"}),(0,t.jsx)("option",{value:"11",children:"November"}),(0,t.jsx)("option",{value:"12",children:"December"})]})]}),(0,t.jsxs)("div",{className:l.default.filterGroup,children:[(0,t.jsx)("label",{className:l.default.filterLabel,children:"Filter by Year"}),(0,t.jsxs)("select",{value:v,onChange:e=>j(e.target.value),className:l.default.searchInput,style:{width:"100%",padding:"10px 14px"},children:[(0,t.jsx)("option",{value:"all",children:"All Years"}),Array.from({length:6},(e,t)=>new Date().getFullYear()-t).map(e=>(0,t.jsx)("option",{value:e.toString(),children:e},e))]})]}),(0,t.jsxs)("div",{className:l.default.filterGroup,children:[(0,t.jsx)("label",{className:l.default.filterLabel,children:"Search"}),(0,t.jsx)("input",{type:"text",placeholder:"Search by donor name, receipt no, UPI ID...",value:p,onChange:e=>f(e.target.value),className:l.default.searchInput,style:{width:"100%",padding:"10px 14px"}})]}),(0,t.jsxs)("div",{className:l.default.filterGroup,children:[(0,t.jsx)("label",{className:l.default.filterLabel,children:"Specific Date"}),(0,t.jsx)("input",{type:"date",value:x,onChange:e=>b(e.target.value),className:l.default.dateInput,style:{width:"100%",padding:"10px 14px"}})]})]}),(0,t.jsxs)("div",{className:l.default.filtersActions,children:[("all"!==N||"all"!==v||p||x||"none"!==y)&&(0,t.jsx)("button",{onClick:()=>{g("all"),j("all"),f(""),b(""),G("none")},className:l.default.clearFilterBtn,children:"Clear All Filters"}),S.length>0&&(0,t.jsxs)("button",{onClick:()=>{let e=window.open("","_blank");if(!e)return;let t=`Total Records: ${S.length}`;"all"!==N&&(t+=` | Month: ${({"01":"January","02":"February","03":"March","04":"April","05":"May","06":"June","07":"July","08":"August","09":"September",10:"October",11:"November",12:"December"})[N]||N}`),"all"!==v&&(t+=` | Year: ${v}`),"none"!==y&&(t+=` | Receipt No: ${"asc"===y?"Ascending":"Descending"}`),e.document.write(`<!DOCTYPE html><html><head><title>Donation Records Report</title><style>@media print{@page{margin:10mm;size:A4 landscape}body{margin:0}.no-print{display:none}}body{font-family:Arial;padding:10px;font-size:10px}h1{color:#800000;text-align:center}h2{text-align:center;font-size:14px}.filter-info{text-align:center;margin:10px 0;font-size:9px}table{width:100%;border-collapse:collapse;font-size:9px}th{background:#800000;color:white;padding:8px;text-align:left}td{padding:6px;border:1px solid #ddd}tr:nth-child(even){background:#f5f5f5}.amount{text-align:right;font-weight:bold}.no-print button{padding:10px 20px;background:#800000;color:white;border:none;border-radius:5px;cursor:pointer;margin:0 10px}</style></head><body><h1>Naad Dhyas Foundation</h1><h2>Donation Records Report</h2><div class="filter-info">${t}</div><table><thead><tr><th>Receipt No</th><th>Donated By</th><th>UPI ID</th><th>Date</th><th>Amount</th><th>Description</th></tr></thead><tbody>${S.map(e=>`<tr><td>${e.receipt_no||"-"}</td><td>${e.donated_by||"-"}</td><td>${e.user_upi_id||"-"}</td><td>${e.date_of_donation?new Date(e.date_of_donation).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"}):"-"}</td><td class="amount">₹${(e.donation_value||0).toLocaleString("en-IN")}</td><td>${(e.description||"-").substring(0,50)}</td></tr>`).join("")}</tbody></table><div class="filter-info">Generated on ${new Date().toLocaleString("en-IN")}</div><div class="no-print"><button onclick="window.print()">🖨️ Print / Save as PDF</button><button onclick="window.close()">Close</button></div></body></html>`),e.document.close()},style:{padding:"10px 20px",background:"#10b981",color:"white",border:"none",borderRadius:"6px",fontWeight:"600",cursor:"pointer"},children:["📄 Download PDF (",S.length,")"]})]}),_?(0,t.jsx)("div",{className:l.default.loading,children:"Loading donation records..."}):0===r.length?(0,t.jsxs)("div",{className:l.default.noData,children:[(0,t.jsx)("p",{children:"No donation records found in the database."}),(0,t.jsx)("p",{style:{marginTop:"10px",fontSize:"14px",color:"#9ca3af"},children:"Donations will appear here once they are submitted through the donation form."})]}):0===S.length?(0,t.jsxs)("div",{className:l.default.noData,children:["No donation records match your search criteria.",(0,t.jsx)("button",{onClick:()=>{f(""),b(""),g("all"),j("all"),G("none")},className:l.default.clearFilterBtn,style:{marginLeft:"10px"},children:"Clear All Filters"})]}):(0,t.jsx)("div",{className:l.default.tableContainer,children:(0,t.jsxs)("table",{className:l.default.table,children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Receipt No"}),(0,t.jsx)("th",{children:"Donated By"}),(0,t.jsx)("th",{children:"UPI ID"}),(0,t.jsx)("th",{children:"Address"}),(0,t.jsx)("th",{children:"Date"}),(0,t.jsx)("th",{children:"Amount"}),(0,t.jsx)("th",{children:"Description"}),(0,t.jsx)("th",{children:"Created At"}),(0,t.jsx)("th",{children:"Actions"})]})}),(0,t.jsx)("tbody",{children:S.map(e=>(0,t.jsxs)("tr",{children:[(0,t.jsx)("td",{className:l.default.receiptNo,children:e.receipt_no||"N/A"}),(0,t.jsx)("td",{className:l.default.donorName,children:e.donated_by||"N/A"}),(0,t.jsx)("td",{className:l.default.upiId,children:e.user_upi_id||"N/A"}),(0,t.jsxs)("td",{className:l.default.address,children:[e.street_address||"",", ",e.city||"",", ",e.state||""," - ",e.zip||""]}),(0,t.jsx)("td",{children:e.date_of_donation?C(e.date_of_donation):"N/A"}),(0,t.jsx)("td",{className:l.default.amount,children:T(e.donation_value||0)}),(0,t.jsx)("td",{className:l.default.description,title:e.description||"",children:e.description&&e.description.length>50?`${e.description.substring(0,50)}...`:e.description||"N/A"}),(0,t.jsx)("td",{children:e.created_at?C(e.created_at):"N/A"}),(0,t.jsx)("td",{children:(0,t.jsxs)("div",{className:l.default.actionButtons,children:[(0,t.jsx)("button",{onClick:()=>(e=>{let t=window.open("","_blank");if(!t)return;let a=new Date(e.date_of_donation).toLocaleDateString("en-IN",{year:"numeric",month:"long",day:"numeric"});t.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Donation Receipt - ${e.receipt_no}</title>
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
                        <p><strong>Receipt No:</strong> ${e.receipt_no}</p>
                        <p><strong>Date:</strong> ${a}</p>
                    </div>
                </div>

                <div class="info-section">
                    <h3>Donor Information</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Donated By:</label>
                            <span>${e.donated_by||"N/A"}</span>
                        </div>
                        <div class="info-item">
                            <label>User UPI ID:</label>
                            <span>${e.user_upi_id||"N/A"}</span>
                        </div>
                        <div class="info-item">
                            <label>Street Address:</label>
                            <span>${e.street_address||"N/A"}</span>
                        </div>
                        <div class="info-item">
                            <label>City:</label>
                            <span>${e.city||"N/A"}</span>
                        </div>
                        <div class="info-item">
                            <label>State:</label>
                            <span>${e.state||"N/A"}</span>
                        </div>
                        <div class="info-item">
                            <label>Zip Code:</label>
                            <span>${e.zip||"N/A"}</span>
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
                                    ${e.description||"N/A"}
                                </div>
                            </td>
                            <td class="amount-cell">₹${(e.donation_value||0).toLocaleString("en-IN")}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td style="text-align: right;"><strong>Total Donation:</strong></td>
                            <td class="amount-cell">₹${(e.donation_value||0).toLocaleString("en-IN")}</td>
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
        `),t.document.close()})(e),className:l.default.pdfButton,title:"Download PDF receipt",children:"Read"}),(0,t.jsx)("button",{onClick:()=>{A(e),L({userUpiId:e.user_upi_id||"",donatedBy:e.donated_by||"",streetAddress:e.street_address||"",city:e.city||"",state:e.state||"",zip:e.zip||"",dateOfDonation:e.date_of_donation||"",donationValue:e.donation_value?.toString()||"",description:e.description||"",taxId:e.tax_id||""})},className:l.default.editButton,title:"Edit donation record",children:"Edit"}),(0,t.jsx)("button",{onClick:()=>w(e.donation_id,e.receipt_no),className:l.default.deleteButton,title:"Delete donation record",children:"Delete"})]})})]},e.donation_id))})]})}),u&&u.donationsByMonth.length>0&&(d=Math.max(...e=u.donationsByMonth.map(e=>e.amount),0),s=Math.min(...e.filter(e=>e>0),d),(0,t.jsxs)("div",{className:l.default.chartSection,children:[(0,t.jsx)("h2",{className:l.default.chartTitle,children:"Monthly Donations"}),(0,t.jsx)("div",{className:l.default.chartContainer,children:(0,t.jsx)("div",{className:l.default.barChart,children:u.donationsByMonth.map(e=>{let a=d>0?e.amount/d*100:0,o=e.amount===d&&d>0,n=e.amount===s&&s<d&&e.amount>0,i=!o&&!n&&e.amount>0,r=l.default.bar;return o?r+=` ${l.default.barHighest}`:n?r+=` ${l.default.barLowest}`:i&&(r+=` ${l.default.barMid}`),(0,t.jsxs)("div",{className:l.default.barItem,children:[(0,t.jsx)("div",{className:l.default.barWrapper,children:(0,t.jsx)("div",{className:r,style:{height:`${a}%`,minHeight:a>0?"20px":"0px"},children:(0,t.jsx)("span",{className:l.default.barAmount,children:T(e.amount)})})}),(0,t.jsx)("div",{className:l.default.barLabel,children:e.month}),(0,t.jsxs)("div",{className:l.default.barCount,children:[e.count," donation",1!==e.count?"s":""]})]},e.monthKey||e.month)})})})]})),u&&u.topDonors.length>0&&(0,t.jsxs)("div",{className:l.default.topDonorsSection,children:[(0,t.jsx)("h2",{className:l.default.chartTitle,children:"Top Donors"}),(0,t.jsx)("div",{className:l.default.topDonorsList,children:u.topDonors.map((e,a)=>(0,t.jsxs)("div",{className:l.default.donorCard,children:[(0,t.jsxs)("div",{className:l.default.donorRank,children:["#",a+1]}),(0,t.jsxs)("div",{className:l.default.donorInfo,children:[(0,t.jsx)("h3",{className:l.default.donorName,children:e.name}),(0,t.jsxs)("p",{className:l.default.donorStats,children:[e.count," donation",e.count>1?"s":""," • ",T(e.total)]})]})]},a))})]})]}),D&&(0,t.jsx)("div",{className:l.default.modalOverlay,onClick:()=>A(null),children:(0,t.jsxs)("div",{className:l.default.modalContent,onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)("div",{className:l.default.modalHeader,children:[(0,t.jsx)("h2",{className:l.default.modalTitle,children:"Edit Donation Record"}),(0,t.jsx)("button",{className:l.default.modalCloseButton,onClick:()=>A(null),children:"×"})]}),(0,t.jsxs)("form",{onSubmit:B,className:l.default.editForm,children:[(0,t.jsxs)("div",{className:l.default.formGroup,children:[(0,t.jsx)("label",{className:l.default.label,children:"Receipt No:"}),(0,t.jsx)("input",{type:"text",value:D.receipt_no,className:l.default.input,disabled:!0})]}),(0,t.jsxs)("div",{className:l.default.formGroup,children:[(0,t.jsx)("label",{className:l.default.label,children:"User UPI ID: *"}),(0,t.jsx)("input",{type:"text",name:"userUpiId",value:R.userUpiId,onChange:k,className:l.default.input,required:!0})]}),(0,t.jsxs)("div",{className:l.default.formGroup,children:[(0,t.jsx)("label",{className:l.default.label,children:"Donated By: *"}),(0,t.jsx)("input",{type:"text",name:"donatedBy",value:R.donatedBy,onChange:k,className:l.default.input,required:!0})]}),(0,t.jsxs)("div",{className:l.default.formGroup,children:[(0,t.jsx)("label",{className:l.default.label,children:"Street Address: *"}),(0,t.jsx)("input",{type:"text",name:"streetAddress",value:R.streetAddress,onChange:k,className:l.default.input,required:!0})]}),(0,t.jsxs)("div",{className:l.default.formRow,children:[(0,t.jsxs)("div",{className:l.default.formGroup,children:[(0,t.jsx)("label",{className:l.default.label,children:"City: *"}),(0,t.jsx)("input",{type:"text",name:"city",value:R.city,onChange:k,className:l.default.input,required:!0})]}),(0,t.jsxs)("div",{className:l.default.formGroup,children:[(0,t.jsx)("label",{className:l.default.label,children:"State: *"}),(0,t.jsx)("input",{type:"text",name:"state",value:R.state,onChange:k,className:l.default.input,required:!0})]}),(0,t.jsxs)("div",{className:l.default.formGroup,children:[(0,t.jsx)("label",{className:l.default.label,children:"Zip: *"}),(0,t.jsx)("input",{type:"text",name:"zip",value:R.zip,onChange:k,className:l.default.input,required:!0,pattern:"[0-9]{6}",maxLength:6})]})]}),(0,t.jsxs)("div",{className:l.default.formGroup,children:[(0,t.jsx)("label",{className:l.default.label,children:"Date of Donation: *"}),(0,t.jsx)("input",{type:"date",name:"dateOfDonation",value:R.dateOfDonation,onChange:k,className:l.default.input,required:!0})]}),(0,t.jsxs)("div",{className:l.default.formGroup,children:[(0,t.jsx)("label",{className:l.default.label,children:"Donation Value: *"}),(0,t.jsx)("input",{type:"number",name:"donationValue",value:R.donationValue,onChange:k,className:l.default.input,required:!0,min:"1",step:"0.01"})]}),(0,t.jsxs)("div",{className:l.default.formGroup,children:[(0,t.jsx)("label",{className:l.default.label,children:"Description: *"}),(0,t.jsx)("textarea",{name:"description",value:R.description,onChange:k,className:l.default.textarea,required:!0,rows:4})]}),(0,t.jsxs)("div",{className:l.default.formGroup,children:[(0,t.jsx)("label",{className:l.default.label,children:"Tax ID:"}),(0,t.jsx)("input",{type:"text",name:"taxId",value:R.taxId,onChange:k,className:l.default.input})]}),(0,t.jsxs)("div",{className:l.default.modalActions,children:[(0,t.jsx)("button",{type:"submit",className:l.default.saveButton,children:"Save Changes"}),(0,t.jsx)("button",{type:"button",className:l.default.cancelButton,onClick:()=>A(null),children:"Cancel"})]})]})]})})]})}])}]);