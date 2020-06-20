<?php
    $mailto = $_GET['mail_id'];
    $exp_date=$_GET['date'];
    $name ="aaykay";
    $mailSub ="Reminder for gym membership Payment";
    $mailMsg = "Your membership will expire on ".$exp_date;
    
    $headers=array(
        "Authorization: Bearer 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",
        'Content-Type: application/json'
    );
    $data=array(
        "personalizations"=>array(
            array(
                "to"=>array(
                    array(
                        "email" => $mailto,
                        "name"=>$name
                        )
                )
            )
                    ),
                    "from" => array(
                        "email" =>"aaykay911@gmail.com"
                    ),
                    "subject" => $mailSub,
                    "content" => array(
                        array(
                            "type" => "text/plain",
                            "value" => $mailMsg
                        )
                    )
                );
 $ch = curl_init();
 curl_setopt($ch,CURLOPT_URL,"https://api.sendgrid.com/v3/mail/send");
 curl_setopt($ch,CURLOPT_POST,1);
 curl_setopt($ch,CURLOPT_POSTFIELDS,json_encode($data));
 curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
 curl_setopt($ch,CURLOPT_FOLLOWLOCATION,1);
 curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
 $response=curl_exec($ch);
 curl_close($ch);
 echo $response;
 
  /* if(!$mail->Send())
   {
       echo "Mail Not Sent";
   }
   else
   {
       echo "Mail Sent";
   }*/





   

