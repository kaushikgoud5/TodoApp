export interface Todo{
id:number,
userId:number,
title:string,
description:string,
status:TaskEnum,
dateTime:string
}
enum TaskEnum{
active=1,
completed
}