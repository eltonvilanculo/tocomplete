import { formatDistance, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

export function toHumanDate(date: Date) {
  return formatDistance(date, new Date(), {
    addSuffix: true,
    locale: ptBR,
  });
}
