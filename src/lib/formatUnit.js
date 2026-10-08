export const getUnitName = (unit) => {
  const units = {
    kg: "কেজি",
    g: "গ্রাম",
    gram: "গ্রাম",
    liter: "লিটার",
    litre: "লিটার",
    l: "লিটার",
    ml: "মিলিলিটার",
    piece: "টি",
    pcs: "টি",
    dozen: "ডজন",
  };

  return units[unit?.toLowerCase()] || unit;
};