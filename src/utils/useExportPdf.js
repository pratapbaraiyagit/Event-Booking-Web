import jsPDF from 'jspdf';

export const exportFaqPDF = ({ data }) => {
  const doc = new jsPDF();
  let yOffset = 10;

  data?.FAQ?.forEach(item => {
    const newData = {
      newItem: item?.category,
      fontSize: 12,
    };
    doc.setFontSize(newData?.fontSize);
    doc.text(newData?.newItem, 10, yOffset);
    yOffset += 6;

    item?.FAQ?.forEach(faq => {
      const newDataQ = {
        newItemQ: faq?.question,
        fontSize: 10,
      };
      doc.setFontSize(newDataQ?.fontSize);
      const textX = 10;
      const textY = yOffset;
      const lineHeight = 5;
      doc.text(newDataQ?.newItemQ, textX, textY);
      const lineWidth = doc.getTextWidth(newDataQ?.newItemQ);
      doc.setLineWidth(0.5);
      doc.line(
        textX,
        textY + lineHeight,
        textX + lineWidth,
        textY + lineHeight,
      );
      yOffset += 2 * lineHeight;

      const htmlContent = faq?.answer;
      const dummyElement = document.createElement('div');
      dummyElement.innerHTML = htmlContent;
      const plainText = dummyElement.textContent || dummyElement.innerText;

      const newDataA = {
        newItemA: plainText,
        fontSize: 8,
      };

      const line = doc.splitTextToSize(newDataA?.newItemA, 180);
      doc.text(line, 10, yOffset);
      doc.setFontSize(newDataA?.fontSize);
      yOffset += line?.length * 4;
    });

    yOffset += 10;
    if (yOffset > doc.internal.pageSize.getHeight() - 10) {
      doc.addPage();
      yOffset = 10;
    }
  });

  doc.setProperties({
    title: 'FAQ - ',
  });

  doc.output('dataurlnewwindow', {
    filename: `FAQ`,
    title: 'FAQ',
  });
};
