import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@mui/material';
import plm_logo from '../../assets/footerLogos/plm_iconlogo.png'; // Replace with your logo path

const PdfGenerator = () => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null); // State to hold Blob URL

    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const plm_logo_width = 25;
        const plm_logo_height = 25;
        const header_X = pageWidth * 0.1;
        const plm_logo_Y = pageHeight - (pageHeight * 0.95);
        doc.addImage(plm_logo, 'PNG', header_X + (header_X * 0.2), plm_logo_Y, plm_logo_width, plm_logo_height); // Center vertically with respect to text
        
        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        const header_plm_tagalog_name = "PAMANTASAN NG LUNGSOD NG MAYNILA";
        const header_plm_tagalog_name_X = (pageWidth - doc.getTextWidth(header_plm_tagalog_name)) / 2;
        doc.text(header_plm_tagalog_name, header_plm_tagalog_name_X, header_X);

        doc.setFont('times', '');
        doc.setFontSize(12);
        const header_plm_english_name = "(University of the City of Manila)";
        const header_plm_english_name_X = header_plm_tagalog_name_X + ((doc.getTextWidth(header_plm_tagalog_name) - doc.getTextWidth(header_plm_english_name)) / 2);
        doc.text(header_plm_english_name, header_plm_english_name_X, header_X + 6);

        const header_plm_location = "Intramuros, Manila"
        const header_plm_location_X = header_plm_english_name_X + ((doc.getTextWidth(header_plm_english_name) - doc.getTextWidth(header_plm_location)) / 2);
        doc.text(header_plm_location, header_plm_location_X, header_X + 12);

        doc.setFont('times', 'bold');
        doc.setFontSize(14);
        const form_title = "SCHOLARSHIP APPLICATION FORM";
        const form_title_X = (pageWidth - doc.getTextWidth(form_title)) / 2;
        const form_title_Y = plm_logo_height + plm_logo_Y + (pageHeight * 0.03);
        doc.text(form_title, form_title_X, form_title_Y);

        doc.setFont('times', '');
        doc.setFontSize(10);
        const guideline = "Guidelines in filling out the form";
        const guideline_X = header_X - (pageWidth * 0.01);
        const guideline_Y = form_title_Y + (pageHeight * 0.03);
        doc.text(guideline, guideline_X, guideline_Y);
        doc.text("1. Write in CAPITAL LETTERS", guideline_X + (pageWidth * 0.03), guideline_Y + (pageHeight * 0.015));
        doc.text("2. Strictly no erasures", guideline_X + (pageWidth * 0.03), guideline_Y + (pageHeight * 0.03));
        doc.text("3. Do not abbreviate", guideline_X + (pageWidth * 0.03), guideline_Y + (pageHeight * 0.045));
        doc.text("4. Tick appropriate boxes", guideline_X + (pageWidth * 0.03), guideline_Y + (pageHeight * 0.06));
        doc.text("5. Write N/A if Not Applicable", guideline_X + (pageWidth * 0.03), guideline_Y + (pageHeight * 0.075));
        doc.text("Requirements to be submitted:", guideline_X, guideline_Y + (pageHeight * 0.09));
        doc.text("1. Grades from 1st year (c/o OSDS)", guideline_X + (pageWidth * 0.03), guideline_Y + (pageHeight * 0.105));
        doc.text("2. Parent(s) ITR", guideline_X + (pageWidth * 0.03), guideline_Y + (pageHeight * 0.12));
        doc.text("3. Certificate of Indigence", guideline_X + (pageWidth * 0.03), guideline_Y + (pageHeight * 0.135));
        doc.text("4. 2 pcs 2x2 picture", guideline_X + (pageWidth * 0.03), guideline_Y + (pageHeight * 0.15));
        doc.text("**Accomplished Scholarship Recruitment", guideline_X, guideline_Y + (pageHeight * 0.165));
        doc.text("Form and requirements must be submitted to", guideline_X, guideline_Y + (pageHeight * 0.18));
        doc.text("the Office of the Dean.", guideline_X, guideline_Y + (pageHeight * 0.195));

        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        doc.text("(For Staff use only)", guideline_X + doc.getTextWidth(guideline) + (pageWidth * 0.05), guideline_Y);
        doc.text("SAF No.: ", guideline_X + doc.getTextWidth(guideline) + (pageWidth * 0.05), guideline_Y + ((pageHeight * 0.195) / 6));
        const line1_x1 = guideline_X + doc.getTextWidth(guideline) + (pageWidth * 0.05);
        const line1_y1 = guideline_Y;
        const line1_x2 = guideline_X + doc.getTextWidth(guideline) + (pageWidth * 0.25) + doc.getTextWidth("SAF No.: ");
        const line1_y2 = guideline_Y;
        doc.line(line1_x1 + doc.getTextWidth("SAF No.: "), line1_y1 + ((pageHeight * 0.195) / 6), line1_x2, line1_y2 + ((pageHeight * 0.195) / 6));
        doc.setFontSize(10);
        doc.text("College: ", guideline_X + doc.getTextWidth(guideline) + (pageWidth * 0.0975), guideline_Y + (((pageHeight * 0.195) / 6)* 2));
        doc.line(line1_x1 + doc.getTextWidth("College: "), line1_y1 + (((pageHeight * 0.195) / 6) * 2), line1_x2, line1_y2 + (((pageHeight * 0.195) / 6) * 2));
        doc.text("Remarks: ", guideline_X + doc.getTextWidth(guideline) + (pageWidth * 0.0975), guideline_Y + (((pageHeight * 0.195) / 6)* 3));
        doc.line(line1_x1 + doc.getTextWidth("Remarks: "), line1_y1 + (((pageHeight * 0.195) / 6) * 3), line1_x2, line1_y2 + (((pageHeight * 0.195) / 6) * 3));
        doc.line(line1_x1, line1_y1 + (((pageHeight * 0.195) / 6) * 4), line1_x2, line1_y2 + (((pageHeight * 0.195) / 6) * 4));
        doc.line(line1_x1, line1_y1 + (((pageHeight * 0.195) / 6) * 5), line1_x2, line1_y2 + (((pageHeight * 0.195) / 6) * 5));
        doc.line(line1_x1, line1_y1 + (((pageHeight * 0.195) / 6) * 6), line1_x2, line1_y2 + (((pageHeight * 0.195) / 6) * 6));

        doc.rect(line1_x2 + (pageWidth * 0.03), (guideline_Y * 0.96), 35, 45, 'S');
        doc.setFont('times', 'italic');
        doc.setFontSize(12);
        doc.text("Attach photo here", line1_x2 + (pageWidth * 0.03) + ((35 - doc.getTextWidth("Attach photo here")) / 2), guideline_Y + (45 * 0.35));
        doc.text("(3.5 cm x 4.5 cm)", line1_x2 + (pageWidth * 0.03) + ((35 - doc.getTextWidth("(3.5 cm x 4.5 cm)")) / 2), guideline_Y + (45 * 0.5));

        const personal_info_table_column_X = guideline_X * 0.9;
        const personal_info_table_column = line1_x2 - personal_info_table_column_X + (pageWidth * 0.03) + 35;
        doc.setFillColor(0, 0, 0);

        doc.rect(personal_info_table_column_X, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01), personal_info_table_column, pageHeight * 0.012, 'FD');
        doc.setFont('times', 'bold');
        doc.setTextColor(255, 255, 255);

        doc.text("Personal Information", personal_info_table_column_X + (personal_info_table_column - doc.getTextWidth("Personal Information")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012)));
        for(let i = 0; i < 8; i++) {
            doc.rect(personal_info_table_column_X, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * (i + 1)), personal_info_table_column, pageHeight * 0.012, 'S')
        }

        doc.setTextColor(0, 0, 0);
        doc.setFont('times', 'bold');
        doc.text("Name: ", personal_info_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 2));
        doc.setFontSize(10);
        doc.setFont('times', 'italic');
        doc.text("Surname", personal_info_table_column_X + (pageWidth * 0.01) + 15, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 3));
        doc.text("Given Name", personal_info_table_column_X + (pageWidth * 0.01) + 65, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 3));
        doc.text("Middle Name", personal_info_table_column_X + (pageWidth * 0.01) + 125, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 3));
        doc.setFontSize(12);
        doc.setFont('times', 'bold');
        doc.text("Current Home Address: ", personal_info_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 4));
        doc.setFontSize(10);
        doc.setFont('times', 'italic');
        doc.text("House/Block/Lot No.", personal_info_table_column_X + (pageWidth * 0.01) + 45, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 5));
        doc.text("Street", personal_info_table_column_X + (pageWidth * 0.01) + 100, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 5));
        doc.text("Subdivision/Village", personal_info_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 7));
        doc.text("Barangay", personal_info_table_column_X + (pageWidth * 0.01) + 50, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 7));
        doc.text("City", personal_info_table_column_X + (pageWidth * 0.01) + 90, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 7));
        doc.text("Province", personal_info_table_column_X + (pageWidth * 0.01) + 120, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 7));
        doc.setFontSize(12);
        doc.setFont('times', 'bold');
        doc.text("Age: ", personal_info_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 8));
        doc.text("Birthdate: ", personal_info_table_column_X + (pageWidth * 0.01) + 50, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 8));
        doc.text("Religion: ", personal_info_table_column_X + (pageWidth * 0.01) + 122, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 8));
        doc.text("Mobile: ", personal_info_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 9));
        doc.text("Landline: ", personal_info_table_column_X + (pageWidth * 0.01) + 55, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 9));
        doc.text("e-mail: ", personal_info_table_column_X + (pageWidth * 0.01) + 110, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 9));

        const scholastic_info_table_column_X = guideline_X * 0.9;
        const scholastic_info_table_column = line1_x2 - personal_info_table_column_X + (pageWidth * 0.03) + 35;
        doc.setFillColor(0, 0, 0);
        doc.rect(scholastic_info_table_column_X, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 9), scholastic_info_table_column, pageHeight * 0.012, 'FD');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(12);
        doc.text("Scholastic Information", scholastic_info_table_column_X + (scholastic_info_table_column - doc.getTextWidth("Scholastic Information")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 10));
        for(let i = 0; i < 4; i++) {
            doc.rect(personal_info_table_column_X, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * (i + 10)), scholastic_info_table_column, pageHeight * 0.012, 'S')
        }

        doc.setFont('times', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text("Course: ", scholastic_info_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 11));
        doc.text("Major: ", scholastic_info_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12));
        doc.text("Level: ", scholastic_info_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 13));
        doc.text("1st", scholastic_info_table_column_X + (pageWidth * 0.12), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 13));
        doc.text("2nd", scholastic_info_table_column_X + (pageWidth * 0.24), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 13));
        doc.text("3rd", scholastic_info_table_column_X + (pageWidth * 0.36), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 13));
        doc.text("4th", scholastic_info_table_column_X + (pageWidth * 0.48), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 13));
        doc.text("5th", scholastic_info_table_column_X + (pageWidth * 0.6), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 13));
        doc.rect(personal_info_table_column_X + (pageWidth * 0.15), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12), (pageWidth * 0.03), pageHeight * 0.012, 'S');
        doc.rect(personal_info_table_column_X + (pageWidth * 0.15) + (pageWidth * 0.127), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12), (pageWidth * 0.03), pageHeight * 0.012, 'S');
        doc.rect(personal_info_table_column_X + (pageWidth * 0.15) + (pageWidth * 0.245), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12), (pageWidth * 0.03), pageHeight * 0.012, 'S');
        doc.rect(personal_info_table_column_X + (pageWidth * 0.15) + (pageWidth * 0.363), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12), (pageWidth * 0.03), pageHeight * 0.012, 'S');
        doc.rect(personal_info_table_column_X + (pageWidth * 0.15) + (pageWidth * 0.481), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12), (pageWidth * 0.03), pageHeight * 0.012, 'S');
        doc.text("Current GWA: ", scholastic_info_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 14));

        const family_bg_table_column_X = guideline_X * 0.9;
        const family_bg_table_column = line1_x2 - personal_info_table_column_X + (pageWidth * 0.03) + 35;
        doc.setFont('times', 'bold');
        doc.setFillColor(0, 0, 0);
        doc.rect(family_bg_table_column_X, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 14), family_bg_table_column, pageHeight * 0.012, 'FD');
        doc.setTextColor(255, 255, 255);
        doc.text("Family Background", scholastic_info_table_column_X + (scholastic_info_table_column - doc.getTextWidth("Family Background")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 15));
        for(let i = 0; i < 13; i++) {
            doc.rect(personal_info_table_column_X, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * (i + 15)), family_bg_table_column, pageHeight * 0.012, 'S')
        }

        doc.setFont('times', 'bold');
        doc.setTextColor(0, 0, 0);
        doc.text("Father's Name: ", family_bg_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 16));
        doc.setFont('times', 'italic');
        doc.text("Surname", family_bg_table_column_X + (pageWidth * 0.01) + 30, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 17));
        doc.text("Given Name", family_bg_table_column_X + (pageWidth * 0.01) + 80, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 17));
        doc.text("Middle Name", family_bg_table_column_X + (pageWidth * 0.01) + 140, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 17));
        doc.setFont('times', 'bold');
        doc.text("Occupation: ", family_bg_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 18));
        doc.text("Age: ", family_bg_table_column_X + (pageWidth * 0.01) + 115, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 18));
        doc.text("Company: ", family_bg_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 19));
        doc.text("Monthly Income: Php ", family_bg_table_column_X + (pageWidth * 0.01) + 70, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 19));
        doc.text("Mother's Name: ", family_bg_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 20));
        doc.setFont('times', 'italic');
        doc.text("Surname", family_bg_table_column_X + (pageWidth * 0.01) + 30, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 21));
        doc.text("Given Name", family_bg_table_column_X + (pageWidth * 0.01) + 80, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 21));
        doc.text("Middle Name", family_bg_table_column_X + (pageWidth * 0.01) + 140, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 21));
        doc.setFont('times', 'bold');
        doc.text("Occupation: ", family_bg_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 22));
        doc.text("Age: ", family_bg_table_column_X + (pageWidth * 0.01) + 115, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 22));
        doc.text("Company: ", family_bg_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 23));
        doc.text("Monthly Income: Php ", family_bg_table_column_X + (pageWidth * 0.01) + 70, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 23));
        doc.text("Parent's Address & Contact Number", family_bg_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 24));
        doc.setFontSize(10);
        doc.setFont('times', 'italic');
        doc.text("House/Block/Lot No.", family_bg_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 26));
        doc.text("Street", family_bg_table_column_X + (pageWidth * 0.01) + 60, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 26));
        doc.text("Subdivision/Village", family_bg_table_column_X + (pageWidth * 0.01) + 90, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 26));
        doc.text("Barangay", family_bg_table_column_X + (pageWidth * 0.01) + 135, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 26));
        doc.text("City", family_bg_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28));
        doc.text("Province", family_bg_table_column_X + (pageWidth * 0.01) + 40, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28));
        doc.text("Mobile Number", family_bg_table_column_X + (pageWidth * 0.01) + 80, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28));
        doc.text("Landline", family_bg_table_column_X + (pageWidth * 0.01) + 130, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28));

        const sibling_table_column_X = guideline_X * 0.9;
        const sibling_table_width = line1_x2 - personal_info_table_column_X + (pageWidth * 0.03) + 35;
        const sibling_table_column_sizes = [sibling_table_width * 0.25, sibling_table_width * 0.06, sibling_table_width * 0.09, sibling_table_width * 0.20, sibling_table_width * 0.3, sibling_table_width * 0.10];
        let temp_sibling_table_column_name_X = sibling_table_column_X;
        for(let i = 0; i < 6; i++) {
            doc.rect(temp_sibling_table_column_name_X, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28), sibling_table_column_sizes[i], pageHeight * 0.06);
            temp_sibling_table_column_name_X += sibling_table_column_sizes[i];
        }
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text("Name", sibling_table_column_X +(sibling_table_column_sizes[0] - doc.getTextWidth("Name")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28) + (pageHeight * 0.06) / 2);
        doc.text("Age", sibling_table_column_X + sibling_table_column_sizes[0] + (sibling_table_column_sizes[1] - doc.getTextWidth("Age")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28) + (pageHeight * 0.06) / 2);
        doc.text("Studying", sibling_table_column_X + sibling_table_column_sizes[0] + sibling_table_column_sizes[1] + (sibling_table_column_sizes[2] - doc.getTextWidth("Studying")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28) + (pageHeight * 0.06) / 4);
        doc.text("(Y/N)", sibling_table_column_X + sibling_table_column_sizes[0] + sibling_table_column_sizes[1] + (sibling_table_column_sizes[2] - doc.getTextWidth("(Y/N)")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 29) + (pageHeight * 0.06) / 2);
        doc.text("Highest", sibling_table_column_X + sibling_table_column_sizes[0] + sibling_table_column_sizes[1] + sibling_table_column_sizes[2] + (sibling_table_column_sizes[3] - doc.getTextWidth("Highest")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28) + (pageHeight * 0.06) / 4);
        doc.text("Degree/Year Level", sibling_table_column_X + sibling_table_column_sizes[0] + sibling_table_column_sizes[1] + sibling_table_column_sizes[2] + (sibling_table_column_sizes[3] - doc.getTextWidth("Degree/Year Level")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28) + (pageHeight * 0.06) / 2);
        doc.text("Reached", sibling_table_column_X + sibling_table_column_sizes[0] + sibling_table_column_sizes[1] + sibling_table_column_sizes[2] + (sibling_table_column_sizes[3] - doc.getTextWidth("Reached")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28) + ((pageHeight * 0.06) / 4) + (pageHeight * 0.06) / 2);
        doc.text("School", sibling_table_column_X + sibling_table_column_sizes[0] + sibling_table_column_sizes[1] + sibling_table_column_sizes[2] + sibling_table_column_sizes[3] + (sibling_table_column_sizes[4] - doc.getTextWidth("School")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28) + (pageHeight * 0.06) / 4);
        doc.text("Attended", sibling_table_column_X + sibling_table_column_sizes[0] + sibling_table_column_sizes[1] + sibling_table_column_sizes[2] + sibling_table_column_sizes[3] + (sibling_table_column_sizes[4] - doc.getTextWidth("Attended")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28) + (pageHeight * 0.06) / 2);
        doc.text("Occupation", sibling_table_column_X + sibling_table_column_sizes[0] + sibling_table_column_sizes[1] + sibling_table_column_sizes[2] + sibling_table_column_sizes[3] + sibling_table_column_sizes[4] + (sibling_table_column_sizes[5] - doc.getTextWidth("Occupation")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28) + (pageHeight * 0.06) / 4);
        doc.text("/Monthly", sibling_table_column_X + sibling_table_column_sizes[0] + sibling_table_column_sizes[1] + sibling_table_column_sizes[2] + sibling_table_column_sizes[3] + sibling_table_column_sizes[4] + (sibling_table_column_sizes[5] - doc.getTextWidth("/Monthly")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28) + (pageHeight * 0.06) / 2);
        doc.text("Income", sibling_table_column_X + sibling_table_column_sizes[0] + sibling_table_column_sizes[1] + sibling_table_column_sizes[2] + sibling_table_column_sizes[3] + sibling_table_column_sizes[4] + (sibling_table_column_sizes[5] - doc.getTextWidth("Income")) / 2, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 28) + ((pageHeight * 0.06) / 4) + (pageHeight * 0.06) / 2);
        let temp_sibling_table_column_child_Y = line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.06) + ((pageHeight * 0.012) * 28)
        for(let i = 0; i < 5; i++) {
            let temp_sibling_table_column_child_X = sibling_table_column_X;
            for(let j = 0; j < 6; j++) {
                doc.rect(temp_sibling_table_column_child_X, temp_sibling_table_column_child_Y, sibling_table_column_sizes[j], pageHeight * 0.01);
                temp_sibling_table_column_child_X += sibling_table_column_sizes[j];
            }
            temp_sibling_table_column_child_Y += (pageHeight * 0.01);
        }

        doc.setFont('times', 'bold');
        doc.setFontSize(12);
        doc.text("I hereby certify that the information above are true and correct.", guideline_X, temp_sibling_table_column_child_Y + (pageHeight * 0.025));
        doc.text("Applicant's signature over complete name: ", guideline_X, temp_sibling_table_column_child_Y + (pageHeight * 0.05));
        doc.line(guideline_X + doc.getTextWidth("Applicant's signature over complete name: "), temp_sibling_table_column_child_Y + (pageHeight * 0.05), (guideline_X * 0.9) + sibling_table_width, temp_sibling_table_column_child_Y + (pageHeight * 0.05))
        doc.text("Date Signed: ", guideline_X, temp_sibling_table_column_child_Y + (pageHeight * 0.065));
        doc.line(guideline_X + doc.getTextWidth("Date Signed: "), temp_sibling_table_column_child_Y + (pageHeight * 0.065), (guideline_X) + doc.getTextWidth("Applicant's signature over complete name: "), temp_sibling_table_column_child_Y + (pageHeight * 0.065))


        //------------------------------------- INPUTS -------------------------------------//
        // Student
        doc.addImage(plm_logo, 'PNG', line1_x2 + (pageWidth * 0.03), (guideline_Y * 0.96), 35, 45) // Insert student profile here, must be in base64 format
        const stud_surname = 'Hitler';
        const stud_given_name = 'Adolf';
        const stud_middle_name = 'Polzi';
        const stud_house_block_lotno = '69-B';
        const stud_street = 'Chernobyl';
        const stud_subd_village = 'Stalingrad';
        const stud_barangay = '1945';
        const stud_city = 'Berlin';
        const stud_province = 'Hesse';
        const stud_age = 56;
        const stud_birthdate = 'April 20, 1889';
        const stud_religion = 'Atheist';
        const stud_mobile = '(+49) 163 555 1584';
        const stud_landline = '(+49) 163 555 1584';
        const stud_email = 'adolfhitler1945@gmail.com'

        // Scholastic
        const school_course = 'Bachelor of Science in Computer Studies';
        const school_major = 'Computer Science';
        let school_level = '4th';
        const school_current_gwa = '1.4000';
        const school_status = 'Non-Paying';
        
        // Family
        const father_surname = 'Hitler';
        const father_given_name = 'Alois';
        const father_middle_name = 'N/A';
        const father_occupation = 'Landlord';
        const father_age = 65;
        const father_company = 'N/A';
        const father_monthly_income = 40000;
        const mother_surname = 'Polzi';
        const mother_given_name = 'Klara';
        const mother_middle_name = 'N/A';
        const mother_occupation = 'Housewife';
        const mother_age = 45;
        const mother_company = 'N/A';
        const mother_monthly_income = 0;
        const parents_house_block_lotno = '69-B';
        const parents_street = 'Chernobyl';
        const parents_subd_village = 'Stalingrad';
        const parents_barangay = '1945';
        const parents_city = 'Berlin';
        const parents_province = 'Hesse';
        const parents_mobile = '(+49) 163 555 1584';
        const parents_landline = '(+49) 163 555 1584';
        const siblings = [
            ['Paula Hitler', '40', 'N', 'College Undergraduate', 'Humboldt University of Berlin', 20000],
            ['Angela Hitler', '30', 'N', 'Highschool Graduate', 'Humboldt University of Berlin', 30000],
            ['William Patrick Hitler', '32', 'N', 'College Undergraduate', 'Humboldt University of Berlin', 25000],
            ['Heinz Hitler', '35', 'N', 'Graduate School', 'Humboldt University of Berlin', 40000],
        ];
        
        doc.setFont('times', '');
        doc.setFontSize(10);
        doc.text(`${stud_surname}`, personal_info_table_column_X + (pageWidth * 0.01) + 15, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 2));
        doc.text(`${stud_given_name}`, personal_info_table_column_X + (pageWidth * 0.01) + 65, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 2));
        doc.text(`${stud_middle_name}`, personal_info_table_column_X + (pageWidth * 0.01) + 125, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 2));
        doc.text(`${stud_house_block_lotno}`, personal_info_table_column_X + (pageWidth * 0.01) + 45, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 4));
        doc.text(`${stud_street}`, personal_info_table_column_X + (pageWidth * 0.01) + 100, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 4));
        doc.text(`${stud_subd_village}`, personal_info_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 6));
        doc.text(`${stud_barangay}`, personal_info_table_column_X + (pageWidth * 0.01) + 50, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 6));
        doc.text(`${stud_city}`, personal_info_table_column_X + (pageWidth * 0.01) + 90, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 6));
        doc.text(`${stud_province}`, personal_info_table_column_X + (pageWidth * 0.01) + 120, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 6));
        doc.text(`${stud_age}`, personal_info_table_column_X + (pageWidth * 0.01) + 3 + doc.getTextWidth("Age: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 8));
        doc.text(`${stud_birthdate}`, personal_info_table_column_X + (pageWidth * 0.01) + 53 + doc.getTextWidth("Birthdate: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 8));
        doc.text(`${stud_religion}`, personal_info_table_column_X + (pageWidth * 0.01) + 125 + doc.getTextWidth("Religion: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 8));
        doc.text(`${stud_mobile}`, personal_info_table_column_X + (pageWidth * 0.01) + 3 + doc.getTextWidth("Mobile: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 9));
        doc.text(`${stud_landline}`, personal_info_table_column_X + (pageWidth * 0.01) + 58 + doc.getTextWidth("Landline: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 9));
        doc.text(`${stud_email}`, personal_info_table_column_X + (pageWidth * 0.01) + 113 + doc.getTextWidth("e-mail: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 9));
        doc.text(`${school_course}`, scholastic_info_table_column_X + (pageWidth * 0.01) + 3 + doc.getTextWidth("Course: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 11));
        doc.text(`${school_major}`, scholastic_info_table_column_X + (pageWidth * 0.01) + 3 + doc.getTextWidth("Major: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12));
        if(school_level === '1st') {
            doc.rect(personal_info_table_column_X + (pageWidth * 0.15), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12), (pageWidth * 0.03), pageHeight * 0.012, 'FD');
        }
        else if(school_level === '2nd') {
            doc.rect(personal_info_table_column_X + (pageWidth * 0.15) + (pageWidth * 0.127), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12), (pageWidth * 0.03), pageHeight * 0.012, 'FD');
        }
        else if(school_level === '3rd') {
            doc.rect(personal_info_table_column_X + (pageWidth * 0.15) + (pageWidth * 0.245), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12), (pageWidth * 0.03), pageHeight * 0.012, 'FD');
        }
        else if(school_level === '4th') {
            doc.rect(personal_info_table_column_X + (pageWidth * 0.15) + (pageWidth * 0.363), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12), (pageWidth * 0.03), pageHeight * 0.012, 'FD');
        }
        else {
            doc.rect(personal_info_table_column_X + (pageWidth * 0.15) + (pageWidth * 0.481), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 12), (pageWidth * 0.03), pageHeight * 0.012, 'FD');
        }
        // doc.text(`${school_level}`, scholastic_info_table_column_X + (pageWidth * 0.01) + 3 + doc.getTextWidth("Level: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 13));
        doc.text(`${school_current_gwa}`, scholastic_info_table_column_X + (pageWidth * 0.01) + 5 + doc.getTextWidth("Current GWA: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 14));
        doc.text(`${father_surname}`, family_bg_table_column_X + (pageWidth * 0.01) + 30, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 16));
        doc.text(`${father_given_name}`, family_bg_table_column_X + (pageWidth * 0.01) + 80, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 16));
        doc.text(`${father_middle_name}`, family_bg_table_column_X + (pageWidth * 0.01) + 140, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 16));
        doc.text(`${father_occupation}`, family_bg_table_column_X + (pageWidth * 0.01) + 3 + doc.getTextWidth("Occupation: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 18));
        doc.text(`${father_age}`, family_bg_table_column_X + (pageWidth * 0.01) + 118 + doc.getTextWidth("Age: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 18));
        doc.text(`${father_company}`, family_bg_table_column_X + (pageWidth * 0.01) + 3 + doc.getTextWidth("Company: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 19));
        doc.text(`${father_monthly_income}`, family_bg_table_column_X + (pageWidth * 0.01) + 76 + doc.getTextWidth("Monthly Income: Php "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 19));
        doc.text(`${mother_surname}`, family_bg_table_column_X + (pageWidth * 0.01) + 30, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 20));
        doc.text(`${mother_given_name}`, family_bg_table_column_X + (pageWidth * 0.01) + 80, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 20));
        doc.text(`${mother_middle_name}`, family_bg_table_column_X + (pageWidth * 0.01) + 140, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 20));
        doc.text(`${mother_occupation}`, family_bg_table_column_X + (pageWidth * 0.01) + 3 + doc.getTextWidth("Occupation: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 22));
        doc.text(`${mother_age}`, family_bg_table_column_X + (pageWidth * 0.01) + 118 + doc.getTextWidth("Age: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 22));
        doc.text(`${mother_company}`, family_bg_table_column_X + (pageWidth * 0.01) + 3 + doc.getTextWidth("Company: "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 23));
        doc.text(`${mother_monthly_income}`, family_bg_table_column_X + (pageWidth * 0.01) + 76 + doc.getTextWidth("Monthly Income: Php "), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 23));
        doc.text(`${parents_house_block_lotno}`, family_bg_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 25));
        doc.text(`${parents_street}`, family_bg_table_column_X + (pageWidth * 0.01) + 60, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 25));
        doc.text(`${parents_subd_village}`, family_bg_table_column_X + (pageWidth * 0.01) + 90, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 25));
        doc.text(`${parents_barangay}`, family_bg_table_column_X + (pageWidth * 0.01) + 135, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 25));
        doc.text(`${parents_city}`, family_bg_table_column_X + (pageWidth * 0.01), line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 27));
        doc.text(`${parents_province}`, family_bg_table_column_X + (pageWidth * 0.01) + 40, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 27));
        doc.text(`${parents_mobile}`, family_bg_table_column_X + (pageWidth * 0.01) + 80, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 27));
        doc.text(`${parents_landline}`, family_bg_table_column_X + (pageWidth * 0.01) + 130, line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.01) + ((pageHeight * 0.012) * 27));
        let sibling_element_Y = line1_y1 + (((pageHeight * 0.195) / 6) * 6) + (pageHeight * 0.06) + ((pageHeight * 0.012) * 28) + (pageHeight * 0.01);
        for(let i = 0; i < siblings.length; i++) {
            let sibling_element_X = sibling_table_column_X;
            for(let j = 0; j < 6; j++) {
                doc.text(`${siblings[i][j]}`, sibling_element_X + ((sibling_table_column_sizes[j] - doc.getTextWidth(`${siblings[i][j]}`)) / 2), sibling_element_Y);
                sibling_element_X += sibling_table_column_sizes[j];
            }
            sibling_element_Y += (pageHeight * 0.01);
        }

        // Create a Blob from the PDF and generate a URL
        // const pdfBlob = doc.output('blob');
        // const url = URL.createObjectURL(pdfBlob);
        // setPdfUrl(url); // Set Blob URL to state

        doc.save('generated.pdf')
    };

    return (
        <div style={{ padding: '70px' }}>
            <Button variant="contained" color="primary" onClick={generatePDF}>
                Generate PDF
            </Button>

            {/* Display the PDF in an iframe if pdfUrl is set */}
            {pdfUrl && (
                <iframe
                    title="PDF Preview"
                    src={pdfUrl}
                    width="515px"
                    height="618px"
                    style={{ border: 'none', marginTop: '20px' }}
                />
            )}
        </div>
    );
};

export default PdfGenerator;