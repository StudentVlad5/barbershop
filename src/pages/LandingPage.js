import { SEO } from "utils/SEO";
// import Schedule from 'components/Schedule/Schedule';
import Hero from "components/Sections/Hero/Hero";
import About from "components/Sections/About/About";
import Price from "components/Sections/Price/Price";
import Benefits from "components/Sections/Benefits/Benefits";
import Team from "components/Sections/Team/Team";
import Gallery from "components/Sections/Gallery/Gallery";
import Contacts from "components/Sections/Contacts/Contacts";
import { ButtonForOrder } from "components/ButtonForOffer/ButtonForOrder.styled";
import Schedule from "components/Schedule/Schedule";
import { openModalWindow } from "hooks/modalWindow";

const LandingPage = () => {
  return (
    <>
      <SEO title="Home" description="Barbershop. We do what is best for you" />
      <Hero />
      <About />
      <Price />
      <Benefits />
      <Team />
      <Gallery />
      <Contacts />
      <ButtonForOrder onClick={(e) => openModalWindow(e)}>
        Book service
      </ButtonForOrder>
      <Schedule />
    </>
  );
};

export default LandingPage;
