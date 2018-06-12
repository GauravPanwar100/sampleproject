import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks.js';


import '../client/submit_table.html';

Template.showRegData.helpers({
    regData: function () {
        var regDataValue = Tasks.find({}).fetch();
        // alert(regDataValue);
        return regDataValue;
    }
});

Template.showRegData.events({
    "click .edit": function(){
       // FlowRouter.go('');
        FlowRouter.go('/formData/' +this._id);
    }
});
Template.showRegData.events({
    "click .delete": function(){
        Tasks.remove(this._id);
    }
});

Template.registration.helpers({
     helper_name:function(){
    /*if(FlowRouter.go(_id!="new"))
    {

        var form_data=Tasks.find({_id}).fetch();
        var data=Fetcher.retrieve(_id,Email,Date_of_birth,Gender,Education_details);
        return data;
    }
    else{
        return false;
    }*/
}
});

// Template.showRegData.events({
//     "click .addmember": function(){
//          FlowRouter.go('/formData/new')}});
