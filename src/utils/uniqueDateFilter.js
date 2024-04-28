export const uniqueDate = data.filter(
  (obj, index, self) =>
    index === self.findIndex(t => t.scrap_issued_date === obj.scrap_issued_date)
);