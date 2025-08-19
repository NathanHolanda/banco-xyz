import _ from "lodash";

export default function cleanFormattedMoneyValue(value: string) {
  return _.toNumber(value.replace(/\./g, "").replace(/,/, "."));
}
