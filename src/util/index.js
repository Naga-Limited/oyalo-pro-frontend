export const ConverToReactSelect = (options = [], value = "", label = "") => {
  return options?.map((_) => ({ value: _?.[value], label: _?.[label], ..._ }));
};

export const stringToBoolean = (stringValue) => {
  switch (stringValue?.toLowerCase()?.trim()) {
    case "true":
    case "yes":
    case "1":
      return true;

    case "false":
    case "no":
    case "0":
    case null:
    case undefined:
      return false;

    default:
      return JSON.parse(stringValue);
  }
};
