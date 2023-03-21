import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
const TermsOfServices = () => {
  const { toggle } = useContext(ThemeContext);

  return (
    <>
      {/* Main page starts */}
      <div
        className="container"
        style={{
          position: "sticky",
          top: "60px",
          left: 0,
          zIndex: 2,
          width: "100vw",
        }}
      >
        <h1
          // className="text-center mb-5"
          style={{
            color: toggle ? "white" : "black",
            padding: "20px 0",
            backgroundColor: toggle ? "#161c24" : "white",
          }}
        >
          TERMS OF SERVICE
        </h1>
      </div>

      <main className="container pt-5">
        {/* Table of content starts */}
        <div className="mt-2">
          <ol>
            <li className="terms_page_listitem">
              <a href={`#introduction`} className={"header__link"}>
                Introduction
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#interpretation`} className={"header__link"}>
                Interpretation
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#how-to-contact-us`} className={"header__link"}>
                Who we are and how to contact us
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#how-we-change-terms`} className={"header__link"}>
                How we may change the terms of service
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#how-we-withdraw-dints`} className={"header__link"}>
                How we suspend or withdraw dints
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#registration-with-dint`} className={"header__link"}>
                Registration with <span className="notranslate">dint</span>
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#your-commitments`} className={"header__link"}>
                Your commitments to us
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#rights-we-have`} className={"header__link"}>
                Rights we have
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#our-responsibility`} className={"header__link"}>
                What are we responsible for
              </a>
            </li>
            <li className="terms_page_listitem">
              <a
                href={`#intellectual-property-rights`}
                className={"header__link"}
              >
                Intellectual property rights
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#twitter`} className={"header__link"}>
                Twitter
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#linking-to-and-from-dint`} className={"header__link"}>
                Linking to and from <span className="notranslate">dint</span>
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#how-to-delete-account`} className={"header__link"}>
                how-to-delete-account
              </a>
            </li>
            <li className="terms_page_listitem">
              <a
                href={`#who-is-responsible-for-damage-by-you`}
                className={"header__link"}
              >
                Who is responsible for any loss or damage suffered by you?
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#you-aggree-that`} className={"header__link"}>
                General: You agree that:
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#payout-to-users`} className={"header__link"}>
                Payouts to users
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#referral-payments`} className={"header__link"}>
                Referral payments
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#dint-wallet`} className={"header__link"}>
                <span className="notranslate">Dint</span> Wallet
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#dint-token`} className={"header__link"}>
                <span className="notranslate">Dint</span> Token
              </a>
            </li>
          </ol>
        </div>
        {/* Table of content ends */}
        <p style={{ color: toggle ? "white" : "#161c24" }}>
          <b>TERMS OF USE FOR ALL USERS</b>
          <br />
          <br />
          <b>
            BY USING OUR WEBSITE YOU AGREE TO THESE TERMS – PLEASE READ THEM
            CAREFULLY
          </b>
          <br />
          <br />
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="introduction"
            />
            1. <b>Introduction:</b> <br />
            These Terms of Use for all Users govern your use of <span className="notranslate">Dint</span> and your
            agreement with us.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="interpretation"
            />
            2. <b id="interpretation">Interpretation:</b> <br />
            In the Terms of Service:
            <br />
            a. we refer to our website as <b className="notranslate">"Dint"</b>, including when accessed
            via the URL www.dint.com;
            <br />
            b. references to <b>"we", "our", "us"</b> are references to <span className="notranslate">Dint</span>,
            the operator of <span className="notranslate">Dint</span>;
            <br />
            c. <b>"Content"</b> means any material uploaded to <span className="notranslate">Dint</span> by any User,
            including any photos, videos, audio (for example music and other
            sounds), livestream material, data, text (such as comments and
            hashtags), metadata, images, interactive features, emojis, GIFs,
            memes, and any other material whatsoever;
            <br />
            d. <b>"User"</b> means a User who has set up their <span className="notranslate">Dint</span> account to
            post Content on <span className="notranslate">Dint</span> to be viewed by other other Users;
            <br />
            e. <b>"Referring User"</b> means a User who participates in the <span className="notranslate">Dint</span>
            Referral Program;
            <br />
            f. <b>"Subscription"</b> means a User's subscription to a User's
            subscription page (whether paid or unpaid, and whether for one month
            or as part of a bundle comprising a subscription for more than one
            month);
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="how-to-contact-us"
            />
            3. <b id="how-to-contact-us">Who we are and how to contact us:</b>{" "}
            <br />
            Dint.com is operated by <span className="notranslate">Dint</span>.
            <br />
            To contact us with any questions about <span className="notranslate">Dint</span>, please email our
            support team at support@dint.com.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="how-we-change-terms"
            />
            4. <b>How we may change the Terms of Service:</b>
            <br />
            How we may change the Terms of Service: We may change any part of
            the Terms of Service without telling you beforehand in the following
            circumstances:
            <br />
            a. to reflect changes in laws and regulatory requirements which
            apply to <span className="notranslate">Dint</span> and the services, features and programs of Dint where
            such changes require <span className="notranslate">Dint</span> to change its terms and conditions in a
            manner which does not allow us to give reasonable notice to you; and
            <br />
            b. to address an unforeseen and imminent danger related to defending
            <span className="notranslate">Dint</span> or Users from fraud, malware, spam, data breaches or other
            cybersecurity risks.
            <br />
            <br />
            We may also make other changes to any part of the Terms of Service,
            and we will give you reasonable notice of such changes by email or
            through <span className="notranslate">Dint</span>, and you may contact us to end your agreement with us
            before the changes take effect. Once any updated Terms of Service
            are in effect, you will be bound by them if you continue to use
            <span className="notranslate">Dint</span>.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="how-we-withdraw-dints"
            />
            5. <b>We may make changes to or suspend or withdraw <span className="notranslate">Dint</span>:</b> <br />
            We may update and change <span className="notranslate">Dint</span> from time to time for any reason,
            including to reflect changes to our services, Users' needs and our
            business practices or to improve performance, enhance functionality
            or address security issues. We will try to give you reasonable
            notice of any major changes. We do not guarantee that <span className="notranslate">Dint</span>, or any
            Content on it, will always be available or accessible without
            interruption. We may suspend or withdraw or restrict the
            availability of all or any part of <span className="notranslate">Dint</span> for business or operational
            reasons. We will try to give you reasonable notice of any suspension
            or withdrawal if it affects you.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="registration-with-dint"
            />
            6. <b>Registering with <span className="notranslate">Dint</span>:</b> <br />
            To use <span className="notranslate">Dint</span> you must have a referral code in order to register and
            create a User account on <span className="notranslate">Dint</span>. You must provide a valid email
            address, a username, and a password or authenticate using a valid
            Twitter or Google account. Your password should be unique (meaning
            that it is different to those you use for other websites) and must
            comply with the technical requirements of the <span className="notranslate">Dint</span> site for the
            composition of passwords. To register as a User:
            <br />
            a. you must be at least 18 years old, and you will be required to
            confirm this;
            <br />
            b. if the laws of the country or State/province where you live
            provide that you can only be legally bound by a contract with us at
            an age which is higher than 18 years old, then you must be old
            enough to be legally bound by a contract with us under the laws of
            the country or State/province where you live; and
            <br />
            c. you must be permitted by the laws of the country or
            State/province where you are located to join <span className="notranslate">Dint</span> and to view any
            Content available on it and to use any functionality provided by it.
            <br />
            d. you must provide such other information or verification records
            as we require.
            <br />
            <br />
            If you do not meet the above requirements, you must not access or
            use <span className="notranslate">Dint</span>.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-60px",
              }}
              id="your-commitments"
            />
            7. <b>Your commitments to us:</b> <br />
            When you register with and use <span className="notranslate">Dint</span>, you make the following
            commitments to us:
            <br />
            a. If you previously had an account with <span className="notranslate">Dint</span>, you confirm that your
            old account was not terminated or suspended by us because you
            violated any of our terms or policies.
            <br />
            b. You will make sure that all information which you submit to us is
            truthful, accurate and complete.
            <br />
            c. You will update promptly any of your information you have
            submitted to us as and when it changes.
            <br />
            d. You consent to receiving communications from us electronically,
            including by emails and messages posted to your <span className="notranslate">Dint</span> account, and to
            the processing of your personal data as more fully detailed in our
            Privacy Policy.
            <br />
            e.You will keep your account/login details confidential and secure,
            including your user details, passwords and any other piece of
            information that forms part of our security procedures, and you will
            not disclose these to anyone else. You will contact support@dint.com
            promptly if you believe someone has used or is using your account
            without your permission or if your account has been subject to any
            other breach of security. You also agree to ensure that you log out
            of your account at the end of each session, and to be particularly
            careful when accessing your account from a public or shared computer
            so that others are not able to access, view or record your password
            or other personal information.
            <br />
            f. You are responsible for all activity on your account even if,
            contrary to the Terms of Service, someone else uses your account.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="rights-we-have"
            />
            8.{" "}
            <b>
              Rights we have, including to suspend or terminate your account:
            </b>
            <br />
            a. We can but we are not obligated to moderate or review any of your
            Content to verify compliance with the Terms of Service and/or any
            applicable law.
            <br />
            b. It is our policy to suspend access to any Content you post on
            <span className="notranslate">Dint</span> which we become aware may not comply with the Terms of Service
            and/or any applicable law whilst we investigate the suspected
            non-compliance or unlawfulness of such Content. If we suspend access
            to any of your Content, you may request a review of our decision to
            suspend access to the relevant Content by contacting us at
            support@dint.com. Following our investigation of the suspected
            non-compliance or unlawfulness of the relevant Content, we may take
            any action we consider appropriate, including to reinstate access to
            the Content or to permanently remove or disable access to the
            relevant Content without needing to obtain any consent from you and
            without giving you prior notice. You agree that you will at your own
            cost promptly provide to us all reasonable assistance (including by
            providing us with copies of any information which we request) in our
            investigation. We will not be responsible for any loss suffered by
            you arising from the suspension of access to your Content or any
            other steps which we take in good faith to investigate any suspected
            non-compliance or unlawfulness of your Content under this section.
            <br />
            c. If we suspend access to or delete any of your Content, we will
            notify you via email or electronic message to your <span className="notranslate">Dint</span> account, but
            we are not obligated to give you prior notice of such removal or
            suspension.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="our-responsibility"
            />
            9.{" "}
            <b style={{ position: "sticky", top: "-100px" }}>
              What we are not responsible for:
            </b>{" "}
            <br />
            We will use reasonable care and skill in providing <span className="notranslate">Dint</span> to you, but
            there are certain things which we are not responsible for, as
            follows:
            <br />
            a. We do not authorize or approve Content on <span className="notranslate">Dint</span>, and views
            expressed by Users on <span className="notranslate">Dint</span> do not necessarily represent our views.
            b. We do not grant you any rights in relation to Content. Any such
            rights may only be granted to you by Users. c. Your Content may be
            viewed by individuals that recognise your identity. We will not in
            any way be responsible to you if you are identified from your
            Content. While we may, from time to time and in our sole discretion,
            offer certain geofencing or geolocation technology on <span className="notranslate">Dint</span>, you
            understand and agree that we do not guarantee the accuracy or
            effectiveness of such technology, and you will have no claim against
            us arising from your use of or reliance upon any geofencing or
            geolocation technology on <span className="notranslate">Dint</span>.
            <br />
            d. All Content is created, selected, and provided by Users and not
            by us. We are not responsible for reviewing or moderating Content,
            and we do not select or modify the Content that is stored or
            transmitted via <span className="notranslate">Dint</span>. We are under no obligation to monitor Content
            or to detect breaches of the Terms of Service.
            <br />
            e. You agree that you have no obligation to follow any suggestions,
            comments, reviews, or instructions received from another User of
            <span className="notranslate">Dint</span> and that if you choose to do so, you do so entirely at your own
            risk.
            <br />
            f. We make no promises or guarantees of any kind that Users or
            Referring Users will make a particular sum of money (or any money)
            from their use of <span className="notranslate">Dint</span> (including the <span className="notranslate">Dint</span> Referral Program).
            <br />
            g. The materials which we make accessible on <span className="notranslate">Dint</span> for Users are for
            general information only. We make no promises or guarantees about
            the accuracy or otherwise of such materials, or that Users will
            achieve any particular result or outcome from using such materials.
            <br />
            h. We do not promise that <span className="notranslate">Dint</span> is compatible with all devices and
            operating systems. You are responsible for configuring your
            information technology, device, and computer programs to access
            <span className="notranslate">Dint</span>. You should use your own virus protection software.
            <br />
            i. We are not responsible for the availability of the internet, or
            any errors in your connections, device or other equipment, or
            software that may occur in relation to your use of <span className="notranslate">Dint</span>.
            <br />
            j. While we try to make sure that <span className="notranslate">Dint</span> is secure and free from bugs
            and viruses, we cannot promise that it will be and have no control
            over the Content that is supplied by Users.
            <br />
            k. We are not responsible for any lost, stolen, or compromised User
            accounts, passwords, email accounts, or any resulting unauthorized
            activities or resulting unauthorized payments or withdrawals of
            funds.
            <br />
            L. You acknowledge that once your Content is posted on <span className="notranslate">Dint</span>, we
            cannot control and will not be responsible to you for the use which
            other Users or third parties make of such Content. You can delete
            your account at any time, but you acknowledge that deleting your
            account will not of itself prevent the circulation of any of your
            Content which may have been recorded by other Users in breach of the
            Terms of Service or by third parties prior to the deletion of your
            account.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="intellectual-property-rights"
            />
            10. <b>Intellectual property rights – ownership and licenses:</b>
            <br />
            a. You confirm that you own all intellectual property rights
            (examples of which are copyright and trademarks) in your Content or
            that you have obtained all necessary rights to your Content which
            are required to grant licenses in respect of your Content to us and
            to other Users. This includes any rights required to engage in the
            acts covered by sub-section 10(b) below in any territory in which
            <span className="notranslate">Dint</span> is accessible and, in particular, in the United States of
            America, the United Kingdom and the European Union.
            <br />
            b. You agree to grant us a license under all your Content to perform
            any act restricted by any intellectual property right (including
            copyright) in such Content, for any purpose reasonably related to
            the provision and operation of <span className="notranslate">Dint</span>. Such acts include to reproduce,
            make available and communicate to the public, display, perform,
            distribute, translate, and create adaptations or derivative works of
            your Content, and otherwise deal in your Content.
            <br />
            c .The license which you grant to us under sub-section 10(b) above
            is perpetual, non-exclusive, worldwide, royalty-free, sublicensable,
            assignable and transferable by us. This means that the license will
            continue even after your agreement with us ends and you stop using
            <span className="notranslate">Dint</span>, that we do not have to pay you for the license, and that we
            can grant a sub-license of your Content to someone else or assign or
            transfer the license to someone else. This license will allow us,
            for example, to add stickers, text, and watermarks to your Content,
            to make your Content available to other Users of <span className="notranslate">Dint</span>, as well as to
            use your Content for other normal operations of <span className="notranslate">Dint</span>. We will never
            sell your Content to other platforms, though we may sell or transfer
            any license you grant to us in the Terms of Service in the event of
            a sale of our company or its assets to a third party.
            <br />
            d. Whilst we do not own your Content, you grant us the limited right
            to submit notifications of infringement (including of copyright or
            trademark) on your behalf to any third-party website or service that
            hosts or is otherwise dealing in infringing copies of your Content
            without your permission. Although we are not under any obligation to
            do so, we may at any time submit or withdraw any such notification
            to any third-party website or service where we consider it
            appropriate to do so. However, we do not and are under no obligation
            to police infringements of your Content. You agree that if we
            request, you will provide us with all consents and other information
            which we reasonably need to submit notifications of infringement on
            your behalf. <br />
            e. You waive any moral rights which you may have under any
            applicable law to object to derogatory treatment of any Content
            posted by you on <span className="notranslate">Dint</span>. This waiver does not affect in any way your
            ownership of any intellectual property rights in your Content or the
            rights which you have to prevent your Content from being copied
            without your permission. The waiver is intended to allow us when
            dealing with your Content (as permitted by the license which you
            give us in section 10(b) above) to add watermarks, stickers or text
            to your Content.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="twitter"
            />
            11. <b>Twitter:</b> <br />
            Users have the facility to connect an active Twitter account to
            their <span className="notranslate">Dint</span> account and to share certain Content in the form of <span className="notranslate">Dint</span>
            posts to Twitter using the share feature. If you use this feature,
            you must fully comply with Twitter's terms of service from time to
            time in respect of any Content shared in this way. 
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="linking-to-and-from-dint"
            />
            12. <b>Linking to and from <span className="notranslate">Dint</span>:</b>
            <br />
            a. Links to <span className="notranslate">Dint</span>:
            <br />
            &#8226; You may link to the <span className="notranslate">Dint</span> homepage, provided you do so in a
            way that is fair and legal and does not damage our reputation or
            take advantage of it, but you must not establish a link in such a
            way as to suggest any form of association, approval, or endorsement
            on our part. &#8226; When promoting your Content you must comply
            with our Terms of Service and the terms of service of any other
            website where you place a link to or otherwise promote your User
            account. When promoting your content, you must not impersonate <span className="notranslate">Dint</span>
            or give the impression that your User account is being promoted by
            us if this is not the case. You must not promote your <span className="notranslate">Dint</span> account
            by using Google Ads or any similar advertising platform or search
            engine advertising service.
            <br />
            b. Links from <span className="notranslate">Dint</span>: <br />
            &#8226; If <span className="notranslate">Dint</span> contains links to other sites and resources provided
            by third parties, these links are provided for your convenience
            only. Such links should not be interpreted as approval by us of
            those linked websites or information you may obtain from them. We
            have no control over the contents of those sites or resources and
            accept no responsibility for them or for any loss or damage that may
            arise from your use of them. If you decide to access any of the
            third-party websites linked to <span className="notranslate">Dint</span>, you do so entirely at your own
            risk and subject to the terms and conditions of use for such
            websites. Domain Names: In some instances, <span className="notranslate">Dint</span> may allow Users to
            register or use domain names that contain the <span className="notranslate">Dint</span> trademark or a
            confusingly similar term. However, you will not register such a
            domain name, unless:
            <br />
            <br />
            &#8226; The domain name is registered by the User. &#8226; The
            domain name redirects to the Users’s <span className="notranslate">Dint</span> profile or page. Domain
            names containing the <span className="notranslate">Dint</span> trademark or a confusingly similar term
            must not direct to any other website, including link aggregators.
            &#8226; The User obtains prior written permission from Dint and
            signs a licensing agreement.
            <br />
            <br />
            If you would like to register a domain name containing the <span className="notranslate">Dint</span>
            trademark or a confusingly similar term, please contact
            support@dint.com. Failing to comply with these provisions or the
            licensing agreement will be considered a violation of the licensing
            agreement and may result in <span className="notranslate">Dint</span> filing a domain dispute against the
            registrant.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="how-to-delete-account"
            />
            13. <b>How do I delete my account?</b> <br />
            If you want to delete your <span className="notranslate">Dint</span> account then you may do so in the
            'User Account' section of your <span className="notranslate">Dint</span> account.
            <br />
            a. The deletion of your account will take place within a reasonable
            time following your request. <br />
            b. Once your account has been deleted you won't be charged any
            further amounts or have access to your former <span className="notranslate">Dint</span> account or its
            Content, and any subscriptions will be deleted and cannot be
            subsequently renewed. You will receive an email confirmation upon
            the successful deletion of your account. Once your account has been
            deleted, we may deal with your Content in any appropriate manner in
            accordance with our Privacy Policy (including by deleting it) and
            you will no longer be entitled to access your Content. There is no
            technical facility on <span className="notranslate">Dint</span> for you to be able to access your Content
            following termination of your account.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="who-is-responsible-for-damage-by-you"
            />
            14.{" "}
            <b>Who is responsible for any loss or damage suffered by you?</b>
            <br />
            a. Whether you are a consumer or business User: We do not exclude or
            limit in any way our liability to you where it would be unlawful to
            do so. This includes (i) liability for death or personal injury
            caused by our negligence or the negligence of our employees, agents
            or subcontractors, and (ii) fraud or fraudulent misrepresentation.
            <br />
            b. If you are a consumer User: If you are a consumer User, you agree
            that:
            <br />
            <br />
            We and our subsidiary companies, employees, owners, representatives,
            and agents will not be liable to you for any loss of profit, loss of
            business or revenue, business interruption, loss of business
            opportunity, or loss of anticipated savings suffered by you arising
            from or in connection with your use of <span className="notranslate">Dint</span>.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="you-aggree-that"
            />
            15. <b>General: You agree that:</b>
            <br />
            a. If any aspect of your agreement with us is unenforceable, the
            rest will remain in effect.
            <br />
            b. If we fail to enforce any aspect of your agreement with us, it
            will not be a waiver;
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="payout-to-users"
            />
            16. <b>Payouts to Users:</b>
            <br />
            a. All User Payments will be received by a third-party payment
            provider approved by us.
            <br />
            b. If you have chosen the Stripe Payout Option, Stripe will collect
            the User Payment and pay the User Earnings to your bank account.
            <br />
            c. To make a withdrawal of User Earnings from your <span className="notranslate">Dint</span> Wallet, you
            must have at least the minimum balance amount in your <span className="notranslate">Dint</span> Wallet.
            Please click on withdrawal on your <span className="notranslate">Dint</span> Wallet page to see what the
            minimum payout amount is and Payout Option. <br />
            d. Users can click the withdrawal button on their wallet to
            automatically sell the tokens and have the funds deposited directly
            into their bank account.
            <br />
            <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="referral-payments"
            />
            17. <b>Referral payments:</b> <br />
            a. How are referral payments calculated? The <span className="notranslate">Dint</span> Referral Program
            is a referral program offered by <span className="notranslate">Dint</span>, allowing existing users to
            earn referral payments by introducing new users to the platform.
            Only active users with a User account on <span className="notranslate">Dint</span> are eligible to
            participate in the program. The user must have a bank account or
            payment method linked to their account in order to receive referral
            payments. The user has a unique referral link that can be shared
            with others. The referred user must register via the referral link
            and not have previously been a user of <span className="notranslate">Dint</span>. Referral payments are
            calculated at 8% divided into 4 tiers, with a cap of $500,000 or ten
            years, whichever comes first, per referred user. Payments are
            transferred to the referring user's <span className="notranslate">Dint</span> Wallet immediately.
            <br />
            b. Choosing a payout method to receive referral payments: In order
            to be able to receive referral payments you must first choose one of
            the payout methods provided by <span className="notranslate">Dint</span> in your country of residence.
            These methods are called "Payout Options".
            <br />
            c. Who bears the cost of the referral payment? The cost of the
            referral payment is borne by us, not the Referred User.
            <br /> <br />
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                height: "1px",
                width: "1px",
                top: "-80px",
              }}
              id="dint-wallet"
            />
            18. <b><span className="notranslate">Dint</span> Wallet:</b>
            <br />
            <span className="notranslate">Dint</span> provides every User with their own crypto wallet to store and manage their tokens.
            <br />   <br />
<b>Ownership and Control</b>   <br />
You own and control digital assets in your account. As the sole owner, you bear all risk of loss of these assets. <span className="notranslate">Dint</span> will not be held liable for any fluctuations or loss associated with your use of the app. You may withdraw your digital assets at any time, subject to outages, downtime, and other policies, by sending them to a different blockchain address.
<br />   <br />
<b>Warranty Disclaimer </b>  <br />
You acknowledge and agree that the use of the services (including any private key storage service offered as part of the services, whether cloud or hardware-based) and content is at your own risk and that the entire risk of quality, performance, accuracy and effort lies with you. The app, site, and services are provided "as is" and "as available" without any representation or warranty, whether express, implied, or statutory. To the maximum extent permitted by law, <span className="notranslate">Dint</span> specifically disclaims any express or implied warranties of title, merchantability, fitness for a particular purpose, and/or non-infringement. <span className="notranslate">Dint</span> makes no representations or warranties that access to the services or any of the materials contained within will be continuous, uninterrupted, timely, or error-free. Service interruptions may cause you to be signed out of your account and require you to re-enter your recovery phrase to regain access.
<br />   <br />
Use of any private key storage service included as part of the services is offered to you as a convenience, subject to the limitations above. You are solely responsible for storing and securing your private key and recovery phrase for the app. Dint does not store a backup of, or have the ability to recover, your private key or recovery phrase. If you lose your recovery phrase, you will lose access to all assets stored in your wallet. You should always backup your private access key via secondary means.

            <br />
            <br />
            19. <b id="dint-token"><span className="notranslate">Dint</span> Token:</b> <br />
            The <span className="notranslate">Dint</span> Token is a digital asset with a total supply of 11 billion, issued on the Polygon network. Users can purchase the tokens for $1 each through the <span className="notranslate">Dint</span> app, which is required for using the tokens for purposes such as sending tips and paying for subscriptions. Users can also sell their tokens for $1 each on the <span className="notranslate">Dint</span> app. The issuer of the <span className="notranslate">Dint</span> Token, <span className="notranslate">Dint</span>, offers no representations or warranties, and users bear all associated risks. Users are responsible for securely storing their tokens, and <span className="notranslate">Dint</span> cannot recover any lost tokens. <span className="notranslate">Dint</span> reserves the right to make changes to these terms and conditions at any time and will notify users of any changes.
          </div>
        </p>
      </main>
      {/* Main page ends */}
    </>
  );
};
export default TermsOfServices;
