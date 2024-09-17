import { Injectable, NotFoundException, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrinterService } from "src/printer/printer.service";
import { getEmploymentLetterByIdReport } from "src/reports/employment-letter-by-id.report";
import { getEmploymentLetterReport } from "src/reports/employment-letter.report";
import { getHelloWorldReport } from "src/reports/hello-world.report";

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  constructor(private readonly printerService: PrinterService) {
    super();
  }

  hello() {
    const docDefinition = getHelloWorldReport({ name: "gustavo" });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      throw new NotFoundException("Employee not found");
    }
    console.log(employee);
    const docDefinition = getEmploymentLetterByIdReport({
      employeerName: "Gutavo C",
      employeerPosition: "Software Engineer",
      employeerCompany: "Tucan Code Inc",
      employeeHours: employee.hours_per_day,
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeWorkSchedule: employee.work_schedule,
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
