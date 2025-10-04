import path from "path";
import sharp from "sharp";
import Tesseract from "tesseract.js";

const CAMPUS_IDENTIFIERS = [
  "CAVITE STATE UNIVERSITY",
  "CVSU",
  "ROSARIO CAMPUS",
  "ROSARIO",
  "RC",
];

// Normalize student number (remove separators)
const normalizeStudentNumber = (num) =>
  typeof num === "string" ? num.replace(/[-\s]/g, "").trim() : "";

// Extract student number from text
const extractStudentNumber = (text) => {
  const patterns = [
    /\b(20\d{7})\b/g, // 202510330
    /\b(20\d{2}[-]\d{5})\b/g, // 2025-10330
    /\b(20\d{2}\s+\d{5})\b/g, // 2025 10330
    /(?:STUDENT\s*(?:NO|NUMBER|ID)[.:]?\s*)(20\d{7})/gi,
    /(?:ID\s*(?:NO|NUMBER)?[.:]?\s*)(20\d{7})/gi,
    /(?:NUMBER[.:]?\s*)(20\d{7})/gi,
  ];

  const matches = new Set();
  for (const pattern of patterns) {
    const found = text.matchAll(pattern);
    for (const match of found) {
      let number = match[1];
      number = number.replace(/[-\s]/g, "");
      if (number.length === 9 && number.startsWith("20")) matches.add(number);
    }
  }
  return Array.from(matches);
};

// Preprocess image with Sharp
const preprocessImage = async (inputPath, outputPath) => {
  await sharp(inputPath)
    .grayscale()
    .normalize()
    .resize({ width: 2000, withoutEnlargement: true })
    .threshold(128)
    .toFile(outputPath);
  return outputPath;
};

// Verify student ID
export const verifyStudentID = async (imagePath, studentNumber) => {
  try {
    console.log("Starting OCR verification...");
    console.log("Expected student number:", studentNumber);

    const cleanNumber = normalizeStudentNumber(studentNumber);
    if (!/^20\d{7}$/.test(cleanNumber)) {
      return {
        isValid: false,
        message:
          "Invalid student number format. Expected 9 digits starting with year (e.g., 202510330)",
      };
    }

    // Preprocess the image
    const preprocessedPath = await preprocessImage(
      imagePath,
      path.resolve("uploads/processed.jpg")
    );

    // OCR on preprocessed image
    const {
      data: { text },
    } = await Tesseract.recognize(preprocessedPath, "eng", {
      logger: (m) => console.log(m),
    });

    console.log("=== Extracted Text ===");
    console.log(text);
    console.log("======================");

    const upperText = text.toUpperCase();

    // Verify campus
    const isCampusValid = CAMPUS_IDENTIFIERS.some((id) =>
      upperText.includes(id.toUpperCase())
    );
    if (!isCampusValid) {
      return {
        isValid: false,
        extractedText: text,
        message:
          "ID does not belong to our campus. Please upload a valid Rosario Campus ID.",
      };
    }
    console.log("✓ Campus verified");

    // Extract & verify student number
    const detectedNumbers = extractStudentNumber(text);
    console.log("Detected student numbers:", detectedNumbers);

    if (detectedNumbers.length === 0) {
      return {
        isValid: false,
        extractedText: text,
        message:
          "Could not detect student number on ID. Please ensure the ID photo is clear and well-lit.",
      };
    }

    const isStudentNumberValid = detectedNumbers.some(
      (detected) => normalizeStudentNumber(detected) === cleanNumber
    );

    if (!isStudentNumberValid) {
      return {
        isValid: false,
        extractedText: text,
        detectedNumbers,
        message: `Student number mismatch. You entered "${studentNumber}" but ID shows: ${detectedNumbers.join(
          ", "
        )}.`,
      };
    }

    console.log("✓ Student number verified");

    return {
      isValid: true,
      extractedText: text,
      detectedNumbers,
      message: "ID verified successfully - campus and student number match!",
    };
  } catch (error) {
    console.error("OCR Error:", error);
    return {
      isValid: false,
      extractedText: "",
      message:
        "Failed to process ID photo. Please try uploading a clearer image.",
    };
  }
};
