 import HeroSection from "../../components/home/heroSection/HeroSection";
import FeaturedSalons from "../../components/home/featuredSalons/FeaturedSalons";
import ServicesSection from "../../components/home/serviceSection/ServicesSection";
import DownloadApp from "../../components/home/downloadApp/DownloadApp";
import ReviewsSection from "../../components/home/reviewsSection/ReviewsSection";
 import "./home.css";
function Home() {
  return (
    <div className="home-container">
      <HeroSection />
      <FeaturedSalons />
      <ServicesSection />
      <DownloadApp />
      <ReviewsSection />
    </div>
  );
}

export default Home;
