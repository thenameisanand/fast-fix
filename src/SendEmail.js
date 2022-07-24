import React from 'react'
import emailjs from "emailjs-com";
function SendEmail() {

    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_f1ktc8d', 'template_7nyxb6q',e.target,'xK6Na9VH_cE9ARRVs')
        .then(res =>{
            console.log(res);
        }).catch(err=>console.log(err));
    }
  return (
    <div>
        <form onSubmit={sendEmail}>
         
            <input type="email" name="user_email">

</input>
<textarea name="message" rows='4'></textarea>
<input type="submit" value='send'></input>
        </form>
        SendEmail</div>
  )
}

export default SendEmail