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
    public class BondController : ControllerBase
    {
        private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");
        private readonly ILogger<Bond> _logger;
        private readonly IConfiguration _configuration;
        private readonly IBond _bond;

        public BondController(ILogger<Bond> logger, IConfiguration configuration,IBond bond)
        {
            _logger = logger;
            _configuration = configuration;
            _bond = bond;
           
            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
            }
        }
        [HttpGet("getBondDetailsBySID/{sid}")]
        public IActionResult GetBondDetailsBySID(int sid)
        {
            var bondData = _bond.FetchBondDataFromDbbyID(sid);
            if (bondData is DataTable dt && dt.Rows.Count > 0)
            {
              
                return Ok(bondData);
            }
            else
            {
                return NotFound($"No bond data found for SID: {sid}");
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
                string result = _bond.FetchDataFromCSV(filePath);
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
            var data = _bond.FetchBondsDataFromDb();
            return Ok(data);
        }
        [HttpGet("bondStatusCount")]
        public IActionResult GetEquityStatusCount()
        {
            try
            {
                var statusCount = _bond.CountActiveSecurities();
                return Ok(statusCount);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving securities status count: {ex.Message}");
            }
        }
        [HttpPut("updateBond{sid}")]
        public IActionResult UpdateBody([FromRoute] int sid, [FromBody] BondWithUpdateProps bond)
        {
            try
            {
                _bond.UpdateBondData(sid, bond);
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
                _bond.SoftDeleteBond(sid);
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
                var sector = _bond.FetchBondSector();
                return Ok(sector);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving Bond sectors: {ex.Message}");
            }

        }
    }
}
