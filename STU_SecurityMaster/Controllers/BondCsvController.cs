using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using STU_SecurityMaster.Bonds_csv;
using STU_SecurityMaster.Equ_csv;
using System.Configuration;
using System.Data;

namespace STU_SecurityMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BondCsvController : ControllerBase
    {
        private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");
        private readonly ILogger<Bond_csv_ops> _logger;
        private readonly IConfiguration _configuration;


        public BondCsvController(ILogger<Bond_csv_ops> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
           
            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
            }
        }
        [HttpGet("getBondDetailsBySID/{sid}")]
        public IActionResult GetBondDetailsBySID(int sid)
        {
            Bond_csv_ops eps = new Bond_csv_ops(_logger, _configuration);
            var equityData = eps.FetchBondDataFromDbbyID(sid);
            if (equityData is DataTable dt && dt.Rows.Count > 0)
            {
              
                return Ok(equityData);
            }
            else
            {
                return NotFound($"No equity data found for SID: {sid}");
            }
        }
        [HttpPost("uploadBonds")]
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
                Bond_csv_ops bond = new Bond_csv_ops(_logger, _configuration);
                string result = bond.FetchDataFromCSV(filePath);
                // Return the file path to the frontend
               
                return Ok(result);
            }
            catch (Exception ex)
            {
              
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error uploading file: {ex.Message}");
            }
        }
        [HttpGet("getBondsData")]
        public async Task<IActionResult> GetBondsData()
        {
            Bond_csv_ops eps = new Bond_csv_ops(_logger, _configuration);
            var data = eps.FetchBondsDataFromDb();
            return Ok(data);
        }
        [HttpGet("bondStatusCount")]
        public IActionResult GetEquityStatusCount()
        {
            try
            {
                Bond_csv_ops eps = new Bond_csv_ops(_logger, _configuration);
                var statusCount = eps.CountActiveSecurities();
                return Ok(statusCount);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving securities status count: {ex.Message}");
            }
        }
        [HttpPut("updateBond{sid}")]
        public IActionResult UpdateEquity([FromRoute] int sid, [FromBody] BondWithUpdateProps bond)
        {
            try
            {
                Bond_csv_ops eps = new Bond_csv_ops(_logger, _configuration);
                eps.UpdateBondData(sid, bond);
                return Ok(bond);
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
        

        [HttpDelete("SoftDeleteBond{sid}")]
        public IActionResult SoftDeleteBond([FromRoute] int sid)
        {
            try
            {
                Bond_csv_ops eps = new Bond_csv_ops(_logger,_configuration);
                eps.SoftDeleteBond(sid);
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

        [HttpGet("BondSector")]
        public IActionResult FetchSectorData()
        {
            try
            {
                Bond_csv_ops eps = new Bond_csv_ops(_logger, _configuration);
                var sector = eps.FetchBondSector();
                return Ok(sector);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving Bond sectors: {ex.Message}");
            }

        }
    }
}
