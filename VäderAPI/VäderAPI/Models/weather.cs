using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VäderAPI.Models
{
    public class weather
    {
        public int Id { get; set; }

        public string windSpeed { get; set; }

        public string windDirection { get; set; }

        public decimal gustSpeed { get; set; }

        public decimal airTemp { get; set; }

        public decimal waterTemp { get; set; }

        public decimal battery { get; set; }

        public decimal lastUpdate { get; set; }

    }
}