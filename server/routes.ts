import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertRoiResultSchema } from "@shared/schema";
import generatePDF from "../client/src/lib/pdf-generator";
import { calculateSavings } from "../client/src/lib/roi-calculator";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create API prefix
  const apiRouter = app.route("/api");
  
  // HubSpot form submission endpoint
  app.post("/api/hubspot/contact", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const contactData = insertContactSchema.parse(req.body);
      
      // Check if contact already exists
      let contact = await storage.getContactByEmail(contactData.email);
      
      // Create contact if it doesn't exist
      if (!contact) {
        contact = await storage.createContact(contactData);
      }
      
      // In a real implementation, this would integrate with HubSpot API
      // For now, we'll simulate the integration
      
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        contactId: contact.id 
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ 
        success: false, 
        message: "Server error processing contact form" 
      });
    }
  });
  
  // ROI calculation result saving endpoint
  app.post("/api/roi/results", async (req: Request, res: Response) => {
    try {
      const { contactId, ...calculatorInputs } = req.body;
      
      // Validate contact ID
      if (!contactId) {
        return res.status(400).json({ 
          success: false, 
          message: "Contact ID is required" 
        });
      }
      
      // Get contact
      const contact = await storage.getContact(contactId);
      if (!contact) {
        return res.status(404).json({ 
          success: false, 
          message: "Contact not found" 
        });
      }
      
      // Calculate ROI results
      const results = calculateSavings({
        employees: calculatorInputs.employees,
        hiresRate: calculatorInputs.hiresRate / 100,
        roleChangeRate: calculatorInputs.roleChangeRate / 100,
        departureRate: calculatorInputs.departureRate / 100,
        adminCost: calculatorInputs.adminCost
      });
      
      // Create ROI result record
      const roiResult = await storage.createRoiResult({
        contactId,
        employees: calculatorInputs.employees,
        hiresRate: calculatorInputs.hiresRate,
        roleChangeRate: calculatorInputs.roleChangeRate,
        departureRate: calculatorInputs.departureRate,
        adminCost: calculatorInputs.adminCost,
        annualSavings: results.annualSavings,
        fiveYearSavings: results.fiveYearSavings,
        timeSaved: results.totalTimeSaved,
        securityImprovement: results.securityImprovement
      });
      
      res.status(201).json({ 
        success: true, 
        roiResultId: roiResult.id, 
        results 
      });
    } catch (error) {
      console.error("Error processing ROI calculation:", error);
      res.status(500).json({ 
        success: false, 
        message: "Server error processing ROI calculation" 
      });
    }
  });
  
  // Email sharing endpoint
  app.post("/api/share/email", async (req: Request, res: Response) => {
    try {
      const { recipientEmail, data } = req.body;
      
      if (!recipientEmail || !data) {
        return res.status(400).json({ 
          success: false, 
          message: "Recipient email and data are required" 
        });
      }
      
      // For a real implementation:
      // 1. Generate a unique ID for this calculation
      // 2. Store the results in the database
      // 3. Send an email with the PDF report attached
      
      // Simulate a successful email send
      setTimeout(() => {
        // Simulated email sending delay
      }, 500);
      
      res.status(200).json({ 
        success: true, 
        message: "Report sent successfully to " + recipientEmail 
      });
    } catch (error) {
      console.error("Error sharing results via email:", error);
      res.status(500).json({ 
        success: false, 
        message: "Server error sharing results" 
      });
    }
  });
  
  // Generate PDF report endpoint
  app.post("/api/report/generate", async (req: Request, res: Response) => {
    try {
      const { roiResultId } = req.body;
      
      if (!roiResultId) {
        return res.status(400).json({ 
          success: false, 
          message: "ROI result ID is required" 
        });
      }
      
      // Get ROI result
      const roiResult = await storage.getRoiResult(roiResultId);
      if (!roiResult) {
        return res.status(404).json({ 
          success: false, 
          message: "ROI result not found" 
        });
      }
      
      // In a real implementation, this would generate a PDF
      // using the stored result data
      // For now we'll send back the ROI result data
      
      res.status(200).json({ 
        success: true, 
        roiResult 
      });
    } catch (error) {
      console.error("Error generating PDF report:", error);
      res.status(500).json({ 
        success: false, 
        message: "Server error generating PDF report" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
