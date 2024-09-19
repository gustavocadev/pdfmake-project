import { Injectable } from "@nestjs/common";
import PDFPrinter from "pdfmake";
import {
  BufferOptions,
  CustomTableLayout,
  TDocumentDefinitions,
} from "pdfmake/interfaces";

const fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Bold.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-BoldItalic.ttf",
  },
};

const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout01: {
    hLineWidth: function () {
      return 1;
    },
    vLineWidth: function () {
      return 1;
    },
    vLineColor: function () {
      return "#ccc";
    },
    hLineColor: function () {
      return "#ccc";
    },
    paddingLeft: function () {
      return 8;
    },
    paddingRight: function (i, node) {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
    fillColor: function (i) {
      return i % 2 === 0 ? "#f5f5f5" : null;
    },
  },
};

@Injectable()
export class PrinterService {
  #printer = new PDFPrinter(fonts);

  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {
      tableLayouts: customTableLayouts,
    },
  ): PDFKit.PDFDocument {
    return this.#printer.createPdfKitDocument(docDefinition, options);
  }
}
