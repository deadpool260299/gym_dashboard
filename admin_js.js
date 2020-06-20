
  
function load_user_data()
{
    var c=0;
    var db=firebase.database().ref('users');
    lst='';
   
    db.on('value',function(users){
        users.forEach(function(data){
            c=c+1;
         
            var user = data.val();
     
            if(user.expiry_date.toString() !== "NA")
            {
            lst+=   `    <tr>
            <td>${c}</td>
            <td>${user.name}</td>
            <td>Gym member</td>
            <td>${user.dateJoined}</td>
            <td>${user.expiry_date}</td>
        </tr>
`;
if(user.email_sent == 'no')
{
   
cd=(new Date()).toString().split(' ').splice(1,3).join(' ');
                
    DD=(new Date(user.expiry_date.toString()));
    DD.setDate(DD.getDate()-5);
    DD=DD.toString().split(' ').splice(1,3).join(' ');
    
    if(DD == cd)
    {
        alert('5 days remaining to expiry');
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
        alert(this.responseText);    
        }
        };
        xmlhttp.open("GET", "send_mail.php?mail_id=" + user.email+"&date="+user.expiry_date, true);
        xmlhttp.send();
     
        firebase.database().ref('users/').child(data.key)
        .set({ dateJoined:user.dateJoined, email: user.email,expiry_date:user.expiry_date,name:user.name,photoURL:user.photoURL,email_sent:'yes' });
         location.reload();
        
        
    }
}

            }
            else{
              

                lst+=   `    <tr>
                <td>${c}</td>
                <td>${user.name}</td>
                <td>Gym member</td>
                <td>${user.dateJoined}</td>
                <td><input type="date" id="de${c}" value=""><input class="btn btn-info" type="submit" value="save" onclick="date_change('${c}','${data.key.toString()}','${user.name.toString()}','${user.email.toString()}','${user.dateJoined.toString()}','${user.photoURL.toString()}')" ></input></td>
            </tr>
    `;              

    
            }
           
        });
        document.getElementById("tab_contents").innerHTML=lst;
        document.getElementById("no_of_users").innerHTML=`  <i class="fas fa-users fa-6x"></i>
        <h2  class="float-right font-weight-bold" style="font-size: 50px;text-align: center;">${c}
        <span class="d-block">Users</span>
        </h2>`;
        lst='';
        c=0;
    });
}
function date_change(c,user_key,user_name,user_email,user_date_joined,user_photo)
{
   
  var de=document.getElementById('de'+c).value;
  if(de === "")
  {
      alert('please select a date');
  }
  else{
    var GivenDate = de;
var CurrentDate = new Date();
GivenDate = new Date(GivenDate);

if(GivenDate > CurrentDate){
    var sample_dat=(new Date(de)).toString().split(' ').splice(1,3).join(' ');
   
        firebase.database().ref('users/').child(user_key)
            .set({ dateJoined: user_date_joined, email: user_email,expiry_date:sample_dat,name:user_name,photoURL:user_photo,email_sent:'no' });
    

    
        
}else{
    alert('Invalid Date ');
}

    }
    
}
load_user_data();