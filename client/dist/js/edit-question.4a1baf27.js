(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{"990/":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("section",{staticClass:"section"},[i("div",{staticClass:"container"},[i("form",{on:{submit:function(e){return e.preventDefault(),t.submitQuestion(e)}}},[i("b-field",{attrs:{label:"Title"}},[i("b-input",{attrs:{required:""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),i("b-field",[i("quill-editor",{model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),i("b-field",[i("button",{staticClass:"button is-primary is-fullwidth"},[t._v("\n          "+t._s(t.mode)+" Question\n        ")])])],1)])])},s=[],o=i("yT7P"),u=i("L2JU"),r=i("lT11"),a={name:"AppEditor",components:{quillEditor:r["quillEditor"]},data:function(){return{title:"",content:""}},computed:Object(o["a"])({},Object(u["c"])("questions",["question"]),{mode:function(){return this.question?"Edit":"Ask"}}),methods:Object(o["a"])({},Object(u["b"])("questions",["postQuestion","editQuestion"]),{submitQuestion:function(){var t=this;if(""===this.title.trim()||""===this.content.trim())return this._vm.$toast.open({duration:1e3,message:"Title or Content cannot be empty",type:"is-danger"});var e={title:this.title,content:this.content};this.question?this.$dialog.confirm({title:"Updating Question",message:"Are you finished <b>updating</b> this question?",confirmText:"Yes",type:"is-info",hasIcon:!0,onConfirm:function(){return t.editQuestion({updateData:e,slug:t.question.slug})}}):this.$dialog.confirm({title:"Post Question",message:"Do you want <b>post</b> this question?",confirmText:"Yes",type:"is-primary",hasIcon:!0,onConfirm:function(){return t.postQuestion(e)}})}}),created:function(){this.question&&(this.title=this.question.title,this.content=this.question.content)}},c=a,l=i("KHd+"),h=Object(l["a"])(c,n,s,!1,null,null,null);e["a"]=h.exports},bM18:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("section",{staticClass:"hero is-info"},[i("div",{staticClass:"hero-body"},[i("div",{staticClass:"container"},[i("h1",{staticClass:"title"},[t._v("Edit Question")]),i("h2",{staticClass:"subtitle"},[t._v(t._s(t.question&&t.question.title))])])])]),t.question?i("vq-form"):t._e()],1)},s=[],o=(i("ls82"),i("MECJ")),u=i("yT7P"),r=i("990/"),a=i("L2JU"),c={name:"Edit",components:{"vq-form":r["a"]},computed:Object(u["a"])({},Object(a["c"])("questions",["question"]),Object(a["c"])("user",["username"])),methods:Object(u["a"])({},Object(a["b"])("questions",["setQuestion","fetchQuestionBySlug"])),created:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.$route.params.slug,t.next=3,this.fetchQuestionBySlug(e);case 3:this.question.author[0]!==this.username&&this.$router.push({name:"home"});case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),beforeRouteLeave:function(t,e,i){this.setQuestion(null),i()}},l=c,h=i("KHd+"),d=Object(h["a"])(l,n,s,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=edit-question.4a1baf27.js.map