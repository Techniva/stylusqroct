import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Body from "@/app/components/layout/Body";
import MainLayout from "@/app/components/layout/MainLayout";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Body>
        <MainLayout />
      </Body>
      <Footer />
    </div>
  );
}
