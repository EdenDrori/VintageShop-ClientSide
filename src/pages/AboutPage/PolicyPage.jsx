import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const SitePolicy = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        paddingBottom: "60px",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 3,
          backgroundColor: "sectionBackground.default",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: { xs: "center", lg: "left" } }}
          gutterBottom
        >
          Site Policy
        </Typography>

        <Typography paragraph>
          <strong>1. Introduction</strong>
        </Typography>

        <Typography paragraph>
          Welcome to our Fasion Vintage site. By accessing or using our site,
          you agree to abide by these policies and regulations. Please carefully
          read the policy before using the site.
        </Typography>

        <Typography paragraph>
          <strong>2. No Return Policy</strong>
        </Typography>

        <Typography paragraph>
          All items listed on this site are sold "as-is." We do not accept
          returns or exchanges. Please review product descriptions and images
          carefully before making a purchase. By using our site, you acknowledge
          and agree to our no-return policy.
        </Typography>

        <Typography paragraph>
          <strong>3. Limited Liability</strong>
        </Typography>

        <Typography paragraph>
          Our site operates as a platform for users to buy and sell vintage
          items. We are not responsible for the condition, quality, or
          authenticity of items listed on the site. Buyers and sellers are
          solely responsible for their transactions.
        </Typography>

        <Typography paragraph>
          <strong>4. Address Sharing</strong>
        </Typography>

        <Typography paragraph>
          To facilitate the buying and selling process, users may be required to
          share their precise addresses. By using our site, you agree to share
          accurate and current address details for shipping purposes. We handle
          addresses according to our Privacy Policy.
        </Typography>

        <Typography paragraph>
          <strong>5. Privacy Policy</strong>
        </Typography>

        <Typography paragraph>
          Our Privacy Policy outlines how we collect, use, and disclose personal
          information, including address details. We are committed to securing
          and maintaining the privacy of your personal information.
        </Typography>

        <Typography paragraph>
          <strong>6. Contact</strong>
        </Typography>

        <Typography paragraph>
          If you have questions, concerns, or feedback related to our policies,
          please contact us at Edendrori36@gmail.com.
        </Typography>

        <Typography paragraph>
          <strong>7. Changes to Policy</strong>
        </Typography>

        <Typography paragraph>
          Our site reserves the right to update and modify this policy at any
          time. Users will be notified of significant changes, and it is their
          responsibility to periodically review the policy.
        </Typography>

        <Typography paragraph>
          Thank you for joining our Fasion vintage site. We hope you enjoy
          contributing to our vintage community!
        </Typography>
      </Paper>
    </Container>
  );
};

export default SitePolicy;
