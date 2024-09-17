import { Injectable } from "@nestjs/common";
import PDFPrinter from "pdfmake";
import { BufferOptions, TDocumentDefinitions } from "pdfmake/interfaces";

const fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-MediumItalic.ttf",
  },
};

@Injectable()
export class PrinterService {
  #printer = new PDFPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {},
  ): PDFKit.PDFDocument {
    return this.#printer.createPdfKitDocument(docDefinition, options);
  }
}
