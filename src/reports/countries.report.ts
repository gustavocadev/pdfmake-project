import { TDocumentDefinitions } from "pdfmake/interfaces";
import { headerSection } from "./sections/header.section";
import { Country } from "@prisma/client";
import { footerSection } from "./sections/footer.section";

interface ReportOptions {
  title?: string;
  subtitle?: string;
  countries: Country[];
}

export const getCountriesReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const { title, subtitle, countries } = options;
  const headerRows = ["ID", "ISO2", "ISO3", "Name", "Continent", "Local Name"];

  const doc: TDocumentDefinitions = {
    pageOrientation: "landscape",
    header: headerSection({
      title: title ?? "Countries Report",
      subTitle: subtitle ?? "List of countries",
    }),
    footer: footerSection,
    pageMargins: [40, 120, 40, 60],
    content: [
      {
        layout: "customLayout01",
        table: {
          headerRows: 1,
          widths: [50, 50, 50, "*", "auto", "*"],
          body: [
            headerRows.map((header) => ({ text: header, bold: true })),
            ...countries.map((country) => [
              country.id.toString(),
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent,
              country.local_name,
            ]),
          ],
        },
      },
      {
        text: "Totales",
        style: {
          fontSize: 18,
          bold: true,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: "lightHorizontalLines",
        table: {
          headerRows: 1,
          widths: [50, 50, 80, "*", "auto", "*"],
          body: [
            [
              { text: "Total de paises", bold: true, colSpan: 2 },
              {},
              { text: `${countries.length.toString()} paises`, bold: true },
            ],
          ],
        },
      },
    ],
  };
  return doc;
};
