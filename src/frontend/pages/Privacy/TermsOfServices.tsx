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
                Registration with dint
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
                Linking to and from dint
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
                Dint Wallet
              </a>
            </li>
            <li className="terms_page_listitem">
              <a href={`#dint-token`} className={"header__link"}>
                Dint Token
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
            These Terms of Use for all Users govern your use of Dint and your
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
            a. we refer to our website as <b>"Dint"</b>, including when accessed
            via the URL www.dint.com;
            <br />
            b. references to <b>"we", "our", "us"</b> are references to Dint,
            the operator of Dint;
            <br />
            c. <b>"Content"</b> means any material uploaded to Dint by any User,
            including any photos, videos, audio (for example music and other
            sounds), livestream material, data, text (such as comments and
            hashtags), metadata, images, interactive features, emojis, GIFs,
            memes, and any other material whatsoever;
            <br />
            d. <b>"User"</b> means a User who has set up their Dint account to
            post Content on Dint to be viewed by other other Users;
            <br />
            e. <b>"Referring User"</b> means a User who participates in the Dint
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
            Dint.com is operated by Dint.
            <br />
            To contact us with any questions about Dint, please email our
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
            apply to Dint and the services, features and programs of Dint where
            such changes require Dint to change its terms and conditions in a
            manner which does not allow us to give reasonable notice to you; and
            <br />
            b. to address an unforeseen and imminent danger related to defending
            Dint or Users from fraud, malware, spam, data breaches or other
            cybersecurity risks.
            <br />
            <br />
            We may also make other changes to any part of the Terms of Service,
            and we will give you reasonable notice of such changes by email or
            through Dint, and you may contact us to end your agreement with us
            before the changes take effect. Once any updated Terms of Service
            are in effect, you will be bound by them if you continue to use
            Dint.
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
            5. <b>We may make changes to or suspend or withdraw Dint:</b> <br />
            We may update and change Dint from time to time for any reason,
            including to reflect changes to our services, Users' needs and our
            business practices or to improve performance, enhance functionality
            or address security issues. We will try to give you reasonable
            notice of any major changes. We do not guarantee that Dint, or any
            Content on it, will always be available or accessible without
            interruption. We may suspend or withdraw or restrict the
            availability of all or any part of Dint for business or operational
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
            6 <b>Registering with Dint:</b> <br />
            To use Dint you must have a referral code in order to register and
            create a User account on Dint. You must provide a valid email
            address, a username, and a password or authenticate using a valid
            Twitter or Google account. Your password should be unique (meaning
            that it is different to those you use for other websites) and must
            comply with the technical requirements of the Dint site for the
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
            State/province where you are located to join Dint and to view any
            Content available on it and to use any functionality provided by it.
            <br />
            d. you must provide such other information or verification records
            as we require.
            <br />
            <br />
            If you do not meet the above requirements, you must not access or
            use Dint.
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
            When you register with and use Dint, you make the following
            commitments to us:
            <br />
            a. If you previously had an account with Dint, you confirm that your
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
            including by emails and messages posted to your Dint account, and to
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
            Dint which we become aware may not comply with the Terms of Service
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
            notify you via email or electronic message to your Dint account, but
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
            We will use reasonable care and skill in providing Dint to you, but
            there are certain things which we are not responsible for, as
            follows:
            <br />
            a. We do not authorize or approve Content on Dint, and views
            expressed by Users on Dint do not necessarily represent our views.
            b. We do not grant you any rights in relation to Content. Any such
            rights may only be granted to you by Users. c. Your Content may be
            viewed by individuals that recognise your identity. We will not in
            any way be responsible to you if you are identified from your
            Content. While we may, from time to time and in our sole discretion,
            offer certain geofencing or geolocation technology on Dint, you
            understand and agree that we do not guarantee the accuracy or
            effectiveness of such technology, and you will have no claim against
            us arising from your use of or reliance upon any geofencing or
            geolocation technology on Dint.
            <br />
            d. All Content is created, selected, and provided by Users and not
            by us. We are not responsible for reviewing or moderating Content,
            and we do not select or modify the Content that is stored or
            transmitted via Dint. We are under no obligation to monitor Content
            or to detect breaches of the Terms of Service.
            <br />
            e. You agree that you have no obligation to follow any suggestions,
            comments, reviews, or instructions received from another User of
            Dint and that if you choose to do so, you do so entirely at your own
            risk.
            <br />
            f. We make no promises or guarantees of any kind that Users or
            Referring Users will make a particular sum of money (or any money)
            from their use of Dint (including the Dint Referral Program).
            <br />
            g. The materials which we make accessible on Dint for Users are for
            general information only. We make no promises or guarantees about
            the accuracy or otherwise of such materials, or that Users will
            achieve any particular result or outcome from using such materials.
            <br />
            h. We do not promise that Dint is compatible with all devices and
            operating systems. You are responsible for configuring your
            information technology, device, and computer programs to access
            Dint. You should use your own virus protection software.
            <br />
            i. We are not responsible for the availability of the internet, or
            any errors in your connections, device or other equipment, or
            software that may occur in relation to your use of Dint.
            <br />
            j. While we try to make sure that Dint is secure and free from bugs
            and viruses, we cannot promise that it will be and have no control
            over the Content that is supplied by Users.
            <br />
            k. We are not responsible for any lost, stolen, or compromised User
            accounts, passwords, email accounts, or any resulting unauthorized
            activities or resulting unauthorized payments or withdrawals of
            funds.
            <br />
            L. You acknowledge that once your Content is posted on Dint, we
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
            Dint is accessible and, in particular, in the United States of
            America, the United Kingdom and the European Union.
            <br />
            b. You agree to grant us a license under all your Content to perform
            any act restricted by any intellectual property right (including
            copyright) in such Content, for any purpose reasonably related to
            the provision and operation of Dint. Such acts include to reproduce,
            make available and communicate to the public, display, perform,
            distribute, translate, and create adaptations or derivative works of
            your Content, and otherwise deal in your Content.
            <br />
            c .The license which you grant to us under sub-section 10(b) above
            is perpetual, non-exclusive, worldwide, royalty-free, sublicensable,
            assignable and transferable by us. This means that the license will
            continue even after your agreement with us ends and you stop using
            Dint, that we do not have to pay you for the license, and that we
            can grant a sub-license of your Content to someone else or assign or
            transfer the license to someone else. This license will allow us,
            for example, to add stickers, text, and watermarks to your Content,
            to make your Content available to other Users of Dint, as well as to
            use your Content for other normal operations of Dint. We will never
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
            posted by you on Dint. This waiver does not affect in any way your
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
            their Dint account and to share certain Content in the form of Dint
            posts to Twitter using the share feature. If you use this feature,
            you must fully comply with Twitter's terms of service from time to
            time in respect of any Content shared in this way. Linking to and
            from Dint:
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
            12. <b>Linking to and from Dint:</b>
            <br />
            a. Links to Dint:
            <br />
            &#8226; You may link to the Dint homepage, provided you do so in a
            way that is fair and legal and does not damage our reputation or
            take advantage of it, but you must not establish a link in such a
            way as to suggest any form of association, approval, or endorsement
            on our part. &#8226; When promoting your Content you must comply
            with our Terms of Service and the terms of service of any other
            website where you place a link to or otherwise promote your User
            account. When promoting your content, you must not impersonate Dint
            or give the impression that your User account is being promoted by
            us if this is not the case. You must not promote your Dint account
            by using Google Ads or any similar advertising platform or search
            engine advertising service.
            <br />
            b. Links from Dint: <br />
            &#8226; If Dint contains links to other sites and resources provided
            by third parties, these links are provided for your convenience
            only. Such links should not be interpreted as approval by us of
            those linked websites or information you may obtain from them. We
            have no control over the contents of those sites or resources and
            accept no responsibility for them or for any loss or damage that may
            arise from your use of them. If you decide to access any of the
            third-party websites linked to Dint, you do so entirely at your own
            risk and subject to the terms and conditions of use for such
            websites. Domain Names: In some instances, Dint may allow Users to
            register or use domain names that contain the Dint trademark or a
            confusingly similar term. However, you will not register such a
            domain name, unless:
            <br />
            <br />
            &#8226; The domain name is registered by the User. &#8226; The
            domain name redirects to the Users’s Dint profile or page. Domain
            names containing the Dint trademark or a confusingly similar term
            must not direct to any other website, including link aggregators.
            &#8226; The User obtains prior written permission from Dint and
            signs a licensing agreement.
            <br />
            <br />
            If you would like to register a domain name containing the Dint
            trademark or a confusingly similar term, please contact
            support@dint.com. Failing to comply with these provisions or the
            licensing agreement will be considered a violation of the licensing
            agreement and may result in Dint filing a domain dispute against the
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
            If you want to delete your Dint account then you may do so in the
            'User Account' section of your Dint account.
            <br />
            a. The deletion of your account will take place within a reasonable
            time following your request. <br />
            b. Once your account has been deleted you won't be charged any
            further amounts or have access to your former Dint account or its
            Content, and any subscriptions will be deleted and cannot be
            subsequently renewed. You will receive an email confirmation upon
            the successful deletion of your account. Once your account has been
            deleted, we may deal with your Content in any appropriate manner in
            accordance with our Privacy Policy (including by deleting it) and
            you will no longer be entitled to access your Content. There is no
            technical facility on Dint for you to be able to access your Content
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
            from or in connection with your use of Dint.
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
            c. To make a withdrawal of User Earnings from your Dint Wallet, you
            must have at least the minimum balance amount in your Dint Wallet.
            Please click on withdrawal on your Dint Wallet page to see what the
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
            a. How are referral payments calculated? The Dint Referral Program
            is a referral program offered by Dint, allowing existing users to
            earn referral payments by introducing new users to the platform.
            Only active users with a User account on Dint are eligible to
            participate in the program. The user must have a bank account or
            payment method linked to their account in order to receive referral
            payments. The user has a unique referral link that can be shared
            with others. The referred user must register via the referral link
            and not have previously been a user of Dint. Referral payments are
            calculated at 8% divided into 4 tiers, with a cap of $500,000 or ten
            years, whichever comes first, per referred user. Payments are
            transferred to the referring user's Dint Wallet immediately.
            <br />
            b. Choosing a payout method to receive referral payments: In order
            to be able to receive referral payments you must first choose one of
            the payout methods provided by Dint in your country of residence.
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
            18. <b>Dint Wallet:</b>
            <br />
            Dint provides every User with their own crypto wallet to store and
            manage their tokens.
            <br />
            <br />
            19. <b id="dint-token">Dint Token:</b> <br />
            Users can buy the Dint token on the app for $1 each and then sell it
            for $1 each. Dint tokens are on the Polygon network.
          </div>
        </p>
      </main>
      {/* Main page ends */}
    </>
  );
};
export default TermsOfServices;
