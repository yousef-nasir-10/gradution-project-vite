// import icons
// import images 
import { yousefPhoto, Haider, Hassan, Sajad  } from "../assets/images";

export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#top-projects", label: "Top Projects" },
    { href: "#contact-us", label: "Contact Us" },
    
];

export const projects = [
    {title: "Information Technology and IoT", like: 694, department: 'IS' },
    {title: "Information Transfer", like: 345, department: 'IS' },
    {title: "Data Mining", like: 291, department: 'IS' },
    {title: "Computer Algorithms", like: 134, department: 'CS' },
    {title: "Computer CPU", like: 124, department: 'CE' },
    {title: "6G Networks", like: 187, department: 'CN' },
]

export const contactInfo = [
    {name: "Yousef Nasser Al Suweileh", email: "Yousef.nasir.10@hotmail.com", image : yousefPhoto},
    {name: "Haidar Nasser Alkhalaf", email: "bokrarrarha@gmail.com", image : Haider},
    {name: "Hassan Hussain Alfaraj", email: "hassanalfaraj1421@gmail.com", image : Hassan},
    {name: "Sajjad Ali  AlIbrahim", email: "dv6tns@gmail.com", image : Sajad},

    // {name:"Hassan Hussain Al farag", email: "219024864@student.kfu.edu.sa", image: ""}
]

export const departments = [
    {dep: "IS", for: "Information System"},
    {dep: "CS", for: "Computer Science"},
    {dep: "CN", for: "Computer Network"},
    {dep: "CE", for: "Computer Engenering"},
]

export function extractPdf(start, end, text){
  
    let indexOfFirst = text.indexOf(start);
    let indexOfSecond = text.indexOf(end);
    let extractedTxt = text.slice(indexOfFirst + start.length, indexOfSecond)
    return extractedTxt
}

export const baseURL = "https://gradution-project-vite.vercel.app"


