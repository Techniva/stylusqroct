import { prisma } from "@/lib/prisma";
import CardTemplateClassic from "@/app/digital-business-cards/create/mycard/CardTemplateClassic";
import CardTemplateModern from "@/app/digital-business-cards/create/mycard/CardTemplateModern";
import CardTemplateMinimal from "@/app/digital-business-cards/create/mycard/CardTemplateMinimal";
import CardTemplateElegant from "@/app/digital-business-cards/create/mycard/CardTemplateElegant";

type PageProps = { params: Promise<{ uniqueCode: string }> };
type TemplateType = "classic" | "modern" | "minimal" | "elegant";

export default async function CardViewerPage(props: PageProps) {
  // ✅ await params safely
  const { uniqueCode } = await props.params;

  const card = await prisma.digitalBusinessCard.findUnique({
    where: { uniqueCode },
  });

  if (!card) {
    return <div className="p-6 text-center text-red-500">Card not found</div>;
  }

  const cardProps = {
    name: card.name,
    title: card.title ?? "",
    company: card.company ?? "",
    email: card.email ?? "",
    phone: card.phone ?? "",
    address: card.address ?? "",
    website: card.website ?? "",
    pronoun: card.pronoun ?? "",
    about: card.about ?? "",
    accreditations: card.accreditations ?? "",
    primaryColor: card.primaryColor ?? "#1E3A8A",
    secondaryColor: card.secondaryColor ?? "#3B82F6",
    profileUrl: card.profileUrl ?? "/dbc/profile/profile.jpg",
    activeFields: (card.activeFields as string[]) ?? [],
    fieldData: (card.fieldData as Record<string, any>) ?? {},
  };

  const templates: Record<TemplateType, React.ComponentType<any>> = {
    classic: CardTemplateClassic,
    modern: CardTemplateModern,
    minimal: CardTemplateMinimal,
    elegant: CardTemplateElegant,
  };

  const Template = templates[(card.template as TemplateType) ?? "classic"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Template {...cardProps} />
    </div>
  );
}
