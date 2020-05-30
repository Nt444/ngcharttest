using System;
using System.Diagnostics;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NgD3.API.Data;

namespace NgD3.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<DataContext>();
                    var configuration = services.GetRequiredService<IConfiguration>();
                    context.Database.Migrate();
                    int seedCount = int.Parse(configuration.GetSection("BusinessConfig")["TicksCount"]);
                    var connectionString = configuration.GetConnectionString("DefaultConnection");
                    Seed.SeedTicksManual(context, connectionString, seedCount);
                }
                catch (Exception ex)
                {
                    Debug.WriteLine("Error Seeding ex: " + ex);
                }
            }

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
