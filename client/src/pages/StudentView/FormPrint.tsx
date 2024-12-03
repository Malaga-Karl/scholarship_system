import React, { useRef, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PrintableForm = ({ formData }: { formData: any }) => {
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.action === "downloadPDF") {
                handleExportPDF();
            }
        };

        // Listen for messages from the parent
        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    const handleExportPDF = async () => {
        if (formRef.current) {
            const element = formRef.current;
            const canvas = await html2canvas(element, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            let yPosition = 0;

            // Handle multi-page if content is large
            if (pdfHeight > pdf.internal.pageSize.getHeight()) {
                const pageHeight = pdf.internal.pageSize.getHeight();
                while (yPosition < pdfHeight) {
                    pdf.addImage(imgData, "PNG", 0, -yPosition, pdfWidth, pdfHeight);
                    yPosition += pageHeight;
                    if (yPosition < pdfHeight) pdf.addPage();
                }
            } else {
                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            }

            pdf.save("Scholarship_Application_Form.pdf");
        }
    };

    return (
        <Box>
            <Box ref={formRef} sx={{ padding: 4, backgroundColor: "#fff" }}>
                <Typography variant="h4" textAlign="center" mb={4} sx={{ fontWeight: "bold" }}>
                    Scholarship Application Form
                </Typography>

                {/* Personal Information */}
                <Typography variant="h5" sx={{ backgroundColor: "black", color: "white", padding: 2, mb: 2 }}>
                    Personal Information
                </Typography>
                <Box mb={4}>
                    <Typography><strong>Full Name:</strong> {`${formData.surname || "N/A"}, ${formData.givenName || "N/A"} ${formData.middleName || "N/A"}`}</Typography>
                    <Typography><strong>Address:</strong> {`${formData.houseNo || "N/A"} ${formData.street || "N/A"}, ${formData.subdivision || "N/A"}, ${formData.barangay || "N/A"}, ${formData.city || "N/A"}, ${formData.province || "N/A"}`}</Typography>
                    <Typography><strong>Age:</strong> {formData.age || "N/A"}</Typography>
                    <Typography><strong>Birthdate:</strong> {formData.birthdate || "N/A"}</Typography>
                    <Typography><strong>Religion:</strong> {formData.religion || "N/A"}</Typography>
                    <Typography><strong>Mobile:</strong> {formData.mobileNumber || "N/A"}</Typography>
                    <Typography><strong>Landline:</strong> {formData.landline || "N/A"}</Typography>
                    <Typography><strong>Email:</strong> {formData.email || "N/A"}</Typography>
                </Box>

                {/* Scholastic Information */}
                <Typography variant="h5" sx={{ backgroundColor: "black", color: "white", padding: 2, mb: 2 }}>
                    Scholastic Information
                </Typography>
                <Box mb={4}>
                    <Typography><strong>Course:</strong> {formData.course || "N/A"}</Typography>
                    <Typography><strong>Major:</strong> {formData.major || "N/A"}</Typography>
                    <Typography><strong>Current GWA:</strong> {formData.gwa || "N/A"}</Typography>
                    <Typography><strong>Level:</strong> {formData.level || "N/A"}</Typography>
                    <Typography><strong>Status:</strong> {formData.status || "N/A"}</Typography>
                </Box>

                {/* Parents' Information */}
                <Typography variant="h5" sx={{ backgroundColor: "black", color: "white", padding: 2, mb: 2 }}>
                    Parents' Information
                </Typography>
                <Box mb={4}>
                    <Typography variant="h6">Father:</Typography>
                    <Typography><strong>Name:</strong> {`${formData.fatherGivenName || "N/A"} ${formData.fatherMiddleName || "N/A"} ${formData.fatherSurname || "N/A"}`}</Typography>
                    <Typography><strong>Age:</strong> {formData.fatherAge || "N/A"}</Typography>
                    <Typography><strong>Occupation:</strong> {formData.fatherOccupation || "N/A"}</Typography>
                    <Typography><strong>Company:</strong> {formData.fatherCompany || "N/A"}</Typography>
                    <Typography><strong>Monthly Income:</strong> {formData.fatherIncome || "N/A"}</Typography>

                    <Typography variant="h6" mt={4}>Mother:</Typography>
                    <Typography><strong>Name:</strong> {`${formData.motherGivenName || "N/A"} ${formData.motherMiddleName || "N/A"} ${formData.motherSurname || "N/A"}`}</Typography>
                    <Typography><strong>Age:</strong> {formData.motherAge || "N/A"}</Typography>
                    <Typography><strong>Occupation:</strong> {formData.motherOccupation || "N/A"}</Typography>
                    <Typography><strong>Company:</strong> {formData.motherCompany || "N/A"}</Typography>
                    <Typography><strong>Monthly Income:</strong> {formData.motherIncome || "N/A"}</Typography>
                </Box>

                {/* Parent's Address */}
                <Typography variant="h5" sx={{ backgroundColor: "black", color: "white", padding: 2, mb: 2 }}>
                    Parents' Address
                </Typography>
                <Box mb={4}>
                    <Typography><strong>Address:</strong> {`${formData.parentAddress.houseNop || "N/A"} ${formData.parentAddress.streetp || "N/A"}, ${formData.parentAddress.subdivisionp || "N/A"}, ${formData.parentAddress.barangayp || "N/A"}, ${formData.parentAddress.cityp || "N/A"}, ${formData.parentAddress.provincep || "N/A"}`}</Typography>
                    <Typography><strong>Mobile:</strong> {formData.parentAddress.mobilep || "N/A"}</Typography>
                    <Typography><strong>Landline:</strong> {formData.parentAddress.landlinep || "N/A"}</Typography>
                </Box>

                {/* Siblings */}
                <Typography variant="h5" sx={{ backgroundColor: "black", color: "white", padding: 2, mb: 2 }}>
                    Siblings
                </Typography>
                {formData.siblings.length > 0 ? (
                    formData.siblings.map((sibling: any, index: number) => (
                        <Box key={index} mb={4}>
                            <Typography><strong>Name:</strong> {sibling.name || "N/A"}</Typography>
                            <Typography><strong>Age:</strong> {sibling.age || "N/A"}</Typography>
                            <Typography><strong>Studying:</strong> {sibling.studying || "N/A"}</Typography>
                            <Typography><strong>Highest Degree/Year Level:</strong> {sibling.highestDegree || "N/A"}</Typography>
                            <Typography><strong>School:</strong> {sibling.school || "N/A"}</Typography>
                            <Typography><strong>Occupation:</strong> {sibling.occupation || "N/A"}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography>No siblings listed.</Typography>
                )}
            </Box>
        </Box>
    );
};

const ScholarshipFormPage = () => {
    const formData = JSON.parse(localStorage.getItem("scholarshipFormData") || "{}");
    return <PrintableForm formData={formData} />;
};

export default ScholarshipFormPage;
