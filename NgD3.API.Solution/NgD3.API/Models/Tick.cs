using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NgD3.API.Models
{
    public class Tick
    {
        public int Id { get; set; }
        public long Moment { get; set; }
        public string Secur { get; set; }
        public double Bid { get; set; }
        public double Ask { get; set; }
        public double VolumeBid { get; set; }
        public double VolumeAsk { get; set; }
    }
}
