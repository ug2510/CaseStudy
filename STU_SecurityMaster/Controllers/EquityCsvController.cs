using Microsoft.AspNetCore.Mvc;
using STU_SecurityMaster.Equ_csv;

namespace STU_SecurityMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquityCsvController:ControllerBase
    {
        private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");

        public EquityCsvController()
        {
            // Ensure the upload directory exists
            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
            }
        }
        [HttpGet("getEquityData")]
        public async Task<IActionResult> GetEquityData()
        {
            Equity_csv_ops eps = new Equity_csv_ops();
            var data=eps.FetchEquityDataFromDb();
            return Ok(data);
        }
        [HttpPost("uploadEquity")]
        public async Task<IActionResult> UploadCSVFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            try
            {
                // Validate the file type
                if (!file.FileName.EndsWith(".csv", StringComparison.OrdinalIgnoreCase))
                {
                    return BadRequest("Only CSV files are allowed.");
                }

                // Generate a unique file name to avoid collisions
                var fileName = $"{Guid.NewGuid()}_{file.FileName}";
                var filePath = Path.Combine(_uploadDirectory, fileName);

                // Save the file to the server
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                Equity_csv_ops eps = new Equity_csv_ops();
                string result = eps.FetchDataFromCSV(filePath);
                // Return the file path to the frontend
                //return Ok(new { filePath = filePath });
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Handle errors
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error uploading file: {ex.Message}");
            }
        }
        }
}
