import AccountSection from "@/components/AccountSection";
import ClosingSection from "@/components/ClosingSection";
import ContactShareSection from "@/components/ContactShareSection";
import CoupleSection from "@/components/CoupleSection";
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
        {/* 첫 화면 */}
        <HeroSection />

        {/* 핵심 일정과 장소 */}
        <WeddingInfoSection />
        <VenueSection />

        {/* 초대와 사진 무드 */}
        <InvitationSection />
        <CoupleSection />
        <GallerySection />
        <AccountSection />
        <ContactShareSection />
        <ClosingSection />
        <ScrollTopButton />
      </main>
    </div>
  );
}
