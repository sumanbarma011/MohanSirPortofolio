import {
  ContactResponseType,
  STATUS,
} from "@/features/core/contact/contact.types";

export const MOCK_CONTACTS_DATA: ContactResponseType[] = [
  {
    _id: "661b17a2f1b4c3e8a1111111",
    name: "Ramesh Adhikari",
    email: "ramesh.adhikari@bhatbhateni.np",
    phone: "+977 9851012345", // Nepal Telecom (NTC) Mobile Format
    service: "TAXATION",
    subject: "New PVT LTD Company Tax Planning & IRD PAN issue",
    message:
      "Namaskar sir,\n\nHamiले bharkharai euta naya trading company register gareko xau. IRD ma PAN lina baki xa. Biwaran k k chainxa ani tax compliance kasari milaune hola? Hami sathi haru milera thulo scale ma bhanda paila tax optimize garna khojeko. Kripaya call bhanda paila malai mail ma update garnus na hajur.",
    isResponded: false,
    status: STATUS.NEW,
    createdAt: new Date("2026-06-12T09:30:00.000Z"),
    updatedAt: new Date("2026-06-12T09:30:00.000Z"),
  },
  {
    _id: "661b17e4f1b4c3e8a2222222",
    name: "Sita Shrestha",
    email: "sita.pvt@kathmandu-ventures.com",
    phone: "+977 01-4412345", // Kathmandu Landline Format
    service: "AUDIT",
    subject: "Year-End Audit ani Tax Clearance Certificate (Tax Chuwar)",
    message:
      "Hello sir,\n\nHamro construction company ko yo year ko statutory audit garna parne vayo. Last time tax clearance certificate (tax chuwar) nikalda dherai jhanjhat vako thiyo IRD office ma. Tyo documents preparation ra voucher haru cross-check garna tapai ko team auna sakcha? Please quote and timeline share gardinus na.",
    isResponded: true,
    status: STATUS.IN_PROGRESS,
    createdAt: new Date("2026-06-10T14:15:22.000Z"),
    updatedAt: new Date("2026-06-14T11:00:00.000Z"),
  },
  {
    _id: "661b1812f1b4c3e8a3333333",
    name: "Deepak Thapa",
    email: "deepak@pokharalodging.com",
    phone: "+977 9801054321", // Ncell Mobile Format
    service: "FINANCIAL_PLANNING",
    subject: "Hotel Expansion Loan and Balance Sheet Auditing",
    message:
      "Greetings dai,\n\nPokhara ma hamro hotel thyo, aile lumbini ma naya branch kholna thaleko bank bhanda agadi balance sheet project garna paryo. Capital structure and working capital cycle herera exact plan banaidinu paryo sasto bank interest rate optimize garna lai. Tapai sanga bhetna kaile milxa?",
    isResponded: true,
    status: STATUS.RESOLVED,
    createdAt: new Date("2026-05-28T16:45:10.000Z"),
    updatedAt: new Date("2026-06-02T15:20:45.000Z"),
  },
  {
    _id: "661b185cf1b4c3e8a4444444",
    name: "Elena Rajbhandari",
    email: "elena@nepal-logistics.com",
    phone: "+977 9841239876",
    service: "ADVISORY",
    subject: "Monthly VAT Return (Filing) ra Fine Lagyo Correction",
    message:
      "Sir ekxin urgent thyo! Hamro software documentation namilera monthly VAT return fill garda problem ayera fine bachaune tension vayo. System ma penalty dekhako xa internal accountant le clear garna sakena. Yaslai kasari claim garne tyo reverse entry ma help chahiyo please look into it.",
    isResponded: false,
    status: STATUS.NEW,
    createdAt: new Date("2026-06-14T08:05:00.000Z"),
    updatedAt: new Date("2026-06-14T08:05:00.000Z"),
  },
];
