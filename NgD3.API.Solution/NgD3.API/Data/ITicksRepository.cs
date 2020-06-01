using NgD3.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NgD3.API.Data
{
    public interface ITicksRepository
    {
        Task<List<Tick>> GetTicks(long startMoment, int count);
        Task<Info> GetGeneralInfo();
    }
}
