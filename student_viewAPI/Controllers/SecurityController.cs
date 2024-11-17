using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Security_viewAPI.Model;
using System.Data;
using System.Data;

namespace Security_viewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class SecurityController : ControllerBase
    {
        private readonly string _connectionString = @"Server=192.168.0.13\sqlexpress,49753; Database=STU_SecurityMaster; User Id=sa; Password=sa@12345678; TrustServerCertificate=True";
        private readonly ILogger _logger;  // Declare a logger field

        // Constructor injection of ILogger
        public SecurityController(ILogger<SecurityController> logger)
        {
            _logger = logger;  // Initialize the logger
        }
        [HttpGet("getOverviewByDate")]
        public async Task<IActionResult> GetOverviewByDate(DateTime date)
{
    var securities = new List<Security>();

    try
    {
        using (SqlConnection connection = new SqlConnection(_connectionString))
        {
            Console.WriteLine("Opening database connection...");

            using (SqlCommand command = new SqlCommand("OverView_date", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                command.Parameters.Add(new SqlParameter("@date", SqlDbType.Date) { Value = date });

                await connection.OpenAsync();
                Console.WriteLine("Connection opened successfully.");

                using (SqlDataReader reader = await command.ExecuteReaderAsync())
                {
                    Console.WriteLine("Reading data...");
                    while (reader.Read())
                    {
                        securities.Add(new Security
                        {
                            AsOfDate = reader.IsDBNull(0) ? (DateTime?)null : reader.GetDateTime(0),
                            Ticker = reader.IsDBNull(1) ? null : reader.GetString(1),
                            SecurityName = reader.IsDBNull(2) ? null : reader.GetString(2),
                            GICSSector = reader.IsDBNull(3) ? null : reader.GetString(3),
                            GICSSubIndustry = reader.IsDBNull(4) ? null : reader.GetString(4),
                            HeadquartersLocation = reader.IsDBNull(5) ? null : reader.GetString(5),
                            Founded = reader.IsDBNull(6) ? null : reader.GetString(6),
                            OpenPrice = reader.IsDBNull(7) ? (decimal?)null : reader.GetDecimal(7),
                            ClosePrice = reader.IsDBNull(8) ? (decimal?)null : reader.GetDecimal(8),
                            DTDChangePercentage = reader.IsDBNull(9) ? (decimal?)null : reader.GetDecimal(9),
                            MTDChangePercentage = reader.IsDBNull(10) ? (decimal?)null : reader.GetDecimal(10),
                            QTDChangePercentage = reader.IsDBNull(11) ? (decimal?)null : reader.GetDecimal(11),
                            YTDChangePercentage = reader.IsDBNull(12) ? (decimal?)null : reader.GetDecimal(12)
                        });
                    }
                }
            }
                    _logger.LogInformation($"Get Data by Date : {date} Successful");
        }

        if (securities.Count == 0)
        {
            Console.WriteLine("No data found for the specified date.");
                    _logger.LogError("No data found for the specified date.");
            return NotFound("No data found for the specified date.");
        }

        return Ok(securities);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error in OverView_date: {ex.Message}");
                _logger.LogError($"Error in OverView_date: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching data for the specified date.");
    }
}

        [HttpGet("getSecuritiesbyName/{ticker}")]
        public async Task<IActionResult> GetSecuritiesbyName(string ticker)
        {
            try
            {
                var securities = new List<Security>();
                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand($"SELECT * FROM vw_SP500_Overview where Ticker='{ticker}'order by asOfDate", connection))
                    {
                        await connection.OpenAsync();

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            while (reader.Read())
                            {
                                securities.Add(new Security
                                {
                                    AsOfDate = reader.IsDBNull(0) ? (DateTime?)null : reader.GetDateTime(0),
                                    Ticker = reader.IsDBNull(1) ? null : reader.GetString(1),
                                    SecurityName = reader.IsDBNull(2) ? null : reader.GetString(2),
                                    GICSSector = reader.IsDBNull(3) ? null : reader.GetString(3),
                                    GICSSubIndustry = reader.IsDBNull(4) ? null : reader.GetString(4),
                                    HeadquartersLocation = reader.IsDBNull(5) ? null : reader.GetString(5),
                                    Founded = reader.IsDBNull(6) ? null : reader.GetString(6),  // Updated to string
                                    OpenPrice = reader.IsDBNull(7) ? (decimal?)null : reader.GetDecimal(7),
                                    ClosePrice = reader.IsDBNull(8) ? (decimal?)null : reader.GetDecimal(8),
                                    DTDChangePercentage = reader.IsDBNull(9) ? (decimal?)null : reader.GetDecimal(9),
                                    MTDChangePercentage = reader.IsDBNull(10) ? (decimal?)null : reader.GetDecimal(10),
                                    QTDChangePercentage = reader.IsDBNull(11) ? (decimal?)null : reader.GetDecimal(11),
                                    YTDChangePercentage = reader.IsDBNull(12) ? (decimal?)null : reader.GetDecimal(12)
                                });

                            }
                        }
                    }
                }
                if (securities.Count == 0)
                {
                    Console.WriteLine("No data found for the specified Ticker.");
                    _logger.LogError("No data found for the specified Ticker.");
                    return NotFound("No data found for the specified Ticker.");
                }
                _logger.LogInformation($"Data of Ticker :{ticker} was fetched.");
                return Ok(securities);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching data for the specified Ticker: {ex.Message}");
                _logger.LogError($"An error occurred while fetching data for the specified Ticker: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching data for the specified Ticker.");


            }
        }
        [HttpGet("getSecurities")]
        public async Task<IActionResult> GetSecurities()
        {
            try
            {
                var securities = new List<Security>();

                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("SELECT TOP 1000 * FROM vw_SP500_Overview", connection))
                    {
                        await connection.OpenAsync();

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            while (reader.Read())
                            {
                                securities.Add(new Security
                                {
                                    AsOfDate = reader.IsDBNull(0) ? (DateTime?)null : reader.GetDateTime(0),
                                    Ticker = reader.IsDBNull(1) ? null : reader.GetString(1),
                                    SecurityName = reader.IsDBNull(2) ? null : reader.GetString(2),
                                    GICSSector = reader.IsDBNull(3) ? null : reader.GetString(3),
                                    GICSSubIndustry = reader.IsDBNull(4) ? null : reader.GetString(4),
                                    HeadquartersLocation = reader.IsDBNull(5) ? null : reader.GetString(5),
                                    Founded = reader.IsDBNull(6) ? null : reader.GetString(6),  // Updated to string
                                    OpenPrice = reader.IsDBNull(7) ? (decimal?)null : reader.GetDecimal(7),
                                    ClosePrice = reader.IsDBNull(8) ? (decimal?)null : reader.GetDecimal(8),
                                    DTDChangePercentage = reader.IsDBNull(9) ? (decimal?)null : reader.GetDecimal(9),
                                    MTDChangePercentage = reader.IsDBNull(10) ? (decimal?)null : reader.GetDecimal(10),
                                    QTDChangePercentage = reader.IsDBNull(11) ? (decimal?)null : reader.GetDecimal(11),
                                    YTDChangePercentage = reader.IsDBNull(12) ? (decimal?)null : reader.GetDecimal(12)
                                });
                            }
                        }
                    }
                }
                _logger.LogInformation("All data was feteched");
                return Ok(securities);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching data : {ex.Message}");
                _logger.LogError($"An error occurred while fetching data : {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching data");
            }
        }

        
        [HttpGet("getSecurities/{pageNum}")]
        public async Task<IActionResult> GetSecuritiesPaged([FromRoute] int pageNum)
        {
            try
            {
                var securities = new List<Security>();

                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    using (SqlCommand command = new SqlCommand("GetSnPSecuritiesPaged", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.Parameters.AddWithValue("@PageNumber", pageNum);
                        await connection.OpenAsync();

                        using (SqlDataReader reader = await command.ExecuteReaderAsync())
                        {
                            while (reader.Read())
                            {
                                securities.Add(new Security
                                {
                                    AsOfDate = reader.IsDBNull(0) ? (DateTime?)null : reader.GetDateTime(0),
                                    Ticker = reader.IsDBNull(1) ? null : reader.GetString(1),
                                    SecurityName = reader.IsDBNull(2) ? null : reader.GetString(2),
                                    GICSSector = reader.IsDBNull(3) ? null : reader.GetString(3),
                                    GICSSubIndustry = reader.IsDBNull(4) ? null : reader.GetString(4),
                                    HeadquartersLocation = reader.IsDBNull(5) ? null : reader.GetString(5),
                                    Founded = reader.IsDBNull(6) ? null : reader.GetString(6),  // Updated to string
                                    OpenPrice = reader.IsDBNull(7) ? (decimal?)null : reader.GetDecimal(7),
                                    ClosePrice = reader.IsDBNull(8) ? (decimal?)null : reader.GetDecimal(8),
                                    DTDChangePercentage = reader.IsDBNull(9) ? (decimal?)null : reader.GetDecimal(9),
                                    MTDChangePercentage = reader.IsDBNull(10) ? (decimal?)null : reader.GetDecimal(10),
                                    QTDChangePercentage = reader.IsDBNull(11) ? (decimal?)null : reader.GetDecimal(11),
                                    YTDChangePercentage = reader.IsDBNull(12) ? (decimal?)null : reader.GetDecimal(12)
                                });
                            }
                        }
                    }
                }
                _logger.LogInformation("");
                return Ok(securities);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred while fetching data : {ex.Message}");
                _logger.LogError($"An error occurred while fetching data : {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching data");
            }
        }
    }
}
