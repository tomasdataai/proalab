import { CaseStudyComponent } from "./case-study-component"

export function EducationCaseStudy() {
  return (
    <CaseStudyComponent
      title="Universidad Nacional de Chile"
      badgeColor="bg-[#EE3831]"
      borderColor="border-[#EE3831]"
      description="La Universidad Nacional implementó ProaLAB para rediseñar su oferta académica basándose en proyecciones del mercado laboral, logrando:"
      features={[
        "Aumento del 27% en la empleabilidad de sus egresados",
        "Creación de 5 nuevos programas alineados con demandas emergentes",
        "Reducción del 35% en la deserción estudiantil",
        "Mejora significativa en la satisfacción de empleadores",
      ]}
      buttonText="Ver caso completo"
      buttonColor="bg-[#EE3831] hover:bg-[#E50695]"
      testimonial={{
        quote:
          "ProaLAB nos permitió anticipar las necesidades del mercado laboral y adaptar nuestra oferta académica de manera ágil y precisa. El resultado ha sido una mejora sustancial en la empleabilidad de nuestros egresados y un posicionamiento más sólido de nuestra institución.",
        avatarInitials: "MR",
        avatarBgColor: "bg-[#EE3831]",
        name: "Dra. María Rodríguez",
        role: "Vicerrectora Académica",
      }}
    />
  )
}

