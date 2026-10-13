import { jsPDF } from 'jspdf';
import { PERSONAL_INFO, PROJECTS, EXPERIENCE_LIST, EDUCATION, ACHIEVEMENTS } from '../data/portfolioData';

export function generateResumePdf() {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;
  let y = 45;

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      y = 45;
    }
  };

  // Header: Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text(PERSONAL_INFO.name.toUpperCase(), pageWidth / 2, y, { align: 'center' });
  y += 18;

  // Header: Subtitle
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(37, 99, 235); // blue-600
  doc.text('Python Full Stack Developer | Python | JavaScript | AI & Generative AI', pageWidth / 2, y, { align: 'center' });
  y += 15;

  // Header: Contact Info
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // slate-600
  const contactText = `${PERSONAL_INFO.location} | ${PERSONAL_INFO.phone} | ${PERSONAL_INFO.email}`;
  doc.text(contactText, pageWidth / 2, y, { align: 'center' });
  y += 22;

  // Helper for Section Titles
  const addSectionTitle = (title: string) => {
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(title.toUpperCase(), margin, y);
    y += 5;
    doc.setDrawColor(203, 213, 225); // slate-300
    doc.setLineWidth(0.75);
    doc.line(margin, y, margin + contentWidth, y);
    y += 14;
  };

  // 1. PROFESSIONAL SUMMARY
  addSectionTitle('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  const summaryLines = doc.splitTextToSize(PERSONAL_INFO.summary, contentWidth);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 12 + 10;

  // 2. TECHNICAL SKILLS
  addSectionTitle('Technical Skills');
  doc.setFontSize(9);
  const skillsData = [
    { label: 'Languages:', val: 'Python, JavaScript, SQL' },
    { label: 'Frontend:', val: 'HTML5, CSS3, JavaScript, Responsive UI, DOM, Forms' },
    { label: 'Backend:', val: 'Python, Node.js, Express.js, REST APIs' },
    { label: 'Databases:', val: 'MongoDB, SQL (CRUD, queries, joins), Mongoose ODM' },
    { label: 'AI:', val: 'Artificial Intelligence, Generative AI, Prompt Engineering' },
    { label: 'Concepts & Tools:', val: 'Functions, Conditionals, Arrays, Loops, Validation, Debugging, Error Handling; MS Excel; R (basic)' }
  ];

  skillsData.forEach(item => {
    checkPageBreak(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(item.label, margin, y);
    const labelWidth = doc.getTextWidth(item.label) + 5;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    const valLines = doc.splitTextToSize(item.val, contentWidth - labelWidth);
    doc.text(valLines, margin + labelWidth, y);
    y += Math.max(13, valLines.length * 12);
  });
  y += 6;

  // 3. EXPERIENCE
  addSectionTitle('Experience');
  EXPERIENCE_LIST.forEach(exp => {
    checkPageBreak(40);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${exp.role} (${exp.type})`, margin, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(exp.period, margin + contentWidth, y, { align: 'right' });
    y += 14;

    exp.bullets.forEach(bullet => {
      const bulletLines = doc.splitTextToSize(`•  ${bullet}`, contentWidth - 10);
      checkPageBreak(bulletLines.length * 12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
      doc.text(bulletLines, margin + 5, y);
      y += bulletLines.length * 12 + 2;
    });
  });
  y += 6;

  // 4. SELECTED PROJECTS
  addSectionTitle('Selected Projects');
  PROJECTS.slice(0, 4).forEach(proj => {
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text(`${proj.title} | ${proj.role}`, margin, y);
    y += 13;

    proj.bulletPoints.forEach(bullet => {
      const bLines = doc.splitTextToSize(`•  ${bullet}`, contentWidth - 10);
      checkPageBreak(bLines.length * 12);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text(bLines, margin + 5, y);
      y += bLines.length * 12 + 1;
    });
    y += 4;
  });
  y += 4;

  // 5. EDUCATION
  addSectionTitle('Education');
  checkPageBreak(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text(EDUCATION.degree, margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(EDUCATION.status, margin + contentWidth, y, { align: 'right' });
  y += 13;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(EDUCATION.institution, margin, y);
  y += 18;

  // 6. ACHIEVEMENTS & TECHNICAL ACTIVITIES
  addSectionTitle('Achievements & Technical Activities');
  const achBullets = [
    'Participated in inter-collegiate technical and creative events: Digital Tooling, Poster Designing, UI Designing, PPT Presentation, Meme Designing, Hackathons, Debugging, and Problem Solving.',
    'Events hosted by Guru Nanak College (Meenambakkam), SRM College, The New College (Royapettah), Hindustan College (Padur), and New Prince Shri Bhavani College (Medavakkam).',
    'Received certificates for participation and achievement in inter-collegiate technical events.'
  ];
  achBullets.forEach(b => {
    const lines = doc.splitTextToSize(`•  ${b}`, contentWidth - 10);
    checkPageBreak(lines.length * 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text(lines, margin + 5, y);
    y += lines.length * 12 + 2;
  });
  y += 6;

  // 7. STRENGTHS, LANGUAGES & INTERESTS
  addSectionTitle('Strengths, Languages & Interests');
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('Strengths:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(PERSONAL_INFO.strengths.join(', '), margin + 55, y);
  y += 14;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Languages:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  doc.text(`Tamil, English   |   Interests: ${PERSONAL_INFO.interests.join(', ')}`, margin + 60, y);

  // Save the document
  doc.save('Mohamed_Arsath_H_Resume.pdf');
}
