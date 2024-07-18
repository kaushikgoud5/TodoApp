using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOS
{
    public class UserToAddDTO
    {
        public required int UserId { get; set; }
        public required string Title { get; set; }

        public required string Description { get; set; }

    }
}
