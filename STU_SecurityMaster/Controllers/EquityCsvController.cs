using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using STU_SecurityMaster.Equ_csv;
using System.Data;
using System.Data.SqlClient;
using Model;
using Microsoft.EntityFrameworkCore;
using STU_SecurityMaster.Bonds_csv;

namespace STU_SecurityMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquityCsvController:ControllerBase
    {
        private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");
        private readonly IConfiguration _configuration;
        private readonly ILogger<Equity_csv_ops> _logger;

        public EquityCsvController(ILogger<Equity_csv_ops> logger)
        {
            _logger = logger;
            // Ensure the upload directory exists
            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
            }
        }

        [HttpGet("getEquityDetailsBySID/{sid}")]
        public IActionResult GetEquityDetailsBySID(int sid)
        {
            Equity_csv_ops eps = new Equity_csv_ops(_logger);
            var equityData = eps.FetchEquityDataFromDbbyID(sid);
            if (equityData is DataTable dt && dt.Rows.Count > 0)
            {
                // Convert the DataTable to JSON or the required format
                return Ok(equityData);
            }
            else
            {
                return NotFound($"No equity data found for SID: {sid}");
            }
        }

        [HttpGet("getEquityData")]
        public async Task<IActionResult> GetEquityData()
        {
            Equity_csv_ops eps = new Equity_csv_ops(_logger);
            var data=eps.FetchEquityDataFromDb();
            return Ok(data);
        }

        [HttpGet("equityStatusCount")]
        public IActionResult GetEquityStatusCount()
        {
            try
            {
                Equity_csv_ops eps = new Equity_csv_ops(_logger);
                var statusCount = eps.CountActiveSecurities();
                return Ok(statusCount);
            }
            catch (Exception ex)
            {
                // Handle errors
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving securities status count: {ex.Message}");
            }
        }
        [HttpPut("updateEquity{sid}")]
        public IActionResult UpdateEquity([FromRoute] int sid,[FromBody] EquityWithUpdateProps equity)
        {
            try
            {
                Equity_csv_ops eps = new Equity_csv_ops(_logger);
                eps.UpdateEquityData(sid,equity);
                return Ok(equity);
            }
            catch (DbUpdateException dbex)
            {
                if (dbex.InnerException != null)
                {
                    return BadRequest(dbex.InnerException.Message);
                }
                return BadRequest(dbex.Message);
            }
            catch (Exception ex)
            {
                // Handle errors
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error updating security: {ex.Message}");
            }
        }
        [HttpDelete("SoftDeleteEquity{sid}")]
        public IActionResult SoftDeleteEquity([FromRoute] int sid)
        {
            try
            {
                Equity_csv_ops eps = new Equity_csv_ops(_logger);
                eps.SoftDeleteEquity(sid);
                return Ok("Deleted Successfully");
            }
            catch (DbUpdateException dbex)
            {
                if (dbex.InnerException != null)
                {
                    return BadRequest(dbex.InnerException.Message);
                }
                return BadRequest(dbex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error updating security: {ex.Message}");
            }
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
                Equity_csv_ops eps = new Equity_csv_ops(_logger);
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
