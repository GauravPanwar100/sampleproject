

// Template.login.helpers({
//     login: function(){
//         var email= FlowRouter.getParam('email');
//         var password=FlowRouter.getParam('password');
//         return email;
//         return password;
//     }
// })

import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
import '../client/login.html';



// Template.login.events({
//     "click #login": function(){
//         FlowRouter.go("/dashboard");
//     }
// });
// Template.forgetpassword.events({
//     'click #forgtpwd': function(event, tmpl) {
//         event.preventDefault();
// var email = tmpl.find('#email').value;

// Accounts.forgotPassword(email, function(err){
// 	if (err) {
// 		alert(err.reason);
// 	} else {
//         alert('Great success!');
//         FlowRouter.go('forgetpassword');
// 	}
// });
//     }
// });
// Template.forgetpassword.events({
//     'click #forgtpwd': function(event, tmpl) {
//         event.preventDefault();
       
//         Accounts.resetPassword(this.toString(), tmpl.$('#password').val(), function(err) {
//             if (err) {
                
//                alert(err);
//             } else {
                
//                 FlowRouter.go('forgetpassword');
//             }
//         });
//     }
// });

        



Template.login.events({
    'click #forgtpwd':function(){
        FlowRouter.go('/forgetpassword');
    },
    'click #rgstrbtn': function(){
        FlowRouter.go('/registrationform');
    },
    'submit form': function(event){
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        if (email == "") {
            alert("Email must be filled out");
            return false;
        }
        
        else if (password == "") {
            alert("Password must be filled out");
            return false;
        }
        else if (password.length<5 || password.length>15) {
            alert("Password length must be between 5 to 15 character long");
            return false;
        }

        
    Meteor.loginWithPassword(email, password, function(err,res){
        if(err){
            alert(err.reason);
            if(alert==true){
                Accounts.forgotPassword(this.email,function(err,res){
                    if(err){
                    alert("successfully changed");}
                });
            }
        }else{
            alert("login successful");
            FlowRouter.go('/dashboard');

        }
    });
}
     
});

// Template.login.events({
//     'click #login': function(event){
//     var email= Meteor.users.findOne({_id}).emails[0].address;  
//     var formemail = $('[name=email]').val(); 
//         if(email==formemail){
//             FlowRouter.go("/dashboard");

//         }
//         else{
//             alert("You are not registered yet.Please register first!");
//         }
//     }
// })

