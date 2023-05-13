// @mui
import { Container, Typography } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

export default function TermsAndConditions() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Terms and Conditions">
      <Container maxWidth={themeStretch ? false : 'xl'} style={{ paddingBottom: '48px', paddingTop: '48px' }}>
        <Typography variant="h3" paragraph>
          Terms and Conditions
        </Typography>
        <Typography gutterBottom>Welcome to OpenRateBoost!</Typography>
        <Typography gutterBottom>
          These terms and conditions outline the rules and regulations for the use of OpenRateBoost Inc.'s Website,
          located at https://openrateboost.ai.
        </Typography>
        <Typography gutterBottom>
          By accessing this website, we assume you accept these terms and conditions. Do not continue to use
          OpenRateBoost if you do not agree to take all of the terms and conditions stated on this page.
        </Typography>
        <Typography variant="h5" paragraph>
          Cookies:
        </Typography>
        <Typography gutterBottom>
          The website uses cookies to help personalize your online experience. By accessing OpenRateBoost, you agreed to
          use the required cookies.
          <br />
          <br />
          A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run
          programs or deliver viruses to your computer. Cookies are uniquely assigned to you and can only be read by a
          web server in the domain that issued the cookie to you.
          <br />
          <br /> We may use cookies to collect, store, and track information for statistical or marketing purposes to
          operate our website. You have the ability to accept or decline optional Cookies. There are some required
          Cookies that are necessary for the operation of our website. These cookies do not require your consent as they
          always work. Please keep in mind that by accepting required Cookies, you also accept third-party Cookies,
          which might be used via third-party provided services if you use such services on our website, for example, a
          video display window provided by third parties and integrated into our website.
        </Typography>
        <Typography variant="h5" paragraph>
          License:
        </Typography>
        <Typography gutterBottom>
          Unless otherwise stated, OpenRateBoost Inc. and/or its licensors own the intellectual property rights for all
          material on OpenRateBoost. All intellectual property rights are reserved. You may access this from
          OpenRateBoost for your own personal use subjected to restrictions set in these terms and conditions.
          <br />
          <br />
          You must not: <br />
          <ul style={{ marginLeft: '40px' }}>
            <li>Copy or republish material from OpenRateBoost</li>
            <li>Sell, rent, or sub-license material from OpenRateBoost</li>
            <li>Reproduce, duplicate or copy material from OpenRateBoost</li>
            <li>Redistribute content from OpenRateBoost</li>
          </ul>
          <br />
          <br />
          This Agreement shall begin on the date hereof.
          <br />
          <br />
        </Typography>
        <Typography variant="h5" paragraph>
          Hyperlinking to our Content:
        </Typography>
        <Typography gutterBottom>
          The following organizations may link to our Website without prior written approval:
          <br />
          <br />
          <ul style={{ marginLeft: '40px' }}>
            <li>Government agencies;</li>
            <li>Search engines;</li>
            <li>News organizations;</li>
            <li>
              Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites
              of other listed businesses; and
            </li>
            <li>
              System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and
              charity fundraising groups which may not hyperlink to our Web site.
            </li>
          </ul>
          <br />
          These organizations may link to our home page, to publications, or to other Website information so long as the
          link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the
          linking party and its products and/or services; and (c) fits within the context of the linking party's site.
          <br />
          <br />
          We may consider and approve other link requests from the following types of organizations:
          <br />
          <br />
          <ul style={{ marginLeft: '40px' }}>
            <li>commonly-known consumer and/or business information sources;</li>
            <li>dot.com community sites;</li>
            <li>associations or other groups representing charities;</li>
            <li>online directory distributors;</li>
            <li>internet portals;</li>
            <li>accounting, law, and consulting firms; and</li>
            <li>educational institutions and trade associations.</li>
          </ul>
          <br />
          We will approve link requests from these organizations if we decide that: (a) the link would not make us look
          unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative
          records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of
          OpenRateBoost Inc.; and (d) the link is in the context of general resource information.
          <br />
          <br />
          These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does
          not falsely imply sponsorship, endorsement, or approval of the linking party and its products or services; and
          (c) fits within the context of the linking party's site.
          <br />
          <br />
          If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website,
          you must inform us by sending an e-mail to OpenRateBoost Inc.. Please include your name, your organization
          name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to
          our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a
          response.
          <br />
          <br />
          Approved organizations may hyperlink to our Website as follows:
          <br />
          <br />
          <ul style={{ marginLeft: '40px' }}>
            <li>By use of our corporate name; or</li>
            <li>or By use of the uniform resource locator being linked to; or</li>
            <li>
              or Using any other description of our Website being linked to that makes sense within the context and
              format of content on the linking party's site.
            </li>
          </ul>
          <br />
          No use of OpenRateBoost Inc.'s logo or other artwork will be allowed for linking absent a trademark license
          agreement.
        </Typography>
        <Typography variant="h5" paragraph>
          Content Liability:
        </Typography>
        <Typography gutterBottom>
          We shall not be held responsible for any content that appears on your Website. You agree to protect and defend
          us against all claims that are raised on your Website. No link(s) should appear on any Website that may be
          interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the
          infringement or other violation of, any third party rights.
        </Typography>
        <Typography variant="h5" paragraph>
          Reservation of Rights:
        </Typography>
        <Typography gutterBottom>
          We reserve the right to request that you remove all links or any particular link to our Website. You approve
          to immediately remove all links to our Website upon request. We also reserve the right to amend these terms
          and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be
          bound to and follow these linking terms and conditions.
        </Typography>
        <Typography variant="h5" paragraph>
          Removal of links from our website:
        </Typography>
        <Typography gutterBottom>
          If you find any link on our Website that is offensive for any reason, you are free to contact and inform us at
          any moment. We will consider requests to remove links, but we are not obligated to or so or to respond to you
          directly.
          <br />
          <br />
          We do not ensure that the information on this website is correct. We do not warrant its completeness or
          accuracy, nor do we promise to ensure that the website remains available or that the material on the website
          is kept up to date.
        </Typography>
        <Typography variant="h5" paragraph>
          Disclaimer:
        </Typography>
        <Typography gutterBottom>
          To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions
          relating to our website and the use of this website. Nothing in this disclaimer will:
          <br />
          <br />
          <ul style={{ marginLeft: '40px' }}>
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>
          <br />
          The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are
          subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including
          liabilities arising in contract, in tort, and for breach of statutory duty.
          <br />
          <br />
          As long as the website and the information and services on the website are provided free of charge, we will
          not be liable for any loss or damage of any nature.
        </Typography>
      </Container>
    </Page>
  );
}
