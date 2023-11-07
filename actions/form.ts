
import { toast } from "react-toastify"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB



const token = localStorage.getItem("UserToken")



/*
export  async function GetFormStats() {
    if (!token) {
        toast.error("User not found")
    }
    const stats = prisma.form.aggregate({
        where: {
            userId: token
        },
        _sum: {
            visits: true, submissions: true
        }
    })

    const visits = (await stats)._sum.visits || 0;
    
    const submissions = (await stats)._sum.submissions || 0;

    let submissionRate = 0;

    if (visits > 0) {
      submissionRate = (submissions / visits) * 100;
    }
  
    const bounceRate = 100 - submissionRate;
  
    return {
      visits,
      submissions,
      submissionRate,
      bounceRate,
    };
}
*/

interface formschema{
    title:string,
    description:string
}

export async function CreateForm(data:formschema){
    const form = await prisma.form.create({
        data:{
            //@ts-ignore
            userId:token,
            title:data.title,
            description:data.description
        }
    })
    if(!form){
        toast.error("something went wrong")
    }
    return form.id;
    
    
}

