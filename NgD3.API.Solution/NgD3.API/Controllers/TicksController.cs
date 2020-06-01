using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NgD3.API.Data;

namespace NgD3.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicksController : ControllerBase
    {
        private readonly ITicksRepository repo;

        public TicksController(ITicksRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetTicks(long startMoment, int count)
        {
            return Ok(await repo.GetTicks(startMoment, count));
        }

        [HttpGet("info")]
        public async Task<IActionResult> GetGeneralInfo()
        {
            return Ok(await repo.GetGeneralInfo());
        }
    }
}