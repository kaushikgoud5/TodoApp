using DAL.Enums;
using Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Todo:AuditRecord
    {
        public int Id { get; set; }

        public int UserId {  get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public required TodoStatus Status { get; set; } = TodoStatus.Active;

        public DateTime DateTime { get; set; } = DateTime.Now;

        public User? User { get; set; }  
    }



}
