import { Content } from "pdfmake/interfaces";

export const footerSection = (
  currentPage: number,
  pageCount: number,
): Content => {
  return {
    text: `Page ${currentPage} of ${pageCount}`,
    alignment: "right",
    fontSize: 12,
    bold: true,
    margin: [20, 10],
  };
};
