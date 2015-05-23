// form submit

$(document).ready(function(){

    $("form").submit(function(event){
        event.preventDefault();
        nom = $("#nom").val();
        telephone = $("#telephone").val();
        email = $("#email").val();
        en_personne = $('#en_personne:checked').val();
        sur_skype = $('#sur_skype:checked').val();
        var user_choice = en_personne || sur_skype;

        

        $.ajax({
        url: 'https://api.mongolab.com/api/1/databases/appointments/collections/mou?apiKey=1ZEtSNRdh_T4SirW-UVnBKuTMIq8Wbne',
        type: 'post',
          contentType: "application/json; charset=utf-8",

        dataType: 'json',
        data: JSON.stringify({nom:nom,telephone:telephone, email:email, endroit:user_choice, date:date}),

        success: function(data) {
                $('#appointment_confirmation').toggleClass('show hidden');
		        $('#appointmentSection').toggleClass('show hidden');
		        $("#time").html(date);

// email confirmation

        $.ajax({
        url: 'http://larbibouamrane.com/fr/email',
        type: 'post',
          contentType: "application/json; charset=utf-8",

        dataType: 'json',
        data: JSON.stringify({nom:nom, telephone:telephone, email:email, endroit:user_choice, date:date}),

    



    });
        


// end email confirmation














                 }
    });




    });
        
});

// show, hide appointment
function showHideAppointment() {
    $('#appointment').toggleClass('show hidden');
   
    $('#appointmentButton').toggleClass('show hidden');

}
