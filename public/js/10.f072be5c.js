(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{"996f":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"column content-center items-center"},[a("q-avatar",{attrs:{color:"primary","text-color":"white",size:"100px"}},[t._v(t._s(t.fullName[0]))]),a("div",{staticClass:"text-h5 q-ma-md"},[t._v(t._s(t.fullName))]),a("q-expansion-item",{staticClass:"text-body1",attrs:{"expand-separator":"",dense:"",label:"Personal Information"}},[""!==t.userInfo?a("q-card",[a("q-card-section",[t._v("Email:"+t._s(t.userInfo.email))]),a("q-card-section",[t._v("Birthdate:"+t._s(t.userInfo.birthdate.slice(0,10)))]),a("q-card-section",[t._v("Only "+t._s(t.userInfo.daysUntilBirthday)+" days remaining untill yor next birthday 🎂")])],1):t._e()],1),a("q-btn-dropdown",{staticClass:"q-mt-md",attrs:{color:"primary","dropdown-icon":"fas fa-cog",label:"Settings"}},[a("q-list",[a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"far fa-envelope"}})],1),a("q-item-section",[a("q-item-label",[t._v("Change Email")])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{name:"fas fa-key"}})],1),a("q-item-section",[a("q-item-label",[t._v("Change Password")])],1)],1),a("q-item",{directives:[{name:"close-popup",rawName:"v-close-popup"}],attrs:{clickable:""},on:{click:function(e){t.delAccountDialog=!0}}},[a("q-item-section",{attrs:{avatar:""}},[a("q-icon",{attrs:{color:"red",name:"far fa-trash-alt"}})],1),a("q-item-section",[a("q-item-label",{staticClass:"text-red"},[t._v("Delete Account")])],1)],1)],1)],1),a("q-dialog",{attrs:{persistent:"","transition-show":"scale","transition-hide":"scale"},model:{value:t.delAccountDialog,callback:function(e){t.delAccountDialog=e},expression:"delAccountDialog"}},[a("q-card",{staticClass:"bg-red text-white",staticStyle:{width:"300px"}},[a("q-card-section",[a("div",{staticClass:"text-h6"},[t._v("Delete Account")])]),a("q-card-section",{staticClass:"q-pt-none"},[t._v("Are you sure you want to delete your account")]),a("q-card-actions",{staticClass:"bg-white",attrs:{align:"right"}},[a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"text-green",attrs:{flat:"",label:"Cancel"}}),a("q-btn",{directives:[{name:"close-popup",rawName:"v-close-popup"}],staticClass:"text-red",attrs:{flat:"",label:"Delete"},on:{click:t.deleteAccount}})],1)],1)],1)],1)},o=[],i=a("c973"),c=a.n(i),n=(a("bd4c"),{data(){return{userInfo:"",delAccountDialog:!1}},created(){var t=this;return c()((function*(){const e=yield t.$axios.get("/api/user/profile");t.userInfo=e.data}))()},computed:{fullName(){return this.$store.getters["chatStore/getFullName"]}},methods:{deleteAccount(){this.$axios.delete("/api/user").then(t=>{200==t.status&&(this.$router.push("/"),this.$q.notify({message:"Account Deleted",color:"positive"}))})}}}),r=n,l=a("2877"),d=a("cb32"),p=a("3b73"),u=a("f09f"),m=a("a370"),v=a("f20b"),f=a("1c1c"),q=a("66e5"),b=a("4074"),h=a("0016"),g=a("0170"),w=a("24e8"),x=a("4b7e"),C=a("9c40"),_=a("7f67"),y=a("eebe"),A=a.n(y),Q=Object(l["a"])(r,s,o,!1,null,null,null);e["default"]=Q.exports;A()(Q,"components",{QAvatar:d["a"],QExpansionItem:p["a"],QCard:u["a"],QCardSection:m["a"],QBtnDropdown:v["a"],QList:f["a"],QItem:q["a"],QItemSection:b["a"],QIcon:h["a"],QItemLabel:g["a"],QDialog:w["a"],QCardActions:x["a"],QBtn:C["a"]}),A()(Q,"directives",{ClosePopup:_["a"]})}}]);