using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NgD3.API.Models;

namespace NgD3.API.Data
{
    public class TickRepository : ITicksRepository
    {
        private readonly DataContext repo;

        public TickRepository(DataContext repo)
        {
            this.repo = repo;
        }

        public async Task<Info> GetGeneralInfo()
        {
            return new Info
            {
                TickCount = await repo.Ticks.CountAsync(),
                MomentStart = await repo.Ticks.MinAsync(x => x.Moment),
                MomentEnd = await repo.Ticks.MaxAsync(x => x.Moment),
            };
        }

        public async Task<List<Tick>> GetTicks(long startMoment, int count)
        {
            //Stopwatch sw = new Stopwatch();
            //sw.Start();
            //var res = repo.Ticks
            //    .Where(x => x.Moment >= startMoment)
            //    .Take(count)
            //    .ToList();
            //Debug.WriteLine($"Elapsed {sw.Elapsed}");
            //return res;

            return await repo.Ticks
                .Where(x => x.Moment >= startMoment)
                .Take(count)
                .ToListAsync();
        }
    }
}
