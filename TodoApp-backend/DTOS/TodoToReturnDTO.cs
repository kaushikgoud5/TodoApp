using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOS
{
    public class TodoToReturnDTO
    {
        public required string Title { get; set; }

        public required string Description { get; set; }

        public required bool Status { get; set; }

    }
}
