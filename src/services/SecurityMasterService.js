// SecurityMasterService.js

// Mock service to simulate backend API calls for file uploads and security data handling
class SecurityMasterService {
    constructor() {
      // Store mock data to simulate the service's behavior
      this.data = {
        securities: [],
        fileUploads: []
      };
    }
  
    // Simulate file upload by adding file details to `fileUploads` array
    uploadFile(file) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (file) {
            // Add file to mock data store
            this.data.fileUploads.push({ fileName: file.name, date: new Date() });
            resolve({ message: "File uploaded successfully!", file });
          } else {
            reject(new Error("File upload failed."));
          }
        }, 500); // Simulate network delay
      });
    }
  
    // Simulate fetching securities data for "Master View"
    getSecurities() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.data.securities);
        }, 300);
      });
    }
  
    // Simulate adding securities data after file upload
    addSecurities(securitiesData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          // Merge uploaded securities data into the mock data store
          this.data.securities = [...this.data.securities, ...securitiesData];
          resolve({ message: "Securities data added successfully!" });
        }, 300);
      });
    }
  }
  
  export default new SecurityMasterService();
  