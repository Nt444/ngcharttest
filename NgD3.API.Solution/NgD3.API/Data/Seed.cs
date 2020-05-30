using NgD3.API.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace NgD3.API.Data
{
    public class Seed
    {
        public static void SeedTicksEF(DataContext context, int ticksCount)
        {
            if (!context.Ticks.Any())
            {
                var ticks = GetTicks(ticksCount);
                context.Ticks.AddRange(ticks);
                context.SaveChanges();
            }
        }

        public static void SeedTicksManual(DataContext context, string connectionString, int ticksCount)
        {
            if (!context.Ticks.Any())
            {
                var ticks = GetTicks(ticksCount);
                using (var connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    using (var transaction = connection.BeginTransaction())
                    {
                        var command = connection.CreateCommand();
                        command.Connection = connection;
                        command.Transaction = transaction;
                        foreach (var tick in ticks)
                        {
                            command.CommandText = "INSERT INTO Ticks (Moment, Secur, Bid, Ask, VolumeBid, VolumeAsk) "
                                + $"VALUES ({tick.Moment}, '{tick.Secur}', {Inv(tick.Bid)}, {Inv(tick.Ask)}, {Inv(tick.VolumeBid)}, {Inv(tick.VolumeAsk)})";
                            command.ExecuteNonQuery();
                        }
                        transaction.Commit();
                    }
                }
            }
        }

        static IEnumerable<Tick> GetTicks(int count)
        {
            var moment = DateTimeOffset.UtcNow;
            var price = 10000.0;
            var random = new Random();
            return Enumerable.Range(0, count).Select(x => {
                var tick = new Tick()
                {
                    Secur = "BTC",
                    Moment = moment.ToUnixTimeMilliseconds(),
                    Bid = price,
                    Ask = price + random.NextDouble() * 10 + 10,
                    VolumeBid = random.NextDouble() * 1000 + 1,
                    VolumeAsk = random.NextDouble() * 1000 + 1,
                };
                moment = moment.AddSeconds(1);
                price += random.NextDouble() * 4 - 2;
                return tick;
            });
        }

        static string Inv(double x) => x.ToString(CultureInfo.InvariantCulture);
    }
}
