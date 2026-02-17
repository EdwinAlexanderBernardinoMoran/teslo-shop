import { Link } from "react-router"

interface CustomLogoProps {
    subTitle?: string;
}
export const CustomLogo = ({ subTitle = "Shop" }: CustomLogoProps) => {
    return (
        // la clase whitespace-nowrap evita que se corten las palabras y se mantenga el logo en una sola línea
        <Link to="/" className="flex items-center whitespace-nowrap">
            <span className="font-montserrat font-bold text-xl m-0 whitespace-nowrap">Testlo | </span>
            <p className="text-muted-foreground m-0 px-2 whitespace-nowrap">{subTitle}</p>
        </Link>
    )
}