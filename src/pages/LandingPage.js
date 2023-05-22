import { SEO } from 'utils/SEO';
import Schedule from 'components/Schedule/Schedule';

const LandingPage = () => {
  return (
    <>
      <SEO title="Home" description="Barbershop. We do what is best for you" />
      <Schedule />
    </>
  );
};

export default LandingPage;
