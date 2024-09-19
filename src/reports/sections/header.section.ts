import { Content } from "pdfmake/interfaces";
import { DateFormatter } from "src/helpers/date-formatter";

const logo: Content = {
  image: "src/assets/tucan-code-logo.png",
  width: 100,
  height: 100,
  alignment: "center",
  margin: [0, 0, 0, 20],
};

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}
const currentDate: Content = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: "right",
  margin: [20, 40],
  width: 160,
};

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content | null = showLogo ? logo : null;

  const headerDate: Content | null = showDate ? currentDate : null;

  const headerSubtitle: Content | null = subTitle
    ? {
        text: `${subTitle}`,
        style: { bold: true, alignment: "center", fontSize: 16 },
      }
    : null;

  const headerTitle: Content | null = title
    ? {
        stack: [
          {
            text: `${title}`,
            style: {
              bold: true,
              alignment: "center",
              fontSize: 22,
            },
            margin: [0, 15, 0, 0],
          },
          headerSubtitle,
        ],
      }
    : null;

  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
