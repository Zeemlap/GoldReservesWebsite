﻿using GoldReserves.Backend;
using GoldReserves.Data;
using System.Collections.Generic;

namespace GoldReserves.Web.Models
{
    public class HomeIndexViewModel
    {
        public List<GeoRegion> GeoRegions { get; set; }
        public List<PoliticalEntity> PoliticalEntities { get; set; }
        public List<PoliticalEntityViewModel> PoliticalEntityViewModels { get; set; }
    }
    
    public class PoliticalEntityViewModel
    {
        public int PoliticalEntityId { get; set; }
        public double ResourceQuantity { get; set; }
    }
}