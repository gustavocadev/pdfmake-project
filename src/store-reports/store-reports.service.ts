import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { PrinterService } from "../printer/printer.service";
import { orderByIdReport } from "src/reports/order-by-id.report";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class StoreReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  async getOrderByIdReport(orderId: number): Promise<PDFKit.PDFDocument> {
    const order = await this.orders.findMany({
      where: {
        order_id: orderId,
      },
      include: {
        customers: true,
        order_details: {
          include: {
            products: true,
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException("Order not found");
    }

    const docDefinition = orderByIdReport({
      title: "Order Report",
      subTitle: `Order ID: ${orderId}`,
      data: order as any,
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
