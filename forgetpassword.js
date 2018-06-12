import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';
import '../client/forgetpassword.html';


// Template.forgetpassword.events({
//     'click #forgetpasswordbtn':function(){
//         FlowRouter.go('/dashboard');
//     },
// 'click .registerbtn':function(){
//     var password = $("#password").val();
//   var cpassword = $("#cpassword").val();
//   if (password !== cpassword) {
//     alert("The new passwords don't match!");
 
//     return false;
//    }
    
// var userId=Meteor.userId();
//   var as = Meteor.call('changepass', password, userId, function(err, res) {
//    if (err) {
//     alert(as);
//    } else {
//     alert("password changed successfully");

//     FlowRouter.go('login');
//    }
//   });
//  }
// });


Template.forgetpassword.events({
    'submit #forgotPasswordForm': function(e, t) {
      e.preventDefault();
  
      // var forgotPasswordForm = $(e.currentTarget),
      //     email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());
  
      // if (isNotEmpty(email) && isEmail(email)) {
  
      //   Accounts.forgotPassword({email: email}, function(err) {
      //     if (err) {
      //       if (err.message === 'User not found [403]') {
      //        alert('This email does not exist.');
      //       } else {
      //         alert('We are sorry but something went wrong.');
      //       }
      //     } else {
      //       alert('Email Sent. Check your mailbox.');
      //     }
      //   });
  
      // }
      // return false;

      var token = Random.secret();
      var when = new Date();
      var tokenRecord = {
        token: token,
        email: email,
        when: when
      };
      Meteor.users.update(userId, {$set: {
        "services.password.reset": tokenRecord
      }});
      // before passing to template, update user object with new token
      Meteor._ensure(user, 'services', 'password').reset = tokenRecord;
      
      var resetPasswordUrl = Accounts.urls.resetPassword(token);


    },
  });
  
  if (Accounts._resetPasswordToken) {
    Session.set('resetPassword', Accounts._resetPasswordToken);
  }
  



  Template.forgetpassword.events({
    'click .btn-submit': function(e, t) {
    e.preventDefault();
    
    // var forgotPasswordForm = $(e.currentTarget);
    // console.log(forgotPasswordForm);
    var email , trimInput ;
    
    // var emailVar = e.target.email.value;
    var emailVar = $("input[name=email]").val();
    console.log("emailVar : " + emailVar);
    
    trimInput = function(val) {
      return val.replace(/^\s*|\s*$/g, "");
    }
    
        emailtrim = trimInput(emailVar);
        email = emailtrim.toLowerCase();
    
    
      Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            console.log('This email does not exist.');
            alert('This email does not exist.');
          } else {
            console.log('We are sorry but something went wrong.');
            alert('We are sorry but something went wrong.');
          }
        } else {
          console.log('Email Sent. Check your mailbox.');
          alert('Email Sent. Check your mailbox.');
        }
      });
    
        
      alert( "Instructions sent! We've sent an email with instructions on how to reset your password.If you don't receive an email within a few minutes, check your spam and junk folders.", 'success', 'growl-top-right' );
    return false;
    },
    });



    Template.resetpassword.onCreated(function() {
        if (Accounts._resetPasswordToken) {
        // var resetPassword = FlowRouter.getParam('token');
        Session.set('resetPassword', Accounts._resetPasswordToken);
        console.log('ResetPasswordtemplate : ' + resetPassword);
        }
        });

        Template.resetpassword.helpers({
            resetPassword: function(){
            // console.log('ResetPassword : ' + resetPassword);
            var resetPassword = FlowRouter.getParam('token');
            // console.log('ResetPassword : ' + resetPassword);
            return resetPassword;
            // return Session.get('resetPassword');
            
            },
            });


            Template.resetpassword.events({
                'submit #resetPasswordForm': function(e, t) {
                e.preventDefault();
                var resetPassword = FlowRouter.getParam('token');
                // console.log('ResetPassword : ' + resetPassword);
                var resetPasswordForm = $(e.currentTarget),
                password = resetPasswordForm.find('#resetPasswordPassword').val(),
                passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();
                
                //Check password is at least 6 chars long
                var isValidPassword = function(password, passwordConfirm) {
                   if (password === passwordConfirm) {
                    alert('passwordVar.length'+ password.length >= 6 ? true : false);
                     return password.length >= 6 ? true : false;
                   } else {
                     return swal({
                        title: 'Passwords dont match',
                        text: 'Please try again',
                        showConfirmButton: true,
                        type: 'error'
                     }); //End of error swal
                   } //End of else
                 }
                if (isValidPassword(password, passwordConfirm)) {
                // if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
                Accounts.resetPassword(resetPassword, password, function(err) {
                if (err) {
                alert('We are sorry but something went wrong.');
                } else {
                alert('Your password has been changed. Welcome back!');
                Session.set('resetPassword', null);
                FlowRouter.go('/login');
                }
                });
                }else{
                return swal({
                title: "password should be at least 6 characters long",
                text: "Please try again",
                timer: 1700,
                showConfirmButton: false,
                type: "error"
                });
                
                }
                // }
                return false;
                }
                });



  Template.resetpassword.helpers({
   resetPassword: function(){
    return Session.get('resetPassword');
   }
  });
  
  Template.resetpassword.events({
    'submit #resetPasswordForm': function(e, t) {
      e.preventDefault();
      
      var resetPasswordForm = $(e.currentTarget),
          password = resetPasswordForm.find('#resetPasswordPassword').val(),
          passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();
  
      if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
        Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
          if (err) {
           alert('We are sorry but something went wrong.');
          } else {
            alert('Your password has been changed. Welcome back!');
            Session.set('resetPassword', null);
          }
        });
      }
      return false;
    }
  });

