using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Model;
using STU_SecurityMaster.Bonds_csv;
using STU_SecurityMaster.Equ_csv;

namespace STU_SecurityMaster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BondCsvController : ControllerBase
    {
        private readonly string _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");

        public BondCsvController()
        {
            // Ensure the upload directory exists
            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
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
                Bond_csv_ops bond = new Bond_csv_ops();
                string result = bond.FetchDataFromCSV(filePath);
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
        [HttpGet("getBondsData")]
        public async Task<IActionResult> GetBondsData()
        {
            Bond_csv_ops eps = new Bond_csv_ops();
            var data = eps.FetchBondsDataFromDb();
            return Ok(data);
        }
        [HttpPut("updateBond{sid}")]
        public IActionResult UpdateEquity([FromRoute] int sid, [FromBody] BondWithUpdateProps bond)
        {
            try
            {
                Bond_csv_ops eps = new Bond_csv_ops();
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
                Bond_csv_ops eps = new Bond_csv_ops();
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
    }
}
