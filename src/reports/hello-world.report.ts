import { TDocumentDefinitions } from "pdfmake/interfaces";

interface ReportOptions {
  name: string;
}

export const getHelloWorldReport = (
  options: ReportOptions,
): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: [`Hello ${options.name}`],
  };

  return docDefinition;
};
