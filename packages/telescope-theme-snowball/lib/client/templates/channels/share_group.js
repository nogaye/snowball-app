Template.share_group.onCreated(function () {

});

Template.share_group.onRendered(function () {
  $("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput();
});

Template.share_group.helpers({});

Template.share_group.events({
  'submit #share_group': function (e) {
    e.preventDefault();
    var pasted = e.target.bulkInvite.value;
    var files = e.target.bulkInviteCSV.files;
    var groupId = FlowRouter.getParam('id');
    var data;
    if (pasted) {
      data = pasted.split(',');
      // console.log(data);
      Meteor.call('bulkInvite', data, groupId);
    } else {
      Papa.parse(files[0], {
        complete: function (results, file) {
          data = [];
          _.each(results.data, function (email) {
            data.push(email[0]);
          });
          // console.log(data);
          Meteor.call('bulkInvite', data, groupId);
        }
      });
    }
    Modal.hide('show_group');
  }
});