import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const PrivacyPolicy = () => {
  // @ts-ignore
  const { toggle } = useContext(ThemeContext);

  return (
    <div className="container mt-5 pt-5">
      <h1 className="text-center h1 mb-5" style={{color: toggle ? 'white' : '#161c24'}}>Privacy Policy</h1>
      <p style={{color: toggle ? 'white' : '#161c24'}}>
        Last Modified: Jan 2023
        <br />
        <br />
        <b>PRIVACY POLICY</b>
        <br />   <br />
<b>Introduction  </b> <br />
At Dint, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our social media platform, website, and mobile application (collectively, the "Service"). By using the Service, you agree to the terms of this Privacy Policy.
<br />  <br />

<b>Information We Collect </b>  
<br />  <br />

&bull; Personal Information: We may collect personal information such as your name, email address, and phone number when you create an account on the Service or contact us for support.<br />
&bull; Profile Information: We may collect information about your profile, such as your username, profile picture, and bio, when you create an account on the Service.<br />
&bull; Activity Information: We may collect information about your activity on the Service, such as the content you post, the people you follow, and the messages you send.<br />
&bull; Device Information: We may collect information about the device you use to access the Service, such as the device's make and model, operating system, and IP address.
<br /><br />

<b>Use of Information</b> <br /> 
 We may use the information we collect from you to: <br /> 
&bull; Provide and improve the Service: We may use your information to provide and improve the features and functionality of the Service. <br /> 
&bull; Communicate with you: We may use your information to communicate with you about your account, the Service, and other matters. <br /> 
&bull; Personalize your experience: We may use your information to personalize your experience on the Service, such as by showing you content that is relevant to your interests. <br /> 
&bull; Perform research and analysis: We may use your information to perform research and analysis to improve the Service. <br /> 
&bull; Comply with legal obligations: We may use your information to comply with any legal obligations we have, such as responding to a subpoena or court order. <br /> 
<br /> <br />

<b>Disclosure of Information  </b><br /> 
We may disclose your information to: <br /> 
&bull;  Service providers: We may share your information with service providers who perform services on our behalf, such as hosting the Service or providing customer support. <br /> 
&bull;  Legal authorities: We may disclose your information to legal authorities if we believe it is necessary to comply with a legal obligation, or to protect the rights, property, or safety of Dint, our users, or others. <br /> 
&bull; Business partners: We may share your information with business partners for joint marketing or other purposes. <br /> 
&bull; Other users: Your profile information, activity information, and device information may be visible to other users of the Service. 
<br /> <br /> 
<b>Data Retention </b> <br /> 
We will retain your information for as long as your account is active or as needed to provide you with the Service. We will also retain your information as necessary to comply with our legal obligations, resolve disputes, and enforce our agreements. 
<br />  <br /> 

<b>Security  </b>  <br />
We take reasonable measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is 100% secure, so we cannot guarantee its absolute security. 
<br />  <br /> 

<b>Changes to this Privacy Policy</b>   <br /> 
We may update this Privacy Policy from time to time. If we make changes, we will notify you by revising the date at the top of this policy and, in some cases, we may provide you with additional notice (such as adding a statement to our homepage or sending you an email notification). We encourage you to review this Privacy Policy regularly to stay informed about our collection, use, and disclosure of your information. 
<br />  <br /> 

 <b>Contact Us</b>    <br /> 
 If you have any questions or concerns about this Privacy Policy, please contact us at info@dint.com.

      </p>
    </div>
  );
};

export default PrivacyPolicy;
