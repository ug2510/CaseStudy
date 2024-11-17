

using Microsoft.EntityFrameworkCore;
using Serilog;
using STU_SecurityMaster.Bonds_csv;
using STU_SecurityMaster.Equ_csv;



namespace STU_SecurityMaster
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var configuration = new ConfigurationBuilder()

            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();

            // Add services to the container.
            Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(builder.Configuration)
              .Enrich.FromLogContext().WriteTo.File("log/MyLog.txt").CreateLogger();
            builder.Host.UseSerilog();
            builder.Services.AddControllers().AddNewtonsoftJson();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddTransient<IEquity, Equity_csv_ops>();
            builder.Services.AddTransient<IBond, Bond_csv_ops>();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });
            //builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("IVPConn")));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("AllowAll");
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
