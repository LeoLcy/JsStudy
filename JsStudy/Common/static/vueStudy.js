define(function (require, exports, module) {
    var jQuery = require("jQuery");// 加载jquery模块  
    /*
    1、//使用以下代码将jquery源码包裹起来，可以是jquery模块化
    //define(function () {
    //    jquery源码位置
    //    return $.noConflict(true);
    //});
    2、 由于JQuery本身就有对AMD规范与CommonJS的支持，在其代码中包含以下定义：
    我们只需要将其中的 define.amd 改为 define 即可。
    //好像没有作用。。。。
    */
    console.log(jQuery);
    require("vue");
    //console.log(vue);
    //require("bootstrap")(jQuery);//加载bootstrap模块
    var vm = new Vue({
        el: "#content",
        data: {
            user: {
                userid: "",
                password: "",
                confirmpwd:""
            }
        },// computed property for form validation state
        computed: {
            validation: function () {
                return {
                    userid: !!this.user.userid.trim() && (this.user.userid.length > 6),
                    password: !!this.user.password.trim() && (this.user.password.length > 6),
                    confirmpwd: !!this.user.confirmpwd.trim() && (this.user.confirmpwd === this.user.password)
                }
            },
            isValid: function () {
                var validation = this.validation
                return Object.keys(validation).every(function (key) {
                    return validation[key]
                })
            }
        },
        // methods
        methods: {
            addUser: function (e) {
                e.preventDefault()
                if (this.isValid) {
                    alert(user.userid + "-" + user.password + "-" + user.confirmpwd);
                }
            }
        }
    });
});