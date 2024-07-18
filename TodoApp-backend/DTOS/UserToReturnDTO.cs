using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOS
{
    public class UserToReturnDTO
    {
        public string? Token { get; set; }
        public string? UserName { get; set; }

        public string? Message { get; set; }

        public int UserId { get; set; }
    }
}
