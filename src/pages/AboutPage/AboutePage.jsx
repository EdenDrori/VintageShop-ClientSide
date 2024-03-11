import React from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";


const AboutPage = () => {
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
          Welcome to our Second-Hand Vintage Emporium!
        </Typography>

        <Typography paragraph>
          <strong>Discover Timeless Treasures:</strong> Explore a curated
          collection of second-hand vintage items, including clothing, bags,
          accessories, shoes, and more. Our platform is a haven for those who
          appreciate the charm and uniqueness of vintage pieces.
        </Typography>

        <Typography paragraph>
          <strong>Register for Endless Possibilities:</strong> Join our
          community by creating an account. You have the choice to register as a
          Business Account, allowing you to showcase and sell your vintage gems.
          Alternatively, sign up as a regular user to explore, like, and buy
          stunning items.
        </Typography>

        <Typography paragraph>
          <strong>Seamless Transactions:</strong> Enjoy the convenience of
          secure transactions. Every seller and customer is protected as all
          payments are processed through the site using credit cards. Buy your
          favorite items with confidence, knowing that your payment is secure.
        </Typography>

        <Typography paragraph>
          <strong>Stay Connected:</strong> Connect with sellers to get more
          information about items you love. Our platform enables communication
          between buyers and sellers, fostering a community built on trust and
          transparency.
        </Typography>

        <Typography paragraph>
          <strong>Effortless Selling:</strong> As a seller, manage your items
          effortlessly. Edit or delete listings, and explore other vintage
          treasures. See immediate payment updates on your items page, with the
          option to withdraw funds directly to your bank account.
        </Typography>

        <Typography paragraph>
          <strong>Sustainable Shopping:</strong> Embrace a fashion-forward
          approach while contributing to a sustainable future. Our platform
          supports eco-conscious choices, promoting the reuse and upcycling of
          vintage fashion.
        </Typography>

        <Typography paragraph>
          <strong>Flexible Pick-up Options:</strong> Coordinate with sellers to
          pick up your chosen items. Match schedules, and decide whether to have
          your items delivered or pick them up in person. Enjoy a personalized
          and flexible shopping experience.
        </Typography>

        <Typography paragraph>
          <strong>Fashion with a Purpose:</strong> At our Second-Hand Vintage
          Emporium, we believe in the power of fashion to make a positive
          impact. Join us in supporting a world-saving initiative, where both
          sellers and buyers experience a seamless and secure vintage shopping
          journey.
        </Typography>

        <Typography paragraph>
          Welcome to a world where vintage meets modern convenience—where every
          transaction is protected, and every purchase tells a unique story.
          Happy shopping!
        </Typography>

      </Paper>
    </Container>
  );
};

export default AboutPage;
