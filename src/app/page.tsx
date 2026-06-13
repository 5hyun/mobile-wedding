import AccountSection from "@/components/AccountSection";
import BackgroundMusic from "@/components/BackgroundMusic";
import ClosingSection from "@/components/ClosingSection";
import ContactShareSection from "@/components/ContactShareSection";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import InvitationSection from "@/components/InvitationSection";
import ScrollTopButton from "@/components/ScrollTopButton";
import VenueSection from "@/components/VenueSection";
import WeddingInfoSection from "@/components/WeddingInfoSection";

export default function Home() {
  return (
    <div className="site-shell">
      <main className="invitation-page" id="top">
        <BackgroundMusic />

        {/* 첫 화면 */}
        <HeroSection />

        {/* 종이 청첩장 본문 */}
        <InvitationSection />
        <WeddingInfoSection />
        <VenueSection />

        {/* 상세 정보 */}
        <GallerySection />
        <AccountSection />
        <ContactShareSection />
        <ClosingSection />
        <ScrollTopButton />
      </main>
    </div>
  );
}
