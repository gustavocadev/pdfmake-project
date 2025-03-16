import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers/date-formatter";
import { text } from "stream/consumers";
import { footerSection } from "./sections/footer.section";
import { CurrencyFormatter } from "src/helpers/currency-formatter";
import { orders } from "@prisma/client";

const logo: Content = {
  image: "src/assets/tucan-banner.png",
  width: 100,
  height: 30,
  margin: [10, 20, 0, 0],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
  },
  subHeader: {
    fontSize: 16,
    bold: true,
  },
};

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subTitle?: string;
  data: CompleteOrder[];
}

export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
  const { data } = value;
  const { customers, order_details } = data[0];

  const subtotal = data[0].order_details.reduce(
    (acc, curr) => acc + parseFloat(curr.products.price) * curr.quantity,
    0,
  );
  const total = subtotal;

  const docDefinition: TDocumentDefinitions = {
    header: logo,
    pageMargins: [40, 60, 40, 60],
    styles,
    content: [
      {
        text: "Tucan Code",
        style: "header",
      },
      {
        margin: [0, 20, 0, 0],
        columns: [
          {
            text: `15 Montgomery Str, Suite 100, /n
        Ottawa ON K2Y 9X1, CANADA
        BN: 12783671823
        https://devtalles.com/
        `,
            bold: true,
          },
          {
            text: [
              {
                text: "Recibo No#:",
                bold: true,
              },
              ` 10255
        Fecha del recibo: ${DateFormatter.getDDMMMMYYYY(data[0].order_date)}
        Pagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}`,
            ],
            alignment: "right",
          },
        ],
      },
      {
        qr: "https://devtalles.com/",
        alignment: "right",
      },
      {
        text: [
          {
            text: `Cobrar a: ${customers.customer_name} \n`,
            style: "subHeader",
          },
          `Razón Social: ${customers.customer_id} \n`,
          `${customers.contact_name}`,
        ],
      },
      {
        layout: "headerLineOnly",
        marginTop: 20,
        table: {
          headerRows: 1,

          widths: [50, "*", "auto", "auto", "auto"],
          body: [
            ["ID", "Descripción", "Cantidad", "Precio", "Total"],
            ...order_details.map((orderDetail) => [
              orderDetail.product_id,
              orderDetail.products.product_name,
              orderDetail.quantity,
              CurrencyFormatter.formatCurrency(
                parseFloat(orderDetail.products.price) * orderDetail.quantity,
              ),
              CurrencyFormatter.formatCurrency(
                parseFloat(orderDetail.products.price) * orderDetail.quantity,
              ),
            ]),
          ],
        },
      },
      {
        marginTop: 20,
        table: {
          widths: ["*", "auto", "auto"],

          body: [
            ["", "Subtotal", CurrencyFormatter.formatCurrency(subtotal)],
            [
              "",
              {
                text: "Total",
                bold: true,
              },
              {
                text: CurrencyFormatter.formatCurrency(total),
                bold: true,
              },
            ],
          ],
        },
        layout: "headerLineOnly",
      },
    ],
    footer: footerSection,
  };

  return docDefinition;
};
