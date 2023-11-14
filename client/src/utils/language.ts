import { enUS, ptBR } from "@mui/x-date-pickers/locales";

import { enUS as dateFnsEnUs, pt as dateFnsPt } from "date-fns/locale";

export const muiLanguages = {
  en: {
    packageName: "en-EN",
    library: enUS,
    dateFns: dateFnsEnUs,
  },
  pt: {
    packageName: "pt-PT",
    library: ptBR,
    dateFns: dateFnsPt,
  },
};
