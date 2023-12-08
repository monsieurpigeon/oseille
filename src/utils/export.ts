export function exportCSV(data: any[], headers: Record<string, string>, filename: string): Promise<boolean> {
  const keys = Object.keys(headers);
  const headerValues = Object.values(headers);
  const rows = [
    headerValues,
    ...data.map((item) => {
      return keys.map((key) => {
        return item[key];
      });
    }),
  ];
  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.join(';')).join('\n');
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link);

  link.click();
}
