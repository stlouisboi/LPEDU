import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface Section {
  id: number;
  title: string;
  items: ChecklistItem[];
}

interface ExportData {
  carrierName: string;
  email: string;
  overallScore: string;
  totalProgress: number;
  sections: Section[];
  sectionScores: Array<{
    section: string;
    score: string;
    completedItems: number;
    totalItems: number;
  }>;
}

export const generateGround0PDF = (data: ExportData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(30, 58, 95); // authority-blue
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(198, 146, 42); // signal-gold
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('GROUND 0 EVALUATION', pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('LaunchPath Educational Services', pageWidth / 2, 25, { align: 'center' });
  doc.text('Minimum Structural Standard Assessment', pageWidth / 2, 32, { align: 'center' });
  
  // Carrier Info
  let yPos = 55;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Carrier: ${data.carrierName}`, 20, yPos);
  doc.text(`Email: ${data.email}`, 20, yPos + 7);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, yPos + 14);
  
  // Overall Score Box
  yPos += 30;
  const scoreColor = 
    data.overallScore === 'ready' ? [16, 185, 129] : // emerald
    data.overallScore === 'needs-work' ? [234, 179, 8] : // yellow
    [239, 68, 68]; // red
  
  doc.setFillColor(...scoreColor);
  doc.roundedRect(20, yPos, pageWidth - 40, 30, 3, 3, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const scoreText = 
    data.overallScore === 'ready' ? 'READY FOR ADMISSION' :
    data.overallScore === 'needs-work' ? 'CORRECTIVE ITEMS REQUIRED' :
    'NOT READY - STRUCTURAL DEFICIENCIES';
  doc.text(scoreText, pageWidth / 2, yPos + 12, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text(`Overall Progress: ${data.totalProgress}%`, pageWidth / 2, yPos + 22, { align: 'center' });
  
  // Section Scores Table
  yPos += 45;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('SECTION SCORES', 20, yPos);
  
  yPos += 5;
  
  const tableData = data.sectionScores.map(s => [
    s.section,
    `${s.completedItems}/${s.totalItems}`,
    s.score === 'pass' ? 'PASS' : s.score === 'needs-work' ? 'NEEDS WORK' : 'FAIL'
  ]);
  
  autoTable(doc, {
    startY: yPos,
    head: [['Section', 'Completed', 'Status']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [30, 58, 95],
      textColor: [198, 146, 42],
      fontStyle: 'bold',
      fontSize: 10
    },
    bodyStyles: {
      fontSize: 9
    },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 40, halign: 'center' }
    },
    didParseCell: (data: any) => {
      if (data.section === 'body' && data.column.index === 2) {
        const status = data.cell.raw;
        if (status === 'PASS') {
          data.cell.styles.textColor = [16, 185, 129];
          data.cell.styles.fontStyle = 'bold';
        } else if (status === 'FAIL') {
          data.cell.styles.textColor = [239, 68, 68];
          data.cell.styles.fontStyle = 'bold';
        } else {
          data.cell.styles.textColor = [234, 179, 8];
          data.cell.styles.fontStyle = 'bold';
        }
      }
    }
  });
  
  // Detailed Checklist (new page)
  doc.addPage();
  yPos = 20;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('DETAILED CHECKLIST', 20, yPos);
  
  yPos += 10;
  
  data.sections.forEach((section, index) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Section header
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(30, 58, 95);
    doc.text(`${section.id}. ${section.title}`, 20, yPos);
    yPos += 8;
    
    // Section items
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    section.items.forEach(item => {
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
      
      const checkbox = item.checked ? '☑' : '☐';
      doc.setTextColor(item.checked ? 100 : 0);
      doc.text(checkbox, 25, yPos);
      doc.text(item.text, 32, yPos, { maxWidth: pageWidth - 50 });
      yPos += 6;
    });
    
    yPos += 5;
  });
  
  // Footer on last page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `LaunchPath Ground 0 Evaluation | Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  // Next Steps section on final page
  doc.setPage(pageCount);
  if (yPos > 220) {
    doc.addPage();
    yPos = 20;
  } else {
    yPos += 10;
  }
  
  doc.setFillColor(240, 240, 240);
  doc.rect(15, yPos, pageWidth - 30, 50, 'F');
  
  yPos += 10;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('NEXT STEPS', 20, yPos);
  
  yPos += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  if (data.overallScore === 'ready') {
    doc.text('✓ Your operation meets the minimum structural standard.', 20, yPos);
    yPos += 6;
    doc.text('✓ You may request admission to LaunchPath.', 20, yPos);
    yPos += 6;
    doc.text('✓ Visit launchpathedu.com/pricing to begin the admission process.', 20, yPos);
  } else {
    doc.text('• Review sections marked "NEEDS WORK" or "FAIL" above.', 20, yPos);
    yPos += 6;
    doc.text('• Address corrective items before scaling operations.', 20, yPos);
    yPos += 6;
    doc.text('• Contact LaunchPath for a corrective action plan.', 20, yPos);
    yPos += 6;
    doc.text('• Re-evaluate after corrections are implemented.', 20, yPos);
  }
  
  // Save
  const fileName = `Ground0_${data.carrierName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
