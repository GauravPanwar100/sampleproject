
import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
import '../client/registrationform.html';





Template.registrationform.events({
    'click #login':function(){
        FlowRouter.go('/login');
    },
    'submit form':function(event){
        event.preventDefault();
        var name=$('[name=fname]').val();
        var email=$('[name=email]').val();
        var password=$('[name=password]').val();
        var conpass=$('[name=ConfirmPassword]').val();
        var mobileno=$('[name=mobile]').val();
        
        if (name == "") {
            alert("Name must be filled out");
            return false;
        }
        else if (name.length<=5 || name.length>15) {
            alert("Name length should be greater than 5 character");
            return false;
        }
        else if (email == "") {
            alert("Email must be filled out");
            return false;
        }
        else if (password == "") {
            alert("Password must be filled out");
            return false;
        }
        else if (conpass == "") {
            alert("Confirm Password must be filled out");
            return false;
        }
        else if (mobileno == "") {
            alert("Mobile No must be filled out");
            return false;
        }
        else if (password.length<5 || password.length>15) {
            alert("Password length must be between 5 to 15 character long");
            return false;
        }
        else if (conpass.length<5 || password.length>15) {
            alert("Password length must be between 5 to 15 character long");
            return false;
        }
        else if(password!=conpass)
        {
                alert("both password must be matched");
                return false;
        }
        else{

        

        Accounts.createUser({
            name:name,
            email:email,
            password:password,
            conpass:conpass,
            mobileno:mobileno

            
        });
        
    }
        FlowRouter.go('/login');
    }
    
});

