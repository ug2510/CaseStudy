using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Security_viewAPI.Model;

namespace Security_viewAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private readonly string _connectionString = @"Server=192.168.0.13\sqlexpress,49753; Database=STU_SecurityMaster; User Id=sa; Password=sa@12345678; TrustServerCertificate=True";

        [HttpGet("getSecurities")]
        public async Task<IActionResult> GetSecurities()
        {
            var securities = new List<Security>();

            using (SqlConnection connection = new SqlConnection(_connectionString))
            {
                using (SqlCommand command = new SqlCommand("SELECT TOP 100 * FROM vw_SP500_Overview", connection))
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

            return Ok(securities);
        }

    }
}
