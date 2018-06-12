
import { Template } from 'meteor/templating';

import { Arrays } from '../api/tasks.js';
import '../client/arraydata.html';


Template.registerAddress.events({
'click #addaddress':function(event){
event.preventDefault();
var a=[];
var form ={};
$.each($('#address').serializeArray(),function(){
form[this.name]=this.value;

}),
a.push(form);
Meteor.call('insertaddress',a,function(err,res){
if(err){
alert(err.reason);
}
else{
    alert("address inserted successfully");
    var fieldPair = '';
$(":input").each(function(){
    
 fieldPair += $(this).attr("name") + ':' + $(this).val() + '\n';
 
});

alert(fieldPair);
}
})
}
});