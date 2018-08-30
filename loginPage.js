function createLoginPage() {
    $("#contentDiv").empty();

    //Create login form
    $("#contentDiv").append('      <div id="loginDiv" class="col-sm-4">  ' +
        '       <form id="frmLogin" action="#">  ' +
        '           <div class="form-group required">  ' +
        '             <label class="control-label" for="username">Username</label>  ' +
        '             <input type="text" class="form-control" id="username" name="username" required>  ' +
        '           </div>  ' +
        '           <div class="form-group required">  ' +
        '             <label class="control-label" for="password">Password</label>  ' +
        '             <input type="password" class="form-control" name="password" id="password" required>  ' +
        '           </div>  ' +
        '           <button type="button" id="loginButton" class="btn btn-sn ">Login</button>  ' +
        '           <button type="button" id="forgotPassButton" class="btn btn-sn ">Forgot Password?</button>  ' +
        '         </form>  ' +
        '  </div>  ');

    //Add custom method for static user and password checking, because this is an sample project without server side
    $.validator.addMethod("checkuserpass", function (value, element) {
        return value == 'admin'
    }, "Username or password is wrong");

    //Login form validation settings
    $("#frmLogin").validate({
        rules: {
            username: {
                required: true,
                checkuserpass: true
            },
            password: {
                required: true,
                checkuserpass: true
            }
        }, messages: {
            username: {
                required: "Enter username"
            },
            password: {
                required: "Enter password"
            }
        }
    });

    //When clicked login button check form is valid then navigate main page
    $("#loginButton").on("click", function () {
        if ($("#frmLogin").valid()) {
            createMainPage();
        } 
    });

    //when clicked 'Forgot Password' button, give user info
    $("#forgotPassButton").on("click", function () {
        $(".custom-info").show();
        setTimeout(function () {
            $(".custom-info").hide();
        }, 2000);
    });
}