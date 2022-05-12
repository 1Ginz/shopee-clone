function Validator(options){

    var selectorRules = {};

    // hàm thực hiện validate 
    function Validate(inputElement,rule){
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);

        // lấy ra các rule của selector 
        var rules = selectorRules[rule.selector];

        // lặp qua từng rule và kiểm tra
        // nếu có lỗi thì dừng kiểm tra 
        for(var i = 0; i<rules.length; i++){
            errorMessage =  rules[i](inputElement.value)
            if(errorMessage) break;
        }
        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid");
        }
        else{
            errorElement.innerText = "";
            inputElement.parentElement.classList.remove("invalid");
        }

        return !errorMessage;
    }

    // lấy Element form cần validate 
    var formElement =document.querySelector(options.form);
    if(formElement){
        // khi submit 
        formElement.onsubmit = function(e){
            e.preventDefault();
            var isFormValid = true;
            // lặp qua từng rule & vaildate 
            options.rules.forEach(function(rule){
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = Validate(inputElement,rule);
                if(!isValid) isFormValid = false;
            });


            if(isFormValid){
                // submit vs js 
                if (typeof options.onSubmit === 'function'){
                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])');
                    var formValues = Array.from(enableInputs).reduce(function(values,input){
                        (values[input.name] = input.value);
                        return values;
                    },{});
                    options.onSubmit(formValues)
                }
                // submid vs hành vi mặc định 
                else{
                    formElement.submit();
                }
            }
        }
        


        // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
        options.rules.forEach(rule => {
            // lưu lại các rule cho mỗi input 
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }
            else selectorRules[rule.selector] = [rule.test];

            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement){
                inputElement.onblur = function(){
                    Validate(inputElement, rule);
                };

                inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = "";
                    inputElement.parentElement.classList.remove("invalid");
                };

            }
        });
        console.log(selectorRules)
    }
}

Validator.isRequired = function(selector) {
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : "Vui lòng nhập trường này"
        }
    }
};

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value){
            var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return regex.test(value) ? undefined : "Trường này phải là email";
        }
    }
};

Validator.minLength = function(selector,min) {
    return {
        selector: selector,
        test: function(value){
            return value.length >= min ? undefined : `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    }
};

Validator.isConfirmed = function(selector,getConfirmValue,message){
    return{
        selector: selector,
        test: function(value){
            return value === getConfirmValue() ? undefined : message;
        }
    }
}

Validator({
    form: "#form-1",
    errorSelector: ".form-message",
    rules: [
        Validator.isRequired('#email'),
        Validator.isEmail('#email'),
        Validator.isRequired('#password'),
        Validator.minLength('#password', 6),
        Validator.isRequired('#confirm-password'),
        Validator.isConfirmed('#confirm-password', function(){
            return document.querySelector("#form-1 #password").value;
        }, "Mật khẩu nhập lại không chính xác"),
    ],
    onSubmit: function(data){
        console.log(data);
    }
});
Validator({
    form: "#form-2",
    errorSelector: ".form-message",
    rules: [
        Validator.isRequired('#email'),
        Validator.isEmail('#email'),
        Validator.isRequired('#password'),
        Validator.minLength('#password', 6),
    ]
});
