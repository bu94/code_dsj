$(function () {
    //给去注册和去登录链接绑定点击事件，实现跳转
    $('#href_reg').on('click',function() {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#href_login').on('click',function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //设置表单验证正则
    var form = layui.form;
    var {layer} = layui; //解构赋值
    form.verify({
        pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ],
        //判断注册页面两次密码输入是否一致
        regwd: function(value) {
            //通过形参拿到的是确认密码框中的内容
            var pwd = $('reg-box[name=password]').val();
            if(pwd != value) {
                return '两次密码不一致'
            }
        }
    }); 

    
    //调用注册接口提交信息
    $('#regBox').on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#zcusername').val(),
                password: $('#zcpassword').val()
            },
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                $('#href_login').click();

            }
        })
    })

    $('#loginForm').on('submit',function(e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                console.log(res.token);
                localStorage.setItem('token',res.token);
                location.href='/index.html';
            }
        })
    })
})