
import Hero from '../components/Hero';
import CompanyLogo from '../components/CompanyLogo';
import PurposeSection from '../components/PurposeSection';
import FeaturesSection from '../components/FeaturesSection';
import ScheduleSection from '../components/ScheduleSection';
import MonitorSection from '../components/MonitorSection';
import PricingSection from '../components/PricingSection';
import ServicesSection from '../components/ServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import Footer from '../components/Footer';

export default function Home() {
	return (
		<>
			<Hero />
			<CompanyLogo />
			<PurposeSection />
			<FeaturesSection />
			<ScheduleSection />
			<MonitorSection />
			<PricingSection />
			<ServicesSection />
			<TestimonialsSection />
			<NewsletterSection />
			<Footer />
		</>
	);
}
