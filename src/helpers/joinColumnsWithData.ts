export const joinColumnsWithData = (data: Array<Array<any>>, columnNames: string[]) =>
  data.reduce((acc, dataRow) => {
    const entity = dataRow.reduce((acc, columnData, columnIndex) => {
      acc[columnNames[columnIndex]] = columnData;
      return acc;
    }, {});

    acc.push(entity);

    return acc;
  }, []);
