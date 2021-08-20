(this.webpackJsonptasks=this.webpackJsonptasks||[]).push([[0],{117:function(e,t,n){},225:function(e,t,n){"use strict";n.r(t);var s,a,i,c,r,l,d,o,m,b,j=n(2),u=n.n(j),g=n(102),x=n.n(g),h=n(236),O=n(238),f=n(235),p=(n(117),n(13)),v=n(237),w=n(239),N=n(30),y=n(11),k=n(6),S=n(0),$=function(e){var t=e.day;return Object(S.jsx)("div",{className:"border border-collapse border-solid border-gray-900 h-36",children:Object(S.jsx)("div",{children:t})})},T=function(e){var t=e.date,n=t.getFullYear(),s=t.getMonth(),a=[31,1===new Date(n,1,29).getMonth()?29:28,31,30,31,30,31,31,30,31,30,31],i=new Date(n,s,1).getDay(),c=new Date(n,s,a[s]).getDay();return Object(S.jsx)("div",{className:"grid grid-cols-7 grid-rows-5",children:function(e){for(var t=[],n=[],s=[],r=a[e-1]-i+2;r<a[e-1]+1;r++)t.push(r);for(var l=1;l<a[e]+1;l++)n.push(l);for(var d=1;d<7-c+1;d++)s.push(d);return[].concat(t,n,s)}(s).map((function(e,t){return Object(S.jsx)($,{day:e},t)}))})},q=n(4),C=function(e){var t=e.label,n=e.name,s=e.type,a=e.children,i=e.list;return Object(S.jsxs)("div",{className:"mb-4 flex flex-col",children:[Object(S.jsx)("label",{htmlFor:n,className:"font-bold text-indigo-600 mr-2",children:t}),Object(S.jsx)(q.b,{name:n,type:"textarea"!==s&&"select"!==s?s:void 0,as:"textarea"===s|"select"===s?s:void 0,className:"rounded focus:outline-none focus:ring",children:"select"===s?a:void 0,list:i||void 0,placeholder:""}),Object(S.jsx)(q.a,{name:n,component:"div",className:"text-red-600 text-sm"})]})},R=n(10),U=n(240),D=Object(v.a)(s||(s=Object(p.a)(["\n  mutation CreateTask(\n    $name: String!\n    $description: String!\n    $date: String!\n    $urgent: Boolean!\n    $assignees: [UserInput]!\n  ) {\n    addTask(\n      name: $name\n      description: $description\n      date: $date\n      urgent: $urgent\n      assignees: $assignees\n    ) {\n      success\n      message\n    }\n  }\n"]))),F={name:"",description:"",date:"",urgent:!1,assignees:[{email:""}]},I=function(e){var t=e.refetchTasks,n=e.user,s=Object(U.a)(D,{onCompleted:function(){return t()}}),a=Object(k.a)(s,2),i=a[0],c=a[1].data,r="assignees";return Object(S.jsxs)("div",{className:"bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4",children:[Object(S.jsx)(q.e,{initialValues:F,validationSchema:R.c({name:R.d().required("Required"),description:R.d().required("Required"),date:R.b(),urgent:R.a()}),onSubmit:function(e,t){var n=t.setSubmitting;setTimeout((function(){i({variables:{name:e.name,description:e.description,date:new Date(e.date).toISOString(),urgent:e.urgent,assignees:e.assignees.filter((function(e){return""!==e.email}))}}),n(!1)}),400)},className:"flex items-center justify-center",children:function(e){var t=e.values;return Object(S.jsxs)(q.d,{children:[Object(S.jsx)(C,{label:"Title",name:"name",type:"text"}),Object(S.jsx)(C,{label:"Description",name:"description",type:"textarea"}),Object(S.jsx)(C,{label:"Date",name:"date",type:"datetime-local"}),Object(S.jsx)(C,{label:"Urgent",name:"urgent",type:"checkbox"}),Object(S.jsx)(q.c,{name:"assignees",children:function(e){var n=e.remove,s=e.push;return Object(S.jsxs)("div",{className:"flex items-center flex-col",children:[t.assignees.length>0&&t.assignees.map((function(e,t){return Object(S.jsxs)("div",{className:"flex items-center",children:[Object(S.jsx)(C,{name:"assignees.".concat(t,".email"),list:r,label:"Assignee"}),Object(S.jsx)("button",{onClick:function(){return n(t)},className:"mt-2 ml-1 rounded-lg w-6 bg-red-200 hover:bg-red-500",children:"X"})]},t)})),Object(S.jsx)("button",{type:"button",onClick:function(){return s({email:""})},className:"rounded bg-yellow-200 hover:bg-yellow-500 mb-3 -mt-3",children:"New Assignee"})]})}}),Object(S.jsx)("button",{type:"submit",className:"rounded w-full bg-green-200 hover:bg-green-500",children:"Create"})]})}}),c?c.addTask.message:null,Object(S.jsx)("datalist",{id:r,children:n.connections.map((function(e){return Object(S.jsx)("option",{value:e.email,children:e.name},e.email)}))})]})},P=function(e){var t=e.date,n=e.setDate,s=Object(j.useState)("".concat(t.getFullYear(),"-").concat(t.getMonth()<9?"0"+(t.getMonth()+1):t.getMonth+1,"-").concat(t.getDate()<9?"0"+(t.getDate()+1):t.getDate()+1)),a=Object(k.a)(s,2),i=a[0],c=a[1];return Object(S.jsx)("div",{children:Object(S.jsxs)("form",{onSubmit:function(e){n(new Date(i.slice(0,4),i.slice(5,7)-1,i.slice(8,10))),e.preventDefault()},children:[Object(S.jsx)("input",{type:"date",name:"date",value:i,onChange:function(e){c(e.target.value)}}),Object(S.jsx)("button",{type:"submit",children:"GO"})]})})},A=n(73),E=n(74),M=Object(v.a)(a||(a=Object(p.a)(["\n  mutation DeleteTask($id: Int!) {\n    deleteTask(id: $id) {\n      message\n      success\n    }\n  }\n"]))),L=Object(v.a)(i||(i=Object(p.a)(["\n  mutation EditTask(\n    $id: Int!\n    $assignees: [UserInput]\n    $completed: Boolean\n    $date: String\n    $description: String\n    $name: String\n    $urgent: Boolean\n  ) {\n    editTask(\n      id: $id\n      assignees: $assignees\n      completed: $completed\n      date: $date\n      description: $description\n      name: $name\n      urgent: $urgent\n    ) {\n      message\n      success\n    }\n  }\n"]))),V=function(e){var t=e.task,n=e.refetchTasks,s=Object(j.useState)(!1),a=Object(k.a)(s,2),i=a[0],c=a[1],r=Object(U.a)(M,{onCompleted:function(){return n()}}),l=Object(k.a)(r,1)[0],d=Object(U.a)(L,{onCompleted:function(){return n()}});Object(k.a)(d,1)[0];return Object(S.jsxs)("div",{className:"rounded-lg shadow-2xl flex flex-col ".concat(t.urgent?"bg-red-400":"bg-blue-400"),children:[Object(S.jsxs)("div",{className:"flex flex-row",children:[Object(S.jsx)("div",{className:"font-bold text-xl ml-auto",children:t.name}),Object(S.jsxs)("div",{className:"ml-auto mr-2 mt-1",children:[Object(S.jsxs)("div",{className:"group relative inline-block mt-1 mr-2",children:[Object(S.jsx)("button",{onClick:function(){return c(!0)},children:Object(S.jsx)(A.a,{icon:E.a})}),Object(S.jsx)("span",{className:"group-hover:inline-block absolute bg-gray-600 rounded shadow-lg z-50 left-1/2 top-full -ml-4 text-center text-white hidden",children:"Edit"})]}),Object(S.jsxs)("div",{className:"group relative inline-block",children:[Object(S.jsx)("button",{onClick:function(){return l({variables:{id:t.id}})},className:"hover:bg-red-600 bg-green-600 rounded-full w-6 ",children:Object(S.jsx)(A.a,{icon:E.b})}),Object(S.jsx)("span",{className:"group-hover:inline-block absolute bg-gray-600 rounded shadow-lg z-50 left-1/2 top-full -ml-8 text-center text-white hidden",children:"Delete"})]})]})]}),i?Object(S.jsx)("div",{}):Object(S.jsxs)("div",{children:[Object(S.jsx)("div",{className:"font-bold",children:"Description"}),Object(S.jsx)("div",{className:"bg-yellow-300 rounded",children:t.description}),Object(S.jsx)("div",{children:new Date(Number(t.date)).toDateString()}),Object(S.jsxs)("div",{className:"font-bold",children:["Manager:","  ",Object(S.jsx)("div",{className:"bg-green-800 rounded-md inline-block text-white ml-1",children:t.manager.name})]}),Object(S.jsxs)("div",{className:"font-bold",children:["Assigned to:","  ",t.assignees.map((function(e){return Object(S.jsx)("div",{className:"bg-purple-600 rounded-md inline-block text-white ml-1",children:e.name},e.name)}))]})]})]})},B=function(e){var t=e.tasks,n=e.loading,s=e.refetchTasks;return Object(S.jsx)("div",{children:n|null===t?"Getting tasks...":t.map((function(e){return Object(S.jsx)(V,{refetchTasks:s,task:e},e.id)}))})},G=Object(v.a)(c||(c=Object(p.a)(["\n    mutation AddConnection($email: String!) {\n        addConnection(email: $email) {\n            message\n            success\n        }\n    }\n"]))),Y=function(e){var t=e.refetchUser,n=e.user,s=Object(U.a)(G,{onCompleted:function(){return t()}}),a=Object(k.a)(s,2),i=a[0],c=a[1].data;return Object(S.jsxs)("div",{className:"bg-origin-padding rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4",children:[Object(S.jsx)(q.e,{initialValues:{email:""},validationSchema:R.c({email:R.d().email("Invalid email address").required("Required")}),onSubmit:function(e,t){var n=t.setSubmitting;setTimeout((function(){i({variables:{email:e.email}}),n(!1)}),400)},className:"flex items-center justify-center",children:Object(S.jsxs)(q.d,{children:[Object(S.jsx)(C,{label:"User's Email",name:"email",type:"email"}),Object(S.jsx)("button",{type:"submit",className:"rounded w-full bg-green-200 hover:bg-green-500",children:"Connect"}),Object(S.jsx)("div",{className:"text-red-600 text-sm mt-2",children:c?c.addConnection.message:void 0})]})}),Object(S.jsx)("div",{className:"font-bold",children:"Connections"}),n.connections.map((function(e){return Object(S.jsxs)("div",{className:"text-yellow-700",children:[e.name,": ",e.email]},e.name)})),Object(S.jsx)("div",{className:"font-bold",children:"Connects To You"}),n.connectsToUser.map((function(e){return Object(S.jsxs)("div",{className:"text-yellow-700",children:[e.name,": ",e.email]},e.name)}))]})},z=Object(v.a)(r||(r=Object(p.a)(["\n  query GetTasks {\n    getAssignedTasks {\n      id\n      name\n      description\n      date\n      assignees {\n        name\n      }\n      completed\n      urgent\n      manager {\n        name\n      }\n    }\n  }\n"]))),J=function(e){var t=e.refetchUser,n=e.user,s=Object(j.useState)(new Date),a=Object(k.a)(s,2),i=a[0],c=a[1],r=Object(w.a)(z),l=r.loading,d=r.data,o=r.refetch;return Object(S.jsxs)("div",{className:"bg-gray-100",children:[Object(S.jsx)("button",{onClick:function(){document.cookie="token=; expires=0",t()},children:"Log Out"}),Object(S.jsx)(P,{date:i,setDate:c}),Object(S.jsx)(T,{testMonth:"september",date:i}),Object(S.jsx)(B,{refetchTasks:o,tasks:d?d.getAssignedTasks:void 0,loading:l||void 0}),Object(S.jsxs)("div",{className:"flex",children:[Object(S.jsx)(I,{refetchTasks:o,user:n}),Object(S.jsx)(Y,{refetchUser:t,user:n})]})]})},Q=Object(v.a)(l||(l=Object(p.a)(["\n  mutation CreateResetToken($email: String!) {\n    createResetToken(email: $email) {\n      message\n      success\n    }\n  }\n"]))),X=function(){var e=Object(U.a)(Q),t=Object(k.a)(e,2),n=t[0],s=t[1],a=s.data;if(s.loading)return Object(S.jsx)("div",{children:"Sending reset code..."});if(void 0===a);else if(a.createResetToken.success)return Object(S.jsx)(y.a,{to:"/auth/forgot/reset"});return Object(S.jsxs)("div",{className:"bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4",children:[Object(S.jsx)(q.e,{initialValues:{email:""},validationSchema:R.c({email:R.d().email("Invalid email address").required("Required")}),onSubmit:function(e,t){var s=t.setSubmitting;setTimeout((function(){n({variables:{email:e.email}}),s(!1)}),400)},className:"flex items-center justify-center",children:Object(S.jsxs)(q.d,{children:[Object(S.jsx)(C,{label:"Email",name:"email",type:"text"}),Object(S.jsx)("div",{className:"h-4"}),Object(S.jsx)("button",{type:"submit",className:"bg-blue-600 rounded-full w-full text-white",children:"Forgot"})]})}),a&&!a.createResetToken.success?Object(S.jsx)("div",{children:a.createResetToken.message}):void 0]})},H=Object(v.a)(d||(d=Object(p.a)(["\n  mutation ResetPassword($email: String!, $password: String!, $token: String!) {\n    resetPassword(email: $email, password: $password, token: $token) {\n      message\n      success\n    }\n  }\n"]))),K=function(){var e=Object(U.a)(H),t=Object(k.a)(e,2),n=t[0],s=t[1],a=s.data;if(s.loading)return Object(S.jsx)("div",{children:"Checking"});if(void 0===a);else if(a.resetPassword.success)return Object(S.jsxs)("div",{className:"flex items-center justify-center flex-col bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4",children:[Object(S.jsx)("div",{className:"text-center",children:"Reset Successful"}),Object(S.jsx)(N.b,{to:"/auth",className:"bg-blue-600 rounded-full w-full text-white mt-5 text-center",children:"Sign In"})]});return Object(S.jsxs)("div",{className:"bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4",children:[Object(S.jsx)(q.e,{initialValues:{email:"",password:"",token:""},validationSchema:R.c({email:R.d().email("Invalid email address").required("Required"),password:R.d().required("Required"),token:R.d().matches(/^\d+$/,"Reset code is only numbers").length(6,"Reset code is six digits").required("Required")}),onSubmit:function(e,t){var s=t.setSubmitting;setTimeout((function(){n({variables:{email:e.email,password:e.password,token:e.token}}),s(!1)}),400)},className:"flex items-center justify-center",children:Object(S.jsxs)(q.d,{children:[Object(S.jsx)(C,{label:"Email",name:"email",type:"text"}),Object(S.jsx)(C,{label:"Password",name:"password",type:"password"}),Object(S.jsx)(C,{label:"Reset Code",name:"token",type:"text"}),Object(S.jsx)("div",{className:"h-4"}),Object(S.jsx)("button",{type:"submit",className:"bg-blue-600 rounded-full w-full text-white",children:"Reset"})]})}),a&&!a.resetPassword.success?Object(S.jsx)("div",{children:a.resetPassword.message}):void 0]})},W=function(){return Object(S.jsxs)("div",{children:[Object(S.jsx)(y.b,{exact:!0,path:"/auth/forgot",children:Object(S.jsx)(X,{})}),Object(S.jsx)(y.b,{path:"/auth/forgot/reset",children:Object(S.jsx)(K,{})})]})},Z=Object(v.a)(o||(o=Object(p.a)(["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      message\n    }\n  }\n"]))),_=function(e){var t=e.refetchUser,n=Object(U.a)(Z,{onCompleted:function(e){r(e.login.message),t()}}),s=Object(k.a)(n,1)[0],a=Object(j.useState)(""),i=Object(k.a)(a,2),c=i[0],r=i[1],l=Object(j.useState)(!1),d=Object(k.a)(l,2),o=d[0],m=d[1];return Object(S.jsxs)("div",{className:"bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4",children:[o?Object(S.jsx)(y.a,{to:"/auth/forgot"}):void 0,Object(S.jsx)(q.e,{initialValues:{email:"",password:""},validationSchema:R.c({email:R.d().email("Invalid email address").required("Required"),password:R.d().required("Required")}),onSubmit:function(e,t){var n=t.setSubmitting;setTimeout((function(){s({variables:{email:e.email,password:e.password}}),n(!1)}),400)},className:"flex items-center justify-center",children:Object(S.jsxs)(q.d,{children:[Object(S.jsx)("label",{htmlFor:"email",className:"font-bold",children:"Email"}),Object(S.jsx)(q.b,{name:"email",type:"email",className:"rounded-lg "}),Object(S.jsx)(q.a,{name:"email",component:"div",className:"text-red-600 text-sm"}),Object(S.jsx)("div",{className:"h-4"}),Object(S.jsx)("label",{htmlFor:"password",className:"font-bold",children:"Password"}),Object(S.jsx)(q.b,{name:"password",type:"password",className:"rounded-lg "}),Object(S.jsx)(q.a,{name:"password",component:"div",className:"text-red-600 text-sm"}),Object(S.jsx)("div",{className:"h-4"}),Object(S.jsx)("button",{type:"submit",className:"bg-blue-600 rounded-full w-full text-white",children:"Login"})]})}),Object(S.jsx)("div",{className:"text-red-600 text-sm mt-2",children:c}),Object(S.jsx)("button",{onClick:function(){return m(!0)},className:"bg-blue-600 rounded-full w-full text-white mt-5",children:"Forgot Password"})]})},ee=Object(v.a)(m||(m=Object(p.a)(["\n  mutation SignUp($email: String!, $password: String!, $name: String!) {\n    createAccount(email: $email, password: $password, name: $name) {\n      message\n    }\n  }\n"]))),te=function(e){var t=e.refetchUser,n=Object(U.a)(ee,{onCompleted:function(e){r(e.createAccount.message),t()}}),s=Object(k.a)(n,1)[0],a=Object(j.useState)(""),i=Object(k.a)(a,2),c=i[0],r=i[1];return Object(S.jsxs)("div",{className:"bg-origin-padding w-min rounded-lg bg-gray-300 bg-opacity-90 shadow-2xl mt-10 ml-10 p-4",children:[Object(S.jsx)(q.e,{initialValues:{name:"",email:"",password:""},validationSchema:R.c({name:R.d().required("Required"),email:R.d().email("Invalid email address").required("Required"),password:R.d().required("Required")}),onSubmit:function(e,t){var n=t.setSubmitting;setTimeout((function(){s({variables:{name:e.name,email:e.email,password:e.password}}),n(!1)}),400)},className:"flex items-center justify-center",children:Object(S.jsxs)(q.d,{children:[Object(S.jsx)("label",{htmlFor:"name",className:"font-bold",children:"Name"}),Object(S.jsx)(q.b,{name:"name",type:"name",className:"rounded-lg "}),Object(S.jsx)(q.a,{name:"name",component:"div",className:"text-red-600 text-sm"}),Object(S.jsx)("div",{className:"h-4"}),Object(S.jsx)("label",{htmlFor:"email",className:"font-bold",children:"Email"}),Object(S.jsx)(q.b,{name:"email",type:"email",className:"rounded-lg "}),Object(S.jsx)(q.a,{name:"email",component:"div",className:"text-red-600 text-sm"}),Object(S.jsx)("div",{className:"h-4"}),Object(S.jsx)("label",{htmlFor:"password",className:"font-bold",children:"Password"}),Object(S.jsx)(q.b,{name:"password",type:"password",className:"rounded-lg "}),Object(S.jsx)(q.a,{name:"password",component:"div",className:"text-red-600 text-sm"}),Object(S.jsx)("div",{className:"h-4"}),Object(S.jsx)("button",{type:"submit",className:"bg-blue-600 rounded-full w-full text-white",children:"Sign Up"})]})}),Object(S.jsx)("div",{className:"text-red-600 text-sm mt-2",children:c})]})},ne=function(e){var t=e.refetchUser;return Object(S.jsxs)("div",{children:[Object(S.jsx)(y.b,{exact:!0,path:"/auth",children:Object(S.jsxs)("div",{className:"flex flex-wrap justify-center items-center h-screen",children:[Object(S.jsx)(_,{refetchUser:t}),Object(S.jsx)(te,{refetchUser:t})]})}),Object(S.jsx)(y.b,{path:"/auth/forgot",children:Object(S.jsx)(W,{})})]})},se=Object(v.a)(b||(b=Object(p.a)(["\n  query GetUser {\n    getUser {\n      id\n      name\n      email\n      connections {\n        name\n        email\n      }\n      connectsToUser {\n        name\n        email\n      }\n    }\n  }\n"])));var ae=function(){var e=Object(w.a)(se),t=e.loading,n=e.data,s=e.refetch;return t?"Logging in...":Object(S.jsxs)(N.a,{children:[Object(S.jsx)(y.b,{path:"/",exact:!0,children:n.getUser?Object(S.jsx)(J,{refetchUser:s,user:n.getUser}):Object(S.jsx)(y.a,{to:"/auth"})}),Object(S.jsx)(y.b,{path:"/auth",children:n.getUser?Object(S.jsx)(y.a,{to:"/"}):Object(S.jsx)(ne,{refetchUser:s})})]})},ie=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,242)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),s(e),a(e),i(e),c(e)}))},ce=new h.a({uri:"/graphql",cache:new O.a({typePolicies:{Query:{fields:{getAssignedTasks:{merge:!1}}}}})});x.a.render(Object(S.jsx)(u.a.StrictMode,{children:Object(S.jsx)(f.a,{client:ce,children:Object(S.jsx)("div",{children:Object(S.jsx)(ae,{})})})}),document.getElementById("root")),ie()}},[[225,1,2]]]);
//# sourceMappingURL=main.a83474fb.chunk.js.map